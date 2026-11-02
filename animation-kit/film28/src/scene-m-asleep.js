const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-asleep', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('mz') + '<g class="mz-bl">' + R.blanket('mz-bk') + '</g>' +
      '<rect class="mz-night" width="1080" height="1080" style="fill:#1F2A4A;opacity:0"/><g class="mz-zz"><text x="0" y="0" style="font-size:54px;font-weight:700;fill:var(--ground)">z</text><text x="34" y="-40" style="font-size:42px;font-weight:700;fill:var(--ground)">z</text></g>' +
      '<g class="mz-bw">' + R.battery('mz') + '</g></svg>' +
      '<div class="tag tag-cool mz-ta">אם נרדמתם, זה גם בסדר</div><div class="tag mz-tb">זמן של מנוחה והתאוששות</div></div>'));
    Object.assign(this, R.refs(kit, 'mz', ['eyes', 'mouth', 'bl', 'night', 'zz', 'bw', 'fill', 'bolt', 'ta', 'tb']));
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    this.bl.setAttribute('transform', 'translate(' + lerp(1150, 640, eio(seg(t, 0.2, 1.2))) + ' 540)');
    this.night.style.opacity = 0.32 * eio(seg(t, 0.5, 2.2));
    this.zz.style.opacity = eo(seg(t, 1.6, 2.2)) * (0.6 + 0.4 * Math.sin(t * 2)); this.zz.setAttribute('transform', 'translate(180 ' + (420 - (t % 3) * 10) + ')');
    this.bw.setAttribute('transform', 'translate(930 220) scale(' + 0.7 * eob(seg(t, 4.9, 5.4), 1.5) + ')');
    R.setBattery(this.fill, lerp(0.3, 0.9, eio(seg(t, 5.3, 7.3)))); this.bolt.style.opacity = eo(seg(t, 5.3, 5.7));
    R.place(this.ta, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)));
    R.place(this.tb, 540, lerp(940, 928, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
  },
});
