const { seg, eo, eio, eob, lerp } = kit;
const BR = [1.75, 2.9, 4.05];
kit.scene('p-kettle', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.kitchen('pk2') + '<g transform="translate(800 980) scale(1.05)"><g class="pk2-ar">' + R.ariel('pk2', 'stand') + '</g></g>' +
      [0, 1, 2].map((k) => '<circle class="pk2-d' + k + '" cx="' + (860 - k * 60) + '" cy="200" r="20" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/>').join('') + '</svg>' +
      '<div class="tag tag-cool pk2-three">שלוש נשימות עמוקות</div><div class="tag tag-warm pk2-wait">בזמן שמחכים שהמים ירתחו</div></div>'));
    Object.assign(this, R.refs(kit, 'pk2', ['ar', 'eyes', 'head', 'steam', 'three', 'wait', 'd0', 'd1', 'd2']));
  },
  render(t) {
    // Ariel waits for the kettle and takes three deep breaths
    let b = 0, n = 0;
    BR.forEach((a) => { if (t >= a) { b = Math.sin(Math.PI * seg(t, a, a + 1.1)); n++; } });
    if (b > 0.2) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    this.ar.setAttribute('transform', 'scale(' + (1 + 0.025 * b) + ' ' + (1 + 0.012 * b) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 + 4 * b) + ' 0 30)');
    [this.d0, this.d1, this.d2].forEach((d, k) => { d.style.fill = k < n ? 'var(--main)' : 'var(--ground)'; d.style.opacity = eo(seg(t, 1.3, 1.7)); });
    this.steam.style.opacity = 0.3 + 0.7 * seg(t, 0, 5);
    this.steam.setAttribute('transform', 'translate(0 ' + (-((t * 30) % 30)) + ')');
    R.place(this.three, 760, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    R.place(this.wait, 330, lerp(272, 260, eo(seg(t, 4.0, 4.5))), eo(seg(t, 4.0, 4.5)));
  },
});
