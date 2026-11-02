const { seg, eo, eio, eob, lerp } = kit;
const X = [['תשובות נכונות', 720, 0.33], ['טובות יותר מאחרות', 360, 2.15]];
kit.scene('k-noright', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k10') + R.pileSvg('k10', 3) + R.seated('k10', 0) + R.deckSvg('k10') + R.sidesSvg('k10', false, true) +
      '<g class="k10-bw">' + R.battery('k10') + '</g><g class="k10-fw" transform="translate(' + R.FANP[0] + ' ' + R.FANP[1] + ') scale(.85)">' + R.fan('k10-f') + '</g>' +
      '<g class="k10-pw">' + R.bubble('k10-bb', R.placePic('k10-p')) + '</g></svg>' +
      X.map((w, k) => '<div class="tag struck k10-x' + k + '">' + w[0] + '</div>').join('') + R.qcard('k10-q', 'לאיזה מקום או רגע הייתם שמחים לחזור?') + '<div class="tag tag-warm k10-a">פשוט פותחים קלף</div></div>'));
    Object.assign(this, R.refs(kit, 'k10', ['body', 'head', 'eyes', 'mouth', 'deck', 'bw', 'fill', 'fw', 'q', 'bb', 'bb-p0', 'bb-p1', 'bb-p2', 'a']));
    this.sd = R.sidesRefs(kit, 'k10'); this.x = X.map((w, k) => kit.stage.querySelector('.k10-x' + k));
    this.fc = [0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.k10-f-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the badges settle into a small row on top; the deck goes back to the table; no right answers
    const sm = eio(seg(t, 0.0, 1.1));
    R.SIDES.forEach(([x, y], k) => { const [sx, sy] = R.smallSide(k); R.setG(this.sd.w[k], lerp(x, sx, sm), lerp(y, sy, sm), lerp(1, 0.5, sm)); });
    R.setG(this.sd.w[4], R.FUN[0], R.FUN[1], 0.7 * (1 - sm), 1 - sm);
    this.bw.setAttribute('transform', 'translate(820 596) scale(' + Math.max(0.001, 0.8 * (1 - eio(seg(t, 0.0, 0.5)))) + ')'); R.setBattery(this.fill, 0.95);
    R.setFan(this.fc, 1 - eio(seg(t, 0.2, 0.7))); this.fw.style.opacity = 1 - eo(seg(t, 0.7, 0.8));
    const back = eio(seg(t, 0.7, 1.6));
    this.deck.setAttribute('transform', 'translate(' + lerp(R.FANP[0] - 784, 0, back) + ' ' + (lerp(R.FANP[1] - 40 - 650, 0, back) - Math.sin(Math.PI * back) * 60) + ')'); this.deck.style.opacity = t < 0.7 ? 0 : 1;
    X.forEach(([w, x, a], k) => { R.place(this.x[k], x, lerp(232, 220, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, 3.8, 4.1)))); this.x[k].style.setProperty('--s', eio(seg(t, a + 0.7, a + 1.2))); });
    // just open a card and see where the question takes you: the place from before opens again
    R.riseCard(this.q, seg(t, 4.1, 5.0), 760, 340, 1, -3);
    [[450, 444], [424, 424], [396, 404]].forEach(([x, y], k) => { const c = this['bb-p' + (2 - k)]; c.setAttribute('cx', x); c.setAttribute('cy', y); c.style.opacity = eo(seg(t, 6.3 + k * 0.12, 6.5 + k * 0.12)); });
    const pop = eob(seg(t, 6.6, 7.2), 1.5);
    R.setG(this.bb, 270, 310 + Math.sin(t * 1.2) * 5, pop, eo(seg(t, 6.6, 6.8)));
    this.head.setAttribute('transform', 'rotate(' + (t < 6.2 ? lerp(0, 6, eio(seg(t, 4.2, 5.0))) : lerp(6, -6, eio(seg(t, 6.2, 7.0)))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.8 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 4.17, 4.6))), eo(seg(t, 4.17, 4.6)));
  },
});
