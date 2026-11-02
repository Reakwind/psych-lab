# Checks a rendered film against its own scenes: renders stills from the film's harness and compares them with the
# same moments in the MP4 (PSNR). A frame from another film scores far lower than compression noise.
# python3 -I verify_film.py <film dir> <mp4> [samples]
import os, re, subprocess, sys, json
film, mp4 = sys.argv[1], sys.argv[2]
n = int(sys.argv[3]) if len(sys.argv) > 3 else 16
here = os.path.dirname(os.path.abspath(__file__))
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4], capture_output=True, text=True).stdout)
ts = [round(round(dur * (k + 0.5) / n * 30) / 30, 4) for k in range(n)]
subprocess.run(['python3', '-I', os.path.join(here, 'build_harness.py'), film], capture_output=True, check=True)
out = os.path.join(film, 'vf'); subprocess.run(['rm', '-rf', out])
r = subprocess.run(['node', os.path.join(here, 'capture.mjs'), os.path.abspath(os.path.join(film, 'harness.html')), out, 'stills', ','.join(str(t) for t in ts)], capture_output=True, text=True)
if r.returncode: print('CAPTURE FAILED', r.stdout[-300:], r.stderr[-300:]); sys.exit(2)
bad = []
for t in ts:
    still = os.path.join(out, 't_' + ('%.2f' % t).rjust(7, '0') + '.png')
    q = subprocess.run(['ffmpeg', '-hide_banner', '-ss', str(t + 0.001), '-i', mp4, '-i', still, '-frames:v', '1', '-filter_complex', '[0:v]scale=1080:1080[a];[a][1:v]psnr', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'average:([\d.inf]+)', q)
    p = float(m.group(1)) if m and m.group(1) != 'inf' else 99.0
    if p < 22: bad.append((t, round(p, 1)))
subprocess.run(['rm', '-rf', out])
print(json.dumps({'film': film, 'dur': round(dur, 2), 'checked': len(ts), 'bad': bad}))
