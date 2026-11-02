const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect class="eh-sun amber-lt" x="80" y="340" width="210" height="200" rx="6" opacity="0"/>' + R.seated('eh', -120) +
      '<g class="eh-bg">' + R.battery('eh') + '</g></svg><div class="tag tag-cool eh-title">מפגש 5 · ניהול אנרגיה</div><div class="tag tag-warm eh-q">ומחר?</div></div>'));
    Object.assign(this, R.refs(kit, 'eh', ['sun', 'body', 'head', 'eyes', 'bg', 'fill', 'title', 'q']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.sun.setAttribute('opacity', 0.5 * eo(seg(t, 0, 1.0)));
    // a battery beside Ruth: today's energy; it shifts, and tomorrow it may be different again
    this.bg.setAttribute('transform', 'translate(780 360) scale(' + eob(seg(t, 0.5, 1.1), 1.6) * 1.1 + ')');
    let l = 0.7 * eio(seg(t, 1.0, 2.0));
    l += -0.25 * eio(seg(t, 5.8, 6.5)) + 0.35 * eio(seg(t, 6.6, 7.3));
    R.setBattery(this.fill, l);
    this.head.setAttribute('transform', 'rotate(' + (7 * eio(seg(t, 1.2, 1.8))) + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
    R.place(this.q, 780, lerp(552, 540, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)));
  },
});