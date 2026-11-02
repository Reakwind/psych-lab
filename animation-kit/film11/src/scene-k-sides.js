const { seg, eo, eio, eob, lerp } = kit;
const A = [4.56, 5.86, 7.4, 8.7];
const T = [['האנשים שבחיינו', 870, 316], ['תחומי העניין שלנו', 650, 60], ['חוויות שחווינו', 440, 290], ['הערכים שמובילים אותנו', 230, 90]];
kit.scene('k-sides', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k4') + R.pileSvg('k4', 2) + R.seated('k4', 0) + R.deckSvg('k4') + R.sidesSvg('k4', false, false) + '</svg>' +
      R.qcard('k4-q3', 'ומה תמיד רציתם ללמוד אבל עוד לא יצא לכם?') + T.map((w, k) => '<div class="tag k4-n' + k + '">' + w[0] + '</div>').join('') + '<div class="tag tag-warm k4-a">דברים שהופכים אותנו למי שאנחנו</div></div>'));
    Object.assign(this, R.refs(kit, 'k4', ['body', 'head', 'eyes', 'mouth', 'q3', 'pc2', 'a']));
    this.sd = R.sidesRefs(kit, 'k4'); this.n = T.map((w, k) => kit.stage.querySelector('.k4-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the cards are put away; four bright badges rise around Ruth, one for each part of who she is
    R.toPile(this.q3, seg(t, 0.1, 0.8), 760, 330, 2, 2, this.pc2);
    A.forEach((a, k) => {
      const p = eio(seg(t, a - 0.5, a + 0.2)), [x, y] = R.SIDES[k];
      R.setG(this.sd.w[k], lerp(500, x, p), lerp(560, y, p) + Math.sin(t * 1.3 + k) * 5 * p, eob(seg(t, a - 0.5, a + 0.2), 1.4), p > 0 ? 1 : 0);
      R.place(this.n[k], T[k][1], lerp(T[k][2] + 12, T[k][2], eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    const look = t < 4.3 ? 0 : t < 5.6 ? 10 : t < 7.1 ? 4 : t < 8.4 ? -4 : -10;
    this.head.setAttribute('transform', 'rotate(' + look * eo(seg(t, 4.2, 4.8)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.6 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 0.6, 1.0))), eo(seg(t, 0.6, 1.0)));
  },
});
