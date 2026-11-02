const { seg, eo, eio, eob, lerp } = kit;
// was there a click?
kit.scene('m-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m17', -200) + '<g class="m17-bw">' + R.battery('m17-b') + '</g><g class="m17-at">' + R.attn('m17a') + '</g></svg>' + R.pileHtml('m17') +
      '<div class="tag tag-cool m17-p">ללמוד לזהות כשהמתג נדלק</div><div class="tag tag-warm m17-q">ולשאול את עצמנו</div><div class="thought kind sm m17-k">היה כאן קליק?</div></div>'));
    Object.assign(this, R.refs(kit, 'm17', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'at', 'p', 'q', 'k']));
    this.sw = R.swRefs(kit, 'm17-sw'); this.pl = R.pileRefs(kit, 'm17');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.15 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    R.setPile(this.pl, () => 1, 1.16, 0);
    this.at.setAttribute('transform', 'translate(' + R.SW[0] + ' ' + (R.SW[1] - 40) + ') scale(170)'); this.at.style.opacity = 1 - eo(seg(t, 2.6, 3.4));
    this.body.setAttribute('transform', 'translate(0 6) scale(1 ' + kit.breathe(t, 0.014, 3.4) + ')');
    this.head.setAttribute('transform', 'rotate(-12 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    R.put(this.k, 470, lerp(300, 280, eo(seg(t, 0.32, 0.7))), 0.85 + 0.15 * eob(seg(t, 0.32, 0.8), 1.6), -2, eo(seg(t, 0.32, 0.6)));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.q, 540, 112, 1 - eo(seg(t, 0.0, 0.3)));
  },
});
