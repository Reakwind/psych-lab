const { seg, eo, eio, eob, lerp } = kit;
// no command makes them go; the fight adds one more slab, takes more room, and leaves less for what matters
const N = [['לחץ', 2.07], ['פחד', 2.47], ['תסכול', 2.87], ['עייפות', 3.43], ['רעד', 4.3]];
kit.scene('m-cost', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m14', -200) + '<g class="m14-bw">' + R.battery('m14-b') + '</g><g transform="translate(330 702)">' + R.tremor('m14tr') + '</g>' +
      '<g class="m14-hw">' + R.heart('m14-h') + '</g><rect class="m14-vl" width="1080" height="1080" style="fill:#D96C6C;opacity:.07"/></svg>' + R.pileHtml('m14') +
      N.map((n, k) => '<div class="tag m14-n' + k + '">' + n[0] + '</div>').join('') +
      '<div class="tag tag-red m14-a">אי אפשר פשוט לפקוד</div><div class="tag tag-red m14-b">המאבק בהם יכול להוסיף עוד מתח</div><div class="tag m14-c">פחות משאבים להפנות למה שחשוב לנו</div><div class="tag tag-warm m14-d">מה שחשוב לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'm14', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'hw', 'a', 'b', 'c', 'd']));
    this.sw = R.swRefs(kit, 'm14-sw'); this.tr = kit.stage.querySelector('.m14tr-trem'); this.pl = R.pileRefs(kit, 'm14'); this.n = N.map((n, k) => kit.stage.querySelector('.m14-n' + k));
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    this.bw.style.opacity = 0.75 + 0.25 * Math.abs(Math.cos(t * (t > 11.2 ? 9 : 6)));
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
    // the names she tries to order away just stay put, and shake a little
    N.forEach(([w, a], k) => R.place(this.n[k], [880, 740, 600, 460, 320][k] + 4 * Math.sin(t * 13 + k) * eo(seg(t, a + 0.3, a + 0.6)), lerp(232, 220, eo(seg(t, a, a + 0.3))), eo(seg(t, a, a + 0.3)) * (1 - eo(seg(t, 6.6, 7.0)))));
    const add = seg(t, 7.89, 8.4), wide = eio(seg(t, 9.0, 10.0));
    R.setPile(this.pl, (k) => (k < 7 ? 1 : add), 1.1 + 0.06 * wide, 3 * Math.sin(t * 3) * (0.6 + wide));
    // what matters: the heart, small beside a pile that keeps growing
    const h = eob(seg(t, 12.0, 12.6), 1.4), shrink = eio(seg(t, 12.9, 13.9));
    R.setG(this.hw, 560, 380, Math.max(0.001, h * lerp(1.0, 0.65, shrink)), eo(seg(t, 12.0, 12.3)));
    this.body.setAttribute('transform', 'translate(0 16) scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (t < 5 ? 3 * Math.sin(t * 5) : 6) + ' 0 30) translate(0 10)');
    this.mouth.setAttribute('d', t > 1.3 && t < 4.6 ? R.mouthO : R.mouthSad);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.36, 1.7))), eo(seg(t, 1.36, 1.7)) * (1 - eo(seg(t, 6.6, 7.0))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 7.0, 7.4))), eo(seg(t, 7.0, 7.4)) * (1 - eo(seg(t, 11.0, 11.3))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 11.23, 11.6))), eo(seg(t, 11.23, 11.6)));
    R.place(this.d, 560, lerp(462, 450, eo(seg(t, 12.74, 13.1))), eo(seg(t, 12.74, 13.1)));
  },
});
