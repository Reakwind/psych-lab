// Session 42 additions: Ruth's day as a bar (morning on the right, night on the left) holding warm tokens (things that lift her, session 2's reward token)
// and grey blocks (things that drain or demand, session 2's effort block); plus a pot, a soft badge and a few small glyphs.
Object.assign(R, {
  // the day: a line from the sun (right) to the moon (left) at height y; id-line scales from the right, id-sun / id-moon pop
  dayBar(id, y) {
    return '<g class="' + id + '-bar"><g class="' + id + '-line"><rect class="metal" x="120" y="' + (y - 4) + '" width="850" height="8" rx="4"/></g>' +
      '<g class="' + id + '-sun" transform="translate(1010 ' + y + ')"><circle class="amber" r="34"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7].map((k) => '<rect class="amber" x="-4" y="-56" width="8" height="14" rx="4" transform="rotate(' + k * 45 + ')"/>').join('') + '</g>' +
      '<g class="' + id + '-moon" transform="translate(84 ' + y + ')"><path class="slate" d="M0 -34 a34 34 0 1 0 0 68 a44 44 0 0 1 0 -68Z"/></g></g>';
  },
  // a warm token centred on (0,0), radius 46, with a glyph; id-glow is a soft halo (opacity 0 until lit)
  warm(id, glyph) {
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="84" style="fill:var(--accent);opacity:0"/><circle class="shade" cy="7" r="46"/>' +
      '<circle r="46" style="fill:color-mix(in srgb, var(--accent) 40%, var(--ground));stroke:var(--second);stroke-width:5"/>' + R.glyph(glyph || 'dot') + '</g>';
  },
  glyph(k) {
    if (k === 'heart') return '<path class="amber-dk" d="M0 24 C-38 0 -26 -32 0 -12 C26 -32 38 0 0 24Z"/>';
    if (k === 'shoe') return '<g transform="translate(-38 14) scale(.92)">' + R.shoe(0, 0) + '</g>';
    if (k === 'yarn') return '<circle class="knit" cx="-4" cy="4" r="24"/><path style="fill:none;stroke:var(--ground);stroke-width:3;opacity:.6" d="M-26 -4 Q-4 10 18 -10 M-26 12 Q-4 26 20 6 M-14 -16 Q4 6 -6 28"/><path class="ink" style="stroke-width:4" d="M10 -24 L32 -42 M18 -18 L38 -34"/>';
    if (k === 'people') return '<circle class="skin" cx="-14" cy="-10" r="11"/><path class="knit" d="M-32 22 C-30 4 2 4 4 22Z"/><circle class="nira-skin" cx="14" cy="-8" r="11"/><path class="fra-top" d="M-4 24 C-2 6 30 6 32 24Z"/>';
    if (k === 'mug') return '<g transform="translate(-3 6) scale(.38)">' + R.mug('gl-mug') + '</g>';
    return '<circle class="amber" r="20"/>';
  },
  // a grey block (w × 70) centred on (0,0)
  grey(id, w) {
    w = w || 120;
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="-27" width="' + w + '" height="70" rx="14"/><rect class="slate-dk" x="' + (-w / 2) + '" y="-35" width="' + w + '" height="70" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="-27" width="' + (w - 16) + '" height="27" rx="8"/></g>';
  },
  // a blank slot on the day before it is sorted: a pale rounded card
  blank(id) {
    return '<g class="' + id + '"><rect class="shade" x="-44" y="-26" width="96" height="66" rx="16"/><rect x="-48" y="-33" width="96" height="66" rx="16" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/></g>';
  },
  // a cooking pot held at the hands (centre 0,0)
  pot(id) {
    return '<g class="' + id + '"><path class="ink ' + id + '-steam" style="stroke-width:6;opacity:.5" d="M-20 -62 q12 -16 0 -32 M14 -62 q12 -16 0 -32"/>' +
      '<rect class="metal" x="-96" y="-30" width="30" height="12" rx="6"/><rect class="metal" x="66" y="-30" width="30" height="12" rx="6"/>' +
      '<path class="slate" d="M-70 -40 H70 V20 Q70 50 40 50 H-40 Q-70 50 -70 20Z"/><path class="slate-dk" d="M-70 -40 H70 V-24 H-70Z"/><rect class="metal" x="-76" y="-50" width="152" height="14" rx="7"/><rect class="metal" x="-12" y="-62" width="24" height="14" rx="6"/></g>';
  },
  // a soft round badge (radius 80) holding a small picture
  badge(id, inner) {
    return '<g class="' + id + '"><circle class="shade" cy="9" r="80"/><circle r="80" style="fill:color-mix(in srgb, var(--accent) 16%, var(--ground));stroke:var(--second);stroke-width:6"/>' + inner + '</g>';
  },
  // set an SVG group's position, scale and opacity
  xf(el, x, y, s, o) { el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (s == null ? 1 : s) + ')'); if (o != null) el.style.opacity = o; },
});
