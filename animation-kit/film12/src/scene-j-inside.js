const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-inside', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j1', { sun: true }) + R.packed('j1', true) + '<g class="j1-fr">' + R.friend('j1f', 'a') + '</g></svg>' +
      '<div class="tag tag-cool j1-t">מפגש 12 · לשתף מישהו קרוב בדרך</div><div class="tag j1-a">רואים הרבה ממה שאנחנו עוברים</div><div class="tag tag-warm j1-b">איך זה מרגיש מבפנים</div></div>'));
    Object.assign(this, R.refs(kit, 'j1', ['w', 'bd', 'pack', 'straps', 'xray', 'head', 'eyes', 'mouth', 'fr', 't', 'a', 'b']));
    this.f = R.refs(kit, 'j1f', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2);
    // a close friend beside Ruth on her path sees a lot; how it feels inside (the weights in the pack) only we can see
    const sag = eio(seg(t, 6.6, 7.8));
    this.w.setAttribute('transform', 'translate(380 ' + (970 + 6 * sag) + ')');
    this.bd.setAttribute('transform', 'scale(1 ' + (1 - 0.02 * sag) + ')');
    this.pack.setAttribute('transform', 'translate(0 ' + 12 * sag + ')'); this.straps.setAttribute('transform', 'translate(0 ' + 5 * sag + ')'); this.xray.setAttribute('transform', 'translate(0 ' + 12 * sag + ')');
    this.xray.style.opacity = eo(seg(t, 6.5, 7.3));
    this.head.setAttribute('transform', 'rotate(' + (4 * sag) + ' 0 30) translate(0 ' + 6 * sag + ')');
    this.mouth.setAttribute('d', sag > 0.5 ? R.mouthSad : R.mouthNeutral);
    this.fr.setAttribute('transform', 'translate(760 976)');
    this.f.head.setAttribute('transform', 'rotate(' + (-7 + Math.sin(t * 0.9) * 3) + ' 0 30)');
    this.f.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.t, 540, lerp(54, 40, eo(seg(t, 0.1, 0.5))), eo(seg(t, 0.1, 0.5)) * (1 - eo(seg(t, 3.3, 3.7))));
    R.place(this.a, 760, lerp(372, 360, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)) * (1 - eo(seg(t, 5.6, 6.0))));
    R.place(this.b, 380, lerp(372, 360, eo(seg(t, 6.6, 7.0))), eo(seg(t, 6.6, 7.0)));
  },
});
