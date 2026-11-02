// Session 44 additions: Ruth's balcony over her path, a muscle, a clipboard, a notebook, and the picture glyphs for the good things Ariel names.
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
    if (k === 'mug') return '<g transform="translate(-3 6) scale(.38)">' + R.mug('gl-mug') + '</g>';
    if (k === 'note') return '<g transform="translate(-14 2) scale(.8)"><path class="ink" style="stroke-width:6" d="M10 20 V-30 L40 -40 V8"/><ellipse class="metal" cx="0" cy="22" rx="13" ry="10"/><ellipse class="metal" cx="30" cy="10" rx="13" ry="10"/></g>';
    if (k === 'people') return '<circle class="skin" cx="-14" cy="-10" r="11"/><path class="knit" d="M-32 22 C-30 4 2 4 4 22Z"/><circle class="nira-skin" cx="14" cy="-8" r="11"/><path class="fra-top" d="M-4 24 C-2 6 30 6 32 24Z"/>';
    return '<circle class="amber" r="20"/>';
  },
  grey(id, w) {
    w = w || 120;
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="-27" width="' + w + '" height="70" rx="14"/><rect class="slate-dk" x="' + (-w / 2) + '" y="-35" width="' + w + '" height="70" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="-27" width="' + (w - 16) + '" height="27" rx="8"/></g>';
  },
  badge(id, inner) {
    return '<g class="' + id + '"><circle class="shade" cy="9" r="80"/><circle r="80" style="fill:color-mix(in srgb, var(--accent) 16%, var(--ground));stroke:var(--second);stroke-width:6"/>' + inner + '</g>';
  },
  xf(el, x, y, s, o) { el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (s == null ? 1 : s) + ')'); if (o != null) el.style.opacity = o; },

  // Ruth's balcony: her path and hills beyond a wooden rail, a plank floor, a small table with her morning coffee (mug group: id-mug)
  balcony(id) {
    // the hills beyond the rail, without the stepping stones (the rail stands where they would be)
    let s = R.land(id, { sun: true, sunX: 940, sunY: 470 }).replace(/<g class="[^"]*-st\d+">.*?<\/g>/g, '') + '<rect class="wood-lt" x="0" y="840" width="1080" height="240"/>';
    for (let k = 0; k < 6; k++) s += '<rect class="wood" opacity=".35" x="0" y="' + (870 + k * 36) + '" width="1080" height="4"/>';
    s += '<rect class="wood" x="0" y="620" width="1080" height="20" rx="6"/>';
    for (let x = 30; x < 1080; x += 64) s += '<rect class="wood" x="' + x + '" y="640" width="14" height="200"/>';
    s += '<rect class="wood" x="0" y="830" width="1080" height="16"/>';
    return s;
  },
  table(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="146" rx="80" ry="10"/><rect class="wood" x="-8" y="0" width="16" height="146"/><rect class="wood" x="-50" y="136" width="100" height="12" rx="6"/>' +
      '<ellipse class="wood-lt" cx="0" cy="0" rx="90" ry="20"/><ellipse class="wood" cx="0" cy="6" rx="90" ry="16" opacity=".4"/><g class="' + id + '-mug" transform="translate(0 -40) scale(.6)">' + R.mug(id + '-m') + '</g></g>';
  },
  // an arm flexing, in Ruth's knit sleeve (origin = shoulder); id-bi is the bicep (scale it), id-fore rotates at the elbow
  arm(id) {
    return '<g class="' + id + '"><path class="knit" d="M0 -40 C-60 -44 -170 -40 -190 -10 C-200 20 -170 44 -120 44 C-60 44 -10 40 0 40Z"/>' +
      '<g class="' + id + '-bi" transform="translate(-100 -30)"><ellipse class="knit-dk" cx="0" cy="0" rx="70" ry="46" opacity=".55"/><ellipse class="knit" cx="0" cy="-6" rx="64" ry="40"/></g>' +
      '<g class="' + id + '-fore" transform="translate(-170 10)"><path class="knit" d="M-30 -10 C-40 -80 -40 -150 -30 -190 L20 -190 C26 -150 30 -80 30 10Z"/><ellipse class="skin" cx="-4" cy="-212" rx="44" ry="40"/><path class="skin-dk" opacity=".6" d="M-36 -224 h60 v8 h-60Z M-36 -206 h60 v8 h-60Z"/></g></g>';
  },
  // a clipboard with a few list lines
  clipboard(id) {
    let s = '<g class="' + id + '"><rect class="shade" x="-150" y="-180" width="310" height="390" rx="26"/><rect class="wood" x="-160" y="-190" width="310" height="390" rx="26"/>' +
      '<rect x="-130" y="-150" width="250" height="320" rx="12" style="fill:color-mix(in srgb, var(--ground) 40%, white)"/><rect class="metal" x="-60" y="-210" width="110" height="44" rx="14"/>';
    for (let k = 0; k < 5; k++) s += '<rect class="slate" opacity=".5" x="-100" y="' + (-110 + k * 54) + '" width="' + (190 - (k % 2) * 50) + '" height="14" rx="7"/>';
    return s + '</g>';
  },
  // the pictures for Ariel's examples (badge contents)
  PIC: {
    crossword: [0, 1, 2].map((i) => [0, 1, 2].map((j) => '<rect x="' + (-42 + i * 28) + '" y="' + (-42 + j * 28) + '" width="28" height="28" style="fill:' + ((i * 3 + j) % 4 === 1 ? 'var(--second)' : 'color-mix(in srgb, var(--ground) 30%, white)') + ';stroke:var(--second);stroke-width:3"/>').join('')).join(''),
    book: '<path d="M0 -30 C-20 -44 -48 -44 -60 -36 V34 C-48 26 -20 26 0 40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:4"/><path d="M0 -30 C20 -44 48 -44 60 -36 V34 C48 26 20 26 0 40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:4"/><path class="ink" style="stroke-width:3;opacity:.4" d="M-48 -18 H-12 M-48 -4 H-12 M-48 10 H-16 M12 -18 H48 M12 -4 H48 M12 10 H44"/>',
    dog: '<ellipse class="amber-dk" cx="10" cy="14" rx="44" ry="24"/><circle class="amber-dk" cx="-34" cy="-14" r="22"/><path class="slate-dk" d="M-48 -30 C-62 -28 -64 -6 -54 0 L-46 -20Z"/><circle class="metal" cx="-40" cy="-18" r="4"/><circle class="metal" cx="-56" cy="-10" r="5"/>' +
      '<path class="ink" style="stroke-width:8;stroke:color-mix(in srgb, var(--accent) 75%, var(--second))" d="M52 6 q18 -10 20 -28 M-20 34 v14 M36 34 v14"/>',
    nature: '<path class="leaf" d="M-50 30 L-14 -40 L22 30Z"/><path class="leaf-lt" d="M-6 30 L28 -26 L62 30Z"/><rect class="wood" x="-18" y="30" width="8" height="12"/><rect class="wood" x="24" y="30" width="8" height="12"/><circle class="amber" cx="40" cy="-40" r="12"/>',
    yarn: '<circle class="knit" cx="-4" cy="4" r="34"/><path style="fill:none;stroke:var(--ground);stroke-width:4;opacity:.6" d="M-36 -6 Q-4 14 26 -14 M-36 16 Q-4 36 28 8 M-20 -24 Q6 8 -8 38"/><path class="ink" style="stroke-width:5" d="M14 -34 L44 -58 M24 -26 L52 -48"/>',
  },
});
