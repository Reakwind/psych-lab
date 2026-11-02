// Session 30 additions: the meadow of tall grass over session 1's landscape, with a trail that wears in band by band (and the path of stones
// rising out of it at the end); a lit path between brain cells for session 2's head cutaway; a padlock; research papers.
// The beam of attention, dots, leaves and small helpers are copied from films 28/29.
(() => {
  const L = (a, b, p) => a + (b - a) * p;
  // trail centre and half-width at a height y, following the path of stones
  const trailAt = (y) => {
    const P = R.PATH;
    if (y >= P[0][1]) return [P[0][0], P[0][2] * 1.15, 0];
    for (let k = 0; k < P.length - 1; k++) if (y >= P[k + 1][1]) { const f = (P[k][1] - y) / (P[k][1] - P[k + 1][1]); return [L(P[k][0], P[k + 1][0], f), L(P[k][2], P[k + 1][2], f) * 1.15, k + f]; }
    return [P[P.length - 1][0], P[P.length - 1][2] * 1.15, P.length - 1];
  };
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  Object.assign(R, {
    trailAt,
    NB: 10,
    // the meadow: land, the trail's bare earth per band (id-tr{b}), and blades of grass far to near; blades on the trail come tall (id-tb{b}) and flattened (id-tf{b})
    meadow(id) {
      seed = 7;
      let s = R.land(id, { sun: true }).replace(new RegExp('<g class="' + id + '-st\\d+">.*?</g>', 'g'), '');
      const P = R.PATH;
      for (let b = 0; b < R.NB; b++) {
        const y0 = b === 0 ? 1100 : P[b][1], y1 = P[b + 1][1], [x0, w0] = trailAt(Math.min(y0, 1000)), [x1, w1] = trailAt(y1);
        const yy0 = b === 0 ? 1100 : y0, ww0 = b === 0 ? w0 * 1.15 : w0;
        s += '<path class="' + id + '-tr' + b + '" d="M' + (x0 - ww0) + ' ' + yy0 + ' L' + (x1 - w1) + ' ' + y1 + ' L' + (x1 + w1) + ' ' + y1 + ' L' + (x0 + ww0) + ' ' + yy0 + 'Z" style="fill:color-mix(in srgb, var(--accent) 30%, var(--ground))"/>';
      }
      for (let y = 486; y < 1110;) {
        const t = (y - 470) / 630, sp = L(13, 58, t), h = L(14, 110, t), w = L(3.5, 15, t);
        const [cx, hw, k] = trailAt(y), b = Math.min(R.NB - 1, Math.floor(k));
        for (let x = -20 + rnd() * sp; x < 1100; x += sp * (0.7 + 0.6 * rnd())) {
          const hh = h * (0.75 + 0.5 * rnd()), lean = (rnd() - 0.5) * w * 2, cls = rnd() < 0.35 ? 'hill-near' : 'grass';
          const blade = (k2) => 'M' + (x - w).toFixed(1) + ' ' + y.toFixed(1) + ' Q' + (x - w * 0.2 + lean * 0.5).toFixed(1) + ' ' + (y - hh * k2 * 0.6).toFixed(1) + ' ' + (x + lean).toFixed(1) + ' ' + (y - hh * k2).toFixed(1) + ' Q' + (x + w * 0.4 + lean * 0.5).toFixed(1) + ' ' + (y - hh * k2 * 0.5).toFixed(1) + ' ' + (x + w).toFixed(1) + ' ' + y.toFixed(1) + 'Z';
          if (Math.abs(x - cx) < hw * 1.1) s += '<path class="' + cls + ' ' + id + '-tb' + b + '" d="' + blade(1) + '"/>' + (rnd() < 0.3 ? '<path class="' + cls + ' ' + id + '-tf' + b + '" d="' + blade(0.14) + '"/>' : '');
          else s += '<path class="' + cls + '" d="' + blade(1) + '"/>';
        }
        y += L(10, 44, t);
      }
      // the path of stones, hidden until the trail is worn in (they sit on top of the flattened grass)
      s += '<g class="' + id + '-stones">';
      P.forEach(([x, y, r], k) => { s += '<g class="' + id + '-ns' + k + '" style="opacity:0">' + R.stone(id + '-nt' + k, x, y, r) + '</g>'; });
      return s + '</g>';
    },
    // a style element the scene rewrites each frame: wear[b] 0..1 per band
    meadowStyle(kit, id) { const st = document.createElement('style'); kit.stage.append(st); return { st, id, last: '' }; },
    setWear(m, wear) {
      let css = '';
      wear.forEach((w, b) => { css += '.' + m.id + '-tb' + b + '{opacity:' + (1 - w).toFixed(3) + '}.' + m.id + '-tf' + b + '{opacity:' + w.toFixed(3) + '}.' + m.id + '-tr' + b + '{opacity:' + (0.15 + 0.85 * w).toFixed(3) + '}'; });
      if (css !== m.last) { m.st.textContent = css; m.last = css; }
    },
    // where a walker stands at k along the path (0 = nearest stone)
    onPath(k) { const P = R.PATH, i = Math.max(0, Math.min(P.length - 2, Math.floor(k))), f = k - i; return [L(P[i][0], P[i + 1][0], f), L(P[i][1], P[i + 1][1], f), L(P[i][2], P[i + 1][2], f)]; },
    // Ruth from behind (two step frames) with a tuft of grass in front of her legs, so she wades (origin between the feet)
    wader(id) {
      let tuft = '<g class="' + id + '-tuft">';
      [-110, -70, -40, -10, 20, 50, 84, 116].forEach((x, k) => { const h = 150 + (k % 3) * 40; tuft += '<path class="' + (k % 2 ? 'grass' : 'hill-near') + '" d="M' + (x - 14) + ' 10 Q' + (x - 4) + ' ' + (-h * 0.6) + ' ' + (x + (k % 2 ? 10 : -8)) + ' ' + (-h) + ' Q' + (x + 6) + ' ' + (-h * 0.5) + ' ' + (x + 14) + ' 10Z"/>'; });
      return '<g class="' + id + '-w"><g class="' + id + '-a">' + R.ruthBack(id + '-a', false) + '</g><g class="' + id + '-b">' + R.ruthBack(id + '-b', true) + '</g>' + tuft + '</g></g>';
    },
    // place the wader at k along the path; step alternates the feet; tall 0..1 shows the grass at her legs
    setWader(w, k, t, walking, tall) {
      const [x, y, r] = R.onPath(k), s = Math.max(0.5, 0.62 * r / 130), step = walking ? Math.floor(t * 2.2) % 2 : 0;
      w.a.style.opacity = step ? 0 : 1; w.b.style.opacity = step ? 1 : 0; w.tuft.style.opacity = tall;
      w.w.setAttribute('transform', 'translate(' + x + ' ' + (y - (walking ? Math.abs(Math.sin(t * Math.PI * 2.2)) * 5 * s : 0)) + ') scale(' + s + ')');
    },
    waderRefs(kit, id) { const q = (c) => kit.stage.querySelector('.' + id + c); return { w: q('-w'), a: q('-a'), b: q('-b'), tuft: q('-tuft') }; },
    // ---- the lit path between brain cells, in the coordinates of R.profile (draw it after the profile; it clips to the cutaway) ----
    NEU: [[372, 430], [432, 318], [540, 286], [650, 322], [690, 420], [560, 452], [458, 470]],
    brainPath(p) {
      const main = 'M372 430 C380 370 400 330 432 318 C470 300 500 286 540 286 C590 286 630 300 650 322';
      let s = '<g clip-path="url(#' + p + '-clip)"><path style="fill:none;stroke:#fff;stroke-width:5;stroke-dasharray:4 14;stroke-linecap:round;opacity:.55" d="' + main + ' M650 322 C680 350 694 390 690 420 M372 430 C400 460 430 470 458 470 C500 470 530 462 560 452 C610 440 650 430 690 420"/>' +
        '<path class="' + p + '-path" pathLength="1" style="fill:none;stroke:var(--main);stroke-width:14;stroke-linecap:round;stroke-dasharray:0 1" d="' + main + '"/>' +
        '<path class="' + p + '-glow" style="fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round;opacity:0" d="' + main + '"/>' +
        '<path class="' + p + '-br" pathLength="1" style="fill:none;stroke:var(--main);stroke-width:12;stroke-linecap:round;stroke-dasharray:0 1" d="M650 322 C680 350 694 390 690 420"/>' +
        '<path class="' + p + '-pp" style="fill:none;stroke:none" d="' + main + '"/>';
      R.NEU.forEach(([x, y], k) => { s += '<circle class="' + p + '-n' + k + '" cx="' + x + '" cy="' + y + '" r="17" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>'; });
      return s + '<circle class="' + p + '-pulse" r="20" style="fill:#FFF3C4;stroke:var(--accent);stroke-width:6;opacity:0"/></g>';
    },
    brainRefs(kit, p) { const q = (c) => kit.stage.querySelector('.' + p + c); const o = { path: q('-path'), glow: q('-glow'), br: q('-br'), pp: q('-pp'), pulse: q('-pulse'), n: R.NEU.map((_, k) => q('-n' + k)) }; o.len = o.pp.getTotalLength(); return o; },
    // how worn the brain path is (0..1: dotted → bold), a pulse at position u (0..1, or <0 for none), branch 0..1
    setBrain(b, wear, u, branch) {
      b.path.style.strokeDasharray = (wear > 0 ? 1 : 0) + ' 1'; b.path.style.strokeWidth = (6 + 14 * wear).toFixed(1); b.path.style.opacity = wear > 0 ? 0.35 + 0.65 * wear : 0;
      b.glow.style.opacity = 0.7 * wear;
      if (u >= 0 && u <= 1) { const pt = b.pp.getPointAtLength(b.len * u); b.pulse.setAttribute('cx', pt.x); b.pulse.setAttribute('cy', pt.y); b.pulse.style.opacity = Math.sin(Math.PI * u) * 1.6 > 1 ? 1 : Math.sin(Math.PI * u) * 1.6; }
      else b.pulse.style.opacity = 0;
      b.br.style.strokeDasharray = (branch || 0) + ' 1'; b.br.style.opacity = branch > 0 ? 1 : 0;
      [0, 1, 2, 3].forEach((k) => { b.n[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(60 * wear) + '%, color-mix(in srgb, var(--ground) 30%, white))'; });
      b.n[4].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(60 * (branch || 0)) + '%, color-mix(in srgb, var(--ground) 30%, white))';
    },
    // a padlock (centre 0,0); id-sh is the shackle (lift it to open)
    padlock(id) {
      return '<g class="' + id + '"><g class="' + id + '-sh"><path class="ink" style="stroke-width:16" d="M-32 0 V-34 A32 32 0 0 1 32 -34 V0"/></g><rect class="shade" x="-50" y="-4" width="108" height="86" rx="16"/>' +
        '<rect x="-54" y="-10" width="108" height="86" rx="16" class="amber"/><rect x="-54" y="-10" width="108" height="86" rx="16" style="fill:none;stroke:var(--second);stroke-width:6"/><circle cx="0" cy="26" r="10" style="fill:var(--second)"/><rect x="-4" y="26" width="8" height="24" rx="4" style="fill:var(--second)"/></g>';
    },
    // a research paper (centre 0,0)
    doc(id) {
      return '<g class="' + id + '"><rect class="shade" x="-78" y="-96" width="168" height="208" rx="10"/><rect x="-84" y="-104" width="168" height="208" rx="10" style="fill:color-mix(in srgb, var(--ground) 25%, white);stroke:var(--second);stroke-width:5"/>' +
        '<rect class="slate" x="-62" y="-82" width="124" height="22" rx="6"/><path class="ink" style="stroke-width:5;opacity:.4" d="M-62 -40 H62 M-62 -22 H62 M-62 -4 H30"/>' +
        '<path class="ink" style="stroke-width:5" d="M-60 80 V20 M-60 80 H62"/><rect x="-44" y="44" width="20" height="36" style="fill:var(--main)"/><rect x="-14" y="30" width="20" height="50" style="fill:var(--main)"/><rect x="16" y="54" width="20" height="26" class="amber"/></g>';
    },
    // ---- copied from films 28/29 ----
    beam(id) {
      return '<defs><radialGradient id="' + id + '-g"><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
        '<mask id="' + id + '-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080"><rect width="1080" height="1080" fill="#fff"/><circle class="' + id + '-hole" r="1" fill="url(#' + id + '-g)"/></mask></defs>' +
        '<rect class="' + id + '-dim" width="1080" height="1080" mask="url(#' + id + '-m)" style="fill:#1A2340;opacity:0"/>' +
        '<g class="' + id + '-rim"><circle r="1" style="fill:#FFE6A8;opacity:.22"/><circle class="' + id + '-dash" r="1" style="fill:none;stroke:var(--accent);stroke-width:.022;stroke-dasharray:.06 .05;opacity:.95"/></g>';
    },
    beamRefs(kit, id) { const q = (c) => kit.stage.querySelector('.' + id + c); return { hole: q('-hole'), dim: q('-dim'), rim: q('-rim'), dash: q('-dash') }; },
    setBeam(b, x, y, r, dim, rim, spin) {
      b.hole.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r * 1.25 + ')');
      b.dim.style.opacity = 0.28 * dim;
      b.rim.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r + ')'); b.rim.style.opacity = rim == null ? dim : rim;
      b.dash.style.strokeDashoffset = spin || 0;
    },
    leaf(id, a) {
      return '<path class="' + id + ' leaf-lt" d="M0 0 C' + (30 * a) + ' -50 ' + (80 * a) + ' -60 ' + (110 * a) + ' -50 C' + (90 * a) + ' -10 ' + (40 * a) + ' 10 0 0Z" style="stroke:var(--second);stroke-width:3"/>';
    },
    dots(id, n, gap) {
      let s = '<g class="' + id + '">';
      for (let k = 0; k < n; k++) s += '<circle class="' + id + '-d' + k + '" cx="' + ((k - (n - 1) / 2) * (gap || 56)) + '" r="18" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>';
      return s + '</g>';
    },
    lightDot(el, p) { el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(100 * p) + '%, color-mix(in srgb, var(--ground) 40%, white))'; },
    litStone(top, p) { top.style.fill = 'color-mix(in srgb, var(--accent) ' + (22 + 78 * p).toFixed(1) + '%, var(--ground))'; },
    setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
    closeEyes(eyes) { eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); },
    mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29',
  });
})();
