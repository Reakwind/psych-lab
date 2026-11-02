const { seg, eo, eio, eob, lerp } = kit;
// Ariel steps into the room and invites two rounds; Ruth shifts and settles back in her armchair
kit.scene('q-join', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q7', -230, false) + R.box('q7b') +
      '<circle class="q7-gl" cx="270" cy="640" r="220" style="fill:var(--main);opacity:0"/><g class="q7-aw">' + R.armsFree(R.ariel('q7a', 'stand'), 'q7a') + '</g>' +
      '<g class="q7-pp"><circle cx="-34" cy="0" r="22" style="fill:var(--main);stroke:var(--second);stroke-width:5"/><circle cx="34" cy="0" r="22" style="fill:var(--main);stroke:var(--second);stroke-width:5"/></g></svg>' +
      '<div class="tag q7-p">משהו פשוט וברור לחזור אליו</div><div class="tag tag-cool q7-a">הצטרפו אליי לשני סבבים</div><div class="tag tag-warm q7-b">מצאו תנוחה שנוחה לכם</div><div class="tag q7-c">בלי יותר מידי מאמץ</div></div>'));
    Object.assign(this, R.refs(kit, 'q7', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'gl', 'aw', 'pp', 'p', 'a', 'b', 'c']));
    this.x = R.boxRefs(kit, 'q7b'); this.ar = R.refs(kit, 'q7a', ['eyes', 'head', 'mouth', 'armR', 'armL']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ar.eyes, t, 2.3);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    const off = eio(seg(t, 0.0, 0.7));
    R.setBox(this.x, { alpha: 1 - off, dot: 4 + t * 0.3, ring: 0.45 });
    // Ariel walks in from the right and stops by the door; an open hand toward Ruth on "join me"
    const walk = eio(seg(t, 0.2, 1.5)), x = lerp(1250, 830, walk);
    this.aw.setAttribute('transform', 'translate(' + x + ' ' + (978 - Math.abs(Math.sin(t * 9)) * 8 * (walk > 0 && walk < 1 ? 1 : 0)) + ')');
    const g = eob(seg(t, 1.5, 2.1), 1.3) * (1 - eio(seg(t, 4.0, 4.6)));
    this.ar.armR.setAttribute('transform', 'rotate(' + (-70 * g) + ' 52 -326)');
    this.ar.head.setAttribute('transform', 'rotate(-6 0 30)'); this.ar.mouth.setAttribute('d', R.mouthHappy);
    // two round markers: the two rounds to come
    this.pp.setAttribute('transform', 'translate(540 ' + 170 + ') scale(' + Math.max(0.001, eob(seg(t, 2.79, 3.3), 1.5)) + ')');
    this.pp.style.opacity = 1 - eo(seg(t, 4.5, 4.9));
    // Ruth wriggles, then settles back; a soft glow with her easy breathing
    const wig = seg(t, 4.73, 6.4), settle = eio(seg(t, 5.8, 6.8));
    this.body.setAttribute('transform', 'translate(0 ' + 6 * settle + ') rotate(' + 3 * Math.sin(wig * Math.PI * 4) * (1 - settle) + ') scale(1 ' + kit.breathe(t, 0.02, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 * settle - 3) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.5 ? R.mouthHappy : R.mouthNeutral);
    this.gl.style.opacity = 0.14 * eo(seg(t, 7.34, 8.0)) * (0.7 + 0.3 * Math.sin(t * 1.4));
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.44, 1.8))), eo(seg(t, 1.44, 1.8)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.73, 5.1))), eo(seg(t, 4.73, 5.1)));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 7.34, 7.7))), eo(seg(t, 7.34, 7.7)));
  },
});
