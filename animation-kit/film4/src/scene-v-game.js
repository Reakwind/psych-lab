const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-game', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="vg-move" style="position:absolute;inset:0"><svg class="art" viewBox="0 0 1080 1080">' + R.bigPhone('vg') + '</svg>' +
      '<div class="thought sm vg-c">כמה דקות לא שוות את זה</div><div class="btn vg-pass">לתת לחלוף</div><div class="btn keep vg-keep">לאמץ</div></div>' +
      '<div class="tag tag-cool vg-cap">המשחק</div></div>'));
    Object.assign(this, R.refs(kit, 'vg', ['move', 'c', 'pass', 'keep', 'cap']));
  },
  render(t) {
    // Ruth's phone fills the frame: the game, one thought at a time, two choices
    const up = eio(seg(t, 0, 0.9));
    this.move.style.transform = 'translateY(' + lerp(1000, 0, up) + 'px)';
    R.put(this.c, 540, 470, eob(seg(t, 1.0, 1.6), 1.5), 0, eo(seg(t, 1.0, 1.3)));
    R.put(this.pass, 420, 800, eob(seg(t, 1.6, 2.1), 1.6), 0, eo(seg(t, 1.6, 1.8)));
    R.put(this.keep, 670, 800, eob(seg(t, 1.8, 2.3), 1.6), 0, eo(seg(t, 1.8, 2.0)));
    R.place(this.cap, 540, lerp(64, 52, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
  },
});
