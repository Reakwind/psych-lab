const { seg, eo, eio, eob, lerp } = kit;
// make it fit: the holds shorten (the square narrows), a stretch of natural breathing, then a shape that feels comfortable
kit.scene('q-adjust', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qa', -230, false) + R.box('qab') + '</svg>' +
      '<div class="tag tag-cool qa-p">אף אחד לא יתן לנו פרס על הנשימה הכי מדויקת</div><div class="tag qa-a">לקצר את העצירות כשצריך</div><div class="tag tag-warm qa-b">לחזור לנשימה הטבעית מידי פעם</div><div class="tag tag-cool qa-c">לעשות התאמות לפי מה שמרגיש לכם נוח</div></div>'));
    Object.assign(this, R.refs(kit, 'qa', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'p', 'a', 'b', 'c']));
    this.x = R.boxRefs(kit, 'qab');
    this.d = 0; this.last = 0;
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    const narrow = eio(seg(t, 2.4, 3.6)) * (1 - eio(seg(t, 7.2, 8.4))), nat = eio(seg(t, 4.4, 5.3)) * (1 - eio(seg(t, 6.5, 7.4))), fit = eio(seg(t, 7.2, 8.4));
    const w = lerp(lerp(320, 170, narrow), 290, fit), h = lerp(320, 330, fit), rad = lerp(80, 110, fit);
    // the dot moves at one speed along the line, so short holds pass quickly (position computed from elapsed path length)
    let pos = 0, len = 0; const per = [h, w, h, w], v = 135, u = (t * v) % (2 * (w + h));
    for (let k = 0; k < 4; k++) { if (len + per[k] >= u) { pos = k + (u - len) / per[k]; break; } len += per[k]; }
    R.setBox(this.x, { w, h, soft: 1, rad, dot: pos, dotA: 1 - nat, lit: 0, ticks: 0, ring: (0.45 + 0.1 * Math.sin(t * 1.3)) * (1 - nat), wave: nat, waveAmp: 0.8, wavePh: -t * 1.4 });
    this.x.soft.style.opacity = 1 - nat;
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 4 * Math.sin(t * 0.6)) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.32, 4.7))), eo(seg(t, 4.32, 4.7)));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 7.19, 7.6))), eo(seg(t, 7.19, 7.6)));
  },
});
