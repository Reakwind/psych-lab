#!/usr/bin/env python3
"""Cooperative local guardrails; GitHub rules protect shared history independently."""
import argparse
import json
import os
from pathlib import Path
import re
import shlex
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ZERO = '0' * 40
REPOSITORY = 'Reakwind/psych-lab'


def git(*args, cwd=None):
    return subprocess.check_output(['git', *args], cwd=cwd or ROOT, text=True).strip()


def json_pages(text):
    """Decode gh api --paginate without depending on newer gh --slurp support."""
    decoder, pages = json.JSONDecoder(), []
    while text.strip():
        page, end = decoder.raw_decode(text.lstrip())
        if not isinstance(page, list):
            raise ValueError('Expected paginated JSON arrays.')
        pages.append(page)
        text = text.lstrip()[end:]
    return pages


def origin_allowed(url):
    canonical = re.fullmatch(r'(?:https://github\.com/|git@github\.com:)' + re.escape(REPOSITORY) + r'(?:\.git)?/?', url)
    if canonical:
        return True
    parsed = urlsplit(url)
    path = unquote(parsed.path).rstrip('/').removesuffix('.git')
    # Hosted agents may authenticate through a repository-specific local proxy.
    proxy_host = parsed.hostname in {'localhost', '127.0.0.1', '::1'}
    trusted_proxy = os.environ.get('AGENT_GIT_PROXY_ORIGIN') == url
    return (parsed.scheme in {'http', 'https'} and (proxy_host or trusted_proxy)
            and path.endswith('/' + REPOSITORY) and not parsed.password
            and not parsed.query and not parsed.fragment)


def scope_valid(scope):
    return (isinstance(scope, str) and bool(scope.strip('/')) and not scope.startswith(('/', '-'))
            and not any(p in {'.', '..', '.git'} for p in scope.split('/'))
            and not any(c in scope for c in '*?[]\\\n\r\t') and not scope.endswith('//'))


def owns(scope, path):
    return path == scope or (scope.endswith('/') and path.startswith(scope))


def overlap(left, right):
    return any(owns(a, b.rstrip('/')) or owns(b, a.rstrip('/')) for a in left for b in right)


def validate_contract(c):
    if not isinstance(c, dict) or not re.fullmatch(r'[a-z0-9][a-z0-9-]{2,63}', c.get('task', '')):
        raise ValueError('Task must be a 3–64 character lowercase slug.')
    if not isinstance(c.get('agent'), str) or not c['agent'].strip():
        raise ValueError('Identify the responsible agent.')
    if not isinstance(c.get('scope'), list) or not c['scope'] or not all(scope_valid(p) for p in c['scope']):
        raise ValueError('Declare exact files or directory prefixes ending with /. Globs and root-wide claims are forbidden.')
    branch = c.get('branch', '')
    if not re.fullmatch(r'(?:agent|claude|codex)/[A-Za-z0-9._/-]+', branch) or '..' in branch:
        raise ValueError('Use a unique agent/, claude/, or codex/ task branch.')
    return c


def context():
    return validate_contract(json.loads((ROOT / '.agent-context.json').read_text()))


def check_scope(c, paths):
    metadata = f"docs/agent-tasks/{c['task']}.json"
    outside = [p for p in paths if p != metadata and not any(owns(s, p) for s in c['scope'])]
    if outside:
        raise ValueError('Files outside the reserved task scope: ' + ', '.join(outside))


