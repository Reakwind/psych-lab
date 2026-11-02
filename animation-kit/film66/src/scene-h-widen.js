const { seg, eo, eio, eob, lerp } = kit;
// widen it to take in what else is there; turn it to what matters, something pleasant now, a small thing we appreciate;
// not to ignore what is hard, but to let ourselves experience more
const P5 = 8.83, P6 = 19.39;
const STOP = [['photo', P5 + 4.1], ['mug', P5 + 5.8], ['leaf', P5 + 8.9]];
const TAGS = [['מה שחשוב לנו', 240, 288], ['משהו נעים שקורה עכשיו', 720, 448], ['דבר קטן שמעריכים', 250, 806]];
kit.scene('h-widen', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('hw') + '</svg>' +
      '<div class="tag tag-cool hw-a">לשים לב למה שעוד נמצא שם</div><div class="tag tag-warm hw-b">להרחיב את הקשב</div>' +
      TAGS.map((g, k) => '<div class="tag hw-t' + k + '">' + g[0] + '</div>').join('') +
      '<div class="tag hw-c">לא כדי להתעלם ממה שקשה</div><div class="tag tag-warm hw-d">אלא כדי לחוות עוד דברים</div></div>'));
    this.A = R.attnRefs(kit, 'hw'); Object.assign(this, R.refs(kit, 'hw', ['a', 'b', 'c', 'd']));
    this.tg = [0, 1, 2].map((k) => kit.stage.querySelector('.hw-t' + k));
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')');
    R.worryAt(A, R.SPOT.worry[0], R.SPOT.worry[1], 1, t);
    // 1 · wider: the circle grows over the whole room, the worry still in it
    const wide = eio(seg(t, 2.0, 5.2));
    let x = lerp(470, R.SPOT.room[0], wide), y = 560, r = lerp(210, 520, wide);
    // 2 · then it moves, small and bright, to what matters, to her tea, to the new leaf
    const narrow = eio(seg(t, P5 + 3.2, P5 + 4.1));
    STOP.forEach(([s, a], k) => { const p = eio(seg(t, a - 0.7, a)); if (t > a - 0.7) { x = lerp(k ? R.SPOT[STOP[k - 1][0]][0] : x, R.SPOT[s][0], p); y = lerp(k ? R.SPOT[STOP[k - 1][0]][1] : y, R.SPOT[s][1], p); } });
    r = lerp(r, 140, narrow);
    // 3 · and wide again: the hard and the good, together
    const again = eio(seg(t, P6 + 0.8, P6 + 3.0));
    x = lerp(x, R.SPOT.room[0], again); y = lerp(y, 540, again); r = lerp(r, 540, again);
    R.ring(A, x, y, r, 1, t, 0);
    const g = (a) => eo(seg(t, a, a + 0.5));
    A.gP.setAttribute('opacity', 0.25 * Math.max(g(6.4) * (1 - narrow), g(STOP[0][1] - 0.2) * (1 - g(STOP[1][1] - 0.4)), g(P6 + 2.0)));
    A.gM.setAttribute('opacity', 0.25 * Math.max(g(6.6) * (1 - narrow), g(STOP[1][1] - 0.2) * (1 - g(STOP[2][1] - 0.4)), g(P6 + 2.2)));
    A.gL.setAttribute('opacity', 0.25 * Math.max(g(STOP[2][1] - 0.2), g(P6 + 2.4)));
    A.lf.setAttribute('transform', 'scale(' + eob(seg(t, STOP[2][1] - 0.4, STOP[2][1] + 0.4), 1.6) + ')');
    // her head follows the circle
    const side = (x - 500) / 400;
    A.head.setAttribute('transform', 'rotate(' + (-8 * side * (1 - again)) + ' 0 30)');
    R.look(A.eyes, t, 0.6, 4 * side * (1 - again), y < 560 ? -2 : 1);
    A.mouth.setAttribute('d', t > P5 + 4 ? R.BIG : R.SMILE);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, P5 + 2.6, P5 + 3.1))));
    R.place(this.b, 540, lerp(166, 154, eo(seg(t, 4.7, 5.2))), eo(seg(t, 4.7, 5.2)) * (1 - eo(seg(t, P5 + 2.6, P5 + 3.1))));
    TAGS.forEach(([, tx, ty], k) => { const a = STOP[k][1]; R.place(this.tg[k], tx, lerp(ty + 12, ty, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, P6 + 0.2, P6 + 0.7)))); });
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, P6 + 0.7, P6 + 1.2))), eo(seg(t, P6 + 0.7, P6 + 1.2)));
    R.place(this.d, 540, lerp(166, 154, eo(seg(t, P6 + 3.9, P6 + 4.4))), eo(seg(t, P6 + 3.9, P6 + 4.4)));
  },
});
