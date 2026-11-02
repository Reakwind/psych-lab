const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
// tasks, things to remember, people to look after — then, with Parkinson's, medication, appointments, treatments
const BL = [[1.3, 1, 'משימות'], [3.8, 2, 'דברים לזכור'], [4.4, 3, 'אנשים לדאוג להם']];
const PK = [[11.8, 750, 'תרופות'], [12.4, 590, 'תורים'], [13.0, 430, 'טיפולים']];
const PILL = '<g transform="translate(0 -4)"><rect x="-30" y="-14" width="60" height="28" rx="14" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/><path d="M-30 0 a14 14 0 0 1 14 -14 h14 v28 h-14 a14 14 0 0 1 -14 -14Z" style="fill:#D96C6C"/></g>';
kit.scene('w-tasks', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wt', 0) + R.dayBar('wt', 220) +
      '<g class="wt-w0">' + R.warm('wt-t0', 'mug') + '</g><g class="wt-w1">' + R.warm('wt-t1', 'note') + '</g>' +
      '<g transform="translate(830 220)">' + R.grey('wt-g0', 150) + '</g>' + BL.map((b, k) => R.grey('wt-b' + k, 136)).join('') + R.grey('wt-b3', 136) +
      PK.map((p, k) => '<g class="wt-p' + k + '">' + R.grey('wt-pg' + k, 130) + (k === 0 ? PILL : k === 1 ? '<g transform="translate(0 -2) scale(.42)">' + R.calendar('wt-cal') + '</g>' : '<path class="ink" style="stroke:var(--ground);stroke-width:10" d="M0 -22 V18 M-20 -2 H20"/>') + '</g>').join('') + '</svg>' +
      BL.map((b, k) => '<div class="tag wt-l' + k + '">' + b[2] + '</div>').join('') +
      '<div class="tag tag-cool wt-a">כשחיים עם פרקינסון</div><div class="tag tag-warm wt-pt">תרופות · תורים · טיפולים</div></div>'));
    Object.assign(this, R.refs(kit, 'wt', ['body', 'head', 'eyes', 'mouth', 'w0', 'w1', 'b0', 'b1', 'b2', 'b3', 'p0', 'p1', 'p2', 'l0', 'l1', 'l2', 'a', 'pt']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    // life fills with tasks; the good things are squeezed up off the line
    BL.forEach(([a, s], k) => {
      const p = eio(seg(t, a, a + 0.4));
      R.xf(this['b' + k], X[s], lerp(-60, 220, p), 1, eo(seg(t, a, a + 0.1)));
      R.place(this['l' + k], X[s], lerp(k % 2 ? 308 : 384, k % 2 ? 296 : 372, eo(seg(t, a + 0.2, a + 0.6))), eo(seg(t, a + 0.2, a + 0.6)));
    });
    const p3 = eio(seg(t, 7.6, 8.0));
    R.xf(this.b3, X[4], lerp(-60, 220, p3), 1, eo(seg(t, 7.6, 7.7)));
    const s0 = eio(seg(t, 1.2, 1.8)), s1 = eio(seg(t, 4.3, 4.9));
    R.xf(this.w0, lerp(680, 700, s0), 220 - 120 * s0 + Math.sin(t * 9) * 3 * s0, 1 - 0.25 * s0, 1 - eio(seg(t, 5.6, 7.2)));
    R.xf(this.w1, lerp(480, 420, s1), 220 - 120 * s1 + Math.sin(t * 9 + 1) * 3 * s1, 1 - 0.25 * s1, 1 - eio(seg(t, 5.6, 7.2)));
    // and with Parkinson's, more piles on top
    PK.forEach(([a, x], k) => R.xf(this['p' + k], x, lerp(-80, 146, eio(seg(t, a, a + 0.4))), 0.95, eo(seg(t, a, a + 0.1))));
    const sag = eio(seg(t, 12.0, 13.6));
    this.body.setAttribute('transform', 'translate(0 ' + 10 * sag + ') scale(1 ' + (kit.breathe(t, 0.008, 3.6) - 0.03 * sag) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 + 12 * sag) + ' 0 30) translate(0 ' + 10 * sag + ')');
    this.mouth.setAttribute('d', t > 7.8 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)) * (1 - eo(seg(t, 11.4, 11.7))));
    R.place(this.pt, 540, lerp(84, 70, eo(seg(t, 11.7, 12.2))), eo(seg(t, 11.7, 12.2)));
  },
});
