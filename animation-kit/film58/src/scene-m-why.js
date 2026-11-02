const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-why', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mw', 230) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' + R.matter('mw-m', 0, 120) +
      [0, 1, 2, 3].map((k) => R.heart('mw-h' + k, 0.9)).join('') + '</svg>' +
      '<div class="q mw-q">למה הדבר הזה חשוב?</div></div>'));
    Object.assign(this, R.refs(kit, 'mw', ['head', 'eyes', 'mouth', 'body', 'm', 'q']));
    this.glow = kit.stage.querySelector('.mw-m-glow');
    this.h = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.mw-h' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const q = seg(t, 1.3, 1.9);
    R.put(this.q, 540, 120 + (1 - eo(q)) * 30, eob(q, 1.4), 0, eo(seg(t, 1.3, 1.6)));
    // why it matters: the badge grows warmer, small hearts rise from it
    const g = eio(seg(t, 2.0, 3.6));
    this.m.setAttribute('transform', 'translate(330 ' + (560 + Math.sin(t * 1.1) * 6) + ') scale(' + (0.9 + 0.12 * g) + ')');
    this.glow.setAttribute('opacity', 0.2 + 0.4 * g);
    this.h.forEach((el, k) => { const p = seg(t, 2.8 + k * 0.8, 5.6 + k * 0.8); el.setAttribute('transform', 'translate(' + (330 + (k % 2 ? 1 : -1) * (60 + 30 * p)) + ' ' + (440 - 220 * p) + ') scale(' + (0.6 + 0.6 * eo(p)) + ')'); el.style.opacity = p > 0 ? Math.sin(Math.PI * p) : 0; });
    this.head.setAttribute('transform', 'rotate(-6 0 30)');
    this.mouth.setAttribute('d', 'M-12 24 Q2 34 16 24');
  },
});
