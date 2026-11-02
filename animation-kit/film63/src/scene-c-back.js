const { seg, eo, eio, eob, lerp } = kit;
// it works the other way too: a small change in one part helps the others
const WARM = [[1, 7.3], [2, 8.1], [3, 8.8], [4, 9.5], [0, 10.2]];
kit.scene('c-back', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' + R.cycle('ck') +
      '<circle class="ck-glow" cx="825" cy="470" r="130" style="fill:var(--accent)" opacity="0"/></svg>' +
      R.CYC.map((c, k) => '<div class="tag ck-l' + k + '">' + c[2] + '</div>').join('') + '<div class="tag tag-cool ck-a">גם בכיוון השני</div><div class="tag tag-warm ck-b">שינוי קטן בחלק אחד</div></div>'));
    Object.assign(this, R.refs(kit, 'ck', ['dot', 'glow', 'a', 'b']));
    this.x = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ck-x' + k));
    this.ar = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ck-a' + k));
    this.ah = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ck-ah' + k));
    this.d = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ck-n' + k + '-disc'));
    [0, 1, 2, 3, 4].forEach((k) => R.place(kit.stage.querySelector('.ck-l' + k), R.CLAB[k][0], R.CLAB[k][1] - 29, 1));
  },
  render(t) {
    // the dot slows, stops, and turns back
    const ang = t < 4.2 ? 40 + 120 * t - 14 * t * t : 40 + 120 * 4.2 - 14 * 4.2 * 4.2 - 38 * eio(seg(t, 4.2, 6.0)) * (t - 4.2);
    const [x, y] = R.ringAt(((ang % 360) + 360) % 360);
    this.dot.setAttribute('cx', x); this.dot.setAttribute('cy', y); this.dot.style.opacity = 1;
    this.x.forEach((el) => { el.style.opacity = 0.75; });
    this.ar.forEach((el, k) => { el.style.strokeDasharray = '1 0'; el.style.opacity = 1; this.ah[k].style.opacity = 1; });
    // warmth starts in one part and spreads to the rest
    WARM.forEach(([k, a]) => {
      const w = eo(seg(t, a, a + 0.6));
      this.d[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(40 * w) + '%, color-mix(in srgb, var(--second) ' + Math.round(28 * (1 - w)) + '%, color-mix(in srgb, var(--ground) 40%, white)))';
      this.ar[k].style.stroke = 'color-mix(in srgb, var(--accent) ' + Math.round(100 * eo(seg(t, a + 0.3, a + 0.9))) + '%, var(--second))';
      this.ah[k].style.stroke = this.ar[k].style.stroke;
    });
    this.glow.setAttribute('opacity', 0.25 * eo(seg(t, 7.2, 7.8)) * (1 - eo(seg(t, 10.5, 11.5))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)) * (1 - eo(seg(t, 6.9, 7.2))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
