"""Render reviewed films, then verify the encoded files. Integration stays a separate checkpoint."""
import json
import subprocess
import sys
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed

from manage import HERE, KIT, ROOT, contact, film_dir, save_state, verify

NODE = shutil.which('node')
if not NODE:
    raise RuntimeError('Node.js 22 or newer is required; see docs/CLOUD.md')


def produce(sid):
    state = json.loads((HERE / 'state.json').read_text())['sessions'][sid]
    assert state.get('storyboard_reviewed') and state.get('frames_reviewed'), sid
    check = json.loads((HERE / 'review' / sid / 'source-check.json').read_text())
    assert not check['errors'] and not any(c['overflow'] for c in check['checks']), sid
    folder = film_dir(sid)
    log = HERE / 'review' / sid / 'render.log'
    save_state(sid, status='rendering', verified=False)
    print(json.dumps({'session': sid, 'stage': 'rendering'}), flush=True)
    with log.open('w') as output:
        subprocess.run([NODE, HERE / 'render.mjs', folder / 'harness.html',
                        KIT / 'audio' / (sid.lower() + '-voice.m4a'),
                        folder / (sid.lower() + '-full.mp4')],
                       cwd=ROOT, stdout=output, stderr=subprocess.STDOUT, check=True)
    save_state(sid, status='rendered')
    print(json.dumps({'session': sid, 'stage': 'verifying'}), flush=True)
    verify(sid)
    contact(sid)
    print(json.dumps({'session': sid, 'stage': 'ready_for_encoded_review'}), flush=True)


if __name__ == '__main__':
    sessions = sys.argv[1:]
    assert sessions and len(set(sessions)) == len(sessions)
    failures = []
    with ThreadPoolExecutor(max_workers=2) as pool:
        futures = {pool.submit(produce, sid): sid for sid in sessions}
        for future in as_completed(futures):
            sid = futures[future]
            try:
                future.result()
            except Exception as error:
                failures.append(sid)
                save_state(sid, status='needs_fix', error=str(error))
                print(json.dumps({'session': sid, 'error': str(error)}), flush=True)
    print(json.dumps({'finished': sessions, 'failed': failures}), flush=True)
    sys.exit(bool(failures))
