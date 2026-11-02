const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
const BL = [[4.9, 'סימפטומים'], [5.9, 'תרגולים'], [6.7, 'תורים'], [7.3, 'משימות'], [7.9, 'אחריות יומיומית']];
kit.scene('k-full', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ku', 0) + R.dayBar('ku', 220) +
      '<g class="ku-w0">' + R.warm('ku-wa', 'shoe') + '</g><g class="ku-w1">' + R.warm('ku-wb', 'people') + '</g>' +
      X.map((x, k) => R.grey('ku-g' + k, 136)).join('') + '</svg>' +
      BL.map((b, k) => '<div class="tag ku-t' + k + '">' + b[1] + '</div>').join('') + '<div class="tag tag-cool ku-a">לחיות עם פרקינסון כבר דורש לא מעט</div></div>'));
    Object.assign(this, R.refs(kit, 'ku', ['body', 'head', 'eyes', 'mouth', 'w0', 'w1', 'g0', 'g1', 'g2', 'g3', 'g4', 't0', 't1', 't2', 't3', 't4', 'a']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, 4.4, 4.8))));
    // the day fills with Parkinson's: symptoms, exercises, appointments, tasks, responsibility
    BL.forEach(([a], k) => {
      const p = eio(seg(t, a, a + 0.35));
      R.xf(this['g' + k], X[k], lerp(-60, 220, p) + (p >= 1 ? Math.sin(Math.min(1, (t - a - 0.35) * 4) * Math.PI) * -8 * (1 - seg(t, a + 0.35, a + 0.6)) : 0), 1, eo(seg(t, a, a + 0.1)));
      R.place(this['t' + k], X[k], lerp(k % 2 ? 372 : 296, k % 2 ? 360 : 284, eo(seg(t, a + 0.2, a + 0.6))), eo(seg(t, a + 0.2, a + 0.6)));
    });
    // the warm things are squeezed up and off the line
    const s0 = eio(seg(t, 5.8, 6.4)), s1 = eio(seg(t, 7.2, 7.8));
    R.xf(this.w0, 670, 220 - 110 * s0 + Math.sin(t * 9) * 4 * s0, 1 - 0.25 * s0);
    R.xf(this.w1, 350, 220 - 110 * s1 + Math.sin(t * 9 + 1) * 4 * s1, 1 - 0.25 * s1);
    const sag = eio(seg(t, 8.2, 9.4));
    this.body.setAttribute('transform', 'translate(0 ' + 10 * sag + ') scale(1 ' + (kit.breathe(t, 0.008, 3.6) - 0.03 * sag) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(-8, 6, sag) * eio(seg(t, 4.6, 5.2)) + ' 0 30) translate(0 ' + 10 * sag + ')');
    this.mouth.setAttribute('d', t > 8.4 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
  },
});
