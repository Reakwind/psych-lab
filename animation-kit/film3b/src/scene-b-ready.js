const { seg, eo, eio, eob, lerp } = kit;
kit.scene('b-ready', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('bd') + '<g class="bd-pg">' + R.pacer('bd-p', 5) + '<path d="M-26 -40 V40 L44 0Z" style="fill:var(--second)"/></g>' +
      '<rect class="bd-dim" width="1080" height="1080" style="fill:var(--second);opacity:0"/></svg>' +
      '<div class="tag tag-cool bd-cap">קחו רגע להתמקם</div><div class="tag tag-warm bd-go">ותתחילו כשאתם מוכנים</div></div>'));
    Object.assign(this, R.refs(kit, 'bd', ['glow', 'armR', 'eyes', 'pg', 'dim', 'cap', 'go']));
  },
  render(t) {
    // the light lowers a little; Ruth settles; the pacer waits for her
    this.dim.style.opacity = 0.14 * eo(seg(t, 0.4, 3.0));
    if (t > 2.0) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    const b = (1 - Math.cos(2 * Math.PI * t / 5.5)) / 2;
    R.handOn(this.armR, eio(seg(t, 0.4, 1.4)), b);
    this.glow.style.opacity = 0.25 * b;
    const p = eob(seg(t, 3.0, 3.7), 1.5);
    this.pg.setAttribute('transform', 'translate(540 165) scale(' + p * (0.9 + 0.03 * Math.sin(t * 1.6)) + ')');
    R.place(this.cap, 540, lerp(940, 928, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 7.2, 7.6))));
    R.place(this.go, 540, lerp(940, 928, eo(seg(t, 7.6, 8.1))), eo(seg(t, 7.6, 8.1)));
  },
});
