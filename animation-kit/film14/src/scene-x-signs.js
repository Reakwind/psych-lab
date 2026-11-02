const { seg, eo, eio, eob, lerp } = kit;
const N = [['הנשימה מהירה יותר', 2.65], ['השרירים מתכווצים', 3.84], ['קשה יותר להתרכז', 6.08], ['המחשבות מתחילות לרוץ', 9.05], ['קשה להירדם בלילה', 10.17]];
kit.scene('x-signs', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x2', -120) + '<g class="x2-sww"><g transform="scale(2.4)">' + R.swirl('x2-sw') + '</g></g>' +
      [0, 1, 2].map((k) => '<g class="x2-b' + k + '">' + R.balloon('x2-bl' + k) + '</g>').join('') + '</svg>' +
      N.map((n, k) => '<div class="tag tag-warm x2-n' + k + '">' + n[0] + '</div>').join('') + '<div class="tag tag-cool x2-t">מפגש 14 · מתח, חרדה והרגעת הגוף</div><div class="tag tag-warm x2-a">מה שקורה בגוף</div><div class="tag tag-red x2-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x2', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'nw', 'mt-fill', 'sww', 't', 'a', 'ml']));
    this.n = N.map((n, k) => kit.stage.querySelector('.x2-n' + k)); this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.x2-b' + k));
  },
  render(t) {
    if (t < 10.0) R.blink(this.eyes, t, 0.6); else this.eyes.setAttribute('transform', '');
    // one sign after another, and the meter climbs: quick breath, tight muscles, scattered focus, racing thoughts, a sleepless night
    const tight = eio(seg(t, 3.6, 4.3));
    this.body.setAttribute('transform', 'translate(0 ' + 8 * tight + ') scale(1 ' + (kit.breathe(t, 0.02, t > 0.8 ? 1.1 : 3.6) - 0.02 * tight) + ')');
    this.pf.style.opacity = eo(seg(t, 0.8, 1.2)) * (0.5 + 0.5 * Math.abs(Math.sin(t * 6)));
    this.tn.style.opacity = tight * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    const sw = eob(seg(t, 5.8, 6.4), 1.5);
    this.sww.setAttribute('transform', 'translate(380 330) scale(' + Math.max(0.001, sw) + ') rotate(' + t * 160 + ')'); this.sww.style.opacity = eo(seg(t, 5.8, 6.0));
    const run = seg(t, 7.6, 8.4);
    this.b.forEach((b, k) => { const a = t * 2.4 + k * 2.09; R.setG(b, 360 + Math.cos(a) * 170, 330 + Math.sin(a) * 55, 0.7 * eob(run, 1.4), eo(run)); });
    this.nw.setAttribute('opacity', eo(seg(t, 9.9, 10.6)));
    R.setMeter(this['mt-fill'], 0.35 + [2.65, 3.84, 6.08, 9.05, 10.17].reduce((s, a) => s + 0.1 * eob(seg(t, a - 0.2, a + 0.4), 1.3), 0));
    this.head.setAttribute('transform', 'rotate(' + (4 - 4 * tight + Math.sin(t * 1.7) * 3 * eo(run)) + ' 0 30) translate(0 ' + 6 * tight + ')');
    this.mouth.setAttribute('d', t > 3.8 ? R.mouthSad : R.mouthNeutral);
    N.forEach(([w, a], k) => R.place(this.n[k], 700, lerp(212, 200, eo(seg(t, a, a + 0.4))) + k * 80, eo(seg(t, a, a + 0.4))));
    R.place(this.t, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 380, 330, 1 - eo(seg(t, 0.3, 0.7)));
    R.place(this.ml, 920, 886, 1);
  },
});
