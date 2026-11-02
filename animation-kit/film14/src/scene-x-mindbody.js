const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-mindbody', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x8', -120) + '<g class="x8-bt">' + R.battery('x8') + '</g>' +
      '<g transform="translate(380 640) scale(330)">' + R.attn('x8') + '</g><ellipse class="x8-bg" cx="380" cy="660" rx="110" ry="130" style="fill:var(--accent);opacity:0"/><circle class="x8-hg" cx="380" cy="520" r="96" style="fill:var(--main);opacity:0"/>' +
      '<g class="x8-lp">' + R.loop('x8-loop') + '</g></svg>' +
      '<div class="tag struck x8-x">תשובה נכונה או לא נכונה</div><div class="tag tag-warm x8-a">פשוט להתחיל לשים לב</div><div class="tag tag-cool x8-c">הגוף והתודעה משפיעים כל הזמן זה על זה</div><div class="tag tag-red x8-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x8', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'nw', 'mt-fill', 'bt', 'fill', 'attn', 'bg', 'hg', 'lp', 'x', 'a', 'c', 'ml']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // morning again; no right answer, just start noticing: the circle of attention opens, body and mind turn round each other
    const day = eio(seg(t, 0.0, 0.9));
    this.nw.setAttribute('opacity', 1 - day); this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    R.setG(this.bt, 680, 730, 0.5 * (1 - day), 1 - day); R.setBattery(this.fill, 0.2);
    this.body.setAttribute('transform', 'translate(0 ' + 8 * (1 - day) + ') scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.attn.setAttribute('transform', 'scale(' + lerp(0.3, 1, eio(seg(t, 3.0, 4.4))) + ')'); this.attn.style.opacity = eo(seg(t, 3.0, 3.5));
    const sw = Math.sin(t * 2.4);
    this.bg.style.opacity = 0.26 * eo(seg(t, 5.2, 5.7)) * (0.5 + 0.5 * sw); this.hg.style.opacity = 0.22 * eo(seg(t, 5.2, 5.7)) * (0.5 - 0.5 * sw);
    const lp = eob(seg(t, 5.2, 5.8), 1.4);
    this.lp.setAttribute('transform', 'translate(560 590) scale(' + Math.max(0.001, 0.9 * lp) + ') rotate(' + t * 50 + ')'); this.lp.style.opacity = eo(seg(t, 5.2, 5.4));
    R.setMeter(this['mt-fill'], lerp(0.5, 0.42, eio(seg(t, 3.0, 5.0))));
    this.head.setAttribute('transform', 'rotate(' + 4 * eio(seg(t, 3.0, 4.0)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.x, 540, lerp(54, 40, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)) * (1 - eo(seg(t, 2.8, 3.1)))); this.x.style.setProperty('--s', eio(seg(t, 1.2, 1.8)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.12, 3.5))), eo(seg(t, 3.12, 3.5)));
    R.place(this.c, 540, lerp(972, 960, eo(seg(t, 5.28, 5.7))), eo(seg(t, 5.28, 5.7)));
    R.place(this.ml, 920, 886, 1);
  },
});
