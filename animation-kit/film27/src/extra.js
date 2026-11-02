// Session 27 additions: the evening room (window sky, floor lamp, night veil), Ruth's bed seen from above, small icons.
Object.assign(R, {
  // the window's sky over the room's glass: id-day / id-dusk / id-night layers cross-fade (set their opacity)
  sky(id) {
    return '<clipPath id="' + id + '-cl"><rect x="80" y="340" width="210" height="200" rx="6"/></clipPath><g clip-path="url(#' + id + '-cl)">' +
      '<rect class="' + id + '-dusk" x="80" y="340" width="210" height="200" style="fill:#E9A985;opacity:0"/><circle class="' + id + '-sun" cx="150" cy="520" r="36" style="fill:var(--accent);opacity:0"/>' +
      '<g class="' + id + '-night" opacity="0"><rect x="80" y="340" width="210" height="200" style="fill:#3A4870"/><path d="M236 380 a26 26 0 1 0 0 52 a20 20 0 1 1 0 -52Z" style="fill:#EDE6C8"/>' +
      '<circle cx="120" cy="380" r="3" style="fill:#fff"/><circle cx="170" cy="460" r="2.5" style="fill:#fff"/><circle cx="110" cy="500" r="2" style="fill:#fff"/></g></g>' +
      '<path class="wood-lt" d="M182 340 h8 v200 h-8Z M80 436 h210 v8 h-210Z"/>';
  },
  // a floor lamp standing on the floor at x (id-cone is its light, id-shade glows)
  lamp(id, x) {
    return '<g class="' + id + '"><path class="' + id + '-cone" d="M' + (x - 44) + ' 486 L' + (x - 190) + ' 862 H' + (x + 190) + ' L' + (x + 44) + ' 486Z" style="fill:var(--accent);opacity:.18"/>' +
      '<ellipse class="shade" cx="' + x + '" cy="862" rx="70" ry="10"/><rect class="metal" x="' + (x - 6) + '" y="480" width="12" height="380"/><rect class="metal" x="' + (x - 50) + '" y="850" width="100" height="14" rx="7"/>' +
      '<path class="' + id + '-shade" d="M' + (x - 70) + ' 490 L' + (x - 44) + ' 400 H' + (x + 44) + ' L' + (x + 70) + ' 490Z" style="fill:#F6D58E;stroke:var(--second);stroke-width:6"/></g>';
  },
  // the bed from above, Ruth in it (head on the pillow at the left); parts id-eyes, id-mouth, id-duvet
  bedTop(id) {
    let s = '<rect class="floor" width="1080" height="1080"/>';
    for (let k = 0; k < 9; k++) s += '<rect class="floor-dk" opacity=".3" x="0" y="' + (k * 130 + 40) + '" width="1080" height="5"/>';
    s += '<rect class="shade" x="96" y="292" width="910" height="500" rx="34"/><rect class="wood" x="86" y="278" width="910" height="500" rx="34"/>' +
      '<rect x="120" y="300" width="860" height="456" rx="26" style="fill:color-mix(in srgb, var(--ground) 45%, white)"/>' +
      '<rect class="wood" x="70" y="270" width="54" height="516" rx="18"/>' +
      '<ellipse class="shade" cx="250" cy="550" rx="96" ry="150"/><ellipse cx="242" cy="540" rx="92" ry="148" style="fill:color-mix(in srgb, var(--ground) 20%, white);stroke:color-mix(in srgb, var(--second) 25%, var(--ground));stroke-width:5"/>' +
      '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop(id) + '</g>' +
      '<g class="' + id + '-duvet"><rect class="shade" x="404" y="318" width="582" height="436" rx="40"/><rect x="392" y="306" width="582" height="436" rx="40" style="fill:color-mix(in srgb, #7E95C6 55%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      '<path d="M392 380 H974 M392 450 H974" style="fill:none;stroke:color-mix(in srgb, #7E95C6 70%, var(--second));stroke-width:5;opacity:.45"/><rect x="392" y="306" width="70" height="436" rx="30" style="fill:color-mix(in srgb, var(--ground) 40%, white);opacity:.7"/></g>' +
      // the nightstand, a lamp seen from above
      '<rect class="shade" x="98" y="104" width="170" height="140" rx="14"/><rect class="wood-lt" x="90" y="94" width="170" height="140" rx="14"/>' +
      '<circle class="' + id + '-glow" cx="176" cy="164" r="120" style="fill:var(--accent);opacity:.25"/><circle cx="176" cy="164" r="44" style="fill:#F6D58E;stroke:var(--second);stroke-width:5"/><circle class="metal" cx="176" cy="164" r="8"/>';
    return s;
  },
  crib(id) {
    let s = '<g class="' + id + '"><rect x="-120" y="-20" width="240" height="90" rx="16" style="fill:color-mix(in srgb, var(--accent) 30%, white);stroke:var(--second);stroke-width:6"/>';
    for (let k = 0; k < 7; k++) s += '<rect x="' + (-100 + k * 32) + '" y="-60" width="10" height="70" rx="5" class="wood"/>';
    s += '<rect class="wood" x="-130" y="-70" width="260" height="16" rx="8"/><path class="ink" style="stroke-width:5" d="M0 -70 V-120 M-60 -120 H60"/>' +
      '<path class="amber" d="M-60 -120 v20 a10 10 0 0 0 0 20Z"/><circle class="amber" cx="60" cy="-96" r="12"/><path class="amber" d="M0 -104 l6 12 h12 l-10 8 l4 12 l-12 -8 l-12 8 l4 -12 l-10 -8 h12Z"/></g>';
    return s;
  },
  book(id) {
    return '<g class="' + id + '"><path d="M0 -40 C-30 -56 -60 -56 -84 -44 V40 C-60 28 -30 28 0 44 C30 28 60 28 84 40 V-44 C60 -56 30 -56 0 -40Z" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6;stroke-linejoin:round"/>' +
      '<path class="ink" style="stroke-width:5" d="M0 -40 V44"/><path class="ink" style="stroke-width:4;opacity:.4" d="M-66 -20 h48 M-66 0 h48 M18 -20 h48 M18 0 h48"/></g>';
  },
  shower(id) {
    return '<g class="' + id + '"><path class="metal" d="M-50 -20 C-50 -50 50 -50 50 -20Z"/><rect class="metal" x="-6" y="-70" width="12" height="30"/>' +
      [-30, -10, 10, 30].map((x) => '<path class="' + id + '-drop" d="M' + x + ' 0 v40" style="fill:none;stroke:var(--main);stroke-width:7;stroke-linecap:round;stroke-dasharray:10 14"/>').join('') + '</g>';
  },
  notes(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:8" d="M0 0 V-70 L44 -82 V-12"/><ellipse class="metal" cx="-10" cy="2" rx="16" ry="12"/><ellipse class="metal" cx="34" cy="-10" rx="16" ry="12"/></g>';
  },
  radio(id) {
    return '<g class="' + id + '"><rect x="-56" y="-40" width="112" height="70" rx="14" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground));stroke:var(--second);stroke-width:5"/><circle class="light" cx="-22" cy="-5" r="18"/><circle class="ink" style="stroke-width:4" cx="-22" cy="-5" r="18"/>' +
      '<rect class="light" x="10" y="-18" width="34" height="8" rx="4"/><rect class="light" x="10" y="0" width="34" height="8" rx="4"/><path class="ink" style="stroke-width:4" d="M30 -40 L50 -70"/></g>';
  },
  bulb(id) {
    return '<g class="' + id + '"><circle r="34" style="fill:#F6D58E;stroke:var(--second);stroke-width:6"/><rect class="metal" x="-16" y="30" width="32" height="24" rx="5"/><path class="ink" style="stroke-width:4;opacity:.5" d="M-10 0 q10 -14 20 0"/></g>';
  },
  laptop(id) {
    return '<g class="' + id + '"><rect x="-80" y="-100" width="160" height="104" rx="10" class="metal"/><rect x="-68" y="-88" width="136" height="80" rx="4" style="fill:color-mix(in srgb, var(--main) 25%, var(--ground))"/><path class="ink" style="stroke-width:4;opacity:.5" d="M-50 -66 h70 M-50 -48 h96 M-50 -30 h50"/><path class="slate-dk" d="M-104 4 H104 L92 22 H-92Z"/></g>';
  },
  paper(id) {
    return '<g class="' + id + '"><rect x="-64" y="-80" width="128" height="160" rx="6" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><rect class="slate" x="-48" y="-62" width="96" height="30" rx="4"/>' +
      '<path class="ink" style="stroke-width:5;opacity:.45" d="M-48 -14 h96 M-48 6 h96 M-48 26 h70 M-48 46 h84"/><text x="40" y="-38" text-anchor="middle" style="font-size:44px;font-weight:700;fill:#C0392B">!</text></g>';
  },
  tasks(id) {
    let s = '<g class="' + id + '"><rect x="-64" y="-84" width="128" height="168" rx="12" style="fill:color-mix(in srgb, var(--accent) 22%, white);stroke:var(--second);stroke-width:5"/>';
    for (let k = 0; k < 4; k++) s += '<rect x="-46" y="' + (-62 + k * 36) + '" width="20" height="20" rx="4" style="fill:white;stroke:var(--second);stroke-width:4"/><path class="ink" style="stroke-width:5;opacity:.5" d="M-14 ' + (-52 + k * 36) + ' h56"/>';
    return s + '</g>';
  },
  // a round badge holding an icon (centre 0,0)
  disc(id, r) {
    return '<g class="' + id + '"><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:color-mix(in srgb, var(--accent) 22%, var(--ground));stroke:var(--second);stroke-width:5"/></g>';
  },
  moon(id, r) {
    return '<path class="' + id + '" d="M0 ' + (-r) + ' a' + r + ' ' + r + ' 0 1 0 0 ' + (2 * r) + ' a' + (r * 1.33) + ' ' + (r * 1.33) + ' 0 0 1 0 ' + (-2 * r) + 'Z" style="fill:#C9CFE0;stroke:var(--second);stroke-width:5"/>';
  },
  sleepButton(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="70" rx="200" ry="26"/><rect x="-190" y="0" width="380" height="70" rx="24" class="metal"/>' +
      '<g class="' + id + '-cap"><ellipse cx="0" cy="34" rx="150" ry="40" style="fill:#A8423A"/><rect x="-150" y="-26" width="300" height="60" style="fill:#C9564A"/><ellipse cx="0" cy="-26" rx="150" ry="40" style="fill:#E07A6E;stroke:var(--second);stroke-width:5"/>' +
      '<g transform="translate(-6 -26) scale(.9)">' + R.moon(id + '-m', 24).replace('#C9CFE0', 'var(--ground)') + '</g></g></g>';
  },
  // a frame card (centre 0,0)
  frame(id, w, h, fill) {
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="28"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="28" style="fill:' + (fill || 'color-mix(in srgb, var(--ground) 45%, white)') + ';stroke:var(--second);stroke-width:6"/></g>';
  },
});
Object.assign(R, {
  // the evening room: Ruth in her armchair (shifted dx), the window sky, a floor lamp at lx, a night veil and the lamp's light over it
  eveRoom(id, dx, lx) {
    return R.room({ shoes: false }) + R.sky(id + '-s') + R.lamp(id + '-l', lx) + R.seated(id, dx) +
      '<rect class="' + id + '-veil" width="1080" height="1080" style="fill:#1A2340;opacity:0"/>' +
      '<g class="' + id + '-lit"><path d="M' + (lx - 44) + ' 486 L' + (lx - 190) + ' 862 H' + (lx + 190) + ' L' + (lx + 44) + ' 486Z" style="fill:#FFD98A;opacity:.2"/><ellipse cx="' + lx + '" cy="445" rx="120" ry="90" style="fill:#FFE3A0;opacity:.3"/>' +
      '<path d="M' + (lx - 70) + ' 490 L' + (lx - 44) + ' 400 H' + (lx + 44) + ' L' + (lx + 70) + ' 490Z" style="fill:#F6D58E;stroke:var(--second);stroke-width:6"/></g>';
  },
  eveRefs(kit, id) {
    const q = (c) => kit.stage.querySelector('.' + id + c);
    return { dusk: q('-s-dusk'), sun: q('-s-sun'), night: q('-s-night'), veil: q('-veil'), lit: q('-lit'), cone: q('-l-cone') };
  },
  // dusk / night 0..1 for the window, dark 0..1 for the room, lamp 0..1 brightness
  setEve(e, dusk, night, dark, lamp) {
    e.dusk.style.opacity = dusk; e.sun.style.opacity = dusk * (1 - night); e.night.setAttribute('opacity', night);
    e.veil.style.opacity = 0.45 * dark; e.lit.style.opacity = lamp; e.cone.style.opacity = 0.18 * lamp;
  },
});
