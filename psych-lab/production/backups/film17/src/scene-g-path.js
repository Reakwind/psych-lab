const { seg, eo, eio, eob, lerp } = kit;
// with practice the way from tension to relaxation grows familiar: Ruth walks her path again and again, and each time more of it is lit
kit.scene('g-path', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('g11p', { sun: true }) + '<circle class="g11-gl" r="160" style="fill:var(--accent);opacity:.18"/>' +
      '<g class="g11-rw"><g class="g11-ra">' + R.ruthBack('g11a', false) + '</g><g class="g11-rb">' + R.ruthBack('g11b', true) + '</g></g>' +
      '<g class="g11-mw" transform="translate(150 980) scale(.8)">' + R.meter('g11-mt') + '</g></svg>' +
      '<div class="tag tag-red g11-ml">מתח</div><div class="tag tag-cool g11-a">ככל שחוזרים על התרגול</div><div class="tag tag-warm g11-b">הדרך מדריכות להרפיה</div><div class="tag g11-c">יכולה להפוך מוכרת יותר</div>' +
      '<div class="tag tag-cool g11-d">קל יותר לזהות מתח</div><div class="tag tag-warm g11-e">ולאפשר לחלק ממנו להשתחרר</div></div>'));
    Object.assign(this, R.refs(kit, 'g11', ['gl', 'rw', 'ra', 'rb', 'mt-fill', 'ml', 'a', 'b', 'c', 'd', 'e']));
    this.tops = R.PATH.map((p, k) => kit.stage.querySelector('.g11p-st' + k + '-top'));
  },
  render(t) {
    // three walks up the path, each a little further and easier; the stones she has walked stay lit
    const W = [[0.5, 3.0, 0.15, 3.2], [3.2, 6.6, 0.15, 5.5], [6.8, 11.0, 0.15, 8.6]];
    let k = 0.15, lit = 0, walking = false;
    W.forEach(([a, b, k0, k1], j) => { if (t >= a) { const p = seg(t, a, b); k = lerp(k0, k1, eio(p)); walking = p > 0 && p < 1; lit = Math.max(lit, k); } });
    if (t > 11.0) k = 8.6;
    const fade = W.some(([a, b]) => t > b - 0.3 && t < b + 0.2 && b < 11) ? 0 : 1;
    const P = R.PATH, i = Math.max(0, Math.min(P.length - 2, Math.floor(k))), f = k - i;
    const x = lerp(P[i][0], P[i + 1][0], f), y = lerp(P[i][1], P[i + 1][1], f), r = lerp(P[i][2], P[i + 1][2], f), s = 0.66 * r / 130;
    const step = walking ? Math.floor(t * 2.2) % 2 : 0, bob = walking ? Math.abs(Math.sin(t * Math.PI * 2.2)) * -5 : 0;
    this.ra.style.opacity = step ? 0 : 1; this.rb.style.opacity = step ? 1 : 0;
    this.rw.setAttribute('transform', 'translate(' + x + ' ' + (y + bob) + ') scale(' + s + ')'); this.rw.style.opacity = fade;
    this.gl.setAttribute('transform', 'translate(' + x + ' ' + (y - 230 * s / 0.66) + ') scale(' + (s / 0.66) + ')'); this.gl.style.opacity = 0.18 * fade;
    this.tops.forEach((top, j) => R.litStone(top, kit.clamp01(lit - j + 0.6)));
    R.setMeter(this['mt-fill'], lerp(0.6, 0.35, eio(seg(t, 3.0, 9.0))) - 0.12 * eio(seg(t, 12.0, 13.2)) + 0.12 * Math.sin(Math.PI * seg(t, 9.8, 11.6)));
    R.place(this.ml, 150, 1000, 1);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.64, 1.0))), eo(seg(t, 0.64, 1.0)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 2.3, 2.7))), eo(seg(t, 2.3, 2.7)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 4.63, 5.0))), eo(seg(t, 4.63, 5.0)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 9.97, 10.3))), eo(seg(t, 9.97, 10.3)));
    R.place(this.e, 540, lerp(124, 112, eo(seg(t, 12.08, 12.4))), eo(seg(t, 12.08, 12.4)));
  },
});
