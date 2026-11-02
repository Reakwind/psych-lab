const { seg, eo, eio, eob, lerp } = kit;
// the four ways wait on her phone: which fits today?
const SY = [300, 440, 580, 720];
kit.scene('f-choose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fc', -190) +
      '<g class="fc-ph">' + R.bigPhone('fc') + '</g>' +
      R.WAYS.map(([x, k], i) => '<g class="fc-w' + i + '">' + R.tool('fc-t' + i, k, 56) + '</g>').join('') +
      '<g class="fc-rd" transform="translate(905 170)">' + R.reedB('fc-r') + '</g></svg>' +
      '<div class="tag tag-warm fc-q">איך הכי מתאים לי היום?</div></div>'));
    Object.assign(this, R.refs(kit, 'fc', ['body', 'head', 'eyes', 'mouth', 'ph', 'rd', 'q']));
    this.w = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.fc-w' + k));
    this.stem = kit.stage.querySelector('.fc-r-stem'); this.tip = kit.stage.querySelector('.fc-r-tip');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // her phone rises at the right
    const up = eio(seg(t, 0.2, 1.2));
    this.ph.setAttribute('transform', 'translate(300 ' + lerp(1000, 60, up) + ') scale(.8)');
    // the badges drop from the top row into it, one under the other
    this.w.forEach((el, k) => {
      const p = eio(seg(t, 1.3 + k * 0.35, 2.2 + k * 0.35));
      const x = lerp(R.WAYS[k][0], 732, p), y = lerp(150, SY[k], p) - Math.sin(Math.PI * p) * 60;
      el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + lerp(1, 0.95, p) + ')');
    });
    // a gentle pulse runs down the options, as if she is choosing
    this.w.forEach((el, k) => { const pk = Math.max(0, Math.sin(Math.PI * seg(t, 5.0 + k * 0.7, 5.8 + k * 0.7))); if (pk > 0) el.setAttribute('transform', el.getAttribute('transform') + ' scale(' + (1 + 0.12 * pk) + ')'); });
    this.rd.style.opacity = eo(seg(t, 3.6, 4.2)); this.rd.setAttribute('transform', 'translate(905 170) scale(' + 0.9 * eob(seg(t, 3.6, 4.2), 1.6) + ')');
    R.bend(this.stem, this.tip, 0.3 * Math.sin(t * 1.4));
    this.head.setAttribute('transform', 'rotate(' + 8 * up + ' 0 30)');
    R.look(this.eyes, t, 0.6, 4 * up, -2 * up);
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)));
  },
});
