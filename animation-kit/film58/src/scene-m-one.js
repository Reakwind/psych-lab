const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-one', {
  init(kit) {
    const M = R.M58;
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mo', 0) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' + M.BADGE.map((p, k) => R.matter('mo-m' + k, k, 74)).join('') +
      '<g class="mo-hg">' + R.hourglass('mo-h') + '</g></svg>' +
      M.LABEL.map((l, k) => '<div class="tag mo-l' + k + '">' + l[0] + '</div>').join('') +
      '<div class="tag tag-warm mo-one">דבר אחד</div><div class="tag tag-cool mo-few">כמה רגעים</div></div>'));
    Object.assign(this, R.refs(kit, 'mo', ['head', 'eyes', 'mouth', 'body', 'hg', 'one', 'few']));
    this.m = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.mo-m' + k));
    this.l = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.mo-l' + k));
    this.glow = kit.stage.querySelector('.mo-m0-glow');
  },
  render(t) {
    const M = R.M58;
    R.blink(this.eyes, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // choose one: the others step back, the chosen one comes close
    const fade = eio(seg(t, 0.9, 1.7)), come = eio(seg(t, 1.6, 2.6));
    for (let k = 1; k < 5; k++) {
      const [x, y] = M.BADGE[k];
      this.m[k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 1.3 + k) * 5) + ') scale(' + (1 - 0.3 * fade) + ')');
      this.m[k].style.opacity = 1 - 0.85 * fade;
      R.place(this.l[k], M.LABEL[k][1], M.LABEL[k][2] - 29, 1 - fade);
    }
    const [x0, y0] = M.BADGE[0];
    this.m[0].setAttribute('transform', 'translate(' + lerp(x0, 780, come) + ' ' + lerp(y0, 470, come) + ') scale(' + (1 + 0.35 * come) + ')');
    this.glow.setAttribute('opacity', 0.45 * come);
    R.place(this.l[0], lerp(M.LABEL[0][1], 780, come), lerp(M.LABEL[0][2] - 29, 600, come), 1);
    R.place(this.one, 540, lerp(84, 70, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)));
    // a few moments: the hourglass turns over
    const hg = eo(seg(t, 3.0, 3.5)), flip = eio(seg(t, 3.9, 4.8));
    this.hg.setAttribute('transform', 'translate(240 690) scale(' + 0.62 * eob(hg, 1.5) + ') rotate(' + 180 * flip + ')');
    this.hg.style.opacity = hg;
    R.place(this.few, 240, lerp(836, 824, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    this.head.setAttribute('transform', 'rotate(' + (6 * come) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-12 24 Q2 34 16 24');
  },
});
