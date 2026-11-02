const { seg, eo, eio, eob, lerp } = kit;
// dizzy or uncomfortable: back to natural breathing, back to the rhythm when ready, and it's always fine to stop
kit.scene('q-dizzy', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qd', -230, false) + R.box('qdb') +
      '<g class="qd-sw"><g transform="scale(2.6)">' + R.swirl('qd-s') + '</g></g>' + R.cbadge('qd-pz', 'pause', 64) + '</svg>' +
      '<div class="tag tag-cool qd-p">לעשות התאמות לפי מה שמרגיש לכם נוח</div><div class="tag tag-red qd-a">סחרחורת או אי נוחות</div><div class="tag tag-warm qd-b">פשוט לעבור לנשימה הטבעית</div>' +
      '<div class="tag qd-c">ולחזור למקצב כשתרגישו מוכנים</div><div class="tag tag-cool qd-d">ותמיד אפשר לעצור את התרגול</div></div>'));
    Object.assign(this, R.refs(kit, 'qd', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'sw', 'pz', 'p', 'a', 'b', 'c', 'd']));
    this.x = R.boxRefs(kit, 'qdb');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    const dz = eob(seg(t, 1.3, 1.9), 1.4) * (1 - eio(seg(t, 4.6, 5.4)));
    this.sw.setAttribute('transform', 'translate(275 360) scale(' + Math.max(0.001, dz) + ') rotate(' + t * 150 + ')'); this.sw.style.opacity = Math.min(1, dz);
    const nat = eio(seg(t, 4.6, 5.4)) * (1 - eio(seg(t, 5.9, 6.8))), stop = eio(seg(t, 7.4, 8.2));
    const dot = 2.2 + t / 2.6;
    R.setBox(this.x, { w: 290, h: 330, soft: 1, rad: 110, dot, dotA: 1 - nat, ticks: 0, lit: 0, ring: (0.45 + 0.1 * Math.sin(t * 1.3)) * (1 - nat), wave: nat, waveAmp: 0.8, wavePh: -t * 1.4, alpha: 1 - stop });
    this.x.soft.style.opacity = 1 - nat;
    R.setG(this.pz, 730, 450, 1.7 * eob(seg(t, 7.5, 8.1), 1.5), eo(seg(t, 7.5, 7.8)));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 7 * Math.sin(t * 3.2) * dz) + ' 0 30)');
    this.mouth.setAttribute('d', dz > 0.4 ? R.mouthFlat : R.mouthHappy);
    R.place(this.p, 540, 184, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.45, 1.8))), eo(seg(t, 1.45, 1.8)) * (1 - eo(seg(t, 4.3, 4.6))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.6, 4.9))), eo(seg(t, 4.6, 4.9)) * (1 - eo(seg(t, 7.1, 7.4))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 5.3, 5.6))), eo(seg(t, 5.3, 5.6)) * (1 - eo(seg(t, 7.1, 7.4))));
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 7.41, 7.8))), eo(seg(t, 7.41, 7.8)));
  },
});
