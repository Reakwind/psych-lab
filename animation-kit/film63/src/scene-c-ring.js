const { seg, eo, eio, eob, lerp } = kit;
// the pieces arrange into a ring: parts of one experience that act on each other
const FROM = [[660, 840], [860, 300], [900, 640], [180, 640], [220, 300]];
kit.scene('c-ring', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' + R.cycle('cr') + '</svg>' +
      '<div class="tag tag-cool cr-a">מעגל</div><div class="tag tag-warm cr-b">משפיעים זה על זה</div></div>'));
    Object.assign(this, R.refs(kit, 'cr', ['ring', 'a', 'b']));
    this.n = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cr-n' + k));
  },
  render(t) {
    const f = eio(seg(t, 0.3, 2.0));
    this.n.forEach((el, k) => {
      const [x, y] = R.CYC[k], pulse = 1 + 0.08 * Math.sin(Math.PI * seg(t, 5.6 + k * 0.25, 6.2 + k * 0.25));
      el.setAttribute('transform', 'translate(' + lerp(FROM[k][0], x, f) + ' ' + lerp(FROM[k][1], y, f) + ') scale(' + (lerp(0.75, 1, f) * pulse) + ')');
    });
    this.ring.style.opacity = 0.35 * eo(seg(t, 2.6, 3.4));
    this.ring.setAttribute('transform', 'rotate(' + (t * 6) + ' 540 560)');
    R.put(this.a, 540, 560, eob(seg(t, 2.8, 3.4), 1.6), 0, eo(seg(t, 2.8, 3.1)) * (1 - eo(seg(t, 5.2, 5.6))));
    R.put(this.b, 540, 560, eob(seg(t, 5.6, 6.2), 1.6), 0, eo(seg(t, 5.6, 5.9)));
  },
});
