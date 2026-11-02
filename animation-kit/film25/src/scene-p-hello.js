const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.matSide('ph-m', 830, 890, 300) + R.seated('ph', -150) +
      R.phone('php', 411, 654, 'ariel') + '<ellipse class="skin" cx="376" cy="700" rx="14" ry="12"/><ellipse class="skin" cx="446" cy="700" rx="14" ry="12"/></svg>' +
      '<div class="tag tag-cool ph-title">מפגש 25 · איך להפיק יותר מהתרגול</div><div class="tag ph-kinds">סוגים שונים של תרגילים</div>' +
      '<div class="tag tag-warm ph-q">שאלות בדרך</div><div class="tag ph-hard">דברים שפחות מסתדרים</div></div>'));
    Object.assign(this, R.refs(kit, 'ph', ['body', 'head', 'eyes', 'mouth', 'title', 'kinds', 'q', 'hard']));
    this.g = R.refs(kit, 'php-g', ['head', 'eyes']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.7); R.blink(this.g.eyes, t, 2.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.g.head.setAttribute('transform', 'rotate(' + (5 * Math.sin(t * 1.4)) + ' 0 30)');
    // Ruth looks from Ariel on her phone over to her mat
    this.head.setAttribute('transform', 'rotate(' + (6 - 14 * eio(seg(t, 5.6, 6.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 8.4 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 5.4, 5.9))));
    R.place(this.kinds, 540, lerp(176, 164, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)) * (1 - eo(seg(t, 5.4, 5.9))));
    R.place(this.q, 830, lerp(712, 700, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)));
    R.place(this.hard, 800, lerp(612, 600, eo(seg(t, 8.5, 9.0))), eo(seg(t, 8.5, 9.0)));
  },
});
