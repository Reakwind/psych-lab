const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-wait', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tw', -160) + '<g class="tw-ph">' + R.phoneCall('tw-c') + '<g transform="translate(0 -36)"><circle r="16" class="nira-skin" cy="2"/><path class="fra-hair" d="M-18 0 C-20 -26 20 -26 18 0 C10 -10 -10 -10 -18 0Z"/></g>' + '<path class="tw-ring ink" style="stroke:var(--accent);stroke-width:7;opacity:0" d="M74 -60 q16 16 0 32 M90 -76 q30 32 0 64"/></g>' +
      '<g class="tw-msg"><rect x="-40" y="-16" width="80" height="32" rx="12" style="fill:var(--main)"/><path d="M-14 0 h28" style="stroke:var(--ground);stroke-width:5"/></g><g class="tw-cl">' + R.clock('tw-k') + '</g></svg>' +
      '<div class="tag tw-hrs">עוברות כמה שעות</div><div class="tag tag-warm tw-none">ועדיין אין תשובה</div></div>'));
    Object.assign(this, R.refs(kit, 'tw', ['body', 'head', 'eyes', 'mouth', 'ph', 'msg', 'cl', 'hrs', 'none']));
    this.kh = kit.stage.querySelector('.tw-k-h'); this.km = kit.stage.querySelector('.tw-k-m');
    this.mouth.setAttribute('d', 'M-10 28 Q2 26 14 28');
  },
  render(t) {
    R.blink(this.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.ph.setAttribute('transform', 'translate(780 440) scale(1.6)');
    // a message goes out...
    const m = eio(seg(t, 1.0, 1.8));
    this.msg.setAttribute('transform', 'translate(' + lerp(420, 780, m) + ' ' + (lerp(560, 470, m) - Math.sin(m * Math.PI) * 80) + ') scale(' + lerp(1, 0.8, m) + ')');
    this.msg.style.opacity = eo(seg(t, 1.0, 1.2));
    // ...hours pass, and still nothing
    const c = eob(seg(t, 2.2, 2.7), 1.6), spin = eio(seg(t, 2.5, 4.2));
    this.cl.setAttribute('transform', 'translate(330 250) scale(' + c * 0.9 + ')');
    this.km.setAttribute('transform', 'rotate(' + spin * 1440 + ')'); this.kh.setAttribute('transform', 'rotate(' + spin * 120 + ')');
    R.place(this.hrs, 330, lerp(352, 340, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
    R.place(this.none, 780, lerp(712, 700, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    this.head.setAttribute('transform', 'rotate(' + (8 - 4 * Math.sin(t * 2) * seg(t, 2.5, 4)) + ' 0 30)');
  },
});