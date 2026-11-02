const { seg, eo, eio, eob, lerp } = kit;
// she remembers what she said to her friend, and says it to herself
kit.scene('h-dear', {
  init(kit) {
    const bust = '<clipPath id="hr-bc"><rect x="-170" y="-120" width="340" height="208"/></clipPath><g clip-path="url(#hr-bc)"><g transform="translate(-20 190) scale(.5)">' + R.friend('hr-f', 'a') + '</g></g>' +
      '<g transform="translate(96 -20)"><path class="amber-dk" d="M0 30 C-48 2 -32 -40 0 -16 C32 -40 48 2 0 30Z"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hr', -160) +
      '<g class="hr-mem">' + R.memory('hr-m', bust) + '</g><g class="hr-vg">' + R.voice('hr-v') + '</g></svg>' +
      '<div class="thought sm warm hr-w" style="width:380px">"זה באמת לא פשוט"</div><div class="tag tag-cool hr-a">כמו שהיינו פונים לאדם שיקר לליבנו</div>' +
      '<div class="tag tag-warm hr-t0">חמלה</div><div class="tag tag-warm hr-t1">רכות</div><div class="tag tag-warm hr-t2">הבנה</div></div>'));
    Object.assign(this, R.refs(kit, 'hr', ['body', 'head', 'eyes', 'mouth', 'mem', 'vg', 'w', 'a', 't0', 't1', 't2']));
    this.v = R.refs(kit, 'hr-v', ['grey', 'warm', 'eyes', 'mouth']); this.fm = kit.stage.querySelector('.hr-f-mouth');
    this.fm.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.2); R.blink(this.v.eyes, t, 1.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the memory of her friend, and the words she gave her
    const mem = eob(seg(t, 2.0, 2.6), 1.4), memOut = eio(seg(t, 5.6, 6.4));
    R.xf(this.mem, 740, 250 + Math.sin(t * 1.4) * 6, 0.95 * mem * (1 - 0.2 * memOut), eo(seg(t, 2.0, 2.2)) * (1 - memOut));
    const fly = eio(seg(t, 3.2, 4.6));
    R.put(this.w, lerp(720, 470, fly), lerp(250, 360, fly) - Math.sin(Math.PI * fly) * 80, lerp(0.6, 1, fly), lerp(4, -3, fly), eo(seg(t, 3.0, 3.3)));
    // now turned toward herself: the voice warms
    const w = eio(seg(t, 4.4, 5.2));
    this.v.warm.setAttribute('opacity', w); this.v.grey.setAttribute('opacity', 1 - w);
    this.v.mouth.setAttribute('d', w > 0.5 ? 'M-6 2 Q10 16 26 2' : 'M-2 6 Q10 8 22 6');
    R.xf(this.vg, 790, 520 + Math.sin(t * 2.2) * 8, 1.55 + 0.1 * Math.sin(Math.PI * seg(t, 4.4, 5.4)), 1);
    this.head.setAttribute('transform', 'rotate(' + (9 - 9 * eio(seg(t, 3.6, 4.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.8 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 5.8, 6.2))));
    [6.8, 7.3, 7.7].forEach((a, k) => R.place(this['t' + k], [860, 640, 420][k], lerp(84, 70, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
