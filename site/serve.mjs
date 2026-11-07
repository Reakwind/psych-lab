#!/usr/bin/env node
// Serves the local Psych Lab website: the built pages in site/dist/ and, under /media/, only the repository
// media files the build listed in site/dist/media.json (nothing else in the repository is reachable).
// Byte ranges are answered, so films and recordings can seek (Safari needs this).
//
//   node site/serve.mjs                 http://127.0.0.1:63684, this computer only
//   node site/serve.mjs --lan           also on the local network, to open on a phone on the same Wi-Fi
//   node site/serve.mjs --port 8080     another port
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const args = process.argv.slice(2);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const DIST = path.resolve(opt('--dist') || path.join(HERE, 'dist'));
const PORT = Number(opt('--port') || 63684);
const LAN = args.includes('--lan');
const HOST = LAN ? '0.0.0.0' : '127.0.0.1';

const TYPES = {'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.txt': 'text/plain; charset=utf-8'};

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error(`No built site in ${path.relative(ROOT, DIST) || DIST}. Run: npm run site`);
  process.exit(1);
}

// The media list is re-read when the build rewrites it; while a rebuild has it missing or half written,
// the last good list stays in use.
let media = {}, mediaStamp = 0;
function mediaList() {
  try {
    const file = path.join(DIST, 'media.json');
    const stamp = fs.statSync(file).mtimeMs;
    if (stamp !== mediaStamp) { media = JSON.parse(fs.readFileSync(file, 'utf8')); mediaStamp = stamp; }
  } catch { /* keep the last good list */ }
  return media;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff', ...headers});
  res.end(body);
}

function sendFile(req, res, file, cache) {
  let stat;
  try { stat = fs.statSync(file); } catch { return send(res, 404, 'Not found'); }
  if (!stat.isFile()) return send(res, 404, 'Not found');
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const headers = {'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff', 'Last-Modified': stat.mtime.toUTCString()};
  const range = req.headers.range;
  // One range is answered with 206; a request for several ranges gets the whole file, as RFC 9110 allows.
  if (range && !range.includes(',')) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    let start, end;
    if (m && (m[1] || m[2])) {
      if (m[1]) { start = Number(m[1]); end = m[2] ? Math.min(Number(m[2]), stat.size - 1) : stat.size - 1; }
      else { start = Math.max(0, stat.size - Number(m[2])); end = stat.size - 1; }
    }
    if (start === undefined || start > end || start >= stat.size) {
      return send(res, 416, 'Range not satisfiable', {'Content-Range': `bytes */${stat.size}`});
    }
    res.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1});
    if (req.method === 'HEAD') return res.end();
    return fs.createReadStream(file, {start, end}).on('error', () => res.destroy()).pipe(res);
  }
  res.writeHead(200, {...headers, 'Content-Length': stat.size});
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
}

function handle(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed', {Allow: 'GET, HEAD'});
  let url, pathname;
  try { url = new URL(req.url, 'http://localhost'); pathname = decodeURIComponent(url.pathname); } catch { return send(res, 400, 'Bad request'); }
  if (pathname.includes('\0') || !url.pathname.startsWith('/') || url.pathname.startsWith('//')) return send(res, 400, 'Bad request');
  if (pathname.startsWith('/media/')) {
    // Only files the build placed; the URL is looked up exactly as the build wrote it.
    const rel = mediaList()[url.pathname];
    if (!rel) return send(res, 404, 'Not a Lab media file');
    return sendFile(req, res, path.join(ROOT, rel), 'no-cache');
  }
  let file = path.resolve(DIST, '.' + pathname);
  if (file !== DIST && !file.startsWith(DIST + path.sep)) return send(res, 403, 'Forbidden');
  if (pathname.endsWith('/')) file = path.join(file, 'index.html');
  else if (!path.extname(file) && fs.existsSync(path.join(file, 'index.html'))) {
    // Built from the raw path, which is plain ASCII and starts with a single '/', so the redirect stays on this site.
    res.writeHead(301, {Location: url.pathname + '/' + url.search});
    return res.end();
  }
  if (path.basename(file) === 'media.json') return send(res, 404, 'Not found');
  sendFile(req, res, file, 'no-cache');
}

// One bad request never stops the server.
const server = http.createServer((req, res) => {
  try { handle(req, res); }
  catch (e) {
    console.error('Request failed:', req.url, e.message);
    if (!res.headersSent) send(res, 500, 'Server error');
    else res.destroy();
  }
});

server.on('error', e => {
  console.error(e.code === 'EADDRINUSE' ? `Port ${PORT} is in use. Stop the other server or pass --port N.` : e.message);
  process.exit(1);
});
server.listen(PORT, HOST, () => {
  console.log(`Psych Lab: http://127.0.0.1:${PORT}/`);
  if (LAN) {
    const ips = Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
    for (const ip of ips) console.log(`  on this network: http://${ip}:${PORT}/`);
    console.log('  Anyone on this network can open these addresses while the server runs.');
  } else {
    console.log('  This computer only. To open it on a phone on the same Wi-Fi: npm start -- --lan');
  }
});
