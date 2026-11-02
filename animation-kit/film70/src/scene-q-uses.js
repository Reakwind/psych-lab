const { seg, eo, eio, eob, lerp } = kit;
// taking a break, recovering after effort, getting ready for sleep — across the day
const U = [['rest', 'לקחת הפסקה', 0.77, 840], ['recover', 'להתאושש אחרי מאמץ', 1.38, 540], ['bed', 'להתכונן לשינה', 3.3, 240]];
kit.scene('q-uses', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('qu', 760, []) + '<g class="qu-rw">' + R.ruth('qu-w', 'stand') + '</g>' +
      U.map((u, k) => R.cbadge('qu-c' + k, u[0], 80)).join('') + '</svg>' + U.map((u, k) => '<div class="tag tag-warm qu-n' + k + '">' + u[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'qu', ['curve', 'rw'])); this.w = R.refs(kit, 'qu-w', ['eyes', 'mouth']);
    this.c = U.map((u, k) => kit.stage.querySelector('.qu-c' + k)); this.n = U.map((u, k) => kit.stage.querySelector('.qu-n' + k));
  },
  render(t) {
    this.curve.style.opacity = 0;
    U.forEach(([, , a, x], k) => {
      R.setG(this.c[k], x, 390 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a - 0.2, a + 0.3), 1.6), eo(seg(t, a - 0.2, a)));
      R.place(this.n[k], x, lerp(262, 250, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    let wx = 990; U.forEach(([, , a, x]) => { wx = lerp(wx, x, eio(seg(t, a - 0.5, a + 0.2))); });
    const moving = U.some(([, , a]) => t > a - 0.5 && t < a + 0.2);
    this.rw.setAttribute('transform', 'translate(' + wx + ' ' + (756 - (moving ? Math.abs(Math.sin(t * 8)) * 5 : 0)) + ') scale(.55)');
    R.blink(this.w.eyes, t, 1.1); this.w.mouth.setAttribute('d', R.mouthHappy);
  },
});
