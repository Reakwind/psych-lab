const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-colours', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.talRoom('mc') + '</svg>' +
      '<div class="tag mc-a">הקושי לא נעלם</div><div class="tag mc-b">גם התסכול עדיין שם</div><div class="tag tag-warm mc-c" style="font-size:40px">עוד צבעים בתמונה</div></div>'));
    Object.assign(this, R.refs(kit, 'mc', ['serve', 't-head', 't-eyes', 't-mouth', 'a', 'b', 'c']));
    this.serve.style.opacity = 0; this.art = kit.stage.querySelector('.art');
    this.fe = [0, 1, 2].map((k) => kit.stage.querySelector('.mc-f' + k + '-eyes'));
    this.fm = [0, 1, 2].map((k) => kit.stage.querySelector('.mc-f' + k + '-mouth'));
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.5); this.fe.forEach((e, k) => R.blink(e, t, 1.3 + k * 0.7));
    // the pots stay grey; everything else gets its colour back
    const c = eio(seg(t, 3.9, 6.2));
    this.art.style.filter = 'grayscale(' + 0.85 * (1 - c) + ')';
    this['t-head'].setAttribute('transform', 'rotate(6 0 30)');
    this['t-mouth'].setAttribute('d', t > 4.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.fm.forEach((m) => m.setAttribute('d', t > 4.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26'));
    R.place(this.a, 650, lerp(392, 380, eo(seg(t, 0.3, 0.7))), eo(seg(t, 0.3, 0.7)));
    R.place(this.b, 650, lerp(472, 460, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 5.9, 6.4))), eo(seg(t, 5.9, 6.4)));
  },
});
