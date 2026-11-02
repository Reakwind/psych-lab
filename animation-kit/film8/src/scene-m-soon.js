const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-soon', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(560 270) scale(.27) translate(-540 -480)">' + R.picture('ms') + '</g>' + R.seated('mr', -40) +
      '<g transform="translate(610 650) scale(1.5) translate(-610 -650)">' + R.phone('mr-p', 610, 650, 'nira') + '</g></svg>' +
      '<div class="tag tag-warm mr-a">עוד רגע תתרגלו</div></div>'));
    Object.assign(this, R.refs(kit, 'mr', ['body', 'head', 'eyes', 'mouth', 'a']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.8) + ')');
    // the practice is next: Nira on her phone, the picture on her wall now whole and in colour
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.head.setAttribute('transform', 'rotate(' + 6 * eio(seg(t, 0.3, 1.0)) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
  },
});
