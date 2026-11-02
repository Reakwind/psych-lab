// Renders a film harness at given times (stills) or every frame (video) with headless Chrome over the DevTools protocol.
// Guarded: it takes a free port from the OS and checks every frame is OUR harness, since two captures on one port once filmed each other.
// Renders the harness page at given times (or every frame) with headless Chrome over the DevTools protocol.
// node capture.mjs <harness.html> <outdir> stills 1.5,20,33   |   node capture.mjs <harness.html> <outdir> video 30
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:net';

const [harness, outDir, mode, arg] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = await new Promise((r) => { const sv = createServer(); sv.listen(0, '127.0.0.1', () => { const p = sv.address().port; sv.close(() => r(p)); }); });
const prof = mkdtempSync(join(tmpdir(), 'cap-'));
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + prof, '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1080,1080', '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) { await sleep(200); try { target = (await (await fetch('http://127.0.0.1:' + port + '/json')).json()).find((x) => x.type === 'page'); } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let seq = 0; const waiting = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.method === 'Runtime.exceptionThrown') console.log('PAGE ERROR', JSON.stringify(d.params.exceptionDetails).slice(0, 600)); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; waiting.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const evalJs = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 800)); return r.result.result.value; };
await send('Emulation.setDeviceMetricsOverride', { width: 1080, height: 1080, deviceScaleFactor: 1, mobile: false });
await send('Page.enable'); await send('Runtime.enable');
const WANT = pathToFileURL(harness).href;
await send('Page.navigate', { url: WANT });
for (let i = 0; i < 60; i++) { await sleep(250); try { if (await evalJs('typeof window.renderAt === "function" && document.readyState === "complete"')) break; } catch {} }
await evalJs('document.fonts.ready.then(() => true)');
const dur = await evalJs('window.DURATION');
const shot = async (t, file, fmt) => {
  const here = await evalJs('location.href');
  if (here !== WANT) { console.log('WRONG PAGE', here); process.exit(3); }
  await evalJs('window.renderAt(' + t + '); new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))');
  const r = await send('Page.captureScreenshot', { format: fmt, quality: fmt === 'jpeg' ? 92 : undefined, clip: { x: 0, y: 0, width: 1080, height: 1080, scale: 1 } });
  writeFileSync(file, Buffer.from(r.result.data, 'base64'));
};
if (mode === 'stills') {
  for (const t of arg.split(',').map(Number)) { const f = join(outDir, 't_' + t.toFixed(2).padStart(7, '0') + '.png'); await shot(t, f, 'png'); console.log(f); }
} else {
  const fps = Number(arg || 30), n = Math.ceil(dur * fps);
  for (let i = 0; i < n; i++) { await shot(i / fps, join(outDir, 'f' + String(i).padStart(5, '0') + '.jpg'), 'jpeg'); if (i % 300 === 0) console.log('frame', i, '/', n); }
  console.log('frames', n, 'fps', fps, 'duration', dur);
}
ws.close(); chrome.kill();
