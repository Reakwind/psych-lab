const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-inside', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('oi', 0) + R.string('oi-s') + '<g class="oi-b">' + R.balloon('oi-bl') + '</g>' +
      '<g class="oi-in" opacity="0"><rect class="inside" width="1080" height="1080"/>' + R.puffs() + '<g transform="translate(540 820) scale(.8)">' + R.adrift('oi-r') + '</g></g></svg>' +
      '<div class="tag tag-warm oi-a">כבר עמוק בתוך המחשבה</div><div class="tag oi-b2">עוד לפני ששמנו לב</div></div>'));
    Object.assign(this, R.refs(kit, 'oi', ['body', 'eyes', 'mouth', 's', 'b', 'in', 'r-drift', 'r-eyes', 'r-head', 'a', 'b2']));
    this.dots = kit.stage.querySelectorAll('.oi-bl .metal');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this['r-eyes'], t, 1.4);
    // one thought swells until it is all there is: the room is gone, she is inside it
    const g = eio(seg(t, 0.3, 2.4)), bx = lerp(720, 540, g), by = lerp(230, 860, g);
    R.setBal(this.b, bx, by, lerp(1.6, 30, g), 1);
    this.dots.forEach((d) => (d.style.opacity = 1 - eo(seg(t, 0.3, 1.0))));
    this.s.setAttribute('d', R.strD(500, 470, bx, by + 30)); this.s.style.opacity = 0.55 * (1 - eo(seg(t, 0.4, 1.0)));
    this.in.setAttribute('opacity', eo(seg(t, 2.0, 2.6)));
    this['r-drift'].setAttribute('transform', 'translate(' + Math.sin(t * 0.8) * 30 + ' ' + Math.sin(t * 1.3) * 16 + ') rotate(' + Math.sin(t * 0.7) * 5 + ')');
    this['r-head'].setAttribute('transform', 'rotate(' + (-8 + Math.sin(t) * 4) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.3))), eo(seg(t, 1.9, 2.3)));
    R.place(this.b2, 540, lerp(176, 164, eo(seg(t, 3.5, 3.9))), eo(seg(t, 3.5, 3.9)));
  },
});
