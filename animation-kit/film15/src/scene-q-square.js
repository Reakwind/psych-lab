const { seg, eo, eio, eob, lerp } = kit;
const LBL = [['שאיפה', 975, 418], ['עצירה', 730, 214], ['נשיפה', 485, 418], ['עצירה', 730, 628]];
kit.scene('q-square', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q3', -230, false) + R.box('q3b') + '</svg>' +
      LBL.map((l, k) => '<div class="tag ' + (k % 2 ? 'tag-warm' : 'tag-cool') + ' q3-l' + k + '">' + l[0] + '</div>').join('') +
      '<div class="tag q3-p">בקצב אחיד לשלוש ספירות</div><div class="tag tag-cool q3-a">ארבעה חלקים שווים</div><div class="tag tag-warm q3-b">כמו ארבע צלעות של ריבוע</div></div>'));
    Object.assign(this, R.refs(kit, 'q3', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'p', 'a', 'b']));
    this.x = R.boxRefs(kit, 'q3b'); this.l = LBL.map((l, k) => kit.stage.querySelector('.q3-l' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // the four sides light one after another, each as long as the others; then the whole square glows
    const beat = (k) => Math.sin(Math.PI * seg(t, 1.5 + k * 0.55, 2.2 + k * 0.55));
    const all = Math.sin(Math.PI * seg(t, 4.3, 5.6));
    R.setBox(this.x, { dot: 4 + 0.0, lit: (n) => beat(Math.floor(n / 3)) > 0.3 || all > 0.3 ? 1 : 0, ring: 0.45 + 0.04 * Math.sin(t * 1.6) });
    this.x.s.forEach((p, k) => { p.style.strokeWidth = 14 + 8 * Math.max(beat(k), all); });
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-5 + 4 * eio(seg(t, 4.3, 5.0))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    LBL.forEach(([w, x, y], k) => R.place(this.l[k], x, y, 1));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 1.0, 1.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.5, 1.9))), eo(seg(t, 1.5, 1.9)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.3, 4.7))), eo(seg(t, 4.3, 4.7)));
  },
});
