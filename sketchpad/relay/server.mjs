#!/usr/bin/env node
// The sketchpad relay: a small local server between the drawing board and Claude.
//
// It serves the board (relay/board/) and the designs Claude makes (<root>/designs/<name>/), passes the
// strokes on while they are drawn, and saves each Send as a sketch packet in <root>/sketches/<id>/.
// It tells the mod what happens by printing one line per event on stdout: `SKETCHPAD {json}`.
// It also runs on its own, without the mod:
//
//   node sketchpad/relay/server.mjs                  root ./studio, http://127.0.0.1:63690, this computer only
//   node sketchpad/relay/server.mjs --root DIR       another studio folder
//   node sketchpad/relay/server.mjs --port 8080      another port (the next free one is taken if it is busy)
//   node sketchpad/relay/server.mjs --lan            also on the local network, for an iPad on the same Wi-Fi
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BOARD = path.join(HERE, 'board');
const args = process.argv.slice(2);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const ROOT = path.resolve(opt('--root') || 'studio');
const DESIGNS = path.join(ROOT, 'designs');
const SKETCHES = path.join(ROOT, 'sketches');
const FIRST_PORT = Number(opt('--port') || 63690);
const LAN = args.includes('--lan');
const HOST = LAN ? '0.0.0.0' : '127.0.0.1';
const MAX_BODY = 40 * 1024 * 1024;

const TYPES = {'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8'};

fs.mkdirSync(DESIGNS, {recursive: true});
fs.mkdirSync(SKETCHES, {recursive: true});

function emit(event) { process.stdout.write('SKETCHPAD ' + JSON.stringify(event) + '\n'); }

