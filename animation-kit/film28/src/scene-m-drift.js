const { seg, eo, eio, eob, lerp } = kit;
// parts 11–12; part 12 starts at 9.63. The balloon (and the beam with it) drifts to plans, thoughts, sounds; noticing it is the moment; then back, with a smile.
const P = 9.63;
const STOPS = [[250, 520], [330, 180], [800, 170], [930, 820]];
const AT = [[1.4, 2.3], [2.6, 3.6], [4.6, 5.6]];
kit.scene('m-drift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('md') +
      '<g class="md-i0">' + R.calendar('md-cal') + '</g><g class="md-i1"><g transform="scale(1.2)">' + R.balloon('md-x') + '</g></g><g class="md-i2">' + R.bell('md-bell') + '</g>' +
      '<path class="md-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.5"/><g class="md-b">' + R.balloon('md-bl') + '</g>' + R.beam('mdb') +
      '<g class="md-sp">' + R.spark('md-s') + '</g></svg>' +
      '<div class="tag md-t0">תכנונים</div><div class="tag md-t1">מחשבות</div><div class="tag md-t2">מה שקורה מסביב</div>' +
      '<div class="tag tag-warm md-mom">ברגע ששמתם לב: רגע של קשיבות</div><div class="tag tag-cool md-back">מחזירים לנשימה, עם חיוך</div><div class="tag md-part">לשים לב ולחזור: זה חלק מהתרגול</div></div>'));
    Object.assign(this, R.refs(kit, 'md', ['eyes', 'mouth', 'i0', 'i1', 'i2', 'str', 'b', 'sp', 't0', 't1', 't2', 'mom', 'back', 'part']));
    this.bm = R.beamRefs(kit, 'mdb'); this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    // the balloon drifts off, the beam follows it
    let [x, y] = STOPS[0];
    AT.forEach(([a, b], k) => { const p = eio(seg(t, a, b)); x = lerp(x, STOPS[k + 1][0], p); y = lerp(y, STOPS[k + 1][1], p); });
    // part 12: back to the breath, then a small drift and another return
    const ret = eio(seg(t, P + 0.6, P + 2.8)), d2 = Math.sin(Math.PI * seg(t, P + 4.8, P + 7.6));
    x = lerp(x, 514, ret) + 160 * d2; y = lerp(y, 520, ret) - 200 * d2;
    const out = eob(seg(t, 1.0, 1.5), 1.6);
    this.b.setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 2) * 6) + ') scale(' + out * 1.3 * (1 - 0.5 * ret) + ')');
    this.str.setAttribute('d', 'M250 540 C200 420 ' + (x - 40) + ' ' + (y + 120) + ' ' + x + ' ' + (y + 30)); this.str.style.opacity = 0.5 * out * (1 - ret + d2);
    const bx = lerp(514, x, eio(seg(t, 1.2, 2.2))), by = lerp(547, y, eio(seg(t, 1.2, 2.2)));
    R.setBeam(this.bm, t > P + 0.6 ? lerp(bx, 514, ret) + 160 * d2 : bx, t > P + 0.6 ? lerp(by, 547, ret) - 200 * d2 : by, 140, 1, 1);
    [[880, 'i0', 't0', STOPS[1], 200], [0, 'i1', 't1', STOPS[2], 230], [0, 'i2', 't2', STOPS[3], -150]].forEach(([, i, tg, [sx, sy], dx], k) => {
      const p = eob(seg(t, AT[k][1] - 0.3, AT[k][1] + 0.2), 2) * (1 - eo(seg(t, P + 0.4, P + 1.0)));
      const ix = sx + (k === 2 ? -170 : 190), iy = sy + (k === 2 ? -20 : 20);
      this[i].setAttribute('transform', 'translate(' + ix + ' ' + iy + ') scale(' + p * 0.9 + ')');
      R.place(this[tg], ix, iy + 80, p);
    });
    // the moment she notices: a little light
    const s = eob(seg(t, 6.2, 6.7), 1.8) * (1 - eo(seg(t, P + 0.2, P + 0.6)));
    this.sp.setAttribute('transform', 'translate(250 300) scale(' + s * 0.9 + ')');
    R.place(this.mom, 540, lerp(84, 70, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)) * (1 - eo(seg(t, P + 0.4, P + 0.8))));
    R.place(this.back, 540, lerp(84, 70, eo(seg(t, P + 0.8, P + 1.3))), eo(seg(t, P + 0.8, P + 1.3)) * (1 - eo(seg(t, P + 4.6, P + 4.9))));
    R.place(this.part, 540, lerp(84, 70, eo(seg(t, P + 4.9, P + 5.4))), eo(seg(t, P + 4.9, P + 5.4)));
    this.mouth.setAttribute('d', t > P + 3.7 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
