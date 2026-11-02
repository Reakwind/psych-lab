const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-open', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect class="ao2-sun light" x="80" y="340" width="210" height="200" rx="6" opacity="0"/>' + R.seated('ao2', 0) +
      '<g class="ao2-n">' + R.note('ao2-note') + '</g></svg><div class="tag tag-cool ao2-cap">ראש פתוח</div><div class="tag tag-warm ao2-one">דבר אחד קטן</div></div>'));
    Object.assign(this, R.refs(kit, 'ao2', ['sun', 'body', 'head', 'eyes', 'mouth', 'n', 'cap', 'one']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.sun.setAttribute('opacity', 0.5 * eo(seg(t, 2.4, 3.4)));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
    // from each practice, one small thing learned
    const n = eob(seg(t, 5.2, 5.8), 1.8);
    this.n.setAttribute('transform', 'translate(650 ' + (620 + Math.sin(t * 2) * 6) + ') rotate(-6) scale(' + n * 1.5 + ')');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 5.4, 6.0))) + ' 0 30)');
    R.place(this.one, 700, lerp(500, 488, eo(seg(t, 5.5, 6.0))), eo(seg(t, 5.5, 6.0)));
  },
});
