const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('k-day', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kd', 0) + R.dayBar('kd', 220) +
      X.map((x, k) => R.blank('kd-i' + k)).join('') + '</svg>' +
      '<div class="tag tag-cool kd-a">מהבוקר ועד השינה</div><div class="tag tag-warm kd-b">לכל מיני דברים</div></div>'));
    Object.assign(this, R.refs(kit, 'kd', ['body', 'head', 'eyes', 'line', 'sun', 'moon', 'i0', 'i1', 'i2', 'i3', 'i4', 'a', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the day: the sun comes up on the right, the line runs to the moon on the left
    const sun = eob(seg(t, 1.2, 1.8), 1.6), line = eio(seg(t, 1.6, 3.9)), moon = eob(seg(t, 3.8, 4.4), 1.6);
    this.sun.setAttribute('transform', 'translate(1010 220) scale(' + sun + ') rotate(' + t * 8 + ')');
    this.line.setAttribute('transform', 'translate(970 0) scale(' + Math.max(0.001, line) + ' 1) translate(-970 0)');
    this.moon.setAttribute('transform', 'translate(84 220) scale(' + moon + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(10, -10, eio(seg(t, 1.6, 4.2))) * eio(seg(t, 0.8, 1.6)) * (1 - eio(seg(t, 7.6, 8.4))) + ' 0 30) translate(0 ' + (-6 * eio(seg(t, 0.8, 1.6))) + ')');
    // all the things we give our time to drop onto it
    X.forEach((x, k) => { const a = 5.3 + k * 0.42, p = eob(seg(t, a, a + 0.5), 1.5); R.xf(this['i' + k], x, lerp(120, 220, eo(seg(t, a, a + 0.4))), p, eo(seg(t, a, a + 0.2))); });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)) * (1 - eo(seg(t, 4.9, 5.2))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)));
  },
});
