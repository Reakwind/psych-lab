const { seg, eo, eio, eob, lerp } = kit;
// a pile forms beside her: the physical difficulty and the anxiety, then the frustration and anger the switch added
const DROP = [2.86, 3.52, 5.46, 6.03];
kit.scene('m-pile', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m9', -200) + '<g class="m9-bw">' + R.battery('m9-b') + '</g><g transform="translate(330 702)">' + R.tremor('m9tr') + '</g>' +
      '<rect class="m9-vl" width="1080" height="1080" style="fill:#D96C6C;opacity:.07"/></svg>' + R.pileHtml('m9') +
      '<div class="thought xs m9-c0">מה אם זה יחמיר?</div><div class="thought xs m9-c1">איך אצליח לעבור את היום?</div><div class="count red m9-f">תסכול</div><div class="count red m9-g">כעס</div>' +
      '<div class="tag tag-red m9-p">וברגע זה הוא נדלק</div><div class="tag m9-a">לא רק הקושי הגופני והחרדה</div><div class="tag tag-red m9-b">נוספו גם התסכול והכעס</div></div>'));
    Object.assign(this, R.refs(kit, 'm9', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'c0', 'c1', 'f', 'g', 'p', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm9-sw'); this.tr = kit.stage.querySelector('.m9tr-trem'); this.pl = R.pileRefs(kit, 'm9');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.18);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
    R.setPile(this.pl, (k) => (k < 4 ? seg(t, DROP[k], DROP[k] + 0.45) : 0), 1);
    // the cards and the red words fly into their slabs
    const fly = (a) => eio(seg(t, a - 0.3, a + 0.2));
    const [px1, py1] = R.slabAt(1), [px2, py2] = R.slabAt(2), [px3, py3] = R.slabAt(3);
    R.put(this.c0, lerp(560, px1, fly(DROP[1])), lerp(200, py1, fly(DROP[1])), lerp(1, 0.4, fly(DROP[1])), -2, 1 - fly(DROP[1]));
    R.put(this.c1, lerp(600, px1, fly(DROP[1])), lerp(305, py1, fly(DROP[1])), lerp(1, 0.4, fly(DROP[1])), 2, 1 - fly(DROP[1]));
    R.put(this.f, lerp(500, px2, fly(DROP[2])), lerp(450, py2, fly(DROP[2])), lerp(1, 0.5, fly(DROP[2])), -4, 1 - fly(DROP[2]));
    R.put(this.g, lerp(470, px3, fly(DROP[3])), lerp(560, py3, fly(DROP[3])), lerp(1, 0.5, fly(DROP[3])), 4, 1 - fly(DROP[3]));
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 + 4 * Math.sin(t * 0.9)) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', R.mouthSad);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.5, 0.9))), eo(seg(t, 0.5, 0.9)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.35, 4.7))), eo(seg(t, 4.35, 4.7)));
  },
});
