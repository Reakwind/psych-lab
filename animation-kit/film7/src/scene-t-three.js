const { seg, eo, eio, eob, lerp } = kit;
const C = [[2.0, 'קרה לה משהו', 780, 170, 'M-10 30 Q2 22 14 30'], [4.3, 'היא מתעלמת ממני', 300, 300, 'M-10 32 Q2 22 14 32'], [7.5, 'היא בטח עסוקה', 780, 400, 'M-10 26 Q2 32 14 26']];
kit.scene('t-three', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tt', 0) + '</svg>' +
      C.map((c, k) => '<div class="thought sm tt-c' + k + '">"' + c[1] + '"</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'tt', ['body', 'head', 'eyes', 'mouth', 'c0', 'c1', 'c2']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // three different thoughts about the same silence
    let mouth = 'M-10 28 Q2 26 14 28';
    C.forEach(([a, , x, y, m], k) => { const p = eob(seg(t, a, a + 0.6), 1.5); R.put(this['c' + k], x, y + (1 - eo(seg(t, a, a + 0.6))) * 60, 0.3 + 0.7 * p, 0, eo(seg(t, a, a + 0.3))); if (t > a) mouth = m; });
    this.mouth.setAttribute('d', mouth);
    this.head.setAttribute('transform', 'rotate(' + (t > 7.5 ? 0 : t > 4.3 ? -7 : t > 2.0 ? 7 : 0) * 1 + ' 0 30)');
  },
});