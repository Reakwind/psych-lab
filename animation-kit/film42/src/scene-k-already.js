const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
const IT = [['g'], ['w', 'shoe', 2.4], ['g'], ['w', 'people', 3.4], ['w', 'mug', 4.4]];
kit.scene('k-already', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ka', 0) + R.dayBar('ka', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (IT[k][0] === 'w' ? R.warm('ka-w' + k, IT[k][1]) : R.grey('ka-g' + k, 136)) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool ka-a">דברים שכבר תומכים בכם</div><div class="tag tag-warm ka-q">"לדאוג לעצמי"</div></div>'));
    Object.assign(this, R.refs(kit, 'ka', ['body', 'head', 'eyes', 'mouth', 'a', 'q']));
    this.gl = X.map((x, k) => kit.stage.querySelector('.ka-w' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // things that already support her, or give her energy, light up one by one
    IT.forEach((it, k) => { if (it[0] === 'w') this.gl[k].style.opacity = 0.42 * eio(seg(t, it[2], it[2] + 0.6)) * (0.8 + 0.2 * Math.sin(t * 3 + k)); });
    this.head.setAttribute('transform', 'rotate(' + (t < 3.2 ? -4 : t < 4.2 ? 4 : 10) * eio(seg(t, 2.0, 2.6)) + ' 0 30) translate(0 -6)');
    this.mouth.setAttribute('d', t > 4.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)));
    // ...without ever calling them "self-care"
    R.place(this.q, 420, lerp(322, 310, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)));
  },
});
