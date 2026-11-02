const { seg, eo, eio, eob, lerp } = kit;
const I = [['בלב', 820, 1.35], ['בקול', 540, 1.81], ['בכתב', 260, 2.64]];
const BL = [[5.05, 400, 300, 1.2], [5.5, 610, 250, 1.0], [5.95, 230, 200, 0.9]];
kit.scene('k-answer', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k11') + R.pileSvg('k11', 3) + R.seated('k11', 0) + R.deckSvg('k11') + R.sidesSvg('k11', false, false) +
      '<g class="k11-pw">' + R.bubble('k11-bb', R.placePic('k11-p')) + '</g><g class="k11-i0">' + R.tool('k11-ht', 3, 70) + '</g><g class="k11-i1">' + R.speech('k11-sp') + '</g><g class="k11-i2">' + R.notebook('k11-nb') + '</g>' +
      '<g class="k11-hg">' + R.hourglass('k11-hgl') + '</g>' + BL.map((b, k) => '<g class="k11-bl' + k + '">' + R.balloon('k11-bln' + k) + '</g>').join('') + '</svg>' +
      R.qcard('k11-q', 'לאיזה מקום או רגע הייתם שמחים לחזור?') + I.map((w, k) => '<div class="tag tag-warm k11-n' + k + '">' + w[0] + '</div>').join('') +
      '<div class="tag k11-a">קחו את הזמן</div><div class="tag tag-cool k11-c">ותנו למחשבות לבוא</div></div>'));
    Object.assign(this, R.refs(kit, 'k11', ['body', 'head', 'eyes', 'mouth', 'q', 'bb', 'bb-p0', 'bb-p1', 'bb-p2', 'i0', 'i1', 'i2', 'nb-pen', 'hg', 'a', 'c']));
    this.sd = R.sidesRefs(kit, 'k11'); this.n = I.map((w, k) => kit.stage.querySelector('.k11-n' + k)); this.bl = BL.map((b, k) => kit.stage.querySelector('.k11-bl' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.SIDES.forEach((p, k) => { const [x, y] = R.smallSide(k); R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 3, 0.5); });
    // the card and the picture are put away; three ways to answer: in the heart, aloud, in writing
    R.flipCard(this.q, 760, 340, 1, -3, 1, 1 - eo(seg(t, 0.0, 0.4)));
    const shut = 1 - eio(seg(t, 0.0, 0.5)); R.setG(this.bb, 270, 310, shut, shut); ['bb-p0', 'bb-p1', 'bb-p2'].forEach((n) => (this[n].style.opacity = 0));
    const out = 1 - eo(seg(t, 4.6, 5.0));
    I.forEach(([w, x, a], k) => {
      R.setG(this['i' + k], x, 330 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a - 0.2, a + 0.3), 1.5) * (k === 1 ? 0.9 : 1), out);
      R.place(this.n[k], x, lerp(212, 200, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * out);
    });
    this['nb-pen'].setAttribute('transform', 'translate(' + (76 - 40 * ((t * 1.5) % 1)) + ' ' + (-6 + Math.sin(t * 20) * 3) + ') rotate(30)');
    // take your time: the hourglass on the table; let thoughts come: balloons drift up
    const hg = eob(seg(t, 3.1, 3.6), 1.4);
    this.hg.setAttribute('transform', 'translate(820 604) scale(' + Math.max(0.001, 0.62 * hg) + ') rotate(' + (t > 3.6 ? Math.sin((t - 3.6) * 1.5) * 2 : 0) + ')');
    BL.forEach(([a, x, y, s], k) => { const p = seg(t, a, a + 2.4); R.setG(this.bl[k], lerp(480, x, eo(p)), lerp(430, y, eo(p)) + Math.sin(t * 1.5 + k) * 6, s * eo(seg(t, a, a + 0.6)), p > 0 ? 1 : 0); });
    this.head.setAttribute('transform', 'rotate(' + (t < 5 ? 0 : -8 * eio(seg(t, 5.0, 6.0))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 3.19, 3.6))), eo(seg(t, 3.19, 3.6)) * (1 - eo(seg(t, 4.8, 5.0))));
    R.place(this.c, 540, lerp(972, 960, eo(seg(t, 5.05, 5.45))), eo(seg(t, 5.05, 5.45)));
  },
});
