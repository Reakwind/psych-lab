const { seg, eo, eio, eob, lerp } = kit;
// small thoughts drift in the background; one swells into a loud card that won't let go
const BAL = [[220, 250, 0.2], [830, 210, 1.3], [660, 130, 2.4], [380, 150, 0.9]];
kit.scene('f-loud', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fl', 0) +
      BAL.map((b, k) => '<g class="fl-b' + k + '">' + R.balloon('fl-bb' + k) + '</g>').join('') + '<g class="fl-g">' + R.balloon('fl-gb') + '</g></svg>' +
      R.loud('fl') + '<div class="tag tag-cool fl-title">מפגש 64 · טיפוח חשיבה גמישה</div></div>'));
    Object.assign(this, R.refs(kit, 'fl', ['body', 'head', 'eyes', 'mouth', 'g', 'c', 'bang', 'title']));
    this.b = BAL.map((_, k) => kit.stage.querySelector('.fl-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 3.0, 3.5))));
    // background thoughts: small, faint, drifting
    this.b.forEach((el, k) => {
      const [x, y, a] = BAL[k], d = (t * 14 + a * 30) % 120;
      el.setAttribute('transform', 'translate(' + (x + Math.sin(t * 0.6 + a) * 20) + ' ' + (y - d * 0.4) + ') scale(.7)');
      el.style.opacity = 0.45 * eo(seg(t, a * 0.3, a * 0.3 + 0.8)) * (1 - 0.6 * eo(seg(t, 6.2, 7.2)));
    });
    // one of them grows and turns into the loud card
    const grow = eio(seg(t, 3.7, 6.2)), swap = seg(t, 5.6, 6.4);
    this.g.setAttribute('transform', 'translate(' + lerp(600, 540, grow) + ' ' + lerp(330, 250, grow) + ') scale(' + lerp(0.7, 2.6, grow) + ')');
    this.g.style.opacity = (0.5 + 0.5 * grow) * (1 - swap);
    // it gets firm and strong, shakes, and follows her when she turns away
    const strong = eo(seg(t, 9.3, 10.4)), away = eio(seg(t, 10.9, 11.8));
    const sh = strong * (1 - 0.3 * away) * 5;
    R.put(this.c, lerp(540, 430, eio(seg(t, 11.3, 12.4))) + Math.sin(t * 31) * sh, 250 + Math.cos(t * 27) * sh * 0.6, lerp(0.85, 1, eo(swap)) * (1 + 0.1 * strong), Math.sin(t * 23) * strong * 1.5, eo(swap));
    this.head.setAttribute('transform', 'rotate(' + (-10 * away) + ' 0 30)');
    this.mouth.setAttribute('d', t > 9.6 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
  },
});
