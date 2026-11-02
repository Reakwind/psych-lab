const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-full', {
  init(kit) {
    const M = R.M58;
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mf', 0) +
      M.STRIP.map((x, k) => R.task('mf-b' + k)).join('') + '<g class="mf-hb">' + R.tool('mf-h', 3, 48) + '</g></svg>' +
      '<div class="tag tag-cool mf-title">מפגש 58 · רגע, זה חשוב לי</div></div>'));
    Object.assign(this, R.refs(kit, 'mf', ['head', 'eyes', 'mouth', 'body', 'hb', 'title']));
    this.b = M.STRIP.map((x, k) => kit.stage.querySelector('.mf-b' + k));
  },
  render(t) {
    const M = R.M58;
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
    // the day fills up, block after block, edge to edge
    this.b.forEach((el, k) => { const p = eio(seg(t, 0.5 + k * 0.32, 1.2 + k * 0.32)); el.setAttribute('transform', 'translate(' + (M.STRIP[k] + (1 - p) * 900) + ' ' + M.SY + ')'); el.style.opacity = p > 0 ? 1 : 0; });
    // what matters waits at the edge, tries to squeeze in on "מקום", and is pushed back out
    const h = eo(seg(t, 0.6, 1.2)), push = Math.sin(Math.PI * seg(t, 3.0, 3.9)), out = eio(seg(t, 3.9, 4.8));
    this.hb.setAttribute('transform', 'translate(' + (98 + 46 * push - 20 * out) + ' ' + (M.SY + 40 * out) + ') scale(' + (0.4 + 0.6 * eob(h, 1.6)) + ')');
    this.hb.style.opacity = h;
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 1.0, 1.8)) + 6 * eio(seg(t, 3.2, 4.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.6 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
  },
});
