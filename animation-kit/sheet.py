import sys, subprocess, os
d, out, per = sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 12
files = sorted(f for f in os.listdir(d) if f.endswith('.png'))
for g in range(0, len(files), per):
    fs = files[g:g+per]; n = len(fs)
    args = []
    for f in fs: args += ['-i', os.path.join(d, f)]
    fc = ''.join(f'[{k}]scale=360:360[s{k}];' for k in range(n)) + ''.join(f'[s{k}]' for k in range(n))
    fc += f'xstack=inputs={n}:fill=white:layout=' + '|'.join(f'{(k%4)*360}_{(k//4)*360}' for k in range(n)) + '[o]'
    o = f'{out}{g//per}.png'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + args + ['-filter_complex', fc, '-map', '[o]', o], check=True)
    print(o, ' '.join(f[2:-4].lstrip('0') for f in fs))
