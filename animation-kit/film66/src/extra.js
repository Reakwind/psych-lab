// Session 66 additions: a grey worry cloud, a photo of her friends, a new leaf on the plant, and Ruth's room set up around the circle of attention.
Object.assign(R, {
  // a worry: a grey cloud with an anxious face (id-eyes, id-mouth)
  worry(id) {
    const d = 'M-86 36 C-122 36 -132 -10 -100 -28 C-110 -74 -58 -98 -26 -76 C-10 -118 56 -118 70 -74 C110 -90 140 -48 116 -16 C140 4 128 36 98 36Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 10)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--second) 40%, var(--ground))"/>' +
      '<path class="ink" style="stroke-width:5" d="M-34 -30 l20 -8 M34 -30 l-20 -8"/><g class="' + id + '-eyes"><circle class="metal" cx="-22" cy="-14" r="7"/><circle class="metal" cx="22" cy="-14" r="7"/></g>' +
      '<path class="ink ' + id + '-mouth" style="stroke-width:5" d="M-22 16 q7 -7 14 0 t14 0 t14 0"/></g>';
  },
  // a framed photo of her two friends, standing on the window sill (origin = bottom centre)
  photo(id) {
    return '<g class="' + id + '"><rect class="shade" x="-50" y="-92" width="104" height="92" rx="8"/><rect class="wood" x="-54" y="-96" width="108" height="94" rx="8"/><rect x="-44" y="-86" width="88" height="74" rx="4" style="fill:color-mix(in srgb, var(--main) 14%, white)"/>' +
      '<circle cx="-18" cy="-56" r="13" class="nira-skin"/><path class="fra-hair" d="M-32 -58 C-34 -76 -2 -76 -4 -58 C-10 -66 -26 -66 -32 -58Z"/><path class="fra-top" d="M-34 -12 C-34 -32 -26 -40 -18 -40 C-10 -40 -2 -32 -2 -12Z"/>' +
      '<circle cx="18" cy="-56" r="13" class="nira-skin"/><path class="frb-hair" d="M4 -58 C2 -76 34 -76 32 -58 C26 -66 10 -66 4 -58Z"/><path class="frb-top" d="M2 -12 C2 -32 10 -40 18 -40 C26 -40 34 -32 34 -12Z"/></g>';
  },
  // a new leaf on the plant (scale it from 0 to grow it)
  sprout(id) {
    return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:6;stroke-linecap:round" d="M0 0 C2 -16 8 -30 18 -40"/><path class="leaf-lt" d="M18 -40 C36 -52 52 -44 50 -30 C38 -26 24 -30 18 -40Z" style="fill:color-mix(in srgb, #7FC27A 70%, var(--ground))"/></g>';
  },
});
// Ruth's room around the circle of attention: Ruth in her armchair (id-*), the photo on the sill (id-ph), her tea on the chair arm (id-mug),
// the new leaf (id-lf), soft glows behind each (id-gP, id-gM, id-gL), the worry by the door (id-wg), and the circle (id-ring).
R.attnRoom = function (id, o) {
  o = o || {};
  const glow = (c, x, y, r) => '<circle class="' + id + '-' + c + '" cx="' + x + '" cy="' + y + '" r="' + r + '" style="fill:var(--accent)" opacity="0"/>';
  return R.room({}) + glow('gP', 240, 505, 80) + glow('gM', 690, 640, 80) + glow('gL', 175, 660, 70) +
    '<g transform="translate(240 552)">' + R.photo(id + '-ph') + '</g>' + '<g class="' + id + '-lfg" transform="translate(150 700)">' + R.sprout(id + '-lf') + '</g>' +
    (o.mid || '') + R.seated(id, 0) + '<g class="' + id + '-mug" transform="translate(690 650) scale(.8)">' + R.mug(id + '-m') + '</g>' +
    '<g class="' + id + '-wg">' + R.worry(id + '-w') + '</g>' + (o.extra || '') + '<g class="' + id + '-ring">' + R.attn(id + '-at') + '</g>';
};
R.attnRefs = function (kit, id) {
  const o = R.refs(kit, id, ['body', 'head', 'eyes', 'mouth', 'gP', 'gM', 'gL', 'lfg', 'lf', 'mug', 'wg', 'ring']);
  o.w = R.refs(kit, id + '-w', ['eyes', 'mouth']); o.steam = kit.stage.querySelector('.' + id + '-m-steam');
  return o;
};
// the circle of attention at (x, y) with radius r; a little wobble w when it is unsteady
R.ring = function (A, x, y, r, o, t, w) {
  const j = (w || 0) * 10;
  A.ring.setAttribute('transform', 'translate(' + (x + j * Math.sin(t * 2.3)) + ' ' + (y + j * Math.cos(t * 1.7)) + ') scale(' + r + ')');
  A.ring.style.opacity = o;
};
// the worry by the door: position, size; it sways a little and its mouth wobbles
R.worryAt = function (A, x, y, s, t) {
  A.wg.setAttribute('transform', 'translate(' + x + ' ' + (y + 6 * Math.sin(t * 1.3)) + ') scale(' + s + ')');
  A.w.mouth.setAttribute('d', 'M-22 16 q7 ' + (-7 + 2 * Math.sin(t * 6)) + ' 14 0 t14 0 t14 0');
  R.blink(A.w.eyes, t, 2.2);
};
// eyes that look aside (dx, dy) and still blink
R.look = function (eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); };
R.SMILE = 'M-10 26 Q2 32 14 26'; R.BIG = 'M-12 24 Q2 36 16 24'; R.FLAT = 'M-10 28 Q2 26 14 28';
// spots in the room (circle centres) for the worry, the photo, the tea and the leaf
R.SPOT = { worry: [820, 330], photo: [240, 505], mug: [690, 640], leaf: [175, 660], ruth: [500, 560], room: [520, 560] };
// a speech bubble with three dots
R.talk = function (id) {
  return '<g class="' + id + '"><path class="shade" transform="translate(4 6)" d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z"/>' +
    '<path d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
    '<circle class="metal" cx="-30" cy="0" r="9"/><circle class="metal" cx="0" cy="0" r="9"/><circle class="metal" cx="30" cy="0" r="9"/></g>';
};
// small icons for the scale's left pan and the phone: the photo, the tea, the leaf (centred, about 70 wide)
R.mini = function (k) {
  return ['<g transform="translate(0 48) scale(.62)">' + R.photo('mini-ph') + '</g>', '<g transform="scale(.6)">' + R.mug('mini-m') + '</g>',
    '<g transform="translate(-18 26) scale(1.1)">' + R.sprout('mini-l') + '</g>'][k];
};
