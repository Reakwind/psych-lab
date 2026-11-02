"""Point every script player at its new recording and the recording's part timings.

Usage: python3 -I relink.py SCRIPTS_DIR URLS_JSON TIMINGS_JSON
URLS_JSON maps each script (S01, S03a, ...) to the uploaded file's /_blob/ address. Each player's
`audio: '...', times: [...]` line is replaced; nothing else in the file changes. A script whose
recording is missing keeps its current audio.
"""
import glob, json, os, re, sys

scripts_dir, urls_path, timings_path = sys.argv[1:4]
urls = json.load(open(urls_path))
timings = json.load(open(timings_path))

done, kept = 0, []
for f in sorted(glob.glob(os.path.join(scripts_dir, 'S[0-9]*.dc.html'))):
    stem = os.path.basename(f)[:-8]
    if stem not in urls or stem not in timings:
        kept.append(stem)
        continue
    s = open(f, encoding='utf-8').read()
    parts = len(re.findall(r'^        \{ t: ', s, re.M))
    spans = timings[stem]['spans']
    assert parts == len(spans), (stem, parts, len(spans))
    stamp = "      audio: '%s', times: %s," % (urls[stem], json.dumps(spans, separators=(',', ':')))
    s, k = re.subn(r"      audio: '[^']*', times: \[[^\n]*\],", lambda m: stamp, s, count=1)
    assert k == 1, f
    open(f, 'w', encoding='utf-8').write(s)
    done += 1
print('relinked', done, '| kept current audio:', kept)
