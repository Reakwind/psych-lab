const { seg, eo, eio, eob, lerp } = kit;
// part 7: you decide — three dials turn: whether to share, with whom, how much; then Ruth writes a few word cards ahead of time
const D = [[1.63, 'אם לשתף', 900], [2.16, 'את מי', 720], [2.69, 'וכמה', 540]];
kit.scene('c-decide', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('c4', -240) + R.teaTable('c4', 560) +
      D.map((d, k) => '<g class="c4-d' + k + '">' + R.dial('c4-dl' + k) + '</g>').join('') +
      '<g transform="translate(560 772)">' + R.stack('c4-st', 3) + '</g><g class="c4-pen"><rect x="-6" y="-70" width="12" height="80" rx="5" class="metal" transform="rotate(30)"/></g></svg>' +
      '<div class="tag tag-cool c4-you">אתם מחליטים</div>' + D.map((d, k) => '<div class="tag c4-t' + k + '">' + d[1] + '</div>').join('') +
      '<div class="tag c4-ahead">וכשכן תרצו לדבר, מחשבה מראש על מה תרצו לומר</div><div class="tag tag-warm c4-ready">יכולה לעזור לכם להרגיש קצת יותר מוכנים</div></div>'));
    Object.assign(this, R.refs(kit, 'c4', ['body', 'head', 'eyes', 'mouth', 'd0', 'd1', 'd2', 'pen', 'you', 't0', 't1', 't2', 'ahead', 'ready']));
    this.hands = D.map((_, k) => kit.stage.querySelector('.c4-dl' + k + '-hand'));
    this.st = [0, 1, 2].map((k) => kit.stage.querySelector('.c4-st-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    // three dials, each turned on its word
    const off = eio(seg(t, 4.6, 5.3));
    D.forEach(([a, , x], k) => {
      R.setG(this['d' + k], x, 360, eob(seg(t, 0.4 + k * 0.15, 0.9 + k * 0.15), 1.4) * (1 - off), 1 - off);
      this.hands[k].setAttribute('transform', 'rotate(' + lerp(-60, [40, 70, 10][k], eob(seg(t, a, a + 0.6), 1.6)) + ')');
      R.place(this['t' + k], x, lerp(492, 480, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - off));
    });
    R.place(this.you, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 4.6, 4.9))));
    // thinking ahead: cards appear on the table and the pen writes
    R.showStack(this.st, 3 * eo(seg(t, 5.4, 8.0)));
    const w = t > 5.4 && t < 9.6;
    this.pen.setAttribute('transform', 'translate(' + (580 + (w ? Math.sin(t * 9) * 16 : 0)) + ' ' + (720 - Math.floor(3 * eo(seg(t, 5.4, 8.0))) * 10) + ')'); this.pen.style.opacity = eo(seg(t, 5.3, 5.6)) * (1 - eo(seg(t, 9.6, 10.0)));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 5.2, 5.8)) * (1 - eio(seg(t, 9.8, 10.4)))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 10.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.ahead, 540, lerp(84, 70, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)));
    R.place(this.ready, 540, lerp(162, 150, eo(seg(t, 7.7, 8.2))), eo(seg(t, 7.7, 8.2)));
  },
});
