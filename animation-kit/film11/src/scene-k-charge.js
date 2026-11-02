const { seg, eo, eio, eob, lerp } = kit;
const W = [[10.32, 'מה שנעים', 800], [10.92, 'שונה', 540], [12.38, 'נותן לנו כוח', 280]];
kit.scene('k-charge', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k9') + R.pileSvg('k9', 3) + R.seated('k9', 0) + R.deckSvg('k9') + R.sidesSvg('k9', false, true) +
      '<g class="k9-bw">' + R.battery('k9') + '</g><g transform="translate(' + R.FANP[0] + ' ' + R.FANP[1] + ') scale(.85)">' + R.fan('k9-f') + '</g></svg>' +
      W.map((w, k) => '<div class="tag tag-warm k9-t' + k + '">' + w[1] + '</div>').join('') + '<div class="tag k9-a">צדדים שלא תמיד מקבלים מקום ביום עמוס</div></div>'));
    Object.assign(this, R.refs(kit, 'k9', ['body', 'head', 'eyes', 'mouth', 'deck', 'bw', 'fill', 'a']));
    this.sd = R.sidesRefs(kit, 'k9'); this.w = W.map((w, k) => kit.stage.querySelector('.k9-t' + k));
    R.setFan([0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.k9-f-c' + k)), 1);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    this.deck.style.opacity = 0;
    // all five badges bright again; on the table her battery fills: what is pleasant, different, gives strength
    R.SIDES.forEach(([x, y], k) => R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 5, 1 + 0.05 * Math.sin(t * 2 + k)));
    R.setG(this.sd.w[4], R.FUN[0], R.FUN[1] + Math.sin(t * 1.6) * 5, 0.7);
    const b = eob(seg(t, 0.3, 0.9), 1.4);
    this.bw.setAttribute('transform', 'translate(820 596) scale(' + Math.max(0.001, 0.8 * b) + ')');
    R.setBattery(this.fill, 0.25 + 0.15 * eio(seg(t, 1.0, 3.0)) + 0.2 * eio(seg(t, 4.5, 6.5)) + 0.35 * eio(seg(t, 9.8, 12.8)));
    this.head.setAttribute('transform', 'rotate(' + lerp(2, 8, eio(seg(t, 0.4, 1.4))) * (1 - eio(seg(t, 9.0, 10.0))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 4.5, 4.9))), eo(seg(t, 4.5, 4.9)) * (1 - eo(seg(t, 9.9, 10.2))));
    W.forEach(([a, , x], k) => R.place(this.w[k], x, lerp(972, 960, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
