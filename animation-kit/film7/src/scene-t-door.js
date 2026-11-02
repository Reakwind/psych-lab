const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-door', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="td-open" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/></g>' +
      R.seated('td', -120) + '</svg><div class="tag tag-cool td-a">מרווח קטן</div><div class="tag tag-warm td-b">אפשרות להגיב קצת אחרת</div></div>'));
    Object.assign(this, R.refs(kit, 'td', ['open', 'body', 'head', 'eyes', 'mouth', 'a', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 4) + ')');
    // a small gap — and a door opens a little
    this.open.setAttribute('opacity', eio(seg(t, 1.0, 2.8)));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.6, 2.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)));
  },
});