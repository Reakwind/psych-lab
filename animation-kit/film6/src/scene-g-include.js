const { seg, eo, eio, eob, lerp } = kit;
const W = [[0.9, 'רעד', 260, 620], [1.3, 'נוקשות', 260, 720], [3.3, 'עייפות', 780, 620]];
kit.scene('g-include', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g class="gi-ring">' + R.attn('gi') + '</g>' + R.seated('gi', 0) +
      '<g class="gi-tg">' + R.tremor('gi') + '</g><g class="gi-snd"><path class="ink" style="stroke:var(--accent);stroke-width:8" d="M330 400 q16 20 0 40 M352 384 q28 36 0 72"/></g>' +
      '<ellipse class="gi-chair" cx="520" cy="700" rx="250" ry="190" style="fill:var(--accent);opacity:0"/></svg>' +
      W.map((w, k) => '<div class="tag gi-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-warm gi-ok">זה בסדר</div><div class="tag tag-cool gi-part">חלק ממה שקורה כרגע</div></div>'));
    Object.assign(this, R.refs(kit, 'gi', ['ring', 'body', 'eyes', 'tg', 'snd', 'chair', 'w0', 'w1', 'w2', 'ok', 'part']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.tg.setAttribute('transform', 'translate(' + (476 + Math.sin(t * 40) * 3) + ' 712)'); this.tg.style.opacity = eo(seg(t, 0.8, 1.2));
    W.forEach(([a, , x, y], k) => R.place(this['w' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    R.place(this.ok, 540, lerp(84, 70, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)));
    // they sit inside the circle, alongside the chair, the sounds and everything else
    const r = eio(seg(t, 6.4, 8.4));
    this.ring.setAttribute('transform', 'translate(520 620) scale(' + lerp(200, 440, r) + ')'); this.ring.style.opacity = eo(seg(t, 6.4, 7.0));
    this.snd.style.opacity = eo(seg(t, 8.0, 8.5)); this.chair.style.opacity = 0.18 * eo(seg(t, 8.4, 9.0));
    R.place(this.part, 540, lerp(176, 164, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)));
  },
});
