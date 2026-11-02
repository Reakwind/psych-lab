const { seg, eo, eio, eob, lerp } = kit;
const Q = [[10.6, 'סקרנות', 830, 70, 1, -40], [11.2, 'יציבות', 610, 70, -1, -10], [11.9, 'אי מאמץ', 400, 70, 1, 20], [12.5, 'חמלה עצמית', 180, 70, -1, 50]];
kit.scene('m-grow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('mg', -60) +
      '<path class="mg-stem" pathLength="1" d="M134 640 C130 560 150 500 140 440" style="fill:none;stroke:var(--main);stroke-width:9;stroke-linecap:round"/>' +
      Q.map((q, k) => '<g class="mg-l' + k + '">' + R.leaf('mg-lf' + k, q[4]) + '</g>').join('') + R.beam('mgb') + '</svg>' +
      '<div class="tag tag-cool mg-top">הנשימה והגוף תמיד נמצאים איתנו</div><div class="tag mg-train">חוזרים שוב ושוב · מאמנים את תשומת הלב</div>' +
      Q.map((q, k) => '<div class="tag tag-warm mg-t' + k + '">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mg', ['body', 'head', 'eyes', 'mouth', 'stem', 'top', 'train', 'l0', 'l1', 'l2', 'l3', 't0', 't1', 't2', 't3']));
    this.b = R.beamRefs(kit, 'mgb');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    // the beam keeps coming back to her breath and body
    const drift = Math.max(0, Math.sin(t * 0.9)) * (1 - eo(seg(t, 9.6, 10.4)));
    R.setBeam(this.b, 440 + 120 * drift, 640 - 160 * drift, 170, 1, 1);
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 6.8, 7.2))));
    R.place(this.train, 540, lerp(84, 70, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)) * (1 - eo(seg(t, 10.2, 10.5))));
    // the plant by the window grows: curiosity, steadiness, ease, self-compassion
    this.stem.style.strokeDasharray = eo(seg(t, 10.3, 13.2)) + ' 1'; this.stem.style.opacity = t > 10.3 ? 1 : 0;
    Q.forEach(([a, , x, y, s, dy], k) => {
      const p = eob(seg(t, a, a + 0.6), 1.6), ly = lerp(620, 450, k / 3);
      this['l' + k].setAttribute('transform', 'translate(' + (136 + 4 * s) + ' ' + ly + ') scale(' + p + ')');
      R.place(this['t' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)));
    });
    this.mouth.setAttribute('d', t > 12 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
