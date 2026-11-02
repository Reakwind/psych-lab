const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-skill', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="wk-ar" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1" d="M540 360 V460 M510 430 L540 460 L570 430"/></svg>' +
      '<div class="thought wk-k1">לדעת מה עושה לנו טוב</div><div class="thought kind wk-k2">לדאוג שהדברים האלה יהיו חלק מהחיים שלנו</div>' +
      '<div class="tag tag-warm wk-a">יכולת בפני עצמה</div><div class="tag wk-b">לא מובנת מאליה</div></div>'));
    Object.assign(this, R.refs(kit, 'wk', ['ar', 'k1', 'k2', 'a', 'b']));
  },
  render(t) {
    // knowing what does us good, and making room for it: a skill in itself
    R.put(this.k1, 540, 270, eob(seg(t, 0.5, 1.0), 1.4), 0, eo(seg(t, 0.5, 0.7)));
    this.ar.style.strokeDashoffset = 1 - eio(seg(t, 3.0, 3.8));
    R.put(this.k2, 540, 570, eob(seg(t, 3.9, 4.4), 1.4), 0, eo(seg(t, 3.9, 4.1)));
    R.place(this.a, 540, lerp(792, 780, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)));
    R.place(this.b, 540, lerp(892, 880, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)));
  },
});
