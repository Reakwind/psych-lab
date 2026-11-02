const { seg, eo, eio, eob, lerp } = kit;
// turned on what she feels inside, the same shove does the opposite: the feeling swells
kit.scene('m-backfire', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomStand('m13', 560) + '<g class="m13-fw">' + R.feel('m13-f') + '</g></svg>' +
      '<div class="tag tag-warm m13-p">המאמץ לשנות אותה יכול לעזור</div><div class="tag m13-a">כלפי מה שאנחנו מרגישים בפנים</div><div class="tag tag-warm m13-b">ומנסים בכוח לגרום לו להיעלם</div><div class="tag tag-red m13-c">קורה לפעמים ההפך</div></div>'));
    Object.assign(this, R.refs(kit, 'm13', ['eyes', 'head', 'mouth', 'armL', 'tn', 'fw', 'p', 'a', 'b', 'c']));
    this.sw = R.swRefs(kit, 'm13-sw');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the feeling rises out of her chest and hangs beside her; she shoves; it grows
    const out = eio(seg(t, 3.9, 5.0)), push = eio(seg(t, 5.2, 5.6)), shove = push * Math.sin(t * 16) * 5, swell = eob(seg(t, 7.7, 8.7), 1.3);
    R.setSwitch(this.sw, push > 0.3 ? 1 : 0);
    R.setG(this.fw, lerp(560, 320, out) + shove * 0.4, lerp(700, 430, out) + Math.sin(t * 1.3) * 6, lerp(0.3, 0.9, out) + 0.12 * eio(seg(t, 6.2, 7.0)) + 0.55 * swell, eo(seg(t, 3.9, 4.3)));
    this.armL.setAttribute('transform', 'rotate(' + (125 * push + shove) + ' -52 -326)');
    this.tn.style.opacity = push * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.head.setAttribute('transform', 'rotate(' + (6 * out) + ' 0 30)');
    this.mouth.setAttribute('d', swell > 0.3 ? R.mouthO : push > 0.5 ? R.mouthFlat : R.mouthNeutral);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 4.38, 4.7))), eo(seg(t, 4.38, 4.7)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.37, 5.7))), eo(seg(t, 5.37, 5.7)));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 7.79, 8.1))), eo(seg(t, 7.79, 8.1)));
  },
});
