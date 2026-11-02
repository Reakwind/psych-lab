const { seg, eo, eio, eob, lerp } = kit;
// think of something stressful or frightening: the bubble turns stormy, her pulse jumps, her muscles tighten, the meter climbs
const N = [['הדופק משתנה', 7.94], ['השרירים מתכווצים', 9.01], ['הגוף נעשה דרוך', 11.33]];
kit.scene('g-scary', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g9', -200) + R.imgBubble('g9b') +
      '<path class="g9-pl" style="fill:none;stroke:#C0392B;stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      N.map((n, k) => '<div class="tag tag-red g9-n' + k + '">' + n[0] + '</div>').join('') +
      '<div class="tag g9-a">אם נחשוב עכשיו על משהו מלחיץ</div><div class="tag tag-red g9-b">עצם המחשבה יכולה לגרום למוח ולגוף להגיב</div><div class="tag tag-red g9-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g9', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'pl', 'a', 'b', 'ml']));
    this.bg = kit.stage.querySelector('.g9b'); this.bb = R.bubRefs(kit, 'g9b'); this.n = N.map((n, k) => kit.stage.querySelector('.g9-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const storm = eio(seg(t, 2.2, 4.2)), pulse = eo(seg(t, 7.8, 8.3)), tight = eio(seg(t, 8.9, 9.6)), on = eio(seg(t, 11.2, 11.9));
    R.setBub(this.bb, this.bg, 620, 280, 1, 0.8 + 0.2 * eio(seg(t, 0.0, 1.0)), storm, 0);
    this.pl.setAttribute('d', R.pulseD(470, 560, 320, lerp(0.1, 1, pulse), t * 0.8)); this.pl.style.opacity = pulse;
    this.tn.style.opacity = tight * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    R.setMeter(this['mt-fill'], 0.2 + 0.2 * storm + 0.15 * pulse + 0.15 * tight + 0.1 * on + 0.02 * Math.sin(t * 7) * storm);
    this.body.setAttribute('transform', 'translate(0 ' + (6 * tight) + ') scale(1 ' + kit.breathe(t, 0.014 + 0.01 * storm, lerp(4.4, 1.2, storm)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 + 4 * tight) + ' 0 30) translate(0 ' + 5 * tight + ')');
    this.mouth.setAttribute('d', storm > 0.5 ? R.mouthSad : R.mouthNeutral);
    N.forEach(([w, a], k) => R.place(this.n[k], 650, lerp(642, 630, eo(seg(t, a, a + 0.35))) + k * 76, eo(seg(t, a, a + 0.35))));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.23, 2.6))), eo(seg(t, 2.23, 2.6)) * (1 - eo(seg(t, 5.4, 5.7))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 5.7, 6.0))), eo(seg(t, 5.7, 6.0)));
    R.place(this.ml, 975, 886, 1);
  },
});
