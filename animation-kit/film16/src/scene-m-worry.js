const { seg, eo, eio, eob, lerp } = kit;
// anxiety rises as two questions
kit.scene('m-worry', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m5', -200) + '<g class="m5-bw">' + R.battery('m5-b') + '</g><g transform="translate(330 702)">' + R.tremor('m5tr') + '</g></svg>' +
      '<div class="tag m5-p">סימפטומים חזקים מהרגיל</div><div class="tag tag-red m5-a">יכולה להתעורר חרדה</div>' +
      '<div class="thought xs m5-c0">מה אם זה יחמיר?</div><div class="thought xs m5-c1">איך אצליח לעבור את היום?</div></div>'));
    Object.assign(this, R.refs(kit, 'm5', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'p', 'a', 'c0', 'c1']));
    this.sw = R.swRefs(kit, 'm5-sw'); this.tr = kit.stage.querySelector('.m5tr-trem');
  },
  render(t) {
    R.setSwitch(this.sw, 0); this.tn.style.opacity = 0;
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.18);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + kit.breathe(t, 0.016, 2.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 - 4 * eio(seg(t, 2.0, 2.8))) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', R.mouthSad);
    R.place(this.p, 540, 184, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.13, 2.5))), eo(seg(t, 2.13, 2.5)));
    R.put(this.c0, 560, lerp(220, 200, eo(seg(t, 3.3, 3.7))), 0.85 + 0.15 * eob(seg(t, 3.3, 3.8), 1.5), -2, eo(seg(t, 3.3, 3.6)));
    R.put(this.c1, 600, lerp(325, 305, eo(seg(t, 5.15, 5.55))), 0.85 + 0.15 * eob(seg(t, 5.15, 5.65), 1.5), 2, eo(seg(t, 5.15, 5.45)));
  },
});
