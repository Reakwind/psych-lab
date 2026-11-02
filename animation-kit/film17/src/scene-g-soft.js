const { seg, eo, eio, eob, lerp } = kit;
// no need to force a clear picture: the bubble stays soft; she just listens and lets her imagination answer
kit.scene('g-soft', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g14', -200, false) + '<g transform="translate(296 704) scale(1.1)">' + R.phone('g14ph', 0, 0, 'ariel') + '<g transform="translate(40 0)">' + R.sound('g14-sd') + '</g></g>' + R.imgBubble('g14b') + '</svg>' +
      '<div class="tag tag-cool g14-a">לא צריך להתאמץ לייצר תמונה ברורה</div><div class="tag g14-b">פשוט מקשיבים להנחיה</div><div class="tag tag-warm g14-c">ונותנים לדמיון להגיב בדרכו</div></div>'));
    Object.assign(this, R.refs(kit, 'g14', ['body', 'eyes', 'head', 'mouth', 'tn', 'sd', 'a', 'b', 'c']));
    this.bg = kit.stage.querySelector('.g14b'); this.bb = R.bubRefs(kit, 'g14b');
  },
  render(t) {
    this.tn.style.opacity = 0;
    if (t > 5.2) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    // the picture stays soft whatever she does; it settles a little on its own as she listens
    const try_ = Math.sin(Math.PI * seg(t, 1.6, 3.6));
    R.setBub(this.bb, this.bg, 620, 280, eo(seg(t, 0.2, 1.0)), 1, 0, 9 - 2.5 * try_ - 3 * eio(seg(t, 6.6, 8.4)));
    this.sd.style.opacity = t > 4.5 ? 0.4 + 0.6 * Math.abs(Math.sin(t * 5)) : 0;
    this.body.setAttribute('transform', 'translate(0 ' + 4 * try_ + ') scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 + 4 * try_ + 10 * eio(seg(t, 5.0, 5.8))) + ' 0 30)');
    this.mouth.setAttribute('d', try_ > 0.5 ? R.mouthFlat : R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.58, 4.9))), eo(seg(t, 4.58, 4.9)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 7.5, 7.8))), eo(seg(t, 7.5, 7.8)));
  },
});
