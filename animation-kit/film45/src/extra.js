// Session 45 additions: a second friend of Ruth's (a grey-haired man), a small rain cloud for "struggling", sentence cards drawn with lines,
// a memory bubble (from session 43), mini rooms for the "not alone" pull-back, and the 5% bar.
Object.assign(R, {
  xf(el, x, y, s, o) { el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (s == null ? 1 : s) + ')'); if (o != null) el.style.opacity = o; },
  // a friend of Ruth's: Ariel's figure with grey hair and beard and a terracotta shirt (parts: id-head, id-eyes, id-mouth)
  pal(id, pose) {
    return R.ariel(id, pose || 'stand').replace(/ariel-top-dk/g, 'pal-top-dk').replace(/ariel-top/g, 'pal-top').replace(/ariel-hair/g, 'pal-hair').replace(/ariel-pants/g, 'pal-pants');
  },
  // a small rain cloud centred on (0,0), about 200 wide; id-drops fall (animate their dash offset)
  rain(id) {
    const d = 'M-80 20 C-112 20 -112 -28 -76 -30 C-76 -72 -14 -86 6 -52 C30 -80 92 -64 86 -24 C116 -20 114 20 84 20Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 8)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--second) 30%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      '<path class="' + id + '-drops" style="fill:none;stroke:#5B8DB8;stroke-width:7;stroke-linecap:round;stroke-dasharray:14 26" d="M-50 36 L-60 96 M-6 36 L-16 96 M38 36 L28 96"/></g>';
  },
  // a sentence card drawn with lines instead of words (the practice's guiding sentences are not in the script); id-warm cross-fades in
  lineCard(id) {
    const card = (fill) => '<rect x="-150" y="-52" width="300" height="104" rx="26" style="fill:' + fill + ';stroke:var(--second);stroke-width:5"/>' +
      '<path class="ink" style="stroke-width:12;opacity:.45" d="M110 -14 H-110 M110 18 H-50"/>';
    return '<g class="' + id + '"><rect class="shade" x="-144" y="-40" width="300" height="104" rx="26"/>' + card('color-mix(in srgb, var(--ground) 40%, white)') +
      '<g class="' + id + '-warm" style="opacity:0">' + card('color-mix(in srgb, var(--accent) 34%, var(--ground))') + '</g></g>';
  },
  // a memory: a thought cloud (centre 0,0, about 340 × 250) with a trail of dots toward the lower right
  memory(id, inner) {
    const d = 'M-130 90 C-190 90 -200 20 -150 4 C-176 -60 -110 -110 -56 -84 C-34 -136 46 -136 70 -90 C120 -120 190 -80 168 -16 C210 4 200 90 140 90Z';
    return '<g class="' + id + '"><circle class="light" cx="150" cy="140" r="14"/><circle class="light" cx="186" cy="182" r="9"/><path class="shade" transform="translate(0 10)" d="' + d + '"/>' +
      '<path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><g class="' + id + '-in">' + (inner || '') + '</g></g>';
  },
  // a small room seen through a window (centre 0,0, 300 × 300): wall, floor and one figure under a little rain cloud
  tile(id, fig) {
    return '<g class="' + id + '"><rect class="shade" x="-142" y="-136" width="300" height="300" rx="28"/><rect x="-150" y="-150" width="300" height="300" rx="28" style="fill:color-mix(in srgb, var(--ground) 92%, var(--second));stroke:var(--second);stroke-width:6"/>' +
      '<rect class="floor" x="-144" y="70" width="288" height="74" rx="4"/><clipPath id="' + id + '-c"><rect x="-144" y="-144" width="288" height="288" rx="22"/></clipPath>' +
      '<g clip-path="url(#' + id + '-c)"><g transform="translate(0 128) scale(.42)">' + fig + '</g><g transform="translate(46 -86) scale(.42)">' + R.rain(id + '-r') + '</g></g></g>';
  },
  // where Ruth stands along her path: k is a position between stones (0 = nearest); returns [x, y, stone radius]
  onPath(k) { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i, l = (a, b) => a + (b - a) * f; return [l(P[i][0], P[i + 1][0]), l(P[i][1], P[i + 1][1]), l(P[i][2], P[i + 1][2])]; },
});
