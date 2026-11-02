const { seg, eo, eio, eob, lerp } = kit;
// stop and ask: what matters to me in this role, what would I keep, can it take another shape?
const Q = [[5.1, 'מה חשוב לי בתפקיד הזה?'], [7.5, 'על איזה חלק ממנו הייתי רוצה לשמור?'], [10.8, 'והאם הוא יכול לקבל צורה אחרת?']];
kit.scene('r-shape', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' +
      '<g class="rs-g">' + R.roleCard('rs') + '<circle class="rs-glow amber-lt" cx="0" cy="-104" r="70" opacity="0"/><g class="rs-heart" transform="translate(0 -104)"><path class="amber-dk" d="M0 30 C-50 0 -34 -48 0 -24 C34 -48 50 0 0 30Z"/></g>' +
      '<circle class="rs-keep" cx="0" cy="-104" r="58" style="fill:none;stroke:var(--main);stroke-width:8;stroke-dasharray:16 10" opacity="0"/></g></svg>' +
      Q.map((q, k) => '<div class="q rs-q' + k + '">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'rs', ['g', 'glow', 'heart', 'keep']));
    this.way = kit.stage.querySelector('path.rs-way');
    this.q = Q.map((q, k) => kit.stage.querySelector('.rs-q' + k));
  },
  render(t) {
    this.g.setAttribute('transform', 'translate(540 300) scale(.82)');
    // the heart of the role
    this.glow.setAttribute('opacity', 0.5 * eo(seg(t, 5.2, 5.8)) * (0.8 + 0.2 * Math.sin(t * 2.4)));
    this.heart.setAttribute('transform', 'translate(0 -104) scale(' + (1 + 0.15 * eob(seg(t, 5.2, 5.8), 2) * (1 - eo(seg(t, 5.8, 6.4))) ) + ')');
    // the part to keep: a ring holds it
    const k = eo(seg(t, 8.4, 9.0));
    this.keep.setAttribute('opacity', k); this.keep.setAttribute('transform', 'rotate(' + t * 20 + ' 0 -104)');
    // another shape: the lower layer bends into a new outline
    const m = eio(seg(t, 11.2, 12.6));
    this.way.setAttribute('d', R.wayPath(m, 640 - 120 * Math.sin(Math.PI * m) * 0.5));
    Q.forEach(([a], i) => { const p = seg(t, a, a + 0.5); R.put(this.q[i], 540, 600 + i * 150 + (1 - eo(p)) * 30, eob(p, 1.4), 0, eo(seg(t, a, a + 0.25))); });
  },
});
