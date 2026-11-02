// Session 65 additions: the uninvited guest, and the party in Ruth's living room (friends, snacks, a radio, the door that opens on him).
Object.assign(R, {
  // the uninvited guest: a round grey figure, origin between his feet. Parts: id-body (fill softens), id-armL/R, id-brow, id-eyes, id-mouth,
  // id-noise (red zigzags), id-blush, id-sweat, id-trem (all hidden until a scene shows them)
  guest(id) {
    const body = 'M-104 -78 C-136 -170 -118 -300 0 -312 C118 -300 136 -170 104 -78 C72 -46 -72 -46 -104 -78Z';
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="4" rx="96" ry="12"/>' +
      '<rect class="guest-dk" x="-52" y="-80" width="30" height="80" rx="12"/><rect class="guest-dk" x="22" y="-80" width="30" height="80" rx="12"/>' + R.shoe(-62, 2) + R.shoe(14, 2) +
      '<g class="' + id + '-armL"><rect class="guest-dk" x="-128" y="-196" width="30" height="96" rx="15"/></g><g class="' + id + '-armR"><rect class="guest-dk" x="98" y="-196" width="30" height="96" rx="15"/></g>' +
      '<path class="guest ' + id + '-body" d="' + body + '"/><path class="guest-dk" opacity=".45" d="M60 -296 C118 -270 132 -170 104 -78 C90 -64 70 -56 50 -54 C84 -130 86 -230 60 -296Z"/>' +
      '<g class="' + id + '-blush" opacity="0"><ellipse cx="-58" cy="-170" rx="20" ry="11" style="fill:#E58C8C"/><ellipse cx="58" cy="-170" rx="20" ry="11" style="fill:#E58C8C"/></g>' +
      '<g class="' + id + '-eyes"><circle class="metal" cx="-32" cy="-204" r="10"/><circle class="metal" cx="32" cy="-204" r="10"/></g>' +
      '<path class="ink ' + id + '-brow" style="stroke-width:7" d="M-52 -238 L-16 -226 M52 -238 L16 -226"/>' +
      '<path class="ink ' + id + '-mouth" style="stroke-width:7" d="M-30 -148 Q0 -170 30 -148"/>' +
      '<g class="' + id + '-noise"><path class="ink" style="stroke:#D96C6C;stroke-width:7" d="M-130 -250 l-22 -10 l10 -16 l-24 -8 M-128 -206 l-26 0 l6 -18 l-24 -2 M130 -250 l22 -10 l-10 -16 l24 -8 M128 -206 l26 0 l-6 -18 l24 -2"/></g>' +
      '<path class="' + id + '-sweat" opacity="0" d="M84 -262 C76 -246 72 -236 72 -230 A12 12 0 0 0 96 -230 C96 -236 92 -246 84 -262Z" style="fill:color-mix(in srgb, var(--main) 35%, white)"/>' +
      '<g class="' + id + '-trem" opacity="0">' + [0, 1, 2].map((k) => '<path class="ink" style="stroke-width:6;opacity:.75" d="M' + (136 + k * 8) + ' ' + (-150 + k * 30) + ' q10 -10 20 0 t20 0"/><path class="ink" style="stroke-width:6;opacity:.75" d="M' + (-176 - k * 8) + ' ' + (-150 + k * 30) + ' q10 -10 20 0 t20 0"/>').join('') + '</g></g>';
  },
  guestRefs(kit, id) { return R.refs(kit, id, ['body', 'armL', 'armR', 'brow', 'eyes', 'mouth', 'noise', 'blush', 'sweat', 'trem']); },
  // soften the guest: s = 0 (grey, loud, scowling) .. 1 (lighter, quiet, just there); t keeps his noise jittering
  soften(g, s, t) {
    g.body.style.fill = 'color-mix(in srgb, var(--second) ' + Math.round(42 - 20 * s) + '%, var(--ground))';
    g.noise.style.opacity = 1 - s;
    g.noise.setAttribute('transform', 'translate(0 -228) scale(' + (1 + 0.08 * Math.sin(t * 19) * (1 - s)) + ') translate(0 228)');
    g.brow.setAttribute('d', 'M-52 ' + (-238 + 8 * s) + ' L-16 ' + (-226 - 4 * s) + ' M52 ' + (-238 + 8 * s) + ' L16 ' + (-226 - 4 * s));
    g.mouth.setAttribute('d', 'M-30 -152 Q0 ' + (-170 + 16 * s) + ' 30 -152');
  },
  stool(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="4" rx="70" ry="10"/><path class="wood" d="M-50 -96 L-62 0 H-48 L-36 -96Z M50 -96 L62 0 H48 L36 -96Z"/><rect class="wood-lt" x="-66" y="-112" width="132" height="24" rx="12"/></g>';
  },
  // a small side table with a plate of food and two glasses (origin on the floor)
  snacks(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="4" rx="80" ry="10"/><rect class="wood" x="-8" y="-150" width="16" height="150"/><rect class="wood" x="-50" y="-8" width="100" height="10" rx="5"/>' +
      '<ellipse class="wood" cx="0" cy="-150" rx="84" ry="16"/><ellipse class="wood-lt" cx="0" cy="-156" rx="84" ry="16"/>' +
      '<ellipse class="light" cx="-24" cy="-166" rx="40" ry="10"/><circle class="amber" cx="-38" cy="-174" r="12"/><circle style="fill:#D96C6C" cx="-20" cy="-176" r="12"/><circle class="leaf-lt" cx="-30" cy="-188" r="10"/>' +
      '<g transform="translate(36 -166)">' + R.radio(id + '-rad') + '</g></g>';
  },
  // a small radio (origin at its base centre) with music notes id-n0..2
  radio(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:4" d="M14 -46 L34 -78"/><rect class="amber-dk" x="-46" y="-48" width="92" height="48" rx="12"/><circle class="light" cx="-20" cy="-24" r="14"/><rect class="light" x="4" y="-34" width="32" height="8" rx="4"/><rect class="light" x="4" y="-20" width="22" height="8" rx="4"/></g>';
  },
  notes(id) {
    return [0, 1, 2].map((k) => '<g class="' + id + '-n' + k + '"><path class="ink" style="stroke-width:6" d="M0 0 V-40 L22 -46 V-6"/><ellipse class="metal" cx="-6" cy="0" rx="10" ry="8"/><ellipse class="metal" cx="16" cy="-6" rx="10" ry="8"/></g>').join('');
  },
  // a speech bubble with three dots
  talk(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(4 6)" d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z"/>' +
      '<path d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<g class="' + id + '-dots"><circle class="metal" cx="-30" cy="0" r="9"/><circle class="metal" cx="0" cy="0" r="9"/><circle class="metal" cx="30" cy="0" r="9"/></g></g>';
  },
  // an argument: a jagged bubble
  clash(id) {
    return '<g class="' + id + '"><path d="M-80 -30 L-50 -54 L-30 -30 L0 -60 L20 -32 L54 -56 L64 -24 L92 -10 L66 10 L84 40 L44 34 L30 60 L6 34 L-30 56 L-36 26 L-80 30 L-60 4Z" style="fill:color-mix(in srgb, #D96C6C 22%, white);stroke:var(--second);stroke-width:5;stroke-linejoin:round"/>' +
      '<path class="ink" style="stroke:#C0392B;stroke-width:8" d="M-24 -14 V12 M0 -14 V12 M24 -14 V12"/><circle style="fill:#C0392B" cx="-24" cy="26" r="5"/><circle style="fill:#C0392B" cx="0" cy="26" r="5"/><circle style="fill:#C0392B" cx="24" cy="26" r="5"/></g>';
  },
  // the third feeling badge next to the tool badges: a body with little sensation lines (body sensations)
  bodyBadge(cls, r) {
    r = r || 56;
    return '<g class="' + cls + '"><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:color-mix(in srgb, #E58C8C 30%, var(--ground));stroke:var(--second);stroke-width:5"/><g transform="scale(' + (r / 56) + ')">' +
      '<circle class="skin" cx="0" cy="-22" r="12"/><path class="knit" d="M-16 30 V0 Q-16 -8 0 -8 Q16 -8 16 0 V30Z"/><path class="ink" style="stroke-width:4" d="M24 -6 q6 -6 12 0 M24 10 q6 -6 12 0 M-36 -6 q6 -6 12 0 M-36 10 q6 -6 12 0"/></g></g>';
  },
});

