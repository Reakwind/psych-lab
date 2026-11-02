const { seg, eo, eio, eob, lerp } = kit;
// the family trip: Ruth always drove; now someone else drives and she plans the way and navigates
kit.scene('r-trip', {
  init(kit) {
    const seats = '<g class="rp-rd"><g transform="translate(110 -250) scale(.62)">' + R.bust('rp-r1', 'ruth') + '</g></g>' +
      '<g class="rp-rp"><g transform="translate(-110 -250) scale(.62)">' + R.bust('rp-r2', 'ruth') + '</g></g>' +
      '<g class="rp-fd"><g transform="translate(110 -250) scale(.62)">' + R.bust('rp-f', 'a') + '</g></g>' +
      '<g transform="translate(110 -262) scale(.9)">' + R.wheel('rp-w') + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 1080) scale(1.4) translate(-540 -1080)">' + R.land('rp', { sun: true, sunX: 300, sunY: 400 }) + '</g>' +
      '<path class="slate" opacity=".8" d="M470 470 L610 470 L1080 1080 L0 1080Z"/><path class="rp-dash" style="fill:none;stroke:color-mix(in srgb, var(--ground) 40%, white);stroke-width:14;stroke-dasharray:60 70" d="M540 480 L540 1080"/>' +
      '<g class="rp-car">' + R.carFront('rp', seats) + '</g><g class="rp-map">' + R.map('rp-m') + '</g></svg>' +
      '<div class="tag tag-warm rp-cap">לתכנן את הטיול ולנווט</div></div>'));
    kit.css('.rp-st0,.rp-st1,.rp-st2,.rp-st3,.rp-st4,.rp-st5,.rp-st6,.rp-st7,.rp-st8,.rp-st9,.rp-st10{display:none}');
    Object.assign(this, R.refs(kit, 'rp', ['car', 'rd', 'rp', 'fd', 'dash', 'map', 'cap']));
    this.route = kit.stage.querySelector('.rp-m-route');
    this.e1 = kit.stage.querySelector('.rp-r1-eyes'); this.e2 = kit.stage.querySelector('.rp-r2-eyes'); this.ef = kit.stage.querySelector('.rp-f-eyes');
  },
  render(t) {
    R.blink(this.e1, t, 0.2); R.blink(this.e2, t, 1.2); R.blink(this.ef, t, 2.2);
    this.car.setAttribute('transform', 'translate(540 ' + (1000 + Math.sin(t * 9) * 3) + ')');
    this.dash.style.strokeDashoffset = (-t * 260).toFixed(1);
    // the swap: Ruth slides to the passenger seat, a family member takes the wheel
    const sw = eio(seg(t, 2.0, 3.0));
    this.rd.style.opacity = 1 - sw; this.rp.style.opacity = sw; this.fd.style.opacity = sw;
    this.rd.setAttribute('transform', 'translate(' + (-80 * sw) + ' 0)'); this.rp.setAttribute('transform', 'translate(' + (80 * (1 - sw)) + ' 0)');
    // she plans and navigates: the map, the route drawing on
    const m = eob(seg(t, 3.4, 4.1), 1.4), r = eo(seg(t, 4.6, 5.8));
    this.map.setAttribute('transform', 'translate(240 560) rotate(-6) scale(' + 1.1 * m + ')'); this.map.style.opacity = eo(seg(t, 3.4, 3.7));
    this.route.style.opacity = r; this.route.style.strokeDashoffset = (-t * 0.1).toFixed(3);
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 3.7, 4.2))), eo(seg(t, 3.7, 4.2)));
  },
});
