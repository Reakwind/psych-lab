// Session 10 additions: a thought balloon on a string, the room's door opening, Ruth adrift inside a thought.
Object.assign(R, {
  // a sagging dashed string from (x1,y1) to (x2,y2), as a path d
  strD(x1, y1, x2, y2) { return 'M' + x1 + ' ' + y1 + ' Q' + ((x1 + x2) / 2 + 30) + ' ' + (Math.max(y1, y2) + 40) + ' ' + x2 + ' ' + y2; },
  string(id) { return '<path class="' + id + '" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.55"/>'; },
  // the open door with its warm light (fade it in over the closed door of R.room)
  doorOpen(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>';
  },
  // set a balloon group: centre, scale, opacity
  setBal(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s) + ')'); if (o != null) g.style.opacity = o; },
  // the soft edges of a cloud seen from inside it
  puffs() {
    let o = '';
    for (let k = -1; k <= 8; k++) { const v = k * 140 + 30; [[v, -30], [v, 1110], [-30, v], [1110, v]].forEach(([x, y]) => { o += '<circle cx="' + x + '" cy="' + y + '" r="110"/>'; }); }
    return '<g style="fill:color-mix(in srgb, var(--second) 9%, var(--ground))">' + o + '</g>';
  },
  // Ruth adrift inside a thought: standing figure, origin at her feet
  adrift(id) { return '<g class="' + id + '-drift">' + R.ruth(id, 'stand') + '</g>'; },
});
