const { seg, eo, eio, eob, lerp } = kit;
const D = [1.6, 2.7, 3.8, 4.9];
const T = [['האנשים שבחיינו', 870, 316], ['תחומי העניין שלנו', 650, 60], ['חוויות שחווינו', 440, 290], ['הערכים שמובילים אותנו', 230, 90]];
const W = [[1.52, 7.6, 'כל מה שמעסיק אותנו ביום־יום'], [7.96, 11.3, 'כשהחיים עמוסים או מכבידים'], [11.63, 99, 'אפשר אפילו לשכוח שהם קיימים']];
kit.scene('k-load', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k5') + R.pileSvg('k5', 3) + R.seated('k5', 0) + R.deckSvg('k5') + R.sidesSvg('k5', true, false) + '</svg>' +
      T.map((w, k) => '<div class="tag k5-n' + k + '">' + w[0] + '</div>').join('') + W.map((w, k) => '<div class="tag tag-warm k5-a' + k + '">' + w[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'k5', ['body', 'head', 'eyes', 'mouth']));
    this.sd = R.sidesRefs(kit, 'k5'); this.n = T.map((w, k) => kit.stage.querySelector('.k5-n' + k)); this.a = W.map((w, k) => kit.stage.querySelector('.k5-a' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the day's grey load drops onto each badge until they are buried and almost forgotten
    const slump = eio(seg(t, 2.5, 5.5));
    this.body.setAttribute('transform', 'translate(0 ' + 6 * slump + ') scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.SIDES.forEach(([x, y], k) => {
      R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 5 * (1 - eo(seg(t, D[k], D[k] + 0.6))));
      this.sd.l[k].forEach((sl, j) => R.slab(sl, seg(t, D[k] + j * 0.28, D[k] + j * 0.28 + 0.5), 0));
      this.sd.g[k].style.opacity = 0.8 * eo(seg(t, D[k], D[k] + 1.0));
      this.sd.s[k].style.opacity = 1 - 0.6 * eo(seg(t, 11.6, 12.8));
      R.place(this.n[k], T[k][1], T[k][2], 1 - eo(seg(t, 0.2, 0.6)));
    });
    W.forEach(([a, b], k) => R.place(this.a[k], 540, lerp(972, 960, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b, b + 0.3)))));
    this.head.setAttribute('transform', 'rotate(' + lerp(-6, 0, eo(seg(t, 0.3, 1.2))) + ' 0 30) translate(0 ' + 4 * slump + ')');
    this.mouth.setAttribute('d', t > 3.0 ? R.mouthFlat : t > 0.8 ? R.mouthNeutral : R.mouthHappy);
  },
});
