const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-worst', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('tx', -170) +
      '<path class="tx-leap" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:10;stroke-linecap:round" d="M980 280 C1060 340 1060 420 990 470 M970 448 L990 470 L1018 460"/></svg>' +
      '<div class="thought sm tx-c1">"לא חזרו אליי עם תוצאות הבדיקה."</div><div class="thought sm heavy tx-c2">"בטח משהו לא בסדר."</div><div class="tag tag-warm tx-cap">קופץ ישר לתרחיש הכי גרוע</div></div>'));
    Object.assign(this, R.refs(kit, 'tx', ['body', 'head', 'eyes', 'mouth', 'leap', 'c1', 'c2', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.7, 3.2))), eo(seg(t, 2.7, 3.2)));
    // one fact, then a leap straight to the worst case
    R.put(this.c1, 760, 260, eob(seg(t, 4.0, 4.5), 1.4), 0, eo(seg(t, 4.0, 4.2)));
    this.leap.style.strokeDasharray = eo(seg(t, 6.2, 6.7)) + ' 1'; this.leap.style.opacity = t > 6.2 ? 1 : 0;
    R.put(this.c2, 760, 520, eob(seg(t, 6.5, 7.0), 1.6), 0, eo(seg(t, 6.5, 6.7)));
    this.mouth.setAttribute('d', t > 6.6 ? 'M-10 32 Q2 22 14 32' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 4.0, 4.6))) + ' 0 30) translate(0 ' + 8 * eio(seg(t, 6.6, 7.4)) + ')');
  },
});