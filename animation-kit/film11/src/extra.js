// Session 11 additions: the conversation-card deck on a side table, question cards (HTML) that rise and flip, the four sides of who we are as badges,
// the day's grey load that buries them, a thought bubble that opens on a picture, and the props for answering (speech bubble, notebook, finger).
Object.assign(R, {
  // a small side table right of the armchair
  sideTable(id) {
    return '<g class="' + id + '-tbl"><ellipse class="shade" cx="820" cy="864" rx="120" ry="12"/><rect class="wood" x="752" y="704" width="14" height="158" rx="6"/><rect class="wood" x="874" y="704" width="14" height="158" rx="6"/>' +
      '<rect class="wood-lt" x="726" y="688" width="188" height="24" rx="10"/><rect class="wood" opacity=".5" x="726" y="704" width="188" height="8" rx="4"/></g>';
  },
  // the deck lying on the table; drawn after Ruth so it can travel to her lap in front of her
  deckSvg(id) {
    let deck = '';
    for (let k = 0; k < 7; k++) deck += '<rect class="knit-dk" x="726" y="' + (676 - k * 9) + '" width="116" height="12" rx="5"/><rect class="knit" x="728" y="' + (674 - k * 9) + '" width="112" height="8" rx="4"/>';
    return '<g class="' + id + '-deck">' + deck + '</g>';
  },
  DECK: [784, 640],
  // a question card: back (the deck's teal with an amber ring) and face (the question); kind 'act' gives the green action-card face
  qcard(cls, text, kind) {
    return '<div class="qc ' + cls + (kind ? ' ' + kind : '') + '"><div class="qc-bk"></div><div class="qc-fc">' + text + '</div></div>';
  },
  // place a card: centre, scale, rotation, flip f (0 = back up, 1 = face up), opacity
  flipCard(el, x, y, s, rot, f, o) {
    const sx = Math.max(0.02, Math.abs(Math.cos(Math.PI * f)));
    el.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%) rotate(' + (rot || 0) + 'deg) scale(' + (sx * s) + ',' + s + ')';
    el.classList.toggle('up', f >= 0.5);
    if (o != null) el.style.opacity = o;
  },
  // a card rising from the deck to (x, y) and turning face up over p = 0..1
  riseCard(el, p, x, y, s, rot) {
    const e = kit.eio(p);
    R.flipCard(el, kit.lerp(R.DECK[0], x, e), kit.lerp(R.DECK[1], y, e) - Math.sin(Math.PI * e) * 80, kit.lerp(0.2, s || 1, e), kit.lerp(-10, rot || 0, e), kit.clamp01((p - 0.35) / 0.55), p > 0 ? 1 : 0);
  },
  CPILE: [866, 650],
  // the four sides of who we are (people, interests, experiences, values) plus a fun one, as round badges (r 70); id-g is a grey cover
  SIDE_FILL: ['color-mix(in srgb, var(--main) 30%, var(--ground))', 'color-mix(in srgb, var(--accent) 45%, var(--ground))', 'color-mix(in srgb, var(--main) 18%, var(--ground))', '#F2C9C9', 'color-mix(in srgb, var(--accent) 30%, var(--ground))'],
  side(id, k) {
    const g = [
      '<circle class="metal" cx="-20" cy="-18" r="15"/><circle class="metal" cx="22" cy="-18" r="15"/><path class="metal" d="M-46 32 C-46 6 -34 -2 -20 -2 C-6 -2 4 6 4 32Z M-4 32 C-4 6 8 -2 22 -2 C36 -2 48 6 48 32Z"/>',
      '<path class="light" d="M-34 18 C-50 -10 -20 -42 14 -36 C40 -30 46 -6 30 0 C18 4 14 10 18 20 C22 32 -20 44 -34 18Z"/><path class="ink" style="stroke-width:5" d="M-34 18 C-50 -10 -20 -42 14 -36 C40 -30 46 -6 30 0 C18 4 14 10 18 20 C22 32 -20 44 -34 18Z"/>' +
        '<circle cx="-18" cy="-14" r="7" style="fill:#D96C6C"/><circle cx="4" cy="-22" r="7" class="amber"/><circle cx="-26" cy="8" r="7" class="knit"/><circle cx="-4" cy="18" r="6" style="fill:#4E7FAA"/>',
      '<rect class="light" x="-38" y="-30" width="76" height="60" rx="6"/><path class="knit" d="M-34 26 L-12 -2 L4 14 L14 4 L34 26Z"/><circle class="amber" cx="20" cy="-14" r="8"/><rect class="ink" style="stroke-width:5" x="-38" y="-30" width="76" height="60" rx="6"/>',
      '<circle class="light" r="36"/><circle class="ink" style="stroke-width:5" r="36"/><path d="M0 -28 L8 0 L0 28 L-8 0Z" style="fill:#D96C6C"/><path class="metal" d="M0 28 L8 0 L-8 0Z"/><circle class="light" r="4"/>',
      '<circle class="amber" r="36"/><circle class="ink" style="stroke-width:5" r="36"/><circle class="metal" cx="-12" cy="-8" r="5"/><circle class="metal" cx="12" cy="-8" r="5"/><path class="ink" style="stroke-width:5" d="M-18 8 Q0 26 18 8"/>'
    ][k];
    return '<g class="' + id + '"><circle class="shade" cy="8" r="70"/><circle r="70" style="fill:' + R.SIDE_FILL[k] + ';stroke:var(--second);stroke-width:6"/>' + g +
      '<circle class="' + id + '-g" r="73" style="fill:color-mix(in srgb, var(--second) 26%, var(--ground));opacity:0"/></g>';
  },
  // grey slabs of the day's load (session 2's effort blocks), centred on the origin: id-0..id-2
  load(id) {
    return [[-6, 46], [10, -10], [-4, -66]].map(([x, y], j) => '<g class="' + id + '-' + j + '"><g transform="translate(' + x + ' ' + y + ')"><rect class="slate-dk" x="-84" y="-28" width="168" height="56" rx="12"/><rect class="slate" x="-76" y="-22" width="152" height="22" rx="8"/></g></g>').join('');
  },
  // drop slab j of a stack: p = 0..1 falls in with a bump; q = 0..1 slides it off to the side and fades it
  slab(el, p, q, side) {
    el.setAttribute('transform', 'translate(' + (q * 220 * (side || 1)) + ' ' + (-420 * (1 - kit.eob(p, 1.2))) + ') rotate(' + (q * 24 * (side || 1)) + ')');
    el.style.opacity = (p > 0 ? 1 : 0) * (1 - q);
  },
  // the badge row: positions (right to left), and a setter
  SIDES: [[870, 230], [650, 200], [440, 200], [230, 230]],
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  // a round thought bubble that frames a picture (radius 150), with small trailing puffs (id-p0..2) placed by the scene
  bubble(id, inner) {
    return '<g class="' + id + '"><circle class="shade" cy="10" r="150"/><circle r="150" style="fill:color-mix(in srgb, var(--ground) 40%, white)"/>' +
      '<clipPath id="' + id + '-cp"><circle r="142"/></clipPath><g clip-path="url(#' + id + '-cp)">' + inner + '</g><circle r="150" style="fill:none;stroke:var(--second);stroke-width:6"/></g>' +
      [0, 1, 2].map((k) => '<circle class="' + id + '-p' + k + '" r="' + (22 - k * 6) + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>').join('');
  },
  // the path landscape as a small picture centred on the origin
  placePic(id) { return '<g transform="translate(-170 -150) scale(.32)">' + R.land(id, { sun: true }) + '</g>'; },
  // a speech bubble with three dots (centre 0,0)
  speech(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(0 8)" d="M-90 -50 H90 Q110 -50 110 -30 V30 Q110 50 90 50 H-10 L-40 82 L-36 50 H-90 Q-110 50 -110 30 V-30 Q-110 -50 -90 -50Z"/>' +
      '<path d="M-90 -50 H90 Q110 -50 110 -30 V30 Q110 50 90 50 H-10 L-40 82 L-36 50 H-90 Q-110 50 -110 30 V-30 Q-110 -50 -90 -50Z" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' +
      '<circle class="metal" cx="-36" r="10"/><circle class="metal" r="10"/><circle class="metal" cx="36" r="10"/></g>';
  },
  // an open notebook with a pen (centre 0,0)
  notebook(id) {
    return '<g class="' + id + '"><rect class="shade" x="-104" y="-66" width="216" height="144" rx="12"/><path d="M0 -60 C-30 -72 -80 -72 -104 -60 V70 C-80 58 -30 58 0 70 C30 58 80 58 104 70 V-60 C80 -72 30 -72 0 -60Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>' +
      '<path class="ink" style="stroke-width:4;opacity:.45" d="M-84 -30 H-20 M-84 -6 H-26 M-84 18 H-36 M20 -30 H84 M20 -6 H70"/><path class="ink" style="stroke-width:5" d="M0 -60 V70"/>' +
      '<g class="' + id + '-pen" transform="translate(76 -6) rotate(30)"><rect class="amber" x="-8" y="-60" width="16" height="70" rx="4"/><path class="metal" d="M-8 10 L0 30 L8 10Z"/></g></g>';
  },
  // a pointing finger coming up from below, the tip at the origin
  finger(id) {
    return '<g class="' + id + '"><path class="skin" d="M-16 0 C-16 -14 16 -14 16 0 V120 H40 C56 120 64 136 64 150 V260 H-60 V150 C-60 132 -46 126 -16 130Z"/><path class="skin-dk" opacity=".5" d="M-16 70 H16 M-16 100 H16"/><path class="knit" d="M-70 250 H74 V330 H-70Z"/></g>';
  },
  // the badge row with optional load stacks (id-w0..3 wrappers, id-sd0..3 badges, id-l0..3 slabs) and the fun badge (id-w4)
  sidesSvg(id, load, fun) {
    let s = '';
    for (let k = 0; k < 4; k++) s += '<g class="' + id + '-w' + k + '">' + R.side(id + '-sd' + k, k) + (load ? R.load(id + '-l' + k) : '') + '</g>';
    if (fun) s += '<g class="' + id + '-w4">' + R.side(id + '-sd4', 4) + '</g>';
    return s;
  },
  sidesRefs(kit, id) {
    const q = (c) => kit.stage.querySelector('.' + c), o = { w: [], s: [], g: [], l: [] };
    for (let k = 0; k < 5; k++) { o.w.push(q(id + '-w' + k)); o.s.push(q(id + '-sd' + k)); o.g.push(q(id + '-sd' + k + '-g')); o.l.push([0, 1, 2].map((j) => q(id + '-l' + k + '-' + j))); }
    return o;
  },
  // the small badge row along the top, for the later scenes
  smallSide(k) { return [540 + (R.SIDES[k][0] - 540) * 0.6, 96]; },
  FUN: [545, 360],
  // the cards already played, lying on the table: n of them
  pileSvg(id, n) {
    const P = [[-6, 2, -8], [4, -2, 5], [0, 0, -3]];
    let s = '<g class="' + id + '-pile">';
    for (let k = 0; k < 3; k++) {
      const [dx, dy, r] = P[k];
      s += '<g class="' + id + '-pc' + k + '" style="opacity:' + (k < n ? 1 : 0) + '" transform="translate(' + (R.CPILE[0] + dx) + ' ' + (R.CPILE[1] + dy) + ') rotate(' + r + ')"><rect x="-57" y="-33" width="114" height="66" rx="8" style="fill:color-mix(in srgb, var(--accent) 14%, white);stroke:var(--second);stroke-width:3"/>' +
        '<path class="ink" style="stroke-width:3;opacity:.4" d="M-34 -12 H34 M-28 0 H28 M-20 12 H20"/></g>';
    }
    return s + '</g>';
  },
  // a played card flying from (x, y) at scale s to the pile, slot k; fades into the SVG pile card at the end
  toPile(el, p, x, y, rot, k, pc) {
    const P = [[-6, 2, -8], [4, -2, 5], [0, 0, -3]][k], e = kit.eio(p);
    R.flipCard(el, kit.lerp(x, R.CPILE[0] + P[0], e), kit.lerp(y, R.CPILE[1] + P[1], e) - Math.sin(Math.PI * e) * 60, kit.lerp(1, 0.22, e), kit.lerp(rot || 0, P[2], e), 1, 1 - kit.clamp01((p - 0.85) / 0.15));
    if (pc) pc.style.opacity = kit.clamp01((p - 0.8) / 0.2);
  },
  // the deck fanned out in Ruth's hands (id-c0..5 rotate about the pivot)
  fan(id) {
    const cols = ['color-mix(in srgb, var(--accent) 14%, white)', 'color-mix(in srgb, var(--main) 18%, white)', 'color-mix(in srgb, var(--main) 32%, white)', '#F6D2D2', 'color-mix(in srgb, var(--accent) 42%, white)', 'color-mix(in srgb, var(--accent) 14%, white)'];
    return '<g class="' + id + '">' + cols.map((c, k) => '<g class="' + id + '-c' + k + '"><rect x="-58" y="-190" width="116" height="170" rx="14" style="fill:' + c + ';stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke-width:4;opacity:.35" d="M-34 -150 H34 M-34 -128 H20 M-34 -106 H28"/></g>').join('') + '</g>';
  },
  setFan(cards, open) { cards.forEach((c, k) => c.setAttribute('transform', 'rotate(' + ((k - 2.5) * 13 * open) + ')')); },
  FANP: [510, 770],
  // the circle of attention as a lamp of fixed size (r 120), so its dashed rim stays bold; scale it
  lamp(id) { return '<g class="' + id + '"><circle r="120" style="fill:var(--accent);opacity:.2"/><circle r="120" style="fill:none;stroke:var(--accent);stroke-width:7;stroke-dasharray:18 14"/></g>'; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29',
});
