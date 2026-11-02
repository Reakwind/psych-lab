const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], IT = [['w', 'mug'], ['g'], ['w', 'note'], ['g'], ['w', 'people']];
kit.scene('w-deserve', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="wz-all">' + R.balcony('wz') + R.seated('wz', -110) +
      '<g transform="translate(790 720)">' + R.table('wz-tb') + '</g>' + R.dayBar('wz', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (IT[k][0] === 'w' ? R.warm('wz-w' + k, IT[k][1]) : R.grey('wz-g' + k, 136)) + '</g>').join('') + '</g></svg>' +
      '<div class="tag wz-a">לא צריך תוכנית מסודרת</div><div class="tag tag-cool wz-b">אולי רק לשים לב</div><div class="tag tag-warm wz-c">לדברים שעושים לכם טוב מגיע מקום</div></div>'));
    Object.assign(this, R.refs(kit, 'wz', ['all', 'body', 'head', 'eyes', 'mouth', 'a', 'b', 'c']));
    this.steam = kit.stage.querySelector('.wz-tb-m-steam'); this.gl = X.map((x, k) => kit.stage.querySelector('.wz-w' + k + '-glow'));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    this.steam.setAttribute('transform', 'translate(0 ' + (-((t * 10) % 12)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 + Math.sin(t * 0.6) * 3) + ' 0 30)');
    // back on the balcony with her coffee: the good things glow in their places
    this.gl.forEach((g, k) => { if (g) g.style.opacity = 0.42 * eio(seg(t, 4.2 + k * 0.2, 5.0 + k * 0.2)) * (0.8 + 0.2 * Math.sin(t * 3 + k)); });
    const z = 1 + 0.05 * eio(seg(t, 0, 8.8));
    this.all.setAttribute('transform', 'translate(540 600) scale(' + z + ') translate(-540 -600)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.7, 2.2))), eo(seg(t, 1.7, 2.2)) * (1 - eo(seg(t, 3.9, 4.2))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.2, 4.7))), eo(seg(t, 4.2, 4.7)) * (1 - eo(seg(t, 6.8, 7.1))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)));
  },
});
