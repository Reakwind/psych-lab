const { seg, eo, eio, eob, lerp } = kit;
const I = [['משהו שלמדתם כאן באפליקציה', 3.39, 240], ['תרגול שעזר לכם', 7.73, 450], ['משהו שאתם מנסים לעשות אחרת', 12.01, 660]];
kit.scene('j-what', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j10') + R.packed('j10', false) +
      '<g class="j10-i0"><g transform="scale(1.7)">' + R.note('j10-nt') + '</g></g><g class="j10-i1">' + R.tool('j10-tl', 1, 64) + '</g><g class="j10-i2"><g transform="scale(1.15)">' + R.reed('j10-rd') + '</g></g></svg>' +
      I.map((w, k) => '<div class="tag tag-warm j10-n' + k + '">' + w[0] + '</div>').join('') + '<div class="tag tag-cool j10-a">במה למשל, אפשר לשתף?</div></div>'));
    Object.assign(this, R.refs(kit, 'j10', ['w', 'pack', 'head', 'eyes', 'mouth', 'a', 'rd-stem']));
    this.i = I.map((w, k) => kit.stage.querySelector('.j10-i' + k)); this.n = I.map((w, k) => kit.stage.querySelector('.j10-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    // out of her backpack come things she could share: something learned in the app, a practice that helped, something she does differently
    this.w.setAttribute('transform', 'translate(260 970)');
    I.forEach(([w, a, y], k) => {
      const p = eio(seg(t, a - 0.9, a + 0.1));
      R.setG(this.i[k], lerp(260, 900, p), lerp(640, y, p) - Math.sin(Math.PI * p) * 120 + Math.sin(t * 1.4 + k) * 5 * p, lerp(0.2, 1, p), p > 0 ? 1 : 0);
      R.place(this.n[k], 560, lerp(y - 18, y - 30, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    this['rd-stem'].setAttribute('transform', 'rotate(' + Math.sin(t * 1.6) * 8 + ' 0 40)');
    this.pack.setAttribute('transform', 'rotate(' + [3.39, 7.73, 12.01].reduce((s, a) => s + 4 * Math.sin(Math.PI * seg(t, a - 0.9, a - 0.3)), 0) + ' 0 -300)');
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 2.4, 3.2))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.3, 0.7))), eo(seg(t, 0.3, 0.7)));
  },
});
