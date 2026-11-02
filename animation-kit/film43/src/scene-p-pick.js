const { seg, eo, eio, eob, lerp } = kit;
const D = [[0.6, 830, 'sun'], [0.9, 540, 'mixed'], [1.2, 250, 'cloud']];
kit.scene('p-pick', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      D.map((d, k) => '<g class="pk-d' + k + '">' + R.dayCard('pk-dc' + k, d[2]) + '</g>').join('') +
      '<g class="pk-w">' + R.warm('pk-wt', 'dot') + '</g><g class="pk-ring">' + R.attn('pk') + '</g></svg>' +
      '<div class="tag tag-cool pk-a">רגע נעים מהימים האחרונים</div><div class="tag tag-warm pk-b">לא צריך להיות רגע גדול</div></div>'));
    Object.assign(this, R.refs(kit, 'pk', ['d0', 'd1', 'd2', 'w', 'ring', 'a', 'b']));
    this.gl = kit.stage.querySelector('.pk-wt-glow');
  },
  render(t) {
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    // the last few days, as cards; attention settles on one small pleasant moment
    D.forEach(([a, x], k) => R.xf(this['d' + k], x, 470, 1.15 * eob(seg(t, a, a + 0.5), 1.5), eo(seg(t, a, a + 0.2))));
    const pick = eio(seg(t, 3.0, 4.0));
    R.xf(this.w, 540, 590 + Math.sin(t * 2) * 4, 0.7 * eob(seg(t, 2.4, 2.9), 1.6), eo(seg(t, 2.4, 2.6)));
    R.xf(this.ring, lerp(830, 540, pick), lerp(470, 560, pick), lerp(220, 130, pick) + Math.sin(t * 2.4) * 4, eo(seg(t, 2.2, 2.6)));
    this.gl.style.opacity = 0.4 * eio(seg(t, 4.0, 4.6));
    this.d0.style.opacity = this.d2.style.opacity = 1 - 0.4 * pick;
    R.place(this.b, 540, lerp(812, 800, eo(seg(t, 6.4, 6.9))), eo(seg(t, 6.4, 6.9)));
  },
});
