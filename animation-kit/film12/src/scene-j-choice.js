const { seg, eo, eio, eob, lerp } = kit;
const WHO = [['את מי', 3.79, 820], ['במה', 5.69, 640], ['וכמה', 6.07, 460]];
const AMT = [['הרבה', 8.23, 70, 960, 330], ['מעט', 9.27, -25, 680, 230], ['או לא לשתף בכלל', 11.59, -80, 520, 370]];
kit.scene('j-choice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('j8', -240) + '<g class="j8-dw">' + R.dial('j8d') + '</g></svg>' +
      WHO.map((w, k) => '<div class="tag j8-w' + k + '">' + w[0] + '</div>').join('') + AMT.map((w, k) => '<div class="tag tag-warm j8-m' + k + '">' + w[0] + '</div>').join('') + '<div class="tag tag-cool j8-a">הבחירה תמיד שלכם</div></div>'));
    Object.assign(this, R.refs(kit, 'j8', ['body', 'head', 'eyes', 'mouth', 'dw', 'a']));
    this.hand = kit.stage.querySelector('.j8d-hand');
    this.w = WHO.map((w, k) => kit.stage.querySelector('.j8-w' + k)); this.m = AMT.map((w, k) => kit.stage.querySelector('.j8-m' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the choice is hers: whom, what, how much; the dial swings from a lot, to a little, to not at all
    R.setG(this.dw, 780, 520, 2 * eob(seg(t, 0.6, 1.2), 1.4), eo(seg(t, 0.6, 0.8)));
    let a = 0;
    AMT.forEach(([w, s, deg], k) => { a = lerp(a, deg, eob(seg(t, s - 0.2, s + 0.5), 1.6)); });
    this.hand.setAttribute('transform', 'rotate(' + a + ')');
    WHO.forEach(([w, s, x], k) => R.place(this.w[k], x, lerp(162, 150, eo(seg(t, s, s + 0.4))), eo(seg(t, s, s + 0.4)) * (1 - eo(seg(t, 7.6, 8.0)))));
    AMT.forEach(([w, s, deg, x, y], k) => R.place(this.m[k], x, lerp(y + 12, y, eo(seg(t, s, s + 0.4))), eo(seg(t, s, s + 0.4))));
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 8, eio(seg(t, 0.6, 1.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.08, 1.5))), eo(seg(t, 1.08, 1.5)));
  },
});
