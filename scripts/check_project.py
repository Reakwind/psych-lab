#!/usr/bin/env python3
"""Fast offline checks; --media also verifies hydrated source media with FFprobe."""
import argparse
import ast
import json
from pathlib import Path
import subprocess

from agent_safety import ROOT, git, scan_secrets
import source_guard


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--media', action='store_true')
    args = p.parse_args()
    paths = [ROOT / x for x in git('ls-files', '-z').split('\0') if x]
    for file in paths:
        if file.is_symlink():
            continue  # Preserve historical backup links without dereferencing them.
        if file.suffix == '.py':
            ast.parse(file.read_text(), filename=str(file))
        elif file.suffix == '.mjs':
            subprocess.run(['node', '--check', file], check=True, capture_output=True)
    print(f'Syntax and secret checks passed for {scan_secrets()} tracked files.')
    problems = source_guard.verify()
    if problems:
        raise ValueError('Source material is read-only:\n- ' + '\n- '.join(problems))
    print(f'Source material intact ({len(source_guard.load()[1])} protected files).')
    program = json.loads((ROOT / 'psych-lab/intervention/program.json').read_text())
    if args.media:
        urls = {c['url'] for c in program['clips'].values()}
        urls.update(a['audio']['url'] for a in program['activities'].values() if a.get('audio'))
        for url in sorted(urls):
            if url.startswith('/intervention/'):
                file = ROOT / 'psych-lab' / url.lstrip('/')
            elif url.startswith('/media/'):
                file = ROOT / url.removeprefix('/media/')
            else:
                raise ValueError('Unknown media route: ' + url)
            with file.open('rb') as f:
                if f.read(80).startswith(b'version https://git-lfs.github.com/spec/v1'):
                    raise ValueError(f'Git LFS media not downloaded: {file.relative_to(ROOT)}. Run git lfs pull.')
            info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', file]))
            if float(info['format']['duration']) <= 0:
                raise ValueError('Empty media: ' + str(file))
        print(f'FFprobe passed for {len(urls)} referenced media files.')


if __name__ == '__main__':
    main()
