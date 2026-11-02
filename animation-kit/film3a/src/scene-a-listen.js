const { seg, eo, eio, eob, lerp } = kit;
const DOTS = [[4.3, 500, 640], [4.8, 500, 712], [5.3, 500, 470]];
kit.scene('a-listen', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(500 620) scale(380)">' + R.attn('al') + '</g>' + R.seated('al', 0) +
      DOTS.map((d, k) => '<g class="al-d' + k + '"><circle r="34" class="amber-lt" opacity=".6"/><circle r="15" class="amber"/></g>').join('') + '</svg>' +
      '<div class="tag tag-cool al-cap">עוצרים ומקשיבים פנימה</div><div class="tag tag-warm al-int">דברים מעניינים</div></div>'));
    Object.assign(this, R.refs(kit, 'al', ['body', 'eyes', 'd0', 'd1', 'd2', 'cap', 'int']));
  },
  render(t) {
    this.eyes.setAttribute('transform', t > 0.6 ? 'translate(0 -2) scale(1 .15)' : '');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)));
    // listening inward: small lights in her chest, belly and head
    DOTS.forEach(([a, x, y], k) => { const p = eob(seg(t, a, a + 0.5), 2); this['d' + k].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + p * (1 + 0.08 * Math.sin(t * 3 + k)) + ')'); });
    R.place(this.int, 790, lerp(400, 388, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
