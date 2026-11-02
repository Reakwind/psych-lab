const { seg, eo, eio, eob, lerp } = kit;
const SHOE = '<g transform="translate(-6 18) scale(1.7)"><path class="slate-dk" d="M-30 0 q0 -26 22 -28 q14 0 18 12 l20 6 q10 4 8 10 Z"/><rect class="light" opacity=".5" x="-24" y="-3" width="56" height="3"/></g>';
kit.scene('j-remind', {
  init(kit) {
    const grey = R.sayBubble('j3-gb', SHOE).replace('fill:color-mix(in srgb, var(--ground) 40%, white)', 'fill:color-mix(in srgb, var(--second) 34%, var(--ground))');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.doorOpen('j3-open') + '<g class="j3-sit">' + R.seated('j3', -200) + '</g>' +
      '<g class="j3-st">' + R.ruth('j3s', 'stand') + '</g><g class="j3-bw">' + R.sayBubble('j3-bb', SHOE) + '</g><g class="j3-gw">' + grey + '</g></svg>' +
      '<div class="tag tag-cool j3-a">תזכורת לצאת להליכה</div><div class="tag tag-warm j3-h">תעזור לכם להתחיל</div><div class="tag j3-p">תרגיש כמו לחץ</div></div>'));
    Object.assign(this, R.refs(kit, 'j3', ['open', 'sit', 'body', 'head', 'eyes', 'mouth', 'st', 'bw', 'gw', 'a', 'h', 'p']));
    this.s = R.refs(kit, 'j3s', ['eyes', 'mouth', 'head']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.s.eyes, t, 1.3);
    // a reminder to go for a walk: one time it helps her up and out of the door...
    const up = eio(seg(t, 2.6, 3.3)) * (1 - eio(seg(t, 3.9, 4.4)));
    this.open.setAttribute('opacity', up);
    this.sit.style.opacity = 1 - up; this.st.style.opacity = up;
    this.st.setAttribute('transform', 'translate(' + lerp(560, 690, up) + ' 980)');
    this.s.mouth.setAttribute('d', R.mouthHappy); this.s.head.setAttribute('transform', 'rotate(-6 0 30)');
    const pop = eob(seg(t, 0.6, 1.1), 1.6);
    // ...another time the same reminder turns grey and heavy and presses down on her
    const heavy = eio(seg(t, 4.3, 6.2));
    R.setG(this.bw, lerp(560, 520, heavy), lerp(300, 360, heavy) + Math.sin(t * 1.5) * 5 * (1 - heavy), pop * lerp(0.9, 1.35, heavy) * (1 - 0.5 * up), (1 - up) * (1 - heavy));
    R.setG(this.gw, lerp(560, 520, heavy), lerp(300, 360, heavy), pop * lerp(0.9, 1.35, heavy), heavy);
    this.body.setAttribute('transform', 'translate(0 ' + 10 * heavy + ') scale(1 ' + (1 - 0.03 * heavy) + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(6, -4, heavy) + ' 0 30) translate(0 ' + 8 * heavy + ')');
    this.mouth.setAttribute('d', heavy > 0.5 ? R.mouthSad : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.72, 1.1))), eo(seg(t, 0.72, 1.1)));
    R.place(this.h, 690, lerp(392, 380, eo(seg(t, 2.94, 3.3))), eo(seg(t, 2.94, 3.3)) * (1 - eo(seg(t, 3.9, 4.2))));
    R.place(this.p, 760, lerp(392, 380, eo(seg(t, 6.0, 6.4))), eo(seg(t, 6.0, 6.4)));
  },
});
