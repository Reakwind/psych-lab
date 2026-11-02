const { seg, eo, eio, eob, lerp } = kit;
// it shapes how she feels and what she does next: she sinks, glances at her shoes, and stays put
kit.scene('f-feel', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ff', 0) +
      '<ellipse class="ff-glow" cx="750" cy="850" rx="90" ry="34" style="fill:var(--accent)" opacity="0"/>' +
      '<path class="ff-link" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:6;stroke-linecap:round;stroke-dasharray:.04 .03;opacity:0" d="M500 312 C470 400 470 520 500 640"/></svg>' + R.loud('ff') +
      '<div class="tag tag-cool ff-a">איך שנרגיש</div><div class="tag tag-cool ff-b">מה שנבחר לעשות</div></div>'));
    Object.assign(this, R.refs(kit, 'ff', ['body', 'head', 'eyes', 'mouth', 'glow', 'link', 'c', 'bang', 'a', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    const sink = eio(seg(t, 2.6, 3.8));
    this.body.setAttribute('transform', 'translate(0 ' + 10 * sink + ') scale(1 ' + (kit.breathe(t, 0.006, 4.2) - 0.03 * sink) + ')');
    R.put(this.c, 470 + Math.sin(t * 31) * 4, 250 + Math.cos(t * 27) * 2.4, 1.1, Math.sin(t * 23) * 1.5, 1);
    // a line from the thought down to her chest
    const l = eo(seg(t, 2.4, 3.2));
    this.link.style.opacity = l > 0 ? 0.7 : 0; this.link.style.strokeDashoffset = (-t * 0.06).toFixed(3);
    this.link.setAttribute('d', 'M640 305 C' + lerp(640, 640, l) + ' ' + lerp(305, 420, l) + ' ' + lerp(640, 610, l) + ' ' + lerp(305, 560, l) + ' ' + lerp(640, 545, l) + ' ' + lerp(305, 640, l));
    R.place(this.a, 780, lerp(452, 440, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)));
    // she glances at her shoes by the door, then settles back
    const look = eio(seg(t, 5.0, 5.8)) * (1 - eio(seg(t, 6.8, 7.6)));
    this.head.setAttribute('transform', 'rotate(' + (6 + 12 * look) + ' 0 30) translate(0 ' + 8 + ')');
    this.glow.setAttribute('opacity', 0.25 * eo(seg(t, 5.2, 5.8)) * (1 - eo(seg(t, 7.0, 7.8))));
    R.place(this.b, 760, lerp(742, 730, eo(seg(t, 5.5, 6.0))), eo(seg(t, 5.5, 6.0)));
    this.mouth.setAttribute('d', 'M-10 28 Q2 22 14 28');
  },
});
