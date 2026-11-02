const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-prize', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="pp-tr">' + R.trophy('pp-t') +
      '<path class="pp-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round" d="M-110 -140 L110 120 M110 -140 L-110 120"/></g></svg>' +
      R.rcard('pp-card', ['הצלחתי להירגע?', 'עקבתי אחרי ההנחיות?', 'הייתי מרוכזת מספיק?']) +
      '<div class="tag tag-warm pp-dose">אין מינון אחד "נכון"</div><div class="tag tag-cool pp-prize">ואין פרס למי שתרגל הכי הרבה</div></div>'));
    Object.assign(this, R.refs(kit, 'pp', ['tr', 'x', 'dose', 'prize']));
    this.card = kit.stage.querySelector('.pp-card'); this.card.classList.add('struck');
    kit.stage.querySelectorAll('.pp-card .rc-box b').forEach((b) => (b.style.opacity = 0));
  },
  render(t) {
    // the report card comes back, and is struck through
    const c = eob(seg(t, 0.3, 0.9), 1.4);
    R.put(this.card, 640, 300, 0.4 + 0.6 * c, -3, eo(seg(t, 0.3, 0.6)));
    this.card.style.setProperty('--s', eio(seg(t, 2.3, 2.9)));
    R.place(this.dose, 540, lerp(612, 600, eo(seg(t, 2.1, 2.6))), eo(seg(t, 2.1, 2.6)));
    // and no prize for practising the most
    const p = eob(seg(t, 4.5, 5.0), 1.6);
    this.tr.setAttribute('transform', 'translate(210 330) scale(' + p * 1.1 + ')');
    this.x.style.strokeDasharray = eo(seg(t, 5.4, 5.9)) + ' 1'; this.x.style.opacity = t > 5.4 ? 1 : 0;
    R.place(this.prize, 540, lerp(712, 700, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
  },
});
