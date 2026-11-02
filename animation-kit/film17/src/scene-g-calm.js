const { seg, eo, eio, eob, lerp } = kit;
// in the same way, something pleasant and calming moves her the other way
kit.scene('g-calm', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g10', -200) + '<circle class="g10-gl" cx="300" cy="620" r="240" style="fill:var(--accent);opacity:0"/>' + R.imgBubble('g10b') +
      '<path class="g10-pl" style="fill:none;stroke:#C0392B;stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      ['הדופק משתנה', 'השרירים מתכווצים', 'הגוף נעשה דרוך'].map((n, k) => '<div class="tag tag-red g10-n' + k + '">' + n + '</div>').join('') +
      '<div class="tag tag-red g10-p">עצם המחשבה יכולה לגרום למוח ולגוף להגיב</div><div class="tag tag-cool g10-a">לחשוב ולדמיין משהו נעים ומרגיע</div><div class="tag tag-warm g10-b">משפיעים לכיוון השני</div><div class="tag tag-red g10-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g10', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'gl', 'pl', 'p', 'a', 'b', 'ml']));
    this.bg = kit.stage.querySelector('.g10b'); this.bb = R.bubRefs(kit, 'g10b'); this.n = [0, 1, 2].map((k) => kit.stage.querySelector('.g10-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const clear = eio(seg(t, 1.0, 3.0)), ease = eio(seg(t, 3.0, 5.6));
    R.setBub(this.bb, this.bg, 620, 280, 1, 1, 1 - clear, 0);
    this.pl.setAttribute('d', R.pulseD(470, 560, 320, lerp(1, 0.1, ease), t * 0.8)); this.pl.style.opacity = 1 - eo(seg(t, 3.5, 5.0));
    this.pl.style.stroke = ease > 0.5 ? 'var(--main)' : '#C0392B';
    this.tn.style.opacity = (1 - ease) * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    R.setMeter(this['mt-fill'], lerp(0.8, 0.25, ease));
    this.gl.style.opacity = 0.16 * eo(seg(t, 4.9, 5.8));
    this.body.setAttribute('transform', 'translate(0 ' + 6 * (1 - ease) + ') scale(1 ' + kit.breathe(t, 0.016, lerp(1.2, 4.4, ease)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-2 + 6 * ease) + ' 0 30) translate(0 ' + 5 * (1 - ease) + ')');
    this.mouth.setAttribute('d', ease > 0.5 ? R.mouthHappy : R.mouthSad);
    this.n.forEach((n, k) => R.place(n, 650, 630 + k * 76, 1 - eo(seg(t, 0.4 + k * 0.15, 0.8 + k * 0.15))));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.96, 5.3))), eo(seg(t, 4.96, 5.3)));
    R.place(this.ml, 975, 886, 1);
  },
});
