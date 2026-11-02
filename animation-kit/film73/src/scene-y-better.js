const { seg, eo, eio, eob, lerp } = kit;
// when we do something meaningful to us, it can help us feel better and also function better
kit.scene('y-better', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.openDoor('yb-od') +
      '<g class="yb-f"><g class="yb-fa">' + R.friend('yb-fr', 'a', 'stand') + '</g><g class="yb-fb">' + R.friend('yb-fr2', 'a', 'step') + '</g></g>' +
      '<g class="yb-r"><g class="yb-ra">' + R.ruth('yb', 'stand') + '</g><g class="yb-rb">' + R.ruth('yb2', 'step') + '</g></g>' +
      '<g class="yb-bd">' + R.matter('yb-m', 0, 70) + '</g></svg>' +
      '<div class="tag tag-cool yb-a">משהו משמעותי עבורנו</div><div class="tag tag-warm yb-b">להרגיש טוב יותר</div><div class="tag tag-warm yb-c">לתפקד טוב יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'yb', ['od', 'f', 'fa', 'fb', 'r', 'ra', 'rb', 'eyes', 'mouth', 'head', 'bd', 'm-glow', 'a', 'b', 'c']));
    this.fe = R.refs(kit, 'yb-fr', ['eyes', 'mouth']);
  },
  render(t) {
    this.od.setAttribute('opacity', eo(seg(t, 0.2, 0.8)));
    // her friend comes in through the door
    const fw = eio(seg(t, 0.8, 2.2)), fs = t > 0.8 && t < 2.2 ? Math.floor(t * 4) % 2 : 0;
    this.fa.style.opacity = fs ? 0 : 1; this.fb.style.opacity = fs ? 1 : 0;
    this.f.setAttribute('transform', 'translate(' + lerp(915, 740, fw) + ' 950) scale(-.9 .9)');
    R.blink(this.fe.eyes, t, 1.2); this.fe.mouth.setAttribute('d', R.BIG);
    // Ruth walks over to meet her, steady on her feet
    const rw = eio(seg(t, 6.0, 7.2)), rs = t > 6.0 && t < 7.2 ? Math.floor(t * 4) % 2 : 0;
    this.ra.style.opacity = rs ? 0 : 1; this.rb.style.opacity = rs ? 1 : 0;
    this.r.setAttribute('transform', 'translate(' + lerp(330, 500, rw) + ' 960) scale(.95)');
    R.look(this.eyes, t, 0.5, 4, 0); this.mouth.setAttribute('d', t > 4.5 ? R.BIG : R.SMILE);
    this.head.setAttribute('transform', 'rotate(' + (t > 4.7 ? 4 * Math.sin((t - 4.7) * 2.5) : 0) + ' 0 30)');
    const b = eob(seg(t, 2.1, 2.7), 1.6);
    this.bd.setAttribute('transform', 'translate(' + lerp(560, 620, rw) + ' ' + (250 + 6 * Math.sin(t * 1.5)) + ') scale(' + Math.max(0.001, b) + ')');
    this['m-glow'].setAttribute('opacity', 0.5 * eo(seg(t, 4.6, 5.4)));
    R.place(this.a, 600, lerp(392, 380, eo(seg(t, 2.18, 2.6))), eo(seg(t, 2.18, 2.6)));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.7, 5.1))), eo(seg(t, 4.7, 5.1)));
    R.place(this.c, 540, lerp(164, 150, eo(seg(t, 6.18, 6.6))), eo(seg(t, 6.18, 6.6)));
  },
});
