const { seg, eo, eio, eob, lerp } = kit;
// next: what we love to do (interests), what matters (values), and something fun
const U = [[1, 1.64], [3, 3.25]];
const N = [['מה שאנחנו אוהבים לעשות', 650, 60, 1.64], ['מה שחשוב לנו', 230, 90, 3.25], ['משהו כיפי', 760, 336, 6.5]];
const OLD = [['זיכרונות', 440, 290], ['אנשים', 870, 316], ['מקומות', 440, 356]];
kit.scene('k-love', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k8') + R.pileSvg('k8', 3) + R.seated('k8', 0) + R.deckSvg('k8') + R.sidesSvg('k8', true, true) +
      R.lamp('k8-aw') + '<g transform="translate(' + R.FANP[0] + ' ' + R.FANP[1] + ') scale(.85)">' + R.fan('k8-f') + '</g></svg>' +
      N.map((w, k) => '<div class="tag tag-warm k8-n' + k + '">' + w[0] + '</div>').join('') + OLD.map((w, k) => '<div class="tag tag-warm k8-o' + k + '">' + w[0] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'k8', ['body', 'head', 'eyes', 'mouth', 'deck', 'aw']));
    this.sd = R.sidesRefs(kit, 'k8'); this.n = N.map((w, k) => kit.stage.querySelector('.k8-n' + k)); this.o = OLD.map((w, k) => kit.stage.querySelector('.k8-o' + k));
    R.setFan([0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.k8-f-c' + k)), 1);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.deck.style.opacity = 0;
    const lift = { 0: 9, 2: 9 }; U.forEach(([k, a]) => { lift[k] = seg(t, a - 0.1, a + 0.6); });
    R.SIDES.forEach(([x, y], k) => {
      const q = lift[k] === 9 ? 1 : lift[k] || 0;
      R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 5 * q, 1 + 0.15 * Math.sin(Math.PI * q));
      this.sd.l[k].forEach((sl, j) => R.slab(sl, 1, eio(seg(q, j * 0.15, 0.6 + j * 0.15)), j % 2 ? 1 : -1));
      this.sd.g[k].style.opacity = 0.8 * (1 - eo(q)); this.sd.s[k].style.opacity = lerp(0.4, 1, eo(q));
    });
    const fun = eob(seg(t, 6.3, 6.9), 1.6);
    R.setG(this.sd.w[4], R.FUN[0], R.FUN[1] + Math.sin(t * 1.6) * 5, 0.7 * fun, fun > 0 ? 1 : 0);
    const g1 = eio(seg(t, 0.6, 1.6)), g2 = eio(seg(t, 2.3, 3.2)), g3 = eio(seg(t, 5.6, 6.5));
    const ax = lerp(lerp(lerp(870, 650, g1), 230, g2), R.FUN[0], g3), ay = lerp(lerp(lerp(230, 200, g1), 230, g2), R.FUN[1], g3) + Math.sin(t * 2) * 4;
    this.aw.setAttribute('transform', 'translate(' + ax + ' ' + ay + ') scale(' + lerp(1, 0.6, g3) + ')'); this.aw.style.opacity = 1 - eo(seg(t, 7.2, 8.0));
    N.forEach(([w, x, y, a], k) => R.place(this.n[k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    OLD.forEach(([w, x, y], k) => R.place(this.o[k], x, y, 1 - eo(seg(t, 0.1, 0.5))));
    this.head.setAttribute('transform', 'rotate(' + (t < 2.3 ? lerp(10, 4, g1) : t < 5.6 ? lerp(4, -10, g2) : lerp(-10, 2, g3)) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
  },
});
