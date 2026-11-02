const { seg, eo, eio, lerp } = kit;
kit.scene('together', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('together') +
      R.bagDown('together-bag') + R.pile('together') +
      '<g transform="translate(360 964)">' + R.armsFree(R.ruth('together-r', 'stand'), 'together-r') + '</g>' +
      '<g class="together-nira"><g class="together-na">' + R.armsFree(R.nira('together-n', 'stand'), 'together-n') + '</g><g class="together-nb">' + R.nira('together-m', 'step') + '</g></g>' +
      '</svg><div class="tag tag-cool together-cap">מתרגלים יחד</div><div class="tag together-theory">לא רק בתיאוריה</div></div>'));
    Object.assign(this, R.refs(kit, 'together', ['nira', 'na', 'nb', 'cap', 'theory']));
    this.r = R.refs(kit, 'together-r', ['armL', 'armR', 'head', 'eyes', 'mouth']);
    this.n = R.refs(kit, 'together-n', ['armL', 'armR', 'eyes', 'head']);
    this.m = R.refs(kit, 'together-m', ['eyes']);
    this.r.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.r.eyes, t, 0.9); R.blink(this.n.eyes, t, 2.1); R.blink(this.m.eyes, t, 2.1);
    // Nira walks up the path to join Ruth
    const come = eio(seg(t, 0.4, 2.6)), walking = come > 0 && come < 1;
    const x = lerp(1240, 860, come);
    this.nira.setAttribute('transform', 'translate(' + x + ' ' + (958 + (walking ? Math.abs(Math.sin(t * 7)) * -6 : 0)) + ')');
    this.na.style.opacity = walking ? 0 : 1; this.nb.style.opacity = walking ? 1 : 0;
    this.r.head.setAttribute('transform', 'rotate(' + (-7 * eio(seg(t, 1.2, 2.0))) + ' 0 30)');
    // ...and they breathe in together, arms rising, then let it go
    const br = eio(seg(t, 3.2, 4.6)) * (1 - eio(seg(t, 4.9, 6.1)));
    R.raise(this.r, br * 0.9); R.raise(this.n, br * 0.9);
    R.place(this.theory, 540, lerp(110, 96, eo(seg(t, 0.6, 1.2))), eo(seg(t, 0.6, 1.2)) * (1 - eo(seg(t, 2.6, 3.0))));
    R.place(this.cap, 540, lerp(110, 96, eo(seg(t, 3.0, 3.6))), eo(seg(t, 3.0, 3.6)));
  },
});
