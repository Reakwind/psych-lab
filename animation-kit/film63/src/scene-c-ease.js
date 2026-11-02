const { seg, eo, eio, eob, lerp } = kit;
// back at the café: distance from the thought, attention to what's around, the body lets go a little
kit.scene('c-ease', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cafeShot('ce') + '</svg><div class="thought ce-card">"כולם רואים אותי, כולם מרחמים עליי"</div>' +
      '<div class="tag tag-cool ce-a">קצת מרחק</div><div class="tag tag-warm ce-b">מה שקורה סביבנו</div><div class="tag ce-cc">לשחרר קצת מתח</div></div>'));
    this.c = R.cafeRefs(kit, 'ce'); Object.assign(this, R.refs(kit, 'ce', ['card', 'a', 'b', 'cc']));
  },
  render(t) {
    const c = this.c;
    R.blink(c.eyes, t, 0.9);
    // the card moves out to arm's length
    const d = eio(seg(t, 0.5, 2.5));
    R.put(this.card, lerp(540, 820, d), lerp(300, 180, d), lerp(1, 0.68, d), 0, lerp(0.45, 1, d));
    R.place(this.a, 820, lerp(296, 284, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    // the spotlight opens out to the whole table and the café
    const w = eio(seg(t, 4.0, 6.6));
    c.veil.setAttribute('opacity', 0.55 * (1 - w)); c.hole.setAttribute('r', lerp(190, 900, w)); c.hole.setAttribute('cy', lerp(690, 660, w));
    R.chatter(c, t, true);
    c.br.setAttribute('transform', 'translate(420 400) scale(.8)'); c.br.style.opacity = eo(seg(t, 6.6, 7.2));
    R.place(this.b, 300, lerp(970, 958, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)));
    // shoulders drop
    const r = eio(seg(t, 8.0, 9.6));
    c.ten.style.opacity = (1 - r) * (0.75 + 0.25 * Math.sin(t * 8));
    c.body.setAttribute('transform', 'translate(0 ' + (6 * (1 - r)) + ') scale(' + (1 - 0.03 * (1 - r)) + ' ' + (1 - 0.02 * (1 - r)) * kit.breathe(t, 0.008, 3.6) + ')');
    c.head.setAttribute('transform', 'translate(' + (-4 * (1 - w)) + ' ' + (10 * (1 - r)) + ') rotate(' + (-8 * (1 - w) + 6 * w * Math.sin(t)) + ' 0 30)');
    c.tr.setAttribute('transform', 'translate(' + (630 + Math.sin(t * 40) * 3) + ' 740)');
    c.mouth.setAttribute('d', t > 9.0 ? 'M-12 24 Q2 34 16 24' : t > 6.6 ? 'M-10 28 Q2 26 14 28' : 'M-10 30 Q2 24 14 30');
    R.place(this.cc, 780, lerp(970, 958, eo(seg(t, 9.0, 9.5))), eo(seg(t, 9.0, 9.5)));
  },
});
