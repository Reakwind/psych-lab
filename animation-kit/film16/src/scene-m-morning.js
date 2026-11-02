const { seg, eo, eio, eob, lerp } = kit;
// an important day on the calendar; Ruth wakes tired, low on energy, her symptoms stronger than usual
kit.scene('m-morning', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m4', -200) +
      '<g class="m4-cw" transform="translate(560 300) scale(1.3)">' + R.calendar('m4-cal') + '<g transform="translate(0 12) scale(.32)">' + R.star('m4-st') + '</g></g>' +
      '<g class="m4-bw">' + R.battery('m4-b') + '</g><g transform="translate(330 702)">' + R.tremor('m4tr') + '</g></svg>' +
      '<div class="tag tag-cool m4-a">נניח שיש לכם אירוע חשוב</div><div class="tag tag-warm m4-b">רוצים להיות במיטבכם</div>' +
      '<div class="tag m4-c">עייפים</div><div class="tag m4-d">חסרי אנרגיה</div><div class="tag m4-e">סימפטומים חזקים מהרגיל</div></div>'));
    Object.assign(this, R.refs(kit, 'm4', ['body', 'eyes', 'head', 'mouth', 'tn', 'cw', 'bw', 'b-fill', 'a', 'b', 'c', 'd', 'e']));
    this.sw = R.swRefs(kit, 'm4-sw'); this.tr = kit.stage.querySelector('.m4tr-trem');
  },
  render(t) {
    R.setSwitch(this.sw, 0); this.tn.style.opacity = 0;
    const tired = eio(seg(t, 6.7, 7.4));
    if (tired > 0.5) this.eyes.setAttribute('transform', 'translate(0 -1) scale(1 ' + (0.45 + 0.1 * Math.sin(t * 1.3)) + ')'); else R.blink(this.eyes, t, 0.6);
    this.cw.style.opacity = eo(seg(t, 1.0, 1.5)); this.cw.setAttribute('transform', 'translate(560 300) scale(' + 1.3 * (1 + 0.15 * Math.sin(Math.PI * seg(t, 1.2, 1.9)) + 0.08 * Math.sin(Math.PI * seg(t, 3.4, 4.0))) + ')');
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); this.bw.style.opacity = eo(seg(t, 7.4, 7.8));
    R.setBattery(this['b-fill'], lerp(0.9, 0.18, eio(seg(t, 7.8, 9.0))));
    this.tr.style.opacity = eo(seg(t, 8.7, 9.0)); this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) * eo(seg(t, 8.7, 9.0)) + ' 0)');
    this.body.setAttribute('transform', 'translate(0 ' + 10 * tired + ') scale(1 ' + kit.breathe(t, 0.012, 4.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-4 + 10 * tired) + ' 0 30) translate(0 ' + 6 * tired + ')');
    this.mouth.setAttribute('d', t > 6.86 && t < 7.9 ? R.mouthYawn : tired > 0.5 ? R.mouthSad : R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.b, 560, lerp(422, 410, eo(seg(t, 3.46, 3.8))), eo(seg(t, 3.46, 3.8)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 6.86, 7.2))), eo(seg(t, 6.86, 7.2)));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 7.81, 8.1))), eo(seg(t, 7.81, 8.1)));
    R.place(this.e, 540, lerp(196, 184, eo(seg(t, 8.75, 9.1))), eo(seg(t, 8.75, 9.1)));
  },
});
