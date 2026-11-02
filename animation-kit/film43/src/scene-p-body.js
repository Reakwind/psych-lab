const { seg, eo, eio, eob, lerp } = kit;
const CHS = [[820, 'heart', 'רגש'], [540, 'body', 'גוף'], [260, 'mind', 'מחשבות']], LIT = 1;
kit.scene('p-body', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<ellipse class="q1-glow" cx="500" cy="640" rx="110" ry="130" style="fill:var(--accent);opacity:0"/>' + R.seated('q1', 0) +
      '<g transform="translate(880 590) scale(.62)">' + R.memory('q1-m', R.coffee('q1-cf')) + '</g>' +
      CHS.map((c, k) => '<g class="q1-c' + k + '"><circle class="q1-h' + k + '" r="104" style="fill:var(--accent);opacity:0"/>' + R.badge('q1-bd' + k, R.CH[c[1]]) + '</g>').join('') + '</svg>' +
      CHS.map((c, k) => '<div class="tag q1-t' + k + '">' + c[2] + '</div>').join('') + '<div class="tag tag-warm q1-q">איפה הרגשתי את זה בגוף?</div></div>'));
    Object.assign(this, R.refs(kit, 'q1', ['body', 'head', 'eyes', 'mouth', 'glow', 'c0', 'c1', 'c2', 'h0', 'h1', 'h2', 't0', 't1', 't2', 'q']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5 + LIT);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (LIT === 1 ? 6 : -4) * eio(seg(t, 0.4, 1.2)) + ' 0 30) translate(0 ' + (LIT === 1 ? 6 : 0) * eio(seg(t, 0.4, 1.2)) + ')');
    // one channel at a time: this one lights, the others rest
    const on = eio(seg(t, 0.9, 0.9 + 0.6));
    CHS.forEach(([x], k) => {
      const me = k === LIT;
      R.xf(this['c' + k], x, 250 + Math.sin(t * 1.4 + k) * 6, me ? 1 + 0.15 * on : 1, me ? 1 : 1 - 0.5 * on);
      this['h' + k].style.opacity = me ? 0.3 * on * (0.85 + 0.15 * Math.sin(t * 3)) : 0;
      R.place(this['t' + k], x, 340, me ? 1 : 1 - 0.5 * on);
    });
    if (LIT === 1) this.glow.style.opacity = 0.3 * on * (0.85 + 0.15 * Math.sin(t * 2.4));
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
  },
});
