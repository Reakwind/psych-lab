const { seg, eo, eio, eob, lerp } = kit;
const NAMES = [4.4, 5.0, 5.6, 6.2];
// where the stones are laid out to be named, and where their labels sit (staggered so none overlap)
const SPOTS = [[540, 980], [690, 980], [840, 980], [990, 980]];
const LABEL_Y = [880, 806, 880, 806];
kit.scene('set-down', {
  init(kit) {
    const w = (k) => '<g class="set-down-s' + k + '">' + R.weight() + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('set-down') +
      '<g class="set-down-bag">' + R.packBehind('set-down').replace('class="set-down-pack"', 'class="set-down-pk"') + '</g>' +
      '<g transform="translate(360 970)"><g class="set-down-body">' + R.ruth('set-down', 'stand') + '</g><g class="set-down-strapsg">' + R.straps('set-down') + '</g></g>' +
      w(0) + w(1) + w(2) + w(3) +
      '</svg><div class="tag tag-cool set-down-cap">נותנים לזה מקום</div>' +
      '<div class="tag set-down-n0">מצב הרוח</div><div class="tag set-down-n1">הקשב</div><div class="tag set-down-n2">המוטיבציה</div><div class="tag set-down-n3">החשיבה</div><div class="tag tag-warm set-down-learn">לומדים לזהות</div></div>'));
    Object.assign(this, R.refs(kit, 'set-down', ['bag', 'body', 'strapsg', 'head', 'eyes', 'mouth', 's0', 's1', 's2', 's3', 'cap', 'n0', 'n1', 'n2', 'n3', 'learn']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.3);
    // she slips the bag off and sets it down beside her
    const off = eio(seg(t, 0.6, 1.9));
    const bx = lerp(360, R.BAG[0], off), by = lerp(970, R.BAG[1], off) - Math.sin(off * Math.PI) * 120;
    this.bag.setAttribute('transform', 'translate(' + bx + ' ' + by + ') rotate(' + lerp(0, 6, off) + ') scale(' + lerp(1, 0.8, off) + ')');
    this.strapsg.style.opacity = 1 - eo(seg(t, 0.6, 1.0));
    this.body.setAttribute('transform', 'translate(0 ' + (-6 * eio(seg(t, 1.8, 2.6))) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 2.0, 2.8)) + 10 * eio(seg(t, 4.2, 5.0)) - 10 * eio(seg(t, 8.6, 9.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    // one by one the stones come out of the bag and are laid out where she can see them;
    // once named, they gather into a small pile beside the bag
    const gather = eio(seg(t, 8.6, 9.7));
    [this.s0, this.s1, this.s2, this.s3].forEach((el, k) => {
      const a = 2.0 + k * 0.4, p = eio(seg(t, a, a + 0.7));
      let x = lerp(R.BAG[0], SPOTS[k][0], p), y = lerp(840, SPOTS[k][1], p) - Math.sin(p * Math.PI) * 420;
      x = lerp(x, R.PILE[k][0], gather); y = lerp(y, R.PILE[k][1], gather) - Math.sin(gather * Math.PI) * 60;
      el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + lerp(lerp(0.5, 1, p), 0.6, gather) + ')');
      el.style.opacity = eo(seg(t, a, a + 0.15));
    });
    [this.n0, this.n1, this.n2, this.n3].forEach((el, k) => R.place(el, SPOTS[k][0], lerp(LABEL_Y[k] + 12, LABEL_Y[k], eo(seg(t, NAMES[k], NAMES[k] + 0.4))), eo(seg(t, NAMES[k], NAMES[k] + 0.4)) * (1 - eo(seg(t, 8.4, 8.8)))));
    R.place(this.cap, 540, lerp(110, 96, eo(seg(t, 0.4, 1.0))), eo(seg(t, 0.4, 1.0)));
    R.place(this.learn, 765, lerp(196, 184, eo(seg(t, 7.0, 7.6))), eo(seg(t, 7.0, 7.6)) * (1 - eo(seg(t, 9.2, 9.7))));
  },
});
