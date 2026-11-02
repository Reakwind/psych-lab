const { seg, eo, eio, eob, lerp } = kit;
// slowed and given a steady beat, the ragged trace settles into the box rhythm (rise, hold, fall, hold); the meter eases down
kit.scene('q-slow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q5', -230) + R.box('q5b') +
      '<path class="q5-tr" style="fill:none;stroke:#C0392B;stroke-width:10;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      '<div class="tag q5-p">כשאנחנו דרוכים, הנשימה נעשית</div>' + ['מהירה', 'שטחית', 'פחות סדירה'].map((n, k) => '<div class="tag tag-red q5-n' + k + '">' + n + '</div>').join('') + '<div class="tag tag-cool q5-a">קצב קבוע</div><div class="tag tag-warm q5-b">מאותתים לגוף שאפשר קצת להוריד הילוך</div><div class="tag tag-red q5-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'q5', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'tr', 'p', 'a', 'b', 'ml']));
    this.x = R.boxRefs(kit, 'q5b'); this.n = [0, 1, 2].map((k) => kit.stage.querySelector('.q5-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const calm = eio(seg(t, 0.9, 3.2)), ease = eio(seg(t, 3.9, 6.6));
    R.setBox(this.x, { draw: [0, 0, 0, 0], ticks: 0, dot: null, ring: 0 });
    // the trace's phase runs fast while ragged, then slows to an even beat
    const ph = t < 0.9 ? t * 1.2 : 1.08 + (t - 0.9) * lerp(1.2, 0.22, Math.min(1, (t - 0.9) / 2.3));
    this.tr.setAttribute('d', R.traceD(565, 450, 330, lerp(70, 160, calm), 1 - calm, ph));
    this.tr.style.stroke = calm > 0.5 ? 'var(--main)' : '#C0392B';
    R.setMeter(this['mt-fill'], 0.75 - 0.4 * ease + 0.03 * Math.sin(t * 7) * (1 - calm));
    const tense = 1 - calm;
    this.tn.style.opacity = tense * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.pf.style.opacity = tense * (0.5 + 0.5 * Math.abs(Math.sin(t * 6)));
    this.body.setAttribute('transform', 'translate(0 ' + 6 * tense + ') scale(1 ' + kit.breathe(t, 0.02, lerp(1.0, 4.0, calm)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-5 + 5 * tense + 3 * ease) + ' 0 30) translate(0 ' + 5 * tense + ')');
    this.mouth.setAttribute('d', ease > 0.5 ? R.mouthHappy : calm > 0.5 ? R.mouthNeutral : R.mouthSad);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.6, 1.0)));
    this.n.forEach((n, k) => R.place(n, [880, 730, 560][k], 130, 1 - eo(seg(t, 1.6, 2.2))));
    R.place(this.a, 730, lerp(142, 130, eo(seg(t, 2.76, 3.1))), eo(seg(t, 2.76, 3.1)));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 3.98, 4.4))), eo(seg(t, 3.98, 4.4)));
    R.place(this.ml, 975, 886, 1);
  },
});
