// Session 73 additions. Repeated from session 58 (film58/src/extra.js) so this film builds on its own: the "what matters" badges and the grey task blocks of Ruth's day.
// New here: Ruth's inner compass (session 2's compass token grown into an anchor), a list card with red crosses (the report card idea of session 25),
// friends seen from behind, the open door (session 70), and helpers for the path landscape.
Object.assign(R, {
  // what matters, as round badges: 0 people, 1 a hobby, 2 independence, 3 helping / taking part, 4 feeling more ourselves (the spark)
  matter(cls, k, r) {
    r = r || 70;
    const fills = ['color-mix(in srgb, var(--main) 30%, var(--ground))', 'color-mix(in srgb, var(--accent) 30%, var(--ground))', 'color-mix(in srgb, var(--main) 18%, var(--ground))', 'color-mix(in srgb, var(--accent) 45%, var(--ground))', 'color-mix(in srgb, var(--accent) 16%, white)'];
    const g = [
      '<path class="knit" d="M-44 40 C-44 12 -34 2 -18 2 C-2 2 8 12 8 40Z"/><circle class="skin" cx="-18" cy="-18" r="15"/><path class="hair" d="M-33 -20 C-33 -38 -3 -38 -3 -20 C-10 -28 -26 -28 -33 -20Z"/>' +
        '<path class="nira-top" d="M-2 40 C-2 14 8 6 22 6 C36 6 46 14 46 40Z"/><circle class="nira-skin" cx="22" cy="-12" r="14"/><path class="nira-hair" d="M8 -12 C6 -32 38 -32 36 -12 C30 -22 14 -22 8 -12Z"/>',
      '<path class="wood" d="M-30 34 L-24 40 L18 -2 L10 -10Z"/><rect class="metal" x="8" y="-22" width="16" height="22" rx="3" transform="rotate(45 16 -11)"/><path class="amber-dk" d="M22 -28 C30 -40 44 -42 44 -42 C44 -42 42 -26 30 -20Z"/><circle class="amber" cx="-26" cy="-22" r="9"/><circle class="leaf-lt" cx="-8" cy="-34" r="7"/>',
      '<circle class="ink" style="stroke-width:8" cx="-16" cy="0" r="16"/><path class="ink" style="stroke-width:8" d="M0 0 H38 M28 0 V14 M38 0 V10"/>',
      '<path class="amber-dk" d="M0 6 C-26 -10 -18 -36 0 -22 C18 -36 26 -10 0 6Z"/><path class="skin" style="stroke:var(--second);stroke-width:4;stroke-linejoin:round" d="M-4 40 C-26 40 -46 28 -48 4 C-36 14 -20 18 -4 18Z M4 40 C26 40 46 28 48 4 C36 14 20 18 4 18Z"/>',
      '<path class="amber" style="stroke:var(--second);stroke-width:4" d="M0 -40 C5 -10 10 -5 40 0 C10 5 5 10 0 40 C-5 10 -10 5 -40 0 C-10 -5 -5 -10 0 -40Z"/>'
    ][k];
    return '<g class="' + cls + '"><circle class="' + cls + '-glow amber-lt" r="' + (r * 1.5) + '" opacity="0"/><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:' + fills[k] + ';stroke:var(--second);stroke-width:5"/><g transform="scale(' + (r / 56) + ')">' + g + '</g></g>';
  },
  task(cls, w, h, dark) {
    w = w || 128; h = h || 70;
    return '<g class="' + cls + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="' + (-h / 2 + 6) + '" width="' + w + '" height="' + h + '" rx="14"/><rect class="' + (dark ? 'metal' : 'slate-dk') + '" x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 8) + '" width="' + (w - 16) + '" height="' + (h / 2 - 8) + '" rx="8"/><path d="M' + (-w / 2 + 22) + ' ' + (h / 4 + 2) + ' h' + (w * 0.45) + '" style="stroke:color-mix(in srgb, var(--ground) 30%, white);stroke-width:6;stroke-linecap:round;opacity:.55"/></g>';
  },
  heart(cls, s) { return '<g class="' + cls + '"><path class="amber-dk" transform="scale(' + (s || 1) + ')" d="M0 22 C-34 2 -22 -28 0 -12 C22 -28 34 2 0 22Z"/></g>'; },
  // Ruth's inner compass, radius r: a glow (id-glow), the dial, and a needle (id-needle) that turns about the centre, 0 = up
  compass(id, r) {
    r = r || 100;
    let ticks = '';
    for (let k = 0; k < 8; k++) ticks += '<rect class="slate" x="' + (-r * 0.03) + '" y="' + (-r * 0.8) + '" width="' + (r * 0.06) + '" height="' + (r * (k % 2 ? 0.08 : 0.14)) + '" rx="' + (r * 0.03) + '" transform="rotate(' + k * 45 + ')"/>';
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="' + (r * 1.45) + '" style="fill:var(--accent)" opacity="0"/><circle class="shade" cy="' + (r * 0.1) + '" r="' + r + '"/>' +
      '<circle r="' + r + '" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground));stroke:var(--second);stroke-width:' + (r * 0.06) + '"/><circle r="' + (r * 0.84) + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:' + (r * 0.025) + '"/>' + ticks +
      '<g class="' + id + '-needle"><path d="M0 ' + (-r * 0.7) + ' L' + (r * 0.15) + ' 0 L' + (-r * 0.15) + ' 0Z" style="fill:var(--accent);stroke:var(--second);stroke-width:' + (r * 0.025) + ';stroke-linejoin:round"/>' +
      '<path d="M0 ' + (r * 0.7) + ' L' + (r * 0.15) + ' 0 L' + (-r * 0.15) + ' 0Z" class="slate" style="stroke:var(--second);stroke-width:' + (r * 0.025) + ';stroke-linejoin:round"/></g><circle r="' + (r * 0.08) + '" class="metal"/></g>';
  },
  // the needle's angle (degrees, 0 = up) from (cx, cy) to (x, y)
  aim(cx, cy, x, y) { return Math.atan2(x - cx, cy - y) * 180 / Math.PI; },
  // a card of grades: lines with red crosses (centre 0,0)
  grades(id) {
    let s = '<g class="' + id + '"><rect class="shade" x="-122" y="-140" width="260" height="290" rx="22"/><rect x="-130" y="-150" width="260" height="290" rx="22" style="fill:color-mix(in srgb, var(--ground) 35%, white);stroke:var(--second);stroke-width:6"/>' +
      '<rect x="-130" y="-150" width="260" height="56" rx="20" style="fill:color-mix(in srgb, var(--second) 18%, var(--ground));stroke:var(--second);stroke-width:6"/>';
    for (let k = 0; k < 4; k++) s += '<path class="ink" style="stroke-width:8;opacity:.45" d="M-96 ' + (-56 + k * 50) + ' H40"/><path style="fill:none;stroke:#C0392B;stroke-width:8;stroke-linecap:round" d="M70 ' + (-68 + k * 50) + ' l24 24 M94 ' + (-68 + k * 50) + ' l-24 24"/>';
    return s + '</g>';
  },
  // a friend seen from behind (look 'a' | 'b'), with no backpack
  friendBack(id, look, step) {
    return R.ruthBack(id, step).replace(/class="knit"/g, 'class="fr' + look + '-top"').replace(/class="skirt"/g, 'class="fr' + look + '-pants"').replace(/class="hair-dk"/g, 'class="fr' + look + '-hair-dk"').replace(/class="hair"/g, 'class="fr' + look + '-hair"')
      .replace(/<g class="[^"]*-pack">.*?<\/g><\/g>$/, '</g>');
  },
  openDoor(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/>' +
      '<path class="hill-near" d="M820 760 C880 740 940 750 1010 736 V860 H820Z"/><circle class="amber" cx="950" cy="560" r="34"/></g>';
  },
  look(eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); },
  shut(eyes) { eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); },
  SMILE: 'M-10 26 Q2 32 14 26', BIG: 'M-12 24 Q2 38 16 24', FLAT: 'M-10 29 L14 29', SAD: 'M-10 31 Q2 25 14 31',
  // the three things Nira names, as badge kinds: meeting someone, a hobby, taking part; plus the spark (feeling more ourselves)
  WANT: [0, 1, 3],
  // the path landscape scaled up from the bottom centre, as in session 58
  bigLand(p, o) { return '<g transform="translate(540 1080) scale(1.4) translate(-540 -1080)">' + R.land(p, o) + '</g>'; },
  onBig(k) { const [x, y, r] = R.PATH[k]; return [540 + (x - 540) * 1.4, 1080 + (y - 1080) * 1.4, r * 1.4]; },
});
