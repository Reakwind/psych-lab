const { seg, eo, eio, eob, lerp } = kit;
const Q = [[0.4, '"האם יש כאן משהו שדורש ממני פעולה?"', 470], [2.7, '"או שאפשר פשוט לתת לה לעבור?"', 700]];
kit.scene('o-ask2', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ob', -200) + '<g class="ob-b">' + R.balloon('ob-bl') + '</g></svg>' +
      Q.map((q, k) => '<div class="thought sm ob-q' + k + '" style="background:color-mix(in srgb, var(--ground) 40%, white)">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'ob', ['body', 'head', 'eyes', 'mouth', 'b', 'q0', 'q1']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // and on "let it pass", the thought floats up and away
    const go = eio(seg(t, 5.0, 6.5));
    R.setBal(this.b, lerp(560, 300, go), lerp(260, -120, go) + Math.sin(t * 1.3) * 8, 1.4, 1 - eo(seg(t, 5.8, 6.5)));
    Q.forEach(([a, , y], k) => R.put(this['q' + k], 770, y + (1 - eo(seg(t, a, a + 0.6))) * 40, 0.3 + 0.7 * eob(seg(t, a, a + 0.6), 1.5), 0, eo(seg(t, a, a + 0.3))));
    this.head.setAttribute('transform', 'rotate(' + lerp(8, -6, go) + ' 0 30)');
    this.mouth.setAttribute('d', go > 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 27 Q2 30 14 27');
  },
});
