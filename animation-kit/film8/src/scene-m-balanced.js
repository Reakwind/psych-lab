const { seg, eo, eio, eob, lerp } = kit;
const C = [[0.8, '"מאוד קשה לי שכבר אי אפשר להכין הכל לבד.', 190], [5.3, 'הלוואי שזה היה אחרת.', 380], [7.7, 'ובכל זאת, הדבר שהכי חשוב לי בארוחות האלה הוא שנהיה כולנו יחד."', 590]];
kit.scene('m-balanced', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080" style="filter:grayscale(.85)">' + R.talRoom('mb') + '<path class="mb-dark dark"/></svg>' +
      C.map((c, k) => '<div class="thought sm kind mb-c' + k + '">' + c[1] + '</div>').join('') + '<div class="tag tag-cool mb-e">למשל</div></div>'));
    Object.assign(this, R.refs(kit, 'mb', ['serve', 't-head', 't-eyes', 't-mouth', 'dark', 'c0', 'c1', 'c2', 'e']));
    this.serve.style.opacity = 0;
    this.fe = [0, 1, 2].map((k) => kit.stage.querySelector('.mb-f' + k + '-eyes'));
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.5); this.fe.forEach((e, k) => R.blink(e, t, 1.3 + k * 0.7));
    // Tal's balanced thought, word for word; on "that we'll all be together" the light opens onto the whole table
    const w = eio(seg(t, 11.4, 13.0));
    this.dark.setAttribute('d', R.spotD(800, 780, lerp(300, 1400, w)));
    this.dark.style.opacity = 0.74 * (1 - eo(seg(t, 12.4, 13.2)));
    const out = eo(seg(t, 10.9, 11.4)), mv = eio(seg(t, 11.0, 12.0));
    C.forEach(([a, , y], k) => {
      const p = eob(seg(t, a, a + 0.6), 1.5), o = eo(seg(t, a, a + 0.3)) * (k < 2 ? 1 - out : 1);
      const yy = k < 2 ? y : lerp(y, 220, mv), xx = k < 2 ? 300 : lerp(300, 540, mv);
      R.put(this['c' + k], xx, yy + (1 - eo(seg(t, a, a + 0.6))) * 50, (0.3 + 0.7 * p) * (k < 2 ? 1 : lerp(1, 1.15, mv)), 0, o);
    });
    this['t-head'].setAttribute('transform', 'rotate(' + lerp(-12, 6, eio(seg(t, 7.8, 9.0))) + ' 0 30)');
    this['t-mouth'].setAttribute('d', t > 11.6 ? 'M-12 24 Q2 36 16 24' : t > 7.8 ? 'M-10 26 Q2 32 14 26' : 'M-10 30 Q2 25 14 30');
    R.place(this.e, 540, lerp(30, 18, eo(seg(t, 0.2, 0.6))), eo(seg(t, 0.2, 0.6)) * (1 - eo(seg(t, 10.6, 11.0))));
  },
});
