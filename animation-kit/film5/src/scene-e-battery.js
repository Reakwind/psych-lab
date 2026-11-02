const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-battery', {
  init(kit) {
    const ar = (cls, col, d) => '<path class="' + cls + '" style="fill:none;stroke:' + col + ';stroke-width:14;stroke-linecap:round;stroke-linejoin:round;opacity:0" d="' + d + '"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('eb', -120) +
      '<g transform="translate(780 400) scale(1.3)">' + R.battery('eb') + '</g>' + ar('eb-dn', '#D96C6C', 'M950 280 V500 M920 470 L950 500 L980 470') + ar('eb-up', '#6FAE7A', 'M610 520 V300 M580 330 L610 300 L640 330') + '</svg>' +
      '<div class="tag tag-warm eb-cap">האנרגיה כמו סוללה</div><div class="tag eb-d">מרוקנות</div><div class="tag tag-cool eb-u">מטעינות</div></div>'));
    Object.assign(this, R.refs(kit, 'eb', ['body', 'eyes', 'fill', 'dn', 'up', 'cap', 'd', 'u']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
    // some things drain it, some charge it
    const dn = eio(seg(t, 4.3, 5.4)), up = eio(seg(t, 6.2, 7.3));
    R.setBattery(this.fill, 0.72 - 0.34 * dn + 0.42 * up);
    this.dn.style.opacity = eo(seg(t, 4.2, 4.5)) * (1 - eo(seg(t, 6.0, 6.3))); this.dn.setAttribute('transform', 'translate(0 ' + dn * 20 + ')');
    this.up.style.opacity = eo(seg(t, 6.1, 6.4)); this.up.setAttribute('transform', 'translate(0 ' + (-up * 20) + ')');
    R.place(this.d, 950, lerp(552, 540, eo(seg(t, 4.3, 4.7))), eo(seg(t, 4.3, 4.7)) * (1 - eo(seg(t, 6.0, 6.3))));
    R.place(this.u, 610, lerp(232, 220, eo(seg(t, 6.2, 6.6))), eo(seg(t, 6.2, 6.6)));
  },
});