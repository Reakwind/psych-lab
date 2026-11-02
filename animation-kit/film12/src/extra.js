// Session 12 additions: the friend seen from behind, round badges for what a close person can give (listen, ask, cheer, a heart in the hand)
// and for what Ruth says (helps, less, would like to try), a speech bubble that holds one badge, small busts for a thought cloud, the open door's light.
Object.assign(R, {
  // where a walker stands along the path: k is a position between stones (0 = nearest)
  onPath(k) { const P = R.PATH, i = Math.max(0, Math.min(P.length - 2, Math.floor(k))), f = k - i; return [kit.lerp(P[i][0], P[i + 1][0], f), kit.lerp(P[i][1], P[i + 1][1], f), kit.lerp(P[i][2], P[i + 1][2], f)]; },
  // Ruth facing us with her backpack from session 1 (origin between her feet); xray adds the see-through view of the weights
  packed(id, xray, pose) {
    return '<g class="' + id + '-w">' + R.packBehind(id) + '<g class="' + id + '-bd">' + R.ruth(id, pose || 'stand') + '</g>' + R.straps(id) + (xray ? R.packX(id) : '') + '</g>';
  },
  // the close friend (friend a from sessions 5 and 63), seen from behind, with her curls
  friendBack(id, step) {
    const s = R.niraBack(id, step).replace(/nira-top-dk/g, 'fra-top-dk').replace(/nira-top/g, 'fra-top').replace(/nira-hair-dk/g, 'fra-hair-dk').replace(/nira-hair/g, 'fra-hair').replace(/nira-pants/g, 'fra-pants');
    const curls = '<g class="fra-hair"><circle cx="-40" cy="-62" r="22"/><circle cx="-12" cy="-80" r="24"/><circle cx="20" cy="-78" r="22"/><circle cx="44" cy="-56" r="20"/><circle cx="-50" cy="-26" r="18"/><circle cx="50" cy="-22" r="16"/><circle cx="0" cy="-40" r="34"/></g>';
    return s.replace('<g transform="translate(0 -418)">', '<g transform="translate(0 -418)">' + curls);
  },
  // the open door with its warm light (fade it in over the closed door of R.room)
  doorOpen(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>';
  },
  // round badges (r 56, centre 0,0): ear (listen), ask (a question), cheer (a heart), helps (a tick), less (a down arrow), try (a sprout), give (a heart held out)
  badge(id, kind, r) {
    const F = { ear: 'color-mix(in srgb, var(--main) 30%, var(--ground))', ask: 'color-mix(in srgb, var(--main) 18%, var(--ground))', cheer: 'color-mix(in srgb, var(--accent) 45%, var(--ground))', helps: '#CFE6CF', less: '#F2D2CC', try: 'color-mix(in srgb, var(--accent) 30%, var(--ground))', give: 'color-mix(in srgb, var(--accent) 45%, var(--ground))', share: 'color-mix(in srgb, var(--accent) 30%, var(--ground))' };
    const G = {
      ear: '<path class="skin" d="M-6 -34 C18 -36 30 -14 26 6 C22 22 10 22 8 32 C6 44 -10 46 -16 36"/><path class="ink" style="stroke-width:6" d="M-6 -34 C18 -36 30 -14 26 6 C22 22 10 22 8 32 C6 44 -10 46 -16 36 M-4 -16 C8 -18 14 -6 8 4"/>',
      ask: '<path class="light" d="M-34 -26 H34 Q42 -26 42 -18 V14 Q42 22 34 22 H-6 L-20 36 V22 H-34 Q-42 22 -42 14 V-18 Q-42 -26 -34 -26Z" style="stroke:var(--second);stroke-width:5"/><text y="12" text-anchor="middle" style="font:700 40px var(--sans);fill:var(--second)">?</text>',
      cheer: '<path d="M0 26 C-40 2 -26 -32 0 -12 C26 -32 40 2 0 26Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:5;stroke-linejoin:round"/>',
      helps: '<path class="ink" style="stroke-width:10;stroke:#3E8E5A" d="M-24 2 L-6 20 L26 -16"/>',
      less: '<path class="ink" style="stroke-width:10;stroke:#C0392B" d="M0 -26 V22 M-18 6 L0 24 L18 6"/>',
      try: '<path class="ink" style="stroke-width:7;stroke:var(--main)" d="M0 30 V-6"/><path class="leaf" d="M0 -4 C-30 -8 -34 -30 -24 -36 C-6 -32 0 -22 0 -4Z M0 -10 C22 -16 30 -34 22 -40 C8 -36 0 -28 0 -10Z"/>',
      give: '<path d="M-44 26 C-44 10 -26 6 -10 16 L8 26 L44 8 V34 H-44Z" style="fill:color-mix(in srgb, var(--accent) 38%, var(--ground));stroke:var(--second);stroke-width:5;stroke-linejoin:round"/><path d="M0 12 C-30 -6 -20 -36 0 -18 C20 -36 30 -6 0 12Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:5;stroke-linejoin:round"/>',
      share: '<path class="light" d="M-36 -24 H36 Q44 -24 44 -16 V12 Q44 20 36 20 H-4 L-18 34 V20 H-36 Q-44 20 -44 12 V-16 Q-44 -24 -36 -24Z" style="stroke:var(--second);stroke-width:5"/><circle class="metal" cx="-16" cy="-2" r="6"/><circle class="metal" cx="2" cy="-2" r="6"/><circle class="metal" cx="20" cy="-2" r="6"/>',
    };
    return '<g class="' + id + '"><g transform="scale(' + ((r || 56) / 56) + ')"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:' + F[kind] + ';stroke:var(--second);stroke-width:5"/>' + G[kind] + '</g></g>';
  },
  // a thought cloud with a question mark (centre 0,0)
  qCloud(id) {
    const d = 'M-60 20 C-84 20 -92 -12 -70 -24 C-76 -56 -40 -72 -18 -56 C-6 -84 40 -84 50 -54 C78 -66 100 -36 82 -12 C100 0 92 24 70 24Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 8)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>' +
      '<text y="10" text-anchor="middle" style="font:700 56px var(--sans);fill:var(--second)">?</text><circle cx="-30" cy="52" r="10" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/><circle cx="-44" cy="74" r="6" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/></g>';
  },
  // a speech bubble (centre 0,0) that frames one badge; the tail points down-left, or down-right with flip
  sayBubble(id, inner, flip) {
    const d = 'M-90 -70 H90 Q116 -70 116 -44 V44 Q116 70 90 70 H-10 L-44 104 L-40 70 H-90 Q-116 70 -116 44 V-44 Q-116 -70 -90 -70Z';
    return '<g class="' + id + '"><g transform="scale(' + (flip ? -1 : 1) + ' 1)"><path class="shade" transform="translate(0 8)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/></g>' + (inner || '') + '</g>';
  },
  // a head-and-shoulders bust, look 'a' | 'b' | 'g' (centre of the head at 0,-40)
  bust(id, look) {
    const curls = look === 'a' ? '<g class="fra-hair"><circle cx="-34" cy="-80" r="18"/><circle cx="-10" cy="-96" r="20"/><circle cx="16" cy="-94" r="18"/><circle cx="36" cy="-76" r="16"/><circle cx="-44" cy="-54" r="14"/><circle cx="44" cy="-50" r="12"/></g>'
      : '<path class="fr' + look + '-hair" d="M-46 -30 C-56 -90 -20 -110 4 -108 C40 -106 56 -80 48 -30 C40 -60 20 -76 0 -76 C-20 -76 -38 -62 -46 -30Z"/>';
    return '<g class="' + id + '"><path class="fr' + look + '-top" d="M-86 80 C-86 20 -50 4 0 4 C50 4 86 20 86 80Z"/><ellipse class="nira-skin" cx="0" cy="-40" rx="40" ry="46"/>' + curls +
      '<circle class="metal" cx="-14" cy="-40" r="5"/><circle class="metal" cx="14" cy="-40" r="5"/><path class="ink" style="stroke-width:4" d="M-10 -16 Q0 -8 10 -16"/></g>';
  },
  // the friend in an armchair facing Ruth (mirrored), centred on x = cx
  friendSeat(id, cx) {
    return '<g class="' + id + '-fw"><g transform="translate(' + (2 * cx) + ' 0) scale(-1 1)"><g transform="translate(' + (cx - 516) + ' 0)">' + R.chair() + '<g transform="translate(500 742)">' + R.friend(id + 'f', 'a', 'sit') + '</g></g></g></g>';
  },
  // a low tea table with two mugs, between the two armchairs
  teaTable(id, cx) {
    return '<g class="' + id + '-tea" transform="translate(' + (cx - 540) + ' 0)"><ellipse class="shade" cx="540" cy="866" rx="70" ry="10"/><rect class="wood" x="494" y="800" width="12" height="62" rx="5"/><rect class="wood" x="574" y="800" width="12" height="62" rx="5"/><rect class="wood-lt" x="480" y="782" width="120" height="22" rx="9"/>' +
      '<g transform="translate(514 756) scale(.4)">' + R.mug(id + '-m1') + '</g><g transform="translate(568 756) scale(-.4 .4)">' + R.mug(id + '-m2') + '</g></g>';
  },
  // Ruth with her backpack and arms that can rise (id-armL, id-armR)
  packedFree(id) {
    return '<g class="' + id + '-w">' + R.packBehind(id) + '<g class="' + id + '-bd">' + R.armsFree(R.ruth(id, 'stand'), id) + '</g>' + R.straps(id) + '</g>';
  },
  // light a path stone's top: p = 0..1
  litStone(top, p) { top.style.fill = 'color-mix(in srgb, var(--accent) ' + (22 + 78 * p).toFixed(1) + '%, var(--ground))'; },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31',
});
