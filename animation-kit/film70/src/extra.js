// Session 70 additions. Repeated from session 14 (film14/src/extra.js) so this film builds on its own: the tension meter helpers, tension marks,
// quick breaths, the night window, the scan line and the round badges (rest, recover, sleep).
// New here: Ruth's furrowed brow and clenched jaw (close-up overlays in her head coordinates), tension marks for a standing Ruth,
// badges for the everyday helpers (breath, stretch, music, shower, a walk outside), the radio and notes (session 25), an open-door overlay,
// and Ruth's room with her in the armchair, the overlays built in.
Object.assign(R, {
  setMeter(fill, level) { const l = Math.max(0, Math.min(1, level)); fill.setAttribute('y', -8 - 274 * l); fill.setAttribute('height', 274 * l); },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  CB: {
    breath: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<path class="ink" style="stroke-width:6" d="M-30 -14 q10 -12 20 0 t20 0 t20 0 M-30 4 q10 -12 20 0 t20 0 t20 0 M-30 22 q10 -12 20 0 t20 0 t20 0"/>'],
    stretch: ['#D6EBC8', '<circle class="skin" cx="0" cy="-22" r="10" style="stroke:var(--second);stroke-width:4"/><path class="ink" style="stroke-width:7" d="M0 -10 V14 M0 14 L-12 34 M0 14 L12 34 M0 -6 L-20 -32 M0 -6 L20 -32"/>'],
    music: ['color-mix(in srgb, var(--accent) 34%, var(--ground))', '<g transform="translate(-14 22) scale(.62)"><path class="ink" style="stroke-width:10" d="M0 0 V-70 L44 -82 V-12"/><ellipse class="metal" cx="-10" cy="2" rx="16" ry="12"/><ellipse class="metal" cx="34" cy="-10" rx="16" ry="12"/></g>'],
    shower: ['color-mix(in srgb, var(--main) 14%, white)', '<path class="metal" d="M-26 -16 Q0 -42 26 -16Z"/><rect class="metal" x="-4" y="-40" width="8" height="12" rx="3"/><path style="fill:none;stroke:var(--main);stroke-width:5;stroke-linecap:round" d="M-16 -4 v8 M-5 0 v10 M6 -2 v10 M16 -4 v8 M-10 18 v8 M2 20 v8 M12 18 v8"/>'],
    walk: ['color-mix(in srgb, var(--main) 30%, var(--ground))', '<ellipse class="stone-dk" cx="-12" cy="22" rx="20" ry="8"/><ellipse class="stone" cx="-12" cy="20" rx="19" ry="7"/><ellipse class="stone-dk" cx="12" cy="0" rx="14" ry="6"/><ellipse class="stone" cx="12" cy="-2" rx="13" ry="5"/><circle class="amber" cx="16" cy="-26" r="9"/>'],
    rest: ['color-mix(in srgb, var(--accent) 45%, var(--ground))', '<path class="chair" d="M-32 24 V-12 Q-32 -24 -20 -24 H20 Q32 -24 32 -12 V24Z" style="stroke:var(--second);stroke-width:4"/><rect class="chair-dk" x="-24" y="2" width="48" height="16" rx="6"/>'],
    recover: ['#CFE6CF', '<rect x="-18" y="-30" width="36" height="58" rx="8" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-8" y="-38" width="16" height="8" rx="3" style="fill:var(--second)"/><rect x="-11" y="-18" width="22" height="40" rx="3" style="fill:#6FAE7A"/><path d="M4 -14 L-6 4 H2 L-2 18 L8 0 H0Z" style="fill:var(--ground)"/>'],
    bed: ['color-mix(in srgb, var(--second) 22%, var(--ground))', '<path class="light" d="M-4 -30 a30 30 0 1 0 22 46 a24 24 0 1 1 -22 -46Z" style="stroke:var(--second);stroke-width:5"/><circle class="light" cx="24" cy="-22" r="4"/><circle class="light" cx="30" cy="0" r="3"/>'],
    scan: ['color-mix(in srgb, var(--accent) 22%, var(--ground))', '<circle class="skin" cx="0" cy="-24" r="10" style="stroke:var(--second);stroke-width:4"/><path class="knit" d="M-16 30 V-4 Q-16 -12 -8 -12 H8 Q16 -12 16 -4 V30Z"/><rect x="-34" y="0" width="68" height="8" rx="4" style="fill:var(--accent)"/>'],
  },
  cbadge(id, kind, r) {
    const [f, g] = R.CB[kind];
    return '<g class="' + id + '"><g transform="scale(' + ((r || 56) / 56) + ')"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:' + f + ';stroke:var(--second);stroke-width:5"/>' + g + '</g></g>';
  },
  // short red tension marks at both shoulders of a seated Ruth (her local coordinates)
  tense(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-110 -170 l12 -14 l8 14 l12 -14 M78 -184 l12 14 l8 -14 l12 14"/></g>'; },
  // the same at the shoulders of a standing Ruth (origin between her feet)
  tenseUp(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-112 -362 l12 -14 l8 14 l12 -14 M80 -376 l12 14 l8 -14 l12 14"/></g>'; },
  // breaths out of her mouth (seated local coordinates; add translate(0 -200) for a standing Ruth)
  puffs(id) { return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:6;stroke-linecap:round" d="M62 -190 q12 6 0 14 M78 -196 q16 10 0 26 M94 -202 q20 14 0 38"/></g>'; },
  nightWin(id) {
    return '<g class="' + id + '" opacity="0"><rect x="80" y="340" width="210" height="200" rx="6" style="fill:#3F4A63"/><path d="M226 380 a26 26 0 1 0 22 40 a20 20 0 1 1 -22 -40Z" style="fill:#E9E4C8"/>' +
      '<circle cx="120" cy="380" r="4" style="fill:#E9E4C8"/><circle cx="150" cy="470" r="3" style="fill:#E9E4C8"/><circle cx="110" cy="500" r="3" style="fill:#E9E4C8"/><path class="wood-lt" d="M182 340 h8 v200 h-8Z M80 436 h210 v8 h-210Z"/></g>';
  },
  scan(id) { return '<g class="' + id + '"><rect x="-150" y="-14" width="300" height="28" rx="14" style="fill:var(--accent);opacity:.25"/><rect x="-150" y="-3" width="300" height="6" rx="3" style="fill:var(--accent)"/></g>'; },
  // Ruth's face, close: a furrowed brow (id-brow) and the red marks at her temples (id-tb); a clenched jaw's marks (id-jaw); held cheeks (id-ck). Her head coordinates.
  faceBits(id) {
    return '<g class="' + id + '-brow" opacity="0"><path class="ink" style="stroke-width:5" d="M-34 -24 L-8 -18 M36 -24 L10 -18"/><path class="ink" style="stroke-width:3.5" d="M-2 -46 v12 M6 -46 v12"/></g>' +
      '<g class="' + id + '-tb" opacity="0"><path style="fill:none;stroke:#C0392B;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round" d="M-74 -44 l7 -10 l7 10 l7 -10 M54 -54 l7 10 l7 -10 l7 10"/></g>' +
      '<g class="' + id + '-jaw" opacity="0"><path style="fill:none;stroke:#C0392B;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round" d="M-70 24 l7 -10 l7 10 l7 -10 M50 14 l7 10 l7 -10 l7 10"/></g>' +
      '<g class="' + id + '-ck" opacity="0"><ellipse class="skin" cx="-26" cy="14" rx="16" ry="14"/><ellipse class="skin" cx="30" cy="14" rx="16" ry="14"/><ellipse class="skin-dk" opacity=".5" cx="-26" cy="18" rx="10" ry="6"/><ellipse class="skin-dk" opacity=".5" cx="30" cy="18" rx="10" ry="6"/></g>';
  },
  // a worry: a grey cloud with an anxious face (id-eyes, id-mouth), from session 66
  worry(id) {
    const d = 'M-86 36 C-122 36 -132 -10 -100 -28 C-110 -74 -58 -98 -26 -76 C-10 -118 56 -118 70 -74 C110 -90 140 -48 116 -16 C140 4 128 36 98 36Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 10)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--second) 40%, var(--ground))"/>' +
      '<path class="ink" style="stroke-width:5" d="M-34 -30 l20 -8 M34 -30 l-20 -8"/><g class="' + id + '-eyes"><circle class="metal" cx="-22" cy="-14" r="7"/><circle class="metal" cx="22" cy="-14" r="7"/></g>' +
      '<path class="ink ' + id + '-mouth" style="stroke-width:5" d="M-22 16 q7 -7 14 0 t14 0 t14 0"/></g>';
  },
  notes(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:8" d="M0 0 V-70 L44 -82 V-12"/><ellipse class="metal" cx="-10" cy="2" rx="16" ry="12"/><ellipse class="metal" cx="34" cy="-10" rx="16" ry="12"/></g>';
  },
  radio(id) {
    return '<g class="' + id + '"><rect x="-56" y="-40" width="112" height="70" rx="14" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground));stroke:var(--second);stroke-width:5"/><circle class="light" cx="-22" cy="-5" r="18"/><circle class="ink" style="stroke-width:4" cx="-22" cy="-5" r="18"/>' +
      '<rect class="light" x="10" y="-18" width="34" height="8" rx="4"/><rect class="light" x="10" y="0" width="34" height="8" rx="4"/><path class="ink" style="stroke-width:4" d="M30 -40 L50 -70"/></g>';
  },
  // the room's door swung open onto the light outside (fade it over the closed door)
  openDoor(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/>' +
      '<path class="hill-near" d="M820 760 C880 740 940 750 1010 736 V860 H820Z"/><circle class="amber" cx="950" cy="560" r="34"/></g>';
  },
  // Ruth in her armchair (shifted dx) with the close-up overlays in her head, tension marks and breaths, the night window, the tension meter at the right
  roomSeat(id, dx, meter) {
    const seat = R.seated(id, dx).replace('<g class="' + id + '-eyes">', R.faceBits(id) + '<g class="' + id + '-eyes">');
    return R.room({}) + R.nightWin(id + '-nw') + seat + '<g transform="translate(' + (500 + dx) + ' 742)">' + R.tense(id + '-tn') + R.puffs(id + '-pf') + '</g>' +
      (meter === false ? '' : '<g class="' + id + '-mw" transform="translate(920 860)">' + R.meter(id + '-mt') + '</g>');
  },
  look(eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31', mouthTight: 'M-8 29 L12 29', mouthO: 'M-4 26 Q2 20 8 26 Q8 36 2 36 Q-4 36 -4 26Z',
  // the order Ariel names the five helpers, and their tags
  HELP: [['breath', 'נשימה או אנחה טובה'], ['stretch', 'מתיחה או תנועה'], ['music', 'מוזיקה שאנחנו אוהבים'], ['shower', 'מקלחת'], ['walk', 'סיבוב קצר בחוץ']],
});
