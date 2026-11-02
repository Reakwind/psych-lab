const { seg, eo, eio, eob, lerp } = kit;
// parts 12–14: after a practice, calm one time (a sunny card), tired or restless another (a cloudy card); no result to reach — both just are
const P13 = 6.33, P14 = 16.51;
const T13 = [[P13 + 2.65, 'עייפות', 700, 540], [P13 + 3.39, 'חוסר שקט', 920, 540], [P13 + 4.31, 'מתח', 700, 612], [P13 + 4.97, 'תחושה לא נעימה', 920, 612]];
const NO = [[P14 + 7.82, 'לשפוט', 950], [P14 + 8.35, 'לשנות', 800], [P14 + 9.03, 'לעשות משהו', 610]];
kit.scene('q-calm', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<ellipse class="q7-glow" cx="260" cy="640" rx="150" ry="190" style="fill:var(--accent);opacity:0"/>' + R.seated('q7', -240) + R.beam('q7b') +
      '<g class="q7-sun">' + R.dayCard('q7-s', 'sun') + '</g><g class="q7-cl">' + R.dayCard('q7-c', 'cloud') + '</g>' +
      '<text class="q7-eq" x="810" y="384" text-anchor="middle" style="font:700 84px var(--sans);fill:var(--second)">=</text><g class="q7-mg">' + R.magnifier('q7-m') + '</g></svg>' +
      '<div class="tag tag-warm q7-calm">רגועים</div><div class="tag tag-warm q7-conn">מחוברים יותר לגוף</div>' +
      T13.map((m, k) => '<div class="tag q7-t' + k + '">' + m[1] + '</div>').join('') + '<div class="tag q7-center">שלא הייתה במרכז תשומת הלב קודם</div>' +
      '<div class="tag tag-cool q7-none">אין כאן תוצאה שאנחנו מנסים להגיע אליה</div><div class="tag tag-warm q7-only">רק שמים לב למה שנמצא</div>' +
      NO.map((m, k) => '<div class="tag struck q7-n' + k + '">' + m[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'q7', ['glow', 'body', 'head', 'eyes', 'mouth', 'sun', 'cl', 'eq', 'mg', 'calm', 'conn', 't0', 't1', 't2', 't3', 'center', 'none', 'only', 'n0', 'n1', 'n2']));
    this.b = R.beamRefs(kit, 'q7b');
  },
  render(t) {
    if (t < 1.2) R.closeEyes(this.eyes); else R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const cloudy = t > P13 + 0.4 && t < P14;
    this.mouth.setAttribute('d', t > 1.4 && !cloudy ? R.mouthHappy : cloudy ? R.mouthFlat : R.mouthNeutral);
    // part 12: a sunny practice card, and a warm glow
    const s1 = eob(seg(t, 2.5, 3.0), 1.5), swap = eio(seg(t, P13 + 0.2, P13 + 0.9)), both = eio(seg(t, P14 + 0.5, P14 + 1.3));
    R.setG(this.sun, lerp(lerp(810, 1220, swap), 930, both), 330 + 30 * both, 0.9 * s1);
    this.glow.style.opacity = 0.18 * eo(seg(t, 3.6, 4.4)) * (1 - swap);
    R.place(this.calm, 810, lerp(488, 476, eo(seg(t, 2.9, 3.4))), eo(seg(t, 2.9, 3.4)) * (1 - eo(seg(t, P13, P13 + 0.3))));
    R.place(this.conn, 810, lerp(560, 548, eo(seg(t, 3.7, 4.2))), eo(seg(t, 3.7, 4.2)) * (1 - eo(seg(t, P13, P13 + 0.3))));
    // part 13: another time, a cloudy card; tiredness, restlessness, tension, something unpleasant
    R.setG(this.cl, lerp(810, 690, both), lerp(-300, 330, swap) + 30 * both, 0.9);
    T13.forEach(([a, , x, y], k) => R.place(this['t' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, P14, P14 + 0.4)))));
    const sh = eio(seg(t, P13 + 6.9, P13 + 7.6)) * (1 - eo(seg(t, P14, P14 + 0.5)));
    R.setBeam(this.b, 300, 560, 90, 0.6 * sh, sh);
    R.place(this.center, 540, lerp(84, 70, eo(seg(t, P13 + 7.1, P13 + 7.6))), eo(seg(t, P13 + 7.1, P13 + 7.6)) * (1 - eo(seg(t, P14, P14 + 0.3))));
    // part 14: both side by side, equal; the magnifier only looks
    this.eq.style.opacity = eo(seg(t, P14 + 1.0, P14 + 1.4));
    R.place(this.none, 540, lerp(84, 70, eo(seg(t, P14 + 0.4, P14 + 0.9))), eo(seg(t, P14 + 0.4, P14 + 0.9)));
    const m = eob(seg(t, P14 + 4.7, P14 + 5.2), 1.4), mx = lerp(690, 930, (1 - Math.cos(Math.max(0, t - P14 - 5.2) * 1.2)) / 2);
    R.setG(this.mg, mx - 30, 300 + Math.sin(t * 2) * 8, 0.75 * m, eo(seg(t, P14 + 4.7, P14 + 5.0)));
    R.place(this.only, 540, lerp(952, 940, eo(seg(t, P14 + 4.9, P14 + 5.4))), eo(seg(t, P14 + 4.9, P14 + 5.4)));
    NO.forEach(([a, , x], k) => { const el = this['n' + k]; R.place(el, x, lerp(672, 660, eo(seg(t, a - 0.2, a + 0.2))), eo(seg(t, a - 0.2, a + 0.2))); el.style.setProperty('--s', eo(seg(t, a + 0.25, a + 0.6))); });
  },
});
