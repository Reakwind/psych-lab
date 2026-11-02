const { seg, eo, eio, eob, lerp } = kit;
// every repetition: the supportive voice speaks again, a little fuller each time
const PULSE = [0.6, 1.9, 3.4];
kit.scene('h-heard', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('he', -160) +
      PULSE.map((p, k) => '<g class="he-w' + k + '"><path class="ink" style="stroke:var(--accent);stroke-width:9" d="M-30 -70 q-40 70 0 140"/></g>').join('') +
      '<g class="he-vg">' + R.voice('he-v') + '</g></svg>' +
      '<div class="tag tag-cool he-a">ככל שחוזרים על זה</div><div class="tag tag-warm he-b">הקול התומך</div><div class="tag he-c">עוד הזדמנות להישמע</div></div>'));
    Object.assign(this, R.refs(kit, 'he', ['body', 'head', 'eyes', 'mouth', 'vg', 'a', 'b', 'c']));
    this.w = PULSE.map((_, k) => kit.stage.querySelector('.he-w' + k));
    this.v = R.refs(kit, 'he-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0);
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8); R.blink(this.v.eyes, t, 2.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    let s = 1.3, talk = 0;
    PULSE.forEach((a, k) => { s += 0.17 * eio(seg(t, a, a + 0.5)); talk = Math.max(talk, Math.sin(Math.PI * seg(t, a, a + 0.6))); });
    R.xf(this.vg, 800, 500 + Math.sin(t * 2.2) * 8, s * (1 + 0.06 * talk), 1);
    this.v.mouth.setAttribute('d', talk > 0.3 ? 'M-4 0 Q10 22 24 0 Z' : 'M-6 2 Q10 16 26 2');
    this.v.mouth.style.fill = talk > 0.3 ? 'var(--second)' : '';
    // sound rings travel from the voice to Ruth
    PULSE.forEach((a, k) => { const p = seg(t, a + 0.1, a + 1.3); R.xf(this.w[k], lerp(680, 470, p), 500, 1 + 0.5 * p, p > 0 && p < 1 ? 1 - p : 0); });
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 0.6, 1.2))) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.b, 800, lerp(732, 720, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 3.8, 4.3))), eo(seg(t, 3.8, 4.3)));
  },
});
