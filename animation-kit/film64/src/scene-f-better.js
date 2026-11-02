const { seg, eo, eio, eob, lerp } = kit;
// feeling better and functioning better: she waters her plant, her battery fills
const DROPS = [0, 1, 2, 3, 4];
kit.scene('f-better', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="fb-r" transform="translate(370 962) scale(-1 1)">' + R.ruth('fb', 'water') + '</g>' +
      DROPS.map((k) => '<ellipse class="fb-d' + k + '" rx="6" ry="9" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground))"/>').join('') +
      '<g transform="translate(840 440) scale(.95)">' + R.battery('fb') + '</g></svg>' +
      '<div class="tag tag-cool fb-a">להרגיש יותר טוב</div><div class="tag tag-cool fb-b">לתפקד יותר טוב</div></div>'));
    Object.assign(this, R.refs(kit, 'fb', ['r', 'head', 'eyes', 'mouth', 'can', 'fill', 'bolt', 'a', 'b']));
    this.d = DROPS.map((k) => kit.stage.querySelector('.fb-d' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    // the can tips and water falls into the pot
    const tip = eio(seg(t, 2.8, 3.5)) * (1 - eio(seg(t, 6.4, 7.2)));
    this.can.setAttribute('transform', 'rotate(' + 18 * tip + ' 165 -270)');
    this.d.forEach((el, k) => { const p = ((t * 1.6 + k / 5) % 1); el.setAttribute('cx', 118 - 6 * p); el.setAttribute('cy', 712 + 70 * p); el.style.opacity = tip > 0.6 ? 0.9 * (1 - p) : 0; });
    this.head.setAttribute('transform', 'rotate(' + 6 * tip + ' 0 30)');
    R.setBattery(this.fill, lerp(0.35, 0.85, eio(seg(t, 1.8, 4.2))));
    this.bolt.style.opacity = 0.9 * eo(seg(t, 4.0, 4.6));
    R.place(this.a, 780, lerp(100, 86, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)));
    R.place(this.b, 780, lerp(196, 184, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
  },
});
