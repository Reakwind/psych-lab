const { seg, eo, eio, eob, lerp } = kit;
// the body holds tension without our noticing: when we're stressed, around symptoms, or just after a hard day — the meter climbs
const C = [['לחץ', 4.75, 850, 214], ['סימפטומים', 6.45, 540, 300], ['יום קשה', 8.86, 185, 280]];
kit.scene('q-hold', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qh', 0) +
      '<g class="qh-wg">' + R.worry('qh-w') + '</g><g class="qh-tr"><g transform="translate(520 712) scale(1.3)">' + R.tremor('qh-t') + '</g></g></svg>' +
      '<div class="tag tag-warm qh-a">הגוף מחזיק מתח</div>' + C.map((c, k) => '<div class="tag qh-c' + k + '">' + c[0] + '</div>').join('') + '<div class="tag tag-red qh-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'qh', ['body', 'head', 'eyes', 'mouth', 'brow', 'tn', 'pf', 'nw', 'mt-fill', 'wg', 'tr', 'a', 'ml']));
    this.w = R.refs(kit, 'qh-w', ['eyes', 'mouth']); this.c = C.map((c, k) => kit.stage.querySelector('.qh-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.pf.style.opacity = 0;
    // tension builds in her shoulders, without her noticing
    const hold = eo(seg(t, 1.5, 2.3)), slump = eio(seg(t, 8.9, 9.8));
    this.tn.style.opacity = hold * (0.55 + 0.45 * Math.abs(Math.sin(t * 6)));
    this.body.setAttribute('transform', 'translate(0 ' + (6 * hold + 8 * slump) + ') scale(1 ' + (kit.breathe(t, 0.008, 3.0) - 0.015 * hold) + ')');
    this.head.setAttribute('transform', 'translate(0 ' + (5 * hold + 6 * slump) + ') rotate(' + (-4 * slump) + ' 0 30)');
    this.brow.setAttribute('opacity', 0.7 * eo(seg(t, 4.8, 5.4)));
    this.mouth.setAttribute('d', t > 4.8 ? R.mouthSad : R.mouthNeutral);
    // stress: a grey worry by the door
    const w = eob(seg(t, 4.6, 5.2), 1.6);
    this.wg.setAttribute('transform', 'translate(850 ' + (330 + 6 * Math.sin(t * 1.3)) + ') scale(' + Math.max(0.001, 0.85 * w) + ')'); this.wg.style.opacity = eo(seg(t, 4.6, 4.8));
    this.w.mouth.setAttribute('d', 'M-22 16 q7 ' + (-7 + 2 * Math.sin(t * 6)) + ' 14 0 t14 0 t14 0'); R.blink(this.w.eyes, t, 2.2);
    // symptoms: a tremor at her hands
    const tr = eo(seg(t, 6.3, 6.8));
    this.tr.style.opacity = tr; this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) * tr + ' 0)');
    // a hard day: the window goes dark
    this.nw.setAttribute('opacity', eo(seg(t, 8.8, 9.6)));
    R.setMeter(this['mt-fill'], 0.35 + 0.08 * hold + C.reduce((s, c) => s + 0.11 * eob(seg(t, c[1] - 0.1, c[1] + 0.5), 1.3), 0));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    C.forEach(([, a, x, y], k) => R.place(this.c[k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    R.place(this.ml, 920, 886, 1);
  },
});
