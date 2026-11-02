const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-posture', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="mp-room">' + R.room({ shoes: false }) + R.seated('mp', 0) + '</g>' +
      '<g class="mp-top" opacity="0">' + R.lying('mpl') + '</g><rect class="mp-veil" width="1080" height="1080" style="fill:var(--ground);opacity:0"/></svg>' +
      '<div class="tag tag-cool mp-before">כמה דברים לפני שמתחילים</div><div class="tag mp-sit">בישיבה</div><div class="tag mp-lie">או בשכיבה</div><div class="tag tag-warm mp-comf">באיזו תנוחה שנוחה לכם</div>' +
      '<div class="tag tag-warm mp-eyes">בעיניים פקוחות או עצומות</div></div>'));
    Object.assign(this, R.refs(kit, 'mp', ['room', 'body', 'eyes', 'mouth', 'top', 'veil', 'before', 'sit', 'lie', 'comf']));
    this.te = kit.stage.querySelector('.mpl-eyes'); this.et = kit.stage.querySelector('.mp-eyes.tag') || kit.stage.querySelectorAll('.mp-eyes')[1];
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.before, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 4.6, 5.0))));
    R.place(this.sit, 830, lerp(412, 400, eo(seg(t, 5.0, 5.4))), eo(seg(t, 5.0, 5.4)) * (1 - eo(seg(t, 5.8, 6.1))));
    // or lying down, seen from above
    const v = Math.sin(Math.PI * seg(t, 5.6, 6.4)), top = t > 6.0;
    this.veil.style.opacity = v; this.top.setAttribute('opacity', top ? 1 : 0); this.room.setAttribute('opacity', top ? 0 : 1);
    R.place(this.lie, 540, lerp(84, 70, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)) * (1 - eo(seg(t, 8.0, 8.3))));
    R.place(this.comf, 540, lerp(940, 928, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)) * (1 - eo(seg(t, 8.0, 8.3))));
    // eyes open... or closed
    if (t > 9.4) this.te.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.te, t, 1.0);
    R.place(this.et, 540, lerp(84, 70, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)));
  },
});
