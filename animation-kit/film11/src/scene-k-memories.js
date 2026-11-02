const { seg, eo, eio, eob, lerp } = kit;
// the light of a card turns to the buried badges: memories, then people (places join memories)
const U = [[2, 6.95], [0, 7.79]];
const N = [['זיכרונות', 440, 290, 6.95], ['אנשים', 870, 316, 7.79], ['מקומות', 440, 356, 8.55]];
kit.scene('k-memories', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k7') + R.pileSvg('k7', 3) + R.seated('k7', 0) + R.deckSvg('k7') + R.sidesSvg('k7', true, false) +
      R.lamp('k7-aw') + '<g transform="translate(' + R.FANP[0] + ' ' + R.FANP[1] + ') scale(.85)">' + R.fan('k7-f') + '</g></svg>' +
      N.map((w, k) => '<div class="tag tag-warm k7-n' + k + '">' + w[0] + '</div>').join('') + '<div class="tag k7-a">להפנות את תשומת הלב</div></div>'));
    Object.assign(this, R.refs(kit, 'k7', ['body', 'head', 'eyes', 'mouth', 'deck', 'aw', 'a']));
    this.sd = R.sidesRefs(kit, 'k7'); this.n = N.map((w, k) => kit.stage.querySelector('.k7-n' + k));
    R.setFan([0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.k7-f-c' + k)), 1); this.top = kit.stage.querySelector('.k7-f-c2');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'translate(0 ' + lerp(6, 0, eio(seg(t, 6.9, 8.0))) + ') scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.deck.style.opacity = 0;
    const lift = {}; U.forEach(([k, a]) => { lift[k] = seg(t, a - 0.1, a + 0.6); });
    R.SIDES.forEach(([x, y], k) => {
      const q = lift[k] || 0;
      R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 5 * q, 1 + 0.15 * Math.sin(Math.PI * q));
      this.sd.l[k].forEach((sl, j) => R.slab(sl, 1, eio(seg(q, j * 0.15, 0.6 + j * 0.15)), j % 2 ? 1 : -1));
      this.sd.g[k].style.opacity = 0.8 * (1 - eo(q)); this.sd.s[k].style.opacity = lerp(0.4, 1, eo(q));
    });
    // the attention circle: born from the fanned cards, it swings to memories, then to people
    const born = eob(seg(t, 2.3, 3.0), 1.3), g1 = eio(seg(t, 5.6, 6.9)), g2 = eio(seg(t, 7.2, 7.9));
    const ax = lerp(lerp(R.FANP[0], 440, g1), 870, g2), ay = lerp(lerp(560, 200, g1), 230, g2) + Math.sin(t * 2) * 4;
    this.aw.setAttribute('transform', 'translate(' + ax + ' ' + ay + ') scale(' + Math.max(0.001, born) + ')'); this.aw.style.opacity = eo(seg(t, 2.3, 2.6));
    this.top.setAttribute('transform', 'rotate(' + (-0.5 * 13) + ') translate(0 ' + (-30 * Math.sin(Math.PI * seg(t, 2.0, 3.2))) + ')');
    N.forEach(([w, x, y, a], k) => R.place(this.n[k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    this.head.setAttribute('transform', 'rotate(' + (t < 5.6 ? 0 : t < 7.3 ? -6 * g1 : lerp(-6, 10, g2)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 7.0 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 2.38, 2.8))), eo(seg(t, 2.38, 2.8)));
  },
});
