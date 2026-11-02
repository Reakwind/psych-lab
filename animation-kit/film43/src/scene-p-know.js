const { seg, eo, eio, eob, lerp } = kit;
const CHS = [[8.6, 820, 'heart', 'רגש'], [9.0, 540, 'body', 'גוף'], [9.4, 260, 'mind', 'מחשבות']];
kit.scene('p-know', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="pw-ar" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1" d="M540 350 V450 M510 420 L540 450 L570 420"/>' +
      CHS.map((c, k) => '<g class="pw-c' + k + '">' + R.badge('pw-bd' + k, R.CH[c[2]]) + '</g>').join('') + '</svg>' +
      '<div class="thought pw-k1">לדעת שזו חוויה נעימה</div><div class="thought kind pw-k2">לשים לב איך אני חווה אותה</div>' +
      CHS.map((c, k) => '<div class="tag pw-t' + k + '">' + c[3] + '</div>').join('') + '<div class="tag tag-cool pw-a">כשעוצרים וחוקרים את הרגע הנעים</div></div>'));
    Object.assign(this, R.refs(kit, 'pw', ['ar', 'c0', 'c1', 'c2', 'k1', 'k2', 't0', 't1', 't2', 'a']));
  },
  render(t) {
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
    // from knowing it was pleasant to noticing how it is felt
    R.put(this.k1, 540, 270, eob(seg(t, 4.3, 4.8), 1.4), 0, eo(seg(t, 4.3, 4.5)) * (1 - 0.45 * eio(seg(t, 6.6, 7.2))));
    this.ar.style.strokeDashoffset = 1 - eio(seg(t, 5.8, 6.5));
    R.put(this.k2, 540, 540, eob(seg(t, 6.5, 7.0), 1.4), 0, eo(seg(t, 6.5, 6.7)));
    CHS.forEach(([a, x], k) => {
      R.xf(this['c' + k], x, 790 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a, a + 0.5), 1.8), eo(seg(t, a, a + 0.2)));
      R.place(this['t' + k], x, lerp(892, 880, eo(seg(t, a + 0.2, a + 0.6))), eo(seg(t, a + 0.2, a + 0.6)));
    });
  },
});
