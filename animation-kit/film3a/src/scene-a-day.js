const { seg, eo, eio, eob, lerp } = kit;
const W = [[2.6, 'תחושות', 800], [3.7, 'ריכוז', 540], [4.4, 'תנועה', 280]];
kit.scene('a-day', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ay', 760, [975, 760, 480]) + '</svg>' +
      W.map((w, k) => '<div class="tag ay-w' + k + '">' + w[1] + '</div>').join('') +
      '<div class="tag tag-warm ay-cap">משתנים כל יום, וגם במהלך היום</div><div class="tag ay-pills">זמני התרופה</div></div>'));
    Object.assign(this, R.refs(kit, 'ay', ['curve', 'pill0', 'pill1', 'pill2', 'cap', 'pills', 'w0', 'w1', 'w2']));
  },
  render(t) {
    // sensations, focus and movement: how they rise and fall across a day, morning (right) to evening (left)
    W.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(196, 184, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 5.8, 6.3))), eo(seg(t, 5.8, 6.3)));
    this.curve.style.strokeDasharray = eio(seg(t, 5.6, 9.6)) + ' 1';
    // ...and with the timing of each pill
    [this.pill0, this.pill1, this.pill2].forEach((el, k) => {
      const x = [975, 760, 480][k], p = eob(seg(t, 9.8 + k * 0.2, 10.3 + k * 0.2), 2);
      el.setAttribute('transform', 'translate(' + x + ' 806) scale(' + p + ')');
    });
    R.place(this.pills, 760, lerp(870, 858, eo(seg(t, 10.0, 10.5))), eo(seg(t, 10.0, 10.5)));
  },
});
