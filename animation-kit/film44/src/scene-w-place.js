const { seg, eo, eio, eob, lerp } = kit;
// three different days; on each the good moment keeps its place, at a different time of day
const D = [[0.9, 830, 'sun', 50], [1.2, 540, 'mixed', -10], [1.5, 250, 'cloud', -60]];
kit.scene('w-place', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      D.map((d, k) => '<g class="wl-d' + k + '">' + R.dayCard('wl-dc' + k, d[2]) + '<rect class="metal" x="-86" y="76" width="172" height="6" rx="3"/><g class="wl-w' + k + '" transform="translate(' + d[3] + ' 79) scale(.5)">' + R.warm('wl-t' + k, 'dot') + '</g></g>').join('') + '</svg>' +
      '<div class="tag tag-cool wl-a">קל יותר להעריך אותם</div><div class="tag tag-warm wl-b">לשמור להם מקום</div><div class="tag wl-c">איך ומתי הם יכולים להתאים לנו</div><div class="tag wl-e">בימים ובמצבים שונים</div></div>'));
    Object.assign(this, R.refs(kit, 'wl', ['d0', 'd1', 'd2', 'w0', 'w1', 'w2', 'a', 'b', 'c', 'e']));
  },
  render(t) {
    D.forEach(([a, x, , wx], k) => {
      R.xf(this['d' + k], x, 520, 1.15 * eob(seg(t, a, a + 0.5), 1.5), eo(seg(t, a, a + 0.2)));
      this['w' + k].setAttribute('transform', 'translate(' + wx + ' ' + (79 - 10 * Math.abs(Math.sin(t * 2 + k))) + ') scale(' + 0.5 * eob(seg(t, 4.6 + k * 0.3, 5.0 + k * 0.3), 1.8) + ')');
    });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.9, 3.4))), eo(seg(t, 2.9, 3.4)) * (1 - eo(seg(t, 4.5, 4.8))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.7, 5.2))), eo(seg(t, 4.7, 5.2)));
    R.place(this.c, 540, lerp(812, 800, eo(seg(t, 5.9, 6.4))), eo(seg(t, 5.9, 6.4)));
    R.place(this.e, 540, lerp(902, 890, eo(seg(t, 9.0, 9.5))), eo(seg(t, 9.0, 9.5)));
  },
});
