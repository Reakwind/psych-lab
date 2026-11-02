const { seg, eo, eio, eob, lerp } = kit;
// on each phrase: people, a hobby, independence, helping others, feeling more ourselves
const AT = [0.4, 2.5, 4.6, 5.7, 9.0];
kit.scene('m-five', {
  init(kit) {
    const M = R.M58;
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mv', 0) +
      '<g class="mv-strip">' + M.STRIP.map((x, k) => '<g transform="translate(' + x + ' ' + M.SY + ')">' + R.task('mv-b' + k) + '</g>').join('') + '<g transform="translate(98 ' + (M.SY + 40) + ')">' + R.tool('mv-h', 3, 48) + '</g></g>' +
      '<rect class="mv-veil" width="1080" height="1080" style="fill:var(--ground)" opacity="0"/>' +
      M.BADGE.map((p, k) => R.matter('mv-m' + k, k, 74)).join('') + '</svg>' +
      M.LABEL.map((l, k) => '<div class="tag mv-l' + k + '">' + l[0] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mv', ['head', 'eyes', 'mouth', 'body', 'strip', 'veil']));
    this.m = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.mv-m' + k));
    this.l = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.mv-l' + k));
  },
  render(t) {
    const M = R.M58;
    R.blink(this.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the busy strip lifts away and the room softens, so the badges can be read
    const off = eio(seg(t, 0.0, 0.8));
    this.strip.setAttribute('transform', 'translate(0 ' + (-260 * off) + ')'); this.strip.style.opacity = 1 - off;
    this.veil.setAttribute('opacity', 0.28 * eo(seg(t, 0.0, 0.8)));
    let look = 0;
    AT.forEach((a, k) => {
      const p = seg(t, a, a + 0.6), [x, y] = M.BADGE[k];
      this.m[k].setAttribute('transform', 'translate(' + x + ' ' + (y + (1 - eo(p)) * 40 + Math.sin(t * 1.3 + k) * 5) + ') scale(' + eob(p, 1.6) + ')');
      this.m[k].style.opacity = eo(seg(t, a, a + 0.25));
      const [, lx, ly] = M.LABEL[k], q = eo(seg(t, a + 0.2, a + 0.7));
      R.place(this.l[k], lx, ly - 29 + (1 - q) * 12, q);
      if (t > a) look = x;
    });
    this.head.setAttribute('transform', 'rotate(' + (look ? (look - 500) / 60 : 0) + ' 0 30)');
    this.mouth.setAttribute('d', t > 0.6 ? 'M-12 24 Q2 34 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
