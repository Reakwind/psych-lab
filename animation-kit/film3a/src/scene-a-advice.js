const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-advice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('av', -140) +
      '<g transform="translate(820 962) scale(1.05)">' + R.ariel('av-a', 'stand') + '</g></svg><div class="tag tag-warm av-cap">זמן להתנסות וללמוד</div></div>'));
    Object.assign(this, R.refs(kit, 'av', ['body', 'head', 'eyes', 'mouth', 'cap']));
    this.ae = kit.stage.querySelector('.av-a-eyes'); this.ah = kit.stage.querySelector('.av-a-head');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ae, t, 2.1);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(8 0 30)');
    this.ah.setAttribute('transform', 'rotate(' + (-6 + 3 * Math.sin(t * 1.6)) + ' 0 30)');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
  },
});
