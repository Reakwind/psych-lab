const { seg, eo, eio, eob, lerp } = kit;
const Q = [[2.1, 'מה עוזר לי?', 250], [3.8, 'מתי זה עוזר לי?', 390], [5.9, 'מה או מי גורם לי להרגיש טוב יותר?', 530], [9.9, 'מה מרים אותי?', 670]];
kit.scene('k-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kq', -220) + '</svg>' +
      Q.map((q, k) => '<div class="tag ' + (k === 3 ? 'tag-warm ' : '') + 'kq-q' + k + '">' + q[1] + '</div>').join('') + '<div class="tag tag-cool kq-a">קחו רגע לחשוב על זה</div></div>'));
    Object.assign(this, R.refs(kit, 'kq', ['body', 'head', 'eyes', 'mouth', 'q0', 'q1', 'q2', 'q3', 'a']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
    // she pauses with each question
    Q.forEach(([a, , y], k) => R.place(this['q' + k], 720, lerp(y + 14, y, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
    const tilt = Math.sin(t * 0.7) * 4;
    this.head.setAttribute('transform', 'rotate(' + (-10 * eio(seg(t, 0.6, 1.4)) + tilt) + ' 0 30)');
    this.mouth.setAttribute('d', t > 10.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 27 Q2 30 14 27');
  },
});
