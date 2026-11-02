const { seg, eo, eio, eob, lerp } = kit;
// parts 10–11: in practice attention drifts off (a balloon on its string) and that's natural; she notices (a spark) and gently brings it back — that is the practice itself
const P11 = 5.45, HEAD = [470, 470], TO = [820, 240];
kit.scene('w-drift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('w6', -60) +
      '<path class="w6-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10"/><g class="w6-bl"><g transform="scale(1.6)">' + R.balloon('w6-b') + '</g></g>' + R.beam('w6bm') + '<g class="w6-sp">' + R.spark('w6s') + '</g></svg>' +
      '<div class="tag tag-cool w6-wan">בתרגול עצמו, תשומת הלב נודדת</div><div class="tag w6-nat">וזה טבעי</div><div class="tag tag-cool w6-note">ברגע שאנחנו שמים לב שהיא נדדה</div>' +
      '<div class="tag w6-back">ומחזירים אותה בעדינות למה שקורה עכשיו</div><div class="tag tag-warm w6-itself">כאן מתרחש התרגול עצמו</div><div class="tag struck w6-wrong">רגע שבו התרגול השתבש</div></div>'));
    Object.assign(this, R.refs(kit, 'w6', ['body', 'head', 'eyes', 'mouth', 'str', 'bl', 'sp', 'wan', 'nat', 'note', 'back', 'itself', 'wrong']));
    this.bm = R.beamRefs(kit, 'w6bm');
  },
  render(t) {
    if (t > P11 + 0.5 && t < P11 + 2.4) R.blink(this.eyes, t, 0); else R.closeEyes(this.eyes);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.4) + ')');
    this.mouth.setAttribute('d', t > P11 + 4.2 ? R.mouthHappy : R.mouthNeutral);
    // out, and gently back
    const d = eio(seg(t, 2.3, 3.8)) * (1 - eio(seg(t, P11 + 2.7, P11 + 4.4)));
    const x = lerp(HEAD[0], TO[0], d), y = lerp(HEAD[1], TO[1], d) + Math.sin(t * 2) * 6 * d;
    R.setG(this.bl, x, y, Math.max(0.001, d), 1);
    this.str.setAttribute('d', 'M' + HEAD[0] + ' ' + HEAD[1] + ' C' + (HEAD[0] + 60) + ' ' + (HEAD[1] - 100) + ' ' + (x - 80) + ' ' + (y + 120) + ' ' + x + ' ' + (y + 30 * d)); this.str.style.opacity = d > 0.02 ? 0.6 : 0;
    R.setBeam(this.bm, lerp(440, x, d), lerp(650, y, d), 150, 1, 1, -t * 0.06 * d);
    this.head.setAttribute('transform', 'rotate(' + (-6 * d) + ' 0 30)');
    const sp = eob(seg(t, P11 + 0.6, P11 + 1.1), 1.8) * (1 - eo(seg(t, P11 + 3.0, P11 + 3.5)));
    this.sp.setAttribute('transform', 'translate(610 360) scale(' + Math.max(0.001, 0.8 * sp) + ')');
    R.place(this.wan, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, P11, P11 + 0.3))));
    R.place(this.nat, 540, lerp(952, 940, eo(seg(t, 3.7, 4.1))), eo(seg(t, 3.7, 4.1)) * (1 - eo(seg(t, P11 + 2.4, P11 + 2.7))));
    R.place(this.note, 540, lerp(84, 70, eo(seg(t, P11 + 0.4, P11 + 0.9))), eo(seg(t, P11 + 0.4, P11 + 0.9)) * (1 - eo(seg(t, P11 + 5.8, P11 + 6.1))));
    R.place(this.back, 540, lerp(952, 940, eo(seg(t, P11 + 2.8, P11 + 3.3))), eo(seg(t, P11 + 2.8, P11 + 3.3)) * (1 - eo(seg(t, P11 + 8.0, P11 + 8.3))));
    R.place(this.itself, 540, lerp(84, 70, eo(seg(t, P11 + 6.1, P11 + 6.6))), eo(seg(t, P11 + 6.1, P11 + 6.6)));
    R.place(this.wrong, 540, lerp(952, 940, eo(seg(t, P11 + 8.3, P11 + 8.8))), eo(seg(t, P11 + 8.3, P11 + 8.8)));
    this.wrong.style.setProperty('--s', eo(seg(t, P11 + 9.9, P11 + 10.4)));
  },
});
