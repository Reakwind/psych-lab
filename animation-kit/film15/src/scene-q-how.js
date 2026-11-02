const { seg, eo, eio, eob, lerp } = kit;
// the box draws side by side on Ariel's words: in (up the right), hold with air, out (down the left), hold without air; Ruth breathes along
const SIDE = [1.96, 4.75, 7.37, 9.83];
const LBL = [['שאיפה', 975, 418], ['עצירה', 730, 214], ['נשיפה', 485, 418], ['עצירה', 730, 628]];
kit.scene('q-how', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q2', -230, false) + R.box('q2b') +
      '<g class="q2-ld">' + R.land('q2p', { sun: true }) + '</g>' + R.cbadge('q2-bd', 'relax', 64) + '</svg>' +
      LBL.map((l, k) => '<div class="tag ' + (k % 2 ? 'tag-warm' : 'tag-cool') + ' q2-l' + k + '">' + l[0] + '</div>').join('') +
      '<div class="tag tag-cool q2-t">מפגש 15 · נשימת קופסה</div><div class="tag q2-a">בקצב אחיד לשלוש ספירות</div><div class="tag tag-warm q2-c">עם אוויר בבטן</div><div class="tag tag-warm q2-d">בלי אוויר בבטן</div></div>'));
    Object.assign(this, R.refs(kit, 'q2', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'ld', 'bd', 't', 'a', 'c', 'd']));
    this.b = R.boxRefs(kit, 'q2b'); this.l = LBL.map((l, k) => kit.stage.querySelector('.q2-l' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // from the path: the land fades to Ruth's room while the badge opens into the box
    const open = eio(seg(t, 0.1, 1.1));
    this.ld.style.opacity = 1 - eio(seg(t, 0.0, 0.8));
    R.setG(this.bd, 730, 450, lerp(1.3, 0.6, open), 1 - open);
    const draw = SIDE.map((a) => eio(seg(t, a - 0.1, a + 2.0)));
    let dot = null; SIDE.forEach((a, k) => { if (t >= a - 0.1) dot = k + draw[k]; });
    if (t > 12.3) dot = 4;
    const full = R.fill(t, SIDE.map((a, k) => [a - 0.1, k]), 2.2);
    R.setBox(this.b, { pane: open, guide: open, draw, dot, dotA: dot == null ? 0 : 1, lit: (n) => (draw[Math.floor(n / 3)] >= (n % 3) / 3 + 0.02 ? 1 : 0), ring: open * (0.45 + 0.5 * full) });
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.035 * full) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-5 + 3 * full) + ' 0 30)');
    this.mouth.setAttribute('d', t > 11 ? R.mouthHappy : R.mouthNeutral);
    LBL.forEach(([w, x, y], k) => R.place(this.l[k], x, lerp(y + 12, y, eo(seg(t, SIDE[k], SIDE[k] + 0.4))), eo(seg(t, SIDE[k], SIDE[k] + 0.4))));
    R.place(this.t, 540, 40, 1 - eo(seg(t, 0.8, 1.2)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.4, 1.8))), eo(seg(t, 1.4, 1.8)));
    R.place(this.c, 730, lerp(124, 112, eo(seg(t, 5.6, 6.0))), eo(seg(t, 5.6, 6.0)) * (1 - eo(seg(t, 9.4, 9.8))));
    R.place(this.d, 730, lerp(124, 112, eo(seg(t, 10.7, 11.1))), eo(seg(t, 10.7, 11.1)));
  },
});
