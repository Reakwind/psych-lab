const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-pocket', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('x13p', { sun: true }) + '<g class="x13-rw" transform="translate(320 1050) scale(.72)">' + R.ruthBack('x13r', false) + '</g>' +
      '<g class="x13-fr" opacity="0"><circle class="x13-br" cx="540" cy="700" r="300" style="fill:var(--main);opacity:0"/>' + R.packed('x13') + '</g>' +
      R.CALM.map((c, k) => R.cbadge('x13-c' + k, c, 64)).join('') + '</svg>' +
      '<div class="tag tag-cool x13-p">וזה מה שנעשה במהלך התכנית</div><div class="tag tag-warm x13-a">נתנסה בדרכים השונות האלה</div><div class="tag tag-cool x13-b">כלים פשוטים לשלוף מהכיס</div><div class="tag tag-warm x13-c">רגע של שקט במהלך היום</div></div>'));
    Object.assign(this, R.refs(kit, 'x13', ['rw', 'fr', 'br', 'w', 'eyes', 'head', 'mouth', 'pk', 'p', 'a', 'b', 'c']));
    this.cb = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.x13-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the badges on the path light one by one; then, face to face, small versions slip into her cardigan pocket and one comes out for a quiet breath
    const sw = eio(seg(t, 2.6, 3.2)), into = seg(t, 3.3, 4.8), out = eob(seg(t, 5.1, 5.7), 1.5);
    this.fr.setAttribute('opacity', sw); this.rw.style.opacity = 1 - sw;
    this.w.setAttribute('transform', 'translate(540 980)');
    this.cb.forEach((c, k) => {
      const [sx, sy, ss] = R.onStone(k), lit = Math.sin(Math.PI * seg(t, 0.3 + k * 0.35, 0.9 + k * 0.35));
      const pin = eio(seg(into, k * 0.18, 0.4 + k * 0.18)), px = 540 - 42, py = 980 - 252;
      let x = lerp(sx, 760 - k * 30, sw), y = lerp(sy, 300 + k * 10, sw), s = lerp(ss, 0.5, sw) * (1 + 0.25 * lit), o = 1;
      x = lerp(x, px, pin); y = lerp(y, py, pin) - Math.sin(Math.PI * pin) * 60; s = lerp(s, 0.18, pin); o = pin > 0.95 ? 0 : 1;
      if (k === 0 && t > 5.1) { x = lerp(px, 700, eio(seg(t, 5.1, 5.9))); y = lerp(py, 520, eio(seg(t, 5.1, 5.9))) - Math.sin(Math.PI * eio(seg(t, 5.1, 5.9))) * 80; s = lerp(0.18, 1, out); o = 1; }
      R.setG(c, x, y, s, o);
    });
    this.pk.setAttribute('transform', 'translate(0 ' + (into > 0 && into < 1 ? 3 * Math.sin(into * 20) : 0) + ')');
    const br = seg(t, 6.0, 9.34);
    this.br.style.opacity = 0.14 * eo(seg(t, 6.0, 6.6)); this.br.setAttribute('r', 280 + 40 * Math.sin(br * Math.PI * 2 * 0.8));
    this.head.setAttribute('transform', 'rotate(' + (t > 5.1 ? 8 * eio(seg(t, 5.1, 5.8)) : 0) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.0 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.1, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)) * (1 - eo(seg(t, 3.0, 3.3))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 3.32, 3.7))), eo(seg(t, 3.32, 3.7)));
    R.place(this.c, 540, lerp(152, 140, eo(seg(t, 7.31, 7.7))), eo(seg(t, 7.31, 7.7)));
  },
});
