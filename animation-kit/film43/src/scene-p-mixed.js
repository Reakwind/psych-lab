const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-mixed', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('px', -200) +
      '<g class="px-mem">' + R.memory('px-m', R.coffee('px-cf') + '<path class="px-wave" style="fill:none;stroke:#5B7FA8;stroke-width:12;stroke-linecap:round;opacity:0" d="' + R.wavePath(-150, 70, 300, 14, 2, 0) + '"/>') + '</g>' +
      '<g class="px-lens">' + R.lens('px-l') + '</g></svg>' +
      '<div class="tag px-a">עצב · געגוע · משהו אחר</div><div class="tag tag-cool px-b">וזה לגמרי חלק מהתרגול</div><div class="tag tag-warm px-c">העיקר זה החקירה</div></div>'));
    Object.assign(this, R.refs(kit, 'px', ['body', 'head', 'eyes', 'mouth', 'mem', 'wave', 'lens', 'a', 'b', 'c']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.mem.setAttribute('transform', 'translate(720 ' + (330 + Math.sin(t * 1.3) * 6) + ') scale(1.25)');
    // a pleasant memory can bring sadness or longing with it
    const blue = eio(seg(t, 4.3, 5.3));
    this.wave.style.opacity = blue; this.wave.setAttribute('d', R.wavePath(-150, 70, 300, 14, 2, t * 2));
    this.mouth.setAttribute('d', blue > 0.5 && t < 7.4 ? 'M-10 28 Q2 26 14 28' : 'M-12 24 Q2 36 16 24');
    this.head.setAttribute('transform', 'rotate(' + (-10 + 4 * blue * (1 - eio(seg(t, 7.2, 8.0)))) + ' 0 30)');
    R.place(this.a, 720, lerp(612, 600, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)) * (1 - eo(seg(t, 9.7, 10.0))));
    // what matters is the exploring
    const l = eio(seg(t, 9.6, 10.5));
    R.xf(this.lens, lerp(1000, 700 + Math.sin(t * 1.2) * 30, l), lerp(760, 340 + Math.cos(t * 1.5) * 20, l), 1.3, eo(seg(t, 9.6, 9.9)));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 10.0, 10.5))), eo(seg(t, 10.0, 10.5)));
  },
});
