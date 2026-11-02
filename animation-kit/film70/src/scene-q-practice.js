const { seg, eo, eio, eob, lerp } = kit;
// the practices help us notice when the body holds tension and let a little go; the more we practise, the easier and more natural it gets
const P11 = 6.63, CY = [P11 + 0.6, P11 + 2.9, P11 + 5.1];
kit.scene('q-practice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qp', 0) +
      '<g transform="translate(730 300)">' + R.calendar('qp-cal') + '<g class="qp-pg"><rect x="-56" y="-50" width="112" height="104" rx="12" style="fill:color-mix(in srgb, var(--ground) 50%, white);stroke:var(--second);stroke-width:5"/><rect class="amber" x="-56" y="-50" width="112" height="28" rx="10"/></g>' +
      [0, 1, 2].map((k) => '<circle class="qp-dot' + k + '" cx="' + (-36 + k * 36) + '" cy="80" r="12" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>').join('') + '</g>' +
      '<g class="qp-sc" opacity="0">' + R.scan('qp-scan') + '</g></svg>' +
      '<div class="tag tag-warm qp-a">לזהות כשהגוף מחזיק מתח</div><div class="tag tag-warm qp-b">ולשחרר ממנו קצת</div>' +
      '<div class="tag tag-cool qp-c">המוח והגוף לומדים</div><div class="tag tag-warm qp-d">יותר בקלות ובטבעיות</div><div class="tag tag-red qp-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'qp', ['body', 'head', 'eyes', 'mouth', 'tn', 'pf', 'mt-fill', 'pg', 'sc', 'a', 'b', 'c', 'd', 'ml']));
    this.dot = [0, 1, 2].map((k) => kit.stage.querySelector('.qp-dot' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.pf.style.opacity = 0;
    // first round: the scan finds it, she lets some go
    let tense = eo(seg(t, 0.2, 0.8)) * (1 - eio(seg(t, 4.5, 5.6))), sc = seg(t, 2.5, 3.7), level = 0.6 - 0.16 * eio(seg(t, 4.5, 5.6));
    // then day after day: it comes back a little, the scan is quicker, it melts sooner
    CY.forEach((c, k) => {
      const dur = [1.6, 1.2, 0.9][k], up = 0.75 - 0.18 * k;
      tense = Math.max(tense, up * eo(seg(t, c + 0.1, c + 0.4)) * (1 - eio(seg(t, c + 0.5, c + 0.5 + dur))));
      if (t > c + 0.2 && t < c + 0.2 + dur * 0.8) sc = seg(t, c + 0.2, c + 0.2 + dur * 0.8);
      level += 0.09 * (1 - 0.3 * k) * Math.sin(Math.PI * seg(t, c, c + 0.6 + dur));
      // the calendar's page turns, and one more practice day is marked
      const f = seg(t, c - 0.4, c + 0.2);
      if (f > 0 && f < 1) this.pg.setAttribute('transform', 'translate(0 -50) scale(1 ' + Math.cos(Math.PI * f / 2) + ') translate(0 50)');
      this.dot[k].style.fill = t > c ? 'var(--accent)' : 'var(--ground)';
    });
    if (!CY.some((c) => t > c - 0.4 && t < c + 0.2)) this.pg.setAttribute('transform', '');
    const glow = Math.sin(Math.PI * seg(t, 2.8, 4.0));
    this.tn.style.opacity = tense * (0.55 + 0.45 * Math.abs(Math.sin(t * 6))) * (1 + 0.6 * glow);
    this.sc.setAttribute('opacity', sc > 0 && sc < 1 ? Math.sin(Math.PI * sc) : 0); this.sc.setAttribute('transform', 'translate(500 ' + lerp(420, 860, sc) + ')');
    this.body.setAttribute('transform', 'translate(0 ' + 5 * tense + ') scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    this.head.setAttribute('transform', 'translate(0 ' + 4 * tense + ')');
    this.mouth.setAttribute('d', tense > 0.4 ? R.mouthFlat : R.mouthHappy);
    R.setMeter(this['mt-fill'], level);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.77, 3.2))), o(2.77, P11 + 0.2));
    R.place(this.b, 540, lerp(164, 150, eo(seg(t, 4.53, 4.95))), o(4.53, P11 + 0.2));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, P11 + 1.69, P11 + 2.1))), o(P11 + 1.69, 99));
    R.place(this.d, 540, lerp(164, 150, eo(seg(t, P11 + 5.93, P11 + 6.35))), o(P11 + 5.93, 99));
    R.place(this.ml, 920, 886, 1);
  },
});
