// Session 15 additions: the breathing box (four sides drawn one by one, three count marks per side, a travelling dot and session 3b's pacer inside it),
// a breath trace (ragged, steady box rhythm, natural wave), a trophy and a pause badge. Repeated from session 14 (film14/src/extra.js) so this film builds on its own:
// the tension meter helpers, the calm badges, Ruth's room with her in the armchair, the backpack, the path positions and her mouths.
Object.assign(R, {
  setMeter(fill, level) { const l = Math.max(0, Math.min(1, level)); fill.setAttribute('y', -8 - 274 * l); fill.setAttribute('height', 274 * l); },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  CB: {
    relax: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<path class="ink" style="stroke-width:6" d="M-30 -10 q10 -12 20 0 t20 0 t20 0 M-30 10 q10 -12 20 0 t20 0 t20 0"/><path class="leaf" d="M14 -36 C28 -40 34 -30 30 -22 C22 -22 16 -28 14 -36Z"/>'],
    ground: ['color-mix(in srgb, var(--main) 30%, var(--ground))', '<path class="ink" style="stroke-width:6;stroke:color-mix(in srgb, var(--accent) 50%, var(--second))" d="M0 -32 V2 M0 2 C-6 14 -22 16 -28 28 M0 2 C6 14 22 16 28 28 M0 2 V32"/><path class="leaf" d="M0 -30 C-18 -34 -22 -46 -16 -50 C-4 -48 0 -40 0 -30Z M0 -30 C16 -36 22 -48 16 -52 C4 -48 0 -40 0 -30Z"/>'],
    mindful: ['color-mix(in srgb, var(--accent) 30%, var(--ground))', '<circle r="30" style="fill:var(--accent);opacity:.25"/><circle r="30" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:8 7"/><circle class="metal" r="9"/>'],
    imagery: ['#E3D7F3', '<path class="hill-near" d="M-40 26 C-20 0 0 8 10 14 C20 4 30 6 40 20 V30 H-40Z"/><circle class="amber" cx="16" cy="-14" r="11"/><path d="M-36 -2 C-48 -2 -48 -18 -34 -20 C-34 -32 -16 -36 -10 -26 C-2 -32 10 -28 8 -18 C18 -18 18 -2 8 -2Z" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>'],
    pause: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<rect x="-20" y="-26" width="14" height="52" rx="5" style="fill:var(--second)"/><rect x="6" y="-26" width="14" height="52" rx="5" style="fill:var(--second)"/>'],
  },
  cbadge(id, kind, r) {
    const [f, g] = R.CB[kind];
    return '<g class="' + id + '"><g transform="scale(' + ((r || 56) / 56) + ')"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:' + f + ';stroke:var(--second);stroke-width:5"/>' + g + '</g></g>';
  },
  CALM: ['relax', 'ground', 'mindful', 'imagery'],
  tense(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-110 -170 l12 -14 l8 14 l12 -14 M78 -184 l12 14 l8 -14 l12 14"/></g>'; },
  puffs(id) { return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:6;stroke-linecap:round" d="M62 -190 q12 6 0 14 M78 -196 q16 10 0 26 M94 -202 q20 14 0 38"/></g>'; },
  // Ruth's room, the plant left out (the chair sits over it), Ruth in her armchair shifted dx, tension marks and quick breaths in her coordinates, the meter at the right
  roomSeat(id, dx, meter) {
    return R.room({ plant: false }) + R.seated(id, dx) + '<g transform="translate(' + (500 + dx) + ' 742)">' + R.tense(id + '-tn') + R.puffs(id + '-pf') + '</g>' +
      (meter === false ? '' : '<g class="' + id + '-mw" transform="translate(975 860)">' + R.meter(id + '-mt') + '</g>');
  },
  onStone(k) { const [x, y, r] = R.PATH[k + 1]; return [x, y - r * 0.62, 0.86 * r / 104]; },
  pocket(id) { return '<g class="' + id + '"><path class="knit-dk" d="M-62 -268 h40 v30 q-20 10 -40 0Z"/><path class="ink" style="stroke-width:3;opacity:.5" d="M-62 -268 h40"/></g>'; },
  packed(id, pose) { return '<g class="' + id + '-w">' + R.packBehind(id) + '<g class="' + id + '-bd">' + R.ruth(id, pose || 'stand') + R.pocket(id + '-pk') + '</g>' + R.straps(id) + '</g>'; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31', mouthO: 'M-4 24 Q2 18 8 24 Q8 34 2 34 Q-4 34 -4 24Z',

  // ---- the breathing box ----
  // centre and side beside Ruth's armchair; sides in breathing order: 0 in (up the right), 1 hold (across the top, right to left), 2 out (down the left), 3 hold (along the bottom)
  BOX: [730, 450, 320],
  BCOL: ['var(--main)', 'var(--accent)', 'color-mix(in srgb, var(--main) 55%, var(--ground))', 'var(--accent)'],
  box(id) {
    let s = '<g class="' + id + '-box"><rect class="' + id + '-pane" style="fill:color-mix(in srgb, var(--ground) 35%, white);opacity:.86"/>' +
      '<rect class="' + id + '-guide" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:10 14;opacity:.3"/>' +
      '<circle class="' + id + '-ring" r="1" style="fill:var(--main);opacity:.12"/><circle class="' + id + '-core" r="1" style="fill:color-mix(in srgb, var(--main) 20%, var(--ground));stroke:var(--main);stroke-width:7"/>' +
      '<rect class="' + id + '-soft" style="fill:none;stroke:var(--main);stroke-width:14;opacity:0"/>' +
      '<path class="' + id + '-wave" style="fill:none;stroke:var(--main);stroke-width:14;stroke-linecap:round;stroke-linejoin:round;opacity:0"/>';
    for (let k = 0; k < 4; k++) s += '<path class="' + id + '-s' + k + '" pathLength="1" style="fill:none;stroke:' + R.BCOL[k] + ';stroke-width:14;stroke-linecap:round;stroke-dasharray:1 1"/>';
    for (let k = 0; k < 12; k++) s += '<circle class="' + id + '-k' + k + '" r="12" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>';
    return s + '<g class="' + id + '-dot"><circle r="38" style="fill:var(--accent);opacity:.28"/><circle r="22" style="fill:var(--accent);stroke:var(--second);stroke-width:5"/></g></g>';
  },
  boxRefs(kit, id) {
    const r = R.refs(kit, id, ['box', 'pane', 'guide', 'ring', 'core', 'soft', 'wave', 'dot']);
    r.s = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.' + id + '-s' + k));
    r.k = [...Array(12).keys()].map((k) => kit.stage.querySelector('.' + id + '-k' + k));
    return r;
  },
  // a point on the loop: pos 0..4 (0 = bottom-right corner, 1 = top-right, 2 = top-left, 3 = bottom-left)
  boxPt(x, y, w, h, pos) {
    const C = [[x + w / 2, y + h / 2], [x + w / 2, y - h / 2], [x - w / 2, y - h / 2], [x - w / 2, y + h / 2]];
    const p = ((pos % 4) + 4) % 4, k = Math.floor(p), f = p - k, a = C[k], b = C[(k + 1) % 4];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  },
  // the same loop on a rounded square (corner radius rad): integer positions sit at the middle of each corner's arc
  rrPt(x, y, w, h, rad, pos) {
    rad = Math.max(0, Math.min(rad, w / 2, h / 2));
    if (rad < 0.5) return R.boxPt(x, y, w, h, pos);
    const C = [[x + w / 2 - rad, y + h / 2 - rad], [x + w / 2 - rad, y - h / 2 + rad], [x - w / 2 + rad, y - h / 2 + rad], [x - w / 2 + rad, y + h / 2 - rad]];
    const p = ((pos % 4) + 4) % 4, k = Math.floor(p), f = p - k, n = (k + 1) % 4, th = (i) => (90 - 90 * i) * Math.PI / 180, A = rad * Math.PI / 4;
    const s0 = [C[k][0] + rad * Math.cos(th(k) - Math.PI / 2), C[k][1] + rad * Math.sin(th(k) - Math.PI / 2)], s1 = [C[n][0] + rad * Math.cos(th(n)), C[n][1] + rad * Math.sin(th(n))];
    const L = Math.hypot(s1[0] - s0[0], s1[1] - s0[1]), s = f * (2 * A + L);
    if (s < A) { const a = th(k) - Math.PI / 4 - s / rad; return [C[k][0] + rad * Math.cos(a), C[k][1] + rad * Math.sin(a)]; }
    if (s < A + L) { const q = L ? (s - A) / L : 0; return [s0[0] + (s1[0] - s0[0]) * q, s0[1] + (s1[1] - s0[1]) * q]; }
    const a = th(n) - (s - A - L) / rad; return [C[n][0] + rad * Math.cos(a), C[n][1] + rad * Math.sin(a)];
  },
  // o: { x, y, w, h, draw: [p0..p3] 0..1 per side, ticks: 0..1 visibility, lit: count of lit marks (0..12, fractional ignored) or a function k => 0..1,
  //      dot: position 0..4 or null, ring: pacer size 0..1 (0 hides), pane: 0..1, soft: 0..1 (rounded outline instead of sides), rad: corner radius, wave: 0..1, wavePh, alpha }
  setBox(r, o) {
    const x = o.x == null ? R.BOX[0] : o.x, y = o.y == null ? R.BOX[1] : o.y, w = o.w == null ? R.BOX[2] : o.w, h = o.h == null ? w : o.h;
    r.box.style.opacity = o.alpha == null ? 1 : o.alpha;
    const pad = 70, pa = o.pane == null ? 1 : o.pane;
    const pw = Math.max(1, (w + 2 * pad) * pa), ph = Math.max(1, (Math.max(h, 220) + 2 * pad) * pa);
    r.pane.setAttribute('x', x - pw / 2); r.pane.setAttribute('y', y - ph / 2); r.pane.setAttribute('width', pw); r.pane.setAttribute('height', ph); r.pane.setAttribute('rx', 40 * pa);
    r.pane.style.opacity = pa > 0.01 ? 0.86 : 0;
    r.guide.setAttribute('x', x - w / 2); r.guide.setAttribute('y', y - h / 2); r.guide.setAttribute('width', Math.max(1, w)); r.guide.setAttribute('height', Math.max(1, h));
    r.guide.style.opacity = 0.3 * (o.guide == null ? 1 : o.guide);
    const C = [[x + w / 2, y + h / 2], [x + w / 2, y - h / 2], [x - w / 2, y - h / 2], [x - w / 2, y + h / 2]];
    const soft = o.soft || 0, draw = o.draw || [1, 1, 1, 1];
    r.s.forEach((p, k) => {
      const a = C[k], b = C[(k + 1) % 4], d = draw[k] * (1 - soft);
      p.setAttribute('d', 'M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1]);
      p.style.strokeDashoffset = 1 - Math.min(1, draw[k]); p.style.opacity = d > 0.002 ? 1 - soft : 0;
    });
    const rad = o.rad == null ? 0 : o.rad;
    r.soft.setAttribute('x', x - w / 2); r.soft.setAttribute('y', y - h / 2); r.soft.setAttribute('width', Math.max(1, w)); r.soft.setAttribute('height', Math.max(1, h)); r.soft.setAttribute('rx', rad);
    r.soft.style.opacity = soft;
    const tv = o.ticks == null ? 1 : o.ticks;
    r.k.forEach((c, n) => {
      const side = Math.floor(n / 3), f = (n % 3) / 3, [px, py] = R.boxPt(x, y, w, h, side + f);
      const shown = (draw[side] >= f - 0.001 && (n % 3 || draw[side] > 0.001)) ? tv * (1 - soft) : 0;
      const lit = typeof o.lit === 'function' ? o.lit(n) : (o.lit != null && n < o.lit ? 1 : 0);
      c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 12 + 5 * lit);
      c.style.fill = lit > 0.5 ? (side % 2 ? 'var(--accent)' : 'var(--main)') : 'var(--ground)';
      c.style.opacity = shown;
    });
    if (o.dot == null) r.dot.style.opacity = 0;
    else { const [dx, dy] = soft > 0.001 ? R.rrPt(x, y, w, h, rad * soft, o.dot) : R.boxPt(x, y, w, h, o.dot); r.dot.setAttribute('transform', 'translate(' + dx + ' ' + dy + ') scale(' + (o.dotS || 1) + ')'); r.dot.style.opacity = o.dotA == null ? 1 : o.dotA; }
    const rg = o.ring || 0, cr = Math.min(w, h) * 0.33 * rg;
    r.core.setAttribute('cx', x); r.core.setAttribute('cy', y); r.core.setAttribute('r', Math.max(0.1, cr)); r.ring.setAttribute('cx', x); r.ring.setAttribute('cy', y); r.ring.setAttribute('r', Math.max(0.1, cr * 1.36));
    r.core.style.opacity = rg > 0.01 ? 1 : 0; r.ring.style.opacity = rg > 0.01 ? 0.12 : 0;
    const wv = o.wave || 0;
    r.wave.style.opacity = wv;
    if (wv > 0.001) r.wave.setAttribute('d', R.wavePath(x - 190, y, 380, 60 * (o.waveAmp == null ? 1 : o.waveAmp), o.waveK || 2, o.wavePh || 0));
    return C;
  },
  // breath state for a phase list: phases = [[start, kind], ...] kind 0 in, 1 hold-full, 2 out, 3 hold-empty, each lasting len; returns 0..1 fullness
  fill(t, phases, len) {
    let v = 0;
    phases.forEach(([a, k]) => { if (t >= a) { const p = kit.eio(kit.clamp01((t - a) / (len * 0.92))); v = k === 0 ? p : k === 1 ? 1 : k === 2 ? 1 - p : 0; } });
    return v;
  },
  // a breath trace across the box area: ragged and quick (r = 1) easing into the steady box rhythm (r = 0); scrolls with ph
  traceD(x0, y, w, amp, r, ph) {
    let d = '';
    for (let i = 0; i <= 160; i++) {
      const x = x0 + w * i / 160, u = i / 160 * 3 + ph;
      const k = ((u % 1) + 1) % 1;
      const box = k < 0.25 ? k / 0.25 : k < 0.5 ? 1 : k < 0.75 ? 1 - (k - 0.5) / 0.25 : 0;
      const rag = 0.5 + 0.32 * Math.sin(u * 2 * Math.PI * 3.1) + 0.22 * Math.sin(u * 2 * Math.PI * 5.3 + 1.7) + 0.12 * Math.sin(u * 2 * Math.PI * 8.9);
      const v = kit.lerp(box, rag, r) * (1 - 0.55 * r);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + (y - amp * (v - 0.5)).toFixed(1);
    }
    return d;
  },
  trophy(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:12" d="M-70 -90 C-130 -90 -126 -10 -60 -6 M70 -90 C130 -90 126 -10 60 -6"/>' +
      '<path class="amber" d="M-80 -120 H80 V-60 C80 0 40 30 0 34 C-40 30 -80 0 -80 -60Z" style="stroke:var(--second);stroke-width:6"/><path class="light" opacity=".45" d="M-56 -104 h20 v50 c0 20 -8 34 -20 40Z"/>' +
      '<rect class="amber-dk" x="-14" y="30" width="28" height="44" style="stroke:var(--second);stroke-width:6"/><rect class="wood" x="-60" y="70" width="120" height="34" rx="8" style="stroke:var(--second);stroke-width:6"/></g>';
  },
  // a red cross drawn on (id-a, id-b with pathLength 1), centred on 0,0, arm length r
  xMark(id, r) {
    return '<g class="' + id + '"><path class="' + id + '-a" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round;stroke-dasharray:1 1" d="M' + (-r) + ' ' + (-r) + ' L' + r + ' ' + r + '"/>' +
      '<path class="' + id + '-b" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round;stroke-dasharray:1 1" d="M' + r + ' ' + (-r) + ' L' + (-r) + ' ' + r + '"/></g>';
  },
  drawOn(p, v) { p.style.strokeDashoffset = 1 - v; p.style.opacity = v > 0.002 ? 1 : 0; },
});
