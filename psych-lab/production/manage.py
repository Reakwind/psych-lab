"""Production checkpoints for completing the saved Psych Lab session films."""
import argparse
import fcntl
import json
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
KIT = ROOT / 'animation-kit'
MANIFEST = json.loads((HERE / 'manifest.json').read_text())


def run(args, **kwargs):
    return subprocess.run([str(a) for a in args], check=True, **kwargs)


def film_dir(sid):
    return KIT / ('film' + sid[1:].lstrip('0'))


def duration(file):
    return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                      '-of', 'csv=p=0', file], capture_output=True, text=True).stdout)


def save_state(sid, **data):
    path = HERE / 'state.json'
    with (HERE / 'state.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        state = json.loads(path.read_text())
        state['sessions'][sid].update(data, updated_at=datetime.now().isoformat(timespec='seconds'))
        path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n')


def prepare(sids):
    for sid in sids:
        target = KIT / 'audio' / (sid.lower() + '-voice.m4a')
        if not target.exists():
            original = ROOT / 'voice-over/elevenlabs/out' / (sid + '.mp4')
            run(['ffmpeg', '-v', 'error', '-y', '-i', original, '-vn', '-c:a', 'copy', target])
        assert abs(duration(target) - MANIFEST[sid]['times'][-1][1]) < .15, sid
        pause_path = target.with_name(sid.lower() + '-pauses.txt')
        if not pause_path.exists():
            result = run(['ffmpeg', '-hide_banner', '-i', target, '-af',
                          'silencedetect=noise=-35dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True)
            pauses = re.findall(r'silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)', result.stderr)
            pause_path.write_text(' '.join(f'{float(end)-float(span):.2f}({float(span):.2f})' for end, span in pauses) + '\n')
        print(sid, 'final recorded audio ready', round(duration(target), 2), flush=True)


def contact(sid):
    film = film_dir(sid)
    movie = film / (sid.lower() + '-full.mp4')
    dest = HERE / 'review' / sid
    images = dest / 'encoded'
    images.mkdir(parents=True, exist_ok=True)
    times = []
    for part, (start, end) in enumerate(MANIFEST[sid]['times'], 1):
        for k, fraction in enumerate([.22, .78], 1):
            at = start + fraction * (end - start)
            times.append((part, k, round(at, 3), images / f'{part:03d}-{k}.png'))
    def sample(row):
        _, _, at, out = row
        run(['ffmpeg', '-v', 'error', '-y', '-ss', at, '-i', movie, '-frames:v', '1',
             '-vf', 'scale=360:360', '-threads', '1', out], stdout=subprocess.DEVNULL)
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(sample, times))
    for start in range(0, len(times), 16):
        block = times[start:start+16]
        command = ['ffmpeg', '-v', 'error', '-y']
        for _, _, _, file in block:
            command += ['-i', file]
        layout = '|'.join(f'{k%4*360}_{k//4*360}' for k in range(len(block)))
        graph = ''.join(f'[{k}:v]' for k in range(len(block))) + f'xstack=inputs={len(block)}:fill=white:layout={layout}[out]'
        out = dest / f'sheet-{start//16+1}.png'
        run(command + ['-filter_complex', graph, '-map', '[out]', '-frames:v', '1', '-threads', '1', out])
        print(out, flush=True)
    (dest / 'samples.json').write_text(json.dumps([{'part': p, 'sample': k, 'time': t, 'file': str(f)} for p,k,t,f in times], indent=2)+'\n')


def verify(sid):
    dest = HERE / 'review' / sid
    dest.mkdir(parents=True, exist_ok=True)
    film = film_dir(sid)
    movie = film / (sid.lower() + '-full.mp4')
    result = run([sys.executable, '-I', KIT / 'verify_film.py', film, movie, '16'], cwd=KIT, capture_output=True, text=True)
    (dest / 'verification.log').write_text(result.stdout + result.stderr)
    output = json.loads(result.stdout.strip().splitlines()[-1])
    assert output['checked'] == 16 and not output['bad'], output
    run(['ffmpeg', '-v', 'error', '-i', movie, '-f', 'null', '-'], capture_output=True)
    assert abs(duration(movie) - MANIFEST[sid]['expected_duration']) <= .15
    (dest / 'verification.json').write_text(json.dumps(output, indent=2)+'\n')
    save_state(sid, verified=True, error=None)
    print(json.dumps(output), flush=True)


def source_sheets(sid,story=False):
    dest=HERE/'review'/sid
    files=sorted(dest.glob('rough-*.png')) if story else sorted(p for p in dest.glob('source-*.png') if re.fullmatch(r'source-\d{3}-[12]\.png',p.name))
    assert len(files)==len(MANIFEST[sid]['times'])*(1 if story else 2),(sid,len(files))
    for start in range(0,len(files),16):
        block=files[start:start+16];args=['ffmpeg','-v','error','-y']
        for file in block:args+=['-i',file]
        graph=''.join(f'[{i}:v]scale=360:360[s{i}];' for i in range(len(block)))
        graph+=('[s0]null[out]' if len(block)==1 else ''.join(f'[s{i}]' for i in range(len(block)))+f'xstack=inputs={len(block)}:fill=white:layout='+ '|'.join(f'{i%4*360}_{i//4*360}' for i in range(len(block)))+'[out]')
        out=dest/f'{"story" if story else "source"}-sheet-{start//16+1}.png'
        run(args+['-filter_complex',graph,'-map','[out]','-frames:v','1','-threads','1',out])
        print(out,flush=True)


def story_sheets(sid):
    source_sheets(sid,story=True)


def integrate(sid):
    review = HERE / 'review' / sid
    assert json.loads((review / 'verification.json').read_text())['bad'] == []
    assert json.loads((HERE / 'state.json').read_text())['sessions'][sid].get('frames_reviewed'), sid
    movie = film_dir(sid) / (sid.lower() + '-full.mp4')
    audio_check = json.loads((review / 'audio-check.json').read_text())
    assert audio_check['correlation'] > .995 and audio_check['movie_modified_ns'] == movie.stat().st_mtime_ns, sid
    dest = ROOT / 'voice-over/mp4' / (sid + '-animated.mp4')
    shutil.copy2(movie, dest)
    url = '/media/' + dest.relative_to(ROOT).as_posix()
    run([sys.executable, '-I', KIT / 'video_board.py', sid, url], cwd=KIT)
    save_state(sid, status='integrated', video_url=url)
    run([sys.executable, ROOT / 'psych-lab/audit.py'])


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('action', choices=['prepare','contact','source_sheets','story_sheets','verify','integrate','reviewed'])
    parser.add_argument('sessions', nargs='+')
    args=parser.parse_args()
    if args.action == 'prepare':
        prepare(args.sessions)
    else:
        for sid in args.sessions:
            if args.action == 'reviewed':
                save_state(sid, frames_reviewed=True)
            else:
                globals()[args.action](sid)
