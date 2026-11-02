const { seg, eo, eio, eob, lerp } = kit;
// there are all kinds of things we want to do: meet someone, return to a hobby we love, take part in something that matters to us
const W = [[3.67, 860, 'לפגוש מישהו'], [4.74, 540, 'לחזור לתחביב'], [7.27, 255, 'לקחת חלק במשהו שחשוב לנו']];
kit.scene('y-want', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('yw', 0) +
      W.map((w, k) => '<g class="yw-b' + k + '">' + R.matter('yw-m' + k, R.WANT[k], 70) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool yw-title">מפגש 73 · מבוא לפעולה משמעותית</div>' + W.map((w, k) => '<div class="tag tag-warm yw-t' + k + '">' + w[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'yw', ['body', 'head', 'eyes', 'mouth', 'title']));
    this.b = W.map((w, k) => kit.stage.querySelector('.yw-b' + k)); this.t = W.map((w, k) => kit.stage.querySelector('.yw-t' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    W.forEach(([a, x], k) => {
      const p = eob(seg(t, a - 0.1, a + 0.4), 1.6);
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + (210 + Math.sin(t * 1.4 + k) * 6) + ') scale(' + Math.max(0.001, p) + ')'); this.b[k].style.opacity = eo(seg(t, a - 0.1, a + 0.1));
      R.place(this.t[k], x, (k === 2 ? 410 : 340) + 12 * (1 - eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    // she looks up at each one as it appears
    const cur = W.reduce((x, w) => (t > w[0] ? w[1] : x), 540), side = (cur - 540) / 320 * (t > 3.5 ? 1 : 0);
    this.head.setAttribute('transform', 'rotate(' + (-6 * side) + ' 0 30)');
    R.look(this.eyes, t, 0.5, 4 * side, t > 3.5 ? -3 : 0);
    this.mouth.setAttribute('d', t > 3.7 ? R.BIG : R.SMILE);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)) * (1 - eo(seg(t, 3.0, 3.4))));
  },
});
