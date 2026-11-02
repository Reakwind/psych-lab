// Session 25 additions: the report card the judging mind hands out, a ribbon, a trophy, a kettle corner, small icons.
Object.assign(R, {
  // the report card (HTML): one row per question, a tick box on the left of each (rtl); parts id-r0.., id-x0.. (crosses), id-stamp
  rcard(id, rows, stamp) {
    return '<div class="rcard ' + id + '"><div class="rc-head"></div>' + rows.map((r, k) => '<div class="rc-row ' + id + '-r' + k + '"><span class="t">' + r + '</span><span class="rc-box"><b class="' + id + '-x' + k + '">✗</b></span></div>').join('') +
      (stamp ? '<div class="rc-stamp ' + id + '-stamp">' + stamp + '</div>' : '') + '</div>';
  },
  // a ribbon around a rounded box (x, y, w, h) with a bow at the top middle; id-band draws on (pathLength 1)
  ribbon(id, x, y, w, h) {
    const cx = x + w / 2;
    return '<g class="' + id + '"><rect class="' + id + '-band" pathLength="1" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="70" style="fill:none;stroke:#D96C8A;stroke-width:16;stroke-linecap:round"/>' +
      '<g class="' + id + '-bow" transform="translate(' + cx + ' ' + y + ')"><path d="M0 0 C-30 -54 -96 -50 -86 -10 C-80 14 -34 10 0 0Z M0 0 C30 -54 96 -50 86 -10 C80 14 34 10 0 0Z" style="fill:#E58AA3;stroke:var(--second);stroke-width:5"/>' +
      '<path d="M-8 4 L-40 60 M8 4 L40 60" style="fill:none;stroke:#D96C8A;stroke-width:14;stroke-linecap:round"/><circle r="16" style="fill:#D96C8A;stroke:var(--second);stroke-width:5"/></g></g>';
  },
  trophy(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:12" d="M-70 -90 C-130 -90 -126 -10 -60 -6 M70 -90 C130 -90 126 -10 60 -6"/>' +
      '<path class="amber" d="M-80 -120 H80 V-60 C80 0 40 30 0 34 C-40 30 -80 0 -80 -60Z" style="stroke:var(--second);stroke-width:6"/><path class="light" opacity=".45" d="M-56 -104 h20 v50 c0 20 -8 34 -20 40Z"/>' +
      '<rect class="amber-dk" x="-14" y="30" width="28" height="44" style="stroke:var(--second);stroke-width:6"/><rect class="wood" x="-60" y="70" width="120" height="34" rx="8" style="stroke:var(--second);stroke-width:6"/></g>';
  },
  // a kitchen corner: tiled wall, a counter on the left, a kettle on it (id-steam)
  kitchen(id) {
    let s = '<rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--main) 10%, var(--ground))"/>';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) s += '<rect x="' + (20 + c * 96) + '" y="' + (330 + r * 84) + '" width="88" height="76" rx="8" style="fill:color-mix(in srgb, var(--ground) 55%, white);opacity:.7"/>';
    s += '<rect class="floor" x="0" y="900" width="1080" height="180"/><rect class="floor-dk" x="0" y="900" width="1080" height="10"/>' +
      '<rect class="shade" x="0" y="680" width="620" height="12"/><rect class="wood" x="0" y="660" width="620" height="30" rx="8"/><rect class="wood-lt" x="0" y="690" width="600" height="212"/>' +
      '<rect class="wood" opacity=".35" x="40" y="720" width="240" height="150" rx="10"/><rect class="wood" opacity=".35" x="320" y="720" width="240" height="150" rx="10"/>' +
      '<g transform="translate(320 660)"><ellipse class="shade" cx="0" cy="2" rx="110" ry="12"/><path class="metal" d="M-90 0 C-104 -110 -60 -160 0 -162 C60 -160 104 -110 90 0Z"/><path class="slate" d="M-70 -20 C-80 -100 -50 -136 -10 -140 C-50 -120 -60 -80 -50 -20Z" opacity=".5"/>' +
      '<path class="ink" style="stroke-width:12" d="M86 -100 L150 -150"/><path class="ink" style="stroke-width:10" d="M-50 -150 C-40 -210 40 -210 50 -150"/>' +
      '<g class="' + id + '-steam"><path class="ink" style="stroke-width:8;opacity:.4" d="M160 -170 q-24 -30 0 -60 q24 -30 0 -60 M196 -160 q-18 -24 0 -48 q18 -24 0 -48"/></g></g>';
    return s;
  },
  dumbbell(id) {
    return '<g class="' + id + '"><rect class="metal" x="-40" y="-8" width="80" height="16" rx="8"/><rect class="slate-dk" x="-62" y="-30" width="24" height="60" rx="8"/><rect class="slate-dk" x="38" y="-30" width="24" height="60" rx="8"/></g>';
  },
  toothbrush(id) {
    return '<g class="' + id + '" transform="rotate(-30)"><rect x="-10" y="-60" width="20" height="120" rx="10" style="fill:color-mix(in srgb, var(--main) 60%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      '<rect x="-12" y="-90" width="24" height="32" rx="4" style="fill:white;stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke-width:4" d="M-6 -86 v24 M0 -86 v24 M6 -86 v24"/></g>';
  },
  pill(id) {
    return '<g class="' + id + '"><rect x="-44" y="-20" width="88" height="40" rx="20" style="fill:var(--ground);stroke:var(--second);stroke-width:6"/><path d="M-44 0 a20 20 0 0 1 20 -20 h24 v40 h-24 a20 20 0 0 1 -20 -20Z" style="fill:#D96C6C"/></g>';
  },
  // a music note pair
  notes(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:8" d="M0 0 V-70 L44 -82 V-12"/><ellipse class="metal" cx="-10" cy="2" rx="16" ry="12"/><ellipse class="metal" cx="34" cy="-10" rx="16" ry="12"/></g>';
  },
  radio(id) {
    return '<g class="' + id + '"><rect x="-56" y="-40" width="112" height="70" rx="14" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground));stroke:var(--second);stroke-width:5"/><circle class="light" cx="-22" cy="-5" r="18"/><circle class="ink" style="stroke-width:4" cx="-22" cy="-5" r="18"/>' +
      '<rect class="light" x="10" y="-18" width="34" height="8" rx="4"/><rect class="light" x="10" y="0" width="34" height="8" rx="4"/><path class="ink" style="stroke-width:4" d="M30 -40 L50 -70"/></g>';
  },
  basket(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="6" rx="96" ry="12"/><path class="wood" d="M-90 -80 H90 L74 0 H-74Z" style="stroke:var(--second);stroke-width:5"/><path class="wood-lt" opacity=".6" d="M-78 -56 H78 M-74 -32 H74"/>' +
      '<path class="knit-lt" d="M-60 -80 C-50 -120 -10 -110 0 -90 C20 -124 60 -110 64 -80Z"/></g>';
  },
  // a soft red glow for discomfort
  ache(id) {
    return '<g class="' + id + '"><circle r="70" style="fill:#D96C6C;opacity:.18"/><circle r="40" style="fill:#D96C6C;opacity:.3"/><path class="ink" style="stroke:#C0392B;stroke-width:7" d="M-16 -16 L16 16 M16 -16 L-16 16"/></g>';
  },
  // a rounded card frame (centre 0,0) for the tips and options
  frame(id, w, h) {
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="28"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="28" style="fill:color-mix(in srgb, var(--ground) 45%, white);stroke:var(--second);stroke-width:6"/></g>';
  },
  // the back of a tip card
  cardBack(id, w, h) {
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="28"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="28" style="fill:color-mix(in srgb, var(--accent) 55%, var(--ground));stroke:var(--second);stroke-width:6"/>' +
      '<rect x="' + (-w / 2 + 22) + '" y="' + (-h / 2 + 22) + '" width="' + (w - 44) + '" height="' + (h - 44) + '" rx="18" style="fill:none;stroke:color-mix(in srgb, var(--ground) 60%, white);stroke-width:5;stroke-dasharray:14 12"/><g transform="scale(.7)">' + R.star(id + '-st') + '</g></g>';
  },
  // the side-view mat, rolled out on the floor of the room (centre x, floor y)
  matSide(id, x, y, w) {
    return '<g class="' + id + '"><ellipse class="shade" cx="' + x + '" cy="' + (y + 6) + '" rx="' + (w / 2 + 10) + '" ry="12"/><rect class="mat" x="' + (x - w / 2) + '" y="' + (y - 18) + '" width="' + w + '" height="22" rx="11"/>' +
      '<ellipse class="cushion" cx="' + (x - w / 2 + 70) + '" cy="' + (y - 30) + '" rx="56" ry="20"/></g>';
  },
});
