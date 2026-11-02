const { seg, eo, eio, eob, lerp } = kit;
const Q = [[2.3, '"האם זה דפוס חשיבה שמוכר לי מעצמי?"', 470], [4.2, '"האם זאת מחשבה שאני רוצה להמשיך איתה עכשיו?"', 700]];
kit.scene('o-ask1', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('oa', -200) + '<g class="oa-b">' + R.balloon('oa-bl') + '</g></svg>' +
      Q.map((q, k) => '<div class="thought sm oa-q' + k + '" style="background:color-mix(in srgb, var(--ground) 40%, white)">' + q[1] + '</div>').join('') + '<div class="tag tag-cool oa-a">יש לנו רגע להבחין</div></div>'));
    Object.assign(this, R.refs(kit, 'oa', ['body', 'head', 'eyes', 'mouth', 'b', 'a', 'q0', 'q1']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // a moment to look at it and ask
    R.setBal(this.b, 560, 260 + Math.sin(t * 1.3) * 8, 1.4, 1);
    Q.forEach(([a, , y], k) => R.put(this['q' + k], 770, y + (1 - eo(seg(t, a, a + 0.6))) * 40, 0.3 + 0.7 * eob(seg(t, a, a + 0.6), 1.5), 0, eo(seg(t, a, a + 0.3))));
    this.head.setAttribute('transform', 'rotate(' + (t > 4.2 ? 8 : t > 2.3 ? 4 : 0) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 27 Q2 30 14 27');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
  },
});
