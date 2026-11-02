// Session 32 additions. Copied from session 12 (film12/src/extra.js) so the two look alike: Ruth facing us with her backpack, the friend in an armchair
// facing Ruth, the tea table, the open door, the question cloud. New: Ruth's word cards (a stack that grows and a fan at the end), a heart and an ear badge.
Object.assign(R, {
  packed(id, pose) {
    return '<g class="' + id + '-w">' + R.packBehind(id) + '<g class="' + id + '-bd">' + R.ruth(id, pose || 'stand') + '</g>' + R.straps(id) + '</g>';
  },
  doorOpen(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>';
  },
  qCloud(id) {
    const d = 'M-60 20 C-84 20 -92 -12 -70 -24 C-76 -56 -40 -72 -18 -56 C-6 -84 40 -84 50 -54 C78 -66 100 -36 82 -12 C100 0 92 24 70 24Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 8)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>' +
      '<text y="10" text-anchor="middle" style="font:700 56px var(--sans);fill:var(--second)">?</text><circle cx="-30" cy="52" r="10" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/><circle cx="-44" cy="74" r="6" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/></g>';
  },
  friendSeat(id, cx, look) {
    return '<g class="' + id + '-fw"><g transform="translate(' + (2 * cx) + ' 0) scale(-1 1)"><g transform="translate(' + (cx - 516) + ' 0)">' + R.chair() + '<g transform="translate(500 742)"><g class="' + id + 'f-body">' + R.friend(id + 'f', look || 'a', 'sit') + '</g></g></g></g></g>';
  },
  teaTable(id, cx) {
    return '<g class="' + id + '-tea" transform="translate(' + (cx - 540) + ' 0)"><ellipse class="shade" cx="540" cy="866" rx="70" ry="10"/><rect class="wood" x="494" y="800" width="12" height="62" rx="5"/><rect class="wood" x="574" y="800" width="12" height="62" rx="5"/><rect class="wood-lt" x="480" y="782" width="120" height="22" rx="9"/></g>';
  },
  // one of Ruth's word cards (centre 0,0), a warm slip with a few written lines
  wordCard(id, rot) {
    return '<g class="' + id + '" transform="rotate(' + (rot || 0) + ')"><rect class="shade" x="-50" y="-30" width="108" height="72" rx="10"/><rect x="-54" y="-36" width="108" height="72" rx="10" style="fill:color-mix(in srgb, var(--accent) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<path class="ink" style="stroke-width:5;opacity:.5" d="M-36 -14 H36 M-36 2 H30 M-36 18 H14"/></g>';
  },
  // a stack of n word cards (bottom centre 0,0); cards id-c0.. are shown by the scene
  stack(id, n) {
    let s = '<g class="' + id + '">';
    for (let k = 0; k < n; k++) s += '<g class="' + id + '-c' + k + '" transform="translate(' + ((k % 2) * 6 - 3) + ' ' + (-k * 10) + ') rotate(' + ((k % 3) - 1) * 4 + ')">' + R.wordCard(id + '-w' + k) + '</g>';
    return s + '</g>';
  },
  showStack(st, n) { st.forEach((el, k) => { const p = Math.max(0, Math.min(1, n - k)); el.style.opacity = p; }); },
  heart(id) {
    return '<g class="' + id + '"><path d="M0 34 C-60 0 -40 -50 0 -20 C40 -50 60 0 0 34Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:6;stroke-linejoin:round"/><path class="light" opacity=".6" d="M-24 -18 q8 -8 16 0" style="fill:none;stroke:white;stroke-width:6;stroke-linecap:round"/></g>';
  },
  ear(id) {
    return '<g class="' + id + '"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:color-mix(in srgb, var(--main) 30%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      '<path class="skin" d="M-6 -34 C18 -36 30 -14 26 6 C22 22 10 22 8 32 C6 44 -10 46 -16 36"/><path class="ink" style="stroke-width:6" d="M-6 -34 C18 -36 30 -14 26 6 C22 22 10 22 8 32 C6 44 -10 46 -16 36 M-4 -16 C8 -18 14 -6 8 4"/></g>';
  },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  // a talking mouth that opens and closes
  talk(mouth, t, on) { mouth.setAttribute('d', on && Math.floor(t * 6) % 2 ? 'M-10 24 Q2 36 14 24' : R.mouthNeutral); },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31',
});
