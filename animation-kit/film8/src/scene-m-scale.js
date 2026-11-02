const { seg, eo, eio, eob, lerp } = kit;
const S = 1.2, Y = 380, X = (x) => 540 + (x - 540) * S, YY = (y) => Y + (y - 175) * S;
kit.scene('m-scale', {
  init(kit) {
    const right = R.block('ms-b0', -40, 90, 90) + R.block('ms-b1', 50, 70, 60);
    const left = R.token('ms-k0', 'heart', 62, 30) + R.token('ms-k1', 'talk', 0, 30) + R.token('ms-k2', 'compass', -62, 30);
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 ' + Y + ') scale(' + S + ') translate(-540 -175)">' + R.scale('ms', right, left) + '</g></svg>' +
      '<div class="tag tag-cool ms-q">האם זה כל מה שיש בתמונה?</div><div class="tag ms-r">הקושי</div><div class="tag ms-l">מה עוד יש</div><div class="tag tag-warm ms-t" style="font-size:44px;padding:14px 34px">חשיבה מאוזנת</div></div>'));
    Object.assign(this, R.refs(kit, 'ms', ['beam', 'panR', 'panL', 'k0', 'k1', 'k2', 'q', 'r', 'l', 't']));
  },
  render(t) {
    // only the hard side at first; then what else is there joins the other pan, and the beam comes level
    const ks = [2.4, 3.1, 3.8].map((a) => eob(seg(t, a, a + 0.5), 1.8));
    ks.forEach((p, k) => { this['k' + k].style.opacity = eo(seg(t, [2.4, 3.1, 3.8][k], [2.4, 3.1, 3.8][k] + 0.2)); this['k' + k].setAttribute('transform', 'translate(0 ' + (1 - p) * -60 + ')'); });
    const lvl = eio(seg(t, 4.4, 5.8)), deg = lerp(14, 0, lvl) + Math.sin(t * 3) * 1.2 * (1 - lvl) + Math.sin((t - 5.8) * 5) * 1.5 * Math.exp(-Math.max(0, t - 5.8) * 2) * (t > 5.8);
    const p = R.setScale(this, deg, 0);
    R.place(this.r, X(p.R[0]), YY(p.R[1]) + 14, eo(seg(t, 1.2, 1.6)));
    R.place(this.l, X(p.L[0]), YY(p.L[1]) + 14, eo(seg(t, 2.4, 2.8)));
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)));
    R.place(this.t, 540, lerp(860, 840, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
  },
});
