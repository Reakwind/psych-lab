const { seg, eo, eio, eob, lerp } = kit;
// the box gives way to a breath trace; when Ruth is tense the trace turns quick, shallow and ragged and the tension meter climbs
const N = [['מהירה', 880, 8.67], ['שטחית', 730, 9.19], ['פחות סדירה', 560, 10.24]];
kit.scene('q-tense', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q4', -230) + R.box('q4b') +
      '<path class="q4-tr" style="fill:none;stroke:#C0392B;stroke-width:10;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      N.map((n, k) => '<div class="tag tag-red q4-n' + k + '">' + n[0] + '</div>').join('') +
      '<div class="tag tag-cool q4-a">יעילה בוויסות של מתח וחרדה</div><div class="tag q4-b">כשאנחנו דרוכים, הנשימה נעשית</div><div class="tag tag-red q4-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'q4', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mw', 'mt-fill', 'tr', 'a', 'b', 'ml']));
    this.x = R.boxRefs(kit, 'q4b'); this.n = N.map((n, k) => kit.stage.querySelector('.q4-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const mIn = eo(seg(t, 2.4, 3.0)), off = eio(seg(t, 4.4, 5.3)), tr = eo(seg(t, 5.0, 5.8)), tense = eio(seg(t, 6.9, 7.6));
    R.setBox(this.x, { draw: [1 - off, 1 - off, 1 - off, 1 - off], ticks: 1 - off, dot: t < 4.4 ? (t * 0.3) % 4 : null, lit: 0, ring: 0.45 * (1 - off) });
    this.tr.setAttribute('d', R.traceD(565, 450, 330, lerp(150, 70, tense), 1, t * lerp(0.35, 1.2, tense)));
    this.tr.style.opacity = tr;
    this.mw.style.opacity = mIn;
    R.setMeter(this['mt-fill'], 0.3 + 0.45 * tense + 0.03 * Math.sin(t * 7) * tense);
    this.tn.style.opacity = tense * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.pf.style.opacity = eo(seg(t, 8.5, 8.9)) * (0.5 + 0.5 * Math.abs(Math.sin(t * 6)));
    this.body.setAttribute('transform', 'translate(0 ' + 6 * tense + ') scale(1 ' + kit.breathe(t, 0.012 + 0.01 * tense, t > 8.5 ? 1.0 : 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-5 + 5 * tense) + ' 0 30) translate(0 ' + 5 * tense + ')');
    this.mouth.setAttribute('d', t > 7.0 ? R.mouthSad : R.mouthNeutral);
    N.forEach(([w, x, a], k) => R.place(this.n[k], x, lerp(142, 130, eo(seg(t, a, a + 0.35))), eo(seg(t, a, a + 0.35))));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)) * (1 - eo(seg(t, 6.6, 7.0))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 7.0, 7.4))), eo(seg(t, 7.0, 7.4)));
    R.place(this.ml, 975, 886, mIn);
  },
});
