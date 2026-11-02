const { seg, eo, eio, eob, lerp } = kit;
// parts 3–5 in session 2's head cutaway: thinking, feeling and acting run along a way between brain cells; each run wears it in, like the trail.
// A new branch grows (neuroplasticity); an old padlock on the brain springs open
const P4 = 12.24, P5 = 18.2;
const RUNS = [[4.2, 5.1], [6.5, 7.2], [7.25, 7.95], [8.0, 8.7], [9.6, 10.4]];
const W = [[6.71, 'לחשוב', 800], [7.3, 'להרגיש', 540], [8.14, 'לפעול', 280]];
kit.scene('w-brain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('w2') + R.brainPath('w2') + '<g class="w2-lk">' + R.padlock('w2-l') + '</g></svg>' +
      '<div class="tag tag-cool w2-too">במובן מסוים, גם המוח שלנו עובד ככה</div>' + W.map((w, k) => '<div class="tag w2-w' + k + '">' + w[1] + '</div>').join('') +
      '<div class="tag tag-warm w2-fam">המסלול הזה נעשה מוכר יותר למוח</div><div class="tag tag-cool w2-abil">היכולת של המוח להשתנות ולהסתגל</div><div class="tag tag-warm big w2-np">נוירופלסטיות</div>' +
      '<div class="tag struck w2-once">פעם חשבו: המוח מפסיק להשתנות כשמתבגרים</div><div class="tag tag-cool w2-now">היום יודעים שזה לא נכון</div></div>'));
    Object.assign(this, R.refs(kit, 'w2', ['bulb', 'nerves', 'eye', 'lk', 'l-sh', 'too', 'w0', 'w1', 'w2', 'fam', 'abil', 'np', 'once', 'now']));
    this.b = R.brainRefs(kit, 'w2'); this.bulb.style.opacity = 0; this.nerves.style.opacity = 0.25;
  },
  render(t) {
    this.eye.setAttribute('transform', (t % 4.3) > 4.15 ? 'translate(790 512) scale(1 .15) translate(-790 -512)' : '');
    // each run wears the way in a little more
    let wear = 0, u = -1;
    RUNS.forEach(([a, b], k) => { if (t >= a && t <= b) u = eio(seg(t, a, b)); wear = Math.max(wear, 0.18 * (k + 1) * eo(seg(t, a + 0.3, b))); });
    const br = eio(seg(t, P4 + 1.7, P4 + 2.9));
    R.setBrain(this.b, Math.max(wear, 0.001), u, br);
    R.place(this.too, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)) * (1 - eo(seg(t, 8.4, 8.7))));
    W.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(932, 920, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, P4, P4 + 0.3)))));
    R.place(this.fam, 540, lerp(84, 70, eo(seg(t, 8.7, 9.2))), eo(seg(t, 8.7, 9.2)) * (1 - eo(seg(t, P4, P4 + 0.3))));
    R.place(this.abil, 540, lerp(84, 70, eo(seg(t, P4 + 0.4, P4 + 0.9))), eo(seg(t, P4 + 0.4, P4 + 0.9)) * (1 - eo(seg(t, P5, P5 + 0.3))));
    R.place(this.np, 540, lerp(930, 916, eo(seg(t, P4 + 3.8, P4 + 4.3))), eob(seg(t, P4 + 3.8, P4 + 4.3), 1.3) * (1 - eo(seg(t, P5, P5 + 0.3))));
    // part 5: a padlock on the brain — the old belief — springs open and falls away
    const lk = eob(seg(t, P5 + 0.3, P5 + 0.8), 1.6), open = eob(seg(t, P5 + 5.4, P5 + 5.9), 2), fall = eio(seg(t, P5 + 6.0, P5 + 6.8));
    this.lk.setAttribute('transform', 'translate(' + (730 + 40 * fall) + ' ' + (200 + 500 * fall) + ') rotate(' + (40 * fall) + ') scale(' + Math.max(0.001, 0.9 * lk) + ')');
    this.lk.style.opacity = 1 - fall;
    this['l-sh'].setAttribute('transform', 'translate(0 ' + (-30 * open) + ') rotate(' + (-25 * open) + ' 32 0)');
    R.place(this.once, 540, lerp(952, 940, eo(seg(t, P5 + 0.4, P5 + 0.9))), eo(seg(t, P5 + 0.4, P5 + 0.9)));
    this.once.style.setProperty('--s', eo(seg(t, P5 + 3.3, P5 + 3.8)));
    R.place(this.now, 540, lerp(84, 70, eo(seg(t, P5 + 5.4, P5 + 5.9))), eo(seg(t, P5 + 5.4, P5 + 5.9)));
  },
});
