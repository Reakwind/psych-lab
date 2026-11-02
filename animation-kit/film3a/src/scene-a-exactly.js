const { seg, eo, eio, eob, lerp } = kit;
const Q = [['רעד?', 230, 360], ['לא נוח?', 440, 250], ['להירגע?', 680, 360]];
kit.scene('a-exactly', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('ax', -60) +
      '<g transform="translate(476 712)">' + R.tremor('ax') + '</g><g class="ax-ar"><g class="ax-a">' + R.ariel('ax-a', 'stand') + '</g><g class="ax-b">' + R.ariel('ax-b', 'step') + '</g></g></svg>' +
      Q.map((q, k) => '<div class="tag ax-q' + k + '">' + q[0] + '</div>').join('') + '<div class="tag tag-warm ax-cap">בדיוק על זה</div></div>'));
    Object.assign(this, R.refs(kit, 'ax', ['body', 'head', 'eyes', 'mouth', 'trem', 'ar', 'a', 'b', 'q0', 'q1', 'q2', 'cap']));
    this.ea = kit.stage.querySelector('.ax-a-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.ea, t, 1.5);
    this.trem.setAttribute('transform', 'translate(' + Math.sin(t * 40) * 3 + ' 0)');
    const come = eio(seg(t, 0, 1.3)), walking = come > 0 && come < 1, step = walking ? Math.floor(t * 2.6) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.ar.setAttribute('transform', 'translate(' + lerp(1240, 880, come) + ' 962) scale(1.05)');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 0.8, 1.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.6 ? 'M-10 26 Q2 32 14 26' : 'M-10 30 Q2 24 14 30');
    // the doubts gather in front of Ariel: these are exactly what this talk is about
    Q.forEach(([, x, y], k) => { const g = eio(seg(t, 1.5 + k * 0.15, 2.6 + k * 0.15)); R.place(this['q' + k], lerp(x, 700, g), lerp(y, 430 + k * 76, g), 1); });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
  },
});
