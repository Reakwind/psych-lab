// Session 58 additions: the things that matter as badges, Ruth's day as a strip of task blocks, a boulder, small step icons.
Object.assign(R, {
  // what matters, as round badges in the tool-badge style: 0 people, 1 a hobby, 2 independence, 3 helping others, 4 feeling more ourselves (the spark)
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
  // one grey task block of Ruth's day, centred on (0,0)
  task(cls, w, h) {
    w = w || 128; h = h || 70;
    return '<g class="' + cls + '"><rect class="shade" x="' + (-w / 2 + 4) + '" y="' + (-h / 2 + 6) + '" width="' + w + '" height="' + h + '" rx="14"/><rect class="slate-dk" x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="14"/>' +
      '<rect class="slate" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 8) + '" width="' + (w - 16) + '" height="' + (h / 2 - 8) + '" rx="8"/><path class="light" opacity=".55" d="M' + (-w / 2 + 22) + ' ' + (h / 4 + 2) + ' h' + (w * 0.45) + '" style="stroke:color-mix(in srgb, var(--ground) 30%, white);stroke-width:6;stroke-linecap:round"/></g>';
  },
  // a small heart, as on the matter badges
  heart(cls, s) {
    return '<g class="' + cls + '"><path class="amber-dk" transform="scale(' + (s || 1) + ')" d="M0 22 C-34 2 -22 -28 0 -12 C22 -28 34 2 0 22Z"/></g>';
  },
  // a big grey boulder, its base on (0,0)
  boulder(cls) {
    return '<g class="' + cls + '"><ellipse class="shade" cx="0" cy="6" rx="190" ry="24"/><path class="weight-dk" d="M-180 0 C-200 -120 -120 -250 10 -250 C140 -250 210 -140 182 0Z"/><path class="weight" d="M-162 -14 C-176 -120 -110 -232 6 -234 C120 -234 186 -140 162 -14Z"/><ellipse class="light" opacity=".3" cx="-60" cy="-170" rx="50" ry="18"/></g>';
  },
  // a speech bubble with a heart inside: a kind word
  kindWord(cls) {
    return '<g class="' + cls + '"><path class="shade" transform="translate(4 8)" d="M-90 -60 H90 Q110 -60 110 -40 V30 Q110 50 90 50 H-10 L-44 82 L-40 50 H-90 Q-110 50 -110 30 V-40 Q-110 -60 -90 -60Z"/>' +
      '<path d="M-90 -60 H90 Q110 -60 110 -40 V30 Q110 50 90 50 H-10 L-44 82 L-40 50 H-90 Q-110 50 -110 30 V-40 Q-110 -60 -90 -60Z" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' +
      '<path class="amber-dk" d="M0 30 C-40 6 -26 -38 0 -18 C26 -38 40 6 0 30Z"/></g>';
  },
});
// layout shared by the scenes: the day strip's block centres (morning on the right) and its height; the five badges' spots
R.M58 = { STRIP: [946, 804, 662, 520, 378, 236], SY: 200, BADGE: [[930, 200], [735, 200], [540, 200], [345, 200], [150, 200]],
  LABEL: [['קשר עם אנשים', 930, 310], ['תחביב', 735, 384], ['התנהלות עצמאית', 540, 310], ['עזרה לאחרים', 345, 384], ['להרגיש יותר אנחנו', 196, 310]] };
