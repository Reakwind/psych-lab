const { seg, eo, eio, eob, lerp } = kit;
const W = [[1.1, 'אפשר להבין מאיפה זה מגיע', 70, 'tag-cool'], [3.9, 'משהו חשוב השתנה', 164, ''], [8.1, 'וזה יכול להיות מאוד מתסכל', 258, 'tag-warm']];
kit.scene('m-understand', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080" style="filter:grayscale(.85)">' + R.talRoom('mu') + '<path class="mu-dark dark"/>' +
      '<circle class="mu-glow" cx="860" cy="760" r="240" style="fill:var(--accent);opacity:0"/></svg>' + W.map((w, k) => '<div class="tag ' + w[3] + ' mu-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mu', ['serve', 't-head', 't-eyes', 't-mouth', 'dark', 'glow', 'w0', 'w1', 'w2']));
    this.serve.style.opacity = 0;
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.5);
    // understandable: something important changed. A warm light around Tal
    this.dark.setAttribute('d', R.spotD(800, 780, 300));
    this.dark.style.opacity = 0.74;
    this.glow.style.opacity = 0.22 * eio(seg(t, 1.0, 2.6)) * (0.9 + 0.1 * Math.sin(t * 2));
    this['t-head'].setAttribute('transform', 'rotate(-12 0 30) translate(0 ' + lerp(8, 2, eio(seg(t, 1.2, 2.6))) + ')');
    this['t-mouth'].setAttribute('d', 'M-10 30 Q2 25 14 30');
    W.forEach(([a, , y], k) => R.place(this['w' + k], 540, lerp(y + 14, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
