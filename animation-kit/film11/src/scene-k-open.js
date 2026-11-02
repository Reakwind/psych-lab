const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-open', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k15') + R.pileSvg('k15', 3) + R.seated('k15', 0) + R.deckSvg('k15') + R.sidesSvg('k15', false, false) +
      '<circle class="k15-gl" cx="760" cy="350" r="215" style="fill:var(--accent);opacity:0"/></svg>' +
      R.qcard('k15-ac', 'קלף פעולה', 'act') + R.qcard('k15-q', '?', 'big') + '<div class="tag tag-warm k15-a">אז בואו נפתח קלף ונראה מה עולה</div></div>'));
    Object.assign(this, R.refs(kit, 'k15', ['body', 'head', 'eyes', 'mouth', 'ac', 'q', 'gl', 'a']));
    this.sd = R.sidesRefs(kit, 'k15');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    R.SIDES.forEach((p, k) => { const [x, y] = R.smallSide(k); R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 3, 0.5 + 0.06 * eo(seg(t, 1.4, 2.0)) * (1 + Math.sin(t * 4 + k)) / 2); });
    // the action card goes aside; Ruth smiles and opens the next card
    R.flipCard(this.ac, 760, 350, 1.05, -2, 1, 1 - eo(seg(t, 0.0, 0.4)));
    R.riseCard(this.q, seg(t, 0.5, 1.4), 760, 340, 1, 2);
    this.gl.style.opacity = 0.22 * eo(seg(t, 1.2, 1.8)) * (0.85 + 0.15 * Math.sin(t * 4));
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 8, eio(seg(t, 0.5, 1.3))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
  },
});
