const { seg, eo, eio, eob, lerp } = kit;
const LIT = [[1, 0.9], [3, 1.7], [4, 2.5]];
kit.scene('m-how', {
  init(kit) {
    const M = R.M58;
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mh', 230) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' +
      M.STRIP.map((x, k) => '<g transform="translate(' + x + ' ' + (M.SY + 110) + ')">' + R.task('mh-b' + k) + '</g>').join('') +
      LIT.map((l, k) => R.heart('mh-h' + k, 1.1)).join('') + '<g transform="translate(330 640)">' + R.matter('mh-m', 0, 84) + '</g></svg>' +
      '<div class="q mh-q">איך הוא בא לידי ביטוי בחיים שלי?</div></div>'));
    Object.assign(this, R.refs(kit, 'mh', ['head', 'eyes', 'mouth', 'body', 'q']));
    this.h = LIT.map((l, k) => kit.stage.querySelector('.mh-h' + k));
  },
  render(t) {
    const M = R.M58;
    R.blink(this.eyes, t, 2.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const q = seg(t, 0.1, 0.7);
    R.put(this.q, 540, 120 + (1 - eo(q)) * 30, eob(q, 1.4), 0, eo(seg(t, 0.1, 0.4)));
    // where it already shows up: small hearts light between the grey blocks of her day
    LIT.forEach(([b, a], k) => { const p = seg(t, a, a + 0.5); this.h[k].setAttribute('transform', 'translate(' + M.STRIP[b] + ' ' + (M.SY + 28 + Math.sin(t * 2 + k) * 4) + ') scale(' + eob(p, 2) + ')'); this.h[k].style.opacity = eo(seg(t, a, a + 0.2)); });
    this.head.setAttribute('transform', 'rotate(' + (-4 - 4 * eio(seg(t, 0.8, 1.6))) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
  },
});
