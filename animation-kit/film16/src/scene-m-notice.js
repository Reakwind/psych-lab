const { seg, eo, eio, eob, lerp } = kit;
// but she can learn to notice when it switches on: her attention lands on it
function base(id) {
  return R.roomSw(id, -200) + '<g class="' + id + '-bw">' + R.battery(id + '-b') + '</g><g transform="translate(330 702)">' + R.tremor(id + 'tr') + '</g>';
}
kit.scene('m-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + base('m16') + '<g class="m16-at">' + R.attn('m16a') + '</g></svg>' + R.pileHtml('m16') +
      '<div class="tag tag-cool m16-a">ללמוד לזהות כשהמתג נדלק</div><div class="tag tag-warm m16-b">ולשאול את עצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'm16', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'at', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm16-sw'); this.tr = kit.stage.querySelector('.m16tr-trem'); this.pl = R.pileRefs(kit, 'm16');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.tn.style.opacity = (1 - eo(seg(t, 1.5, 2.5))) * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    R.setPile(this.pl, () => 1, 1.16, 0);
    const at = eob(seg(t, 2.1, 2.9), 1.3);
    this.at.setAttribute('transform', 'translate(' + R.SW[0] + ' ' + (R.SW[1] - 40) + ') scale(' + Math.max(0.001, 170 * at) + ')'); this.at.style.opacity = eo(seg(t, 2.1, 2.4));
    this.body.setAttribute('transform', 'translate(0 ' + lerp(16, 6, eio(seg(t, 1.5, 2.5))) + ') scale(1 ' + kit.breathe(t, 0.014, 3.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(6, -12, eio(seg(t, 2.1, 2.8))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.5 ? R.mouthO : R.mouthSad);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.29, 2.6))), eo(seg(t, 2.29, 2.6)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 3.72, 4.0))), eo(seg(t, 3.72, 4.0)));
  },
});
