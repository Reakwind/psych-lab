// The sketchpad board: the design in a frame, a drawing layer over it, and Send.
// Marks are kept in the design's own page coordinates, so they stay on what they were drawn on while the design scrolls.
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const frame = $('frame'), canvas = $('ink'), stage = $('stage'), statusEl = $('status');
  const ctx = canvas.getContext('2d');
  const client = Math.random().toString(36).slice(2, 10);
  const store = {get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }};

  let designs = [], current = null, version = null;
  const marksByDesign = new Map();        // design name -> marks drawn on it
  let color = '#e5484d', mode = 'draw', drawing = null, penSeen = false, lastPointer = 'mouse';
  let reloadAfterSend = false, sending = false;

  const marks = () => { if (!marksByDesign.has(current)) marksByDesign.set(current, []); return marksByDesign.get(current); };
  const unsent = () => marks().filter(m => !m.sent);
  const say = text => { statusEl.textContent = text; };
  const doc = () => { try { return frame.contentDocument; } catch { return null; } };
  const win = () => frame.contentWindow;
  const scroll = () => { const w = win(); return {x: w ? w.scrollX : 0, y: w ? w.scrollY : 0}; };
  const device = () => (/iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1 ? 'iPad' :
    /Mac/.test(navigator.platform) ? 'Mac' : (navigator.platform || 'other')) + ' · ' + lastPointer;

  // ---------- layout and drawing ----------
  function fit() {
    const r = stage.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }
  new ResizeObserver(fit).observe(stage);

  function strokePath(c, m, dx, dy) {
    const pts = m.points;
    c.strokeStyle = m.color; c.lineCap = 'round'; c.lineJoin = 'round';
    if (pts.length === 1) {
      c.fillStyle = m.color; c.beginPath(); c.arc(pts[0][0] - dx, pts[0][1] - dy, m.width * 0.8, 0, Math.PI * 2); c.fill(); return;
    }
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0, p0] = pts[i - 1], [x1, y1, p1] = pts[i];
      c.lineWidth = m.width * (0.45 + ((p0 + p1) / 2) * 1.1);
      c.beginPath(); c.moveTo(x0 - dx, y0 - dy); c.lineTo(x1 - dx, y1 - dy); c.stroke();
    }
  }

  // Sent marks stay visible, faded, until Claude's change arrives; they are drawn on a layer of their own so
  // the fading does not show where the segments overlap.
  const faded = document.createElement('canvas'), fctx = faded.getContext('2d');
  function redraw() {
    const r = stage.getBoundingClientRect(), s = scroll(), dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, r.width, r.height);
    const sent = marks().filter(m => m.sent);
    if (sent.length) {
      faded.width = canvas.width; faded.height = canvas.height; fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const m of sent) strokePath(fctx, m, s.x, s.y);
      ctx.globalAlpha = 0.4; ctx.drawImage(faded, 0, 0, r.width, r.height); ctx.globalAlpha = 1;
    }
    for (const m of marks()) if (!m.sent) strokePath(ctx, m, s.x, s.y);
  }

  function point(e) {
    const r = canvas.getBoundingClientRect(), s = scroll();
    const p = e.pointerType === 'pen' ? (e.pressure || 0.5) : 0.5;
    return [Math.round((e.clientX - r.left + s.x) * 10) / 10, Math.round((e.clientY - r.top + s.y) * 10) / 10, Math.round(p * 100) / 100];
  }

  canvas.addEventListener('pointerdown', e => {
    if (mode !== 'draw' || !current) return;
    if (e.pointerType === 'pen') penSeen = true;
    if (e.pointerType === 'touch' && penSeen) return;     // the palm, while a pencil is in use
    if (e.button > 0) return;
    lastPointer = e.pointerType || 'mouse';
    canvas.setPointerCapture(e.pointerId);
    drawing = {id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), color, width: 3, points: [point(e)], sent: false, pointer: lastPointer};
    marks().push(drawing);
    redraw();
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', e => {
    if (!drawing) return;
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    for (const ev of events.length ? events : [e]) {
      const p = point(ev), last = drawing.points[drawing.points.length - 1];
      if (Math.hypot(p[0] - last[0], p[1] - last[1]) >= 1) drawing.points.push(p);
    }
    redraw();
    liveSoon();
  });
  const endStroke = () => { if (!drawing) return; drawing = null; liveSoon(true); updateButtons(); };
  canvas.addEventListener('pointerup', endStroke);
  canvas.addEventListener('pointercancel', endStroke);
  // Scrolling with the trackpad or wheel while drawing moves the design underneath.
  canvas.addEventListener('wheel', e => { const w = win(); if (w) { w.scrollBy(e.deltaX, e.deltaY); e.preventDefault(); } }, {passive: false});

  // ---------- live strokes for the pane beside the chat ----------
  let liveTimer = null, liveLast = 0;
  function simplify(points, step = 3, max = 300) {
    const out = [];
    for (const p of points) { const l = out[out.length - 1]; if (!l || Math.hypot(p[0] - l[0], p[1] - l[1]) >= step) out.push([Math.round(p[0]), Math.round(p[1])]); }
    const last = points[points.length - 1];
    if (last && out.length && (out[out.length - 1][0] !== Math.round(last[0]) || out[out.length - 1][1] !== Math.round(last[1]))) out.push([Math.round(last[0]), Math.round(last[1])]);
    if (out.length <= max) return out;
    const k = out.length / max; return Array.from({length: max}, (_, i) => out[Math.floor(i * k)]);
  }
  function viewport() {
    const r = stage.getBoundingClientRect(), s = scroll(), d = doc();
    return {width: Math.round(r.width), height: Math.round(r.height), scrollX: Math.round(s.x), scrollY: Math.round(s.y),
      pageWidth: d ? d.documentElement.scrollWidth : null, pageHeight: d ? d.documentElement.scrollHeight : null};
  }
  function liveSoon(now) {
    clearTimeout(liveTimer);
    const wait = now ? 0 : Math.max(0, 150 - (Date.now() - liveLast));
    liveTimer = setTimeout(sendLive, wait);
  }
  function sendLive() {
    liveLast = Date.now();
    const strokes = unsent().map(m => ({color: m.color, points: simplify(m.points)}));
    fetch('/api/live', {method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({design: current, client, device: device(), viewport: viewport(), strokes})}).catch(() => {});
  }

  // ---------- what each mark touches ----------
  function describe(el, s) {
    const r = el.getBoundingClientRect();
    let selector;
    if (el.id) selector = '#' + el.id;
    else {
      const parts = []; let n = el;
      while (n && n.nodeType === 1 && n !== n.ownerDocument.body && !n.id) {
        const same = n.parentElement ? [...n.parentElement.children].filter(c => c.tagName === n.tagName) : [];
        parts.unshift(n.tagName.toLowerCase() + (same.length > 1 ? `:nth-of-type(${same.indexOf(n) + 1})` : ''));
        n = n.parentElement;
      }
      selector = (n && n.id ? '#' + n.id + ' > ' : 'body > ') + parts.join(' > ');
    }
    const text = (el.innerText || el.textContent || el.getAttribute('aria-label') || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim();
    return {selector, id: el.id || null, tag: el.tagName.toLowerCase(), text: text.slice(0, 120),
      box: {x: Math.round(r.left + s.x), y: Math.round(r.top + s.y), width: Math.round(r.width), height: Math.round(r.height)}};
  }
  function bbox(points) {
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    const x = Math.min(...xs), y = Math.min(...ys);
    return {x: Math.round(x), y: Math.round(y), width: Math.round(Math.max(...xs) - x), height: Math.round(Math.max(...ys) - y)};
  }
  function analyse(m, n) {
    const d = doc(), s = scroll(), r = stage.getBoundingClientRect();
    const box = bbox(m.points);
    const first = m.points[0], last = m.points[m.points.length - 1];
    const diag = Math.hypot(box.width, box.height);
    const closed = m.points.length > 8 && diag > 24 && Math.hypot(first[0] - last[0], first[1] - last[1]) < diag * 0.25;
    const touches = [], seen = new Set();
    if (d) {
      const step = Math.max(1, Math.floor(m.points.length / 16));
      for (let i = 0; i < m.points.length; i += step) {
        const vx = m.points[i][0] - s.x, vy = m.points[i][1] - s.y;
        if (vx < 0 || vy < 0 || vx > r.width || vy > r.height) continue;
        let el = d.elementFromPoint(vx, vy);
        if (!el || el === d.documentElement || el === d.body) continue;
        const withId = el.closest('[id]');
        if (withId && withId !== d.body) el = withId;
        if (seen.has(el)) continue; seen.add(el); touches.push(describe(el, s));
      }
    }
    const encloses = [];
    if (closed && d) {
      for (const el of d.querySelectorAll('body [id]')) {
        const e = describe(el, s), b = e.box;
        if (!b.width || !b.height) continue;
        const ix = Math.max(0, Math.min(b.x + b.width, box.x + box.width) - Math.max(b.x, box.x));
        const iy = Math.max(0, Math.min(b.y + b.height, box.y + box.height) - Math.max(b.y, box.y));
        if ((ix * iy) / (b.width * b.height) > 0.6) encloses.push(e);
      }
    }
    return {n, color: m.color, pointer: m.pointer, closed, box, start: first.slice(0, 2), end: last.slice(0, 2),
      points: simplify(m.points, 4, 200), touches, encloses};
  }

  // ---------- Send ----------
  function pageSize() {
    const d = doc(); if (!d) return viewport();
    return {width: Math.min(d.documentElement.scrollWidth, 4000), height: Math.min(d.documentElement.scrollHeight, 6000)};
  }
  function drawLabels(c, list) {
    for (const mk of list) {
      const x = Math.max(12, mk.box.x - 6), y = Math.max(12, mk.box.y - 6);
      c.fillStyle = mk.color; c.beginPath(); c.arc(x, y, 11, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#fff'; c.font = 'bold 13px -apple-system, system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(String(mk.n), x, y + 0.5);
    }
  }
  function ensureCapture() {
    const w = win(), d = doc();
    if (w.htmlToImage) return Promise.resolve(w.htmlToImage);
    return new Promise((resolve, reject) => {
      const s = d.createElement('script'); s.src = '/board/vendor/html-to-image.js';
      s.onload = () => resolve(w.htmlToImage); s.onerror = () => reject(new Error('capture library did not load'));
      d.head.appendChild(s);
    });
  }
  async function render(list, withDesign) {
    const size = pageSize(), out = document.createElement('canvas');
    out.width = size.width; out.height = size.height;
    const c = out.getContext('2d');
    if (withDesign) {
      const lib = await ensureCapture(), d = doc();
      const bg = getComputedStyle(d.body).backgroundColor;
      const shot = await lib.toCanvas(d.documentElement, {width: size.width, height: size.height, pixelRatio: 1,
        backgroundColor: bg && bg !== 'rgba(0, 0, 0, 0)' ? bg : '#ffffff', skipFonts: true, cacheBust: true});
      c.drawImage(shot, 0, 0);
    }
    for (const m of list) strokePath(c, m, 0, 0);
    return out;
  }
  async function send() {
    const list = unsent();
    if (!current || sending || (!list.length && !$('note').value.trim())) return;
    sending = true; updateButtons(); say('Sending…');
    const analysed = list.map((m, i) => analyse(m, i + 1));
    const body = {design: current, version, device: device(), note: $('note').value.trim(), viewport: viewport(), marks: analysed};
    try {
      const strokes = await render(list, false); drawLabels(strokes.getContext('2d'), analysed);
      body.strokesImage = strokes.toDataURL('image/png');
    } catch { /* the snapshot below still carries the marks */ }
    try {
      const snap = await render(list, true); drawLabels(snap.getContext('2d'), analysed);
      body.snapshot = snap.toDataURL('image/png');
    } catch (err) { body.snapshotError = String(err && err.message || err); }
    try {
      const res = await fetch('/api/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || res.status);
      for (const m of list) m.sent = true;
      $('note').value = '';
      reloadAfterSend = true;
      say(`Sketch ${out.id} sent. Claude is working on it; the design reloads here when it changes.`);
      liveSoon(true);
    } catch (err) {
      say('Could not send: ' + (err.message || err) + '. Your marks are kept; try again.');
    } finally { sending = false; updateButtons(); redraw(); }
  }

  // ---------- designs ----------
  function load(name, keepScroll) {
    const s = keepScroll ? scroll() : {x: 0, y: 0};
    current = name; store.set('sketchpad.design', name);
    const d = designs.find(x => x.name === name); version = d ? d.version : null;
    $('design').value = name;
    frame.onload = () => {
      const w = win();
      if (keepScroll) w.scrollTo(s.x, s.y);
      w.addEventListener('scroll', redraw, {passive: true});
      w.addEventListener('resize', redraw);
      redraw(); updateButtons();
    };
    frame.src = '/designs/' + encodeURIComponent(name) + '/';
    redraw(); updateButtons();
  }
  async function refresh() {
    designs = await (await fetch('/api/designs')).json();
    const sel = $('design');
    sel.replaceChildren();
    for (const d of designs) { const o = document.createElement('option'); o.value = d.name; o.textContent = d.title; sel.appendChild(o); }
    $('empty').hidden = designs.length > 0;
    return designs;
  }

  function updateButtons() {
    $('send').disabled = !current || sending || (!unsent().length && !$('note').value.trim());
    $('undo').disabled = !unsent().length; $('clear').disabled = !unsent().length;
  }
  function setMode(m) {
    mode = m; document.body.classList.toggle('use', m === 'use');
    $('mode-draw').setAttribute('aria-checked', String(m === 'draw')); $('mode-use').setAttribute('aria-checked', String(m === 'use'));
  }

  $('design').addEventListener('change', e => load(e.target.value));
  $('mode-draw').addEventListener('click', () => setMode('draw'));
  $('mode-use').addEventListener('click', () => setMode('use'));
  for (const b of document.querySelectorAll('.ink')) b.addEventListener('click', () => {
    color = b.dataset.color;
    for (const o of document.querySelectorAll('.ink')) o.setAttribute('aria-checked', String(o === b));
  });
  $('undo').addEventListener('click', () => { const l = marks(); for (let i = l.length - 1; i >= 0; i--) if (!l[i].sent) { l.splice(i, 1); break; } redraw(); updateButtons(); liveSoon(true); });
  $('clear').addEventListener('click', () => { marksByDesign.set(current, marks().filter(m => m.sent)); redraw(); updateButtons(); liveSoon(true); });
  $('send').addEventListener('click', send);
  $('note').addEventListener('input', updateButtons);
  $('note').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });
  document.addEventListener('keydown', e => {
    if (e.target === $('note')) return;
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); $('undo').click(); }
    else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); send(); }
    else if (e.key === 'd') setMode('draw');
    else if (e.key === 'u') setMode('use');
  });

  // ---------- updates from the relay ----------
  function listen() {
    const es = new EventSource('/api/events');
    es.addEventListener('design', async e => {
      const {name, version: v} = JSON.parse(e.data);
      await refresh();
      if (name !== current || v === version) return;
      marksByDesign.set(current, marks().filter(m => !m.sent));
      load(current, true);
      if (reloadAfterSend) { say('Claude changed the design. Draw again, or send a note.'); reloadAfterSend = false; }
      else say('The design changed.');
    });
    es.onopen = () => { if (/offline/.test(statusEl.textContent)) say('Connected again.'); };
    es.onerror = () => say('The relay is offline. Is the Claude session with the sketchpad still open?');
  }

  (async () => {
    try { await refresh(); } catch { say('The relay is offline.'); return; }
    const want = new URLSearchParams(location.search).get('design') || store.get('sketchpad.design');
    const first = designs.find(d => d.name === want) || designs[0];
    if (first) load(first.name);
    listen();
    say(first ? 'Draw on the design, then Send to Claude.' : '');
  })();
})();
