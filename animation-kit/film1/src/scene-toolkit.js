const { seg, eo, eio, eob, lerp } = kit;
const AT = [1.0, 4.4, 8.0, 11.5, 14.2];
const SPOT = [[200, 250], [370, 170], [540, 140], [710, 170], [880, 250]];
const NAMES = ['להגיב אחרת למחשבות', 'להרגיע את הגוף', 'להיות נוכחים ברגע', 'חמלה עצמית', 'להישאר מחוברים'];
kit.scene('toolkit', {
  init(kit) {
    let tools = '', tags = '';
    for (let k = 0; k < 5; k++) { tools += '<g class="toolkit-k' + k + '">' + R.tool('toolkit-b' + k, k, 62) + '</g>'; tags += '<div class="tag tag-warm toolkit-t' + k + '">' + NAMES[k] + '</div>'; }
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('toolkit') +
      '<g class="toolkit-bag">' + R.bagDown('toolkit-p') + '</g>' + R.pile('toolkit') +
      '<g transform="translate(360 964)">' + R.ruth('toolkit-r', 'stand') + '</g><g transform="translate(860 958)">' + R.nira('toolkit-n', 'stand') + '</g>' +
      tools +
      '</svg>' + tags + '</div>'));
    Object.assign(this, R.refs(kit, 'toolkit', ['bag', 'pile', 'k0', 'k1', 'k2', 'k3', 'k4', 't0', 't1', 't2', 't3', 't4']));
    this.r = R.refs(kit, 'toolkit-r', ['eyes', 'head', 'mouth']); this.n = R.refs(kit, 'toolkit-n', ['eyes', 'head']);
    this.r.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.r.eyes, t, 0.4); R.blink(this.n.eyes, t, 2.7);
    this.r.head.setAttribute('transform', 'rotate(' + (-6 * Math.sin(t * 0.6)) + ' 0 30)');
    this.pile.style.opacity = 1 - 0.5 * eo(seg(t, 0.4, 1.4));
    const ks = [this.k0, this.k1, this.k2, this.k3, this.k4], ts = [this.t0, this.t1, this.t2, this.t3, this.t4];
    let bagHop = 0;
    for (let k = 0; k < 5; k++) {
      const a = AT[k], p = eob(seg(t, a, a + 0.6), 1.8);
      // each tool arrives on its words, floats in the arc, and at the end drops into the bag
      const into = eio(seg(t, 15.9 + k * 0.4, 16.5 + k * 0.4));
      const x = lerp(SPOT[k][0], R.BAG[0], into), y = lerp(SPOT[k][1] + Math.sin(t * 1.6 + k) * 6, 760, into) - Math.sin(into * Math.PI) * 80;
      ks[k].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (p * lerp(1, 0.35, into)) + ')');
      ks[k].style.opacity = into > 0.95 ? 0 : 1;
      const next = k < 4 ? AT[k + 1] : 15.6;
      R.place(ts[k], 540, lerp(380, 368, eo(seg(t, a + 0.2, a + 0.7))), eo(seg(t, a + 0.2, a + 0.7)) * (1 - eo(seg(t, next - 0.2, next + 0.2))));
      const hit = Math.max(0, t - (16.5 + k * 0.4));
      if (t > 16.5 + k * 0.4) bagHop += Math.sin(hit * 14) * Math.exp(-hit * 8) * 8;
    }
    this.bag.setAttribute('transform', 'translate(0 ' + (-bagHop) + ')');
  },
});
