const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-find', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('x16p', { sun: true }) + R.packed('x16') + '<g class="x16-aw">' + R.ariel('x16a', 'stand') + '</g>' +
      R.CALM.map((c, k) => R.cbadge('x16-c' + k, c, 64)).join('') + '</svg>' +
      '<div class="tag tag-cool x16-a">עם הזמן נכיר יחד את הטכניקות השונות</div><div class="tag tag-warm x16-b">ונגלה אילו מהן עובדות בשבילכם</div></div>'));
    Object.assign(this, R.refs(kit, 'x16', ['w', 'eyes', 'head', 'mouth', 'aw', 'a', 'b']));
    this.ar = R.refs(kit, 'x16a', ['eyes', 'head', 'mouth']); this.cb = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.x16-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ar.eyes, t, 1.9);
    // Ruth with Ariel at the foot of her path; the four tools wait on the stones; over time she'll find which work for her
    this.w.setAttribute('transform', 'translate(300 975)'); this.aw.setAttribute('transform', 'translate(800 978)');
    this.cb.forEach((c, k) => {
      const [sx, sy, ss] = R.onStone(k), lit = Math.sin(Math.PI * seg(t, 2.6 + k * 0.3, 3.2 + k * 0.3));
      if (k === 0) { const p = eio(seg(t, 4.0, 5.2)); R.setG(c, lerp(sx, 430, p), lerp(sy, 560, p) - Math.sin(Math.PI * p) * 60, lerp(ss, 0.9, p) * (1 + 0.2 * lit) * (1 + 0.04 * Math.sin(t * 4) * p), 1); }
      else R.setG(c, sx, sy + Math.sin(t * 1.4 + k) * 3, ss * (1 + 0.25 * lit), 1);
    });
    this.head.setAttribute('transform', 'rotate(' + (t > 4.2 ? 8 * eio(seg(t, 4.2, 5.0)) : -4) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.8 ? R.mouthHappy : R.mouthNeutral);
    this.ar.head.setAttribute('transform', 'rotate(-6 0 30)'); this.ar.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.83, 2.2))), eo(seg(t, 1.83, 2.2)) * (1 - eo(seg(t, 3.8, 4.0))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.01, 4.4))), eo(seg(t, 4.01, 4.4)));
  },
});
