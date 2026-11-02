const { seg, eo, eio, eob, lerp } = kit;
const W = [[1.56, 3.7, 'שיחה קצת אחרת עם עצמנו'], [3.93, 99, 'חפיסת קלפים עם שאלות מכל מיני סוגים']];
kit.scene('k-deck', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k6') + R.pileSvg('k6', 3) + R.seated('k6', 0) + R.deckSvg('k6') + R.sidesSvg('k6', true, false) +
      '<g transform="translate(' + R.FANP[0] + ' ' + R.FANP[1] + ') scale(.85)">' + R.fan('k6-f') + '</g></svg>' + W.map((w, k) => '<div class="tag tag-warm k6-a' + k + '">' + w[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'k6', ['body', 'head', 'eyes', 'mouth', 'deck', 'f']));
    this.sd = R.sidesRefs(kit, 'k6'); this.a = W.map((w, k) => kit.stage.querySelector('.k6-a' + k));
    this.fc = [0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.k6-f-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'translate(0 6) scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the badges stay buried; Ruth takes the deck from the table and fans it open: cards of all kinds
    R.SIDES.forEach(([x, y], k) => { R.setG(this.sd.w[k], x, y); this.sd.l[k].forEach((sl) => R.slab(sl, 1, 0)); this.sd.g[k].style.opacity = 0.8; this.sd.s[k].style.opacity = 0.4; });
    const m = eio(seg(t, 0.4, 1.5));
    this.deck.setAttribute('transform', 'translate(' + lerp(0, R.FANP[0] - 784, m) + ' ' + (lerp(0, R.FANP[1] - 40 - 650, m) - Math.sin(Math.PI * m) * 60) + ')');
    const open = eob(seg(t, 3.9, 4.7), 1.3), wig = seg(t, 6.3, 7.3);
    this.deck.style.opacity = 1 - eo(seg(t, 3.9, 4.1));
    this.f.style.opacity = eo(seg(t, 3.85, 4.0));
    R.setFan(this.fc, open);
    if (wig > 0 && wig < 1) this.fc.forEach((c, k) => c.setAttribute('transform', 'rotate(' + ((k - 2.5) * 13 + Math.sin(wig * Math.PI * 4 + k) * 4 * (1 - wig)) + ')'));
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 8, eio(seg(t, 0.3, 1.2))) * (1 - eio(seg(t, 1.6, 2.4))) + ' 0 30) translate(0 4)');
    this.mouth.setAttribute('d', t > 4.2 ? R.mouthHappy : R.mouthNeutral);
    W.forEach(([a, b], k) => R.place(this.a[k], 540, lerp(972, 960, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b, b + 0.3)))));
  },
});
