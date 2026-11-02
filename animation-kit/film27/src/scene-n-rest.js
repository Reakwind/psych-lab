const { seg, eo, eio, eob, lerp } = kit;
kit.scene('n-rest', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bedTop('nz') + '<rect class="nz-veil" width="1080" height="1080" style="fill:#1A2340;opacity:.3"/>' +
      '<g class="nz-zz"><text x="0" y="0" style="font-size:54px;font-weight:700;fill:var(--ground)">z</text><text x="34" y="-40" style="font-size:42px;font-weight:700;fill:var(--ground)">z</text></g></svg>' +
      '<div class="tag tag-cool nz-a">משהו פשוט שאפשר לחזור עליו</div><div class="tag tag-warm nz-b">עשיתי מספיק להיום</div><div class="tag tag-night nz-c">עכשיו אפשר לנוח</div></div>'));
    Object.assign(this, R.refs(kit, 'nz', ['eyes', 'mouth', 'glow', 'veil', 'zz', 'a', 'b', 'c']));
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    // the bedside lamp goes out; she rests
    this.glow.style.opacity = 0.25 * (1 - eo(seg(t, 2.8, 3.6)));
    this.veil.style.opacity = lerp(0.3, 0.5, eio(seg(t, 2.8, 4.0)));
    this.zz.style.opacity = eo(seg(t, 7.8, 8.4)) * (0.6 + 0.4 * Math.sin(t * 2)); this.zz.setAttribute('transform', 'translate(170 ' + (420 - (t % 3) * 10) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 4.8, 5.2))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
    R.place(this.c, 540, lerp(940, 928, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
