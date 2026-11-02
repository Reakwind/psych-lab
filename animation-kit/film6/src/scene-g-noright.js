const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-noright', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<ellipse class="gr-chair" cx="520" cy="700" rx="250" ry="190" style="fill:var(--accent);opacity:0"/>' + R.seated('gr', 0) +
      '<g class="gr-marks"><path class="ink" style="stroke:#6FAE7A;stroke-width:14" d="M720 300 l24 24 l48 -56"/><path class="ink" style="stroke:#C0392B;stroke-width:14" d="M300 260 l60 60 M360 260 l-60 60"/></g></svg>' +
      '<div class="tag tag-cool gr-a">אין נכון או לא נכון</div><div class="tag gr-b">אין משהו מיוחד להרגיש</div><div class="tag tag-warm gr-c">פשוט שמים לב למה שיש</div></div>'));
    Object.assign(this, R.refs(kit, 'gr', ['chair', 'body', 'eyes', 'mouth', 'marks', 'a', 'b', 'c']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    if (t > 5.8) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    // no ticks, no crosses: just noticing
    this.marks.style.opacity = eo(seg(t, 0.6, 1.0)) * (1 - eo(seg(t, 1.9, 2.6)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 5.6, 6.0))));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 2.9, 3.4))), eo(seg(t, 2.9, 3.4)) * (1 - eo(seg(t, 5.6, 6.0))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 6.0, 6.5))), eo(seg(t, 6.0, 6.5)));
    this.chair.style.opacity = 0.2 * eo(seg(t, 6.0, 6.8));
  },
});
