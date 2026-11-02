const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-wasted', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g transform="translate(540 560) scale(1.7)">' + R.hourglass('ww-hg') + '<rect class="ww-sand amber" x="-3" y="-8" width="6" height="90"/></g>' +
      '<g class="ww-w0">' + R.warm('ww-t0', 'mug') + '</g><g class="ww-w1">' + R.warm('ww-t1', 'people') + '</g></svg>' +
      '<div class="tag tag-cool ww-a">הזמן שאנחנו מקדישים לעצמנו</div><div class="tag struck ww-b">זמן מבוזבז</div></div>'));
    Object.assign(this, R.refs(kit, 'ww', ['sand', 'w0', 'w1', 'a', 'b']));
    this.gl = [0, 1].map((k) => kit.stage.querySelector('.ww-t' + k + '-glow'));
  },
  render(t) {
    this.sand.style.opacity = 0.5 + 0.5 * Math.sin(t * 9);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    // the time we give ourselves, and to what does us good, is not wasted
    R.xf(this.w0, 830, 560 + Math.sin(t * 1.6) * 8, 1.4 * eob(seg(t, 2.4, 2.9), 1.6), eo(seg(t, 2.4, 2.6)));
    R.xf(this.w1, 250, 560 + Math.sin(t * 1.6 + 1) * 8, 1.4 * eob(seg(t, 2.8, 3.3), 1.6), eo(seg(t, 2.8, 3.0)));
    R.place(this.b, 540, lerp(902, 890, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
    this.b.style.setProperty('--s', eio(seg(t, 6.8, 7.4)));
    this.gl.forEach((g) => (g.style.opacity = 0.45 * eio(seg(t, 7.0, 7.8))));
  },
});
