const { seg, eo, eio, eob, lerp } = kit;
const T = [[4.0, 'פחות מתח וחרדה'], [6.6, 'ויסות רגשות'], [7.7, 'רווחה נפשית לאורך זמן']];
kit.scene('m-research', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('mr', -120) +
      '<g transform="translate(720 840) scale(.85)">' + R.meter('mr-m') + '</g></svg>' +
      '<div class="tag tag-cool mr-top">מחקרים מראים</div>' + T.map((x, k) => '<div class="tag ' + (k ? 'tag-warm ' : '') + 'mr-t' + k + '">' + x[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mr', ['body', 'eyes', 'mouth', 'top', 't0', 't1', 't2']));
    this.fill = kit.stage.querySelector('.mr-m-fill');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    // tension goes down; emotions are easier to steady; well-being over time
    const lv = lerp(0.75, 0.25, eio(seg(t, 4.0, 5.6)));
    this.fill.setAttribute('y', -282 + 274 * (1 - lv)); this.fill.setAttribute('height', 274 * lv);
    T.forEach(([a], k) => R.place(this['t' + k], 540, lerp(188 + k * 92, 176 + k * 92, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
    this.mouth.setAttribute('d', t > 4.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
