const { seg, eo, eio, eob, lerp } = kit;
// frustration and anger at her body join in
kit.scene('m-anger', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m6', -200) + '<g class="m6-bw">' + R.battery('m6-b') + '</g><g transform="translate(330 702)">' + R.tremor('m6tr') + '</g></svg>' +
      '<div class="tag tag-red m6-p">יכולה להתעורר חרדה</div><div class="thought xs m6-c0">מה אם זה יחמיר?</div><div class="thought xs m6-c1">איך אצליח לעבור את היום?</div>' +
      '<div class="count red m6-f">תסכול</div><div class="count red m6-g">כעס</div><div class="tag tag-red m6-a">על הגוף, על כך שהוא לא משתף פעולה</div></div>'));
    Object.assign(this, R.refs(kit, 'm6', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'p', 'c0', 'c1', 'f', 'g', 'a']));
    this.sw = R.swRefs(kit, 'm6-sw'); this.tr = kit.stage.querySelector('.m6tr-trem');
  },
  render(t) {
    R.setSwitch(this.sw, 0);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.18);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    const mad = eo(seg(t, 2.0, 2.6));
    this.tn.style.opacity = mad * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 5 * Math.sin(t * 7) * eo(seg(t, 3.1, 3.5)) * (1 - eo(seg(t, 4.6, 5.2)))) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', mad > 0.5 ? R.mouthFlat : R.mouthSad);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 2.6, 3.0)));
    R.put(this.c0, 560, 200, 1, -2, 1); R.put(this.c1, 600, 305, 1, 2, 1);
    R.put(this.f, 500, 450, 0.6 + 0.4 * eob(seg(t, 2.08, 2.5), 1.8), -4, eo(seg(t, 2.08, 2.3)));
    R.put(this.g, 470, 560, 0.6 + 0.4 * eob(seg(t, 2.62, 3.0), 1.8), 4, eo(seg(t, 2.62, 2.8)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.1, 3.5))), eo(seg(t, 3.1, 3.5)));
  },
});
