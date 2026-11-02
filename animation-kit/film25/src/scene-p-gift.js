const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-gift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pg') + '<g class="pg-bl">' + R.blanket('pg-b') + '</g><g class="pg-ring">' + R.attn('pg') + '</g>' +
      R.ribbon('pg-rb', 96, 316, 892, 448) + '</svg>' +
      '<div class="tag tag-cool pg-ta">כמה רגעים של תשומת לב</div><div class="tag pg-tb">תנאים תומכים</div><div class="tag tag-warm pg-tc">ודאגה לעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'pg', ['eyes', 'mouth', 'bl', 'ring', 'ta', 'tb', 'tc']));
    this.band = kit.stage.querySelector('.pg-rb-band'); this.bow = kit.stage.querySelector('.pg-rb-bow'); this.cu = kit.stage.querySelector('.pg-cushion');
    this.ring.setAttribute('transform', 'translate(500 540) scale(470)'); this.ring.style.opacity = 0.8;
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    // supportive conditions: a blanket, the cushion settles
    const bl = eio(seg(t, 3.4, 4.3));
    this.bl.setAttribute('transform', 'translate(' + lerp(1150, 640, bl) + ' 540)');
    const cb = 1 + 0.08 * Math.sin(Math.PI * seg(t, 3.6, 4.2));
    this.cu.setAttribute('transform', 'translate(226 540) scale(' + cb + ') translate(-226 -540)');
    // a few moments, tied up like a small gift
    this.band.style.strokeDasharray = eio(seg(t, 0.4, 2.6)) + ' 1'; this.band.style.opacity = t > 0.4 ? 1 : 0;
    const b = eob(seg(t, 4.6, 5.1), 1.8);
    this.bow.setAttribute('transform', 'translate(542 316) scale(' + b + ')');
    R.place(this.ta, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
    R.place(this.tb, 780, lerp(940, 928, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
    R.place(this.tc, 320, lerp(940, 928, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
  },
});
