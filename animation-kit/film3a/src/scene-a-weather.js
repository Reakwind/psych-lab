const { seg, eo, eio, eob, lerp } = kit;
const C = [['sun', 820, 0.3], ['cloud', 540, 0.8], ['mixed', 260, 1.3]];
kit.scene('a-weather', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + C.map((c, k) => '<g class="aw-c' + k + '">' + R.dayCard('aw-d' + k, c[0]) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool aw-cap">כל תרגול ירגיש קצת אחרת</div><div class="tag tag-warm aw-ok">וזה בסדר</div></div>'));
    Object.assign(this, R.refs(kit, 'aw', ['c0', 'c1', 'c2', 'cap', 'ok']));
  },
  render(t) {
    // three practices, three different days
    C.forEach(([, x, a], k) => {
      const p = eio(seg(t, a, a + 0.7));
      this['c' + k].setAttribute('transform', 'translate(' + x + ' ' + (lerp(1300, 470, p) + Math.sin(t * 1.4 + k) * 6) + ') rotate(' + lerp(12, [-4, 2, 5][k], p) + ') scale(1.12)');
    });
    R.place(this.cap, 540, lerp(124, 110, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)));
    R.place(this.ok, 540, lerp(800, 786, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)));
  },
});
