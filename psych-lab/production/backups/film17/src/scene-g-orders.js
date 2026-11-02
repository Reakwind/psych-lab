const { seg, eo, eio, eob, lerp } = kit;
// orders don't calm the body: each command slams in, and she only tenses more
const O = [['עכשיו תפסיק להיות דרוך.', 5.18], ['עכשיו תרפה לגמרי את השרירים.', 7.51], ['עכשיו תירדם.', 10.45]];
kit.scene('g-orders', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g2', -200) + '</svg>' +
      O.map((o, k) => '<div class="order g2-o' + k + '">' + o[0] + '</div>').join('') +
      '<div class="tag tag-warm g2-p">להירגע, זה משהו שאפשר ללמוד לעשות?</div><div class="tag g2-q">התשובה אולי תפתיע אתכם</div><div class="tag tag-red g2-a">אי אפשר לתת לגוף ולמוח פקודה להירגע</div><div class="tag tag-red g2-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g2', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'p', 'q', 'a', 'ml']));
    this.o = O.map((o, k) => kit.stage.querySelector('.g2-o' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const n = O.filter(([w, a]) => t >= a).length;
    const jolt = O.reduce((s, [w, a]) => s + Math.exp(-(t - a) * 8) * (t > a ? 1 : 0), 0);
    this.tn.style.opacity = Math.min(1, 0.3 + 0.25 * n) * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    R.setMeter(this['mt-fill'], 0.6 + 0.06 * n + 0.02 * Math.sin(t * 7));
    this.body.setAttribute('transform', 'translate(' + 4 * Math.sin(t * 50) * jolt + ' ' + (6 + 3 * n) + ') scale(1 ' + kit.breathe(t, 0.014, 2.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-4 + 2 * n) + ' 0 30) translate(0 ' + 2 * n + ')');
    this.mouth.setAttribute('d', n ? R.mouthFlat : R.mouthNeutral);
    O.forEach(([w, a], k) => R.put(this.o[k], 600 + (k - 1) * 30, 210 + k * 105, lerp(1.35, 1, eio(seg(t, a, a + 0.25))), k % 2 ? 2 : -2, eo(seg(t, a, a + 0.12))));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.q, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.6, 3.0))), eo(seg(t, 2.6, 3.0)));
    R.place(this.ml, 975, 886, 1);
  },
});
