const { seg, eo, eio, eob, lerp } = kit;
// common tools for self-regulation; research shows they can help: less stress and anxiety, comfort and rest, sometimes sleep and coping with pain
const U = [['less', 'להפחית מתח וחרדה', 5.56, 880], ['rest', 'נוחות ומנוחה', 7.55, 670], ['bed', 'בשינה', 11.73, 460], ['pain', 'בהתמודדות עם כאב', 13.2, 230]];
kit.scene('g-uses', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g4', -200) + U.map((u, k) => R.cbadge('g4-u' + k, u[0], 56)).join('') + R.cbadge('g4-c0', 'relax', 64) + R.cbadge('g4-c1', 'imagery', 64) + '</svg>' +
      U.map((u, k) => '<div class="tag ' + (k < 2 ? 'tag-cool' : 'tag-warm') + ' g4-n' + k + '">' + u[1] + '</div>').join('') +
      '<div class="tag g4-d">הרפיה ודמיון מודרך</div><div class="tag tag-cool g4-a">כלים נפוצים לוויסות עצמי</div><div class="tag tag-warm g4-b">ומחקרים מראים שהם יכולים לעזור</div><div class="tag g4-c">במצבים מסוימים הם עשויים גם לסייע</div><div class="tag tag-red g4-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g4', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'c0', 'c1', 'd', 'a', 'b', 'c', 'ml']));
    this.u = U.map((u, k) => kit.stage.querySelector('.g4-u' + k)); this.n = U.map((u, k) => kit.stage.querySelector('.g4-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    // the two tools carry over from the plant shot, then step aside for what they can help with
    const away = eio(seg(t, 2.4, 3.4));
    [this.c0, this.c1].forEach((c, k) => R.setG(c, [800, 620][k], 340, 1.1 * (1 - away), 1 - away));
    R.place(this.d, 710, 430, 1 - away);
    U.forEach(([kind, w, a, x], k) => {
      R.setG(this.u[k], x, 230 + Math.sin(t * 1.4 + k) * 4, eob(seg(t, a - 0.2, a + 0.3), 1.6), eo(seg(t, a - 0.2, a)));
      const ty = k === 1 ? 382 : 312; R.place(this.n[k], x, lerp(ty + 12, ty, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    R.setMeter(this['mt-fill'], lerp(0.5, 0.28, eio(seg(t, 5.6, 7.0))));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.014, 4.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 3 * Math.sin(t * 0.7)) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.99, 1.4))), eo(seg(t, 0.99, 1.4)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 2.83, 3.2))), eo(seg(t, 2.83, 3.2)) * (1 - eo(seg(t, 8.8, 9.1))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 9.1, 9.5))), eo(seg(t, 9.1, 9.5)));
    R.place(this.ml, 975, 886, 1);
  },
});
