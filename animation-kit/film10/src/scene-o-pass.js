const { seg, eo, eio, eob, lerp } = kit;
const W = [[4.5, 'להאמין לה מיד', 300], [5.4, 'לפתור אותה', 400], [6.4, 'לפעול לפיה', 500]];
kit.scene('o-pass', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('op', -60) + '<g class="op-b">' + R.balloon('op-bl') + '</g></svg>' +
      W.map((w, k) => '<div class="tag struck op-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-warm op-a">משהו שחולף בתודעה כרגע</div><div class="tag tag-cool op-n">לא משהו שצריך</div></div>'));
    Object.assign(this, R.refs(kit, 'op', ['body', 'head', 'eyes', 'mouth', 'b', 'a', 'n']));
    this.w = W.map((w, k) => kit.stage.querySelector('.op-w' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // a thought passes through, right to left, and out of the window; her eyes follow it
    const p = eio(seg(t, 0.2, 8.0)), bx = lerp(1000, 190, p), by = lerp(230, 420, p) + Math.sin(t * 1.5) * 8;
    R.setBal(this.b, bx, by, 1.5 * lerp(1, 0.6, eo(seg(t, 6.5, 8.2))), 1 - eo(seg(t, 7.2, 8.2)));
    this.head.setAttribute('transform', 'rotate(' + lerp(10, -10, p) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)));
    R.place(this.n, 820, lerp(214, 200, eo(seg(t, 4.0, 4.4))), eo(seg(t, 4.0, 4.4)));
    W.forEach(([a, , y], k) => { R.place(this.w[k], 820, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))); this.w[k].style.setProperty('--s', eio(seg(t, a + 0.4, a + 0.8))); });
  },
});
