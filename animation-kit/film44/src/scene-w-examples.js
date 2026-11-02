const { seg, eo, eio, eob, lerp } = kit;
const E = [[1.4, 820, 320, 'crossword', 'התשבץ'], [4.9, 540, 320, 'book', 'כמה עמודים מספר'], [6.2, 260, 320, 'dog', 'ללטף את הכלב'], [9.3, 680, 640, 'nature', 'שהייה בטבע'], [10.3, 400, 640, 'yarn', 'תחביב']];
const Q = [[13.7, 870, 'נחת'], [14.1, 650, 'עניין'], [14.7, 430, 'קשר'], [15.2, 210, 'הנאה']];
kit.scene('w-examples', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + E.map((e, k) => '<g class="wx-e' + k + '">' + R.badge('wx-b' + k, R.PIC[e[3]]) + '</g>').join('') + '</svg>' +
      E.map((e, k) => '<div class="tag wx-t' + k + '">' + e[4] + '</div>').join('') + Q.map((q, k) => '<div class="tag tag-warm wx-q' + k + '">' + q[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'wx', ['e0', 'e1', 'e2', 'e3', 'e4', 't0', 't1', 't2', 't3', 't4', 'q0', 'q1', 'q2', 'q3']));
  },
  render(t) {
    // the crossword, a few pages of a book, the dog, time in nature, a hobby
    E.forEach(([a, x, y], k) => {
      R.xf(this['e' + k], x, y + Math.sin(t * 1.5 + k) * 5, 1.3 * eob(seg(t, a - 0.2, a + 0.3), 1.7), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], x, lerp(y + 128, y + 116, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    // a small moment of calm, interest, connection or enjoyment
    Q.forEach(([a, x], k) => R.place(this['q' + k], x, lerp(932, 920, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
