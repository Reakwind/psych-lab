const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-learn', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k3') + R.pileSvg('k3', 1) + R.seated('k3', 0) + R.deckSvg('k3') +
      '<g class="k3-bw">' + R.bubble('k3-bb', R.placePic('k3-p')) + '</g><g class="k3-sw">' + R.bubble('k3-sb', '<circle r="150" class="amber-lt" opacity=".35"/><g transform="scale(1.6)">' + R.spark('k3') + '</g>') + '</g></svg>' +
      R.qcard('k3-q2', 'לאיזה מקום או רגע הייתם שמחים לחזור?') + R.qcard('k3-q3', 'ומה תמיד רציתם ללמוד אבל עוד לא יצא לכם?') + '</div>'));
    Object.assign(this, R.refs(kit, 'k3', ['body', 'head', 'eyes', 'mouth', 'q2', 'q3', 'pc1', 'bb', 'bb-p0', 'bb-p1', 'bb-p2', 'sb', 'sb-p0', 'sb-p1', 'sb-p2', 'glow', 'star', 'ring']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the place closes; the third card asks what she always wanted to learn, and a spark lights in her thoughts
    R.toPile(this.q2, seg(t, 0.1, 0.8), 760, 330, -3, 1, this.pc1);
    R.riseCard(this.q3, seg(t, 0.5, 1.4), 760, 330, 1, 2);
    const shut = 1 - eio(seg(t, 0.0, 0.5));
    R.setG(this.bb, 270, 300, shut, shut);
    const pts = [[450, 444], [424, 424], [396, 404]];
    pts.forEach(([x, y], k) => {
      const c = this['bb-p' + (2 - k)]; c.setAttribute('cx', x); c.setAttribute('cy', y); c.style.opacity = shut;
      const d = this['sb-p' + (2 - k)]; d.setAttribute('cx', x); d.setAttribute('cy', y); d.style.opacity = eo(seg(t, 1.5 + k * 0.12, 1.7 + k * 0.12));
    });
    const pop = eob(seg(t, 1.8, 2.4), 1.5);
    R.setG(this.sb, 270, 300 + Math.sin(t * 1.2) * 5, pop, eo(seg(t, 1.8, 2.0)));
    this.glow.setAttribute('transform', 'scale(' + (1 + 0.12 * Math.sin(t * 4)) + ')');
    this.star.setAttribute('transform', 'rotate(' + t * 20 + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(-6, 4, eio(seg(t, 0.4, 1.2))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.4 ? R.mouthHappy : R.mouthNeutral);
  },
});
