const { seg, eo, eio, lerp } = kit;
kit.scene('daily-life', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('daily') +
      '<g class="daily-walker">' + R.packBehind('daily') + '<g class="daily-body">' + R.ruth('daily', 'stand') + '</g>' + R.straps('daily') + '</g>' +
      '<path class="daily-wander" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:6;stroke-linecap:round;stroke-dasharray:.03 .03" d="M250 330 C300 260 360 380 420 300 S520 250 560 330 S640 400 680 300"/>' +
      '<circle class="daily-orb amber" r="12"/>' +
      '<path class="daily-zig" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round;stroke-linejoin:round" d="M300 560 l16 -20 l16 20 l16 -20 l16 20 M468 540 l16 -20 l16 20 l16 -20 l16 20"/>' +
      '</svg><div class="tag daily-t0">קשה להתרכז</div><div class="tag daily-t1">מתח</div><div class="tag daily-t2">חוסר מוטיבציה</div></div>'));
    Object.assign(this, R.refs(kit, 'daily', ['walker', 'body', 'head', 'eyes', 'mouth', 'wander', 'orb', 'zig', 't0', 't1', 't2']));
    this.path = this.wander;
  },
  render(t) {
    R.blink(this.eyes, t, 1.6);
    // attention drifts
    const w = eio(seg(t, 3.4, 4.8));
    this.wander.style.strokeDasharray = w + ' 1';
    this.wander.style.opacity = (w > 0 ? 1 : 0) * (1 - 0.5 * eo(seg(t, 7.4, 8.2)));
    const L = this.path.getTotalLength ? this.path.getTotalLength() : 0;
    const pt = L ? this.path.getPointAtLength(L * ((t * 0.12) % 1)) : { x: 0, y: 0 };
    this.orb.setAttribute('cx', pt.x); this.orb.setAttribute('cy', pt.y);
    this.orb.style.opacity = eo(seg(t, 3.6, 4.0)) * (1 - 0.5 * eo(seg(t, 7.4, 8.2)));
    this.head.setAttribute('transform', 'rotate(' + (6 * Math.sin(t * 1.6) * eo(seg(t, 3.6, 4.2)) * (1 - eo(seg(t, 5.0, 5.4))) + 6 * eio(seg(t, 6.6, 7.4))) + ' 0 30) translate(0 ' + 8 * eio(seg(t, 6.6, 7.4)) + ')');
    // tension at the shoulders
    const z = eo(seg(t, 5.2, 5.7));
    this.zig.style.strokeDasharray = z + ' 1';
    this.zig.setAttribute('transform', 'translate(0 ' + (Math.sin(t * 9) * 2 * z) + ')');
    this.zig.style.opacity = (z > 0 ? 1 : 0) * (1 - 0.6 * eo(seg(t, 6.6, 7.2)));
    this.body.setAttribute('transform', 'translate(0 ' + (-6 * eo(seg(t, 5.2, 5.6)) * (1 - eo(seg(t, 6.4, 6.8))) + 10 * eio(seg(t, 6.6, 7.4))) + ') scale(1 ' + (1 - 0.03 * eio(seg(t, 6.6, 7.4))) + ')');
    this.mouth.setAttribute('d', t > 6.8 ? 'M-10 30 Q2 26 14 30' : 'M-10 26 Q2 32 14 26');
    this.walker.setAttribute('transform', 'translate(400 ' + (970 + (t < 2.8 ? Math.abs(Math.sin(t * Math.PI * 2.4)) * -6 : 0)) + ')');
    R.place(this.t0, 700, lerp(230, 218, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)));
    R.place(this.t1, 600, lerp(520, 508, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
    R.place(this.t2, 640, lerp(700, 688, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)));
  },
});
