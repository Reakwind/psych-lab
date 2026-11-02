const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-watch', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ow', -120) + R.string('ow-s') + '<g class="ow-b">' + R.balloon('ow-bl') + '</g></svg>' +
      '<div class="tag tag-cool ow-a">בתרגול הבא: משהו קצת אחר</div><div class="tag ow-b2">במקום ללכת עם כל מחשבה</div><div class="tag tag-warm ow-c" style="font-size:40px">להתבונן בה</div></div>'));
    Object.assign(this, R.refs(kit, 'ow', ['body', 'head', 'eyes', 'mouth', 's', 'b', 'a', 'b2', 'c']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the thought tugs her along; then she lets go of the string and simply watches it drift by
    const hx = 380, hy = 470, tug = eio(seg(t, 3.0, 4.2)) * (1 - eio(seg(t, 6.6, 7.6))), free = eio(seg(t, 7.3, 9.2));
    const bx = lerp(lerp(560, 860, eio(seg(t, 0.3, 2.8))), 760, free) + 40 * tug, by = lerp(lerp(470, 260, eio(seg(t, 0.3, 2.8))), 200, free) - 20 * tug + Math.sin(t * 1.4) * 8;
    R.setBal(this.b, bx, by, lerp(0.5, 1.8, eo(seg(t, 0.3, 1.6))), eo(seg(t, 0.3, 0.6)));
    this.s.setAttribute('d', 'M' + hx + ' ' + hy + ' Q' + ((hx + bx) / 2) + ' ' + (lerp(hy + 40, Math.min(hy, by) - 10, tug)) + ' ' + bx + ' ' + (by + 30));
    this.s.style.opacity = 0.55 * eo(seg(t, 0.3, 0.6)) * (1 - eo(seg(t, 7.3, 7.9)));
    this.body.setAttribute('transform', 'translate(' + 26 * tug + ' ' + -10 * tug + ') rotate(' + 6 * tug + ') scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(6, 10, free) + ' 0 30)');
    this.mouth.setAttribute('d', tug > 0.5 ? 'M-10 30 Q2 24 14 30' : t > 7.8 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.7))), eo(seg(t, 0.3, 0.7)) * (1 - eo(seg(t, 2.6, 3.0))));
    R.place(this.b2, 540, lerp(84, 70, eo(seg(t, 3.0, 3.4))), eo(seg(t, 3.0, 3.4)));
    R.place(this.c, 760, lerp(334, 320, eo(seg(t, 7.5, 7.9))), eo(seg(t, 7.5, 7.9)));
  },
});
