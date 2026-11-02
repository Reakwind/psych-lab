const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('gh', 0) +
      '<path class="gh-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.55"/><g class="gh-b">' + R.balloon('gh-bl') + '</g></svg>' +
      '<div class="tag tag-cool gh-title">מפגש 6 · מבוא לקרקוע</div><div class="tag gh-here">הגוף כאן</div><div class="tag tag-warm gh-there">הראש במקום אחר</div></div>'));
    Object.assign(this, R.refs(kit, 'gh', ['body', 'head', 'eyes', 'str', 'b', 'title', 'here', 'there']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the body stays in the chair; the attention floats off on a string
    const up = eio(seg(t, 1.4, 5.6)), x = lerp(500, 860, up), y = lerp(430, 170, up) + Math.sin(t * 1.6) * 8, s = eob(seg(t, 1.2, 1.8), 1.6);
    this.b.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + s * 1.6 + ')');
    this.str.setAttribute('d', 'M500 440 Q' + (500 + (x - 500) * 0.2) + ' ' + (y + 160) + ' ' + x + ' ' + (y + 30));
    this.str.style.opacity = 0.55 * eo(seg(t, 1.4, 1.8));
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 3.0, 4.0))) + ' 0 30)');
    R.place(this.title, 540, 70, eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 5.4, 5.9))));
    R.place(this.here, 250, lerp(592, 580, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)));
    R.place(this.there, 820, lerp(332, 320, eo(seg(t, 6.0, 6.5))), eo(seg(t, 6.0, 6.5)));
  },
});
