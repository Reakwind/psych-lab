const { seg, eo, eio, eob, lerp } = kit;
const Q = [[3.2, 'מה?', 220, 300], [4.6, 'איך?', 380, 240], [5.0, 'מתי?', 540, 300]];
kit.scene('e-questions', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('eq', -120) + R.phone('eqp', 441, 654, 'nira') +
      '<ellipse class="skin" cx="406" cy="700" rx="14" ry="12"/><ellipse class="skin" cx="476" cy="700" rx="14" ry="12"/><g transform="translate(780 360) scale(1.1)">' + R.battery('eq') + '</g></svg>' +
      Q.map((q, k) => '<div class="tag eq-q' + k + '">' + q[1] + '</div>').join('') + '<div class="tag tag-warm eq-cap">בסרטון הנכון</div></div>'));
    Object.assign(this, R.refs(kit, 'eq', ['body', 'head', 'eyes', 'fill', 'q0', 'q1', 'q2', 'cap']));
    this.g = R.refs(kit, 'eqp-g', ['eyes', 'head']);
  },
  render(t) {
    R.blink(this.eyes, t, 1.0); R.blink(this.g.eyes, t, 2.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.setBattery(this.fill, 0.62 + 0.03 * Math.sin(t));
    this.head.setAttribute('transform', 'rotate(' + (5 * Math.sin(t * 0.9)) + ' 0 30)');
    this.g.head.setAttribute('transform', 'rotate(' + (5 * Math.sin(t * 1.3)) + ' 0 30)');
    // what to do, how, when
    Q.forEach(([a, , x, y], k) => { R.place(this['q' + k], x, y, eo(seg(t, a, a + 0.3))); this['q' + k].style.transform += ' scale(' + eob(seg(t, a, a + 0.5), 1.8) + ')'; });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)));
  },
});