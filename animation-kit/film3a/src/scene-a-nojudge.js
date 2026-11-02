const { seg, eo, eio, eob, lerp } = kit;
const W = [[1.0, 'רק מקשיבים', 540, 70, 'tag-cool'], [2.8, 'שמים לב', 540, 170, 'tag-warm'], [4.1, 'לא שופטים', 220, 330, ''], [5.6, 'לא מבקרים', 860, 330, '']];
kit.scene('a-nojudge', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(500 620) scale(380)">' + R.attn('aj2') + '</g>' + R.seated('aj2', 0) + '</svg>' +
      W.map((w, k) => '<div class="tag ' + w[4] + ' aj2-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'aj2', ['body', 'eyes', 'mouth', 'w0', 'w1', 'w2', 'w3']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    W.forEach(([a, , x, y], k) => R.place(this['w' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
  },
});
