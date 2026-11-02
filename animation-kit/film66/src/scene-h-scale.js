const { seg, eo, eio, eob, lerp } = kit;
// emotional balance isn't being calm or positive all the time: the hard feelings stay on the scale, and other things join them
const P8 = 8.74;
const LEFT = [[P8 + 6.2, -62], [P8 + 6.9, 0], [P8 + 7.6, 62]];
kit.scene('h-scale', {
  init(kit) {
    const right = '<g class="hs-wr" transform="translate(0 112) scale(.5)">' + R.worry('hs-w') + '</g>';
    const left = LEFT.map((l, k) => '<g class="hs-l' + k + '">' + R.mini(k) + '</g>').join('');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('hs', { mid: '<g class="hs-cl">' + R.cloud('hs-cloud') + R.scale('hs', right, left) + '</g>' }) + '</svg>' +
      '<div class="tag tag-cool hs-a">איזון רגשי</div><div class="tag struck hs-no">רגועים או חיוביים כל הזמן</div>' +
      '<div class="tag tag-warm hs-b">מקום לכל הרגשות</div><div class="tag hs-c">ובמקביל, גם לדברים אחרים</div></div>'));
    this.A = R.attnRefs(kit, 'hs'); Object.assign(this, R.refs(kit, 'hs', ['cl', 'wr', 'a', 'no', 'b', 'c']));
    this.sc = R.refs(kit, 'hs', ['beam', 'panR', 'panL']); this.l = [0, 1, 2].map((k) => kit.stage.querySelector('.hs-l' + k));
    this.we = R.refs(kit, 'hs-w', ['eyes']);
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')'); A.lf.setAttribute('transform', 'scale(1)');
    // the circle fades; the worry floats up into the scale above her
    R.ring(A, 520, 540, 540, 1 - eo(seg(t, 0, 0.8)), t, 0);
    const up = eio(seg(t, 0.4, 1.6));
    A.wg.setAttribute('transform', 'translate(' + lerp(820, 830, up) + ' ' + lerp(330, 300, up) + ') scale(' + lerp(1, 0.5, up) + ')'); A.wg.style.opacity = 1 - eo(seg(t, 1.3, 1.7));
    this.cl.style.opacity = eo(seg(t, 0.3, 1.1));
    this.wr.style.opacity = eo(seg(t, 1.4, 1.8)); R.blink(this.we.eyes, t, 1.3);
    [A.gP, A.gM, A.gL].forEach((g) => g.setAttribute('opacity', 0));
    // heavy on one side; then the other things join, and it evens out
    const drop = eob(seg(t, 1.5, 2.3), 1.2), level = eio(seg(t, LEFT[0][0], LEFT[2][0] + 1.0));
    R.setScale(this.sc, 13 * drop * (1 - level) + 1.5 * Math.sin(t * 1.4) * (1 - level) * drop, Math.sin(t * 1.8) * 1.5);
    this.l.forEach((el, k) => { const [a, x] = LEFT[k], p = eo(seg(t, a, a + 0.5)); el.setAttribute('transform', 'translate(' + x + ' ' + lerp(-120, 108, p) + ')'); el.style.opacity = p > 0 ? 1 : 0; });
    // Ruth looks up at it
    A.head.setAttribute('transform', 'rotate(' + 2 * Math.sin(t * 0.8) + ' 0 30) translate(0 -4)');
    R.look(A.eyes, t, 0.6, 0, -4);
    A.mouth.setAttribute('d', level > 0.5 ? R.SMILE : R.FLAT);
    R.place(this.a, 820, lerp(52, 40, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)) * (1 - eo(seg(t, P8 + 1.0, P8 + 1.5))));
    R.place(this.no, 360, lerp(52, 40, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)) * (1 - eo(seg(t, P8 + 1.0, P8 + 1.5))));
    this.no.style.setProperty('--s', eo(seg(t, 6.8, 7.4)));
    R.place(this.b, 540, lerp(52, 40, eo(seg(t, P8 + 5.1, P8 + 5.6))), eo(seg(t, P8 + 5.1, P8 + 5.6)));
    R.place(this.c, 540, lerp(262, 250, eo(seg(t, P8 + 6.1, P8 + 6.6))), eo(seg(t, P8 + 6.1, P8 + 6.6)));
  },
});
