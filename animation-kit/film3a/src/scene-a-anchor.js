const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-anchor', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ak', 760, [975, 760, 480]) +
      '<path class="ink" style="stroke-width:5;stroke-dasharray:10 12;opacity:.6" d="M870 500 V756"/><g transform="translate(870 450)">' + R.tool('ak-b', 1, 50) + '</g>' +
      '<rect class="ak-dip" x="360" y="560" width="200" height="240" rx="40" style="fill:var(--main);opacity:0"/><g class="ak-an">' + R.anchor('ak-a') + '</g></svg>' +
      '<div class="tag ak-low">כשאתם לא במיטבכם</div><div class="tag tag-warm ak-hold">נקודת אחיזה מרגיעה</div><div class="tag tag-cool ak-cap">שווה לנסות בזמנים שונים</div></div>'));
    Object.assign(this, R.refs(kit, 'ak', ['curve', 'dip', 'an', 'low', 'hold', 'cap']));
  },
  render(t) {
    this.curve.style.strokeDasharray = '1 0';
    // a low moment of the day — and practice as something to hold on to there
    this.dip.style.opacity = 0.14 * eo(seg(t, 1.7, 2.3)) * (1 - eo(seg(t, 6.4, 7.0)));
    R.place(this.low, 460, lerp(516, 504, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, 4.5, 4.9))));
    const d = eob(seg(t, 4.7, 5.4), 1.3);
    this.an.setAttribute('transform', 'translate(460 ' + lerp(-120, 610, d) + ') rotate(' + Math.sin(t * 2) * 4 * d + ') scale(.8)');
    R.place(this.hold, 460, lerp(452, 440, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
  },
});
