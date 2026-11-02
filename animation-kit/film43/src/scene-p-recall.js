const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-recall', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('pc', -200) +
      '<g class="pc-mem">' + R.memory('pc-m', R.coffee('pc-cf')) + '</g><g class="pc-lens">' + R.lens('pc-l') + '</g></svg>' +
      '<div class="tag tag-cool pc-a">ניזכר במה שקרה</div><div class="tag tag-warm pc-b">לחקור את החוויה קצת יותר מקרוב</div></div>'));
    Object.assign(this, R.refs(kit, 'pc', ['body', 'head', 'eyes', 'mouth', 'mem', 'lens', 'a', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // she recalls the coffee in the sun...
    const m = eob(seg(t, 0.3, 1.0), 1.4);
    this.mem.setAttribute('transform', 'translate(720 ' + (330 + Math.sin(t * 1.3) * 6) + ') scale(' + 1.25 * m + ')');
    this.mem.style.opacity = eo(seg(t, 0.3, 0.5));
    this.head.setAttribute('transform', 'rotate(' + (-10 * eio(seg(t, 0.4, 1.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    // ...and looks at it more closely
    const l = eio(seg(t, 2.0, 2.9));
    R.xf(this.lens, lerp(1000, 700 + Math.sin(t * 1.2) * 30, l), lerp(700, 350 + Math.cos(t * 1.5) * 20, l), 1.3, eo(seg(t, 2.0, 2.3)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 1.8, 2.1))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 2.1, 2.6))), eo(seg(t, 2.1, 2.6)));
  },
});
