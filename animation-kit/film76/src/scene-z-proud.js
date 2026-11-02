const { seg, eo, eio, eob, lerp } = kit;
// acknowledge, too, that you are still here, committed and investing in yourselves. I hope you know you should be proud of yourselves.
kit.scene('z-proud', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('zr', { sun: true, sunX: 880, sunY: 240 }) +
      '<g class="zr-sp" transform="translate(556 430)">' + R.spark('zr') + '</g>' +
      '<g transform="translate(290 1050) scale(.86)">' + R.packed('zr-r', 'stand', true) + '</g>' +
      '<g transform="translate(800 1050) scale(.86)">' + R.nira('zr-n', 'stand') + '</g></svg>' +
      '<div class="tag zr-a">עדיין כאן</div><div class="tag zr-b">מחויבים ומשקיעים בעצמנו</div><div class="tag tag-warm zr-c">גאים בעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'zr', ['sp', 'ring', 'glow', 'star', 'a', 'b', 'c']));
    this.r = R.refs(kit, 'zr-r', ['eyes', 'mouth', 'armL', 'armR', 'head']); this.n = R.refs(kit, 'zr-n', ['eyes', 'mouth', 'head']);
    this.top = R.PATH.map((p, k) => kit.stage.querySelector('.zr-st' + k + '-top'));
  },
  render(t) {
    // every stone of her path lights up, from her feet to the far end
    this.top.forEach((el, k) => { const l = eo(seg(t, 0.2 + k * 0.16, 0.6 + k * 0.16)); el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * l) + '%, var(--ground))'; });
    const s = eob(seg(t, 8.1, 8.8), 1.6);
    this.sp.setAttribute('transform', 'translate(556 430) scale(' + Math.max(0.001, 1.2 * s) + ') rotate(' + t * 10 + ')');
    this.ring.setAttribute('opacity', 0);
    this.glow.setAttribute('r', 64 + 6 * Math.sin(t * 3));
    R.blink(this.r.eyes, t, 0.4); R.blink(this.n.eyes, t, 2.0);
    this.r.mouth.setAttribute('d', R.BIG); this.n.mouth.setAttribute('d', R.BIG);
    this.r.head.setAttribute('transform', 'rotate(' + 4 * Math.sin(t * 0.9) + ' 0 30)'); this.n.head.setAttribute('transform', 'rotate(' + (-5) + ' 0 30)');
    R.raise(this.r, 0.12 + 0.55 * eio(seg(t, 8.3, 9.0)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.84, 2.2))), eo(seg(t, 1.84, 2.2)));
    R.place(this.b, 540, lerp(164, 150, eo(seg(t, 2.68, 3.1))), eo(seg(t, 2.68, 3.1)));
    R.place(this.c, 540, lerp(244, 230, eo(seg(t, 8.27, 8.7))), eo(seg(t, 8.27, 8.7)));
  },
});
