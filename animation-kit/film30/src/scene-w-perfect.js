const { seg, eo, eio, eob, lerp } = kit;
// part 16: the beautiful part — no need to practise perfectly: the picture-perfect meditator (3a) slips off the wall; Ruth smiles as she is
kit.scene('w-perfect', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('wc', -200) + '<g class="wc-pf">' + R.perfect('wc') + '</g></svg>' +
      '<div class="tag tag-warm wc-np">לא צריך לתרגל בצורה מושלמת</div><div class="tag tag-cool wc-tr">כדי לאמן את המוח</div></div>'));
    Object.assign(this, R.refs(kit, 'wc', ['body', 'head', 'eyes', 'mouth', 'pf', 'np', 'tr']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the perfect picture tilts, then slides down and away
    const tilt = eio(seg(t, 1.7, 2.4)), fall = eio(seg(t, 2.6, 3.8));
    this.pf.setAttribute('transform', 'translate(' + (800 + 60 * fall) + ' ' + (330 + 700 * fall) + ') rotate(' + (8 * tilt + 30 * fall) + ' 0 -150)');
    this.pf.style.opacity = 1 - eo(seg(t, 3.0, 3.8));
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 3.0, 3.8))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.np, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    R.place(this.tr, 540, lerp(952, 940, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});
