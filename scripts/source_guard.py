#!/usr/bin/env python3
"""Source material is read-only: files may be added, never modified, renamed or deleted.

`source-material.json` lists protected path prefixes and the SHA-256 of every protected file.
For Git LFS files the pointer's oid is that same content hash, so checks work with or without
hydrated media. `register` records newly added source files; it never rewrites an entry.
"""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

from agent_safety import ROOT, git

MANIFEST = 'source-material.json'
LFS_OID = re.compile(rb'^version https://git-lfs\.github\.com/spec/v1\noid sha256:([0-9a-f]{64})\n')


def load(text=None):
    data = json.loads(text if text is not None else (ROOT / MANIFEST).read_text())
    return data['protected'], data['files']


def protected(path, prefixes):
    return any(path == p or (p.endswith('/') and path.startswith(p)) for p in prefixes)


def digest(path):
    data = (ROOT / path).read_bytes()
    match = LFS_OID.match(data[:200])
    return match[1].decode() if match else hashlib.sha256(data).hexdigest()


def tracked(prefixes):
    return [p for p in git('ls-files', '-z').split('\0') if p and protected(p, prefixes)]


def verify():
    prefixes, files = load()
    problems = []
    present = set(tracked(prefixes))
    for path, expected in sorted(files.items()):
        if path not in present:
            problems.append(f'{path}: source file deleted or renamed')
        elif digest(path) != expected:
            problems.append(f'{path}: source file modified')
    for path in sorted(present - files.keys()):
        problems.append(f'{path}: new source file not registered (run python3 scripts/source_guard.py register)')
    return problems


def manifest_problems(old_text, new_text):
    """A manifest change may only add files or prefixes; existing entries are immutable."""
    old_prefixes, old_files = load(old_text)
    new_prefixes, new_files = load(new_text)
    problems = [f'{p}: protected prefix removed' for p in old_prefixes if p not in new_prefixes]
    problems += [f'{p}: source entry removed or changed' for p, h in old_files.items() if new_files.get(p) != h]
    return problems


def staged_problems():
    """Pre-commit: reject staged modification, deletion or rename of a protected file."""
    prefixes, _ = load()
    problems = []
    fields = git('diff', '--cached', '--name-status', '-z', '-M').split('\0')
    i = 0
    while i < len(fields) and fields[i]:
        status = fields[i]
        paths = fields[i + 1:i + (3 if status[0] in 'RC' else 2)]
        i += 1 + len(paths)
        # A (add) and C (copy, source untouched) are allowed; M, D, R and T alter the original.
        if status[0] in 'MDRT' and protected(paths[0], prefixes):
            problems.append(f'{paths[0]}: source material is read-only ({status[0]})')
    if MANIFEST in git('diff', '--cached', '--name-only', '-z').split('\0'):
        try:
            head = git('show', 'HEAD:' + MANIFEST)
        except subprocess.CalledProcessError:
            head = None  # First introduction of the manifest.
        if head is not None:
            problems += manifest_problems(head, git('show', ':' + MANIFEST))
    return problems


def register():
    prefixes, files = load()
    added = {p: digest(p) for p in tracked(prefixes) if p not in files}
    (ROOT / MANIFEST).write_text(json.dumps({'protected': prefixes, 'files': {**files, **added}},
                                            ensure_ascii=False, indent=1, sort_keys=True) + '\n')
    print(f'Registered {len(added)} new source file(s); existing entries unchanged.')


def main():
    action = sys.argv[1] if len(sys.argv) > 1 else 'verify'
    if action == 'register':
        register()
        return
    problems = verify()
    if problems:
        print('Source material changed:\n- ' + '\n- '.join(problems), file=sys.stderr)
        sys.exit(1)
    print(f'Source material intact ({len(load()[1])} protected files).')


if __name__ == '__main__':
    main()
