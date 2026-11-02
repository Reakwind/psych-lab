const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-check', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought tw2-c" style="width:760px;font-size:50px;background:color-mix(in srgb, var(--ground) 40%, white)">"שום דבר אף פעם לא מסתדר לי?"</div>' +
      '<div class="thought sm tw2-f">האם זו עובדה?</div><div class="thought sm kind tw2-o">יש עוד דרך להסתכל?</div><div class="tag tag-cool tw2-cap">אפשר לעצור ולבדוק</div></div>'));
    Object.assign(this, R.refs(kit, 'tw2', ['c', 'f', 'o', 'cap']));
  },
  render(t) {
    R.put(this.c, 540, 300, 1, 0, 1);
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.1, 1.6))), eo(seg(t, 1.1, 1.6)));
    // now it can be checked
    R.put(this.f, 760, lerp(640, 600, eo(seg(t, 3.2, 3.7))), eob(seg(t, 3.2, 3.7), 1.4), -2, eo(seg(t, 3.2, 3.4)));
    R.put(this.o, 320, lerp(760, 720, eo(seg(t, 5.5, 6.0))), eob(seg(t, 5.5, 6.0), 1.4), 2, eo(seg(t, 5.5, 5.7)));
  },
});