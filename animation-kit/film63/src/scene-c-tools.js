const { seg, eo, eio, eob, lerp } = kit;
// the parts we can work with: thoughts, attention and feelings, the body, actions. Each gets its tool badge.
const B = [[1, 0, 4.1, 0], [2, 2, 5.5, 0], [3, 3, 5.9, -1], [3, 1, 7.3, 1], [4, 4, 8.0, 0]];
kit.scene('c-tools', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' + R.cycle('cl') +
      B.map((b, i) => R.tool('cl-t' + i, b[1], 58)).join('') + '</svg>' + R.CYC.map((c, k) => '<div class="tag cl-l' + k + '">' + c[2] + '</div>').join('') + '</div>'));
    this.t = B.map((b, i) => kit.stage.querySelector('.cl-t' + i));
    this.ar = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cl-a' + k));
    this.ah = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cl-ah' + k));
    this.d = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cl-n' + k + '-disc'));
    this.x = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cl-x' + k));
    [0, 1, 2, 3, 4].forEach((k) => R.place(kit.stage.querySelector('.cl-l' + k), R.CLAB[k][0], R.CLAB[k][1] - 29, 1));
  },
  render(t) {
    this.ar.forEach((el, k) => { el.style.strokeDasharray = '1 0'; el.style.opacity = 1; el.style.stroke = 'var(--accent)'; this.ah[k].style.opacity = 1; this.ah[k].style.stroke = 'var(--accent)'; });
    this.d.forEach((el) => { el.style.fill = 'color-mix(in srgb, var(--accent) 40%, color-mix(in srgb, var(--ground) 40%, white))'; });
    this.x.forEach((el) => { el.style.opacity = 0.5; });
    B.forEach(([n, , a, side], i) => {
      const p = eio(seg(t, a, a + 0.8)), [x, y] = R.CYC[n], tx = x + (side ? side * 76 : 80), ty = y - 80;
      this.t[i].setAttribute('transform', 'translate(' + lerp(540, tx, p) + ' ' + (lerp(1180, ty, p) - 80 * Math.sin(Math.PI * p)) + ') scale(' + (0.7 + 0.3 * eob(seg(t, a + 0.6, a + 1.0), 2)) + ')');
      this.t[i].style.opacity = p > 0 ? 1 : 0;
    });
  },
});
