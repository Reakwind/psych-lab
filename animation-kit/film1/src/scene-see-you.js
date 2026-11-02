const { seg, eo, eio, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('see-you', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('see-you', { sun: true, sunX: 760, sunY: 420 }) +
      '<g class="see-you-sign"><rect class="wood" x="-5" y="-90" width="10" height="90"/><rect class="wood-lt" x="-46" y="-120" width="92" height="40" rx="8"/></g>' +
      '<g class="see-you-n"><g class="see-you-na">' + R.niraBack('see-you-n1', false) + '</g><g class="see-you-nb">' + R.niraBack('see-you-n2', true) + '</g></g>' +
      '<g class="see-you-r"><g class="see-you-ra">' + R.ruthBack('see-you-r1', false) + '</g><g class="see-you-rb">' + R.ruthBack('see-you-r2', true) + '</g></g>' +
      '</svg><div class="tag tag-cool see-you-together">ממשיכים יחד</div><div class="tag tag-warm see-you-steps">צעד אחר צעד</div><div class="tag see-you-tomorrow">ניפגש מחר</div></div>'));
    Object.assign(this, R.refs(kit, 'see-you', ['sun', 'sign', 'n', 'na', 'nb', 'r', 'ra', 'rb', 'together', 'steps', 'tomorrow']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.see-you-st' + i + '-top'));
  },
  render(t) {
    // the sun comes up; Ruth and Nira set off up the path side by side
    this.sun.setAttribute('cy', lerp(470, 300, eio(seg(t, 0, 6.1))));
    const k = lerp(0.2, 2.2, eio(seg(t, 0.3, 6.1)));
    const step = Math.floor(t * 2) % 2;
    this.ra.style.opacity = step ? 0 : 1; this.rb.style.opacity = step ? 1 : 0;
    this.na.style.opacity = step ? 1 : 0; this.nb.style.opacity = step ? 0 : 1;
    let [x, y, r] = onPath(k); let s = 0.66 * r / 130;
    this.r.setAttribute('transform', 'translate(' + (x - 70 * s * 1.4) + ' ' + y + ') scale(' + s + ')');
    [x, y, r] = onPath(k + 0.05); s = 0.66 * r / 130;
    this.n.setAttribute('transform', 'translate(' + (x + 70 * s * 1.4) + ' ' + y + ') scale(' + s + ')');
    this.tops.forEach((el, i) => { if (i <= 3) el.style.fill = 'var(--accent)'; });
    // tomorrow's stone carries a small sign
    const [sx, sy, sr] = R.PATH[4], sp = eo(seg(t, 3.6, 4.2));
    this.sign.setAttribute('transform', 'translate(' + (sx + sr * 0.9) + ' ' + sy + ') scale(' + (sp * sr / 34) + ')');
    R.place(this.together, 540, lerp(110, 96, eo(seg(t, 0.2, 0.8))), eo(seg(t, 0.2, 0.8)) * (1 - eo(seg(t, 2.0, 2.4))));
    R.place(this.steps, 540, lerp(110, 96, eo(seg(t, 2.2, 2.8))), eo(seg(t, 2.2, 2.8)));
    R.place(this.tomorrow, sx + sr * 0.9, lerp(sy - 300, sy - 312, eo(seg(t, 3.8, 4.4))), eo(seg(t, 3.8, 4.4)));
  },
});
