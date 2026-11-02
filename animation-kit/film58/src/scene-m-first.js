const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-first', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + '<g transform="translate(540 1080) scale(1.4) translate(-540 -1080)">' + R.land('mi', { sun: true, sunX: 760, sunY: 420 }) + '</g>' +
      '<g class="mi-w"><g class="mi-a">' + R.ruthBack('mi', false) + '</g><g class="mi-b">' + R.ruthBack('mi-b', true) + '</g></g></svg>' +
      '<div class="tag tag-warm mi-cap">מה חשוב לי?</div></div>'));
    Object.assign(this, R.refs(kit, 'mi', ['w', 'a', 'b', 'sun', 'cap']));
    this.top = kit.stage.querySelector('.mi-st0-top');
    this.next = kit.stage.querySelector('.mi-st1-top');
  },
  render(t) {
    // she walks onto the first stone of her path, and it lights
    const walk = eio(seg(t, 0.2, 2.0)), stepping = t > 0.2 && t < 2.0;
    const step = stepping ? Math.floor(t * 3.2) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + lerp(820, 548, walk) + ' ' + (lerp(1180, 990, walk) - (step ? 6 : 0)) + ') scale(' + lerp(1.3, 1.18, walk) + ')');
    const lit = eo(seg(t, 1.8, 2.4)), nxt = eo(seg(t, 3.0, 3.8));
    this.top.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * lit) + '%, var(--ground))';
    this.next.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 30 * nxt) + '%, var(--ground))';
    this.sun.style.opacity = 0.35 + 0.65 * eo(seg(t, 0.5, 2.5));
    R.place(this.cap, 540, lerp(164, 150, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
  },
});
