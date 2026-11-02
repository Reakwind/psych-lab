const { seg, eo, eio, eob, lerp } = kit;
const P2 = 6.08, P3 = 13.2;
kit.scene('b-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="bh-cam">' + R.room({ plant: false }) + R.seated('bh', -140) +
      '<g transform="translate(820 962) scale(1.05)">' + R.armsFree(R.ariel('bh-a', 'stand'), 'bh-a') + '</g>' +
      '<path class="bh-air" style="fill:none;stroke:var(--main);stroke-width:4;stroke-linecap:round;stroke-dasharray:6 8;opacity:0" d="M372 534 C392 540 414 536 436 528"/>' +
      '<g class="bh-badge">' + R.tool('bh-b', 1, 60) + '</g></g>' +
      '<g class="bh-q1"><path class="ink bh-nose" style="stroke:var(--main);stroke-width:8;stroke-dasharray:14 14" d="M610 520 C680 500 740 500 800 480"/><path class="ink bh-mth" style="stroke:var(--main);stroke-width:8;stroke-dasharray:14 14" d="M610 630 C680 650 740 650 800 670"/></g>' +
      '<g class="bh-q2"><path class="bh-fast" style="fill:none;stroke:var(--second);stroke-width:8;stroke-linecap:round"/><path class="bh-slow" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round"/></g></svg>' +
      '<div class="tag tag-cool bh-title">מפגש 3 · נשימה בטנית</div><div class="tag tag-warm bh-notice">רק לשים לב</div><div class="tag bh-same">לא משנים כלום</div>' +
      '<div class="tag bh-t1">אף או פה?</div><div class="tag bh-t2">מהירה או איטית?</div></div>'));
    Object.assign(this, R.refs(kit, 'bh', ['cam', 'body', 'head', 'eyes', 'mouth', 'air', 'badge', 'q1', 'q2', 'nose', 'mth', 'fast', 'slow', 'title', 'notice', 'same', 't1', 't2']));
    this.a = R.refs(kit, 'bh-a', ['armL', 'armR', 'eyes', 'mouth', 'head']);
    this.a.mouth.setAttribute('d', 'M-14 22 Q2 40 18 22');
  },
  render(t) {
    R.blink(this.a.eyes, t, 1.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.2) + ')');
    // Ariel, excited to show this one: a wave, and the breath badge
    const wv = eio(seg(t, 0.6, 1.0)) * (1 - eio(seg(t, 2.8, 3.3)));
    this.a.armR.setAttribute('transform', 'rotate(' + (-120 * wv + Math.sin(t * 9) * 12 * wv) + ' 52 -326)');
    const b = eob(seg(t, 2.3, 2.9), 1.8) * (1 - eo(seg(t, P2 + 0.3, P2 + 0.9)));
    this.badge.setAttribute('transform', 'translate(820 ' + (330 + Math.sin(t * 1.5) * 6) + ') scale(' + b + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 5.6, 6.0))));
    // before starting: Ruth simply notices her breath
    const closed = t > P2 + 2.6 && t < P3 + 0.6;
    if (closed) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    this.head.setAttribute('transform', 'rotate(' + (t < P2 ? 8 * eio(seg(t, 0.4, 1.0)) : 8 - 8 * eio(seg(t, P2, P2 + 0.8))) + ' 0 30)');
    this.air.style.opacity = eo(seg(t, P2 + 3.0, P2 + 3.6)) * (1 - eo(seg(t, P3 + 13.5, P3 + 14.5)));
    this.air.style.strokeDashoffset = -t * 18;
    R.place(this.notice, 540, lerp(84, 70, eo(seg(t, P2 + 3.1, P2 + 3.6))), eo(seg(t, P2 + 3.1, P2 + 3.6)) * (1 - eo(seg(t, P3 + 0.2, P3 + 0.6))));
    // close on her face: no changing anything, just two questions
    const z = eio(seg(t, P3, P3 + 1.6)), zz = lerp(1, 2.6, z), fx = lerp(540, 360, z), fy = lerp(540, 540, z);
    this.cam.setAttribute('transform', 'translate(540 540) scale(' + zz + ') translate(' + (-fx) + ' ' + (-fy) + ')');
    R.place(this.same, 540, lerp(84, 70, eo(seg(t, P3 + 0.8, P3 + 1.3))), eo(seg(t, P3 + 0.8, P3 + 1.3)) * (1 - eo(seg(t, P3 + 5.2, P3 + 5.7))));
    const q1 = eo(seg(t, P3 + 5.6, P3 + 6.1)) * (1 - eo(seg(t, P3 + 9.2, P3 + 9.7)));
    this.q1.style.opacity = q1;
    const which = Math.floor((t - P3 - 5.6) / 0.9) % 2;
    this.nose.style.opacity = which ? 0.35 : 1; this.mth.style.opacity = which ? 1 : 0.35;
    this.nose.style.strokeDashoffset = -t * 40; this.mth.style.strokeDashoffset = -t * 40;
    R.place(this.t1, 540, lerp(84, 70, eo(seg(t, P3 + 5.6, P3 + 6.1))), q1);
    const q2 = eo(seg(t, P3 + 9.6, P3 + 10.1));
    this.q2.style.opacity = q2;
    this.fast.setAttribute('d', R.wavePath(720, 300, 300, 26, 5, -t * 8)); this.slow.setAttribute('d', R.wavePath(720, 760, 300, 50, 1.4, -t * 2));
    R.place(this.t2, 540, lerp(84, 70, eo(seg(t, P3 + 9.6, P3 + 10.1))), q2);
  },
});
