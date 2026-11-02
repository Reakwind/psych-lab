# Rebuilds a session board (project/scripts/<S>.dc.html) as a video player from the session 2 player template:
# one video with the guide's voice, captions from the board's own narration parts.
# python3 video_board.py <S> <video url>
import json, re, sys
S, video = sys.argv[1], sys.argv[2]
src = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/%s.dc.html' % S
old = open(src, encoding='utf-8').read()
if 'times() { return ' in old:   # already a video board: keep its parts, swap the video
    times = json.loads(re.search(r'times\(\) \{ return (.*?); \}', old).group(1))
    lines = json.loads(re.search(r'lines\(\) \{ return (.*?); \}', old).group(1))
    meta = json.loads(open('boards_meta/%s.json' % S).read())
else:
    times = eval(re.search(r'times: (\[\[.*?\]\]),', old).group(1))
    lines = re.findall(r"^\s*\{ ?t: ?'([^']*)'", old, re.M)
    m = re.search(r"session: '?([^,']+)'?, title: '([^']*)', who: '([^']*)'", old)
    meta = {'session': m.group(1), 'title': m.group(2), 'who': m.group(3)}
    __import__('os').makedirs('boards_meta', exist_ok=True); open('boards_meta/%s.json' % S, 'w').write(json.dumps(meta, ensure_ascii=False))
assert len(times) == len(lines), (len(times), len(lines))
mins = max(1, round(times[-1][1] / 60))
t = open('s02-video-template.html', encoding='utf-8').read()
for a, b in [('<title>מפגש 2: אפתיה – כשקשה להתחיל</title>', ('<title>מפגש %s: %s</title>' % (meta['session'], meta['title']) if str(meta['session']).isdigit() else '<title>%s: %s</title>' % (meta['session'], meta['title']))),
             ('<span class="where">מפגש 2</span>', ('<span class="where">מפגש %s</span>' % meta['session'] if str(meta['session']).isdigit() else '<span class="where">%s</span>' % meta['session'])),
             ('<h1 class="t-headline">אפתיה – כשקשה להתחיל</h1>', '<h1 class="t-headline">%s</h1>' % meta['title']),
             ('record_voice_over</span>נירה</span>', 'record_voice_over</span>%s</span>' % meta['who']),
             ('schedule</span>3 דקות</span>', 'schedule</span>%d דקות</span>' % mins),
             ('__VIDEO__', video), ('__TIMES__', json.dumps(times)), ('__LINES__', json.dumps(lines, ensure_ascii=False))]:
    assert a in t, a
    t = t.replace(a, b)
open(src, 'w', encoding='utf-8').write(t)
print(S, meta, mins, 'min,', len(lines), 'parts')
