const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-notforme', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('an', -160) +
      '<g class="an-pic">' + R.perfect('an') + '</g><g class="an-dots"><circle class="light" cx="380" cy="430" r="12"/><circle class="light" cx="410" cy="390" r="17"/></g></svg>' +
      '<div class="tag an-lab">הרפיה · מיינדפולנס</div><div class="tag tag-warm an-th">"זה לא ממש בשבילי"</div></div>'));
    Object.assign(this, R.refs(kit, 'an', ['body', 'head', 'eyes', 'mouth', 'pic', 'dots', 'lab', 'th']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the picture-perfect meditator slides in, the way relaxation is usually shown...
    const s = eio(seg(t, 2.5, 3.3));
    this.pic.setAttribute('transform', 'translate(' + lerp(1300, 800, s) + ' 400) rotate(' + lerp(8, 3, s) + ')');
    R.place(this.lab, 800, lerp(600, 588, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 3.0, 3.6)) - 8 * eio(seg(t, 6.0, 6.6)) + Math.sin(Math.PI * 4 * seg(t, 6.8, 7.8)) * 5) + ' 0 30)');
    // ...and Ruth's first thought
    this.mouth.setAttribute('d', t > 5.8 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    const th = eo(seg(t, 5.6, 6.2));
    this.dots.style.opacity = th;
    R.place(this.th, 450, lerp(320, 306, th), th);
  },
});
