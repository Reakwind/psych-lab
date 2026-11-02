#!/usr/bin/env python3
"""An isolated branch, an explicit task claim, and an auditable PR per agent."""
import argparse
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import os
import urllib.error
import urllib.parse
import urllib.request
import uuid

from agent_safety import ROOT, REPOSITORY, check_scope, context, git, json_pages, validate_contract

MARKER = re.compile(r'<!-- agent-contract\s*\n(.*?)\n-->', re.S)
OWNER = REPOSITORY.split('/')[0]


def run(*args, cwd=None):
    subprocess.run([str(a) for a in args], cwd=cwd or ROOT, check=True)


def gh_api(path, method='GET', data=None, paginate=False):
    """Call the GitHub REST API only.

    Hosted agent proxies (e.g. Claude Code cloud) serve REST but block GraphQL,
    which `gh pr list/create/edit/ready` depend on. REST works everywhere.
    """
    if shutil.which('gh'):
        args = ['gh', 'api', '-X', method] + (['--paginate'] if paginate else []) + [path]
        if data is not None:
            args += ['--input', '-']
        result = subprocess.run(args, cwd=ROOT, capture_output=True, text=True,
                                input=None if data is None else json.dumps(data))
        if result.returncode:
            raise ValueError(f'GitHub API {method} {path} failed: {(result.stderr or result.stdout).strip()[:500]}')
        text = result.stdout
        return json_pages(text) if paginate else (json.loads(text) if text.strip() else {})
    return _urllib_api(path, method, data, paginate)


def _urllib_api(path, method, data, paginate):
    """Fallback without gh: token from the environment, or a credential-injecting proxy."""
    headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'psych-lab-agents',
               'X-GitHub-Api-Version': '2022-11-28'}
    token = os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN')
    if token:
        headers['Authorization'] = 'Bearer ' + token
    url, pages = 'https://api.github.com/' + path.lstrip('/'), []
    while url:
        body = None if data is None else json.dumps(data).encode()
        request = urllib.request.Request(url, data=body, method=method, headers=headers)
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                text = response.read().decode()
                links = response.headers.get('Link', '')
        except urllib.error.HTTPError as e:
            raise ValueError(f'GitHub API {method} {path} failed: HTTP {e.code}') from None
        page = json.loads(text) if text.strip() else {}
        if not paginate:
            return page
        pages.append(page)
        url = next((m[1] for m in re.finditer(r'<([^>]+)>;\s*rel="next"', links)), None)
    return pages


def open_prs(branch=None):
    query = 'state=open&per_page=100'
    if branch:
        query += '&head=' + urllib.parse.quote(f'{OWNER}:{branch}', safe='')
    return [p for page in gh_api(f'repos/{REPOSITORY}/pulls?{query}', paginate=True) for p in page]


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
    user = gh_api('user')
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


def find_pr(c):
    prs = open_prs(c['branch'])
    if len(prs) != 1:
        raise ValueError('Expected one open draft PR for this branch. Claim the task first.')
    return prs[0]


def published_contract(pr):
    match = MARKER.search(pr.get('body') or '')
    return json.loads(match[1]) if match else None


def assert_reserved(c):
    pr = find_pr(c)
    if published_contract(pr) != c:
        raise ValueError('The task contract differs from the published claim. Coordinate scope changes before continuing.')
    return pr


def mark_ready(pr):
    """Draft→ready has no plain REST endpoint: try gh (GraphQL), then the hosted-proxy route."""
    if not pr.get('draft'):
        return
    if shutil.which('gh') and not subprocess.run(['gh', 'pr', 'ready', str(pr['number']), '--repo', REPOSITORY],
                                                 cwd=ROOT, capture_output=True).returncode:
        return
    try:
        gh_api(f"repos/{REPOSITORY}/pulls/{pr['number']}/ccr/ready_for_review", method='POST')
    except ValueError:
        print(f"Could not mark PR #{pr['number']} ready automatically; mark it ready with your GitHub integration.",
              file=sys.stderr)


