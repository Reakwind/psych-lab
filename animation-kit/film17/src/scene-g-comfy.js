const { seg, eo, eio, eob, lerp } = kit;
// how we'll practise: comfortable any way — sitting supported, leaning back, or lying down with a cushion and a blanket, eyes closed or open
kit.scene('g-comfy', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="g12-rm">' + R.roomSeat('g12', -200, false) + '<circle class="g12-sp" cx="300" cy="640" r="230" style="fill:var(--main);opacity:0"/></g>' +
      '<g class="g12-ly">' + R.lying('g12l') + '<g class="g12-bk" transform="translate(860 540)">' + R.blanket('g12-bl') + '</g></g></svg>' +
      '<div class="tag tag-cool g12-a">קודם כל תעשו שיהיה לכם נוח</div><div class="tag g12-b">לשבת עם תמיכה</div><div class="tag tag-warm g12-c">להישען לאחור</div><div class="tag tag-cool g12-d">או לשכב</div>' +
      '<div class="tag tag-warm g12-e">כרית או שמיכה</div><div class="tag g12-f">לעצום עיניים</div><div class="tag tag-cool g12-g">או להשאיר אותן פקוחות</div><div class="tag tag-warm g12-h">מה שמרגיש הכי נגיש וקל</div></div>'));
    Object.assign(this, R.refs(kit, 'g12', ['rm', 'sp', 'body', 'eyes', 'head', 'mouth', 'tn', 'ly', 'bk', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']));
    this.l = R.refs(kit, 'g12l', ['eyes', 'mouth', 'armR', 'cushion']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    const lean = eio(seg(t, 7.6, 8.4)), lie = eio(seg(t, 8.9, 9.7));
    this.sp.style.opacity = 0.14 * Math.sin(Math.PI * seg(t, 6.4, 7.8));
    this.body.setAttribute('transform', 'rotate(' + (-7 * lean) + ' 0 0) scale(1 ' + kit.breathe(t, 0.014, 4.2) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 * lean) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    this.rm.style.opacity = 1 - lie; this.ly.style.opacity = lie;
    // on the mat: the cushion plumps up, the blanket slides over her legs, eyes close, then open
    const cu = Math.sin(Math.PI * seg(t, 10.9, 11.5));
    this.l.cushion.setAttribute('transform', 'translate(226 540) scale(' + (1 + 0.12 * cu) + ') translate(-226 -540)');
    this.bk.setAttribute('transform', 'translate(' + lerp(1200, 640, eio(seg(t, 11.5, 12.3))) + ' 540)');
    if (t > 12.13 && t < 14.3) this.l.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.l.eyes, t, 0.3);
    R.handOn(this.l.armR, 0.6, 0.3 + 0.3 * Math.sin(t * 1.4));
    this.l.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.61, 3.0))), eo(seg(t, 2.61, 3.0)) * (1 - eo(seg(t, 8.7, 9.0))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 6.3, 6.6))), eo(seg(t, 6.3, 6.6)) * (1 - eo(seg(t, 8.7, 9.0))));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 7.6, 7.9))), eo(seg(t, 7.6, 7.9)) * (1 - eo(seg(t, 8.7, 9.0))));
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 8.93, 9.3))), eo(seg(t, 8.93, 9.3)) * (1 - eo(seg(t, 14.9, 15.2))));
    R.place(this.e, 540, lerp(124, 112, eo(seg(t, 10.97, 11.3))), eo(seg(t, 10.97, 11.3)) * (1 - eo(seg(t, 14.9, 15.2))));
    R.place(this.f, 540, lerp(952, 940, eo(seg(t, 12.13, 12.5))), eo(seg(t, 12.13, 12.5)) * (1 - eo(seg(t, 14.0, 14.3))));
    R.place(this.g, 540, lerp(952, 940, eo(seg(t, 14.3, 14.6))), eo(seg(t, 14.3, 14.6)));
    R.place(this.h, 540, lerp(54, 40, eo(seg(t, 15.2, 15.6))), eo(seg(t, 15.2, 15.6)));
  },
});
