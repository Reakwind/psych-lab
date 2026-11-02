const { seg, eo, eio, eob, lerp } = kit;
kit.scene('q-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('q1p', { sun: true }) + R.packed('q1') + '<g class="q1-aw">' + R.armsFree(R.ariel('q1a', 'stand'), 'q1a') + '</g>' +
      '<circle class="q1-gl" r="150" style="fill:var(--accent);opacity:0"/>' + R.CALM.map((c, k) => R.cbadge('q1-c' + k, c, 64)).join('') + '</svg>' +
      '<div class="tag tag-cool q1-t">מפגש 15 · נשימת קופסה</div></div>'));
    Object.assign(this, R.refs(kit, 'q1', ['w', 'eyes', 'head', 'mouth', 'aw', 'gl', 't']));
    this.ar = R.refs(kit, 'q1a', ['eyes', 'head', 'mouth', 'armR']); this.cb = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.q1-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ar.eyes, t, 1.9);
    // Ruth and Ariel at the foot of her path, the four calm tools from session 14 on its stones; Ariel waves hello,
    // then the breathing badge glows, lifts off its stone and floats toward us: today's practice
    this.w.setAttribute('transform', 'translate(300 975)'); this.aw.setAttribute('transform', 'translate(890 978)');
    const wave = seg(t, 0.0, 1.8), up = eob(seg(t, 0.0, 0.4), 1.2) * (1 - eio(seg(t, 1.6, 2.2)));
    this.ar.armR.setAttribute('transform', 'rotate(' + (-150 * up + 14 * Math.sin(wave * Math.PI * 6) * up) + ' 52 -326)');
    const lift = eio(seg(t, 4.3, 6.1)), glow = eo(seg(t, 3.7, 4.3));
    this.cb.forEach((c, k) => {
      const [sx, sy, ss] = R.onStone(k);
      if (k) { R.setG(c, sx, sy + Math.sin(t * 1.4 + k) * 3, ss, 1); return; }
      const x = lerp(sx, 730, lift), y = lerp(sy, 450, lift) - Math.sin(Math.PI * lift) * 120;
      R.setG(c, x, y, lerp(ss * (1 + 0.25 * glow), 1.3, lift) * (1 + 0.04 * Math.sin(t * 5) * glow), 1);
      this.gl.setAttribute('cx', x); this.gl.setAttribute('cy', y); this.gl.setAttribute('r', lerp(60, 120, lift));
      this.gl.style.opacity = 0.3 * glow;
    });
    this.head.setAttribute('transform', 'rotate(' + (t > 4.0 ? 6 * eio(seg(t, 4.0, 4.8)) : -4) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    this.ar.head.setAttribute('transform', 'rotate(-6 0 30)'); this.ar.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.t, 540, lerp(54, 40, eo(seg(t, 0.2, 0.6))), eo(seg(t, 0.2, 0.6)));
  },
});
