const { seg, eo, eio, eob, lerp } = kit;
const C = [[0.4, 'מחשבה', 820, ''], [2.6, 'רגש', 540, ''], [4.1, 'מעשה', 260, 'kind']];
kit.scene('t-chain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="tn-a0 ink" pathLength="1" style="stroke-width:10" d="M690 540 H660 M680 520 L660 540 L680 560"/><path class="tn-a1 ink" pathLength="1" style="stroke-width:10" d="M410 540 H390 M410 520 L390 540 L410 560"/></svg>' +
      C.map((c, k) => '<div class="thought xs ' + c[3] + ' tn-c' + k + '" style="width:220px">' + c[1] + '</div>').join('') + '<div class="tag tag-cool tn-cap">המחשבות משפיעות</div></div>'));
    Object.assign(this, R.refs(kit, 'tn', ['a0', 'a1', 'c0', 'c1', 'c2', 'cap']));
  },
  render(t) {
    // thought → feeling → action
    C.forEach(([a, , x], k) => R.put(this['c' + k], x, 540, eob(seg(t, a, a + 0.5), 1.6), 0, eo(seg(t, a, a + 0.2))));
    this.a0.style.opacity = eo(seg(t, 2.3, 2.6)); this.a1.style.opacity = eo(seg(t, 3.8, 4.1));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
  },
});