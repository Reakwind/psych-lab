const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x1', -120) + '<g class="x1-scw">' + R.scan('x1-sc') + '</g></svg>' +
      '<div class="tag tag-cool x1-t">מפגש 14 · מתח, חרדה והרגעת הגוף</div><div class="tag tag-warm x1-a">מה שקורה בגוף</div><div class="tag tag-red x1-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x1', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'scw', 't', 'a', 'ml']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // Ruth in her armchair, the tension meter beside her; a soft line scans down her body
    const sc = seg(t, 1.8, 3.8);
    this.scw.setAttribute('transform', 'translate(380 ' + lerp(420, 870, eio(sc)) + ')'); this.scw.style.opacity = sc > 0 && sc < 1 ? Math.min(1, Math.sin(Math.PI * sc) * 2) : 0;
    R.setMeter(this['mt-fill'], 0.2 + 0.15 * eio(seg(t, 2.8, 3.6)));
    this.head.setAttribute('transform', 'rotate(' + 4 * eio(seg(t, 1.8, 2.6)) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.t, 540, lerp(54, 40, eo(seg(t, 0.1, 0.5))), eo(seg(t, 0.1, 0.5)));
    R.place(this.a, 380, lerp(342, 330, eo(seg(t, 1.97, 2.4))), eo(seg(t, 1.97, 2.4)));
    R.place(this.ml, 920, 886, eo(seg(t, 0.4, 0.8)));
  },
});
