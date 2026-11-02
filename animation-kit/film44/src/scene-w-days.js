const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-days', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wd', -160) +
      [0, 1, 2, 3].map((k) => '<g class="wd-d' + k + '">' + R.dayCard('wd-dc' + k, ['sun', 'cloud', 'mixed', 'sun'][k]) + '</g>').join('') +
      '<path class="wd-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:0"/><g class="wd-bl">' + R.balloon('wd-b') + '</g>' +
      '<g transform="translate(700 560) scale(.85)">' + R.clock('wd-c') + '<path class="wd-half" d="M0 0 V-62 A62 62 0 0 1 0 62Z" style="fill:var(--accent);opacity:0"/></g>' +
      '<g transform="translate(900 560) scale(.62)">' + R.battery('wd') + '</g></svg>' +
      '<div class="tag tag-cool wd-a">ימים שחולפים בלי ששמנו לב</div><div class="tag wd-h">הראש נמצא במקום אחר</div><div class="tag wd-t">חצי שעה מתפנה</div><div class="tag wd-e">אין לנו כוח</div></div>'));
    Object.assign(this, R.refs(kit, 'wd', ['body', 'head', 'eyes', 'mouth', 'd0', 'd1', 'd2', 'd3', 'str', 'bl', 'half', 'fill', 'bat', 'a', 'h', 't', 'e']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.1);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // days slip past unnoticed
    [0, 1, 2, 3].forEach((k) => { const p = seg(t, 0.8 + k * 0.7, 2.6 + k * 0.7); R.xf(this['d' + k], lerp(1240, -160, p), 230, 0.8, p > 0 && p < 1 ? 1 : 0); });
    // the head is elsewhere: a thought drifts off
    const b = eio(seg(t, 4.5, 6.2));
    const bx = lerp(380, 640, b) + Math.sin(t * 1.3) * 10, by = lerp(420, 260, b);
    R.xf(this.bl, bx, by, 1.3 * eob(seg(t, 4.4, 4.9), 1.4), eo(seg(t, 4.4, 4.6)));
    this.str.setAttribute('d', 'M' + 360 + ' 470 C' + (bx - 60) + ' 520 ' + (bx - 30) + ' ' + (by + 90) + ' ' + bx + ' ' + (by + 28));
    this.str.style.opacity = eo(seg(t, 4.6, 4.9));
    this.head.setAttribute('transform', 'rotate(' + (10 * b) + ' 0 30)');
    // half an hour frees up, but there's no energy
    this.half.style.opacity = 0.55 * eio(seg(t, 7.4, 8.0));
    R.setBattery(this.fill, 0.18);
    this.bat.style.opacity = eo(seg(t, 8.3, 8.6)) * (t > 8.6 ? 0.75 + 0.25 * Math.sin(t * 6) : 1);
    this.mouth.setAttribute('d', t > 8.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)) * (1 - eo(seg(t, 4.2, 4.5))));
    R.place(this.h, 640, lerp(172, 160, eo(seg(t, 4.7, 5.2))), eo(seg(t, 4.7, 5.2)));
    R.place(this.t, 700, lerp(682, 670, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)));
    R.place(this.e, 900, lerp(682, 670, eo(seg(t, 8.5, 9.0))), eo(seg(t, 8.5, 9.0)));
  },
});
