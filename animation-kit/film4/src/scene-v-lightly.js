const { seg, eo, eio, eob, lerp } = kit;
const WAYS = [[2.0, 'בקלילות', 820], [2.8, 'בסקרנות', 540], [4.6, 'עם קצת הומור', 260]];
// then the cards stream past: meet, choose, move on (kind ones join the voice, harsh ones drift off)
const FLOW = [['גם כמה דקות נחשבות', 1], ['פספסתי יום, אז מה הטעם', 0], ['לא צריך שיתחשק לי כדי להתחיל', 1], ['כמה דקות לא שוות את זה', 0], ['אין טעם לנסות, שום דבר לא ישתנה', 0]];
const STEPS = [[8.7, 'נפגוש', 760], [10.1, 'נבחר', 540], [10.7, 'נמשיך', 320]];
kit.scene('v-lightly', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('vt', 0) +
      '<g class="vt-vg">' + R.voice('vt-v') + '</g></svg>' +
      WAYS.map((w, k) => '<div class="tag tag-warm vt-w' + k + '">' + w[1] + '</div>').join('') +
      FLOW.map((f, k) => '<div class="thought xs ' + (f[1] ? 'kind ' : '') + 'vt-f' + k + '">' + f[0] + '</div>').join('') +
      STEPS.map((s, k) => '<div class="tag tag-cool vt-s' + k + '">' + s[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'vt', ['body', 'head', 'eyes', 'mouth', 'vg', 'w0', 'w1', 'w2', 'f0', 'f1', 'f2', 'f3', 'f4', 's0', 's1', 's2']));
    this.v = R.refs(kit, 'vt-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-6 2 Q10 16 26 2');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.1); R.blink(this.v.eyes, t, 0.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    const VX = 740, VY = 400 + Math.sin(t * 2.2) * 8;
    let hop = 0;
    FLOW.forEach(([, kind], k) => {
      const a = 5.4 + k * 1.35, el = this['f' + k];
      const arrive = eio(seg(t, a, a + 0.6)), leave = eio(seg(t, a + 0.9, a + 1.5));
      let x = lerp(1300, 540, arrive), y = 190, s = 1, o = 1;
      if (kind) { x = lerp(x, VX, leave); y = lerp(y, VY, leave); s = lerp(1, 0.15, leave); o = 1 - eo(seg(t, a + 1.35, a + 1.5)); }
      else { y = lerp(y, -200, leave); x = lerp(x, 420, leave); o = 1 - eo(seg(t, a + 1.1, a + 1.5)); }
      R.put(el, x, y, s, kind ? 0 : -leave * 10, t < a ? 0 : o);
      if (kind) { const h = Math.max(0, t - (a + 1.5)); if (t > a + 1.5) hop += Math.sin(h * 14) * Math.exp(-h * 7) * 0.12; }
    });
    this.vg.setAttribute('transform', 'translate(' + VX + ' ' + VY + ') scale(' + (1.25 + hop) + ')');
    this.head.setAttribute('transform', 'rotate(' + (t > 5.4 ? -4 + 4 * Math.sin(t * 2.3) : 6 * Math.sin(t * 0.8)) + ' 0 30)');
    WAYS.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(84, 70, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)) * (1 - eo(seg(t, 5.0, 5.4)))));
    STEPS.forEach(([a, , x], k) => R.place(this['s' + k], x, lerp(972, 960, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
