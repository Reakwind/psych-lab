const { seg, eo, eio, eob, lerp } = kit;
const IC = [[9.6, 'moon'], [10.1, 'pill'], [10.9, 'clock']];
kit.scene('e-pattern', {
  init(kit) {
    const moon = '<path class="slate" d="M-14 -30 a32 32 0 1 0 0 60 a40 40 0 0 1 0 -60Z"/>';
    const pill = '<rect x="-34" y="-16" width="68" height="32" rx="16" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><path d="M-34 0 a16 16 0 0 1 16 -16 h16 v32 h-16 a16 16 0 0 1 -16 -16Z" style="fill:#D96C6C"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('ea', -160) +
      '<g class="ea-book"><rect class="shade" x="-150" y="-180" width="310" height="380" rx="22"/><rect x="-160" y="-190" width="320" height="380" rx="22" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' +
      '<g class="ea-i0" transform="translate(90 -40)">' + moon + '</g><g class="ea-i1" transform="translate(0 -40)">' + pill + '</g><g class="ea-i2" transform="translate(-90 -40) scale(.55)">' + R.clock('ea-c') + '</g></g></svg>' +
      '<div class="tag tag-warm ea-cap">הדפוס האישי שלכם</div><div class="tag ea-q1">מתי יש יותר אנרגיה?</div><div class="tag ea-q2">מה דורש יותר?</div><div class="tag tag-cool ea-lab">שינה · תרופות · שעה ביום</div></div>'));
    Object.assign(this, R.refs(kit, 'ea', ['body', 'head', 'eyes', 'book', 'i0', 'i1', 'i2', 'cap', 'q1', 'q2', 'lab']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    const b = eio(seg(t, 0.3, 1.1));
    this.book.setAttribute('transform', 'translate(' + lerp(1300, 780, b) + ' 520) rotate(' + lerp(8, -2, b) + ')');
    this.head.setAttribute('transform', 'rotate(' + (7 * eio(seg(t, 1.0, 1.6))) + ' 0 30)');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.5, 3.0))), eo(seg(t, 2.5, 3.0)));
    R.place(this.q1, 780, lerp(232, 220, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)) * (1 - eo(seg(t, 7.0, 7.3))));
    R.place(this.q2, 780, lerp(232, 220, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)) * (1 - eo(seg(t, 9.3, 9.6))));
    // what shapes it: sleep, pills, the time of day
    IC.forEach(([a], k) => { const p = eob(seg(t, a, a + 0.5), 1.8); this['i' + k].style.opacity = p > 0 ? 1 : 0; this['i' + k].setAttribute('transform', 'translate(' + [90, 0, -90][k] + ' -40) scale(' + p * (k === 2 ? 0.55 : 1) + ')'); });
    R.place(this.lab, 780, lerp(612, 600, eo(seg(t, 11.2, 11.7))), eo(seg(t, 11.2, 11.7)));
  },
});