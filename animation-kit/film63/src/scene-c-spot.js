const { seg, eo, eio, eob, lerp } = kit;
kit.scene('c-spot', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cafeShot('cs') + '</svg><div class="thought cs-card">"כולם רואים אותי, כולם מרחמים עליי"</div>' +
      '<div class="tag tag-warm cs-a">מתוחים</div><div class="tag cs-b">משתתפים פחות</div></div>'));
    this.c = R.cafeRefs(kit, 'cs'); Object.assign(this, R.refs(kit, 'cs', ['card', 'a', 'b']));
  },
  render(t) {
    const c = this.c;
    R.blink(c.eyes, t, 0.6); R.chatter(c, t, t > 9.0);
    // attention narrows onto every movement and every word: the café dims around a shrinking spotlight
    const n = eio(seg(t, 0.6, 3.6));
    c.veil.setAttribute('opacity', 0.55 * n); c.hole.setAttribute('r', lerp(900, 190, n));
    c.hole.setAttribute('cy', lerp(660, 690, n));
    c.tr.setAttribute('transform', 'translate(' + (630 + Math.sin(t * 40) * 3) + ' 740)');
    R.put(this.card, 540, 300, 1, 0, 1 - 0.55 * n);
    // tense and uncomfortable: shoulders up, zigzags
    const ts = eo(seg(t, 7.4, 8.0));
    c.ten.style.opacity = ts * (0.75 + 0.25 * Math.sin(t * 8));
    c.body.setAttribute('transform', 'translate(0 ' + (6 * ts) + ') scale(' + (1 - 0.03 * ts) + ' ' + (1 - 0.02 * ts) + ')');
    // taking part a little less: she leans back, her bubble is gone, the friends keep talking
    const back = eio(seg(t, 9.4, 10.6));
    c.br.style.opacity = 0;
    c.head.setAttribute('transform', 'translate(' + (-4 * back) + ' ' + (10 * ts) + ') rotate(' + (-8 * back) + ' 0 30)');
    c.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
    R.place(this.a, 300, lerp(970, 958, eo(seg(t, 7.6, 8.1))), eo(seg(t, 7.6, 8.1)));
    R.place(this.b, 780, lerp(970, 958, eo(seg(t, 9.7, 10.2))), eo(seg(t, 9.7, 10.2)));
  },
});
