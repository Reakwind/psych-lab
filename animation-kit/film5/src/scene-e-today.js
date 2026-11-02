const { seg, eo, eio, eob, lerp } = kit;
const XS = [[1.6, 780], [2.6, 440]];
kit.scene('e-today', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ey', 760, []) +
      XS.map((x, k) => '<g class="ey-m' + k + '"><circle r="34" style="fill:var(--ground);stroke:var(--second);stroke-width:6"/><g transform="translate(0 -110) scale(.45)">' + R.battery('ey' + k) + '</g></g>').join('') + '</svg>' +
      '<div class="tag tag-cool ey-a">היום: לעצור פעם או פעמיים</div><div class="tag tag-warm ey-q">מה מצב הסוללה שלי עכשיו?</div><div class="tag ey-n">רק לשים לב</div></div>'));
    Object.assign(this, R.refs(kit, 'ey', ['curve', 'm0', 'm1', 'a', 'q', 'n']));
    this.f = [0, 1].map((k) => kit.stage.querySelector('.ey' + k + '-fill'));
  },
  render(t) {
    this.curve.style.strokeDasharray = '1 0'; this.curve.style.opacity = 0.35;
    XS.forEach(([a, x], k) => { this['m' + k].setAttribute('transform', 'translate(' + x + ' 760) scale(' + eob(seg(t, a, a + 0.5), 1.8) + ')'); R.setBattery(this.f[k], [0.7, 0.4][k]); });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)));
    R.place(this.q, 540, lerp(186, 174, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    R.place(this.n, 540, lerp(892, 880, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)));
  },
});