def claim(args):
    c = validate_contract({'task': args.task, 'agent': args.agent, 'scope': args.scope,
                           'branch': git('branch', '--show-current')})
    resuming = resume_state(c)
    ensure_identity()  # Fail before writing task files if identity is unavailable.
    existing = open_prs(c['branch'])
    if len(existing) > 1 or (existing and (not resuming or published_contract(existing[0]) != c)):
        raise ValueError('A different PR already owns this branch.')
    # Query live claims before editing. The server policy repeats this check for races.
    from agent_policy import check_claims
    check_claims(c, [open_prs()], current=existing[0]['number'] if existing else None)
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
        print(existing[0]['html_url'])
    else:
        pr = gh_api(f'repos/{REPOSITORY}/pulls', method='POST', data={
            'title': f"chore(task): {args.summary}", 'head': c['branch'], 'base': 'main',
            'body': body(c, args.summary), 'draft': True})
        print(pr['html_url'])
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
    footer = ('\n' + args.footer.strip()) if args.footer else ''
    run('git', 'commit', '-m', f"{args.message}\n\n{args.why}\n\nTask: {c['task']}\nAgent: {c['agent']}{footer}")


def submit(args):
    c = context()
    pr = assert_reserved(c)
    clean()
    run('npm', 'test')
    run('npm', 'run', 'check')
    run('git', 'push', 'origin', c['branch'])
    gh_api(f"repos/{REPOSITORY}/pulls/{pr['number']}", method='PATCH', data={
        'title': args.title, 'body': body(c, args.summary, args.changes, args.validation, args.risks)
        + (('\n' + args.footer.strip() + '\n') if args.footer else '')})
    mark_ready(pr)
    print(pr['html_url'])


def status():
    print(git('status', '--short', '--branch'))
    print(json.dumps(context(), indent=2) if (ROOT / '.agent-context.json').exists() else 'No task claimed.')
    try:
        prs = open_prs()
    except (ValueError, OSError) as e:
        print(f'Open PRs unavailable: {e}')
        return
    print(f'Open PRs ({len(prs)}):' if prs else 'No open PRs; no scopes are reserved.')
    for pr in prs:
        c = published_contract(pr) or {}
        print(f"  #{pr['number']} {'draft ' if pr.get('draft') else ''}{pr['head']['ref']}: {pr['title']}")
        print('    scope: ' + (', '.join(c.get('scope', [])) or 'MISSING CONTRACT (blocks new claims)'))


def lfs_counts(listing):
    """`git lfs ls-files` marks hydrated objects with '*' and pointer-only files with '-'."""
    marks = [line.split()[1] for line in listing.splitlines() if len(line.split()) > 2]
    return marks.count('*'), marks.count('-')


