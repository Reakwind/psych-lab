const { seg, eo, eio, eob, lerp } = kit;
const DOTS = '<circle class="metal tm-d0" cx="-50" cy="0" r="16"/><circle class="metal tm-d1" cx="0" cy="0" r="16"/><circle class="metal tm-d2" cx="50" cy="0" r="16"/>';
const QM = '<text class="tm-qm" x="0" y="34" text-anchor="middle" style="font:700 120px var(--sans);fill:var(--second);opacity:0">?</text>';
kit.scene('p-time', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tm', -200) +
      '<g class="tm-mem">' + R.memory('tm-m', '<g class="tm-dots">' + DOTS + '</g>' + QM + '<g class="tm-cf" style="opacity:0">' + R.coffee('tm-c') + '</g>') + '</g>' +
      '<g class="tm-h">' + R.badge('tm-bh', R.CH.heart) + '<text x="64" y="-40" style="font:700 64px var(--sans);fill:var(--second)">?</text></g>' +
      '<g class="tm-b">' + R.badge('tm-bb', R.CH.body) + '<text x="64" y="-40" style="font:700 64px var(--sans);fill:var(--second)">?</text></g></svg>' +
      '<div class="tag tag-cool tm-a">זה יכול לקחת זמן</div><div class="tag tm-b2">לא משהו שרגילים לחקור ביומיום</div><div class="tag tm-c2">לפעמים לא נזכור</div>' +
      '<div class="tag tm-d">מה הרגשנו בגוף?</div><div class="tag tm-e">איך קוראים לרגש?</div></div>'));
    Object.assign(this, R.refs(kit, 'tm', ['body', 'head', 'eyes', 'mouth', 'mem', 'dots', 'qm', 'cf', 'h', 'b', 'a', 'b2', 'c2', 'd', 'e']));
    this.dd = [0, 1, 2].map((k) => kit.stage.querySelector('.tm-d' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.mem.setAttribute('transform', 'translate(720 ' + (330 + Math.sin(t * 1.3) * 6) + ') scale(' + 1.25 * eob(seg(t, 0.2, 0.8), 1.4) + ')');
    // searching takes time
    this.dd.forEach((d, k) => (d.style.opacity = t < 9.2 ? 0.3 + 0.7 * Math.max(0, Math.sin(t * 3 - k * 0.8)) : 0));
    this.qm.style.opacity = eo(seg(t, 9.3, 9.6)) * (1 - eo(seg(t, 11.4, 11.7)));
    this.cf.style.opacity = eo(seg(t, 11.5, 12.0));
    // sometimes we remember, but can't say what we felt in the body, or name the feeling
    R.xf(this.b, 860, 680 + Math.sin(t * 1.5) * 5, eob(seg(t, 11.8, 12.3), 1.7), eo(seg(t, 11.8, 12.0)));
    R.xf(this.h, 600, 700 + Math.sin(t * 1.5 + 1) * 5, eob(seg(t, 14.4, 14.9), 1.7), eo(seg(t, 14.4, 14.6)));
    this.head.setAttribute('transform', 'rotate(' + (-8 + Math.sin(t * 0.8) * 3) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 28 Q2 26 14 28');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)) * (1 - eo(seg(t, 3.8, 4.1))));
    R.place(this.b2, 540, lerp(84, 70, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)) * (1 - eo(seg(t, 9.0, 9.3))));
    R.place(this.c2, 540, lerp(84, 70, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)) * (1 - eo(seg(t, 11.4, 11.7))));
    R.place(this.d, 860, lerp(802, 790, eo(seg(t, 12.0, 12.5))), eo(seg(t, 12.0, 12.5)));
    R.place(this.e, 600, lerp(822, 810, eo(seg(t, 14.6, 15.1))), eo(seg(t, 14.6, 15.1)));
  },
});
