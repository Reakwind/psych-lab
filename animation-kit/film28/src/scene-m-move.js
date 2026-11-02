const { seg, eo, eio, eob, lerp } = kit;
// parts 17–18; part 18 starts at 9.27
const P = 9.27;
kit.scene('m-move', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.overhead('mv') + '<g class="mv-ring">' + R.attn('mv') + '</g>' +
      '<g class="mv-me"><g transform="translate(770 540) scale(1.25)">' + R.ruthTop('mv') + '</g></g>' +
      '<g class="mv-tg">' + R.tremor('mv') + '</g><g class="mv-ft"><path class="ink" style="stroke-width:6" d="M0 -30 q12 -10 24 0 M0 30 q12 10 24 0"/></g>' +
      '<g class="mv-sw"><path class="ink" style="stroke:var(--accent);stroke-width:7" d="M-8 -30 q16 15 0 30 q-16 15 0 30"/></g></svg>' +
      '<div class="tag tag-cool mv-still">לא צריך להישאר בלי לזוז</div><div class="tag mv-t0">רעד</div><div class="tag mv-t1">תנועות לא רצוניות</div><div class="tag mv-t2">בליעה</div>' +
      '<div class="tag tag-warm mv-part">גם הם חלק מהתרגול</div><div class="tag tag-cool mv-ok">צריך לזוז? אפשר ומומלץ</div><div class="tag tag-warm mv-listen">מקשיבים לגוף ועושים התאמות</div></div>'));
    Object.assign(this, R.refs(kit, 'mv', ['ring', 'me', 'eyes', 'mouth', 'tg', 'ft', 'sw', 'still', 't0', 't1', 't2', 'part', 'ok', 'listen']));
    this.cu = kit.stage.querySelector('.mv-cushion');
    this.ring.setAttribute('transform', 'translate(500 540) scale(470)'); this.ring.style.opacity = 0.8;
  },
  render(t) {
    if (t > P + 1.0 && t < P + 2.6) R.blink(this.eyes, t, 0); else this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    R.place(this.still, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)) * (1 - eo(seg(t, P - 0.4, P - 0.1))));
    // tremor, an involuntary movement, a swallow: all inside the circle
    const a = eo(seg(t, 4.0, 4.4)), b = eo(seg(t, 4.6, 5.0)), c = eo(seg(t, 6.0, 6.4)), off = 1 - eo(seg(t, P + 6, P + 7));
    this.tg.style.opacity = a * off; this.tg.setAttribute('transform', 'translate(' + (548 + Math.sin(t * 40) * 3) + ' 430) rotate(-90)');
    this.ft.style.opacity = b * off; this.ft.setAttribute('transform', 'translate(' + (830 + Math.sin(t * 7) * 6) + ' 540)');
    this.sw.style.opacity = c * Math.abs(Math.sin(t * 1.8)) * off; this.sw.setAttribute('transform', 'translate(330 ' + (520 + 10 * Math.sin(t * 3.6)) + ')');
    R.place(this.t0, 548, lerp(232, 220, a), a * (1 - eo(seg(t, P - 0.4, P - 0.1))));
    R.place(this.t1, 860, lerp(712, 700, b), b * (1 - eo(seg(t, P - 0.4, P - 0.1))));
    R.place(this.t2, 300, lerp(772, 760, c), c * (1 - eo(seg(t, P - 0.4, P - 0.1))));
    R.place(this.part, 540, lerp(940, 928, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)) * (1 - eo(seg(t, P - 0.4, P - 0.1))));
    // if she needs to move, she does: a small shift to a more comfortable position
    const sh = eio(seg(t, P + 1.2, P + 2.6));
    this.me.setAttribute('transform', 'translate(' + 30 * sh + ' ' + (-24 * sh) + ') rotate(' + (-4 * sh) + ' 540 540)');
    const cb = 1 + 0.1 * Math.sin(Math.PI * seg(t, P + 1.6, P + 2.4));
    this.cu.setAttribute('transform', 'translate(226 540) scale(' + cb + ') translate(-226 -540)');
    R.place(this.ok, 540, lerp(84, 70, eo(seg(t, P + 0.9, P + 1.4))), eo(seg(t, P + 0.9, P + 1.4)));
    R.place(this.listen, 540, lerp(940, 928, eo(seg(t, P + 5.2, P + 5.7))), eo(seg(t, P + 5.2, P + 5.7)));
    this.mouth.setAttribute('d', t > P + 2.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
