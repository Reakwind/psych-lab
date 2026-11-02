const { seg, eo, eio, eob, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('m-try', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('mt2', { sun: true }) +
      '<g class="mt2-walker"><g class="mt2-a">' + R.ruthBack('mt2-a', false) + '</g><g class="mt2-b">' + R.ruthBack('mt2-b', true) + '</g></g></svg>' +
      '<div class="tag tag-warm mt2-cap">אתם מוזמנים להתנסות ולראות מה עובד בשבילכם</div></div>'));
    Object.assign(this, R.refs(kit, 'mt2', ['walker', 'a', 'b', 'cap']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.mt2-st' + i + '-top'));
  },
  render(t) {
    const k = lerp(0.1, 1.6, eio(seg(t, 0.2, 4.0)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130, step = Math.floor(t * 2) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y - Math.abs(Math.sin(t * Math.PI * 2)) * 6 * s) + ') scale(' + s + ')');
    this.tops.forEach((el, i) => { const lit = i < 2 ? eo(seg(t, 0.6 + i * 1.2, 1.0 + i * 1.2)) : 0; el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(lit * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))'; });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)));
  },
});
