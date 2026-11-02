const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-kind', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kk', -160) +
      '<g transform="translate(800 400)"><g class="kk-vg">' + R.voice('kk-v') + '</g></g></svg>' +
      '<div class="tag kk-a">פחות ביקורת</div><div class="tag tag-warm kk-b">יותר הבנה וחמלה</div></div>'));
    Object.assign(this, R.refs(kit, 'kk', ['body', 'head', 'eyes', 'mouth', 'vg', 'a', 'b']));
    this.v = R.refs(kit, 'kk-v', ['grey', 'warm', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.8); R.blink(this.v.eyes, t, 2.1);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.vg.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.2) * 8 + ') scale(' + 1.7 * eob(seg(t, 0.3, 0.9), 1.5) + ')');
    // the inner voice: a little less criticism, more understanding and compassion
    const w = eio(seg(t, 4.0, 5.0));
    this.v.warm.setAttribute('opacity', w); this.v.grey.setAttribute('opacity', 1 - w);
    this.v.mouth.setAttribute('d', w > 0.5 ? 'M-6 2 Q10 16 26 2' : 'M-2 10 Q10 2 22 10');
    this.mouth.setAttribute('d', w > 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 28 Q2 26 14 28');
    this.head.setAttribute('transform', 'rotate(' + (6 * w - 4 * (1 - w) * eio(seg(t, 2.6, 3.2))) + ' 0 30)');
    R.place(this.a, 800, lerp(212, 200, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)));
    R.place(this.b, 800, lerp(588, 576, eo(seg(t, 4.2, 4.7))), eo(seg(t, 4.2, 4.7)));
  },
});
