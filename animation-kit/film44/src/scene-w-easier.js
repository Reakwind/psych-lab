const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-easier', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('we', -160) + '<g class="we-ph">' + R.phone('we-p', 0, 0, 'ariel') + '</g></svg>' +
      '<div class="tag tag-cool we-a">הרבה יותר קל להגיד את זה מאשר לעשות</div><div class="tag tag-warm we-b">אני יודע</div></div>'));
    Object.assign(this, R.refs(kit, 'we', ['body', 'head', 'eyes', 'mouth', 'ph', 'a', 'b']));
    this.ah = kit.stage.querySelector('.we-p-g-head');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // Ariel, on the phone, knows it is easier said than done; Ruth nods
    this.ph.setAttribute('transform', 'translate(700 560) scale(3) rotate(-4)');
    if (this.ah) this.ah.setAttribute('transform', 'translate(0 ' + Math.sin(Math.PI * 4 * seg(t, 3.3, 4.3)) * 6 + ')');
    const nod = Math.sin(Math.PI * 4 * seg(t, 3.5, 4.5)) * 5;
    this.head.setAttribute('transform', 'rotate(' + (8 + nod * 0.4) + ' 0 30) translate(0 ' + nod + ')');
    this.mouth.setAttribute('d', t > 3.6 ? 'M-10 26 Q2 32 14 26' : 'M-10 28 Q2 26 14 28');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)));
    R.place(this.b, 700, lerp(822, 810, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
  },
});
