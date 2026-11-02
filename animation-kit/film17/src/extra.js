// Session 17 additions: the imagination bubble (Ruth's own hills, which can turn stormy or blurry), a growing plant and watering drops,
// a grey statue of Ruth on a plinth, round badges for what relaxation can help with, a pulse line, and small pictures for "what comes up".
// Repeated from session 14 (film14/src/extra.js) so this film builds on its own: the tension meter, the calm badges, Ruth's room with her in the armchair,
// tension marks, the scan line, and her mouths; from session 12: lit stones.
Object.assign(R, {
  setMeter(fill, level) { const l = Math.max(0, Math.min(1, level)); fill.setAttribute('y', -8 - 274 * l); fill.setAttribute('height', 274 * l); },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  CB: {
    relax: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<path class="ink" style="stroke-width:6" d="M-30 -10 q10 -12 20 0 t20 0 t20 0 M-30 10 q10 -12 20 0 t20 0 t20 0"/><path class="leaf" d="M14 -36 C28 -40 34 -30 30 -22 C22 -22 16 -28 14 -36Z"/>'],
    imagery: ['#E3D7F3', '<path class="hill-near" d="M-40 26 C-20 0 0 8 10 14 C20 4 30 6 40 20 V30 H-40Z"/><circle class="amber" cx="16" cy="-14" r="11"/><path d="M-36 -2 C-48 -2 -48 -18 -34 -20 C-34 -32 -16 -36 -10 -26 C-2 -32 10 -28 8 -18 C18 -18 18 -2 8 -2Z" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>'],
    less: ['#F2D2CC', '<rect x="-30" y="-36" width="22" height="72" rx="11" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-25" y="8" width="12" height="22" rx="6" style="fill:#D96C6C"/><path class="ink" style="stroke-width:7" d="M18 -28 V22 M4 8 L18 24 L32 8"/>'],
    rest: ['color-mix(in srgb, var(--accent) 45%, var(--ground))', '<path class="chair" d="M-32 24 V-12 Q-32 -24 -20 -24 H20 Q32 -24 32 -12 V24Z" style="stroke:var(--second);stroke-width:4"/><rect class="chair-dk" x="-24" y="2" width="48" height="16" rx="6"/>'],
    bed: ['color-mix(in srgb, var(--second) 22%, var(--ground))', '<path class="light" d="M-4 -30 a30 30 0 1 0 22 46 a24 24 0 1 1 -22 -46Z" style="stroke:var(--second);stroke-width:5"/><circle class="light" cx="24" cy="-22" r="4"/><circle class="light" cx="30" cy="0" r="3"/>'],
    pain: ['#F6E0C8', '<g transform="rotate(-35)"><rect x="-40" y="-14" width="80" height="28" rx="14" style="fill:#F2C9A0;stroke:var(--second);stroke-width:5"/><rect x="-14" y="-14" width="28" height="28" style="fill:#E6B48A"/><circle cx="-6" cy="-5" r="2.5" class="metal"/><circle cx="6" cy="5" r="2.5" class="metal"/></g>'],
  },
  cbadge(id, kind, r) {
    const [f, g] = R.CB[kind];
    return '<g class="' + id + '"><g transform="scale(' + ((r || 56) / 56) + ')"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:' + f + ';stroke:var(--second);stroke-width:5"/>' + g + '</g></g>';
  },
  tense(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-110 -170 l12 -14 l8 14 l12 -14 M78 -184 l12 14 l8 -14 l12 14"/></g>'; },
  scan(id) { return '<g class="' + id + '"><rect x="-14" y="-170" width="28" height="340" rx="14" style="fill:var(--accent);opacity:.25"/><rect x="-3" y="-170" width="6" height="340" rx="3" style="fill:var(--accent)"/></g>'; },
  litStone(top, p) { top.style.fill = 'color-mix(in srgb, var(--accent) ' + (22 + 78 * p).toFixed(1) + '%, var(--ground))'; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31', mouthO: 'M-4 24 Q2 18 8 24 Q8 34 2 34 Q-4 34 -4 24Z',
  // Ruth's room with her in the armchair (dx), tension marks in her coordinates, the tension meter at the right
  roomSeat(id, dx, meter) {
    return R.room({ plant: false }) + R.seated(id, dx) + '<g transform="translate(' + (500 + dx) + ' 742)">' + R.tense(id + '-tn') + '</g>' +
      (meter === false ? '' : '<g class="' + id + '-mw" transform="translate(975 860)">' + R.meter(id + '-mt') + '</g>');
  },

  // ---- the imagination bubble: 380 × 220, centred on 0,0; a trail of two dots down to the left (toward her head)
  // parts: id-calm (her hills), id-storm (fade in), id-bv (blur: set stdDeviation), id-t0/id-t1 (trail dots)
  miniLand(id) {
    let s = '<rect class="sky" x="-200" y="-120" width="400" height="240"/><circle class="amber ' + id + '-sun" cx="92" cy="-46" r="30"/>' +
      '<path class="hill-far" d="M-200 10 C-120 -24 -40 -6 30 -12 C100 -18 150 -34 200 -14 V120 H-200Z"/><path class="hill-near" d="M-200 50 C-110 28 -20 52 80 40 C140 34 170 30 200 36 V120 H-200Z"/>' +
      '<path class="grass" d="M-200 82 C-100 70 20 84 120 76 C160 72 180 74 200 76 V120 H-200Z"/>';
    [[-20, 104, 26], [-34, 86, 20], [-18, 72, 15], [-28, 62, 11], [-20, 54, 8]].forEach(([x, y, r]) => { s += '<ellipse class="stone-dk" cx="' + x + '" cy="' + (y + 2) + '" rx="' + r + '" ry="' + r * 0.4 + '"/><ellipse class="stone" cx="' + x + '" cy="' + y + '" rx="' + r * 0.95 + '" ry="' + r * 0.33 + '"/>'; });
    return s;
  },
  storm() {
    return '<rect x="-200" y="-120" width="400" height="240" style="fill:#5E6B78"/><path d="M-200 60 C-100 40 0 64 100 50 C150 44 180 44 200 48 V120 H-200Z" style="fill:#46525D"/>' +
      '<path d="M-90 -10 C-130 -10 -130 -60 -90 -62 C-88 -100 -30 -110 -10 -78 C10 -110 70 -100 66 -60 C110 -60 110 -10 66 -10Z" style="fill:#8A95A1;stroke:var(--second);stroke-width:5"/>' +
      '<path d="M-6 -6 L-26 34 H-6 L-18 74 L22 22 H0 L14 -6Z" style="fill:#F4D35E;stroke:var(--second);stroke-width:4;stroke-linejoin:round"/>' +
      '<path style="fill:none;stroke:#B8C4CF;stroke-width:5;stroke-linecap:round" d="M-110 10 l-10 24 M-80 16 l-10 24 M60 10 l-10 24 M90 18 l-10 24 M120 8 l-10 24"/>';
  },
  imgBubble(id) {
    return '<g class="' + id + '"><circle class="' + id + '-t1" cx="-222" cy="172" r="12" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<circle class="' + id + '-t0" cx="-190" cy="132" r="18" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<filter id="' + id + '-blf" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur class="' + id + '-bv" stdDeviation="0"/></filter>' +
      '<clipPath id="' + id + '-cl"><rect x="-190" y="-110" width="380" height="220" rx="96"/></clipPath>' +
      '<rect class="shade" x="-184" y="-100" width="380" height="220" rx="96"/><rect x="-190" y="-110" width="380" height="220" rx="96" style="fill:color-mix(in srgb, var(--ground) 30%, white)"/>' +
      '<g clip-path="url(#' + id + '-cl)"><g class="' + id + '-calm" filter="url(#' + id + '-blf)">' + R.miniLand(id) + '</g><g class="' + id + '-storm" opacity="0">' + R.storm() + '</g></g>' +
      '<rect x="-190" y="-110" width="380" height="220" rx="96" style="fill:none;stroke:var(--second);stroke-width:6"/></g>';
  },
  bubRefs(kit, id) { return R.refs(kit, id, ['calm', 'storm', 'bv', 't0', 't1', 'sun']); },
  // show: 0..1 grows the bubble out of its trail; storm 0..1; blur in px
  setBub(r, g, x, y, show, s, storm, blur) {
    const sh = kit.eob(kit.clamp01(show * 1.25 - 0.25), 1.3);
    g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, (s || 1) * sh) + ')');
    g.style.opacity = show > 0.001 ? 1 : 0;
    r.storm.setAttribute('opacity', storm || 0);
    r.bv.setAttribute('stdDeviation', blur || 0);
  },
  // a pulse line (an ECG trace) as a path d: x0..x0+w around y; fast = 0..1 (calm to racing); ph scrolls
  pulseD(x0, y, w, fast, ph) {
    let d = ''; const n = 120, per = kit.lerp(0.5, 0.22, fast);
    for (let i = 0; i <= n; i++) {
      const u = i / n, k = (((u + ph) / per) % 1 + 1) % 1;
      const v = k < 0.42 ? 0 : k < 0.48 ? -(k - 0.42) / 0.06 * 0.25 : k < 0.52 ? -0.25 + (k - 0.48) / 0.04 * 1.25 : k < 0.56 ? 1.0 - (k - 0.52) / 0.04 * 1.4 : k < 0.6 ? -0.4 + (k - 0.56) / 0.04 * 0.4 : 0;
      d += (i ? ' L' : 'M') + (x0 + w * u).toFixed(1) + ' ' + (y - 50 * v * kit.lerp(0.7, 1.1, fast)).toFixed(1);
    }
    return d;
  },
  // the house plant, pot base at 0,0, leaves in id-lv (scale it to grow) and a new leaf id-nl
  growPlant(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="2" rx="62" ry="10"/><g class="' + id + '-lv">' +
      '<path class="leaf" d="M0 -90 C-40 -140 -60 -170 -66 -220 C-30 -200 -8 -160 0 -90Z M0 -90 C20 -160 50 -190 84 -210 C76 -160 42 -120 0 -90Z M0 -90 C-10 -160 -6 -210 10 -260 C26 -210 20 -150 0 -90Z"/>' +
      '<path class="leaf-lt" d="M0 -90 C-22 -130 -34 -160 -38 -192 C-14 -170 -4 -136 0 -90Z"/>' +
      '<g class="' + id + '-nl"><path class="leaf-lt" d="M6 -96 C40 -110 64 -140 76 -170 C40 -160 16 -136 6 -96Z" style="stroke:var(--main);stroke-width:3"/></g></g>' +
      '<path class="amber-dk" d="M-46 -94 H46 L34 0 H-34Z"/><rect class="amber" x="-52" y="-100" width="104" height="22" rx="6"/></g>';
  },
  // water drops falling from a spout at 0,0 (animate id-d0..3 along y)
  drops(id) { return '<g class="' + id + '">' + [0, 1, 2, 3].map((k) => '<path class="' + id + '-d' + k + '" d="M0 -10 C6 0 8 6 0 12 C-8 6 -6 0 0 -10Z" style="fill:#7FB7D9;stroke:var(--second);stroke-width:2"/>').join('') + '</g>'; },
  // Ruth as a grey statue on a plinth (origin at the plinth's foot)
  statue(id) {
    const fig = R.ruth(id, 'stand').replace(/<ellipse class="shade"[^>]*\/>/, '');
    return '<g class="' + id + '-st"><rect x="-110" y="-70" width="220" height="70" rx="6" style="fill:#C8CCD2;stroke:var(--second);stroke-width:5"/><rect x="-124" y="-84" width="248" height="20" rx="6" style="fill:#B3B8BF;stroke:var(--second);stroke-width:5"/>' +
      '<g transform="translate(0 -84)" style="filter:grayscale(1) brightness(1.08) contrast(.8)">' + fig + '</g></g>';
  },
  xMark(id, r) {
    return '<g class="' + id + '"><path class="' + id + '-a" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round;stroke-dasharray:1 1" d="M' + (-r) + ' ' + (-r) + ' L' + r + ' ' + r + '"/>' +
      '<path class="' + id + '-b" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round;stroke-dasharray:1 1" d="M' + r + ' ' + (-r) + ' L' + (-r) + ' ' + r + '"/></g>';
  },
  drawOn(p, v) { p.style.strokeDashoffset = 1 - v; p.style.opacity = v > 0.002 ? 1 : 0; },
  // small round pictures for what comes up: a sensation (warm waves), a memory (a photo of two friends), just the words (lines of text)
  pic(id, kind) {
    const ring = '<circle class="shade" cy="7" r="80"/><circle r="80" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>';
    const g = {
      feel: '<circle r="56" style="fill:var(--accent);opacity:.25"/><circle r="30" class="amber"/><path class="ink" style="stroke-width:6;stroke:var(--accent)" d="M-58 -28 q10 -10 20 0 M38 -28 q10 -10 20 0 M-58 30 q10 -10 20 0 M38 30 q10 -10 20 0"/>',
      memory: '<g transform="rotate(-6)"><rect x="-52" y="-44" width="104" height="88" rx="6" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-42" y="-34" width="84" height="56" style="fill:color-mix(in srgb, var(--main) 22%, var(--ground))"/>' +
        '<circle cx="-14" cy="-10" r="11" class="skin"/><path d="M-30 22 q16 -22 32 0Z" class="knit"/><circle cx="16" cy="-8" r="11" style="fill:color-mix(in srgb, color-mix(in srgb, var(--accent) 55%, var(--ground)) 82%, var(--second))"/><path d="M0 22 q16 -22 32 0Z" class="nira-top"/></g>',
      words: '<path class="ink" style="stroke-width:8" d="M-44 -28 H44 M-44 -4 H30 M-44 20 H40"/><path class="ink" style="stroke-width:8;opacity:.4" d="M-44 44 H10"/>',
      picture: '<clipPath id="' + id + '-pc"><circle r="74"/></clipPath><g clip-path="url(#' + id + '-pc)"><g transform="scale(.52)">' + R.miniLand(id + 'm') + '</g></g>',
    }[kind];
    return '<g class="' + id + '">' + ring + g + '</g>';
  },
  // two arcs of sound beside a phone (centre 0,0)
  sound(id) { return '<g class="' + id + '"><path class="ink" style="stroke-width:6;stroke:var(--main)" d="M10 -18 q12 18 0 36"/><path class="ink" style="stroke-width:6;stroke:var(--main)" d="M26 -32 q22 32 0 64"/></g>'; },
});
