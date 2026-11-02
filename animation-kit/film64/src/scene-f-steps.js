const { seg, eo, eio, eob, lerp } = kit;
// noticing opens a gap: stop, notice without judging, step back, choose — and then: listen to it now, or not?
const ST = [[3.5, 'לעצור', 915], [4.6, 'לשים לב', 690], [8.1, 'לקחת מרחק', 440], [9.15, 'לבחור', 190]];
kit.scene('f-steps', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="fs-walker"><g class="fs-a">' + R.ruth('fs', 'stand') + '</g><g class="fs-b">' + R.ruth('fs-b', 'step') + '</g></g>' +
      '<g class="fs-gap"><path class="ink fs-line" pathLength="1" style="stroke-width:6"/><path class="ink fs-ends" style="stroke-width:6"/></g>' +
      '<path class="fs-to ink" pathLength="1" style="stroke:var(--accent);stroke-width:7;stroke-dasharray:.05 .04;opacity:0" d="M380 420 C460 330 560 330 600 380"/>' +
      '<path class="fs-off ink" pathLength="1" style="stroke:var(--main);stroke-width:7;stroke-dasharray:.05 .04;opacity:0" d="M220 420 C180 340 200 280 240 240"/></svg>' + R.loud('fs') +
      ST.map((s, k) => '<div class="tag step fs-s' + k + '">' + s[1] + '</div>').join('') +
      '<div class="tag tag-warm fs-th">מחשבה</div><div class="tag tag-cool fs-cap">קצת מרחק</div><div class="tag tag-warm fs-q">להקשיב לה עכשיו, או לא?</div></div>'));
    Object.assign(this, R.refs(kit, 'fs', ['walker', 'a', 'b', 'head', 'eyes', 'mouth', 'gap', 'line', 'ends', 'to', 'off', 'c', 'bang', 'th', 'cap', 'q']));
    this.s = ST.map((_, k) => kit.stage.querySelector('.fs-s' + k));
  },
  render(t) {
    // she steps back from the thought
    const back = eio(seg(t, 8.0, 9.2)), stepping = t > 8.0 && t < 9.2, step = stepping ? Math.floor(t * 3) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    const rx = lerp(400, 270, back), cx = lerp(650, 760, back);
    this.walker.setAttribute('transform', 'translate(' + rx + ' 962)');
    // it stops shaking when she stops; it calms as she takes distance
    const sh = 4 * (1 - eo(seg(t, 3.5, 4.2)));
    R.put(this.c, cx + Math.sin(t * 31) * sh, 470 + Math.cos(t * 27) * sh * 0.6 + Math.sin(t * 1.6) * 5 * (1 - sh / 4), lerp(1.05, 1, back), Math.sin(t * 23) * sh * 0.3, 1);
    R.calm(this.c, this.bang, eio(seg(t, 8.6, 10.0)));
    R.put(this.th, cx + 150, 400, eob(seg(t, 5.0, 5.4), 2), -8, eo(seg(t, 5.0, 5.2)));
    const g = eo(seg(t, 9.1, 9.9)), x0 = rx + 70, x1 = cx - 225;
    this.gap.setAttribute('transform', 'translate(' + x0 + ' 600)');
    this.line.setAttribute('d', 'M0 0 H' + (x1 - x0)); this.line.style.strokeDasharray = g + ' 1'; this.line.style.opacity = g > 0 ? 1 : 0;
    this.ends.setAttribute('d', 'M0 -22 V22 M' + (x1 - x0) + ' -22 V22'); this.ends.style.opacity = g;
    R.place(this.cap, (x0 + x1) / 2, lerp(642, 630, eo(seg(t, 9.4, 9.9))), eo(seg(t, 9.4, 9.9)) * (1 - eo(seg(t, 14.4, 14.9))));
    // the four steps light up across the top, right to left
    const rowOut = eo(seg(t, 14.0, 14.5));
    ST.forEach(([a, , x], k) => { R.place(this.s[k], x, lerp(100, 86, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - rowOut)); this.s[k].classList.toggle('on', t > a && t < (ST[k + 1] ? ST[k + 1][0] : 14.0)); });
    // listen to it now, or not: she looks at it, then past it
    R.place(this.q, 540, lerp(100, 86, eo(seg(t, 14.6, 15.1))), eo(seg(t, 14.6, 15.1)));
    const toIt = eio(seg(t, 15.6, 16.2)) * (1 - eio(seg(t, 16.9, 17.4))), away = eio(seg(t, 17.0, 17.6));
    this.to.style.opacity = toIt > 0.02 ? toIt : 0; this.to.style.strokeDashoffset = (-t * 0.05).toFixed(3);
    this.off.style.opacity = away > 0.02 ? away : 0; this.off.style.strokeDashoffset = (-t * 0.05).toFixed(3);
    const turn = t < 15 ? 6 * (1 - back) + 3 : 6 * toIt - 8 * away;
    this.head.setAttribute('transform', 'rotate(' + turn + ' 0 30)');
    R.look(this.eyes, t, 1.0, t < 15 ? 0 : 3 * toIt - 3 * away, 0);
    this.mouth.setAttribute('d', back > 0.5 ? 'M-10 26 Q2 31 14 26' : 'M-10 28 Q2 26 14 28');
  },
});
