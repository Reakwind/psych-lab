const { seg, eo, eio, eob, lerp } = kit;
// if there was a click: no need to act on it at once, and no fighting the fight (a second switch against the first, crossed out)
kit.scene('m-norush', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m18', -200) + '<g class="m18-bw">' + R.battery('m18-b') + '</g>' +
      '<g class="m18-s2w">' + R.switchSvg('m18-s2') + R.xMark('m18-x', 110) + '</g></svg>' + R.pileHtml('m18') +
      '<div class="thought kind sm m18-k">היה כאן קליק?</div><div class="tag tag-cool m18-a">לא חייבים מיד לעשות עם זה משהו</div><div class="tag tag-warm m18-b">ובטח שלא להתחיל להיאבק גם במאבק</div></div>'));
    Object.assign(this, R.refs(kit, 'm18', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 's2w', 'x-a', 'x-b', 'k', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm18-sw'); this.s2 = R.swRefs(kit, 'm18-s2'); this.pl = R.pileRefs(kit, 'm18');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    R.setPile(this.pl, () => 1, 1.16, 0);
    const back = eio(seg(t, 1.6, 2.8));
    this.body.setAttribute('transform', 'translate(0 ' + lerp(6, 2, back) + ') scale(1 ' + kit.breathe(t, 0.014, 4.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(-12, 2, back) + ' 0 30)');
    this.mouth.setAttribute('d', back > 0.5 ? R.mouthNeutral : R.mouthO);
    R.put(this.k, 470, 280, 1, -2, 1 - eo(seg(t, 0.9, 1.4)));
    // a second switch pops up to fight the first; a red cross
    const p = eob(seg(t, 5.9, 6.4), 1.5);
    this.s2w.setAttribute('transform', 'translate(500 300) scale(' + Math.max(0.001, 0.85 * p) + ')'); this.s2w.style.opacity = eo(seg(t, 5.9, 6.1));
    R.setSwitch(this.s2, t > 6.2 ? 1 : 0);
    R.drawOn(this['x-a'], eio(seg(t, 6.5, 6.8))); R.drawOn(this['x-b'], eio(seg(t, 6.75, 7.05)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.6, 5.95))), eo(seg(t, 5.6, 5.95)));
  },
});
