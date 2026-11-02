const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-again', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('og2', 0) + R.string('og2-s') + '<g class="og2-b">' + R.balloon('og2-bl') + '</g>' +
      '<g class="og2-in" opacity="0"><rect class="inside" width="1080" height="1080"/>' + R.puffs() + '<g transform="translate(420 820) scale(.8)">' + R.adrift('og2-r') + '</g></g>' +
      '<g class="og2-ph"><g transform="scale(2.6)">' + R.phone('og2-p', 0, 0, 'ariel') + '</g><g transform="translate(110 -170) scale(.9)">' + R.balloon('og2-pb') + '</g></g></svg>' +
      '<div class="tag og2-f">סביר שתשכחו הכול</div><div class="tag tag-warm og2-a">ותמצאו את עצמכם שוב בתוך מחשבה</div><div class="tag tag-cool og2-c">"זה קורה לי כל הזמן."</div><div class="tag og2-d">ולכולם</div></div>'));
    Object.assign(this, R.refs(kit, 'og2', ['body', 'eyes', 's', 'b', 'in', 'r-drift', 'r-eyes', 'r-head', 'ph', 'f', 'a', 'c', 'd']));
    this.dots = kit.stage.querySelectorAll('.og2-bl .metal');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this['r-eyes'], t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // a thought pops up, swells, and she's inside one again. Ariel: it happens to me all the time
    const pop = eob(seg(t, 2.4, 3.0), 1.6), g = eio(seg(t, 4.2, 6.2)), bx = lerp(720, 540, g), by = lerp(260, 860, g);
    R.setBal(this.b, bx, by + Math.sin(t * 1.4) * 8 * (1 - g), lerp(1.6 * pop, 30, g), eo(seg(t, 2.4, 2.6)));
    this.dots.forEach((d) => (d.style.opacity = 1 - eo(seg(t, 4.2, 4.9))));
    this.s.setAttribute('d', R.strD(500, 470, bx, by + 30)); this.s.style.opacity = 0.55 * eo(seg(t, 2.4, 2.6)) * (1 - eo(seg(t, 4.3, 4.9)));
    this.in.setAttribute('opacity', eo(seg(t, 5.8, 6.4)));
    this['r-drift'].setAttribute('transform', 'translate(' + Math.sin(t * 0.8) * 30 + ' ' + Math.sin(t * 1.3) * 16 + ') rotate(' + Math.sin(t * 0.7) * 5 + ')');
    this['r-head'].setAttribute('transform', 'rotate(' + (-8 + Math.sin(t) * 4) + ' 0 30)');
    const ph = eob(seg(t, 7.6, 8.2), 1.5);
    this.ph.setAttribute('transform', 'translate(820 ' + lerp(1300, 760, ph) + ') rotate(-6)');
    R.place(this.f, 540, lerp(84, 70, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)) * (1 - eo(seg(t, 5.5, 5.9))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 5.9, 6.3))), eo(seg(t, 5.9, 6.3)));
    R.place(this.c, 820, lerp(452, 440, eo(seg(t, 7.8, 8.2))), eo(seg(t, 7.8, 8.2)));
    R.place(this.d, 540, lerp(176, 164, eo(seg(t, 9.8, 10.2))), eo(seg(t, 9.8, 10.2)));
  },
});
