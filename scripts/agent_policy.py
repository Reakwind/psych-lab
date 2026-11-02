#!/usr/bin/env python3
"""Trusted-base PR policy. Treat PR metadata as data and never run PR code here."""
import base64
import json
import os
import re
import subprocess
import sys

from agent_safety import REPOSITORY, check_scope, overlap, validate_contract

MARKER = re.compile(r'<!-- agent-contract\s*\n(.*?)\n-->', re.S)


def contract(body):
    matches = MARKER.findall(body or '')
    if len(matches) != 1:
        raise ValueError('PR needs exactly one agent contract. Use scripts/agents.py claim/submit.')
    return validate_contract(json.loads(matches[0]))


def check_claims(c, pages, current):
    for pr in [p for page in pages for p in page]:
        if current is not None and pr['number'] >= current:
            continue  # Deterministic priority: the oldest open claim wins.
        try:
            other = contract(pr.get('body'))
        except (ValueError, TypeError):
            raise ValueError(f"Open PR #{pr['number']} has no valid scope contract. Resolve it before claiming shared work.")
        if other['task'] == c['task'] or overlap(c['scope'], other['scope']):
            raise ValueError(f"Scope already reserved by PR #{pr['number']} ({other['task']}). Split scope or wait for it to merge.")


def api(path, pages=False):
    args = ['gh', 'api'] + (['--paginate', '--slurp'] if pages else []) + [path]
    return json.loads(subprocess.check_output(args, text=True))


def main():
    event = json.load(open(os.environ['GITHUB_EVENT_PATH']))
    number = event['pull_request']['number']
    # Refresh the current head/body rather than trusting a stale event payload.
    pr = api(f'repos/{REPOSITORY}/pulls/{number}')
    if pr['state'] != 'open':
        return
    c = contract(pr['body'])
    if pr['base']['ref'] != 'main' or pr['head']['ref'] != c['branch'] or pr['head']['repo']['full_name'] != REPOSITORY:
        raise ValueError('Use a same-repository owned task branch targeting main.')
    if not re.fullmatch(r'(feat|fix|docs|test|refactor|chore|build|ci|style|perf)(\([a-z0-9-]+\))?: .{8,}', pr['title']):
        raise ValueError('PR title must be a specific conventional commit subject.')
    for heading in ['Purpose', 'Changes', 'Validation', 'Risks and source changes', 'Ownership']:
        if f'## {heading}\n' not in pr['body']:
            raise ValueError('Missing PR section: ' + heading)
    pages = api(f'repos/{REPOSITORY}/pulls/{number}/files?per_page=100', pages=True)
    files = [f for page in pages for f in page]
    if len(files) != pr['changed_files']:
        raise ValueError('GitHub did not return every changed file; split this PR before merging.')
    paths = [p for f in files for p in [f['filename'], f.get('previous_filename')] if p]
    check_scope(c, paths)
    metadata = f"docs/agent-tasks/{c['task']}.json"
    snapshot = api(f"repos/{REPOSITORY}/contents/{metadata}?ref={pr['head']['sha']}")
    if json.loads(base64.b64decode(snapshot['content'])) != c:
        raise ValueError('The committed task manifest and PR contract must match.')
    check_claims(c, api(f'repos/{REPOSITORY}/pulls?state=open&per_page=100', pages=True), number)
    # Merge commits from main are expected; every authored task commit carries attribution.
    commits = api(f'repos/{REPOSITORY}/pulls/{number}/commits?per_page=100', pages=True)
    for commit in [x for page in commits for x in page]:
        message = commit['commit']['message']
        if len(commit.get('parents', [])) > 1:
            continue
        if f"\nTask: {c['task']}" not in message or f"\nAgent: {c['agent']}" not in message:
            raise ValueError('Each task commit needs Task and Agent trailers: ' + commit['sha'][:8])
    print(f"Task {c['task']} owns {len(files)} changed files; no older claim overlaps.")


if __name__ == '__main__':
    try:
        main()
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as e:
        print('Agent policy: ' + str(e), file=sys.stderr)
        sys.exit(1)
