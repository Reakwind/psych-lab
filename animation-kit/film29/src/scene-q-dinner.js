const { seg, eo, eio, eob, lerp } = kit;
// parts 8–11 on the mat: half a minute in, a balloon floats off to dinner and the beam follows it; nothing is wrong — noticing is the spark;
// then back, to the breath, the body or Ariel's voice on the phone; it drifts and comes back again and again, a dot for each return
const P9 = 7.34, P10 = 16.6, P11 = 25.44;
const HEAD = [292, 500], BELLY = [514, 547], LEGS = [690, 540], PHONE = [160, 890];
const CYC = [[4.5, 6.2, P10 + 0.3, P10 + 1.6, 640, 220], [P11 + 0.5, P11 + 1.3, P11 + 1.6, P11 + 2.5, 740, 200], [P11 + 3.4, P11 + 4.2, P11 + 4.9, P11 + 5.8, 880, 250], [P11 + 7.4, P11 + 8.1, P11 + 8.4, P11 + 9.3, 620, 180]];
const RET = [P10 + 1.5, P11 + 2.4, P11 + 5.7, P11 + 9.2];
kit.scene('q-dinner', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('q6') +
      '<g transform="translate(160 890) scale(1.5)">' + R.phone('q6p', 0, 0, 'ariel') + '</g><g class="q6-snd"><path class="ink" style="stroke:var(--accent);stroke-width:8" d="M236 850 q20 40 0 80 M262 830 q34 60 0 120"/></g>' +
      '<g class="q6-hg">' + R.hourglass('q6-h') + '</g>' + R.dots('q6-dt', 4, 60) +
      '<path class="q6-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10"/><g class="q6-dr">' + R.dream('q6-d', R.plate('q6-pl')) + '</g>' +
      '<g class="q6-b2"><g transform="scale(1.3)">' + R.balloon('q6-bl') + '</g></g>' + R.beam('q6b') + '<g class="q6-sp">' + R.spark('q6s') + '</g></svg>' +
      '<div class="tag q6-try">מנסים לשים לב, ואחרי חצי דקה…</div><div class="tag tag-warm q6-din">ארוחת הערב</div>' +
      '<div class="tag tag-cool q6-none">כלום. זה חלק מהתרגול</div><div class="tag tag-warm q6-noted">שמתם לב שתשומת הלב נדדה? כבר שמתם לב</div>' +
      '<div class="tag tag-cool q6-back">פשוט חוזרים</div><div class="tag q6-o0">לנשימה</div><div class="tag q6-o1">לאזור בגוף</div><div class="tag q6-o2">לקול שמנחה את התרגול</div>' +
      '<div class="tag q6-again">הקשב ינדוד, ושוב נחזיר אותו</div><div class="tag tag-warm q6-prac">לשים לב ולחזור: זה התרגול</div></div>'));
    Object.assign(this, R.refs(kit, 'q6', ['eyes', 'mouth', 'snd', 'hg', 'dt', 'str', 'dr', 'b2', 'sp', 'try', 'din', 'none', 'noted', 'back', 'o0', 'o1', 'o2', 'again', 'prac']));
    this.d = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.q6-dt-d' + k));
    this.b = R.beamRefs(kit, 'q6b');
  },
  render(t) {
    if (t > P9 + 4.0 && t < P9 + 5.8) R.blink(this.eyes, t, 0); else R.closeEyes(this.eyes);
    this.mouth.setAttribute('d', t > P10 + 1.6 ? R.mouthHappy : R.mouthNeutral);
    // half a minute: a sandglass turns over
    const hg = eob(seg(t, 1.8, 2.3), 1.6) * (1 - eo(seg(t, 6.6, 7.1)));
    this.hg.setAttribute('transform', 'translate(940 880) rotate(' + 180 * eio(seg(t, 2.6, 3.4)) + ') scale(' + Math.max(0.001, 0.8 * hg) + ')');
    R.place(this.try, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 6.4, 6.8))));
    // which balloon is out, and how far
    let k = -1; CYC.forEach((c, i) => { if (t >= c[0]) k = i; });
    let drift = 0, bx = HEAD[0], by = HEAD[1];
    if (k >= 0) {
      const [a, b, c, d, tx, ty] = CYC[k], out = eio(seg(t, a, b)), back = eio(seg(t, c, d));
      drift = out * (1 - back); bx = lerp(HEAD[0], tx, drift); by = lerp(HEAD[1], ty, drift) + Math.sin(t * 2) * 6 * drift;
    }
    R.setG(this.dr, bx, by, 1.15 * drift, k === 0 ? 1 : 0); R.setG(this.b2, bx, by, drift, k > 0 ? 1 : 0);
    this.str.setAttribute('d', 'M' + HEAD[0] + ' ' + HEAD[1] + ' C' + (HEAD[0] + 40) + ' ' + (HEAD[1] - 120) + ' ' + (bx - 60) + ' ' + (by + 140) + ' ' + bx + ' ' + (by + 40 * drift));
    this.str.style.opacity = drift > 0.02 ? 0.6 : 0;
    R.place(this.din, 640, lerp(372, 360, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)) * (1 - eo(seg(t, P9 + 0.2, P9 + 0.6))));
    // where the beam rests: the breath, then (part 10) a body area, the guide's voice, and back to the breath
    let [x, y] = BELLY, r = 140;
    const hop = (to, a, b) => { const p = eio(seg(t, a, b)); x = lerp(x, to[0], p); y = lerp(y, to[1], p); };
    hop(LEGS, P10 + 3.0, P10 + 3.6); hop(BELLY, P10 + 4.6, P10 + 5.1); hop(PHONE, P10 + 5.6, P10 + 6.2); hop(BELLY, P10 + 7.6, P10 + 8.3);
    x = lerp(x, bx, drift); y = lerp(y, by, drift);
    R.setBeam(this.b, x, y, r, 1, 1, -t * 0.06 * drift);
    this.snd.style.opacity = eo(seg(t, P10 + 5.6, P10 + 6.0)) * (1 - eo(seg(t, P10 + 7.6, P10 + 8.0))) * (0.6 + 0.4 * Math.sin(t * 8));
    // part 9: nothing is wrong; the moment she notices is the spark
    R.place(this.none, 540, lerp(84, 70, eo(seg(t, P9 + 0.4, P9 + 0.9))), eo(seg(t, P9 + 0.4, P9 + 0.9)) * (1 - eo(seg(t, P10, P10 + 0.3))));
    const sp = eob(seg(t, P9 + 6.8, P9 + 7.3), 1.8) * (1 - eo(seg(t, P10 + 0.4, P10 + 0.9)));
    this.sp.setAttribute('transform', 'translate(400 380) scale(' + Math.max(0.001, 0.9 * sp) + ')');
    R.place(this.noted, 540, lerp(952, 940, eo(seg(t, P9 + 6.9, P9 + 7.4))), eo(seg(t, P9 + 6.9, P9 + 7.4)) * (1 - eo(seg(t, P10 + 0.2, P10 + 0.6))));
    // part 10: back
    R.place(this.back, 540, lerp(84, 70, eo(seg(t, P10 + 0.3, P10 + 0.8))), eo(seg(t, P10 + 0.3, P10 + 0.8)) * (1 - eo(seg(t, P11 + 0.3, P11 + 0.6))));
    const oo = (a) => eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, P11 + 0.3, P11 + 0.6)));
    R.place(this.o0, 470, lerp(282, 270, oo(P10 + 1.4)), oo(P10 + 1.4));
    R.place(this.o1, 760, lerp(282, 270, oo(P10 + 3.1)), oo(P10 + 3.1));
    R.place(this.o2, 340, lerp(782, 770, oo(P10 + 5.8)), oo(P10 + 5.8));
    // part 11: again and again; a dot lights for each return
    R.place(this.again, 540, lerp(84, 70, eo(seg(t, P11 + 0.6, P11 + 1.1))), eo(seg(t, P11 + 0.6, P11 + 1.1)) * (1 - eo(seg(t, P11 + 6.6, P11 + 6.9))));
    R.place(this.prac, 540, lerp(84, 70, eo(seg(t, P11 + 6.9, P11 + 7.4))), eo(seg(t, P11 + 6.9, P11 + 7.4)));
    R.setG(this.dt, 660, 990, 1, eo(seg(t, P10 + 0.8, P10 + 1.3)));
    this.d.forEach((el, n) => R.lightDot(el, eo(seg(t, RET[n] - 0.2, RET[n] + 0.2))));
  },
});
