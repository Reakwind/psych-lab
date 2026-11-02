const { seg, eo, eio, eob, lerp } = kit;
kit.scene('h-self', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hs', -160) +
      '<g class="hs-cl">' + R.rain('hs-r') + '</g><g class="hs-vg">' + R.voice('hs-v') + '</g></svg>' +
      '<div class="tag tag-cool hs-a">כשאנחנו בעצמנו מתקשים</div><div class="tag hs-b">מילים אחרות לגמרי</div>' +
      '<div class="thought heavy hs-q" style="width:720px">"למה אני עושה מזה כזה עניין, מה לא בסדר איתי?"</div></div>'));
    Object.assign(this, R.refs(kit, 'hs', ['body', 'head', 'eyes', 'mouth', 'cl', 'vg', 'a', 'b', 'q']));
    this.v = R.refs(kit, 'hs-v', ['eyes', 'mouth']); this.dr = kit.stage.querySelector('.hs-r-drops');
    this.v.mouth.setAttribute('d', 'M-2 10 Q10 2 22 10');
  },
  render(t) {
    R.blink(this.eyes, t, 0.7); R.blink(this.v.eyes, t, 1.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // now the rain cloud is over Ruth herself
    R.xf(this.cl, 340 + Math.sin(t * 0.8) * 10, 330, 0.85 * eob(seg(t, 0.5, 1.1), 1.4), eo(seg(t, 0.5, 0.7)));
    this.dr.style.strokeDashoffset = -t * 60;
    // and her inner voice comes out harsh
    R.xf(this.vg, 790, 470 + Math.sin(t * 2.2) * 8, 1.55 * eob(seg(t, 2.2, 2.8), 1.6), eo(seg(t, 2.2, 2.4)));
    const q = eio(seg(t, 4.4, 5.0));
    R.put(this.q, 600, lerp(120, 190, q), lerp(0.9, 1, eob(seg(t, 4.4, 5.0), 1.4)), lerp(-3, 1, q), eo(seg(t, 4.4, 4.6)));
    const sag = eio(seg(t, 1.0, 2.0)) * 0.4 + 0.6 * eio(seg(t, 5.0, 6.2));
    this.head.setAttribute('transform', 'rotate(' + (-5 * sag) + ' 0 30) translate(0 ' + 12 * sag + ')');
    this.mouth.setAttribute('d', sag > 0.3 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 4.1, 4.4))));
    R.place(this.b, 790, lerp(652, 640, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
  },
});
