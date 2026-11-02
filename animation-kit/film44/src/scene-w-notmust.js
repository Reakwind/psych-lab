const { seg, eo, eio, eob, lerp } = kit;
const T = [[830, 'mug'], [540, 'note'], [250, 'people']];
kit.scene('w-notmust', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.balcony('wn') + R.seated('wn', -110) +
      '<g transform="translate(790 720)">' + R.table('wn-tb') + '</g>' + R.dayBar('wn', 220) +
      T.map((x, k) => '<g transform="translate(' + x[0] + ' 220)">' + R.warm('wn-t' + k, x[1]) + '</g>').join('') + '</svg>' +
      '<div class="tag wn-a">לא דברים שאנחנו חייבים לעשות</div><div class="tag tag-warm wn-b">אבל טוב לנו יותר כשהם בחיים שלנו</div></div>'));
    Object.assign(this, R.refs(kit, 'wn', ['body', 'head', 'eyes', 'mouth', 'a', 'b']));
    this.steam = kit.stage.querySelector('.wn-tb-m-steam'); this.gl = T.map((_, k) => kit.stage.querySelector('.wn-t' + k + '-glow'));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    this.steam.setAttribute('transform', 'translate(0 ' + (-((t * 10) % 12)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 - 10 * eio(seg(t, 3.0, 3.8))) + ' 0 30)');
    // not musts, but life is better with them
    this.gl.forEach((g, k) => (g.style.opacity = 0.42 * eio(seg(t, 3.4 + k * 0.25, 4.0 + k * 0.25)) * (0.8 + 0.2 * Math.sin(t * 3 + k))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.3, 1.8))), eo(seg(t, 1.3, 1.8)) * (1 - eo(seg(t, 3.0, 3.3))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
  },
});
