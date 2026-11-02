const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-notfact', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought tg-c">"היא מתעלמת ממני"</div><div class="tag tg-stamp" style="font-size:54px;padding:14px 40px;border:6px solid #C0392B;color:#C0392B;background:transparent;box-shadow:none">עובדה</div>' +
      '<div class="tag tag-warm tg-cap">אבל מחשבה היא לא עובדה</div></div>'));
    Object.assign(this, R.refs(kit, 'tg', ['c', 'stamp', 'cap']));
  },
  render(t) {
    // the stamp lifts off; the card is just a thought again
    const off = eio(seg(t, 0.3, 1.2)), soft = eio(seg(t, 0.6, 1.4));
    this.c.classList.toggle('heavy', soft < 0.5);
    R.put(this.c, 540, 540, lerp(1.12, 1, soft), 0, 1);
    R.put(this.stamp, 620 + off * 200, 650 - off * 700, 1, -12 + off * 30, 1 - eo(seg(t, 0.8, 1.2)));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
  },
});