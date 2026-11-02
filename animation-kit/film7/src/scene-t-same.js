const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-same', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 560) scale(2)">' + R.phoneCall('ts') + '</g></svg>' +
      ['קרה לה משהו', 'היא מתעלמת ממני', 'היא בטח עסוקה'].map((w, k) => '<div class="thought xs ts-c' + k + '">"' + w + '"</div>').join('') +
      '<div class="tag tag-cool ts-a">המצב הוא אותו מצב</div><div class="tag tag-warm ts-b">מה שמשתנה: המחשבה</div></div>'));
    Object.assign(this, R.refs(kit, 'ts', ['c0', 'c1', 'c2', 'a', 'b']));
  },
  render(t) {
    // the phone stays exactly the same; only the thought about it changes
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    [[840, 330], [240, 330], [540, 900]].forEach(([x, y], k) => {
      const hi = Math.sin(Math.PI * seg(t, 3.9 + k * 0.6, 4.7 + k * 0.6));
      R.put(this['c' + k], x, y, 1 + 0.1 * hi, 0, eo(seg(t, 0.6 + k * 0.2, 1.1 + k * 0.2)));
    });
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 3.8, 4.3))), eo(seg(t, 3.8, 4.3)));
  },
});