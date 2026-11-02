const { seg, eo, eio, eob, lerp } = kit;
const FACE = '<circle class="skin" r="56"/><circle class="ink" style="stroke-width:4" cx="-18" cy="-8" r="13"/><circle class="ink" style="stroke-width:4" cx="18" cy="-8" r="13"/><path class="ink kt-fm" style="stroke-width:5" d="M-16 22 Q0 34 16 22"/>';
const HAND = '<ellipse class="skin" cx="-20" cy="6" rx="34" ry="26"/><g transform="translate(-10 10) scale(.8)">' + R.tremor('kt') + '</g>';
const G = [[7.0, 870, '<g transform="scale(.5)">' + R.battery('kt') + '</g>', 'אנרגיה'], [8.2, 650, FACE, 'מצב רוח'], [8.8, 430, HAND, 'סימפטומים'], [10.2, 210, '<g transform="scale(.9)">' + R.calendar('kt-cal') + '</g>', 'מה שקורה']];
kit.scene('k-today', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g class="kt-c0">' + R.dayCard('kt-d0', 'sun') + '</g><g class="kt-c1">' + R.dayCard('kt-d1', 'cloud') + '</g>' +
      '<g class="kt-w">' + R.warm('kt-wt', 'heart') + '</g><g class="kt-w2">' + R.warm('kt-wu', 'heart') + '</g>' +
      '<text class="kt-qm" x="408" y="452" text-anchor="middle" style="font:700 80px var(--sans);fill:var(--second);opacity:0">?</text>' +
      G.map((g, k) => '<g class="kt-g' + k + '">' + g[2] + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm kt-l0">היום</div><div class="tag kt-l1">מחר</div>' + G.map((g, k) => '<div class="tag kt-t' + k + '">' + g[3] + '</div>').join('') +
      '<div class="tag tag-cool kt-a">מה שעוזר היום לא בהכרח יתאים מחר</div></div>'));
    Object.assign(this, R.refs(kit, 'kt', ['c0', 'c1', 'w', 'w2', 'qm', 'g0', 'g1', 'g2', 'g3', 'l0', 'l1', 't0', 't1', 't2', 't3', 'a', 'fill', 'fm', 'trem']));
  },
  render(t) {
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.7, 2.2))), eo(seg(t, 1.7, 2.2)));
    // today and tomorrow: what helped today may not fit tomorrow
    R.xf(this.c0, 760, 330, 1.3 * eob(seg(t, 2.1, 2.7), 1.5), eo(seg(t, 2.1, 2.3)));
    R.xf(this.c1, 320, 330, 1.3 * eob(seg(t, 3.9, 4.5), 1.5), eo(seg(t, 3.9, 4.1)));
    R.place(this.l0, 760, 510, eo(seg(t, 2.4, 2.8))); R.place(this.l1, 320, 510, eo(seg(t, 4.2, 4.6)));
    R.xf(this.w, 760, 420 + Math.sin(t * 2) * 5, 0.9 * eob(seg(t, 2.6, 3.1), 1.6), eo(seg(t, 2.6, 2.8)));
    const m = eio(seg(t, 4.4, 5.4));
    R.xf(this.w2, lerp(760, 320, m), 420 - Math.sin(Math.PI * m) * 120, 0.9, t > 2.6 && t < 4.4 ? 0 : (t >= 4.4 ? 1 - 0.65 * eio(seg(t, 5.2, 5.8)) : 0));
    this.qm.style.opacity = eo(seg(t, 5.6, 6.0));
    this.qm.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.4) * 4 + ')');
    // it can change with energy, mood, symptoms and the day itself
    G.forEach(([a, x], k) => {
      R.xf(this['g' + k], x, 730 + Math.sin(t * 1.6 + k) * 4, 1.45 * eob(seg(t, a - 0.2, a + 0.3), 1.7), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], x, lerp(872, 860, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    R.setBattery(this.fill, 0.55 + 0.3 * Math.sin(t * 1.3));
    this.fm.setAttribute('d', Math.sin(t * 1.1) > 0 ? 'M-16 22 Q0 34 16 22' : 'M-16 28 Q0 20 16 28');
    this.trem.setAttribute('transform', 'translate(' + Math.sin(t * 40) * 3 + ' 0)');
  },
});
