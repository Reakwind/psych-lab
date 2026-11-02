const { seg, eo, eio, eob, lerp } = kit;
// the thought balloon leaves Ruth's head and drifts: to a noise, to a feeling in her feet, to the rest of the day
const STOPS = [[248, 470], [300, 860], [900, 610], [760, 190]];
const AT = [[1.6, 2.4], [3.0, 3.7], [4.1, 4.9]];
kit.scene('a-wander', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.overhead('aw2') + '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop('aw2') + '</g>' +
      '<path class="aw2-trail" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:.012 .02;opacity:.5" d="M248 470 C200 700 260 820 300 860 C500 900 800 760 900 610 C980 480 860 260 760 190"/>' +
      '<g class="aw2-i0">' + R.bell('aw2-bell') + '</g><g class="aw2-i1"><path class="amber" d="M0 -40 C4 -12 12 -4 40 0 C12 4 4 12 0 40 C-4 12 -12 4 -40 0 C-12 -4 -4 -12 0 -40Z"/></g><g class="aw2-i2">' + R.calendar('aw2-cal') + '</g>' +
      '<g class="aw2-b">' + R.balloon('aw2-bl') + '</g></svg>' +
      '<div class="tag aw2-t0">רעשים</div><div class="tag aw2-t1">תחושות בגוף</div><div class="tag aw2-t2">המשך היום</div><div class="tag tag-cool aw2-cap">ככה זה עם מחשבות</div></div>'));
    Object.assign(this, R.refs(kit, 'aw2', ['trail', 'i0', 'i1', 'i2', 'b', 't0', 't1', 't2', 'cap']));
    this.eyes = kit.stage.querySelector('.aw2-eyes');
  },
  render(t) {
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    let [x, y] = STOPS[0];
    AT.forEach(([a, b], k) => { const p = eio(seg(t, a, b)); x = lerp(x, STOPS[k + 1][0], p); y = lerp(y, STOPS[k + 1][1], p); });
    const out = eob(seg(t, 0.6, 1.2), 1.6);
    this.b.setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 2) * 6) + ') scale(' + out * 1.2 + ')');
    this.trail.style.strokeDasharray = '.012 .02'; this.trail.style.opacity = 0.45 * eo(seg(t, 1.4, 2.0));
    [[880, 'i0', 't0', STOPS[1]], [0, 'i1', 't1', STOPS[2]], [0, 'i2', 't2', STOPS[3]]].forEach(([, i, tg, [sx, sy]], k) => {
      const p = eob(seg(t, AT[k][1] - 0.3, AT[k][1] + 0.2), 2);
      this[i].setAttribute('transform', 'translate(' + (sx + [120, 80, -150][k]) + ' ' + (sy + [20, 70, 10][k]) + ') scale(' + p + ')');
      R.place(this[tg], sx + [120, 80, -150][k], sy + [100, 130, 90][k], eo(seg(t, AT[k][1], AT[k][1] + 0.4)));
    });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
  },
});
