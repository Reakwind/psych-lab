const { seg, eo, eio, eob, lerp } = kit;
const M = [[0.4, 800, 0.8], [0.9, 540, 0.45], [1.4, 280, 0.65]];
kit.scene('e-mornings', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + M.map((m, k) => '<g class="em-g' + k + '">' + R.battery('em' + k) + '</g>').join('') + '</svg>' +
      M.map((m, k) => '<div class="tag em-t' + k + '">' + Math.round(m[2] * 100) + '%</div>').join('') + '<div class="tag tag-warm em-cap">כל בוקר, אחוז סוללה אחר</div><div class="tag tag-cool em-act">וכל פעולה משפיעה אחרת</div></div>'));
    Object.assign(this, R.refs(kit, 'em', ['cap', 'act', 't0', 't1', 't2']));
    this.f = [0, 1, 2].map((k) => kit.stage.querySelector('.em' + k + '-fill')); this.g = [0, 1, 2].map((k) => kit.stage.querySelector('.em-g' + k));
  },
  render(t) {
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    // three mornings, three starting levels; then each action nudges the level its own way
    M.forEach(([a, x, l], k) => {
      this.g[k].setAttribute('transform', 'translate(' + x + ' 520) scale(' + eob(seg(t, a, a + 0.5), 1.6) * 1.2 + ')');
      const nudge = (k === 0 ? -0.12 : k === 1 ? 0.1 : -0.06) * eio(seg(t, 4.4 + k * 0.4, 5.0 + k * 0.4));
      R.setBattery(this.f[k], l * eio(seg(t, a + 0.2, a + 1.2)) + nudge);
      R.place(this['t' + k], x, 680, eo(seg(t, a + 0.8, a + 1.2)));
    });
    R.place(this.act, 540, lerp(872, 860, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});