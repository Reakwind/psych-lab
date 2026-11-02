const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], IT = [['g'], ['w', 'mug', 2.4], ['g'], ['w', 'note', 2.9], ['w', 'people', 3.4]];
kit.scene('w-already', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wy', 0) + R.dayBar('wy', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (IT[k][0] === 'w' ? R.warm('wy-w' + k, IT[k][1]) : R.grey('wy-g' + k, 136)) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool wy-a">כבר דואגים לרווחה הנפשית שלנו</div><div class="tag tag-warm wy-b">בלי לקרוא לזה ככה</div></div>'));
    Object.assign(this, R.refs(kit, 'wy', ['body', 'head', 'eyes', 'mouth', 'a', 'b']));
    this.gl = X.map((x, k) => kit.stage.querySelector('.wy-w' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the good things are already there, in some measure
    IT.forEach((it, k) => { if (it[0] === 'w') this.gl[k].style.opacity = 0.42 * eio(seg(t, it[2], it[2] + 0.6)) * (0.8 + 0.2 * Math.sin(t * 3 + k)); });
    this.head.setAttribute('transform', 'rotate(' + (-6 + 12 * eio(seg(t, 2.4, 3.6))) + ' 0 30) translate(0 -6)');
    this.mouth.setAttribute('d', t > 3.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    R.place(this.b, 540, lerp(312, 300, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
  },
});
