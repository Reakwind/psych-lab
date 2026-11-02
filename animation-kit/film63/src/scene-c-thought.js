const { seg, eo, eio, eob, lerp } = kit;
kit.scene('c-thought', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cafeShot('ct') + '</svg><div class="thought ct-card">"כולם רואים אותי, כולם מרחמים עליי"</div></div>'));
    this.c = R.cafeRefs(kit, 'ct'); this.card = kit.stage.querySelector('.ct-card');
  },
  render(t) {
    const c = this.c;
    R.blink(c.eyes, t, 1.2); R.chatter(c, t, true);
    c.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    c.ten.style.opacity = 0; c.tr.setAttribute('transform', 'translate(' + (630 + Math.sin(t * 40) * 3) + ' 740)');
    c.br.setAttribute('transform', 'translate(420 400) scale(.5)'); c.br.style.opacity = 0.45 * (1 - eo(seg(t, 0.6, 1.2)));
    // a thought comes up: everyone sees me, everyone pities me
    const p = seg(t, 1.6, 2.3);
    R.put(this.card, 540, 300 + (1 - eo(p)) * 80, 0.4 + 0.6 * eob(p, 1.4), 0, eo(seg(t, 1.6, 1.9)));
    c.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 1.8, 2.6))) + ' 0 30)');
    c.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
  },
});
