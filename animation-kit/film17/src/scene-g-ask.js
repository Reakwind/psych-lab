const { seg, eo, eio, eob, lerp } = kit;
// can relaxing be learned? Ruth in her armchair wonders
kit.scene('g-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g1', -200) + '</svg>' +
      '<div class="count g1-q">?</div><div class="tag tag-cool g1-t">מפגש 17 · הרפיה ודמיון מודרך</div><div class="tag tag-warm g1-a">להירגע, זה משהו שאפשר ללמוד לעשות?</div><div class="tag g1-b">התשובה אולי תפתיע אתכם</div><div class="tag tag-red g1-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g1', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'q', 't', 'a', 'b', 'ml']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.tn.style.opacity = 0.5 * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    R.setMeter(this['mt-fill'], 0.6);
    const q = eo(seg(t, 1.5, 2.0));
    this.body.setAttribute('transform', 'translate(0 6) scale(1 ' + kit.breathe(t, 0.014, 2.8) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-10 * q + 8 * eio(seg(t, 5.3, 6.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 5.4 ? R.mouthHappy : R.mouthFlat);
    R.put(this.q, 420, 360 - 8 * Math.sin(t * 3) * q, 0.7 + 0.3 * eob(seg(t, 1.5, 2.0), 1.6), 10, q * (1 - eo(seg(t, 5.2, 5.6))));
    R.place(this.t, 540, lerp(54, 40, eo(seg(t, 0.1, 0.5))), eo(seg(t, 0.1, 0.5)) * (1 - eo(seg(t, 1.2, 1.5))));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.46, 1.8))), eo(seg(t, 1.46, 1.8)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.28, 5.6))), eo(seg(t, 5.28, 5.6)));
    R.place(this.ml, 975, 886, 1);
  },
});
