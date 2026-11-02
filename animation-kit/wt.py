# Estimates when words are spoken: within a narration part, speech time (pauses removed) is spread over the text by character count.
# python3 wt.py <session> <part> <word> [<word> ...]  → local seconds from the part's start
import re, sys, subprocess, json
S = sys.argv[1]; part = int(sys.argv[2]); words = sys.argv[3:]
B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/%s.dc.html' % S
src = open(B, encoding='utf-8').read()
times = eval(re.search(r'times: (\[\[.*?\]\]),', src).group(1))
lines = re.findall(r"^\s*\{ ?t: ?'([^']*)'", src, re.M)
a, b = times[part - 1]; text = lines[part - 1]
pauses = []
for tok in open('audio/%s-pauses.txt' % S.lower()).read().split():
    st, d = re.match(r'([\d.]+)\(([\d.]+)\)', tok).groups(); st, d = float(st), float(d)
    pauses.append((st, st + d))
# speech intervals inside the part
iv, cur = [], a
for st, en in pauses:
    if en <= a or st >= b: continue
    if st > cur: iv.append((cur, min(st, b)))
    cur = max(cur, en)
if cur < b: iv.append((cur, b))
iv = [(x, y) for x, y in iv if y - x > 0.15]
total = sum(y - x for x, y in iv)
def at(frac):
    want = frac * total
    for x, y in iv:
        if want <= y - x: return x + want
        want -= y - x
    return iv[-1][1]
out = {}
for w in words:
    k = text.find(w)
    out[w] = None if k < 0 else round(at(k / len(text)) - a, 2)
print(json.dumps({'part': part, 'dur': round(b - a, 2), 'speech': [(round(x - a, 2), round(y - a, 2)) for x, y in iv], 'words': out}, ensure_ascii=False))
