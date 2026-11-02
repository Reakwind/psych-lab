const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-step', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j9', { sun: true }) + '<g class="j9-ra">' + R.packed('j9', false) + '</g><g class="j9-rb">' + R.packed('j9s', false, 'step') + '</g>' +
      '<g class="j9-fr">' + R.friend('j9f', 'a') + '</g></svg>' +
      '<div class="tag tag-cool j9-a">מישהו שהייתם רוצים שיהיה קצת יותר קרוב</div><div class="tag tag-warm j9-b">להתחיל בצעד קטן</div></div>'));
    Object.assign(this, R.refs(kit, 'j9', ['ra', 'rb', 'w', 'head', 'eyes', 'mouth', 'fr', 'a', 'b', 'st0-top']));
    this.s = R.refs(kit, 'j9s', ['w', 'eyes', 'mouth', 'head']); this.f = R.refs(kit, 'j9f', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.s.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2);
    // the friend waits a little way off; Ruth takes one small step onto her path, toward her, and the stone lights
    const st = eio(seg(t, 6.3, 7.3)), mid = st > 0.05 && st < 0.95;
    const x = lerp(300, 450, st);
    this.w.setAttribute('transform', 'translate(' + x + ' ' + (970 + 14 * st) + ')'); this.s.w.setAttribute('transform', 'translate(' + x + ' ' + (970 + 14 * st) + ')');
    this.ra.style.opacity = mid ? 0 : 1; this.rb.style.opacity = mid ? 1 : 0;
    R.litStone(this['st0-top'], eo(seg(t, 7.0, 7.8)));
    this.fr.setAttribute('transform', 'translate(880 930) scale(.92)');
    this.f.head.setAttribute('transform', 'rotate(' + (-8 + 4 * st) + ' 0 30)'); this.f.mouth.setAttribute('d', R.mouthHappy);
    [this.head, this.s.head].forEach((h) => h.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 3.0, 3.8))) + ' 0 30)'));
    [this.mouth, this.s.mouth].forEach((m) => m.setAttribute('d', t > 7.2 ? R.mouthHappy : R.mouthNeutral));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.0, 3.4))), eo(seg(t, 3.0, 3.4)));
    R.place(this.b, 540, lerp(152, 140, eo(seg(t, 6.31, 6.7))), eo(seg(t, 6.31, 6.7)));
  },
});
