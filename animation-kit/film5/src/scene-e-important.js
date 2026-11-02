const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-important', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('eo', -120) + '<g transform="translate(860 400) scale(1.1)">' + R.battery('eo') + '</g>' +
      '<path class="eo-flow" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-dasharray:14 16;opacity:0" d="M820 280 C780 180 680 160 620 200"/><g class="eo-st">' + R.star('eo-s') + '</g></svg>' +
      '<div class="tag tag-warm eo-a">למטרה טובה וחשובה</div><div class="tag tag-cool eo-b">בסדר לעשות קצת יותר</div><div class="tag eo-c">ואז לנוח קצת יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'eo', ['body', 'head', 'eyes', 'mouth', 'fill', 'bolt', 'flow', 'st', 'a', 'b', 'c']));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, lerp(3.6, 5.5, eo(seg(t, 9.2, 10))) ) + ')');
    // something that matters: she spends past her usual level for it...
    const s = eob(seg(t, 2.4, 3.0), 1.8);
    this.st.setAttribute('transform', 'translate(560 220) rotate(' + Math.sin(t * 2) * 6 + ') scale(' + s * 0.9 + ')');
    const spend = eio(seg(t, 5.2, 7.0)), rest = eio(seg(t, 9.3, 11.6));
    R.setBattery(this.fill, 0.6 - 0.48 * spend + 0.25 * rest);
    this.flow.style.opacity = eo(seg(t, 5.0, 5.4)) * (1 - eo(seg(t, 7.2, 7.6))); this.flow.style.strokeDashoffset = t * 60;
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 2.6, 3.2)) * (1 - rest)) + ' 0 30)');
    // ...and rests longer afterwards
    if (t > 9.2) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    this.bolt.style.opacity = rest * (0.7 + 0.3 * Math.sin(t * 6));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)) * (1 - eo(seg(t, 9.0, 9.3))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)));
  },
});