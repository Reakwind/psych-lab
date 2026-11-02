const { seg, eo, eio, eob, lerp } = kit;
// parts 1–2: a meadow of tall grass with no path; Ruth pushes through, then walks the same way again and again until the grass lies flat and a trail appears
const P2 = 8.85;
const PASS = [[1.0, 8.4, 0, 1.6], [P2 + 0.4, P2 + 3.6, -0.2, 5.4], [P2 + 3.8, P2 + 6.9, -0.2, 5.4], [P2 + 7.1, P2 + 10.6, -0.2, 5.4]];
const LV = [0, 0.3, 0.55, 0.78, 1];
kit.scene('w-field', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.meadow('w1') + R.wader('w1r') + R.dots('w1-dt', 4, 60) + '</svg>' +
      '<div class="tag tag-cool w1-title">מפגש 30 · מיינדפולנס ונוירופלסטיות</div><div class="tag w1-field">דמיינו שדה מלא עשב</div><div class="tag w1-none">בפעם הראשונה אין ממש שביל</div><div class="tag tag-warm w1-clear">צריך לפלס את הדרך</div>' +
      '<div class="tag tag-cool w1-again">חוזרים שוב ושוב לאותו מסלול</div><div class="tag w1-flat">העשב נעשה שטוח יותר</div><div class="tag tag-warm w1-path">והשביל ברור וקל יותר למעבר</div></div>'));
    Object.assign(this, R.refs(kit, 'w1', ['sun', 'title', 'field', 'none', 'clear', 'again', 'flat', 'path']));
    this.m = R.meadowStyle(kit, 'w1'); this.r = R.waderRefs(kit, 'w1r');
    this.d = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.w1-dt-d' + k)); this.dt = kit.stage.querySelector('.w1-dt');
  },
  render(t) {
    // which walk is on, and how far along
    let i = 0; PASS.forEach((p, n) => { if (t >= p[0]) i = n; });
    const [a, b, k0, k1] = PASS[i], f = seg(t, a, b), k = lerp(k0, k1, i === 0 ? f : eio(f)), walking = t > a && t < b;
    // the grass behind her lies down a little more with every walk
    const wear = [];
    for (let n = 0; n < R.NB; n++) { const done = i === 0 ? 0 : LV[i]; const behind = eo(Math.max(0, Math.min(1, k - n - 0.2))); wear.push(t < a ? done : lerp(done, LV[i + 1], behind)); }
    R.setWear(this.m, wear);
    const here = wear[Math.max(0, Math.min(R.NB - 1, Math.floor(k)))];
    R.setWader(this.r, Math.max(0, k), t, walking, 1 - here);
    this.r.w.style.opacity = eo(seg(t, a - 0.2, a + 0.3)) * (i === 0 ? 1 : 1 - eo(seg(k, 4.4, 5.3)));
    // the sun crosses the sky as the walks go by
    this.sun.setAttribute('cx', lerp(170, 600, t / 20.4)); this.sun.setAttribute('cy', 340 - 90 * Math.sin(Math.PI * t / 20.4));
    R.setG(this.dt, 860, 250, 1, eo(seg(t, P2 + 0.4, P2 + 0.9)));
    this.d.forEach((el, n) => R.lightDot(el, n === 0 ? eo(seg(t, P2 + 0.4, P2 + 0.8)) : eo(seg(t, PASS[Math.min(3, n)][0], PASS[Math.min(3, n)][0] + 0.4)) * (n < 4 ? 1 : 0)));
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 1.4, 1.7))));
    R.place(this.field, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 3.2, 3.5))));
    R.place(this.none, 540, lerp(84, 70, eo(seg(t, 3.4, 3.9))), eo(seg(t, 3.4, 3.9)) * (1 - eo(seg(t, P2, P2 + 0.3))));
    R.place(this.clear, 540, lerp(162, 150, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)) * (1 - eo(seg(t, P2, P2 + 0.3))));
    R.place(this.again, 540, lerp(84, 70, eo(seg(t, P2 + 1.3, P2 + 1.8))), eo(seg(t, P2 + 1.3, P2 + 1.8)) * (1 - eo(seg(t, P2 + 7.7, P2 + 8.0))));
    R.place(this.flat, 540, lerp(162, 150, eo(seg(t, P2 + 6.0, P2 + 6.5))), eo(seg(t, P2 + 6.0, P2 + 6.5)) * (1 - eo(seg(t, P2 + 7.7, P2 + 8.0))));
    R.place(this.path, 540, lerp(84, 70, eo(seg(t, P2 + 7.9, P2 + 8.4))), eo(seg(t, P2 + 7.9, P2 + 8.4)));
  },
});
