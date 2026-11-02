const { seg, eo, eio, eob, lerp } = kit;
kit.scene('h-try', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="ht-open" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>' +
      R.seated('ht', -160) + '<g class="ht-vg">' + R.voice('ht-v') + '</g></svg><div class="tag tag-warm ht-a">בואו ננסה</div></div>'));
    Object.assign(this, R.refs(kit, 'ht', ['open', 'body', 'head', 'eyes', 'mouth', 'vg', 'a']));
    this.v = R.refs(kit, 'ht-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-6 2 Q10 16 26 2');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9); R.blink(this.v.eyes, t, 1.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.open.setAttribute('opacity', eio(seg(t, 0.2, 1.6)));
    R.xf(this.vg, 600, 380 + Math.sin(t * 2.2) * 8, 1.3, 1);
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 0.3, 1.0))) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
  },
});
