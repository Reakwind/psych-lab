const { seg, eo, eio, eob, lerp } = kit;
const W = [[1.4, 'להפסיק לחשוב', 270], [3.9, 'לחלק ציונים למחשבות', 380], [5.7, 'להחליף במחשבות חיוביות יותר', 490]];
kit.scene('o-not', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ot', -200) + '<g class="ot-b">' + R.balloon('ot-bl') + '</g></svg>' +
      W.map((w, k) => '<div class="tag struck ot-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool ot-a">אנחנו לא מנסים</div></div>'));
    Object.assign(this, R.refs(kit, 'ot', ['body', 'head', 'eyes', 'b', 'a']));
    this.w = W.map((w, k) => kit.stage.querySelector('.ot-w' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // not stopping thoughts, not grading them, not swapping them: the thought just floats on
    R.setBal(this.b, lerp(560, 400, t / 9.66), 230 + Math.sin(t * 1.3) * 10, 1.5, 1);
    this.head.setAttribute('transform', 'rotate(' + lerp(10, -4, t / 9.66) + ' 0 30)');
    W.forEach(([a, , y], k) => { R.place(this.w[k], 790, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))); this.w[k].style.setProperty('--s', eio(seg(t, a + 0.7, a + 1.2))); });
    R.place(this.a, 790, lerp(174, 160, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
  },
});
