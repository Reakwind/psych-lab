const { seg, eo, eio, eob, lerp } = kit;
// the activities give a moment to remember things that do us good — things we may not have thought about for a long time
const B = [[2.9, 220, 300, 0, false], [3.6, 860, 300, 1, false], [5.72, 540, 175, 3, true]];
kit.scene('y-remember', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ym', 0) +
      B.map((b, k) => '<g class="ym-tr' + k + '">' + [0, 1, 2].map((i) => '<circle r="' + (8 + i * 5) + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/>').join('') + '</g>' +
        '<g class="ym-b' + k + '"><circle r="98" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>' + R.matter('ym-m' + k, R.WANT[b[3] === 3 ? 2 : b[3]], 70) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm ym-a">להיזכר בדברים שעושים לנו טוב</div><div class="tag ym-c">דברים שאולי הרבה זמן לא חשבנו עליהם</div></div>'));
    Object.assign(this, R.refs(kit, 'ym', ['body', 'head', 'eyes', 'mouth', 'a', 'c']));
    this.b = B.map((b, k) => kit.stage.querySelector('.ym-b' + k)); this.tr = B.map((b, k) => kit.stage.querySelector('.ym-tr' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.2) + ')');
    if (t > 0.6) R.shut(this.eyes); else R.blink(this.eyes, t, 0.3);
    this.head.setAttribute('transform', 'rotate(' + 3 * Math.sin(t * 0.7) + ' 0 30) translate(0 -3)');
    this.mouth.setAttribute('d', t > 3.0 ? R.BIG : R.SMILE);
    B.forEach(([a, x, y, , old], k) => {
      const p = eob(seg(t, a, a + 0.6), 1.5);
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + (y + 8 * Math.sin(t * 1.3 + k)) + ') scale(' + Math.max(0.001, p) + ')');
      this.b[k].style.opacity = eo(seg(t, a, a + 0.2));
      this.b[k].style.filter = old ? 'grayscale(' + (1 - eio(seg(t, 7.4, 8.6))) + ')' : '';
      // a trail of small bubbles back to her head
      const hx = 500, hy = 430;
      [...this.tr[k].children].forEach((c, i) => { const f = 0.25 + i * 0.22; c.setAttribute('cx', lerp(hx, x, f)); c.setAttribute('cy', lerp(hy, y + 80, f)); });
      this.tr[k].style.opacity = eo(seg(t, a - 0.3, a));
    });
    R.place(this.a, 540, lerp(952, 940, eo(seg(t, 2.89, 3.3))), eo(seg(t, 2.89, 3.3)));
    R.place(this.c, 540, lerp(1032, 1020, eo(seg(t, 7.41, 7.8))), eo(seg(t, 7.41, 7.8)));
  },
});
