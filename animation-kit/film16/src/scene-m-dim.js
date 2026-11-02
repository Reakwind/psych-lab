const { seg, eo, eio, eob, lerp } = kit;
// not a big change: the switch becomes a dimmer and she turns it down a touch; a small move toward supporting herself
kit.scene('m-dim', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="m21-zm">' + R.roomSw('m21', -200) + '<g class="m21-bw">' + R.battery('m21-b') + '</g>' +
      '<circle class="m21-gl" cx="300" cy="640" r="230" style="fill:var(--accent);opacity:.16"/><g class="m21-hw">' + R.heart('m21-h') + '</g></g></svg>' + R.pileHtml('m21') +
      '<div class="tag m21-p">מה יכול לעזור לי להתמודד עם הרגע הזה קצת יותר בקלות?</div><div class="tag tag-cool m21-a">לא מחפשים שינוי גדול</div><div class="tag tag-warm m21-b">לרכך את המאבק בחמישה אחוזים</div>' +
      '<div class="tag tag-warm m21-pc">5%</div><div class="tag m21-c">תנועה קטנה מהניסיון להיפטר ממה שאנחנו מרגישים</div><div class="tag tag-cool m21-d">לכיוון של תמיכה בעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'm21', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'gl', 'hw', 'p', 'a', 'b', 'pc', 'c', 'd']));
    this.sw = R.swRefs(kit, 'm21-sw'); this.pl = R.pileRefs(kit, 'm21');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    const dim = eio(seg(t, 2.9, 3.8)), turn = eio(seg(t, 4.4, 5.4));
    R.setSwitch(this.sw, 1, dim, lerp(1, 0.9, turn));
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], lerp(0.04, 0.12, eio(seg(t, 11.0, 12.5))));
    // the top slab ("more tension") lifts off as the struggle softens
    const lift = eio(seg(t, 5.4, 6.6));
    R.setPile(this.pl, (k) => (k === 7 ? 1 - lift : 1), 1.16, 0);
    this.gl.style.opacity = 0.16 + 0.1 * eo(seg(t, 10.8, 11.6)) * (0.8 + 0.2 * Math.sin(t * 1.5));
    R.setG(this.hw, 300, 640, 0.42 * eob(seg(t, 10.82, 11.4), 1.6), eo(seg(t, 10.82, 11.1)));
    this.body.setAttribute('transform', 'translate(0 ' + 2 * (1 - turn) + ') scale(1 ' + kit.breathe(t, 0.016, 4.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-10 + 14 * eio(seg(t, 6.5, 7.5))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 5.3 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 2.7, 3.1))), eo(seg(t, 2.7, 3.1)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.pc, R.SW[0], lerp(662, 650, eo(seg(t, 5.07, 5.4))), eo(seg(t, 5.07, 5.4)));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 6.72, 7.1))), eo(seg(t, 6.72, 7.1)));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 10.82, 11.2))), eo(seg(t, 10.82, 11.2)));
  },
});
