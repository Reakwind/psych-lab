const { seg, eo, eio, eob, lerp } = kit;
const B = [[3.8, 'זיכרונות', 900, 360], [4.8, 'תוכניות', 760, 200], [5.6, 'דאגות', 540, 190], [6.3, 'שאלות', 320, 230], [7.0, 'משאלות', 170, 400]];
kit.scene('o-mind', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('om', 0) + B.map((b, k) => R.string('om-s' + k) + '<g class="om-b' + k + '">' + R.balloon('om-bl' + k) + '</g>').join('') + '</svg>' +
      B.map((b, k) => '<div class="tag om-w' + k + '">' + b[1] + '</div>').join('') + '<div class="tag tag-cool om-title">מפגש 10 · התבוננות במחשבות</div><div class="tag tag-warm om-non">המוח מייצר מחשבות בלי הפסקה</div></div>'));
    Object.assign(this, R.refs(kit, 'om', ['body', 'head', 'eyes', 'mouth', 'title', 'non']));
    this.b = B.map((b, k) => kit.stage.querySelector('.om-b' + k)); this.s = B.map((b, k) => kit.stage.querySelector('.om-s' + k)); this.w = B.map((b, k) => kit.stage.querySelector('.om-w' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // one thought after another floats up: memories, plans, worries, questions, wishes
    B.forEach(([a, , x, y], k) => {
      const p = eio(seg(t, a - 0.6, a + 0.2)), bx = lerp(500, x, p), by = lerp(470, y, p) + Math.sin(t * 1.5 + k) * 8;
      R.setBal(this.b[k], bx, by, lerp(0.4, 1.3, p), eo(seg(t, a - 0.5, a - 0.3)));
      this.s[k].setAttribute('d', R.strD(500, 470, bx, by + 30)); this.s[k].style.opacity = 0.55 * eo(seg(t, a - 0.5, a - 0.3));
      R.place(this.w[k], x, lerp(y + 70, y + 58, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.9) * 5 + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 1.8, 2.2))));
    R.place(this.non, 540, lerp(84, 70, eo(seg(t, 2.2, 2.6))), eo(seg(t, 2.2, 2.6)));
  },
});
