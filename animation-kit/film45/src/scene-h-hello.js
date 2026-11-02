const { seg, eo, eio, eob, lerp } = kit;
kit.scene('h-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hh', -120) +
      '<g class="hh-vg">' + R.voice('hh-v') + '</g></svg>' +
      '<div class="tag tag-cool hh-title">מפגש 45 · רגע של חמלה עצמית</div><div class="tag hh-a">הדרך שבה אנחנו מדברים לעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'hh', ['body', 'head', 'eyes', 'mouth', 'vg', 'title', 'a']));
    this.v = R.refs(kit, 'hh-v', ['eyes', 'mouth']);
    this.v.mouth.setAttribute('d', 'M-2 6 Q10 6 22 6');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.v.eyes, t, 2.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // a little voice by her head: the way we talk to ourselves
    R.xf(this.vg, 760, 410 + Math.sin(t * 2.2) * 8, 1.5 * eob(seg(t, 0.9, 1.5), 1.7), eo(seg(t, 0.9, 1.1)));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.2, 1.9))) + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)));
    R.place(this.a, 540, lerp(176, 164, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
  },
});
