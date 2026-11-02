const { seg, eo, eio, eob, lerp } = kit;
kit.scene('h-meet', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hm', -160) +
      '<g class="hm-ph"><g transform="scale(1.7)">' + R.phone('hm-p', 0, 0, 'ariel') + '</g></g>' +
      '<g class="hm-cl">' + R.rain('hm-r') + '</g><g class="hm-vg">' + R.voice('hm-v') + '</g></svg>' +
      '<div class="tag tag-cool hm-a">נעצור לרגע</div><div class="tag tag-warm hm-b">לפגוש את עצמנו קצת אחרת</div></div>'));
    Object.assign(this, R.refs(kit, 'hm', ['body', 'head', 'eyes', 'mouth', 'ph', 'cl', 'vg', 'a', 'b']));
    this.v = R.refs(kit, 'hm-v', ['eyes', 'mouth']); this.dr = kit.stage.querySelector('.hm-r-drops');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9); R.blink(this.v.eyes, t, 2.0);
    // a slow breath
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 3.2) + ')');
    // Ariel on her phone: the practice
    R.xf(this.ph, 360, lerp(760, 690, eio(seg(t, 0.2, 0.8))), eob(seg(t, 0.2, 0.8), 1.4), eo(seg(t, 0.2, 0.4)));
    // the cloud clears as she pauses
    const clear = eio(seg(t, 1.3, 2.4));
    R.xf(this.cl, 340 + Math.sin(t * 0.8) * 10, 330 - 60 * clear, 0.85, 1 - clear); this.dr.style.strokeDashoffset = -t * 60;
    // she turns toward her inner voice, and it softens
    const turn = eio(seg(t, 2.9, 3.7));
    R.xf(this.vg, 790, 470 + Math.sin(t * 2.2) * 8, 1.55, 1);
    this.v.mouth.setAttribute('d', turn > 0.5 ? 'M-2 6 Q10 10 22 6' : clear > 0.5 ? 'M-2 6 Q10 6 22 6' : 'M-2 10 Q10 2 22 10');
    this.head.setAttribute('transform', 'rotate(' + lerp(-5 * (1 - clear), 9, turn) + ' 0 30) translate(0 ' + 12 * (1 - clear) + ')');
    this.mouth.setAttribute('d', turn > 0.5 ? 'M-10 26 Q2 32 14 26' : clear > 0.5 ? 'M-10 28 Q2 28 14 28' : 'M-10 30 Q2 24 14 30');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.3, 1.8))), eo(seg(t, 1.3, 1.8)));
    R.place(this.b, 790, lerp(652, 640, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)));
  },
});
