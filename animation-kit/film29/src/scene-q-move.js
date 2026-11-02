const { seg, eo, eio, eob, lerp } = kit;
// part 15: no need to sit still — a tremor, a restless foot, all inside the circle of attention; if she needs to move to be comfortable, she moves
kit.scene('q-move', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + '<g class="q8-ring">' + R.attn('q8') + '</g>' + R.seated('q8', -60) +
      '<g class="q8-tg">' + R.tremor('q8') + '</g><g class="q8-ft"><path class="ink" style="stroke-width:6" d="M0 -26 q12 -10 24 0 M0 26 q12 10 24 0"/></g></svg>' +
      '<div class="tag tag-cool q8-still">לא צריך לשבת בלי לזוז</div><div class="tag q8-part">גם התנועתיות של הגוף היא חלק ממה שקורה כרגע</div>' +
      '<div class="tag tag-warm q8-move">ואם צריך לזוז כדי שיהיה נוח יותר, זזים</div></div>'));
    Object.assign(this, R.refs(kit, 'q8', ['ring', 'body', 'head', 'eyes', 'mouth', 'tg', 'ft', 'still', 'part', 'move']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    const ring = eo(seg(t, 0.2, 1.0));
    this.ring.setAttribute('transform', 'translate(440 600) scale(' + lerp(300, 340, ring) + ')'); this.ring.style.opacity = ring;
    // a tremor and a restless foot, shown, not hidden
    const a = eo(seg(t, 3.2, 3.7)), b = eo(seg(t, 4.2, 4.7)), off = 1 - eo(seg(t, 10.6, 11.4));
    this.tg.style.opacity = a * off; this.tg.setAttribute('transform', 'translate(' + (496 + Math.sin(t * 40) * 3) + ' 700)');
    this.ft.style.opacity = b * off; this.ft.setAttribute('transform', 'translate(' + (612 + Math.sin(t * 7) * 6) + ' 860)');
    // she shifts, wriggles a little, and settles more comfortably
    const sh = eio(seg(t, 8.0, 9.4)), wob = Math.sin(Math.PI * seg(t, 8.0, 9.4)) * Math.sin(t * 9);
    this.body.setAttribute('transform', 'translate(' + (-14 * sh) + ' ' + (4 * sh) + ') rotate(' + (3 * wob - 3 * sh) + ') scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (4 * sh) + ' 0 30)');
    this.mouth.setAttribute('d', t > 9.6 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.still, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.part, 540, lerp(952, 940, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.move, 540, lerp(84, 70, eo(seg(t, 7.9, 8.4))), eo(seg(t, 7.9, 8.4)));
  },
});
