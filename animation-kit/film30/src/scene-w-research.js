const { seg, eo, eio, eob, lerp } = kit;
// part 13: mindfulness has been studied, also with Parkinson's — papers deal in beside Ruth; the tension meter (3b) sinks: stress, anxiety, low mood; quality of life
const T = [[11.49, 'מתח', 740, 610], [11.89, 'חרדה', 740, 680], [12.29, 'קשיים במצב הרוח', 700, 750]];
kit.scene('w-research', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<ellipse class="w8-glow" cx="260" cy="640" rx="150" ry="190" style="fill:var(--accent);opacity:0"/>' + R.seated('w8', -240) +
      [0, 1, 2].map((k) => '<g class="w8-p' + k + '">' + R.doc('w8-d' + k) + '</g>').join('') + '<g class="w8-mt">' + R.meter('w8-m') + '</g></svg>' +
      '<div class="tag tag-cool w8-st">התערבויות מבוססות מיינדפולנס נחקרו לאורך השנים</div><div class="tag w8-pd">גם אצל אנשים שחיים עם פרקינסון</div>' +
      T.map((m, k) => '<div class="tag w8-t' + k + '">' + m[1] + '</div>').join('') + '<div class="tag tag-warm w8-ql">ולשפר את איכות החיים</div></div>'));
    Object.assign(this, R.refs(kit, 'w8', ['glow', 'body', 'eyes', 'mouth', 'p0', 'p1', 'p2', 'mt', 'st', 'pd', 't0', 't1', 't2', 'ql']));
    this.fill = kit.stage.querySelector('.w8-m-fill');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.mouth.setAttribute('d', t > 13.8 ? R.mouthHappy : R.mouthNeutral);
    [0, 1, 2].forEach((k) => { const p = eob(seg(t, 2.6 + k * 0.35, 3.1 + k * 0.35), 1.4); R.setG(this['p' + k], 640 + k * 80 + 40 * (1 - p), 330 + k * 24, 0.85 * p, eo(seg(t, 2.6 + k * 0.35, 2.9 + k * 0.35))); });
    // the meter, high, then sinking
    R.setG(this.mt, 950, 850, eob(seg(t, 8.1, 8.6), 1.4), eo(seg(t, 8.1, 8.4)));
    const lv = lerp(0.8, 0.28, eio(seg(t, 11.4, 13.6)));
    this.fill.setAttribute('y', -8 - 274 * lv); this.fill.setAttribute('height', 274 * lv);
    this.glow.style.opacity = 0.18 * eo(seg(t, 13.7, 14.5));
    R.place(this.st, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.pd, 540, lerp(162, 150, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)));
    T.forEach(([a, , x, y], k) => R.place(this['t' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    R.place(this.ql, 540, lerp(972, 960, eo(seg(t, 13.7, 14.2))), eo(seg(t, 13.7, 14.2)));
  },
});
