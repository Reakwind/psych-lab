const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-place', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k2') + R.pileSvg('k2', 0) + R.seated('k2', 0) + R.deckSvg('k2') +
      '<g class="k2-bw">' + R.bubble('k2-bb', R.placePic('k2-p')) + '</g></svg>' +
      R.qcard('k2-q1', 'מי תמיד מצליח להצחיק אתכם?') + R.qcard('k2-q2', 'לאיזה מקום או רגע הייתם שמחים לחזור?') + '</div>'));
    Object.assign(this, R.refs(kit, 'k2', ['body', 'head', 'eyes', 'mouth', 'q1', 'q2', 'pc0', 'bb', 'bb-p0', 'bb-p1', 'bb-p2', 'p-sun']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the first card goes onto the pile; the second asks for a place, and a picture of her path opens in her thoughts
    R.toPile(this.q1, seg(t, 0.1, 0.8), 760, 330, 3, 0, this.pc0);
    R.riseCard(this.q2, seg(t, 0.5, 1.4), 760, 330, 1, -3);
    [[450, 444], [424, 424], [396, 404]].forEach(([x, y], k) => { const c = this['bb-p' + (2 - k)]; c.setAttribute('cx', x); c.setAttribute('cy', y); c.style.opacity = eo(seg(t, 1.6 + k * 0.15, 1.8 + k * 0.15)); });
    const pop = eob(seg(t, 2.0, 2.6), 1.5);
    R.setG(this.bb, 270, 300 + Math.sin(t * 1.2) * 5, pop, eo(seg(t, 2.0, 2.2)));
    this['p-sun'].setAttribute('transform', 'translate(0 ' + lerp(60, 0, eio(seg(t, 2.4, 4.0))) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(6, -6, eio(seg(t, 1.6, 2.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.0 ? R.mouthHappy : R.mouthNeutral);
  },
});
