const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-practice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mq', -200) +
      '<g class="mq-gap"><path class="ink mq-line" pathLength="1" style="stroke-width:6"/><path class="ink mq-ends" style="stroke-width:6"/></g>' +
      '<g class="mq-rd"><g transform="scale(1.7)">' + R.reed('mq-reed') + '</g></g></svg>' +
      '<div class="thought sm mq-c">"זה לא יהיה כמו פעם."</div><div class="tag tag-cool mq-a">יכולת שאפשר לאמן</div><div class="tag mq-b">עוצרים ומסתכלים על המחשבה</div><div class="tag tag-warm mq-d">דרך קצת יותר גמישה</div></div>'));
    Object.assign(this, R.refs(kit, 'mq', ['body', 'head', 'eyes', 'mouth', 'line', 'ends', 'gap', 'rd', 'reed-stem', 'c', 'a', 'b', 'd']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.8) + ')');
    // back with Ruth: she stops and looks at her own thought from arm's length; the reed bends
    R.put(this.c, 770, 400 + Math.sin(t * 1.4) * 5, eob(seg(t, 2.0, 2.6), 1.5), 0, eo(seg(t, 2.0, 2.3)));
    const g = eo(seg(t, 4.0, 4.8)), x0 = 370, x1 = 545;
    this.gap.setAttribute('transform', 'translate(' + x0 + ' 420)');
    this.line.setAttribute('d', 'M0 0 H' + (x1 - x0)); this.line.style.strokeDasharray = g + ' 1'; this.line.style.opacity = g > 0 ? 1 : 0;
    this.ends.setAttribute('d', 'M0 -22 V22 M' + (x1 - x0) + ' -22 V22'); this.ends.style.opacity = g;
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 8, eio(seg(t, 2.2, 3.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 10.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    const rp = eob(seg(t, 10.2, 10.8), 1.6);
    this.rd.setAttribute('transform', 'translate(770 700) scale(' + rp + ')'); this.rd.style.opacity = eo(seg(t, 10.2, 10.4));
    this['reed-stem'].setAttribute('transform', 'rotate(' + Math.sin(t * 2.2) * 10 + ' 0 40)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)) * (1 - eo(seg(t, 9.6, 10.0))));
    R.place(this.b, 770, lerp(214, 200, eo(seg(t, 3.9, 4.3))), eo(seg(t, 3.9, 4.3)));
    R.place(this.d, 540, lerp(84, 70, eo(seg(t, 10.3, 10.8))), eo(seg(t, 10.3, 10.8)));
  },
});
