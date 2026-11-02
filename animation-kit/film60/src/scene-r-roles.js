const { seg, eo, eio, eob, lerp } = kit;
// one badge per role, on Nira's words: partners, parents, grandparents, friends, workers, volunteers, community
const AT = [5.6, 6.5, 7.1, 8.2, 8.8, 9.5, 10.8];
kit.scene('r-roles', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' +
      '<g transform="translate(540 1010)">' + R.ruth('rr', 'stand') + '</g>' + R.RING.map((p, k) => R.role('rr-b' + k, k)).join('') + '</svg>' +
      R.ROLES.map((n, k) => '<div class="tag rr-l' + k + '">' + n + '</div>').join('') + '<div class="tag tag-cool rr-title">מפגש 60 · שינויים בתפקידים שלנו</div></div>'));
    Object.assign(this, R.refs(kit, 'rr', ['head', 'eyes', 'mouth', 'title']));
    this.b = R.RING.map((p, k) => kit.stage.querySelector('.rr-b' + k));
    this.l = R.RING.map((p, k) => kit.stage.querySelector('.rr-l' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 4.6, 5.2))));
    let look = 540;
    AT.forEach((a, k) => {
      const p = seg(t, a, a + 0.5), [x, y] = R.RING[k];
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + (y + (1 - eo(p)) * 30 + Math.sin(t * 1.2 + k) * 4) + ') scale(' + eob(p, 1.6) + ')');
      this.b[k].style.opacity = eo(seg(t, a, a + 0.2));
      const q = eo(seg(t, a + 0.15, a + 0.6));
      R.place(this.l[k], R.RLAB[k][0], R.RLAB[k][1] - 29 + (1 - q) * 10, q);
      if (t > a) look = x;
    });
    this.head.setAttribute('transform', 'rotate(' + (look - 540) / 50 + ' 0 30)');
    this.mouth.setAttribute('d', t > 5.6 ? 'M-12 24 Q2 34 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
