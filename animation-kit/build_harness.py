# Packs a film's sources (<film>/src/: the shared kit via symlinks, plus optional extra.js / extra.css) into one self-contained page with a tiny stand-in for the Motion kit,
# so frames can be rendered locally at any time t: window.renderAt(t).
import json, os, sys
here = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 and not sys.argv[1].startswith('captions') else os.getcwd()
src = os.path.join(here, 'src')
scenes = json.loads(open(os.path.join(src, 'scenes.json'), encoding='utf-8').read())
captions = 'captions' in sys.argv[1:]

def read(n):
    return open(os.path.join(src, n), encoding='utf-8').read()

KIT = r'''
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const kit = {
  clamp01, seg: (t, a, b) => clamp01((t - a) / (b - a)), lerp: (a, b, p) => a + (b - a) * p,
  eo: (x) => 1 - Math.pow(1 - x, 3), ei: (x) => x * x * x,
  eio: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  eob: (x, s = 1.4) => { const c3 = s + 1; return 1 + c3 * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); },
  breathe: (t, a = 0.012, p = 3.2) => 1 + a * Math.sin(2 * Math.PI * t / p),
  h: (s) => { const d = document.createElement('div'); d.innerHTML = s.trim(); return d.firstElementChild; },
  css: (txt) => { const st = document.createElement('style'); st.textContent = txt; document.getElementById('stage').append(st); },
  defs: [], scene(id, o) { kit.defs.push([id, o]); },
};
'''

RUN = r'''
const SCENES = __SCENES__;
const stage = document.getElementById('stage');
const live = [];
let start = 0;
for (const s of SCENES.scenes) {
  const def = kit.defs.find((d) => d[0] === s.id);
  const box = document.createElement('div'); box.className = 'scene'; stage.append(box);
  const sk = Object.assign({}, kit, { stage: box, dur: s.dur, start });
  if (def[1].init) def[1].init(sk);
  live.push({ id: s.id, start, dur: s.dur, box, def: def[1], sk });
  start += s.dur;
}
window.DURATION = start;
let shown = null;
window.renderAt = (T) => {
  let cur = live[live.length - 1];
  for (const sc of live) if (T < sc.start + sc.dur) { cur = sc; break; }
  if (shown !== cur) { if (shown) shown.box.style.display = 'none'; cur.box.style.display = 'block'; shown = cur; }
  cur.def.render.call(cur.def, T - cur.start, cur.sk);
  return cur.id;
};
window.renderAt(0);
'''

page = '''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:#F3EEE4;overflow:hidden}
#stage{position:relative;width:1080px;height:1080px;overflow:hidden;background:#F3EEE4;--sans:'Rubik',system-ui,sans-serif}
.scene{position:absolute;inset:0;display:none}</style>
<style>''' + read('base.css') + (read('extra.css') if os.path.exists(os.path.join(src, 'extra.css')) else '') + '''</style></head><body><div id="stage"></div>
<script>''' + KIT + '''</script>
<script>''' + read('shared.js') + '''</script>
<script>''' + (read('extra.js') if os.path.exists(os.path.join(src, 'extra.js')) else '') + '''\nwindow.CAPTIONS = ''' + ('true' if captions else 'false') + ''';</script>
''' + ''.join('<script>{\n' + read('scene-' + s['id'] + '.js') + '\n}</script>\n' for s in scenes['scenes']) + '''
<script>''' + RUN.replace('__SCENES__', json.dumps(scenes)) + '''</script></body></html>'''
out = os.path.join(here, 'harness.html')
open(out, 'w', encoding='utf-8').write(page)
print(out)
