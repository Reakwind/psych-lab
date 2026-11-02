// Session 46 additions: Ruth's day as a moving bar of grey demands with warm moments between them (the day bar, warm tokens and grey blocks
// from session 42, repeated here so this film builds on its own), task glyphs, portrait badges, a memory bubble and a magnifier (from 43).
Object.assign(R, {
  dayBar(id, y) {
    return '<g class="' + id + '-bar"><g class="' + id + '-line"><rect class="metal" x="120" y="' + (y - 4) + '" width="850" height="8" rx="4"/></g>' +
      '<g class="' + id + '-sun" transform="translate(1010 ' + y + ')"><circle class="amber" r="34"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7].map((k) => '<rect class="amber" x="-4" y="-56" width="8" height="14" rx="4" transform="rotate(' + k * 45 + ')"/>').join('') + '</g>' +
      '<g class="' + id + '-moon" transform="translate(84 ' + y + ')"><path class="slate" d="M0 -34 a34 34 0 1 0 0 68 a44 44 0 0 1 0 -68Z"/></g></g>';
  },
  warm(id, glyph) {
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="84" style="fill:var(--accent);opacity:0"/><circle class="shade" cy="7" r="46"/>' +
      '<circle r="46" style="fill:color-mix(in srgb, var(--accent) 40%, var(--ground));stroke:var(--second);stroke-width:5"/>' + (glyph === 'heart' ? '<path class="amber-dk" d="M0 24 C-38 0 -26 -32 0 -12 C26 -32 38 0 0 24Z"/>' : '<circle class="amber" r="20"/>') + '</g>';
  },
  grey(id, w) {
    w = w || 120;
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="-27" width="' + w + '" height="70" rx="14"/><rect class="slate-dk" x="' + (-w / 2) + '" y="-35" width="' + w + '" height="70" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="-27" width="' + (w - 16) + '" height="27" rx="8"/></g>';
  },
  // a grey block with a light glyph on it: 'cal' (plans), 'list' (tasks), 'alert' (things to take care of)
  task(id, glyph) {
    const L = 'fill:none;stroke:color-mix(in srgb, var(--ground) 30%, white);stroke-linecap:round;stroke-linejoin:round';
    const g = {
      cal: '<rect x="-24" y="-20" width="48" height="40" rx="6" style="' + L + ';stroke-width:5"/><path style="' + L + ';stroke-width:5" d="M-24 -8 H24 M-12 -26 V-14 M12 -26 V-14"/><path style="' + L + ';stroke-width:6" d="M-12 4 h2 M0 4 h2 M12 4 h2 M-12 12 h2 M0 12 h2"/>',
      list: '<path style="' + L + ';stroke-width:5" d="M-26 -14 l5 5 l9 -10 M-26 6 l5 5 l9 -10 M-4 -12 H26 M-4 8 H26"/>',
      alert: '<path style="' + L + ';stroke-width:9" d="M0 -22 V4"/><circle cx="0" cy="18" r="6" style="fill:color-mix(in srgb, var(--ground) 30%, white)"/>',
    }[glyph] || '';
    return '<g class="' + id + '">' + R.grey(id + '-b', 120) + g + '</g>';
  },
  badge(id, inner) {
    return '<g class="' + id + '"><circle class="shade" cy="9" r="95"/><circle r="95" style="fill:color-mix(in srgb, var(--accent) 18%, var(--ground));stroke:var(--second);stroke-width:6"/>' +
      '<clipPath id="' + id + '-c"><circle r="89"/></clipPath><g clip-path="url(#' + id + '-c)">' + inner + '</g></g>';
  },
  // a head-and-shoulders portrait for a badge: a figure scaled so its head sits near (x, -20)
  bust(fig, x, s) { s = s || 0.5; return '<g transform="translate(' + (x || 0) + ' ' + (418 * s - 4) + ') scale(' + s + ')">' + fig + '</g>'; },
  heartMark(x, y, k) { k = k || 1; return '<path class="amber-dk" transform="translate(' + x + ' ' + y + ') scale(' + k + ')" d="M0 24 C-38 0 -26 -32 0 -12 C26 -32 38 0 0 24Z" style="stroke:var(--second);stroke-width:3"/>'; },
  // a friend of Ruth's from session 45: Ariel's figure with grey hair and a terracotta shirt
  pal(id, pose) { return R.ariel(id, pose || 'stand').replace(/ariel-top-dk/g, 'pal-top-dk').replace(/ariel-top/g, 'pal-top').replace(/ariel-hair/g, 'pal-hair').replace(/ariel-pants/g, 'pal-pants'); },
  xf(el, x, y, s, o) { el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (s == null ? 1 : s) + ')'); if (o != null) el.style.opacity = o; },
  memory(id, inner) {
    const d = 'M-130 90 C-190 90 -200 20 -150 4 C-176 -60 -110 -110 -56 -84 C-34 -136 46 -136 70 -90 C120 -120 190 -80 168 -16 C210 4 200 90 140 90Z';
    return '<g class="' + id + '"><circle class="light" cx="-150" cy="140" r="14"/><circle class="light" cx="-186" cy="182" r="9"/><path class="shade" transform="translate(0 10)" d="' + d + '"/>' +
      '<path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><g class="' + id + '-in">' + (inner || '') + '</g></g>';
  },
  lens(id) {
    return '<g class="' + id + '"><circle r="70" style="fill:white;opacity:.25"/><circle r="70" style="fill:none;stroke:var(--second);stroke-width:12"/><path class="ink" style="stroke-width:22" d="M50 50 L110 110"/></g>';
  },
  qmark(id) {
    return '<g class="' + id + '"><circle class="shade" cy="5" r="40"/><circle r="40" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><text y="18" text-anchor="middle" style="font:700 52px var(--sans);fill:var(--second)">?</text></g>';
  },

  // the moving day: items on the bar (y), most grey, some warm; morning on the right, so the day slides to the left
  DAYK: ['g', 'g', 'w', 'g', 'g', 'w', 'g', 'g', 'g', 'w', 'g', 'g'], GAP: 170,
  dayItems(id) {
    return '<clipPath id="' + id + '-dc"><rect x="130" y="100" width="830" height="240"/></clipPath><g clip-path="url(#' + id + '-dc)">' +
      R.DAYK.map((k, i) => '<g class="' + id + '-i' + i + '">' + (k === 'w' ? R.warm(id + '-w' + i) : R.task(id + '-g' + i, ['cal', 'list', 'alert'][i % 3])) + '</g>').join('') + '</g>';
  },
  dayX(i, off) { const span = R.DAYK.length * R.GAP; return 1120 - (((off + i * R.GAP) % span) + span) % span; },
  // the scroll offset at which a warm item first sits exactly at x, after off0
  dayStop(off0, x) {
    for (let o = Math.ceil(off0); o < off0 + R.DAYK.length * R.GAP; o++) for (let i = 0; i < R.DAYK.length; i++) if (R.DAYK[i] === 'w' && Math.abs(R.dayX(i, o) - x) < 0.5) return [o, i];
    return [off0, 0];
  },
  placeDay(els, y, off, skip) { els.forEach((el, i) => { const x = R.dayX(i, off); el.style.opacity = Math.max(0, Math.min(1, (x - 150) / 70, (950 - x) / 70)); if (i !== skip) el.setAttribute('transform', 'translate(' + x + ' ' + y + ')'); }); },
});
