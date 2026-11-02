#!/usr/bin/env python3
"""An isolated branch, an explicit task claim, and an auditable PR per agent."""
import argparse
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import uuid

from agent_safety import ROOT, REPOSITORY, check_scope, context, git, json_pages, validate_contract

MARKER = re.compile(r'<!-- agent-contract\s*\n(.*?)\n-->', re.S)


def run(*args, cwd=None):
    subprocess.run([str(a) for a in args], cwd=cwd or ROOT, check=True)


def gh_json(*args):
    data = subprocess.check_output(['gh', *args], cwd=ROOT, text=True)
    return json_pages(data) if '--paginate' in args else json.loads(data)


def task_path(c):
    return ROOT / 'docs/agent-tasks' / (c['task'] + '.json')


def clean():
    if git('status', '--porcelain'):
        raise ValueError('Working tree has uncommitted files. Preserve and finish them before switching tasks or syncing.')


def ensure_identity():
    missing = [key for key in ['user.name', 'user.email']
               if not subprocess.run(['git', 'config', '--get', key], cwd=ROOT, capture_output=True, text=True).stdout.strip()]
    if not missing:
        return
    user = gh_json('api', 'user')
    if not isinstance(user.get('id'), int) or not re.fullmatch(r'[A-Za-z0-9-]+', user.get('login', '')):
        raise ValueError('Configure a Git author identity before reserving a task.')
    values = {'user.name': user.get('name') or user['login'],
              'user.email': f"{user['id']}+{user['login']}@users.noreply.github.com"}
    for key in missing:
        run('git', 'config', '--local', key, values[key])


def resume_state(c):
    """Resume a failed reservation without absorbing implementation or foreign work."""
    local = ROOT / '.agent-context.json'
    manifest = task_path(c)
    if not local.exists() and not manifest.exists():
        clean()
        return False
    if (not local.exists() or not manifest.exists()
            or json.loads(local.read_text()) != c or json.loads(manifest.read_text()) != c):
        raise ValueError('This checkout is assigned to a different contract. Preserve it and use a fresh checkout.')
    changed = set()
    for args in [('diff', '--name-only', '-z'), ('diff', '--cached', '--name-only', '-z'),
                 ('ls-files', '--others', '--exclude-standard', '-z')]:
        changed.update(filter(None, git(*args).split('\0')))
    if changed - {str(manifest.relative_to(ROOT))}:
        raise ValueError('Reservation recovery found other uncommitted work. Preserve and finish it before retrying.')
    return True


def setup():
    for p in (ROOT / '.githooks').iterdir():
        if p.is_file():
            p.chmod(p.stat().st_mode | 0o111)
    run('git', 'config', '--local', 'core.hooksPath', '.githooks')
    run('git', 'config', '--local', 'pull.rebase', 'false')
    run('git', 'config', '--local', 'pull.ff', 'only')
    run('git', 'config', '--local', 'push.default', 'current')
    run('git', 'config', '--local', 'fetch.prune', 'false')
    # Filter configuration only: our pre-push hook invokes Git LFS itself.
    if shutil.which('git-lfs'):
        run('git', 'lfs', 'install', '--local', '--skip-repo')
    print('Agent guards installed. Read AGENTS.md; claim a task before editing or committing.')


def body(c, summary, changes='Task reserved; implementation in progress.', validation='Pending implementation checks.', risks='See task scope and source constraints.'):
    return (f'## Purpose\n{summary}\n\n## Changes\n{changes}\n\n## Validation\n{validation}\n\n'
            f'## Risks and source changes\n{risks}\n\n## Ownership\n'
            f"Task: `{c['task']}`\nAgent: `{c['agent']}`\nBranch: `{c['branch']}`\n\n"
            + '\n'.join(f'- `{s}`' for s in c['scope'])
            + '\n\n<!-- agent-contract\n' + json.dumps(c, ensure_ascii=False, indent=2) + '\n-->\n')


def with_file(text, callback):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', encoding='utf-8') as f:
        f.write(text)
        f.flush()
        callback(f.name)


def find_pr(c):
    prs = gh_json('pr', 'list', '--repo', REPOSITORY, '--head', c['branch'], '--state', 'open', '--json', 'number,url')
    if len(prs) != 1:
        raise ValueError('Expected one open draft PR for this branch. Claim the task first.')
    return prs[0]


def assert_reserved(c):
    pr = find_pr(c)
    remote = gh_json('pr', 'view', str(pr['number']), '--repo', REPOSITORY, '--json', 'body')
    match = MARKER.search(remote['body'])
    if not match or json.loads(match[1]) != c:
        raise ValueError('The task contract differs from the published claim. Coordinate scope changes before continuing.')
    return pr


