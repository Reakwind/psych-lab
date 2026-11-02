const { seg, eo, eio, eob, lerp } = kit;
const COLS = ['#5B8DB8', '#D96C6C', 'var(--accent)', '#6FAE7A', '#9A6FB0'];
const B = [[592, 532, 0, 1], [930, 490, 1, 1], [790, 190, 2, 0.9], [900, 230, 3, 0.9], [640, 260, 4, 0.85],
  [120, 640, 2, 0.8], [440, 600, 3, 0.7], [1000, 720, 4, 0.8], [360, 860, 0, 0.9], [990, 900, 1, 0.9]];
// the circle of attention sweeps right to left; each bird lights as it passes
const PATH = (p) => [lerp(1000, 150, p), 520 + Math.sin(p * Math.PI * 2) * 200];
kit.scene('p-always', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pa') + R.tree('pa') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('pa', 'stand') + '</g><g class="pa-ring">' + R.attn('pa') + '</g>' +
      B.map((b, k) => R.bird('pa-b' + k, COLS[b[2]])).join('') + '</svg>' +
      '<div class="tag pa-a">לא באמת "פתאום"</div><div class="tag tag-cool pa-b">הן היו שם כל הזמן</div><div class="tag tag-warm pa-c">מה שהשתנה הוא הקשב</div></div>'));
    Object.assign(this, R.refs(kit, 'pa', ['head', 'eyes', 'mouth', 'ring', 'a', 'b', 'c']));
    this.bb = B.map((_, k) => R.refs(kit, 'pa-b' + k, ['g', 'c'])); this.bg = B.map((_, k) => kit.stage.querySelector('.pa-b' + k));
    // where along the sweep the circle first reaches each bird
    this.at = B.map(([x, y]) => { for (let p = 0; p <= 1; p += 0.005) { const [rx, ry] = PATH(p); if (Math.hypot(x - rx, y - ry) < 210) return p; } return 1; });
  },
  render(t) {
    R.blink(this.eyes, t, 0.2);
    this.head.setAttribute('transform', 'rotate(' + (-4 + 10 * eio(seg(t, 5.4, 6.4))) + ' 0 30)');
    // the colour drains: they were there all along
    const drain = eio(seg(t, 0.4, 1.6)), sweep = eio(seg(t, 5.4, 7.8));
    const [rx, ry] = PATH(sweep);
    R.xf(this.ring, rx, ry, 170 * eob(seg(t, 5.2, 5.7), 1.4), eo(seg(t, 5.2, 5.4)));
    B.forEach(([x, y, , s], k) => {
      this.bg[k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 3 + k) * 2) + ') scale(' + s + ')');
      const lit = t > 5.4 && sweep >= this.at[k] ? eo(seg(sweep, this.at[k], this.at[k] + 0.08)) : 0;
      this.bg[k].style.opacity = 1 - 0.45 * drain * (1 - lit);
      const c = Math.max(1 - drain, lit); this.bb[k].c.style.opacity = c; this.bb[k].g.style.opacity = 1 - c;
    });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 3.4, 3.7))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.7, 4.2))), eo(seg(t, 3.7, 4.2)) * (1 - eo(seg(t, 5.8, 6.1))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
  },
});
