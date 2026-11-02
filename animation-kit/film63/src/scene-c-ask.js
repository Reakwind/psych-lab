const { seg, eo, eio, eob, lerp } = kit;
// back at the table: stop for a moment and ask what could help here
kit.scene('c-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cafeShot('cq') + '</svg><div class="say cq-q">מה יכול לעזור לי כאן?</div></div>'));
    this.c = R.cafeRefs(kit, 'cq'); this.q = kit.stage.querySelector('.cq-q');
  },
  render(t) {
    const c = this.c;
    c.ten.style.opacity = 0; c.tr.style.opacity = 0.6;
    c.tr.setAttribute('transform', 'translate(' + (630 + Math.sin(t * 40) * 2) + ' 740)');
    R.chatter(c, t, t > 5.4);
    c.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    // a pause: eyes closed for a breath
    const closed = t > 1.0 && t < 2.6;
    if (closed) c.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(c.eyes, t, 0.2);
    const p = seg(t, 3.0, 3.6);
    R.put(this.q, 540, 250 + (1 - eo(p)) * 30, eob(p, 1.4), 0, eo(seg(t, 3.0, 3.3)));
    // and back into the conversation
    c.br.setAttribute('transform', 'translate(420 ' + (400 + Math.sin(t * 2.6) * 6) + ') scale(.8)'); c.br.style.opacity = eo(seg(t, 5.6, 6.2));
    c.ba.style.opacity = 1 - 0.6 * eo(seg(t, 2.8, 3.2)) * (1 - eo(seg(t, 5.4, 5.8))); c.bb.style.opacity = c.ba.style.opacity;
    c.head.setAttribute('transform', 'rotate(' + (t > 5.6 ? 4 * Math.sin(t * 1.2) : 0) + ' 0 30)');
    c.mouth.setAttribute('d', t > 5.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
