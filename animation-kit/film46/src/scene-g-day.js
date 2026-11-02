const { seg, eo, eio, eob, lerp } = kit;
// Ruth's day fills with things that need attention: plans, tasks, things to take care of
const T = [[3.9, 830, 'cal', 'תוכניות'], [4.5, 540, 'list', 'משימות'], [5.1, 250, 'alert', 'עניינים שצריך לדאוג להם']];
kit.scene('g-day', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gd', -120) + R.dayBar('gd', 220) +
      T.map((b, k) => '<g class="gd-b' + k + '">' + R.task('gd-t' + k, b[2]) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool gd-title">מפגש 46 · רגע של הכרת תודה</div><div class="tag gd-a">דברים שדורשים תשומת לב</div>' +
      T.map((b, k) => '<div class="tag gd-l' + k + '">' + b[3] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'gd', ['body', 'head', 'eyes', 'mouth', 'line', 'sun', 'moon', 'title', 'a', 'l0', 'l1', 'l2']));
    this.b = T.map((_, k) => kit.stage.querySelector('.gd-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the day: a line from morning (right) to evening (left)
    const d = eio(seg(t, 0.3, 1.3));
    this.line.setAttribute('transform', 'translate(' + 970 * (1 - d) + ' 0) scale(' + d + ' 1)');
    this.sun.style.opacity = eo(seg(t, 0.2, 0.6)); this.moon.style.opacity = eo(seg(t, 1.1, 1.5));
    T.forEach(([a, x], k) => {
      const p = eob(seg(t, a - 0.3, a + 0.2), 1.4);
      R.xf(this.b[k], x, lerp(60, 220, eio(seg(t, a - 0.3, a + 0.1))), 0.8 + 0.2 * p, eo(seg(t, a - 0.3, a - 0.1)));
      R.place(this['l' + k], x, lerp(312, 300, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    // her head turns from one to the next
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 3.8, 4.4)) - 6 * eio(seg(t, 4.8, 5.4))) + ' 0 30) translate(0 -4)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)) * (1 - eo(seg(t, 1.6, 1.9))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
  },
});
