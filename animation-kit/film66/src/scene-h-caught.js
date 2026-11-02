const { seg, eo, eio, eob, lerp } = kit;
// our attention: we don't always choose where it goes. Something worrying catches it and fills it up.
const P2 = 3.23;
kit.scene('h-caught', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('hc') + '</svg>' +
      '<div class="tag tag-cool hc-title">מפגש 66 · מבוא לחיזוק הקשב והאיזון הרגשי</div><div class="tag hc-a">לא תמיד אנחנו מחליטים לאן</div>' +
      '<div class="tag hc-b">משהו שמציק או מדאיג</div><div class="tag tag-warm hc-c">חלק גדול מהקשב</div></div>'));
    this.A = R.attnRefs(kit, 'hc'); Object.assign(this, R.refs(kit, 'hc', ['title', 'a', 'b', 'c']));
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')'); A.lf.setAttribute('transform', 'scale(0)');
    // the circle of attention appears around her and drifts on its own
    const app = eob(seg(t, 0.6, 1.4), 1.4), drift = seg(t, P2 + 1.2, P2 + 5.0);
    let x = 500 + 140 * Math.sin(drift * 5.5) * Math.sin(Math.PI * drift), y = 560 - 60 * Math.sin(drift * 3.1) * Math.sin(Math.PI * drift), r = 200 * app;
    // then something worrying catches it
    const w = eob(seg(t, P2 + 4.4, P2 + 5.0), 1.8), go = eio(seg(t, P2 + 5.0, P2 + 6.0)), swell = eio(seg(t, P2 + 6.0, P2 + 9.0));
    x = lerp(x, R.SPOT.worry[0], go); y = lerp(y, R.SPOT.worry[1] + 40, go); r = lerp(r, lerp(200, 215, swell), go);
    R.ring(A, x, y, r, eo(seg(t, 0.6, 1.0)), t, 1 - go);
    R.worryAt(A, R.SPOT.worry[0], R.SPOT.worry[1] + 40 * swell, w * lerp(1, 1.55, swell), t);
    A.wg.style.opacity = eo(seg(t, P2 + 4.4, P2 + 4.7));
    // she turns to it; her face falls
    const look = eio(seg(t, P2 + 5.0, P2 + 6.0));
    A.head.setAttribute('transform', 'rotate(' + (-8 * look + 3 * Math.sin(t * 0.9) * (1 - look)) + ' 0 30)');
    R.look(A.eyes, t, 0.6, 4 * look, -3 * look);
    A.mouth.setAttribute('d', look > 0.5 ? R.FLAT : R.SMILE);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)) * (1 - eo(seg(t, 2.9, 3.4))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, P2 + 1.2, P2 + 1.7))), eo(seg(t, P2 + 1.2, P2 + 1.7)) * (1 - eo(seg(t, P2 + 8.8, P2 + 9.3))));
    R.place(this.b, 380, lerp(232, 220, eo(seg(t, P2 + 5.9, P2 + 6.4))), eo(seg(t, P2 + 5.9, P2 + 6.4)));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, P2 + 9.0, P2 + 9.5))), eo(seg(t, P2 + 9.0, P2 + 9.5)));
  },
});
