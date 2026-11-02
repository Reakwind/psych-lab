const { seg, eo, eio, eob, lerp } = kit;
// what happened here: symptom → thought → attention → feeling and tension → what we did
const AT = [2.5, 4.9, 8.2, 9.9, 12.0];
kit.scene('c-build', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' + R.cycle('cb') + '</svg>' +
      R.CYC.map((c, k) => '<div class="tag cb-l' + k + '">' + c[2] + '</div>').join('') + '</div>'));
    this.n = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cb-n' + k));
    this.d = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cb-n' + k + '-disc'));
    this.a = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cb-a' + k));
    this.ah = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cb-ah' + k));
    this.l = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cb-l' + k));
  },
  render(t) {
    AT.forEach((a, k) => {
      const on = eo(seg(t, a, a + 0.5)), pop = Math.sin(Math.PI * seg(t, a, a + 0.6));
      this.n[k].style.opacity = 0.35 + 0.65 * on;
      this.n[k].setAttribute('transform', 'translate(' + R.CYC[k][0] + ' ' + R.CYC[k][1] + ') scale(' + (1 + 0.12 * pop) + ')');
      this.d[k].style.fill = 'color-mix(in srgb, var(--second) ' + Math.round(14 * on) + '%, color-mix(in srgb, var(--ground) 40%, white))';
      R.place(this.l[k], R.CLAB[k][0], R.CLAB[k][1] - 29 + (1 - on) * 10, on);
      // the arrow into the next part draws as that part lights
      const nx = k < 4 ? AT[k + 1] - 0.9 : 13.3, p = eio(seg(t, nx, nx + 0.8));
      this.a[k].style.strokeDasharray = p + ' 1'; this.a[k].style.opacity = p > 0 ? 1 : 0; this.ah[k].style.opacity = p > 0.95 ? 1 : 0;
    });
  },
});
