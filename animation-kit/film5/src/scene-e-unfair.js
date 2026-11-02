const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-unfair', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('eu') + '<g transform="translate(300 980)">' + R.ruth('eu', 'stand') + '</g>' +
      '<g transform="translate(300 380) scale(.62)">' + R.battery('eu') + '</g><g class="eu-p0">' + R.friend('eu-p0', 'g') + '</g><g class="eu-p1">' + R.friend('eu-p1', 'g', 'step') + '</g></svg>' +
      '<div class="tag eu-a">זה יכול לתסכל</div><div class="tag tag-cool eu-b">אנשים סביבכם לא צריכים לנהל</div><div class="tag tag-warm eu-c">זה יכול להרגיש לא הוגן</div></div>'));
    Object.assign(this, R.refs(kit, 'eu', ['head', 'eyes', 'mouth', 'fill', 'p0', 'p1', 'a', 'b', 'c']));
    this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
  },
  render(t) {
    R.blink(this.eyes, t, 1.2);
    R.setBattery(this.fill, 0.34 + 0.02 * Math.sin(t));
    // others pass by with no battery to watch
    const x0 = lerp(1260, 560, eio(seg(t, 7.0, 12.0))), x1 = lerp(1500, 760, eio(seg(t, 8.5, 13.5)));
    this.p0.setAttribute('transform', 'translate(' + x0 + ' ' + (976 + Math.abs(Math.sin(t * 6)) * -5) + ') scale(.95)');
    this.p1.setAttribute('transform', 'translate(' + x1 + ' ' + (976 + Math.abs(Math.sin(t * 6 + 1)) * -5) + ') scale(.9)');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 9.0, 10.0))) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)) * (1 - eo(seg(t, 9.6, 9.9))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 9.8, 10.3))), eo(seg(t, 9.8, 10.3)) * (1 - eo(seg(t, 15.2, 15.5))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 15.5, 16.0))), eo(seg(t, 15.5, 16.0)));
  },
});