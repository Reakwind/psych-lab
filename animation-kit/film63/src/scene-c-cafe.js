const { seg, eo, eio, eob, lerp } = kit;
kit.scene('c-cafe', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cafeShot('ca') + '</svg><div class="tag tag-cool ca-title">מפגש 63 · מעגל ההתמודדות עם קושי</div></div>'));
    this.c = R.cafeRefs(kit, 'ca'); this.title = kit.stage.querySelector('.ca-title');
    this.rd = kit.stage.querySelector('.ca-cr-dots');
  },
  render(t) {
    const c = this.c;
    R.blink(c.eyes, t, 0.4); R.chatter(c, t, t > 0.5);
    c.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    c.ten.style.opacity = 0;
    R.place(this.title, 540, lerp(150, 136, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 3.0, 3.6))));
    // her hand shakes a little more than usual
    const tr = eo(seg(t, 3.8, 4.3));
    c.tr.style.opacity = tr; c.tr.setAttribute('transform', 'translate(' + (630 + Math.sin(t * 40) * 3 * tr) + ' 740)');
    c.cupg.setAttribute('transform', 'translate(' + (604 + Math.sin(t * 37) * 2.5 * tr) + ' ' + (770 + Math.cos(t * 41) * 1.5 * tr) + ')');
    // her voice comes out soft: her bubble is small and faint
    const v = eo(seg(t, 6.2, 6.8));
    c.br.setAttribute('transform', 'translate(420 400) scale(' + lerp(0.8, 0.5, v) + ')'); c.br.style.opacity = lerp(0.95, 0.45, v);
    this.rd.style.opacity = 1 - 0.6 * v;
    c.head.setAttribute('transform', 'rotate(' + (-4 + 4 * Math.sin(t * 0.9)) + ' 0 30)');
    c.mouth.setAttribute('d', t > 4.4 ? 'M-10 28 Q2 26 14 28' : 'M-12 24 Q2 34 16 24');
  },
});