function send(res, status, body, type = 'text/plain; charset=utf-8', extra = {}) {
  res.writeHead(status, {'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra});
  res.end(body);
}
const json = (res, status, value) => send(res, status, JSON.stringify(value), 'application/json; charset=utf-8');

// A path under `base`, or null when the request tries to leave it.
function inside(base, rel) {
  const file = path.resolve(base, '.' + path.sep + rel);
  return file === base || file.startsWith(base + path.sep) ? file : null;
}

function sendFile(res, file) {
  let stat;
  try { stat = fs.statSync(file); } catch { return send(res, 404, 'Not found'); }
  if (stat.isDirectory()) return sendFile(res, path.join(file, 'index.html'));
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {'Content-Type': type, 'Content-Length': stat.size, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'});
  fs.createReadStream(file).pipe(res);
}

// Every file of a design folder, sorted, skipping hidden ones.
function designFiles(dir, rel = '') {
  let out = [];
  for (const name of fs.readdirSync(path.join(dir, rel)).sort()) {
    if (name.startsWith('.')) continue;
    const r = rel ? rel + '/' + name : name;
    const st = fs.statSync(path.join(dir, r));
    if (st.isDirectory()) out = out.concat(designFiles(dir, r));
    else out.push(r);
  }
  return out;
}

// A design's version: a short hash of its files' names and bytes, so it changes whenever Claude edits it.
function designVersion(name) {
  const dir = path.join(DESIGNS, name);
  const hash = crypto.createHash('sha1');
  for (const rel of designFiles(dir)) { hash.update(rel + '\0'); hash.update(fs.readFileSync(path.join(dir, rel))); }
  return hash.digest('hex').slice(0, 10);
}

function listDesigns() {
  const list = [];
  for (const name of fs.readdirSync(DESIGNS).sort()) {
    const dir = path.join(DESIGNS, name);
    if (name.startsWith('.') || !fs.statSync(dir).isDirectory() || !fs.existsSync(path.join(dir, 'index.html'))) continue;
    const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    const title = (/<title>([^<]*)<\/title>/i.exec(html) || [])[1] || name;
    list.push({name, title: title.trim(), version: designVersion(name)});
  }
  return list;
}

// Server-sent events to every open board: a design changed, a sketch was saved, someone is drawing.
const clients = new Set();
function broadcast(type, data) {
  const msg = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) res.write(msg);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

function nextSketchId() {
  const ids = fs.readdirSync(SKETCHES).filter(n => /^\d+$/.test(n)).map(Number);
  return String((ids.length ? Math.max(...ids) : 0) + 1).padStart(4, '0');
}

function writeDataUrl(file, dataUrl) {
  const m = /^data:image\/png;base64,(.+)$/.exec(dataUrl || '');
  if (!m) return false;
  fs.writeFileSync(file, Buffer.from(m[1], 'base64'));
  return true;
}

function copyDir(from, to) {
  fs.mkdirSync(to, {recursive: true});
  for (const rel of designFiles(from)) {
    fs.mkdirSync(path.dirname(path.join(to, rel)), {recursive: true});
    fs.copyFileSync(path.join(from, rel), path.join(to, rel));
  }
}

// One Send: the packet folder holds packet.json, snapshot.png (the design with the marks on it),
// strokes.png (the marks alone) and before/ (the design's files as they were when the owner drew).
function savePacket(body) {
  const design = String(body.design || '');
  const designDir = /^[\w.-]+$/.test(design) ? path.join(DESIGNS, design) : null;
  if (!designDir || !fs.existsSync(designDir)) throw new Error('unknown design');
  const id = nextSketchId();
  const dir = path.join(SKETCHES, id);
  fs.mkdirSync(dir, {recursive: true});
  const hasSnapshot = writeDataUrl(path.join(dir, 'snapshot.png'), body.snapshot);
  const hasStrokes = writeDataUrl(path.join(dir, 'strokes.png'), body.strokesImage);
  copyDir(designDir, path.join(dir, 'before'));
  const packet = {
    id, design, version: designVersion(design), boardVersion: body.version || null,
    createdAt: new Date().toISOString(), device: body.device || null,
    note: String(body.note || '').slice(0, 4000),
    viewport: body.viewport || null,
    files: {snapshot: hasSnapshot ? 'snapshot.png' : null, strokes: hasStrokes ? 'strokes.png' : null, before: 'before/'},
    snapshotError: hasSnapshot ? null : (body.snapshotError || 'no snapshot'),
    marks: Array.isArray(body.marks) ? body.marks : [],
  };
  fs.writeFileSync(path.join(dir, 'packet.json'), JSON.stringify(packet, null, 2) + '\n');
  emit({type: 'packet', id, design, dir, rel: path.relative(ROOT, dir), marks: packet.marks.length, note: packet.note});
  broadcast('packet', {id, design});
  return packet;
}

// Watch the designs: when Claude saves a change, every board showing that design reloads it.
let versions = Object.fromEntries(listDesigns().map(d => [d.name, d.version]));
let watchTimer = null;
function designsChanged() {
  clearTimeout(watchTimer);
  watchTimer = setTimeout(() => {
    let now;
    try { now = Object.fromEntries(listDesigns().map(d => [d.name, d.version])); } catch { return; }
    for (const [name, version] of Object.entries(now)) {
      if (versions[name] !== version) { broadcast('design', {name, version}); emit({type: 'design', name, version}); }
    }
    versions = now;
  }, 250);
}
try { fs.watch(DESIGNS, {recursive: true}, designsChanged); } catch { setInterval(designsChanged, 1000); }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = decodeURIComponent(url.pathname);
  try {
    if (req.method === 'GET' && (p === '/' || p === '/index.html')) return sendFile(res, path.join(BOARD, 'index.html'));
    if (req.method === 'GET' && p.startsWith('/board/')) {
      const file = inside(BOARD, p.slice('/board/'.length));
      return file ? sendFile(res, file) : send(res, 404, 'Not found');
    }
    if (req.method === 'GET' && p.startsWith('/designs/')) {
      const rel = p.slice('/designs/'.length);
      if (rel && !rel.includes('/')) { res.writeHead(301, {Location: p + '/'}); return res.end(); }
      const file = inside(DESIGNS, rel);
      return file ? sendFile(res, file) : send(res, 404, 'Not found');
    }
    if (req.method === 'GET' && p === '/api/designs') return json(res, 200, listDesigns());
    if (req.method === 'GET' && p === '/api/events') {
      res.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive'});
      res.write('retry: 1000\n\n');
      clients.add(res);
      const ping = setInterval(() => res.write(': ping\n\n'), 20000);
      req.on('close', () => { clearInterval(ping); clients.delete(res); });
      return;
    }
    if (req.method === 'POST' && p === '/api/live') {
      const body = await readBody(req);
      const live = {type: 'live', design: body.design, client: body.client, device: body.device || null,
        viewport: body.viewport || null, strokes: Array.isArray(body.strokes) ? body.strokes : []};
      emit(live);
      broadcast('live', live);
      return json(res, 200, {ok: true});
    }
    if (req.method === 'POST' && p === '/api/send') {
      const packet = savePacket(await readBody(req));
      return json(res, 200, {id: packet.id, version: packet.version});
    }
    return send(res, 404, 'Not found');
  } catch (err) {
    return json(res, 400, {error: String(err.message || err)});
  }
});

function lanAddresses() {
  return Object.values(os.networkInterfaces()).flat().filter(a => a && a.family === 'IPv4' && !a.internal).map(a => a.address);
}

let port = FIRST_PORT;
server.on('error', err => {
  if (err.code === 'EADDRINUSE' && port < FIRST_PORT + 20) { port += 1; server.listen(port, HOST); return; }
  emit({type: 'error', message: String(err.message || err)});
  process.exit(1);
});
server.on('listening', () => {
  const url = `http://127.0.0.1:${port}/`;
  const lan = LAN ? lanAddresses().map(a => `http://${a}:${port}/`) : [];
  emit({type: 'ready', url, lan, root: ROOT, designs: Object.keys(versions)});
  if (process.stdout.isTTY) console.error(`Sketchpad board: ${url}${lan.length ? '  (on the network: ' + lan.join(', ') + ')' : ''}`);
});
server.listen(port, HOST);

for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(0));
