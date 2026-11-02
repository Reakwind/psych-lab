const { seg, eo, eio, eob, lerp } = kit;
// each try: comes out of the bag, sits in Ruth's hands, glows or dims, goes to "more" or "less"
const TRIES = [[1, 2.4, 'more'], [3, 4.0, 'more'], [0, 5.6, 'less']];
kit.scene('try-them', {
  init(kit) {
    let tools = '';
    for (const [k] of TRIES) tools += '<g class="try-them-k' + k + '"><circle class="try-them-g' + k + ' amber-lt" r="84" opacity="0"/>' + R.tool('try-them-b' + k, k, 48) + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('try-them') +
      R.bagDown('try-them-p') + R.pile('try-them') +
      '<g transform="translate(360 964)">' + R.ruth('try-them-r', 'stand') + '</g><g transform="translate(860 958)">' + R.nira('try-them-n', 'stand') + '</g>' + tools +
      '</svg><div class="tag tag-cool try-them-not">לא תמיד מתחברים מיד</div><div class="tag tag-warm try-them-all">מנסים הכול</div>' +
      '<div class="tag tag-cool try-them-more">עובד לי יותר</div><div class="tag try-them-less">עובד לי פחות</div></div>'));
    Object.assign(this, R.refs(kit, 'try-them', ['k0', 'k1', 'k3', 'g0', 'g1', 'g3', 'not', 'all', 'more', 'less']));
    this.r = R.refs(kit, 'try-them-r', ['eyes', 'head', 'mouth']); this.n = R.refs(kit, 'try-them-n', ['eyes', 'head']);
  },
  render(t) {
    R.blink(this.r.eyes, t, 1.4); R.blink(this.n.eyes, t, 0.6);
    const kept = { more: 0, less: 0 };
    for (const [k, a, where] of TRIES) {
      const out = eio(seg(t, a, a + 0.6)), hold = eio(seg(t, a + 0.6, a + 1.2)), go = eio(seg(t, a + 1.8, a + 2.4));
      const slot = kept[where]++;
      const dest = where === 'more' ? [560 + slot * 110, 560] : [150, 560];
      let x = lerp(R.BAG[0], 300, out), y = lerp(760, 600, out) - Math.sin(out * Math.PI) * 120;
      x = lerp(x, 360, hold); y = lerp(y, 720, hold);
      x = lerp(x, dest[0], go); y = lerp(y, dest[1], go) - Math.sin(go * Math.PI) * 80;
      this['k' + k].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (eob(seg(t, a, a + 0.4), 1.6) * (where === 'less' ? lerp(1, 0.8, go) : 1)) + ')');
      this['k' + k].style.opacity = where === 'less' ? lerp(1, 0.5, go) : 1;
      const lit = seg(t, a + 1.2, a + 1.6) * (1 - seg(t, a + 2.4, a + 3.0));
      this['g' + k].style.opacity = where === 'more' ? 0.7 * lit : 0;
    }
    this.r.head.setAttribute('transform', 'rotate(' + (6 * Math.sin(t * 1.4) * eo(seg(t, 2.4, 3.0))) + ' 0 30)');
    this.r.mouth.setAttribute('d', t > 3.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.not, 540, lerp(110, 96, eo(seg(t, 0.2, 0.8))), eo(seg(t, 0.2, 0.8)) * (1 - eo(seg(t, 2.2, 2.6))));
    R.place(this.all, 540, lerp(110, 96, eo(seg(t, 2.4, 3.0))), eo(seg(t, 2.4, 3.0)));
    R.place(this.more, 615, lerp(470, 458, eo(seg(t, 6.2, 6.8))), eo(seg(t, 6.2, 6.8)));
    R.place(this.less, 150, lerp(470, 458, eo(seg(t, 7.7, 8.2))), eo(seg(t, 7.7, 8.2)));
  },
});
