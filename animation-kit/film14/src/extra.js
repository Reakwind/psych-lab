// Session 14 additions: helpers for the tension meter from session 3b, round badges for what stress touches (breath, muscles, sleep, mood, energy),
// for the four calming tools (breathing and relaxation, grounding, mindfulness, guided imagery) and for their uses (focus, rest, recover, sleep),
// tension marks, the room's window at night, a cardigan pocket, a head-and-body loop of arrows, and Ariel's phone.
Object.assign(R, {
  setMeter(fill, level) { const l = Math.max(0, Math.min(1, level)); fill.setAttribute('y', -8 - 274 * l); fill.setAttribute('height', 274 * l); },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  CB: {
    breath: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<path class="ink" style="stroke-width:6" d="M-30 -14 q10 -12 20 0 t20 0 t20 0 M-30 4 q10 -12 20 0 t20 0 t20 0 M-30 22 q10 -12 20 0 t20 0 t20 0"/>'],
    muscle: ['#F2D2CC', '<path class="skin" d="M-34 24 C-34 6 -26 -6 -14 -10 L-8 -30 C-6 -38 8 -38 10 -30 L12 -14 C24 -20 36 -10 34 6 C32 22 14 28 -2 28Z"/><path class="ink" style="stroke-width:5" d="M-34 24 C-34 6 -26 -6 -14 -10 L-8 -30 C-6 -38 8 -38 10 -30 L12 -14 C24 -20 36 -10 34 6 C32 22 14 28 -2 28 Z"/><path class="ink" style="stroke-width:4;stroke:#C0392B" d="M-30 -30 l6 6 l-6 6 M38 -34 l-6 6 l6 6"/>'],
    sleep: ['color-mix(in srgb, var(--second) 22%, var(--ground))', '<path class="light" d="M10 -30 a30 30 0 1 0 22 46 a24 24 0 1 1 -22 -46Z" style="stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke-width:5" d="M14 -26 h14 l-14 14 h14"/>'],
    mood: ['color-mix(in srgb, var(--accent) 30%, var(--ground))', '<circle class="amber" cx="10" cy="-10" r="20"/><path d="M-36 22 C-50 22 -50 2 -34 0 C-34 -16 -12 -22 -4 -10 C6 -20 26 -14 24 2 C38 2 38 22 24 22Z" style="fill:color-mix(in srgb, var(--second) 30%, var(--ground));stroke:var(--second);stroke-width:5"/>'],
    energy: ['#CFE6CF', '<rect x="-18" y="-30" width="36" height="58" rx="8" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-8" y="-38" width="16" height="8" rx="3" style="fill:var(--second)"/><rect x="-11" y="10" width="22" height="12" rx="3" style="fill:#D96C6C"/>'],
    relax: ['color-mix(in srgb, var(--main) 18%, var(--ground))', '<path class="ink" style="stroke-width:6" d="M-30 -10 q10 -12 20 0 t20 0 t20 0 M-30 10 q10 -12 20 0 t20 0 t20 0"/><path class="leaf" d="M14 -36 C28 -40 34 -30 30 -22 C22 -22 16 -28 14 -36Z"/>'],
    ground: ['color-mix(in srgb, var(--main) 30%, var(--ground))', '<path class="ink" style="stroke-width:6;stroke:color-mix(in srgb, var(--accent) 50%, var(--second))" d="M0 -32 V2 M0 2 C-6 14 -22 16 -28 28 M0 2 C6 14 22 16 28 28 M0 2 V32"/><path class="leaf" d="M0 -30 C-18 -34 -22 -46 -16 -50 C-4 -48 0 -40 0 -30Z M0 -30 C16 -36 22 -48 16 -52 C4 -48 0 -40 0 -30Z"/>'],
    mindful: ['color-mix(in srgb, var(--accent) 30%, var(--ground))', '<circle r="30" style="fill:var(--accent);opacity:.25"/><circle r="30" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:8 7"/><circle class="metal" r="9"/>'],
    imagery: ['#E3D7F3', '<path class="hill-near" d="M-40 26 C-20 0 0 8 10 14 C20 4 30 6 40 20 V30 H-40Z"/><circle class="amber" cx="16" cy="-14" r="11"/><path d="M-36 -2 C-48 -2 -48 -18 -34 -20 C-34 -32 -16 -36 -10 -26 C-2 -32 10 -28 8 -18 C18 -18 18 -2 8 -2Z" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>'],
    focus: ['color-mix(in srgb, var(--accent) 30%, var(--ground))', '<circle r="30" style="fill:none;stroke:var(--second);stroke-width:5"/><circle r="17" style="fill:none;stroke:var(--second);stroke-width:5"/><circle class="amber" r="7"/>'],
    rest: ['color-mix(in srgb, var(--accent) 45%, var(--ground))', '<path class="chair" d="M-32 24 V-12 Q-32 -24 -20 -24 H20 Q32 -24 32 -12 V24Z" style="stroke:var(--second);stroke-width:4"/><rect class="chair-dk" x="-24" y="2" width="48" height="16" rx="6"/>'],
    recover: ['#CFE6CF', '<rect x="-18" y="-30" width="36" height="58" rx="8" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-8" y="-38" width="16" height="8" rx="3" style="fill:var(--second)"/><rect x="-11" y="-18" width="22" height="40" rx="3" style="fill:#6FAE7A"/><path d="M4 -14 L-6 4 H2 L-2 18 L8 0 H0Z" style="fill:var(--ground)"/>'],
    bed: ['color-mix(in srgb, var(--second) 22%, var(--ground))', '<path class="light" d="M-4 -30 a30 30 0 1 0 22 46 a24 24 0 1 1 -22 -46Z" style="stroke:var(--second);stroke-width:5"/><circle class="light" cx="24" cy="-22" r="4"/><circle class="light" cx="30" cy="0" r="3"/>'],
  },
  cbadge(id, kind, r) {
    const [f, g] = R.CB[kind];
    return '<g class="' + id + '"><g transform="scale(' + ((r || 56) / 56) + ')"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:' + f + ';stroke:var(--second);stroke-width:5"/>' + g + '</g></g>';
  },
  CALM: ['relax', 'ground', 'mindful', 'imagery'],
  // short red tension marks at both shoulders of a seated Ruth (her local coordinates)
  tense(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-110 -170 l12 -14 l8 14 l12 -14 M78 -184 l12 14 l8 -14 l12 14"/></g>'; },
  // quick short breaths at her mouth (her local coordinates)
  puffs(id) { return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:6;stroke-linecap:round" d="M62 -190 q12 6 0 14 M78 -196 q16 10 0 26 M94 -202 q20 14 0 38"/></g>'; },
  // the room's window at night: a dark pane, moon and stars over the glass (fade it in)
  nightWin(id) {
    return '<g class="' + id + '" opacity="0"><rect x="80" y="340" width="210" height="200" rx="6" style="fill:#3F4A63"/><path d="M226 380 a26 26 0 1 0 22 40 a20 20 0 1 1 -22 -40Z" style="fill:#E9E4C8"/>' +
      '<circle cx="120" cy="380" r="4" style="fill:#E9E4C8"/><circle cx="150" cy="470" r="3" style="fill:#E9E4C8"/><circle cx="110" cy="500" r="3" style="fill:#E9E4C8"/><path class="wood-lt" d="M182 340 h8 v200 h-8Z M80 436 h210 v8 h-210Z"/></g>';
  },
  // a pocket on Ruth's cardigan (her standing local coordinates)
  pocket(id) { return '<g class="' + id + '"><path class="knit-dk" d="M-62 -268 h40 v30 q-20 10 -40 0Z"/><path class="ink" style="stroke-width:3;opacity:.5" d="M-62 -268 h40"/></g>'; },
  // two arrows that chase each other in a loop beside the body (centre 0,0), for head and body affecting each other
  loop(id) {
    return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round" d="M-20 -90 C40 -90 60 -40 60 0"/><path style="fill:var(--main)" d="M44 -6 L60 22 L76 -6Z"/>' +
      '<path style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round" d="M20 90 C-40 90 -60 40 -60 0"/><path style="fill:var(--main)" d="M-76 6 L-60 -22 L-44 6Z"/></g>';
  },
  // a horizontal scan line with a soft glow (fade and move it)
  scan(id) { return '<g class="' + id + '"><rect x="-150" y="-14" width="300" height="28" rx="14" style="fill:var(--accent);opacity:.25"/><rect x="-150" y="-3" width="300" height="6" rx="3" style="fill:var(--accent)"/></g>'; },
  // Ruth's room with her in the armchair (shifted dx), tension marks and quick breaths in her own coordinates, the window's night pane, and the tension meter at the right
  roomSeat(id, dx, meter) {
    return R.room({}) + R.nightWin(id + '-nw') + R.seated(id, dx) + '<g transform="translate(' + (500 + dx) + ' 742)">' + R.tense(id + '-tn') + R.puffs(id + '-pf') + '</g>' +
      (meter === false ? '' : '<g class="' + id + '-mw" transform="translate(920 860)">' + R.meter(id + '-mt') + '</g>');
  },
  // the four calm badges sitting on the path's stones 1..4: centre and scale for badge k
  onStone(k) { const [x, y, r] = R.PATH[k + 1]; return [x, y - r * 0.62, 0.86 * r / 104]; },
  // where a walker stands along the path: k is a position between stones (0 = nearest)
  onPath(k) { const P = R.PATH, i = Math.max(0, Math.min(P.length - 2, Math.floor(k))), f = k - i; return [kit.lerp(P[i][0], P[i + 1][0], f), kit.lerp(P[i][1], P[i + 1][1], f), kit.lerp(P[i][2], P[i + 1][2], f)]; },
  // Ruth standing with her backpack (front view) and a pocket on her cardigan
  packed(id, pose) { return '<g class="' + id + '-w">' + R.packBehind(id) + '<g class="' + id + '-bd">' + R.ruth(id, pose || 'stand') + R.pocket(id + '-pk') + '</g>' + R.straps(id) + '</g>'; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31', mouthYawn: 'M-8 22 Q2 16 12 22 Q12 40 2 40 Q-8 40 -8 22Z',
});
