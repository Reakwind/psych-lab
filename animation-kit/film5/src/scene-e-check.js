const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-check', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ek', -120) +
      '<circle class="ek-ring" cx="780" cy="400" r="160" style="fill:none;stroke:var(--accent);stroke-width:8;opacity:0"/><g transform="translate(780 400) scale(1.1)">' + R.battery('ek') + '</g></svg>' +
      '<div class="tag tag-cool ek-a">מדי פעם, לבדוק</div><div class="tag tag-warm ek-q">מה מצב הסוללה שלי עכשיו?</div></div>'));
    Object.assign(this, R.refs(kit, 'ek', ['body', 'head', 'eyes', 'ring', 'fill', 'a', 'q']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.setBattery(this.fill, 0.55);
    // she pauses and looks: how's the battery right now?
    this.head.setAttribute('transform', 'rotate(' + (9 * eio(seg(t, 0.9, 1.5))) + ' 0 30)');
    const r = seg(t, 1.2, 2.4);
    this.ring.style.opacity = 0.8 * Math.sin(Math.PI * r); this.ring.setAttribute('r', lerp(130, 220, r));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 3.0, 3.3))));
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 3.2, 3.7))), eo(seg(t, 3.2, 3.7)));
  },
});