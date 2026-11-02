const { seg, eo, eio, eob, lerp } = kit;
const B = [[3.8, 830, 'נוח יותר'], [4.5, 540, 'גמיש יותר'], [5.25, 250, 'משתלב ביום־יום']];
kit.scene('p-easier', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.matSide('pe-m', 830, 890, 300) + R.seated('pe', -150) +
      '<g class="pe-ar"><g class="pe-a">' + R.ariel('pe-a', 'stand') + '</g><g class="pe-b">' + R.ariel('pe-b', 'step') + '</g></g></svg>' +
      B.map((b, k) => '<div class="tag ' + (k === 1 ? 'tag-warm ' : 'tag-cool ') + 'pe-t' + k + '">' + b[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'pe', ['body', 'head', 'eyes', 'mouth', 'ar', 'a', 'b', 't0', 't1', 't2']));
    this.ea = kit.stage.querySelector('.pe-a-eyes'); this.eb = kit.stage.querySelector('.pe-b-eyes');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.1); R.blink(this.ea, t, 0.3); R.blink(this.eb, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // Ariel steps into the room beside Ruth and her mat
    const come = eio(seg(t, 0.2, 2.4)), walking = come > 0 && come < 1, step = walking ? Math.floor(t * 2.4) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.ar.setAttribute('transform', 'translate(' + lerp(1240, 700, come) + ' ' + (962 + (walking ? Math.abs(Math.sin(t * Math.PI * 2.4)) * -6 : 0)) + ') scale(1.02)');
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 1.2, 2.0))) + ' 0 30)');
    // practice that is more comfortable, more flexible, part of the day
    B.forEach(([a, x], k) => R.place(this['t' + k], x, lerp(232, 220, eo(seg(t, a, a + 0.5))) - (k === 1 ? 90 : 0), eo(seg(t, a, a + 0.5))));
  },
});
