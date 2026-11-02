const { seg, eo, eio, eob, lerp } = kit;
// part 7: the body scan — on the mat, the beam moves area by area from her feet to her head, pausing on each
const PTS = [[790, 540], [690, 540], [600, 540], [514, 547], [420, 540], [255, 540]];
const T0 = 2.3, STEP = 0.86;
kit.scene('q-scan', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('q5') + R.beam('q5b') +
      PTS.map(([x], k) => '<circle class="q5-p' + k + '" cx="' + x + '" cy="790" r="16" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>').join('') +
      '<path class="ink" style="stroke-width:4;opacity:.35;stroke-dasharray:6 12" d="M790 790 H255"/></svg>' +
      '<div class="tag tag-warm q5-cap">סריקת גוף: עוברים בהדרגה מאזור לאזור</div><div class="tag q5-each">ושמים לב למה שמרגישים בכל אחד</div></div>'));
    Object.assign(this, R.refs(kit, 'q5', ['eyes', 'cap', 'each']));
    this.p = PTS.map((_, k) => kit.stage.querySelector('.q5-p' + k));
    this.b = R.beamRefs(kit, 'q5b'); R.closeEyes(this.eyes);
  },
  render(t) {
    // step by step: glide to the next area, then rest there
    const k = Math.max(0, Math.min(PTS.length - 1, (t - T0) / STEP)), i = Math.min(PTS.length - 2, Math.floor(k)), f = eio(Math.min(1, (k - i) * 1.6));
    R.setBeam(this.b, lerp(PTS[i][0], PTS[i + 1][0], f), lerp(PTS[i][1], PTS[i + 1][1], f), 120, eo(seg(t, 0, 0.8)), 1);
    this.p.forEach((el, n) => R.lightDot(el, eo(seg(t, T0 + n * STEP - 0.3, T0 + n * STEP + 0.1))));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)));
    R.place(this.each, 540, lerp(952, 940, eo(seg(t, 5.9, 6.4))), eo(seg(t, 5.9, 6.4)));
  },
});
