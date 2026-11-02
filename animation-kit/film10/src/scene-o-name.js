const { seg, eo, eio, eob, lerp } = kit;
const B = [[0.3, '"זה זיכרון"', 4.9, 840, 230], [2.2, '"זה תכנון"', 5.9, 620, 170], [3.4, '"זאת דאגה"', 7.1, 400, 230]];
kit.scene('o-name', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<ellipse class="on-glow" cx="380" cy="640" rx="120" ry="110" style="fill:var(--accent);opacity:0"/><ellipse class="on-feet" cx="430" cy="860" rx="110" ry="22" style="fill:var(--accent);opacity:0"/>' +
      R.seated('on', -120) + B.map((b, k) => '<g class="on-b' + k + '">' + R.balloon('on-bl' + k) + '</g>').join('') + '</svg>' +
      B.map((b, k) => '<div class="tag tag-warm on-w' + k + '">' + b[1] + '</div>').join('') +
      '<div class="tag tag-cool on-a">שמים לב: הנה מחשבה</div><div class="tag on-n">נותנים לה שם</div><div class="tag tag-cool on-r">וחוזרים לנשימה, או לתחושה בגוף</div></div>'));
    Object.assign(this, R.refs(kit, 'on', ['body', 'head', 'eyes', 'mouth', 'glow', 'feet', 'a', 'n', 'r']));
    this.b = B.map((b, k) => kit.stage.querySelector('.on-b' + k)); this.w = B.map((b, k) => kit.stage.querySelector('.on-w' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // notice it, name it, and come back to the breath; the named thoughts drift a little further off
    const back = eio(seg(t, 8.2, 9.6));
    B.forEach(([a, , n, x, y], k) => {
      R.setBal(this.b[k], x, y - 60 * back + Math.sin(t * 1.3 + k) * 8, eob(seg(t, a, a + 0.6), 1.6) * lerp(1.6, 1.2, back), lerp(1, 0.55, back));
      R.place(this.w[k], x, lerp(y + 64, y + 52, eo(seg(t, n, n + 0.4))) - 60 * back, eo(seg(t, n, n + 0.4)) * lerp(1, 0.7, back));
    });
    this.head.setAttribute('transform', 'rotate(' + lerp(8, 0, back) + ' 0 30)');
    this.body.setAttribute('transform', 'scale(1 ' + (t > 8.2 ? kit.breathe(t - 8.2, 0.03 * back, 3.2) : 1) + ')');
    this.glow.style.opacity = 0.25 * back * (1 - eo(seg(t, 10.3, 10.9)));
    this.feet.style.opacity = 0.45 * eo(seg(t, 10.4, 11.0));
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.7))), eo(seg(t, 0.3, 0.7)) * (1 - eo(seg(t, 3.5, 3.8))));
    R.place(this.n, 540, lerp(84, 70, eo(seg(t, 3.8, 4.2))), eo(seg(t, 3.8, 4.2)) * (1 - eo(seg(t, 8.0, 8.3))));
    R.place(this.r, 540, lerp(84, 70, eo(seg(t, 8.3, 8.7))), eo(seg(t, 8.3, 8.7)));
  },
});
