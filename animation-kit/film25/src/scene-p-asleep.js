const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-asleep', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pz') + '<g class="pz-bl">' + R.blanket('pz-b') + '</g>' +
      '<rect class="pz-night" width="1080" height="1080" style="fill:#1F2A4A;opacity:0"/><g class="pz-zz"><text x="0" y="0" style="font-size:54px;font-weight:700;fill:var(--ground)">z</text><text x="34" y="-40" style="font-size:42px;font-weight:700;fill:var(--ground)">z</text></g>' +
      '<g class="pz-bat">' + R.battery('pz') + '</g></svg>' +
      '<div class="tag tag-cool pz-ta">ולפעמים, נרדמים</div><div class="tag tag-warm pz-tb">וזה מצוין!</div><div class="tag pz-tc">זמן של מנוחה או התאוששות</div></div>'));
    Object.assign(this, R.refs(kit, 'pz', ['eyes', 'mouth', 'bl', 'night', 'zz', 'bat', 'fill', 'bolt', 'ta', 'tb', 'tc']));
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    this.bl.setAttribute('transform', 'translate(' + lerp(1150, 640, eio(seg(t, 0.2, 1.2))) + ' 540)');
    this.night.style.opacity = 0.32 * eio(seg(t, 0.8, 2.6));
    this.mouth.setAttribute('d', t > 4.2 ? 'M-12 24 Q2 36 16 24' : 'M-6 28 Q2 32 10 28');
    const z = eo(seg(t, 2.2, 2.8));
    this.zz.style.opacity = z * (0.6 + 0.4 * Math.sin(t * 2)); this.zz.setAttribute('transform', 'translate(180 ' + (420 - (t % 3) * 10) + ')');
    // resting is recovering: the battery charges
    const b = eob(seg(t, 7.2, 7.7), 1.5);
    this.bat.setAttribute('transform', 'translate(930 220) scale(' + 0.7 * b + ')');
    R.setBattery(this.fill, lerp(0.3, 0.9, eio(seg(t, 7.6, 9.8)))); this.bolt.style.opacity = eo(seg(t, 7.6, 8.0));
    R.place(this.ta, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
    R.place(this.tb, 540, lerp(176, 164, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)));
    R.place(this.tc, 540, lerp(940, 928, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)));
  },
});
