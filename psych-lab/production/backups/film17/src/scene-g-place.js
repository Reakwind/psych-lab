const { seg, eo, eio, eob, lerp } = kit;
// sometimes imagination: a pleasant place opens in a bubble over her head, and its warmth reaches her
kit.scene('g-place', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g6', -200) + '<circle class="g6-gl" cx="300" cy="620" r="240" style="fill:var(--accent);opacity:0"/>' + R.imgBubble('g6b') + '</svg>' +
      '<div class="tag tag-cool g6-a">לפעמים נשתמש גם בדמיון</div><div class="tag tag-warm g6-b">נחשוב על מקום נעים</div><div class="tag g6-c">נתחבר לתחושות שקשורות אליו</div><div class="tag tag-red g6-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g6', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'gl', 'a', 'b', 'c', 'ml']));
    this.bg = kit.stage.querySelector('.g6b'); this.bb = R.bubRefs(kit, 'g6b');
  },
  render(t) {
    this.tn.style.opacity = 0;
    if (t > 5.4) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    R.setBub(this.bb, this.bg, 620, 280, eo(seg(t, 1.5, 2.4)), 1, 0, lerp(10, 0, eio(seg(t, 3.0, 4.4))));
    this.bb.sun.setAttribute('r', 30 + 4 * Math.sin(t * 2));
    this.gl.style.opacity = 0.18 * eo(seg(t, 5.0, 6.0)) * (0.8 + 0.2 * Math.sin(t * 1.5));
    R.setMeter(this['mt-fill'], lerp(0.28, 0.2, eio(seg(t, 5.0, 7.0))));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 1.6, 2.4)) + 8 * eio(seg(t, 5.0, 6.0))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)) * (1 - eo(seg(t, 3.8, 4.1))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.06, 4.4))), eo(seg(t, 4.06, 4.4)));
    R.place(this.c, 680, lerp(472, 460, eo(seg(t, 5.02, 5.4))), eo(seg(t, 5.02, 5.4)));
    R.place(this.ml, 975, 886, 1);
  },
});
