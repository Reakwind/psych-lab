const { seg, eo, eio, eob, lerp } = kit;
// closer: too strong, too many exclamation marks, sounding like orders — just noticing that is a lot
kit.scene('f-marks', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="fm-cam">' + R.room({}) + R.seated('fm', 0) + '</g></svg>' + R.loud('fm', 'lg') +
      '<div class="tag tag-warm fm-a">יותר מדי סימני קריאה</div><div class="tag fm-b">כמו פקודות</div><div class="tag tag-cool fm-d">רק לשים לב – זה כבר המון</div></div>'));
    Object.assign(this, R.refs(kit, 'fm', ['cam', 'body', 'head', 'eyes', 'mouth', 'c', 'bang', 'a', 'b', 'd']));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // push in on Ruth and the thought above her
    const z = eio(seg(t, 0, 2.2));
    this.cam.setAttribute('transform', 'translate(520 700) scale(' + lerp(1, 1.3, z) + ') translate(-520 -700)');
    // stronger and louder
    const strong = eo(seg(t, 4.6, 5.4)), sh = 3 + 4 * strong * (1 - eo(seg(t, 10.6, 11.6)));
    const pulse = 1 + 0.05 * Math.sin(Math.PI * seg(t, 4.7, 5.3));
    R.put(this.c, 540 + Math.sin(t * 31) * sh, lerp(260, 250, z) + Math.cos(t * 27) * sh * 0.6, lerp(0.68, 0.84, z) * pulse, Math.sin(t * 23) * sh * 0.3, 1);
    // the exclamation marks get circled
    this.bang.style.setProperty('--ring', eob(seg(t, 6.3, 6.8), 1.6));
    R.place(this.a, 300, lerp(102, 90, eo(seg(t, 6.5, 7.0))), eo(seg(t, 6.5, 7.0)));
    // and it reads like an order
    R.place(this.b, 790, lerp(102, 90, eo(seg(t, 9.4, 9.9))), eo(seg(t, 9.4, 9.9)));
    R.place(this.d, 540, lerp(968, 956, eo(seg(t, 10.6, 11.1))), eo(seg(t, 10.6, 11.1)));
    const look = eio(seg(t, 6.0, 7.0));
    this.head.setAttribute('transform', 'rotate(' + (-5 * look) + ' 0 30)');
    R.look(this.eyes, t, 1.1, 2 * look, -4 * look);
    this.mouth.setAttribute('d', 'M-10 28 Q2 ' + lerp(24, 28, eo(seg(t, 10.8, 11.6))) + ' 14 28');
  },
});
