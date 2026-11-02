const { seg, eo, eio, eob, lerp } = kit;
// a few guiding sentences come from Ariel on the phone; they warm as they reach her
const C = [[0.8, 820, 230], [1.1, 560, 190], [1.4, 300, 250]];
kit.scene('h-guide', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g class="hu-ring">' + R.attn('hu') + '</g>' + R.seated('hu', -160) +
      '<g class="hu-ph"><g transform="scale(1.7)">' + R.phone('hu-p', 0, 0, 'ariel') + '</g></g><g class="hu-vg">' + R.voice('hu-v') + '</g>' +
      C.map((c, k) => '<g class="hu-c' + k + '">' + R.lineCard('hu-l' + k) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool hu-a">כמה משפטים מנחים</div><div class="tag hu-b">נשים לב למה שקורה</div><div class="tag tag-warm hu-c">מילים של הבנה ותמיכה</div></div>'));
    Object.assign(this, R.refs(kit, 'hu', ['ring', 'body', 'head', 'eyes', 'mouth', 'ph', 'vg', 'a', 'b', 'c']));
    this.cards = C.map((_, k) => kit.stage.querySelector('.hu-c' + k)); this.warm = C.map((_, k) => kit.stage.querySelector('.hu-l' + k + '-warm'));
    this.v = R.refs(kit, 'hu-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-6 2 Q10 16 26 2');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4); R.blink(this.v.eyes, t, 2.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.xf(this.ph, 360, 690, 1, 1);
    // noticing what is happening
    R.xf(this.ring, 340, 620, (300 + Math.sin(t * 2.4) * 6) * eob(seg(t, 2.2, 2.9), 1.4), eo(seg(t, 2.2, 2.5)));
    const into = eio(seg(t, 6.2, 7.6));
    R.xf(this.vg, 790, 520 + Math.sin(t * 2.2) * 8, 1.4 + 0.2 * Math.sin(Math.PI * seg(t, 7.2, 8.0)), 1);
    C.forEach(([a, x, y], k) => {
      const p = eio(seg(t, a, a + 0.8));
      const q = (a0, c, b) => (1 - p) * (1 - p) * a0 + 2 * p * (1 - p) * c + p * p * b;
      const cx = lerp(q(360, 720, x), 790, into), cy = lerp(q(660, 620, y), 520, into) + Math.sin(t * 1.6 + k) * 6 * (1 - into);
      R.xf(this.cards[k], cx, cy, lerp(0.3, 0.75, p) * (1 - 0.8 * into), eo(seg(t, a, a + 0.2)) * (1 - eo(seg(t, 7.2, 7.6))));
      this.warm[k].style.opacity = eio(seg(t, 5.4 + k * 0.2, 6.0 + k * 0.2));
    });
    this.head.setAttribute('transform', 'rotate(' + (-3 + 9 * eio(seg(t, 6.2, 7.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.b, 540, lerp(1002, 990, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
  },
});
