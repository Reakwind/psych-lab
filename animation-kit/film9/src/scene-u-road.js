const { seg, eo, eio, eob, lerp } = kit;
// activity, time, place along the road (0 bottom .. 1 heart), side
// activity, time, foot of the signpost (x, y), size
const S = [['פעילות גופנית', 2.9, 860, 930, 0.9], ['ריפוי בעיסוק', 4.0, 200, 910, 0.85], ['תרגול דיבור', 5.1, 830, 680, 0.66], ['פעילות באפליקציה', 6.8, 290, 600, 0.55]];
const H = [['עצמאות', 11.3, 790, 330], ['קשר עם אנשים', 12.0, 556, 250], ['תחביבים', 13.2, 320, 330]];
kit.scene('u-road', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadLand('ur') + S.map((s, k) => '<g class="ur-s' + k + '">' + R.sign('ur-sg' + k, k) + '</g>').join('') +
      '<g class="ur-bb">' + R.busBack('ur-b') + '</g></svg>' + S.map((s, k) => '<div class="tag ur-w' + k + '">' + s[0] + '</div>').join('') +
      H.map((h, k) => '<div class="tag tag-warm ur-h' + k + '">' + h[0] + '</div>').join('') + '<div class="tag tag-cool ur-t">חלק מהדרך לדברים שחשובים לכם</div></div>'));
    Object.assign(this, R.refs(kit, 'ur', ['center', 'bb', 'h-glow', 'hrt', 't', 's0', 's1', 's2', 's3', 'w0', 'w1', 'w2', 'w3', 'h0', 'h1', 'h2']));
    const L = this.center.getTotalLength(); this.L = L;
  },
  render(t) {
    // the program's activities stand along the road; at its end, what they lead to
    const u = lerp(0.02, 0.72, eio(seg(t, 0, 14.5))), p = this.center.getPointAtLength(this.L * u), s = lerp(0.12, 0.8, (p.y - 468) / 612);
    this.bb.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ') scale(' + s + ')');
    S.forEach(([, a, x, y, sc], k) => { const q = eob(seg(t, a, a + 0.5), 1.8); this['s' + k].setAttribute('transform', 'translate(' + x + ' ' + (y - 150 * sc) + ') scale(' + Math.max(0.001, q * sc) + ')');
      R.place(this['w' + k], x, lerp(y - 150 * sc + 86 * sc + 12, y - 150 * sc + 86 * sc, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))); });
    this.hrt.setAttribute('transform', 'translate(556 432) scale(' + lerp(0.55, 0.8, eio(seg(t, 10.8, 11.6))) + ')');
    this['h-glow'].setAttribute('r', 70 + 20 * Math.sin(t * 3) * eo(seg(t, 10.8, 11.4)));
    H.forEach(([, a, x, y], k) => R.place(this['h' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    R.place(this.t, 540, lerp(84, 70, eo(seg(t, 8.8, 9.3))), eo(seg(t, 8.8, 9.3)));
  },
});
