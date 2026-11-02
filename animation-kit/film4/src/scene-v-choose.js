const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-choose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bigPhone('vo') + '</svg>' +
      '<div class="thought sm vo-c">אין טעם לנסות, שום דבר לא ישתנה</div><div class="btn vo-pass">לתת לחלוף</div><div class="btn keep vo-keep">לאמץ</div>' +
      '<div class="tag tag-cool vo-cap">המשחק</div><div class="tag tag-warm vo-read">כאילו עלתה אצלכם בראש</div></div>'));
    Object.assign(this, R.refs(kit, 'vo', ['c', 'pass', 'keep', 'cap', 'read']));
  },
  render(t) {
    // a new thought appears; read it as if it were yours; then choose — keep it, or let it pass
    const lean = eio(seg(t, 7.8, 8.4)) - eio(seg(t, 9.0, 9.6)) * 2, gone = eio(seg(t, 10.0, 10.9));
    R.put(this.c, 540 + lean * 50, 470 - gone * 640, eob(seg(t, 0.7, 1.3), 1.5) * (1 - 0.3 * gone), lean * 5 - gone * 8, eo(seg(t, 0.7, 1.0)) * (1 - gone));
    const k = 1 + 0.14 * Math.sin(Math.PI * seg(t, 7.9, 8.8)), p = 1 + 0.14 * Math.sin(Math.PI * seg(t, 9.4, 10.3)), pop = 1 + 0.08 * Math.sin(Math.PI * seg(t, 6.7, 7.2));
    R.put(this.pass, 420, 800, p * pop, 0, 1); R.put(this.keep, 670, 800, k * pop, 0, 1);
    this.keep.style.boxShadow = seg(t, 7.9, 8.8) > 0 && seg(t, 7.9, 8.8) < 1 ? '0 0 0 10px color-mix(in srgb, var(--accent) 40%, transparent)' : '';
    this.pass.style.boxShadow = seg(t, 9.4, 10.3) > 0 && seg(t, 9.4, 10.3) < 1 ? '0 0 0 10px color-mix(in srgb, var(--second) 25%, transparent)' : '';
    R.place(this.cap, 540, 52, 1 - eo(seg(t, 2.3, 2.6)) + eo(seg(t, 6.4, 6.8)));
    R.place(this.read, 540, lerp(64, 52, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)) * (1 - eo(seg(t, 6.0, 6.4))));
  },
});
