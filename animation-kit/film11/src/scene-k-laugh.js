const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-laugh', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k1') + R.pileSvg('k1', 0) + R.seated('k1', 0) + R.deckSvg('k1') + '</svg>' +
      R.qcard('k1-q', 'מי תמיד מצליח להצחיק אתכם?') + '<div class="tag tag-cool k1-t">מפגש 11 · קלפי שיחה</div></div>'));
    Object.assign(this, R.refs(kit, 'k1', ['body', 'head', 'eyes', 'mouth', 'q', 't']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // Ruth turns over the first card; the question makes her laugh
    R.riseCard(this.q, seg(t, 0.0, 0.9), 760, 330, 1, 3);
    const laugh = seg(t, 1.2, 2.6);
    this.head.setAttribute('transform', 'rotate(' + (lerp(0, 6, eo(seg(t, 0.3, 1.0))) + Math.sin(laugh * Math.PI * 6) * 3 * (laugh > 0 && laugh < 1 ? 1 : 0)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.2 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.t, 540, lerp(54, 40, eo(seg(t, 0.1, 0.5))), eo(seg(t, 0.1, 0.5)) * (1 - eo(seg(t, 3.4, 3.8))));
  },
});
