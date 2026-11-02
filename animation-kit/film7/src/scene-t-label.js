const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-label', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought heavy tb-c">"בטח משהו לא בסדר."</div><div class="tag tag-warm tb-st" style="font-size:40px">מחשבה</div>' +
      '<div class="tag tag-cool tb-a">דפוסי חשיבה אנושיים וטבעיים</div><div class="tag tb-b">לא להפסיק אותם, רק לזהות</div></div>'));
    Object.assign(this, R.refs(kit, 'tb', ['c', 'st', 'a', 'b']));
  },
  render(t) {
    R.put(this.c, 540, 560, 1, 0, 1);
    this.c.classList.toggle('heavy', t < 6.8);
    // naming it for what it is: a thought
    const s = eob(seg(t, 6.3, 6.8), 2);
    R.put(this.st, 780, 470, lerp(2.2, 1, s), -8, eo(seg(t, 6.3, 6.5)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});