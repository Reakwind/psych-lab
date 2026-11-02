const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-breath', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('mb', -60) + R.beam('mbb') +
      '<g class="mb-an"><g transform="scale(.55)">' + R.anchor('mb-a') + '</g></g><path class="mb-wave" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round"/></svg>' +
      '<div class="tag tag-cool mb-cap">מודעות לנשימה: העוגן הוא הנשימה</div></div>'));
    Object.assign(this, R.refs(kit, 'mb', ['body', 'eyes', 'mouth', 'an', 'wave', 'cap']));
    this.b = R.beamRefs(kit, 'mbb');
  },
  render(t) {
    if (t > 1.0) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.3);
    const br = (1 - Math.cos(2 * Math.PI * t / 4.2)) / 2;
    this.body.setAttribute('transform', 'scale(' + (1 + 0.02 * br) + ' ' + (1 + 0.012 * br) + ')');
    // the beam rests on her breath, steady as an anchor
    R.setBeam(this.b, 440, 680, lerp(170, 120, eio(seg(t, 0, 1.2))), 1, 1);
    this.an.setAttribute('transform', 'translate(440 ' + (700 - 6 * br) + ') scale(' + eob(seg(t, 2.1, 2.6), 1.6) + ')');
    this.wave.setAttribute('d', R.wavePath(300, 270, 300, 26, 1.5, -t * 1.5)); this.wave.style.opacity = eo(seg(t, 3.3, 3.8));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
  },
});
