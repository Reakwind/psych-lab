const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-tool', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('et', -120) +
      '<g class="et-k0">' + R.tool('et-b0', 1, 60) + '</g><g class="et-k1">' + R.tool('et-b1', 0, 60) + '</g>' +
      '<g class="et-bg"><circle class="et-disc" r="0" style="fill:color-mix(in srgb, var(--accent) 30%, var(--ground));stroke:var(--second);stroke-width:7"/><g class="et-bs">' + R.battery('et') + '</g></g></svg>' +
      '<div class="tag tag-warm et-a">משהו שיכול לעזור</div><div class="tag tag-cool et-b">כשיגיע הרגע הנכון</div></div>'));
    Object.assign(this, R.refs(kit, 'et', ['body', 'eyes', 'mouth', 'k0', 'k1', 'bg', 'disc', 'bs', 'fill', 'a', 'b']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.setBattery(this.fill, 0.6);
    // the battery becomes one more badge among her tools
    const b = eio(seg(t, 3.5, 4.6));
    this.bg.setAttribute('transform', 'translate(' + lerp(860, 840, b) + ' ' + lerp(400, 230, b) + ')');
    this.bs.setAttribute('transform', 'scale(' + lerp(1.1, 0.4, b) + ')');
    this.disc.setAttribute('r', 66 * b);
    this.k0.setAttribute('transform', 'translate(660 230) scale(' + eob(seg(t, 4.4, 4.9), 1.6) + ')');
    this.k1.setAttribute('transform', 'translate(480 230) scale(' + eob(seg(t, 4.7, 5.2), 1.6) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.7, 4.2))), eo(seg(t, 3.7, 4.2)));
    R.place(this.b, 660, lerp(352, 340, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
  },
});