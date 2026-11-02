// Session 60 additions: the ring of role badges, the two-layer role card, the family car (front view), a grandchild, keys, a map, a puzzle, a keepsake box.
Object.assign(R, {
  ROLES: ['בני זוג', 'הורים', 'סבים וסבתות', 'חברים', 'עובדים', 'מתנדבים', 'קהילה'],
  // badge centres on an arc around Ruth (standing at x 540), right to left, and where each label sits
  RING: [[941, 615], [863, 448], [720, 331], [540, 290], [360, 331], [217, 448], [139, 615]],
  RLAB: [[941, 707], [863, 540], [745, 240], [540, 382], [360, 423], [217, 540], [139, 707]],
  // one role badge: an icon for the role and a small heart on its rim
  role(cls, k, r) {
    r = r || 62;
    const fills = ['color-mix(in srgb, var(--accent) 30%, var(--ground))', 'color-mix(in srgb, var(--main) 30%, var(--ground))', 'color-mix(in srgb, var(--accent) 45%, var(--ground))', 'color-mix(in srgb, var(--main) 18%, var(--ground))', 'color-mix(in srgb, var(--second) 16%, var(--ground))', 'color-mix(in srgb, var(--accent) 18%, white)', 'color-mix(in srgb, var(--main) 42%, var(--ground))'];
    const g = [
      '<circle class="ink" style="stroke-width:8;stroke:var(--accent)" cx="-12" cy="2" r="20"/><circle class="ink" style="stroke-width:8" cx="12" cy="2" r="20"/>',
      '<path class="knit" d="M-38 40 C-38 8 -28 -2 -14 -2 C0 -2 10 8 10 40Z"/><circle class="skin" cx="-14" cy="-22" r="16"/><path class="nira-top" d="M12 40 C12 22 18 16 28 16 C38 16 44 22 44 40Z"/><circle class="nira-skin" cx="28" cy="2" r="11"/>',
      '<path class="knit" d="M-40 40 C-40 8 -30 -2 -16 -2 C-2 -2 8 8 8 40Z"/><circle class="skin" cx="-16" cy="-22" r="16"/><path class="hair" d="M-32 -24 C-32 -44 0 -44 0 -24 C-8 -32 -24 -32 -32 -24Z"/><path class="leaf-lt" d="M14 40 C14 24 20 18 30 18 C40 18 46 24 46 40Z"/><circle class="nira-skin" cx="30" cy="4" r="11"/>',
      '<path class="knit" d="M-44 40 C-44 12 -34 2 -18 2 C-2 2 8 12 8 40Z"/><circle class="skin" cx="-18" cy="-18" r="15"/><path class="fra-top" d="M-2 40 C-2 14 8 6 22 6 C36 6 46 14 46 40Z"/><circle class="nira-skin" cx="22" cy="-12" r="14"/><path class="fra-hair" d="M8 -12 C6 -32 38 -32 36 -12 C30 -22 14 -22 8 -12Z"/>',
      '<rect class="wood" x="-36" y="-12" width="72" height="48" rx="8"/><path class="ink" style="stroke-width:6" d="M-12 -12 V-22 H12 V-12"/><rect class="wood-lt" x="-36" y="6" width="72" height="6"/>',
      '<path class="amber-dk" d="M0 6 C-26 -10 -18 -36 0 -22 C18 -36 26 -10 0 6Z"/><path class="skin" style="stroke:var(--second);stroke-width:4;stroke-linejoin:round" d="M-4 40 C-26 40 -46 28 -48 4 C-36 14 -20 18 -4 18Z M4 40 C26 40 46 28 48 4 C36 14 20 18 4 18Z"/>',
      '<path class="wood-lt" style="stroke:var(--second);stroke-width:4;stroke-linejoin:round" d="M-46 36 V2 L-30 -14 L-14 2 V36Z M-14 36 V-10 L4 -28 L22 -10 V36Z M22 36 V4 L36 -10 L50 4 V36Z"/>'
    ][k];
    return '<g class="' + cls + '"><circle class="' + cls + '-glow amber-lt" r="' + (r * 1.45) + '" opacity="0"/><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle class="' + cls + '-disc" r="' + r + '" style="fill:' + fills[k] + ';stroke:var(--second);stroke-width:5"/>' +
      '<g class="' + cls + '-ico" transform="scale(' + (r / 62) + ')">' + g + '</g>' +
      '<g transform="translate(' + (r * 0.72) + ' ' + (r * 0.72) + ')"><circle r="' + (r * 0.3) + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:4"/><path class="amber-dk" transform="scale(' + (r / 110) + ')" d="M0 16 C-26 0 -18 -24 0 -12 C18 -24 26 0 0 16Z"/></g></g>';
  },
  // the role card: the role on top (solid), the way underneath (dashed, its shape can change). Centre (0,0), 640 wide.
  roleCard(id) {
    return '<g class="' + id + '-card"><rect class="shade" x="-314" y="-176" width="640" height="160" rx="30"/><rect x="-320" y="-184" width="640" height="160" rx="30" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>' +
      '<path class="' + id + '-way" style="fill:color-mix(in srgb, var(--accent) 30%, var(--ground));stroke:var(--accent);stroke-width:7;stroke-dasharray:22 14;stroke-linejoin:round"/></g>';
  },
  // the lower layer's outline, morphing from a rounded box (m = 0) to a soft wave (m = 1)
  wayPath(m, w) {
    w = w || 640;
    const x0 = -w / 2, x1 = w / 2, y0 = 4, y1 = 164, n = 8;
    let top = 'M' + x0 + ' ' + (y0 + 30), bot = '';
    top = 'M' + (x0 + 30) + ' ' + y0;
    for (let i = 1; i <= n; i++) { const x = x0 + 30 + (w - 60) * i / n; top += ' L' + x.toFixed(1) + ' ' + (y0 + m * 14 * Math.sin(i * 1.6)).toFixed(1); }
    top += ' Q' + x1 + ' ' + y0 + ' ' + x1 + ' ' + (y0 + 30) + ' L' + (x1 + m * 20) + ' ' + ((y0 + y1) / 2) + ' L' + x1 + ' ' + (y1 - 30) + ' Q' + x1 + ' ' + y1 + ' ' + (x1 - 30) + ' ' + y1;
    for (let i = n - 1; i >= 0; i--) { const x = x0 + 30 + (w - 60) * i / n; bot += ' L' + x.toFixed(1) + ' ' + (y1 + m * 14 * Math.sin(i * 1.3 + 1)).toFixed(1); }
    return top + bot + ' Q' + x0 + ' ' + y1 + ' ' + x0 + ' ' + (y1 - 30) + ' L' + (x0 - m * 20) + ' ' + ((y0 + y1) / 2) + ' L' + x0 + ' ' + (y0 + 30) + ' Q' + x0 + ' ' + y0 + ' ' + (x0 + 30) + ' ' + y0 + 'Z';
  },
  keys(id) {
    return '<g class="' + id + '"><circle class="ink" style="stroke:var(--accent);stroke-width:9" cx="-20" cy="0" r="18"/><path class="ink" style="stroke:var(--accent);stroke-width:9" d="M-2 0 H44 M32 0 V16 M44 0 V12"/><rect class="metal" x="-60" y="-14" width="26" height="30" rx="8"/></g>';
  },
  // a grandchild: a small standing figure, origin between the feet
  kid(id) {
    return '<g class="' + id + '-kid"><ellipse class="shade" cx="0" cy="4" rx="46" ry="7"/><path class="frg-pants" d="M-22 -110 h18 l-2 110 h-18Z M4 -110 h18 l2 110 h-18Z"/>' + R.shoe(-30, 2).replace('slate-dk', 'slate-dk') + R.shoe(-2, 2) +
      '<path class="leaf-lt" d="M-42 -100 C-46 -150 -40 -190 -20 -204 Q0 -214 20 -204 C40 -190 46 -150 42 -100Z"/>' +
      '<path class="leaf-lt" d="M-38 -190 C-56 -160 -54 -130 -46 -112 L-34 -114 C-40 -134 -38 -160 -28 -180Z M38 -190 C56 -160 54 -130 46 -112 L34 -114 C40 -134 38 -160 28 -180Z"/><ellipse class="nira-skin" cx="-42" cy="-108" rx="10" ry="11"/><ellipse class="nira-skin" cx="42" cy="-108" rx="10" ry="11"/>' +
      '<g transform="translate(0 -250)"><ellipse class="nira-skin" cx="0" cy="0" rx="36" ry="40"/><path class="fra-hair" d="M-38 -6 C-42 -46 -12 -56 6 -54 C34 -52 44 -30 38 -6 C28 -26 4 -34 -38 -6Z"/>' +
      '<g class="' + id + '-eyes"><circle class="metal" cx="-12" cy="2" r="4.5"/><circle class="metal" cx="14" cy="2" r="4.5"/></g><path class="ink" style="stroke-width:4" d="M-8 20 Q2 28 12 20"/></g></g>';
  },
  // the family car seen from the front: two seats behind the windscreen, the wheel on the viewer's right
  carFront(id, inner) {
    return '<g class="' + id + '-car"><ellipse class="shade" cx="0" cy="10" rx="330" ry="26"/>' +
      '<rect x="-300" y="-30" width="70" height="60" rx="16" style="fill:var(--second)"/><rect x="230" y="-30" width="70" height="60" rx="16" style="fill:var(--second)"/>' +
      '<path style="fill:#5E8FB5" d="M-250 -380 Q-240 -420 -190 -424 H190 Q240 -420 250 -380 L290 -220 H-290Z"/>' +
      '<path style="fill:color-mix(in srgb, #DCEBF2 80%, white)" d="M-222 -380 Q-214 -404 -180 -406 H180 Q214 -404 222 -380 L252 -240 H-252Z"/>' +
      '<g class="' + id + '-seats">' + (inner || '') + '</g>' +
      '<path style="fill:#4E7FAA" d="M-320 -230 Q-320 -250 -296 -250 H296 Q320 -250 320 -230 V-40 Q320 -16 296 -16 H-296 Q-320 -16 -320 -40Z"/>' +
      '<rect x="-120" y="-160" width="240" height="70" rx="20" style="fill:#3D6890"/><path style="stroke:#2F5677;stroke-width:6" d="M-100 -136 H100 M-100 -114 H100"/>' +
      '<circle cx="-236" cy="-140" r="40" class="light"/><circle cx="-236" cy="-140" r="40" style="fill:none;stroke:var(--second);stroke-width:6"/><circle cx="236" cy="-140" r="40" class="light"/><circle cx="236" cy="-140" r="40" style="fill:none;stroke:var(--second);stroke-width:6"/>' +
      '<rect x="-60" y="-70" width="120" height="34" rx="6" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/></g>';
  },
  // a head and shoulders seen through the windscreen (origin = chin level)
  bust(id, who) {
    let s = who === 'ruth' ? R.ruth(id, 'stand') : R.friend(id, who, 'stand');
    return '<g class="' + id + '-bust"><g transform="translate(0 340)">' + s + '</g></g>';
  },
  wheel(id) {
    return '<g class="' + id + '"><circle class="ink" style="stroke-width:14" r="58"/><path class="ink" style="stroke-width:10" d="M-56 0 H56 M0 0 V56"/><circle class="metal" r="14"/></g>';
  },
  map(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(6 8)" d="M-110 -70 L-36 -82 L36 -70 L110 -82 V70 L36 82 L-36 70 L-110 82Z"/>' +
      '<path style="fill:color-mix(in srgb, var(--accent) 22%, white);stroke:var(--second);stroke-width:5;stroke-linejoin:round" d="M-110 -70 L-36 -82 L36 -70 L110 -82 V70 L36 82 L-36 70 L-110 82Z"/>' +
      '<path style="stroke:var(--second);stroke-width:3;opacity:.3" d="M-36 -82 V70 M36 -70 V82"/>' +
      '<path class="' + id + '-route" pathLength="1" style="fill:none;stroke:#D96C6C;stroke-width:8;stroke-linecap:round;stroke-dasharray:.06 .05" d="M80 50 C40 40 30 -10 0 -10 C-30 -10 -40 30 -80 -40"/><circle cx="-80" cy="-40" r="12" style="fill:#D96C6C"/></g>';
  },
  // a small table with a puzzle on it (origin = floor under its middle)
  puzzleTable(id) {
    let p = '';
    [[-60, 0], [-20, 0], [20, 0], [-60, 34], [-20, 34]].forEach(([x, y], k) => { p += '<rect x="' + (x - 18) + '" y="' + (y - 238) + '" width="38" height="32" rx="5" style="fill:' + ['#E8A33D', '#6FAE7A', '#5E8FB5', '#D96C6C', '#B07AA1'][k] + ';stroke:var(--second);stroke-width:3"/>'; });
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="4" rx="150" ry="12"/><rect class="wood" x="-16" y="-180" width="32" height="180"/><rect class="wood" x="-140" y="-200" width="280" height="26" rx="10"/>' +
      '<rect class="wood-lt" x="-110" y="-262" width="200" height="66" rx="8"/>' + p + '<g class="' + id + '-last"><rect x="42" y="-206" width="38" height="32" rx="5" style="fill:#E8A33D;stroke:var(--second);stroke-width:3"/></g></g>';
  },
  // a keepsake box on a low shelf (origin = its base centre); its lid is id-lid
  box(id) {
    return '<g class="' + id + '"><rect class="shade" x="-100" y="-120" width="210" height="130" rx="12"/><rect class="wood" x="-106" y="-128" width="212" height="128" rx="12"/><rect class="wood-lt" opacity=".5" x="-90" y="-112" width="180" height="20" rx="8"/>' +
      '<g class="' + id + '-lid"><rect class="wood" x="-116" y="-150" width="232" height="30" rx="10"/><rect class="amber" x="-16" y="-142" width="32" height="14" rx="5"/></g></g>';
  },
  // a flip chart (origin = floor under it)
  flip(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:10" d="M-90 0 L-40 -300 M90 0 L40 -300 M0 0 V-300"/><rect x="-150" y="-560" width="300" height="290" rx="10" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>' +
      '<path class="ink" style="stroke-width:8;opacity:.55" d="M-110 -500 H80 M-110 -450 H40 M-110 -400 H100"/><path style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round" d="M-100 -320 L-40 -350 L20 -330 L100 -380"/></g>';
  },
});
