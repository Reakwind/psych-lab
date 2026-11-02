const { seg, eo, eio, eob, lerp } = kit;
// slowly, then fast, the thoughts join the pile; it grows heavier, takes up more room and drains her battery
const IN = [[0.6, 1.9], [2.03, 2.5], [2.4, 2.9]];
kit.scene('m-grow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m11', -200) + '<g class="m11-bw">' + R.battery('m11-b') + '</g><g transform="translate(330 702)">' + R.tremor('m11tr') + '</g>' +
      '<g class="m11-fw">' + R.feel('m11-fl') + '</g><rect class="m11-vl" width="1080" height="1080" style="fill:#D96C6C;opacity:.07"/></svg>' + R.pileHtml('m11') +
      ['מה אם לא אסתדר בכוחות עצמי?', 'מה אם ירחמו עלי?', 'אני לא רוצה להיות מעמסה על כולם'].map((c, k) => '<div class="thought xs m11-c' + k + '">' + c + '</div>').join('') +
      '<div class="tag m11-a">משהו שהתחיל כקושי מסויים</div><div class="tag tag-red m11-b">הולך ונהיה מטריד יותר</div><div class="tag m11-c">תופס יותר מקום במחשבות</div><div class="tag tag-red m11-d">דורש יותר מאמץ ואנרגיה</div></div>'));
    Object.assign(this, R.refs(kit, 'm11', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'fw', 'a', 'b', 'c', 'd']));
    this.sw = R.swRefs(kit, 'm11-sw'); this.tr = kit.stage.querySelector('.m11-tr-trem') || kit.stage.querySelector('.m11tr-trem'); this.pl = R.pileRefs(kit, 'm11');
    this.cd = [0, 1, 2].map((k) => kit.stage.querySelector('.m11-c' + k));
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)');
    R.setBattery(this['b-fill'], lerp(0.18, 0.04, eio(seg(t, 11.3, 12.4))));
    this.bw.style.opacity = t > 12.4 ? 0.75 + 0.25 * Math.abs(Math.cos(t * 6)) : 1;
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
    const big = eio(seg(t, 5.9, 7.2)), s = 1 + 0.1 * big, wob = 3 * big * Math.sin(t * 3);
    R.setPile(this.pl, (k) => (k < 4 ? 1 : k < 7 ? seg(t, IN[k - 4][1] - 0.35, IN[k - 4][1]) : 0), s, wob);
    // each card shrinks and flies into its slab
    this.cd.forEach((c, k) => { const [a, b] = IN[k], f = eio(seg(t, a, b)), [px, py] = R.slabAt(k + 4, s); R.put(c, lerp(530 + (k % 2) * 30, px, f), lerp(100 + k * 105, py, f), lerp(1, 0.4, f), k % 2 ? 2 : -2, 1 - eo(seg(t, b - 0.25, b))); });
    // more room in her thoughts: a grey cloud swells over her head
    const cl = eio(seg(t, 9.2, 10.4));
    R.setG(this.fw, 470, 300, 0.4 + 0.75 * cl, cl);
    this.body.setAttribute('transform', 'translate(0 ' + (10 + 6 * big) + ') scale(1 ' + kit.breathe(t, 0.016, 2.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 3 * Math.sin(t * 0.9) + 6 * cl) + ' 0 30) translate(0 ' + (6 + 4 * big) + ')');
    this.mouth.setAttribute('d', R.mouthSad);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.0, 3.4))), eo(seg(t, 3.0, 3.4)) * (1 - eo(seg(t, 8.9, 9.2))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.99, 6.3))), eo(seg(t, 5.99, 6.3)) * (1 - eo(seg(t, 8.9, 9.2))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 9.31, 9.7))), eo(seg(t, 9.31, 9.7)));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 11.38, 11.7))), eo(seg(t, 11.38, 11.7)));
  },
});
