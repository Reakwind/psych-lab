const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-try', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="vr-move" style="position:absolute;inset:0"><svg class="art" viewBox="0 0 1080 1080">' + R.bigPhone('vr') + '</svg>' +
      '<div class="thought kind sm vr-c">גם כמה דקות נחשבות</div><div class="btn vr-pass">לתת לחלוף</div><div class="btn keep vr-keep">לאמץ</div></div>' +
      '<div class="tag tag-warm vr-cap">בואו ננסה</div></div>'));
    Object.assign(this, R.refs(kit, 'vr', ['move', 'c', 'pass', 'keep', 'cap']));
  },
  render(t) {
    // back to the phone: the first card is waiting
    const up = eio(seg(t, 0, 0.6));
    this.move.style.transform = 'translateY(' + lerp(600, 0, up) + 'px)';
    R.put(this.c, 540, 470, eob(seg(t, 0.4, 0.9), 1.5), 0, eo(seg(t, 0.4, 0.6)));
    const pulse = 1 + 0.05 * Math.sin(t * 6) * seg(t, 0.9, 1.2);
    R.put(this.pass, 420, 800, pulse, 0, 1); R.put(this.keep, 670, 800, pulse, 0, 1);
    R.place(this.cap, 540, lerp(64, 52, eo(seg(t, 0.2, 0.6))), eo(seg(t, 0.2, 0.6)));
  },
});
