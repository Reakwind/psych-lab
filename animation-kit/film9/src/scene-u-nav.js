const { seg, eo, eio, eob, lerp } = kit;
kit.scene('u-nav', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cab('un', { mirror: true, nav: true }) + '</svg>' +
      '<div class="tag tag-cool un-a">האוטובוס: קצת כמו החיים שלנו</div><div class="tag tag-warm un-b">היעד: הדברים שחשובים לנו</div><div class="tag un-c">הכיוון שבו רוצים להתקדם</div></div>'));
    Object.assign(this, R.refs(kit, 'un', ['view', 'route', 'center', 'h-glow', 'nav', 'nr', 'nh-glow', 'a', 'b', 'c']));
    this.m = [0, 1, 2].map((k) => R.voiceRefs(kit, 'un-m' + k));
    R.mood(this.m[0], 0, false); R.mood(this.m[1], 1, false); R.mood(this.m[2], 0, false);
  },
  render(t) {
    // the navigation app holds the destination: what matters; the route lights up the road toward it
    this.view.setAttribute('transform', 'translate(60 ' + (-111 + Math.sin(t * 5) * 2) + ') scale(.889)');
    this.center.style.strokeDashoffset = -t * 90;
    const n = eob(seg(t, 3.2, 3.8), 1.6);
    this.nav.setAttribute('transform', 'translate(855 676) scale(' + lerp(1, 1.3, eio(seg(t, 3.2, 4.0)) * (1 - eio(seg(t, 9.2, 10.0)))) + ') translate(-855 -676)');
    this.nav.style.opacity = eo(seg(t, 3.2, 3.5));
    const nr = eio(seg(t, 3.8, 5.4));
    this.nr.style.strokeDasharray = nr + ' 1';
    this['nh-glow'].setAttribute('r', 70 + 20 * Math.sin(t * 4));
    const r = eio(seg(t, 7.7, 9.6));
    this.route.style.strokeDasharray = r + ' 1'; this.route.style.opacity = r > 0 ? 0.85 : 0;
    this['h-glow'].setAttribute('r', 70 + 24 * Math.sin(t * 3) * eo(seg(t, 6.8, 7.4)));
    R.place(this.a, 540, lerp(124, 110, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 7.3, 7.7))));
    R.place(this.b, 830, lerp(470, 458, eo(seg(t, 6.8, 7.2))), eo(seg(t, 6.8, 7.2)));
    R.place(this.c, 540, lerp(124, 110, eo(seg(t, 7.8, 8.2))), eo(seg(t, 7.8, 8.2)));
  },
});
