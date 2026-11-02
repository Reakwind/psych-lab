const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-gap', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.doorOpen('og-open') + R.seated('og', -200) + '<g class="og-b">' + R.balloon('og-bl') + '</g>' +
      '<g class="og-gap"><path class="ink og-line" pathLength="1" style="stroke-width:6"/><path class="ink og-ends" style="stroke-width:6"/></g></svg>' +
      '<div class="tag tag-cool og-a">המרחק הקטן הזה</div><div class="tag og-r">עוזר לוויסות רגשי</div><div class="tag tag-warm og-c" style="font-size:40px">אפשר לבחור איך להגיב</div></div>'));
    Object.assign(this, R.refs(kit, 'og', ['open', 'body', 'head', 'eyes', 'mouth', 'b', 'gap', 'line', 'ends', 'a', 'r', 'c']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // a small, measured gap between her and the thought, and the door opens a little
    R.setBal(this.b, 640, 330 + Math.sin(t * 1.3) * 8, 1.5, 1);
    const g = eo(seg(t, 0.3, 1.1)), x0 = 370, x1 = 530;
    this.gap.setAttribute('transform', 'translate(' + x0 + ' 420)');
    this.line.setAttribute('d', 'M0 0 H' + (x1 - x0)); this.line.style.strokeDasharray = g + ' 1'; this.line.style.opacity = g > 0 ? 1 : 0;
    this.ends.setAttribute('d', 'M0 -22 V22 M' + (x1 - x0) + ' -22 V22'); this.ends.style.opacity = g;
    this.open.setAttribute('opacity', eio(seg(t, 5.6, 7.2)));
    this.head.setAttribute('transform', 'rotate(' + lerp(6, 12, eio(seg(t, 5.8, 6.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(474, 460, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
    R.place(this.r, 540, lerp(84, 70, eo(seg(t, 2.8, 3.2))), eo(seg(t, 2.8, 3.2)));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 5.7, 6.1))), eo(seg(t, 5.7, 6.1)));
  },
});
