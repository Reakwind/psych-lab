const { seg, eo, eio, eob, lerp } = kit;
// back in the room: the switch's light is on
kit.scene('m-on', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m8', -200) + '<g class="m8-bw">' + R.battery('m8-b') + '</g><g transform="translate(330 702)">' + R.tremor('m8tr') + '</g>' +
      '<rect class="m8-vl" width="1080" height="1080" style="fill:#D96C6C;opacity:0"/></svg>' +
      '<div class="thought xs m8-c0">מה אם זה יחמיר?</div><div class="thought xs m8-c1">איך אצליח לעבור את היום?</div><div class="count red m8-f">תסכול</div><div class="count red m8-g">כעס</div>' +
      '<div class="tag tag-red m8-a">זה היה מתג המאבק שלכם</div><div class="tag tag-red m8-b">וברגע זה הוא נדלק</div></div>'));
    Object.assign(this, R.refs(kit, 'm8', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'vl', 'c0', 'c1', 'f', 'g', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm8-sw'); this.tr = kit.stage.querySelector('.m8tr-trem');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.vl.style.opacity = 0.07 * eo(seg(t, 0.0, 0.6));
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.18);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 - 10 * eio(seg(t, 0.3, 1.0))) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', R.mouthO);
    R.put(this.c0, 560, 200, 1, -2, 1); R.put(this.c1, 600, 305, 1, 2, 1);
    R.put(this.f, 500, 450, 1, -4, 1); R.put(this.g, 470, 560, 1, 4, 1);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 2.35, 2.7))), eo(seg(t, 2.35, 2.7)));
  },
});
