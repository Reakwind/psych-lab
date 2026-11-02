const { seg, eo, eio, eob, lerp } = kit;
const B = [[2.8, 810, 'להרגיע את הגוף'], [4.0, 540, 'מחשבות ורגשות'], [8.7, 270, 'גמישות ביומיום']];
kit.scene('a-tools', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('at', -140) +
      '<g class="at-ar"><g class="at-a">' + R.ariel('at-a', 'stand') + '</g><g class="at-b">' + R.ariel('at-b', 'step') + '</g></g>' +
      '<g class="at-k0">' + R.tool('at-b0', 1, 70) + '</g><g class="at-k1">' + R.tool('at-b1', 0, 70) + '</g><g class="at-k2"><g transform="scale(1.25)">' + R.reed('at-b2') + '</g></g></svg>' +
      B.map((b, k) => '<div class="tag at-t' + k + '">' + b[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'at', ['body', 'head', 'eyes', 'mouth', 'ar', 'a', 'b', 'k0', 'k1', 'k2', 't0', 't1', 't2']));
    this.ea = kit.stage.querySelector('.at-a-eyes'); this.eb = kit.stage.querySelector('.at-b-eyes');
    this.stem = kit.stage.querySelector('.at-b2-stem');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.1); R.blink(this.ea, t, 0.3); R.blink(this.eb, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // Ariel steps out into the room beside Ruth
    const come = eio(seg(t, 0.2, 2.4)), walking = come > 0 && come < 1, step = walking ? Math.floor(t * 2.4) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.ar.setAttribute('transform', 'translate(' + lerp(1240, 820, come) + ' ' + (962 + (walking ? Math.abs(Math.sin(t * Math.PI * 2.4)) * -6 : 0)) + ') scale(1.05)');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.2, 2.0))) + ' 0 30)');
    // what he will teach: calming the body, working with thoughts and feelings, meeting the day more flexibly
    B.forEach(([a, x], k) => {
      const p = eob(seg(t, a, a + 0.6), 1.8);
      this['k' + k].setAttribute('transform', 'translate(' + x + ' ' + (200 + Math.sin(t * 1.5 + k) * 6) + ') scale(' + p + ')');
      R.place(this['t' + k], x, lerp(300, 288, eo(seg(t, a + 0.2, a + 0.7))), eo(seg(t, a + 0.2, a + 0.7)));
    });
    this.stem.setAttribute('transform', 'rotate(' + (Math.sin(t * 2.4) * 10 * seg(t, 8.7, 9.4)) + ' 0 40)');
  },
});