SECRET_PATTERNS = [
    ('private key', re.compile(r'-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----')),
    ('GitHub credential', re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b')),
    ('API credential', re.compile(r'\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{24,}\b')),
    ('AWS credential', re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b')),
    ('signed URL', re.compile(r'[?&](?:sig|signature|x-amz-signature|access_token|token)=[^\s"<>\\&]{12,}', re.I)),
    ('embedded URL password', re.compile(r'https?://[^\s/:]+:[^\s/@]{5,}@')),
    ('literal secret assignment', re.compile(r'''(?im)^\s*(?:["']?(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)["']?)\s*[:=]\s*["'][A-Za-z0-9_+/=-]{24,}["']''')),
]


def scan_secrets(staged=False):
    paths = git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0') if staged else git('ls-files', '-z').split('\0')
    issues = []
    for name in filter(None, paths):
        p = Path(name)
        if p.name == '.env' or (p.name.startswith('.env.') and p.name != '.env.example') or p.suffix in {'.pem', '.key', '.p12', '.pfx'}:
            issues.append(f'{name}: credential file must not be tracked')
            continue
        file = ROOT / name
        data = (subprocess.check_output(['git', 'show', ':' + name], cwd=ROOT) if staged
                else os.readlink(file).encode() if file.is_symlink() else file.read_bytes())
        if b'\0' in data[:8192] or len(data) > 8_000_000:
            continue
        text = data.decode('utf-8', errors='replace')
        for label, pattern in SECRET_PATTERNS:
            if pattern.search(text):
                issues.append(f'{name}: possible {label}')
    if issues:
        raise ValueError('\n'.join(issues))  # Never print credential values.
    return len(list(filter(None, paths)))


READ_ONLY = {'status', 'diff', 'log', 'show', 'fetch', 'ls-files', 'ls-tree', 'rev-parse', 'rev-list',
             'merge-base', 'check-ref-format', 'cat-file', 'describe', 'shortlog', 'blame', 'version', 'help',
             'grep', 'check-ignore', 'show-ref', 'for-each-ref', 'ls-remote', 'count-objects', 'var'}
# Environment assignments that redirect Git away from the guarded repository or configuration.
GIT_OVERRIDE = re.compile(r'\bGIT_(?:CONFIG|INDEX_FILE|DIR|WORK_TREE|COMMON_DIR|SSH_COMMAND)\w*["\']?\]?\s*[=:]'
                          r'|\bHUSKY\s*=\s*0')
# `.git` as a path component, e.g. `.git`, `./.git/hooks`; not `.github/` or `.gitignore`.
GIT_METADATA = re.compile(r'(?:^|/)\.git(?:/|$)')
REMOVERS = {'rm', 'rmdir', 'unlink', 'Remove-Item', 'shred'}
WRITERS = {'tee', 'cp', 'mv', 'ln', 'truncate', 'install', 'chmod', 'chown', 'dd', 'rsync'}
SHELLS = {'bash', 'sh', 'zsh', 'dash', 'ksh'}
HEREDOC = re.compile(r'<<-?\s*(["\']?)([A-Za-z_][A-Za-z0-9_]*)\1')


def strip_data_heredocs(command):
    """Drop heredoc bodies fed to non-shell programs (Python, cat, tee); keep shell ones for inspection."""
    lines, out, i = command.split('\n'), [], 0
    while i < len(lines):
        line = lines[i]
        out.append(line)
        i += 1
        match = HEREDOC.search(line)  # Only the first heredoc per line; later ones stay inspected.
        if not match:
            continue
        segment = re.split(r'[;&|]', line[:match.start()])[-1].split()
        words = [w for w in segment if '=' not in w or w.startswith('-')]
        program = Path(words[0]).name if words else ''
        if program in SHELLS | {'env', 'xargs', 'eval', 'source', '.', 'sudo', 'exec'}:
            continue  # Something that may execute the body: inspect it as commands.
        body_end = next((j for j in range(i, len(lines)) if lines[j].strip() == match[2]), len(lines))
        del lines[i:body_end]
    return '\n'.join(out)


def command_problem(command):
    """Inspect shell tokens including compound commands and nested shell -c strings.

    This is an accident guard, not a sandbox for arbitrary Python or shell code.
    Hooks and GitHub protections must never be removed to get around a denial.
    """
    command = strip_data_heredocs(command)
    try:
        lexer = shlex.shlex(command, posix=True, punctuation_chars=';&|()<>')
        lexer.whitespace_split = True
        tokens = list(lexer)
    except ValueError:
        return 'Cannot safely parse this command.'
    if GIT_OVERRIDE.search(command):
        return 'Git environment overrides can bypass repository safeguards.'
    metadata = [t for t in tokens if GIT_METADATA.search(t)]
    if metadata and any(Path(t).name in REMOVERS for t in tokens):
        return 'Removing Git metadata is forbidden.'
    if metadata and ('-delete' in tokens or any(Path(t).name in WRITERS for t in tokens)
                     or any(t in {'>', '>>', '>|'} and i + 1 < len(tokens) and GIT_METADATA.search(tokens[i + 1])
                            for i, t in enumerate(tokens))):
        return 'Destructive writes to Git metadata are forbidden.'
    for i, t in enumerate(tokens):
        if Path(t).name in {'bash', 'sh', 'zsh'} and i + 2 < len(tokens) and 'c' in tokens[i+1].lstrip('-'):
            problem = command_problem(tokens[i+2])
            if problem:
                return problem
        if Path(t).name != 'git':
            continue
        args = tokens[i+1:]
        end = next((j for j, a in enumerate(args) if a and all(c in ';&|()<>\n' for c in a)), len(args))
        args = args[:end]
        while args and args[0].startswith('-'):
            if args[0] == '-C' and len(args) > 2:
                args = args[2:]
            elif args[0] in {'--no-pager', '--paginate'}:
                args = args[1:]
            else:
                return 'Git configuration, repository overrides, and unknown global options are forbidden.'
        if not args:
            continue
        sub, rest = args[0], args[1:]
        if sub in READ_ONLY:
            if sub == 'fetch' and any(a.startswith('--prune') for a in rest):
                return 'Do not prune references during autonomous work.'
            continue
        if sub == 'lfs' and rest and rest[0] in {'pull', 'fetch', 'status', 'ls-files', 'fsck', 'version', 'env'}:
            continue
        if sub == 'add' and '--all' not in rest and '-A' not in rest and '.' not in rest:
            continue
        if sub == 'commit' and not any(a in {'--amend', '--no-verify', '-n', '-a', '--all'} or a.startswith('--fixup') for a in rest):
            continue
        if sub == 'push':
            flags = [a for a in rest if a.startswith('-')]
            if any(a not in {'-u', '--set-upstream', '--dry-run', '--porcelain', '--verbose'} for a in flags) or any(a.startswith(('+', ':')) for a in rest):
                return 'Only an ordinary fast-forward push of the owned branch is allowed.'
            # The pre-push hook checks the actual source, destination, and ancestry.
            continue
        if sub == 'switch' and '-C' not in rest and not any(a.startswith(('--discard', '--force', '--detach', '--orphan')) or a == '-f' for a in rest):
            continue
        if sub == 'restore' and '--staged' in rest and not any(a == '--worktree' or a == '-W' or a.startswith('--source') for a in rest):
            continue
        if sub == 'merge' and rest == ['--no-edit', 'origin/main']:
            continue
        if sub == 'branch' and (not rest or rest in [['--show-current'], ['--list'], ['-a'], ['-v'], ['-vv']]):
            continue
        if sub == 'worktree' and rest and rest[0] == 'list':
            continue
        if sub == 'remote' and (not rest or rest == ['-v'] or (rest[0] == 'get-url' and len(rest) == 2)):
            continue
        if sub == 'stash' and rest and rest[0] in {'list', 'show'}:
            continue
        if sub == 'config':
            while rest and rest[0] in {'--global', '--local', '--system', '--show-origin', '--show-scope', '--includes'}:
                rest = rest[1:]
            if rest and rest[0] in {'--get', '--get-all', '--get-regexp', '--list', '-l'}:
                continue
        return f'Git action {sub!r} is outside the safe autonomous workflow. Use scripts/agents.py.'
    return None


def pre_commit():
    c = context()
    if git('branch', '--show-current') != c['branch']:
        raise ValueError('Commits require the owned task branch; direct main commits are blocked.')
    check_scope(c, filter(None, git('diff', '--cached', '--name-only', '-z').split('\0')))
    scan_secrets(staged=True)


def pre_push(remote, url, lines):
    c = context()
    if remote != 'origin' or not origin_allowed(url):
        raise ValueError('Push only to this project’s origin remote.')
    ref = 'refs/heads/' + c['branch']
    for line in lines.splitlines():
        local_ref, local_sha, remote_ref, remote_sha = line.split()
        if local_ref != ref or remote_ref != ref or local_sha == ZERO:
            raise ValueError('No main, tag, deletion, or other-agent pushes; push the owned branch only.')
        if remote_sha != ZERO:
            result = subprocess.run(['git', 'merge-base', '--is-ancestor', remote_sha, local_sha], cwd=ROOT, capture_output=True)
            if result.returncode:
                raise ValueError('Non-fast-forward push blocked. Fetch, inspect, and merge; never force.')


def main():
    p = argparse.ArgumentParser()
    p.add_argument('action', choices=['claude', 'pre-commit', 'pre-push', 'scan'])
    p.add_argument('extra', nargs='*')
    args = p.parse_args()
    try:
        if args.action == 'claude':
            data = json.load(sys.stdin)
            problem = command_problem(data.get('tool_input', {}).get('command', ''))
            if problem:
                print(json.dumps({'hookSpecificOutput': {'hookEventName': 'PreToolUse', 'permissionDecision': 'deny', 'permissionDecisionReason': problem}}))
        elif args.action == 'pre-commit':
            pre_commit()
        elif args.action == 'pre-push':
            pre_push(*args.extra, sys.stdin.read())
        else:
            print(f'Secret scan passed ({scan_secrets()} tracked files).')
    except (ValueError, OSError, subprocess.CalledProcessError) as e:
        print('Agent safety: ' + str(e), file=sys.stderr)
        sys.exit(2)


if __name__ == '__main__':
    main()
