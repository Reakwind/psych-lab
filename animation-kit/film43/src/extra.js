// Session 43 additions: the birds and their tree beside Ruth's path, a rustling bush, the radar, a memory bubble and a magnifier.
// The day bar, warm tokens and grey blocks are the ones from session 42 (film42/src/extra.js), repeated here so this film builds on its own.
Object.assign(R, {
  dayBar(id, y) {
    return '<g class="' + id + '-bar"><g class="' + id + '-line"><rect class="metal" x="120" y="' + (y - 4) + '" width="850" height="8" rx="4"/></g>' +
      '<g class="' + id + '-sun" transform="translate(1010 ' + y + ')"><circle class="amber" r="34"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7].map((k) => '<rect class="amber" x="-4" y="-56" width="8" height="14" rx="4" transform="rotate(' + k * 45 + ')"/>').join('') + '</g>' +
      '<g class="' + id + '-moon" transform="translate(84 ' + y + ')"><path class="slate" d="M0 -34 a34 34 0 1 0 0 68 a44 44 0 0 1 0 -68Z"/></g></g>';
  },
  warm(id, glyph) {
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="84" style="fill:var(--accent);opacity:0"/><circle class="shade" cy="7" r="46"/>' +
      '<circle r="46" style="fill:color-mix(in srgb, var(--accent) 40%, var(--ground));stroke:var(--second);stroke-width:5"/>' + R.glyph(glyph || 'dot') + '</g>';
  },
  glyph(k) {
    if (k === 'heart') return '<path class="amber-dk" d="M0 24 C-38 0 -26 -32 0 -12 C26 -32 38 0 0 24Z"/>';
    if (k === 'mug') return '<g transform="translate(-3 6) scale(.38)">' + R.mug('gl-mug') + '</g>';
    return '<circle class="amber" r="20"/>';
  },
  grey(id, w) {
    w = w || 120;
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="-27" width="' + w + '" height="70" rx="14"/><rect class="slate-dk" x="' + (-w / 2) + '" y="-35" width="' + w + '" height="70" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="-27" width="' + (w - 16) + '" height="27" rx="8"/></g>';
  },
  badge(id, inner) {
    return '<g class="' + id + '"><circle class="shade" cy="9" r="80"/><circle class="' + id + '-disc" r="80" style="fill:color-mix(in srgb, var(--accent) 16%, var(--ground));stroke:var(--second);stroke-width:6"/>' + inner + '</g>';
  },
  xf(el, x, y, s, o) { el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (s == null ? 1 : s) + ')'); if (o != null) el.style.opacity = o; },

  // the tree beside the path: trunk at x, canopy around (x, 360); perches: R.PERCH
  tree(id, x) {
    x = x || 760;
    return '<g class="' + id + '-tree"><ellipse class="shade" cx="' + x + '" cy="980" rx="140" ry="16"/>' +
      '<path class="wood" d="M' + (x - 26) + ' 980 C' + (x - 20) + ' 820 ' + (x - 30) + ' 700 ' + (x - 18) + ' 520 H' + (x + 18) + ' C' + (x + 30) + ' 700 ' + (x + 20) + ' 820 ' + (x + 26) + ' 980Z"/>' +
      '<path class="wood" d="M' + (x - 10) + ' 650 C' + (x - 70) + ' 630 ' + (x - 130) + ' 620 ' + (x - 190) + ' 590 L' + (x - 184) + ' 576 C' + (x - 120) + ' 600 ' + (x - 60) + ' 610 ' + (x - 6) + ' 624Z"/>' +
      '<path class="wood" d="M' + (x + 10) + ' 600 C' + (x + 70) + ' 590 ' + (x + 120) + ' 570 ' + (x + 180) + ' 548 L' + (x + 176) + ' 534 C' + (x + 116) + ' 552 ' + (x + 64) + ' 568 ' + (x + 6) + ' 576Z"/>' +
      '<g class="' + id + '-crown"><circle class="leaf" cx="' + (x - 100) + '" cy="400" r="120"/><circle class="leaf" cx="' + (x + 100) + '" cy="380" r="124"/><circle class="leaf" cx="' + x + '" cy="290" r="140"/>' +
      '<circle class="leaf-lt" opacity=".55" cx="' + (x - 40) + '" cy="250" r="70"/><circle class="leaf-lt" opacity=".45" cx="' + (x + 120) + '" cy="340" r="54"/></g></g>';
  },
  PERCH: [[592, 572], [930, 530], [790, 230], [900, 270], [640, 300]],
  // a small bird facing left, centred on its body; a grey layer (id-g) and a coloured layer (id-c, opacity 0) to cross-fade
  bird(id, col) {
    const shape = (fill) => '<path d="M28 -6 L66 -20 L60 4 L30 10Z" style="fill:' + fill + ';stroke:var(--second);stroke-width:4;stroke-linejoin:round"/>' +
      '<ellipse cx="0" cy="0" rx="40" ry="28" style="fill:' + fill + ';stroke:var(--second);stroke-width:4"/><circle cx="-32" cy="-24" r="22" style="fill:' + fill + ';stroke:var(--second);stroke-width:4"/>' +
      '<path d="M8 -10 C24 -16 34 -6 36 6 C22 8 10 4 8 -10Z" style="fill:color-mix(in srgb, ' + fill + ' 70%, var(--second))"/>' +
      '<path class="amber" d="M-52 -28 L-70 -20 L-52 -16Z"/><circle class="metal" cx="-38" cy="-28" r="4"/><path class="ink" style="stroke-width:4" d="M-6 26 V40 M8 26 V40"/>';
    return '<g class="' + id + '"><g class="' + id + '-g">' + shape('color-mix(in srgb, var(--second) 30%, var(--ground))') + '</g><g class="' + id + '-c" style="opacity:0">' + shape(col) + '</g></g>';
  },
  // a bird in flight: two wings (scale the group's y to flap)
  flier(id, col) {
    return '<g class="' + id + '"><g class="' + id + '-w"><path d="M-46 0 C-30 -26 -10 -26 0 0 C10 -26 30 -26 46 0 C30 -14 10 -10 0 6 C-10 -10 -30 -14 -46 0Z" style="fill:' + (col || 'var(--second)') + ';stroke:var(--second);stroke-width:3;stroke-linejoin:round"/></g></g>';
  },
  // a musical note
  noteMark(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:6" d="M10 20 V-36 L40 -46 V8"/><ellipse class="metal" cx="0" cy="22" rx="14" ry="11"/><ellipse class="metal" cx="30" cy="10" rx="14" ry="11"/></g>';
  },
  // a bush in the foreground (centre-bottom origin); id-eyes appear inside it
  bush(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="0" rx="220" ry="20"/><g class="' + id + '-leaves"><circle class="leaf" cx="-120" cy="-80" r="100"/><circle class="leaf" cx="110" cy="-90" r="110"/><circle class="leaf" cx="0" cy="-140" r="130"/>' +
      '<circle class="leaf-lt" opacity=".5" cx="-30" cy="-190" r="56"/><circle class="leaf-lt" opacity=".4" cx="120" cy="-140" r="40"/></g>' +
      '<g class="' + id + '-eyes" style="opacity:0"><ellipse cx="-30" cy="-110" rx="14" ry="10" style="fill:#FFF3C4"/><ellipse cx="30" cy="-110" rx="14" ry="10" style="fill:#FFF3C4"/><circle class="metal" cx="-28" cy="-110" r="6"/><circle class="metal" cx="32" cy="-110" r="6"/></g></g>';
  },
  // a radar dome (centre-bottom origin, radius r); id-beam rotates about the origin
  radar(id, r) {
    return '<g class="' + id + '"><path d="M' + (-r) + ' 0 A' + r + ' ' + r + ' 0 0 1 ' + r + ' 0Z" style="fill:color-mix(in srgb, var(--main) 18%, var(--ground));stroke:var(--second);stroke-width:6"/>' +
      '<path style="fill:none;stroke:var(--second);stroke-width:3;opacity:.35" d="M' + (-r * 0.66) + ' 0 A' + (r * 0.66) + ' ' + (r * 0.66) + ' 0 0 1 ' + (r * 0.66) + ' 0 M' + (-r * 0.33) + ' 0 A' + (r * 0.33) + ' ' + (r * 0.33) + ' 0 0 1 ' + (r * 0.33) + ' 0"/>' +
      '<g class="' + id + '-beam"><path d="M0 0 L' + (r - 6) + ' 0 A' + (r - 6) + ' ' + (r - 6) + ' 0 0 0 ' + ((r - 6) * Math.cos(0.5)) + ' ' + (-(r - 6) * Math.sin(0.5)) + 'Z" style="fill:var(--main);opacity:.35"/><path d="M0 0 L' + (r - 6) + ' 0" style="stroke:var(--main);stroke-width:6"/></g>' +
      '<circle class="metal" r="10"/></g>';
  },
  // a memory: a thought cloud (centre 0,0, about 340 × 250) with a small trail of dots toward the lower right (towards Ruth)
  memory(id, inner) {
    const d = 'M-130 90 C-190 90 -200 20 -150 4 C-176 -60 -110 -110 -56 -84 C-34 -136 46 -136 70 -90 C120 -120 190 -80 168 -16 C210 4 200 90 140 90Z';
    return '<g class="' + id + '"><circle class="light" cx="150" cy="140" r="14"/><circle class="light" cx="186" cy="182" r="9"/><path class="shade" transform="translate(0 10)" d="' + d + '"/>' +
      '<path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><g class="' + id + '-in">' + (inner || '') + '</g></g>';
  },
  // the coffee in the sun: a warm mug with a little sun, the moment Ruth recalls
  coffee(id) {
    return '<g class="' + id + '"><circle class="amber" cx="70" cy="-40" r="34"/><g transform="translate(-20 20) scale(1.1)">' + R.mug(id + '-m') + '</g></g>';
  },
  lens(id) {
    return '<g class="' + id + '"><circle r="70" style="fill:white;opacity:.25"/><circle r="70" style="fill:none;stroke:var(--second);stroke-width:12"/><path class="ink" style="stroke-width:22" d="M50 50 L110 110"/></g>';
  },
  // the three places a moment shows up, as badge pictures: feeling (heart), body (a figure with a warm glow), thoughts (a cloud)
  CH: {
    heart: '<path class="amber-dk" d="M0 34 C-56 2 -40 -46 0 -18 C40 -46 56 2 0 34Z"/>',
    body: '<circle r="44" style="fill:var(--accent);opacity:.35"/><circle class="skin" cx="0" cy="-26" r="16"/><path class="knit" d="M-26 34 C-26 0 -16 -6 0 -6 C16 -6 26 0 26 34Z"/>',
    mind: '<path class="light" d="M-40 16 C-58 16 -58 -10 -40 -12 C-40 -34 -12 -40 -2 -24 C8 -40 40 -34 38 -12 C56 -10 56 16 38 16Z"/><path class="ink" style="stroke-width:5" d="M-40 16 C-58 16 -58 -10 -40 -12 C-40 -34 -12 -40 -2 -24 C8 -40 40 -34 38 -12 C56 -10 56 16 38 16Z"/>',
  },
});