def doctor(args):
    """Report readiness for autonomous work. Only reads state; never fixes anything silently."""
    results = []

    def report(level, label, detail=''):
        results.append(level)
        print(f"[{level:4}] {label}" + (f': {detail}' if detail else ''))

    def version(cmd):
        try:
            return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=10).stdout.strip().splitlines()[0]
        except (OSError, IndexError, subprocess.TimeoutExpired):
            return ''

    node = version(['node', '-v'])
    report('ok' if node and int(node.lstrip('v').split('.')[0]) >= 22 else 'FAIL', 'Node.js 22+', node or 'missing')
    report('ok' if sys.version_info >= (3, 11) else 'FAIL', 'Python 3.11+', sys.version.split()[0])
    for tool, need in [('git-lfs', 'FAIL'), ('ffprobe', 'warn'), ('gh', 'warn')]:
        report('ok' if shutil.which(tool) else need, tool, 'found' if shutil.which(tool) else 'missing')
    browser = os.environ.get('CHROME_PATH') or shutil.which('chromium') or shutil.which('google-chrome') \
        or next((str(p) for p in [Path('/opt/pw-browsers/chromium')] if p.exists()), '')
    report('ok' if browser else 'warn', 'Chromium for browser checks', browser or 'missing; set CHROME_PATH')
    report('ok' if (ROOT / 'node_modules').exists() else 'warn', 'npm dependencies',
           'installed' if (ROOT / 'node_modules').exists() else 'run: npm ci --ignore-scripts')
    hooks = subprocess.run(['git', 'config', '--get', 'core.hooksPath'], cwd=ROOT, capture_output=True, text=True).stdout.strip()
    report('ok' if hooks == '.githooks' else 'FAIL', 'Git guards', 'installed' if hooks == '.githooks' else 'run: python3 scripts/agents.py setup')
    identity = [subprocess.run(['git', 'config', '--get', k], cwd=ROOT, capture_output=True, text=True).stdout.strip()
                for k in ('user.name', 'user.email')]
    report('ok' if all(identity) else 'warn', 'Git author', ' '.join(identity) if all(identity) else 'set on first claim')
    branch = git('branch', '--show-current')
    claimed = (ROOT / '.agent-context.json').exists()
    owned = claimed and context()['branch'] == branch
    if re.fullmatch(r'(?:agent|claude|codex)/[A-Za-z0-9._/-]+', branch):
        report('ok' if owned else 'warn', 'Task branch', f"{branch}, " + (f"claimed as {context()['task']}" if owned else 'not claimed yet: run agents.py claim'))
    else:
        report('warn', 'Task branch', f'{branch or "detached"}: use agents.py start or a provider agent/claude/codex branch')
    try:
        hydrated, pointers = lfs_counts(git('lfs', 'ls-files'))
        report('ok' if not pointers else 'warn', 'Git LFS media', f'{hydrated} hydrated, {pointers} pointer-only'
               + ('' if not pointers else '; fine for code tasks, run git lfs pull (~1.3 GB) for media/playback work'))
    except (OSError, subprocess.CalledProcessError):
        report('warn', 'Git LFS media', 'unable to list LFS files')
    if args.offline:
        print('GitHub API checks skipped (--offline).')
    else:
        try:
            repo = gh_api(f'repos/{REPOSITORY}')
            perms = repo.get('permissions') or {}
            report('ok' if perms.get('push') else 'FAIL', 'GitHub REST access',
                   'write access' if perms.get('push') else 'no write permission; claims and PRs will fail')
            if perms.get('admin'):
                report('warn', 'Credential scope', 'administrator access; workers should use ordinary write access (AGENTS.md)')
            report('ok', 'Open PR claims', str(len(open_prs())))
        except (ValueError, OSError) as e:
            report('FAIL', 'GitHub REST access', str(e))
    failed = results.count('FAIL')
    print('Ready for autonomous work.' if not failed else f'{failed} blocking problem(s) above.')
    return 1 if failed else 0


def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='action', required=True)
    sub.add_parser('setup')
    sub.add_parser('status')
    sub.add_parser('sync')
    s = sub.add_parser('doctor', help='report environment readiness for autonomous work')
    s.add_argument('--offline', action='store_true', help='skip GitHub API checks')
    for name in ['start', 'claim']:
        s = sub.add_parser(name)
        for field in ['task', 'agent', 'summary']:
            s.add_argument('--' + field, required=True)
        s.add_argument('--scope', nargs='+', required=True)
    s = sub.add_parser('commit')
    s.add_argument('--message', required=True)
    s.add_argument('--why', required=True)
    s.add_argument('--footer', help='optional extra trailers, e.g. Co-Authored-By lines')
    s.add_argument('paths', nargs='+')
    s = sub.add_parser('submit')
    for field in ['title', 'summary', 'changes', 'validation', 'risks']:
        s.add_argument('--' + field, required=True)
    s.add_argument('--footer', help='optional attribution text appended after the contract')
    args = p.parse_args()
    try:
        if args.action == 'setup':
            setup()
        elif args.action == 'status':
            status()
        elif args.action == 'doctor':
            sys.exit(doctor(args))
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
