const { seg, eo, eio, eob, lerp } = kit;
// but sometimes, even when it matters, it's hard to make room for it — with Parkinson's even more: amid the load and the coping, the things we enjoyed get pushed aside
const P3 = 5.72;
const SX = [946, 804, 662, 520, 378, 236, 94];
kit.scene('y-room', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('yr', 0) +
      SX.map((x, k) => '<g class="yr-k' + k + '">' + R.task('yr-tk' + k, 128, 70, k === 2 || k === 4) + '</g>').join('') +
      [0, 1, 2].map((k) => '<g class="yr-b' + k + '">' + R.matter('yr-m' + k, R.WANT[k], 70) + '</g>').join('') + '</svg>' +
      '<div class="tag yr-a">קשה לפנות לו מקום</div><div class="tag tag-grey yr-l0">עומס</div><div class="tag tag-grey yr-l1">התמודדות</div><div class="tag yr-c">נדחקים הצידה</div></div>'));
    Object.assign(this, R.refs(kit, 'yr', ['body', 'head', 'eyes', 'mouth', 'a', 'l0', 'l1', 'c']));
    this.k = SX.map((x, k) => kit.stage.querySelector('.yr-k' + k)); this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.yr-b' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.blink(this.eyes, t, 0.5);
    // the day's grey blocks slide in from the right, edge to edge (first six), then with Parkinson's the row packs tighter and taller
    const more = eio(seg(t, P3 + 1.0, P3 + 2.4)), heavy = eio(seg(t, P3 + 5.0, P3 + 6.2));
    this.k.forEach((el, k) => {
      const a = k < 6 ? 0.4 + k * 0.22 : P3 + 1.0, p = eio(seg(t, a, a + 0.6));
      const x = lerp(1200 + k * 40, SX[k], p) - 70 * more * (k < 6 ? 0 : 0), jig = Math.sin(t * 7 + k) * 2 * heavy;
      el.setAttribute('transform', 'translate(' + x + ' ' + (330 + jig) + ') scale(1 ' + lerp(1, 1.25, heavy) + ')');
      el.style.opacity = p > 0 ? 1 : 0;
    });
    // the badges hover above; one dips to find a gap and bounces back; then they are pushed off to the side and fade
    const pushed = eio(seg(t, P3 + 9.6, P3 + 11.2));
    [860, 540, 220].forEach((x0, k) => {
      const dip = k === 0 ? 50 * Math.sin(Math.PI * seg(t, 2.6, 3.6)) : 0;
      const x = lerp(x0, 70, pushed), y = lerp(lerp(210, 160, eio(seg(t, 0, 0.8))) + dip, 520 + k * 120, pushed);
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 1.4 + k) * 5) + ') scale(' + lerp(0.85, 0.55, pushed) + ')');
      this.b[k].style.filter = 'grayscale(' + pushed + ')'; this.b[k].style.opacity = 1 - 0.45 * pushed;
    });
    this.head.setAttribute('transform', 'rotate(' + (-5 * pushed) + ' 0 30) translate(0 ' + 4 * heavy + ')');
    this.mouth.setAttribute('d', pushed > 0.5 ? R.SAD : t > 2.8 ? R.FLAT : R.SMILE);
    R.place(this.a, 790, lerp(442, 430, eo(seg(t, 2.78, 3.2))), eo(seg(t, 2.78, 3.2)) * (1 - eo(seg(t, P3 + 0.8, P3 + 1.2))));
    R.place(this.l0, SX[2], 330, eo(seg(t, P3 + 5.3, P3 + 5.7)));
    R.place(this.l1, SX[4], 330, eo(seg(t, P3 + 5.79, P3 + 6.2)));
    R.put(this.l0, SX[2], 330, 1, 0, eo(seg(t, P3 + 5.3, P3 + 5.7))); R.put(this.l1, SX[4], 330, 1, 0, eo(seg(t, P3 + 5.79, P3 + 6.2)));
    R.place(this.c, 300, lerp(462, 450, eo(seg(t, P3 + 10.41, P3 + 10.85))), eo(seg(t, P3 + 10.41, P3 + 10.85)));
  },
});
