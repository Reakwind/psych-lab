const { seg, eo, eio, eob, lerp } = kit;
// from there: what is possible now, and what could be the next step — sometimes a very small one, as long as it's connected to what matters: the inner compass
const P7 = 6.27, CX = 850, CY = 230;
kit.scene('y-step', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bigLand('ys', { sun: true, sunX: 300, sunY: 400 }) +
      '<g class="ys-tiny">' + R.stone('ys-tn', 0, 0, 70) + '</g>' +
      '<path class="ys-line" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:8;stroke-linecap:round;stroke-dasharray:.03 .03"/>' +
      '<g class="ys-w"><g class="ys-a">' + R.ruthBack('ys', false) + '</g><g class="ys-b">' + R.ruthBack('ys-b', true) + '</g></g>' +
      '<g class="ys-cg" transform="translate(' + CX + ' ' + CY + ')">' + R.compass('ys-c', 90) + '</g></svg>' +
      '<div class="tag tag-warm ys-t1">מה אפשרי עבורנו עכשיו</div><div class="tag tag-warm ys-t2">מה יכול להיות הצעד הבא</div>' +
      '<div class="tag ys-t3">לפעמים הצעד הזה ממש קטן</div><div class="tag tag-cool ys-t4">מחובר למה שחשוב לכם</div><div class="tag tag-warm ys-t5">המצפן הפנימי</div></div>'));
    Object.assign(this, R.refs(kit, 'ys', ['tiny', 'tn-top', 'line', 'w', 'a', 'b', 'c-needle', 'c-glow', 't1', 't2', 't3', 't4', 't5']));
    this.top = [1, 2].map((k) => kit.stage.querySelector('.ys-st' + k + '-top'));
  },
  render(t) {
    const S1 = R.onBig(1), S2 = R.onBig(2), TN = [700, 1010];
    const lit = (el, p) => { el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * p) + '%, var(--ground))'; };
    lit(this.top[0], eo(seg(t, 1.89, 2.3))); lit(this.top[1], eo(seg(t, 4.67, 5.1)));
    // the tiny stone appears near her feet and lights
    const tn = eob(seg(t, P7 + 2.0, P7 + 2.6), 1.6);
    this.tiny.setAttribute('transform', 'translate(' + TN[0] + ' ' + TN[1] + ') scale(' + Math.max(0.001, tn) + ')'); lit(this['tn-top'], eo(seg(t, P7 + 2.4, P7 + 2.9)));
    // the needle points at each step in turn, then at the tiny one; a dashed line runs from the compass to it
    let a = 0; const to = (p) => R.aim(CX, CY, p[0], p[1]);
    a = lerp(a, to(S1), eio(seg(t, 1.6, 2.2))); a = lerp(a, to(S2), eio(seg(t, 4.4, 5.0))); a = lerp(a, to(TN), eio(seg(t, P7 + 2.2, P7 + 2.9)));
    this['c-needle'].setAttribute('transform', 'rotate(' + (a + 3 * Math.sin(t * 2)) + ')');
    const ln = eio(seg(t, P7 + 3.9, P7 + 4.8));
    this.line.setAttribute('d', 'M' + CX + ' ' + (CY + 60) + ' Q' + (CX - 20) + ' 700 ' + TN[0] + ' ' + (TN[1] - 30));
    this.line.style.opacity = ln > 0 ? 1 : 0; this.line.style.strokeDashoffset = (-t * 0.04).toFixed(3); this.line.setAttribute('pathLength', 1);
    this.line.style.strokeDasharray = ln < 1 ? '.03 .03' : '.03 .03'; this.line.style.clipPath = 'none'; this.line.style.opacity = ln;
    this['c-glow'].setAttribute('opacity', 0.25 * eo(seg(t, P7 + 6.4, P7 + 7.2)));
    // Ruth, from behind, steps onto the tiny stone
    const walk = eio(seg(t, P7 + 5.2, P7 + 6.4)), stepping = t > P7 + 5.2 && t < P7 + 6.4, st = stepping ? Math.floor(t * 3.2) % 2 : 0;
    this.a.style.opacity = st ? 0 : 1; this.b.style.opacity = st ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + lerp(880, TN[0], walk) + ' ' + (lerp(1062, TN[1] + 6, walk) - (st ? 6 : 0)) + ') scale(.82)');
    const o = (a0, b) => eo(seg(t, a0, a0 + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.t1, 380, lerp(92, 80, eo(seg(t, 1.89, 2.3))), o(1.89, P7 + 1.4));
    R.place(this.t2, 380, lerp(172, 160, eo(seg(t, 4.67, 5.1))), o(4.67, P7 + 1.4));
    R.place(this.t3, 380, lerp(92, 80, eo(seg(t, P7 + 2.12, P7 + 2.5))), o(P7 + 2.12, 99));
    R.place(this.t4, 380, lerp(172, 160, eo(seg(t, P7 + 4.2, P7 + 4.6))), o(P7 + 4.2, 99));
    R.place(this.t5, CX, lerp(372, 360, eo(seg(t, P7 + 6.63, P7 + 7.0))), o(P7 + 6.63, 99));
  },
});
