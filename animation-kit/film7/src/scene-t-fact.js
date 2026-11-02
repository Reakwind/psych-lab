const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-fact', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought tf-c">"היא מתעלמת ממני"</div><div class="tag tf-stamp" style="font-size:54px;padding:14px 40px;border:6px solid #C0392B;color:#C0392B;background:transparent;box-shadow:none">עובדה</div>' +
      '<div class="tag tag-cool tf-cap">הן יכולות להרגיש מאוד משכנעות</div></div>'));
    Object.assign(this, R.refs(kit, 'tf', ['c', 'stamp', 'cap']));
  },
  render(t) {
    // a convincing thought hardens until it feels like a fact
    const h = eio(seg(t, 2.1, 3.0));
    this.c.classList.toggle('heavy', h > 0.5);
    R.put(this.c, 540, 540, lerp(1, 1.12, h), 0, 1);
    const st = seg(t, 4.4, 4.8), sp = eob(st, 1.4);
    R.put(this.stamp, 620, 650, lerp(2.4, 1, sp), -12, eo(st));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
  },
});