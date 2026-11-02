const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], UP = [1, 3];
kit.scene('k-lift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kl', -60) +
      '<g transform="translate(920 600) scale(.9)">' + R.battery('kl') + '</g>' + R.dayBar('kl', 220) +
      X.map((x, k) => '<g class="kl-s' + k + '">' + R.blank('kl-b' + k) + (UP.includes(k) ? R.warm('kl-w' + k) : R.grey('kl-g' + k)) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm kl-a">מרימים · ממלאים</div><div class="tag kl-b">מרוקנים · מורידים</div><div class="tag tag-warm kl-c">גורמים לנו להרגיש טוב יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'kl', ['body', 'head', 'eyes', 'mouth', 'fill', 'a', 'b', 'c']));
    this.s = X.map((_, k) => kit.stage.querySelector('.kl-s' + k)); this.bl = X.map((_, k) => kit.stage.querySelector('.kl-b' + k));
    this.it = X.map((_, k) => kit.stage.querySelector(UP.includes(k) ? '.kl-w' + k : '.kl-g' + k));
    this.gl = UP.map((k) => kit.stage.querySelector('.kl-w' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 1.1);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // some things lift and fill us; some drain us and pull us down
    const up = eio(seg(t, 3.2, 4.2)), dn = eio(seg(t, 6.0, 7.0));
    X.forEach((x, k) => {
      const w = UP.includes(k), p = w ? up : dn;
      this.bl[k].style.opacity = 1 - eo(seg(t, w ? 3.1 : 5.9, w ? 3.5 : 6.3));
      this.it[k].style.opacity = eo(seg(t, w ? 3.1 : 5.9, w ? 3.5 : 6.3));
      const bob = w ? Math.sin(t * 2 + k) * 6 * up : 0;
      this.s[k].setAttribute('transform', 'translate(' + x + ' ' + (220 + (w ? -60 : 56) * p + bob) + ')');
    });
    const glow = eio(seg(t, 9.2, 10.2));
    this.gl.forEach((g) => (g.style.opacity = 0.35 * glow * (0.8 + 0.2 * Math.sin(t * 3))));
    R.setBattery(this.fill, 0.5 + 0.3 * eio(seg(t, 3.6, 4.8)) - 0.42 * eio(seg(t, 6.4, 7.6)) + 0.3 * glow);
    this.mouth.setAttribute('d', t > 9.2 || (t > 3.5 && t < 6.2) ? 'M-12 24 Q2 36 16 24' : t > 6.2 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + (-6 * up * (1 - dn) + 4 * dn * (1 - glow)) + ' 0 30) translate(0 ' + (10 * dn * (1 - glow)) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)) * (1 - eo(seg(t, 5.8, 6.1))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)) * (1 - eo(seg(t, 8.9, 9.2))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)));
  },
});
