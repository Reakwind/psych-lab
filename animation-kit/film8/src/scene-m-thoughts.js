const { seg, eo, eio, eob, lerp } = kit;
const C = [[2.2, '"אם אי אפשר לארח כמו פעם, אז מה הטעם?"', 200, 620], [5.7, '"זה כבר לא יהיה אותו דבר. אף אחד לא ייהנה."', 420, 440], [11.8, '"שום דבר כבר לא מצליח לי כמו שצריך."', 640, 300]];
kit.scene('m-thoughts', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.talRoom('mo') + '<path class="mo-dark dark"/></svg>' +
      C.map((c, k) => '<div class="thought sm mo-c' + k + '">' + c[1] + '</div>').join('') + '<div class="tag tag-cool mo-q">ואז עולות לטל מחשבות</div></div>'));
    Object.assign(this, R.refs(kit, 'mo', ['tal', 'serve', 't-head', 't-eyes', 't-mouth', 'dark', 'c0', 'c1', 'c2', 'q']));
    this.serve.style.opacity = 0; this.art = kit.stage.querySelector('.art');
    this.fe = [0, 1, 2].map((k) => kit.stage.querySelector('.mo-f' + k + '-eyes'));
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.5); this.fe.forEach((e, k) => R.blink(e, t, 1.3 + k * 0.7));
    // each thought narrows the light, until only Tal and the pots are left in it; the colour drains with it
    let r = 1400;
    C.forEach(([a, , , rr], k) => { const p = eio(seg(t, a, a + 1.2)); if (p > 0) r = lerp(k ? C[k - 1][3] : 1400, rr, p); });
    this.dark.setAttribute('d', R.spotD(800, 780, r));
    this.dark.style.opacity = 0.74 * eo(seg(t, 2.2, 3.0));
    this.art.style.filter = 'grayscale(' + 0.85 * eio(seg(t, 2.2, 13.0)) + ')';
    C.forEach(([a, , y], k) => { const p = eob(seg(t, a, a + 0.6), 1.5); R.put(this['c' + k], 300, y + (1 - eo(seg(t, a, a + 0.6))) * 50, 0.3 + 0.7 * p, 0, eo(seg(t, a, a + 0.3))); });
    this['t-head'].setAttribute('transform', 'rotate(' + lerp(-4, -12, eio(seg(t, 2, 4))) + ' 0 30) translate(0 ' + 8 * eio(seg(t, 11.8, 12.8)) + ')');
    this['t-mouth'].setAttribute('d', 'M-10 31 Q2 23 14 31');
    R.place(this.q, 540, lerp(30, 18, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 2.0, 2.3))));
  },
});