// the whole party: everything lives in id-cam so a scene can push the camera in. Actors: Ruth (id-rw walker: id-r stands with free arms, id-rs steps),
// friends id-fa / id-fb (free arms), the guest id-gg (parts id-g-*), the stool id-st, chat bubbles id-ba / id-bb, the circle of attention id-ring,
// the open door id-open, the radio notes id-rd-n*, the snack table at x 680.
R.partyShot = function (id, o) {
  o = o || {};
  return '<g class="' + id + '-cam">' + R.room({ shoes: false }) +
    '<g class="' + id + '-open" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>' +
    (o.chair === false ? '' : '<g class="' + id + '-ch">' + R.chair() + '</g>') +
    '<g transform="translate(765 870)">' + R.snacks(id + '-sn') + '</g>' +
    R.notes(id + '-rd') + '<g class="' + id + '-ring" opacity="0">' + R.attn(id + '-at') + '</g>' +
    '<g class="' + id + '-st" opacity="0">' + R.stool(id + '-stl') + '</g>' +
    '<g class="' + id + '-gg">' + R.guest(id + '-g') + '</g>' +
    '<g class="' + id + '-fa">' + R.armsFree(R.friend(id + '-a', 'a', 'stand'), id + '-a') + '</g>' +
    '<g class="' + id + '-fb">' + R.armsFree(R.friend(id + '-b', 'b', 'stand'), id + '-b') + '</g>' +
    (o.seated ? '<g transform="translate(500 742)">' + R.ruth(id + '-r', 'sit') + '</g>' :
      '<g class="' + id + '-rw"><g class="' + id + '-ra">' + R.ruthHost(id + '-r') + '</g><g class="' + id + '-rs" opacity="0">' + R.ruth(id + '-rs', 'step') + '</g></g>') +
    '<g class="' + id + '-ba">' + R.talk(id + '-ta') + '</g><g class="' + id + '-bb">' + R.talk(id + '-tb') + '</g>' + (o.extra || '') + '</g>';
};
// Ruth standing with free arms, a glass she can lift (id-glass) and a blush she can show (id-blush)
R.ruthHost = function (id) {
  return R.armsFree(R.ruth(id, 'stand'), id)
    .replace('<g class="' + id + '-armR">', '<g class="' + id + '-armR"><g class="' + id + '-glass" opacity="0" transform="translate(66 -214)"><path d="M-14 -24 h28 l-3 40 h-22Z" style="fill:color-mix(in srgb, var(--main) 18%, white);stroke:var(--second);stroke-width:4"/></g>')
    .replace('<g class="' + id + '-eyes">', '<g class="' + id + '-blush" opacity="0"><ellipse cx="-28" cy="18" rx="15" ry="8" style="fill:#E58C8C"/><ellipse cx="32" cy="18" rx="15" ry="8" style="fill:#E58C8C"/></g><g class="' + id + '-eyes">');
};
R.partyRefs = function (kit, id) {
  const q = (s) => kit.stage.querySelector('.' + id + '-' + s);
  const P = { cam: q('cam'), open: q('open'), ring: q('ring'), st: q('st'), gg: q('gg'), fa: q('fa'), fb: q('fb'), rw: q('rw'), ra: q('ra'), rs: q('rs'), ba: q('ba'), bb: q('bb'), ch: q('ch') };
  P.r = R.refs(kit, id + '-r', ['head', 'eyes', 'mouth', 'armL', 'armR', 'glass', 'blush']);
  P.a = R.refs(kit, id + '-a', ['head', 'eyes', 'mouth', 'armL', 'armR']);
  P.b = R.refs(kit, id + '-b', ['head', 'eyes', 'mouth', 'armL', 'armR']);
  P.g = R.guestRefs(kit, id + '-g');
  P.notes = [0, 1, 2].map((k) => q('rd-n' + k));
  return P;
};
// camera: zoom s about the fixed point (ax, ay)
R.camAt = function (P, s, ax, ay) { P.cam.setAttribute('transform', 'translate(' + ax + ' ' + ay + ') scale(' + s + ') translate(' + -ax + ' ' + -ay + ')'); };
// Ruth walking: x on the floor; while moving she alternates her standing and stepping poses
R.walkTo = function (P, x, moving, t) {
  const step = moving ? Math.floor(t * 3) % 2 : 0;
  P.rw.setAttribute('transform', 'translate(' + x + ' 962)');
  P.ra.setAttribute('opacity', step ? 0 : 1); P.rs.setAttribute('opacity', step ? 1 : 0);
};
// the party carries on: friends chat (bubbles alternate), heads bob, the radio plays; live = 0..1 fades it all down
R.partyLive = function (P, t, live) {
  R.blink(P.a.eyes, t, 1.1); R.blink(P.b.eyes, t, 2.6);
  const on = live > 0.5, turn = Math.floor(t / 1.1) % 2;
  P.a.head.setAttribute('transform', 'rotate(' + (6 + 3 * Math.sin(t * 1.7) * live) + ' 0 30)');
  P.b.head.setAttribute('transform', 'rotate(' + (-6 + 3 * Math.sin(t * 1.3 + 1) * live) + ' 0 30)');
  P.a.mouth.setAttribute('d', on && turn === 0 && Math.floor(t * 4) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
  P.b.mouth.setAttribute('d', on && turn === 1 && Math.floor(t * 4 + 1) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
  P.ba.style.opacity = live * (turn === 0 ? 1 : 0.5); P.bb.style.opacity = live * (turn === 1 ? 1 : 0.5);
  P.notes.forEach((n, k) => { const p = ((t * 0.35 + k / 3) % 1); n.setAttribute('transform', 'translate(' + (800 - 40 * p + 20 * Math.sin(p * 9 + k)) + ' ' + (660 - 210 * p) + ') scale(' + (0.7 + 0.3 * Math.sin(Math.PI * p)) + ')'); n.style.opacity = live * Math.sin(Math.PI * p); });
};
// where the friends stand at the party, and their chat bubbles above them
R.partyPlace = function (P, ax, bx) {
  P.fa.setAttribute('transform', 'translate(' + ax + ' 975)'); P.fb.setAttribute('transform', 'translate(' + bx + ' 975)');
  P.ba.setAttribute('transform', 'translate(' + (ax + 40) + ' 330) scale(.75)'); P.bb.setAttribute('transform', 'translate(' + (bx - 40) + ' 330) scale(-.75 .75)');
};
// arms of a free-armed figure: angles in degrees about the shoulders (negative swings a hand towards the right)
R.arms = function (r, l, rr) { r.armL.setAttribute('transform', 'rotate(' + l + ' -52 -326)'); r.armR.setAttribute('transform', 'rotate(' + rr + ' 52 -326)'); };
R.FA = 170; R.FB = 570; R.HOME = 380; R.DOOR = 735;
R.SMILE = 'M-12 24 Q2 36 16 24'; R.FLAT = 'M-10 28 Q2 26 14 28'; R.TALK = 'M-10 24 Q2 40 14 24';
// eyes that look aside (dx, dy) and still blink
R.look = function (eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); };
