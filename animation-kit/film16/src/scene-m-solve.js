const { seg, eo, eio, eob, lerp } = kit;
// on her path: a problem that can be solved; effort to change it helps
kit.scene('m-solve', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('m12p', { sun: true }) + '<g class="m12-bk">' + R.pathBlock('m12-blk') + '</g>' +
      '<g class="m12-w" transform="translate(260 1000) scale(.85)">' + R.armsFree(R.ruth('m12', 'stand'), 'm12') + '</g></svg>' +
      '<div class="tag tag-cool m12-a">כשיש בעיה שאפשר לפתור</div><div class="tag tag-warm m12-b">המאמץ לשנות אותה יכול לעזור</div></div>'));
    Object.assign(this, R.refs(kit, 'm12', ['bk', 'eyes', 'head', 'mouth', 'armR', 'a', 'b']));
    this.tops = R.PATH.map((p, k) => kit.stage.querySelector('.m12p-st' + k + '-top'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // she leans into the block and slides it off the stones; the path ahead lights
    const push = eio(seg(t, 2.9, 3.3)) * (1 - eio(seg(t, 4.8, 5.3))), slide = eio(seg(t, 3.3, 4.7));
    this.armR.setAttribute('transform', 'rotate(' + (-88 * push + 3 * Math.sin(t * 14) * push * (1 - slide)) + ' 52 -326)');
    this.bk.setAttribute('transform', 'translate(' + lerp(470, 880, slide) + ' ' + lerp(905, 960, slide) + ') rotate(' + 14 * slide + ') scale(' + lerp(0.9, 0.8, slide) + ')');
    this.bk.style.opacity = 1 - 0.35 * eo(seg(t, 4.6, 5.4));
    this.tops.forEach((top, j) => R.litStone(top, eo(seg(t, 4.9 + j * 0.12, 5.3 + j * 0.12))));
    this.head.setAttribute('transform', 'rotate(' + (t > 4.9 ? -6 : 0) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.9 ? R.mouthHappy : push > 0.5 ? R.mouthFlat : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 3.14, 3.5))), eo(seg(t, 3.14, 3.5)));
  },
});
