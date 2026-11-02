const { seg, eo, eio, eob, lerp } = kit;
// but we can practise turning our attention; it's like a muscle we can train
kit.scene('h-muscle', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('hm') + '</svg>' +
      '<div class="tag tag-cool hm-a">אפשר לתרגל להפנות אותה</div><div class="tag tag-warm hm-b">כמו שריר שאפשר לאמן</div></div>'));
    this.A = R.attnRefs(kit, 'hm'); Object.assign(this, R.refs(kit, 'hm', ['a', 'b']));
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')'); A.lf.setAttribute('transform', 'scale(0)');
    // she turns her head away from the worry, and the circle follows her
    const turn = eio(seg(t, 1.0, 2.6));
    const x = lerp(R.SPOT.worry[0], 470, turn), y = lerp(R.SPOT.worry[1] + 40, 560, turn);
    // like a muscle: it flexes, twice
    const flex = 0.12 * (Math.max(0, Math.sin(Math.PI * seg(t, 4.9, 5.7))) + Math.max(0, Math.sin(Math.PI * seg(t, 5.9, 6.7))));
    R.ring(A, x, y, lerp(215, 210, turn) * (1 + flex), 1, t, 0);
    R.worryAt(A, R.SPOT.worry[0], R.SPOT.worry[1] + 40 * (1 - turn), lerp(1.55, 1, turn), t);
    A.head.setAttribute('transform', 'rotate(' + lerp(-8, 6, turn) + ' 0 30)');
    R.look(A.eyes, t, 0.6, lerp(4, -3, turn), lerp(-3, 0, turn));
    A.mouth.setAttribute('d', turn > 0.6 ? R.SMILE : R.FLAT);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.9, 5.4))), eo(seg(t, 4.9, 5.4)));
  },
});
