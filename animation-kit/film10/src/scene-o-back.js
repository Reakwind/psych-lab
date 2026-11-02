const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-back', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ok', 0) + '<g class="ok-rt" transform="translate(590 868) scale(.8)">' + R.roots('ok') + '</g>' + R.string('ok-s') + '<g class="ok-b">' + R.balloon('ok-bl') + '</g>' +
      '<g class="ok-in"><rect class="inside" width="1080" height="1080"/>' + R.puffs() + '<g transform="translate(420 820) scale(.8)">' + R.adrift('ok-r') + '</g></g></svg>' +
      '<div class="tag ok-a">זה לא אומר שאיבדתם את התרגול</div><div class="tag tag-warm ok-n">שמים לב שנסחפנו</div><div class="tag ok-m">זה בדיוק הרגע להתבונן בה מבחוץ</div><div class="tag tag-cool ok-c" style="font-size:40px">ולחזור לרגע הזה</div></div>'));
    Object.assign(this, R.refs(kit, 'ok', ['body', 'eyes', 'head', 'mouth', 's', 'b', 'in', 'r-drift', 'r-eyes', 'r-head', 'r-mouth', 'r', 'a', 'n', 'm', 'c']));
    this.dots = kit.stage.querySelectorAll('.ok-bl .metal');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this['r-eyes'], t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // inside the thought she notices she drifted; the balloon shrinks back, the room returns, her feet find the floor
    const noticed = t > 3.4, g = 1 - eio(seg(t, 5.6, 7.6)), bx = lerp(760, 540, g), by = lerp(250, 860, g);
    R.setBal(this.b, bx, by + Math.sin(t * 1.4) * 8 * (1 - g), lerp(1.5, 30, g), 1);
    this.dots.forEach((d) => (d.style.opacity = eo(seg(t, 6.9, 7.6))));
    this.s.setAttribute('d', R.strD(500, 470, bx, by + 30)); this.s.style.opacity = 0.55 * eo(seg(t, 7.0, 7.6));
    this.in.setAttribute('opacity', 1 - eo(seg(t, 5.4, 6.0)));
    this['r-drift'].setAttribute('transform', 'translate(' + Math.sin(t * 0.8) * 30 * (noticed ? 0.3 : 1) + ' ' + Math.sin(t * 1.3) * 16 + ') rotate(' + Math.sin(t * 0.7) * 5 * (noticed ? 0.3 : 1) + ')');
    this['r-head'].setAttribute('transform', 'rotate(' + (noticed ? 0 : -8 + Math.sin(t) * 4) + ' 0 30)');
    this['r-mouth'].setAttribute('d', noticed ? 'M-8 24 Q2 34 12 24 Q2 28 -8 24' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + 8 * eio(seg(t, 8.1, 8.8)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 8.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    const r = eio(seg(t, 8.5, 9.8)); this.r.style.strokeDasharray = r + ' 1'; this.r.style.opacity = r > 0 ? 1 : 0;
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.1, 1.5))), eo(seg(t, 1.1, 1.5)) * (1 - eo(seg(t, 5.3, 5.6))));
    R.place(this.n, 540, lerp(176, 164, eo(seg(t, 3.4, 3.8))), eo(seg(t, 3.4, 3.8)) * (1 - eo(seg(t, 5.3, 5.6))));
    R.place(this.m, 540, lerp(84, 70, eo(seg(t, 5.7, 6.1))), eo(seg(t, 5.7, 6.1)));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 8.5, 8.9))), eo(seg(t, 8.5, 8.9)));
  },
});