def claim(args):
    c = validate_contract({'task': args.task, 'agent': args.agent, 'scope': args.scope,
                           'branch': git('branch', '--show-current')})
    resuming = resume_state(c)
    ensure_identity()  # Fail before writing task files if identity is unavailable.
    existing = gh_json('pr', 'list', '--repo', REPOSITORY, '--head', c['branch'], '--state', 'open', '--json', 'number,url,body')
    if len(existing) > 1 or (existing and (not resuming or not MARKER.search(existing[0]['body'])
                            or json.loads(MARKER.search(existing[0]['body'])[1]) != c)):
        raise ValueError('A different PR already owns this branch.')
    # Query live claims before editing. The server policy repeats this check for races.
    from agent_policy import check_claims
    check_claims(c, gh_json('api', '--paginate', f'repos/{REPOSITORY}/pulls?state=open&per_page=100'),
                 current=existing[0]['number'] if existing else None)
    if not resuming:
        (ROOT / '.agent-context.json').write_text(json.dumps(c, indent=2) + '\n')
        task_path(c).parent.mkdir(parents=True, exist_ok=True)
        task_path(c).write_text(json.dumps(c, indent=2) + '\n')
    metadata = str(task_path(c).relative_to(ROOT))
    recorded = subprocess.run(['git', 'show', 'HEAD:' + metadata], cwd=ROOT, capture_output=True, text=True)
    if recorded.returncode:
        run('git', 'add', '--', metadata)
        message = f"chore(task): reserve {c['task']}\n\n{args.summary}\n\nTask: {c['task']}\nAgent: {c['agent']}"
        run('git', 'commit', '-m', message)
    elif json.loads(recorded.stdout) != c:
        raise ValueError('The committed reservation differs from this task. Coordinate a scope transfer first.')
    run('git', 'push', '-u', 'origin', c['branch'])
    if existing:
        print(existing[0]['url'])
    else:
        with_file(body(c, args.summary), lambda path: run('gh', 'pr', 'create', '--repo', REPOSITORY, '--base', 'main', '--head', c['branch'], '--draft', '--title', f"chore(task): {args.summary}", '--body-file', path))
    print('Wait for the agent-policy check to pass before implementing. Oldest overlapping PR owns the scope.')


def start(args):
    clean()
    run('git', 'fetch', 'origin', 'main')
    branch = f'agent/{args.task}-{uuid.uuid4().hex[:8]}'
    destination = ROOT / '.worktrees' / branch.split('/')[-1]
    run('git', 'worktree', 'add', '-b', branch, destination, 'origin/main')
    run('python3', destination / 'scripts/agents.py', 'setup', cwd=destination)
    cmd = ['python3', destination / 'scripts/agents.py', 'claim', '--task', args.task,
           '--agent', args.agent, '--summary', args.summary, '--scope', *args.scope]
    run(*cmd, cwd=destination)
    print(f'Continue work only in: {destination}')


def commit(args):
    c = context()
    assert_reserved(c)
    if not re.match(r'^(feat|fix|docs|test|refactor|chore|build|ci|style|perf)(\([a-z0-9-]+\))?: .{8,}', args.message):
        raise ValueError('Use a specific conventional commit subject, e.g. fix(preview): restore mobile video controls.')
    check_scope(c, args.paths)
    run('git', 'add', '--', *args.paths)
    # Hooks also check already-staged files, so unrelated work cannot slip in.
    run('git', 'commit', '-m', f"{args.message}\n\n{args.why}\n\nTask: {c['task']}\nAgent: {c['agent']}")


def submit(args):
    c = context()
    pr = assert_reserved(c)
    clean()
    run('npm', 'test')
    run('npm', 'run', 'check')
    run('git', 'push', 'origin', c['branch'])
    with_file(body(c, args.summary, args.changes, args.validation, args.risks), lambda path:
              run('gh', 'pr', 'edit', pr['number'], '--repo', REPOSITORY, '--title', args.title, '--body-file', path))
    run('gh', 'pr', 'ready', pr['number'], '--repo', REPOSITORY)
    print(pr['url'])


def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='action', required=True)
    sub.add_parser('setup')
    sub.add_parser('status')
    sub.add_parser('sync')
    for name in ['start', 'claim']:
        s = sub.add_parser(name)
        for field in ['task', 'agent', 'summary']:
            s.add_argument('--' + field, required=True)
        s.add_argument('--scope', nargs='+', required=True)
    s = sub.add_parser('commit')
    s.add_argument('--message', required=True)
    s.add_argument('--why', required=True)
    s.add_argument('paths', nargs='+')
    s = sub.add_parser('submit')
    for field in ['title', 'summary', 'changes', 'validation', 'risks']:
        s.add_argument('--' + field, required=True)
    args = p.parse_args()
    try:
        if args.action == 'setup':
            setup()
        elif args.action == 'status':
            print(git('status', '--short', '--branch'))
            print(json.dumps(context(), indent=2) if (ROOT / '.agent-context.json').exists() else 'No task claimed.')
            run('gh', 'pr', 'list', '--repo', REPOSITORY, '--state', 'open')
        elif args.action == 'sync':
            context()
            clean()
            run('git', 'fetch', 'origin', 'main')
            run('git', 'merge', '--no-edit', 'origin/main')
        else:
            globals()[args.action](args)
    except (ValueError, OSError, subprocess.CalledProcessError) as e:
        print(f'Agent workflow stopped: {e}\nFiles and branches have been preserved. Inspect before continuing.', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
