const { seg, eo, eio, eob, lerp } = kit;
// then more thoughts arrive
const C = [['מה אם לא אסתדר בכוחות עצמי?', 1.6], ['מה אם ירחמו עלי?', 5.45], ['אני לא רוצה להיות מעמסה על כולם', 7.42]];
kit.scene('m-more', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m10', -200) + '<g class="m10-bw">' + R.battery('m10-b') + '</g><g transform="translate(330 702)">' + R.tremor('m10tr') + '</g>' +
      '<rect class="m10-vl" width="1080" height="1080" style="fill:#D96C6C;opacity:.07"/></svg>' + R.pileHtml('m10') +
      C.map((c, k) => '<div class="thought xs m10-c' + k + '">' + c[0] + '</div>').join('') + '<div class="tag m10-p">לא רק הקושי הגופני והחרדה</div><div class="tag tag-red m10-q">נוספו גם התסכול והכעס</div></div>'));
    Object.assign(this, R.refs(kit, 'm10', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'p', 'q']));
    this.sw = R.swRefs(kit, 'm10-sw'); this.tr = kit.stage.querySelector('.m10tr-trem'); this.pl = R.pileRefs(kit, 'm10'); this.c = C.map((c, k) => kit.stage.querySelector('.m10-c' + k));
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.18);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
    R.setPile(this.pl, (k) => (k < 4 ? 1 : 0), 1);
    C.forEach(([w, a], k) => R.put(this.c[k], 530 + (k % 2) * 30, lerp(120, 100, eo(seg(t, a, a + 0.4))) + k * 105, 0.85 + 0.15 * eob(seg(t, a, a + 0.5), 1.5), k % 2 ? 2 : -2, eo(seg(t, a, a + 0.3))));
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 3 * Math.sin(t * 0.9)) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', R.mouthSad);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.q, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
  },
});
