const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-meet', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pm') + '<g transform="translate(640 540)">' + R.blanket('pm-b') + '</g><g class="pm-ring">' + R.attn('pm') + '</g>' +
      '<g class="pm-pf">' + R.perfect('pm') + '<path class="pm-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round" d="M-110 -130 L110 130 M110 -130 L-110 130"/></g></svg>' +
      '<div class="tag pm-no">לא מנסים לייצר חוויה מסוימת</div><div class="tag tag-cool pm-meet">לפגוש את מה שכבר קורה</div><div class="tag tag-warm pm-soft">קצת יותר רכה · פחות שיפוטית</div></div>'));
    Object.assign(this, R.refs(kit, 'pm', ['eyes', 'mouth', 'ring', 'pf', 'x', 'no', 'meet', 'soft']));
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    // not producing a particular experience: the picture-perfect meditator is crossed out again
    const p = eob(seg(t, 0.6, 1.2), 1.5), gone = eio(seg(t, 4.4, 5.0));
    this.pf.setAttribute('transform', 'translate(' + lerp(870, 1300, gone) + ' 190) scale(' + p * 0.62 + ') rotate(4)');
    this.x.style.strokeDasharray = eo(seg(t, 2.3, 2.8)) + ' 1'; this.x.style.opacity = t > 2.3 ? 1 : 0;
    R.place(this.no, 400, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)) * (1 - eo(seg(t, 4.4, 4.8))));
    // meeting what's already here, a little more softly: the circle glows warmer
    const soft = eio(seg(t, 7.6, 9.0));
    this.ring.setAttribute('transform', 'translate(500 540) scale(' + (470 + 10 * Math.sin(t * 1.5) * soft) + ')');
    this.ring.style.opacity = 0.8 + 0.6 * soft;
    R.place(this.meet, 540, lerp(84, 70, eo(seg(t, 4.9, 5.4))), eo(seg(t, 4.9, 5.4)));
    R.place(this.soft, 540, lerp(940, 928, eo(seg(t, 7.8, 8.3))), eo(seg(t, 7.8, 8.3)));
  },
});
