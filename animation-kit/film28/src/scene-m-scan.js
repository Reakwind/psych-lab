const { seg, eo, eio, eob, lerp } = kit;
// from her feet up to her head
const PTS = [[790, 540], [690, 540], [600, 540], [514, 547], [420, 540], [255, 540]];
kit.scene('m-scan', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('ms') + R.beam('msb') + '</svg>' +
      '<div class="tag tag-warm ms-cap">סריקת גוף: מעבירים את תשומת הלב בין אזורים בגוף</div></div>'));
    Object.assign(this, R.refs(kit, 'ms', ['eyes', 'cap']));
    this.b = R.beamRefs(kit, 'msb'); this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    const k = eio(seg(t, 1.2, 5.4)) * (PTS.length - 1), i = Math.min(PTS.length - 2, Math.floor(k)), f = k - i;
    R.setBeam(this.b, lerp(PTS[i][0], PTS[i + 1][0], f), lerp(PTS[i][1], PTS[i + 1][1], f), 120, eo(seg(t, 0, 0.6)), 1);
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
  },
});
