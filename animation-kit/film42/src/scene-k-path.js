const { seg, eo, eio, eob, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('k-path', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('kp') +
      '<g class="kp-walker"><g class="kp-a">' + R.ruthBack('kp-a', false) + '</g><g class="kp-b">' + R.ruthBack('kp-b', true) + '</g></g>' +
      '<g class="kp-t0">' + R.tool('kp-h', 3, 76) + '</g><g class="kp-t1">' + R.tool('kp-p', 0, 76) + '</g></svg>' +
      '<div class="tag tag-cool kp-cap">נכיר ונתרגל דרכים לדאוג לעצמנו</div><div class="tag tag-warm kp-l0">במה שאנחנו בוחרים לעשות</div><div class="tag kp-l1">בדרך שבה אנחנו מתייחסים לעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'kp', ['walker', 'a', 'b', 't0', 't1', 'l0', 'l1', 'cap']));
  },
  render(t) {
    // along the way: Ruth walks on up her path
    const k = lerp(0.1, 1.4, seg(t, 0.5, 12.5)), [x, y, r] = onPath(k), s = 0.66 * r / 130;
    const step = Math.floor(t * 1.6) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y - Math.abs(Math.sin(t * Math.PI * 1.6)) * 6) + ') scale(' + s + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)));
    // in what we choose to do, and in how we treat ourselves
    R.xf(this.t0, 800, 250 + Math.sin(t * 1.5) * 6, eob(seg(t, 7.5, 8.1), 1.7), eo(seg(t, 7.5, 7.7)));
    R.place(this.l0, 800, lerp(352, 340, eo(seg(t, 7.7, 8.2))), eo(seg(t, 7.7, 8.2)));
    R.xf(this.t1, 300, 330 + Math.sin(t * 1.5 + 1) * 6, eob(seg(t, 10.3, 10.9), 1.7), eo(seg(t, 10.3, 10.5)));
    R.place(this.l1, 300, lerp(432, 420, eo(seg(t, 10.5, 11.0))), eo(seg(t, 10.5, 11.0)));
  },
});
