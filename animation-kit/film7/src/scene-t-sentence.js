const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-sentence', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought heavy tu-c" style="width:760px;font-size:50px">"שום דבר אף פעם לא מסתדר לי."</div><div class="tag tag-cool tu-cap">טריק קטן</div></div>'));
    Object.assign(this, R.refs(kit, 'tu', ['c', 'cap']));
  },
  render(t) {
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)));
    R.put(this.c, 540, 540, eob(seg(t, 4.5, 5.1), 1.4), 0, eo(seg(t, 4.5, 4.7)));
  },
});