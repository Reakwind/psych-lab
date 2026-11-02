const { seg, eo, eio, eob, lerp } = kit;
// close on Ruth in her armchair: out of nowhere her brow is furrowed and her jaw clenched
kit.scene('q-brow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="qb-cam" transform="translate(540 500) scale(1.9) translate(-500 -540)">' + R.roomSeat('qb', 0) + '</g></svg>' +
      '<div class="tag tag-cool qb-title">מפגש 70 · להרגיע את הגוף</div><div class="tag tag-red qb-a">המצח מכווץ</div><div class="tag tag-red qb-b">הלסתות מהודקות</div></div>'));
    Object.assign(this, R.refs(kit, 'qb', ['body', 'head', 'eyes', 'mouth', 'brow', 'tb', 'jaw', 'tn', 'pf', 'title', 'a', 'b']));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // she sits, glancing about; then the brow pulls together, then the jaw sets
    const brow = eo(seg(t, 3.9, 4.5)), jaw = eo(seg(t, 4.9, 5.4));
    this.brow.setAttribute('opacity', brow);
    this.tb.setAttribute('opacity', brow * (0.6 + 0.4 * Math.abs(Math.sin(t * 5))));
    this.jaw.setAttribute('opacity', jaw * (0.6 + 0.4 * Math.abs(Math.sin(t * 5 + 1))));
    this.mouth.setAttribute('d', jaw > 0.5 ? R.mouthTight : R.mouthNeutral);
    const glance = Math.sin(t * 0.9) * (1 - brow);
    this.head.setAttribute('transform', 'rotate(' + (3 * glance) + ' 0 30) translate(0 ' + 4 * jaw + ')');
    R.look(this.eyes, t, 0.7, 4 * glance, 0);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)) * (1 - eo(seg(t, 3.0, 3.5))));
    R.place(this.a, 250, lerp(262, 250, eo(seg(t, 4.05, 4.5))), eo(seg(t, 4.05, 4.5)));
    R.place(this.b, 820, lerp(642, 630, eo(seg(t, 5.0, 5.45))), eo(seg(t, 5.0, 5.45)));
  },
});
