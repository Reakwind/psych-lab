// Session 8 additions: the framed picture with its light, Tal's dining room and table, pots and dishes, a rain cloud.
Object.assign(R, {
  // dark everywhere except one circle (cx, cy, r), inside the box x0,y0 → x1,y1; set as the d of a filled path
  spotD(cx, cy, r, x0, y0, x1, y1) {
    x0 = x0 || 0; y0 = y0 || 0; x1 = x1 == null ? 1080 : x1; y1 = y1 == null ? 1080 : y1;
    return 'M' + x0 + ' ' + y0 + ' H' + x1 + ' V' + y1 + ' H' + x0 + 'Z M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + -2 * r + ' 0Z';
  },
  // a grey rain cloud centred on (0,0), about 240 wide; id-rain are the drops
  rainCloud(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(0 10)" d="M-110 40 C-150 40 -150 -14 -104 -18 C-104 -70 -36 -86 -10 -46 C14 -86 96 -76 96 -20 C140 -18 144 40 104 40Z"/>' +
      '<path class="slate" d="M-110 40 C-150 40 -150 -14 -104 -18 C-104 -70 -36 -86 -10 -46 C14 -86 96 -76 96 -20 C140 -18 144 40 104 40Z"/>' +
      '<path class="light" opacity=".3" d="M-80 -20 C-70 -46 -40 -52 -20 -36"/>' +
      '<g class="' + id + '-rain"><path class="ink" style="stroke:color-mix(in srgb, var(--main) 50%, var(--second));stroke-width:8;opacity:.7" d="M-70 70 l-12 30 M-20 70 l-12 30 M30 70 l-12 30 M80 70 l-12 30"/></g></g>';
  },
  // the framed picture of Ruth's path landscape: frame (130,170)-(950,790), inside (150,190)-(930,770); id-dark is the shadow, id-rc the rain cloud
  PIC: [150, 190, 930, 770],
  picture(id) {
    const [x0, y0, x1, y1] = R.PIC;
    return '<g class="' + id + '-pic"><rect class="shade" x="142" y="186" width="820" height="620" rx="18"/><rect class="wood" x="130" y="170" width="820" height="620" rx="18"/><rect class="wood-lt" opacity=".5" x="138" y="178" width="804" height="12" rx="6"/>' +
      '<clipPath id="' + id + '-cl"><rect x="' + x0 + '" y="' + y0 + '" width="' + (x1 - x0) + '" height="' + (y1 - y0) + '"/></clipPath><g clip-path="url(#' + id + '-cl)">' +
      '<g transform="translate(150 45.6) scale(.7222)">' + R.land(id + '-l', { sun: true }) + '</g>' +
      '<g transform="translate(700 290) scale(1.05)">' + R.rainCloud(id + '-rc') + '</g>' +
      '<path class="' + id + '-dark" style="fill:var(--second);opacity:.78;fill-rule:evenodd"/></g></g>';
  },
  // Tal's dining room: a lower wall, the floor, a window on the right and a lamp hanging over the table
  dining() {
    return '<rect class="wall-lo" x="0" y="640" width="1080" height="240"/><rect class="shade" x="0" y="636" width="1080" height="6"/>' +
      '<rect class="floor" x="0" y="880" width="1080" height="200"/><rect class="floor-dk" x="0" y="880" width="1080" height="12"/><path class="floor-dk" opacity=".35" d="M0 960 H1080 V966 H0Z M0 1036 H1080 V1042 H0Z"/>' +
      '<rect class="wood-lt" x="770" y="250" width="236" height="250" rx="14"/><rect class="glass" x="788" y="268" width="200" height="214" rx="6"/><path class="light" opacity=".7" d="M806 470 L870 286 H900 L836 470Z"/><path class="wood-lt" d="M884 268 h8 v214 h-8Z"/>' +
      '<rect class="wood" x="760" y="494" width="256" height="16" rx="8"/>' +
      '<path class="ink" style="stroke-width:5" d="M420 0 V170"/><path class="amber" d="M340 230 Q420 140 500 230Z"/><ellipse class="light" opacity=".8" cx="420" cy="232" rx="30" ry="8"/>';
  },
  // the table (front edge y 740) with a cloth hiding the legs of whoever stands behind it
  table() {
    return '<g class="table"><ellipse class="shade" cx="420" cy="900" rx="360" ry="16"/>' +
      '<rect class="wood" x="90" y="726" width="660" height="30" rx="10"/><path class="amber-lt" d="M100 752 H740 L748 890 H92Z"/><path class="amber" opacity=".25" d="M240 760 V890 M420 760 V890 M600 760 V890" style="stroke:var(--accent);stroke-width:6"/><path class="amber" opacity=".35" d="M100 752 H740 V770 H100Z"/>' +
      [170, 320, 470].map((x) => '<ellipse class="light" cx="' + x + '" cy="724" rx="52" ry="12"/><ellipse class="shade" cx="' + x + '" cy="726" rx="34" ry="6"/>').join('') + '</g>';
  },
  pot(cls) {
    return '<g class="' + cls + '"><path class="ink" style="stroke-width:8" d="M-74 -40 h-18 M74 -40 h18"/><rect class="slate-dk" x="-74" y="-70" width="148" height="78" rx="16"/><rect class="slate" x="-64" y="-62" width="128" height="22" rx="8"/>' +
      '<rect class="metal" x="-82" y="-84" width="164" height="16" rx="8"/><rect class="metal" x="-14" y="-98" width="28" height="16" rx="6"/></g>';
  },
  // Tal's whole dining room, the same in every scene: p-fam0..2 (family behind the table), p-dish0..2 (their dishes), p-pot0..3, p-serve (Tal's dish), p-tal
  FAM: [170, 320, 470], POTS: [[600, 736], [700, 736], [650, 664], [650, 592]],
  talRoom(p) {
    const looks = ['a', 'b', 'c'];
    let s = R.dining();
    R.FAM.forEach((x, k) => { s += '<g class="' + p + '-fam' + k + '"><g transform="translate(' + x + ' 886) scale(.72)">' + R.friend(p + '-f' + k, looks[k]) + '</g></g>'; });
    s += R.table();
    R.FAM.forEach((x, k) => { s += '<g class="' + p + '-dish' + k + '"><g transform="translate(' + x + ' 712) scale(.8)">' + R.dish(p + '-d' + k) + '</g></g>'; });
    R.POTS.forEach(([x, y], k) => { s += '<g class="' + p + '-pot' + k + '"><g transform="translate(' + x + ' ' + y + ') scale(.66)">' + R.pot(p + '-pk' + k) + '</g></g>'; });
    s += '<g class="' + p + '-tal"><g transform="translate(900 1010) scale(.8)">' + R.friend(p + '-t', 't') + '</g></g>';
    s += '<g class="' + p + '-serve"><g transform="translate(900 840)">' + R.dish(p + '-sv') + '</g></g>';
    return s;
  },
  dish(cls) {
    return '<g class="' + cls + '"><ellipse class="shade" cx="0" cy="8" rx="64" ry="10"/><path class="amber-dk" d="M-62 -8 Q0 50 62 -8Z"/><ellipse class="amber" cx="0" cy="-8" rx="62" ry="14"/><path class="leaf" d="M-30 -14 q14 -20 26 -2 q14 -18 26 2Z"/></g>';
  },
});
