const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-need', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j2', { sun: true }) + R.packed('j2', true) + '<g class="j2-fr">' + R.friend('j2f', 'a') + '</g><g class="j2-q">' + R.qCloud('j2-qc') + '</g></svg>' +
      '<div class="tag tag-warm j2-b">איך זה מרגיש מבפנים</div><div class="tag tag-cool j2-a">לא תמיד יכול לדעת מה אתם צריכים</div></div>'));
    Object.assign(this, R.refs(kit, 'j2', ['w', 'bd', 'pack', 'straps', 'xray', 'head', 'eyes', 'mouth', 'fr', 'q', 'a', 'b']));
    this.f = R.refs(kit, 'j2f', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2);
    // the see-through view fades; even someone who knows her well can't tell what she needs
    const sag = 1 - eio(seg(t, 0.6, 1.8));
    this.w.setAttribute('transform', 'translate(380 ' + (970 + 6 * sag) + ')');
    this.bd.setAttribute('transform', 'scale(1 ' + (1 - 0.02 * sag) + ')');
    this.pack.setAttribute('transform', 'translate(0 ' + 12 * sag + ')'); this.straps.setAttribute('transform', 'translate(0 ' + 5 * sag + ')'); this.xray.setAttribute('transform', 'translate(0 ' + 12 * sag + ')');
    this.xray.style.opacity = 1 - eo(seg(t, 0.2, 1.0));
    this.head.setAttribute('transform', 'rotate(' + (4 * sag + 6 * eio(seg(t, 2.8, 3.6))) + ' 0 30) translate(0 ' + 6 * sag + ')');
    this.mouth.setAttribute('d', sag > 0.5 ? R.mouthSad : R.mouthNeutral);
    this.fr.setAttribute('transform', 'translate(760 976)');
    this.f.head.setAttribute('transform', 'rotate(' + lerp(-7, 6, eio(seg(t, 2.6, 3.4))) + ' 0 30)');
    this.f.mouth.setAttribute('d', 'M-8 28 Q2 26 12 28');
    R.setG(this.q, 830, 360 + Math.sin(t * 1.5) * 6, 1.25 * eob(seg(t, 2.9, 3.5), 1.6), eo(seg(t, 2.9, 3.1)));
    R.place(this.b, 380, 360, 1 - eo(seg(t, 0.2, 0.7)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.4, 3.8))), eo(seg(t, 3.4, 3.8)));
  },
});
