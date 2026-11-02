const { seg, eo, eio, eob, lerp } = kit;
// brain and body respond not only to what happens around us (the window) but also to what we imagine (the bubble)
kit.scene('g-chain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g8', -200) + '<circle class="g8-hg" cx="300" cy="520" r="80" style="fill:var(--accent);opacity:0"/><circle class="g8-bg2" cx="300" cy="660" r="130" style="fill:var(--main);opacity:0"/>' +
      '<path class="g8-w" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-dasharray:1 1" d="M200 440 C230 460 250 470 262 482"/>' +
      '<path class="g8-i" pathLength="1" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round;stroke-dasharray:1 1" d="M400 400 C380 430 360 450 345 470"/>' + R.imgBubble('g8b') + '</svg>' +
      '<div class="tag tag-cool g8-a">המוח והגוף מגיבים</div><div class="tag g8-b">לא רק למה שקורה סביבנו</div><div class="tag tag-warm g8-c">גם למה שאנחנו מעלים בדמיון</div><div class="tag tag-red g8-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g8', ['body', 'eyes', 'head', 'mouth', 'tn', 'mt-fill', 'hg', 'bg2', 'w', 'i', 'a', 'b', 'c', 'ml']));
    this.bg = kit.stage.querySelector('.g8b'); this.bb = R.bubRefs(kit, 'g8b');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    R.setMeter(this['mt-fill'], 0.2);
    // the bubble from before shrinks to wait; a light from the window reaches her head, then the body glows
    R.setBub(this.bb, this.bg, 620, 280, 1, lerp(1, 0.8, eio(seg(t, 0.2, 1.2))), 0, 0);
    const hg = Math.max(Math.sin(Math.PI * seg(t, 3.2, 5.2)), Math.sin(Math.PI * seg(t, 8.4, 9.7)));
    this.hg.style.opacity = 0.35 * hg; this.bg2.style.opacity = 0.2 * Math.max(Math.sin(Math.PI * seg(t, 4.0, 6.0)), Math.sin(Math.PI * seg(t, 8.8, 9.71)));
    R.drawOn(this.w, eio(seg(t, 5.8, 6.4)) * (1 - eo(seg(t, 7.6, 8.0))));
    R.drawOn(this.i, eio(seg(t, 8.2, 8.7)));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (t < 7 ? -6 : 6) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.18, 3.5))), eo(seg(t, 3.18, 3.5)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.82, 6.1))), eo(seg(t, 5.82, 6.1)) * (1 - eo(seg(t, 8.0, 8.3))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 8.31, 8.6))), eo(seg(t, 8.31, 8.6)));
    R.place(this.ml, 975, 886, 1);
  },
});
