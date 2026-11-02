const { seg, eo, eio, eob, lerp } = kit;
const P5 = 12.1;
kit.scene('b-state', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect class="bs-sun light" x="80" y="340" width="210" height="200" rx="6" opacity="0"/>' + R.seated('bs', 0) +
      '<g class="bs-bell">' + R.bell('bs-b') + '</g><path class="bs-wave" style="fill:none;stroke-width:12;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      '<div class="tag tag-cool bs-auto">הנשימה משתנה כל הזמן</div><div class="tag bs-stress">בלחץ: מהירה ושטחית</div><div class="tag tag-warm bs-calm">ברוגע: איטית ועמוקה</div><div class="tag tag-cool bs-self">קורה מעצמו</div></div>'));
    Object.assign(this, R.refs(kit, 'bs', ['sun', 'body', 'head', 'eyes', 'mouth', 'bell', 'wave', 'auto', 'stress', 'calm', 'self']));
    this.ph = 0; this.last = 0;
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    // the breath, drawn as a wave above Ruth: it tightens under stress, and slows when she is calm
    const st = eio(seg(t, 6.0, 7.2)) * (1 - eio(seg(t, P5 + 0.4, P5 + 1.6))), calm = eio(seg(t, P5 + 0.6, P5 + 2.2));
    const amp = lerp(lerp(46, 22, st), 78, calm), k = lerp(lerp(3, 8, st), 1.6, calm), speed = lerp(lerp(2, 7, st), 1.1, calm);
    this.wave.setAttribute('d', R.wavePath(100, 230, 880, amp, k, -t * speed));
    this.wave.style.stroke = st > 0.5 ? '#C0392B' : 'var(--main)';
    const ring = Math.sin(Math.PI * 6 * seg(t, 6.0, 7.4));
    this.bell.setAttribute('transform', 'translate(915 410) rotate(' + ring * 14 + ') scale(' + eob(seg(t, 5.8, 6.3), 1.6) * (1 - eo(seg(t, P5, P5 + 0.5))) + ')');
    const tense = st;
    this.body.setAttribute('transform', 'translate(0 ' + (-6 * tense) + ') scale(1 ' + kit.breathe(t, lerp(0.008, 0.004, tense) + 0.01 * calm, lerp(lerp(3.6, 1.4, tense), 5.5, calm)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (Math.sin(t * 9) * 2 * tense) + ' 0 30)');
    this.mouth.setAttribute('d', tense > 0.5 ? 'M-10 30 Q2 24 14 30' : calm > 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.sun.setAttribute('opacity', 0.6 * calm);
    R.place(this.auto, 540, lerp(84, 70, eo(seg(t, 3.2, 3.7))), eo(seg(t, 3.2, 3.7)) * (1 - eo(seg(t, P5 + 5.8, P5 + 6.3))));
    R.place(this.stress, 540, lerp(352, 340, eo(seg(t, 9.2, 9.7))), eo(seg(t, 9.2, 9.7)) * (1 - eo(seg(t, P5 + 0.5, P5 + 1.0))));
    R.place(this.calm, 540, lerp(352, 340, eo(seg(t, P5 + 3.6, P5 + 4.1))), eo(seg(t, P5 + 3.6, P5 + 4.1)));
    R.place(this.self, 540, lerp(84, 70, eo(seg(t, P5 + 6.4, P5 + 6.9))), eo(seg(t, P5 + 6.4, P5 + 6.9)));
  },
});
