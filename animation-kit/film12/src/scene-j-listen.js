const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-listen', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('j6', -240) + R.friendSeat('j6', 820) + R.teaTable('j6', 548) +
      '<g class="j6-sb">' + R.sayBubble('j6-say', R.badge('j6-i2', 'try', 50)) + '</g><g class="j6-fb">' + R.sayBubble('j6-fsay', R.badge('j6-gv', 'give', 50), true) + '</g></svg>' +
      '<div class="tag tag-warm j6-n">ומה הייתם רוצים לנסות</div><div class="tag tag-cool j6-a">מה האדם שמולכם יכול ורוצה לתת</div></div>'));
    Object.assign(this, R.refs(kit, 'j6', ['body', 'head', 'eyes', 'mouth', 'sb', 'fb', 'gv', 'n', 'a']));
    this.f = R.refs(kit, 'j6f', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // now Ruth listens: what can her friend give, and what does she want to give
    const out = 1 - eio(seg(t, 0.2, 0.7));
    R.setG(this.sb, 330, 250, out, out); R.place(this.n, 640, 210, out);
    R.setG(this.fb, 760, 250 + Math.sin(t * 1.4) * 4, eob(seg(t, 2.2, 2.7), 1.5), eo(seg(t, 2.2, 2.4)));
    R.setG(this.gv, 0, 0, eob(seg(t, 2.5, 3.0), 1.6), t > 2.5 ? 1 : 0);
    this.f.mouth.setAttribute('d', t > 2.2 && t < 4.6 && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 36 14 24' : R.mouthHappy);
    this.f.head.setAttribute('transform', 'rotate(6 0 30)');
    this.head.setAttribute('transform', 'rotate(' + lerp(6, 10, eio(seg(t, 0.6, 1.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.74, 1.1))), eo(seg(t, 0.74, 1.1)));
  },
});
