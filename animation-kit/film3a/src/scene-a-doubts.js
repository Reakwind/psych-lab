const { seg, eo, eio, eob, lerp } = kit;
const Q = [[2.2, 'רעד?', 230, 360], [4.0, 'לא נוח?', 440, 250], [7.0, 'להירגע?', 680, 360]];
kit.scene('a-doubts', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('ad', -60) +
      '<g class="ad-tg">' + R.tremor('ad') + '</g></svg>' + Q.map((q, k) => '<div class="tag ad-q' + k + '">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'ad', ['body', 'head', 'eyes', 'mouth', 'tg', 'q0', 'q1', 'q2']));
    this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
  },
  render(t) {
    R.blink(this.eyes, t, 1.6);
    // her doubts, one by one: the tremor, discomfort, not being able to relax
    const tr = eo(seg(t, 2.0, 2.4));
    this.tg.style.opacity = tr;
    this.tg.setAttribute('transform', 'translate(' + (476 + Math.sin(t * 40) * 3 * tr) + ' 712)');
    const shift = Math.sin(Math.PI * 3 * seg(t, 4.0, 4.9)) * 8;
    this.body.setAttribute('transform', 'translate(' + shift + ' 0) scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + (shift * 0.6 + 4 * Math.sin(Math.PI * 2 * seg(t, 7.0, 8.0))) + ' 0 30)');
    Q.forEach(([a, , x, y], k) => { const p = eob(seg(t, a, a + 0.5), 1.8); R.place(this['q' + k], x, y, eo(seg(t, a, a + 0.25))); this['q' + k].style.transform += ' scale(' + p + ')'; });
  },
});
