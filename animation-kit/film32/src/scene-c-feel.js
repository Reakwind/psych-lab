const { seg, eo, eio, eob, lerp } = kit;
// parts 4–5: talking about Parkinson's isn't always simple — embarrassment, worry, anger, frustration come up around Ruth;
// all understandable; and the words don't always come in the moment
const P5 = 11.84;
const F = [[6.96, 'מבוכה', 800, 330], [7.77, 'חשש', 800, 410], [9.98, 'כעס', 230, 330], [10.34, 'תסכול', 230, 410]];
kit.scene('c-feel', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<ellipse class="c2-glow" cx="500" cy="640" rx="190" ry="230" style="fill:var(--accent);opacity:0"/>' + R.seated('c2', 0) +
      '<g class="c2-blush"><ellipse cx="474" cy="544" rx="14" ry="8" style="fill:#E58A8A"/><ellipse cx="530" cy="542" rx="14" ry="8" style="fill:#E58A8A"/></g><g class="c2-sw">' + R.swirl('c2-s') + '</g></svg>' +
      '<div class="tag tag-cool c2-hard">לדבר עם אנשים על פרקינסון זה לא תמיד פשוט</div>' + F.map((f, k) => '<div class="tag c2-f' + k + '">' + f[1] + '</div>').join('') +
      '<div class="tag tag-warm c2-ok">התחושות האלה מובנות</div><div class="say c2-word">… ?</div><div class="tag c2-rt">ולא תמיד קל למצוא את המילים בזמן אמת</div></div>'));
    Object.assign(this, R.refs(kit, 'c2', ['glow', 'body', 'head', 'eyes', 'mouth', 'blush', 'sw', 'hard', 'f0', 'f1', 'f2', 'f3', 'ok', 'word', 'rt']));
    this.word.style.setProperty('--tx', '20%');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    // her face moves with the feelings: a blush, a worried mouth, a tight swirl
    const em = eo(seg(t, 6.9, 7.3)) * (1 - eo(seg(t, 9.6, 10.0))), ang = eo(seg(t, 9.9, 10.3)) * (1 - eo(seg(t, P5, P5 + 0.5)));
    this.blush.style.opacity = em;
    this.sw.style.opacity = ang; this.sw.setAttribute('transform', 'translate(570 410) rotate(' + t * 60 + ') scale(1.4)');
    this.mouth.setAttribute('d', t > P5 + 0.6 ? R.mouthHappy : t > 7.7 && t < P5 ? (t > 9.9 ? R.mouthFlat : R.mouthSad) : t > P5 + 2.6 && t < P5 + 4.6 ? 'M-10 26 Q2 30 14 26' : R.mouthNeutral);
    this.head.setAttribute('transform', 'rotate(' + (t > 6.9 && t < 9.9 ? -6 : 0) * eio(seg(t, 6.9, 7.4)) + ' 0 30)');
    R.place(this.hard, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, P5, P5 + 0.3))));
    F.forEach(([a, , x, y], k) => R.place(this['f' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, P5, P5 + 0.4)))));
    // part 5: a warm glow — understandable; a bubble tries to form, but the words don't come
    this.glow.style.opacity = 0.2 * eo(seg(t, P5 + 0.3, P5 + 1.2));
    R.place(this.ok, 540, lerp(84, 70, eo(seg(t, P5 + 0.3, P5 + 0.8))), eo(seg(t, P5 + 0.3, P5 + 0.8)));
    R.place(this.word, 680, lerp(352, 340, eo(seg(t, P5 + 2.7, P5 + 3.1))), eo(seg(t, P5 + 2.7, P5 + 3.1)) * (0.75 + 0.25 * Math.sin(t * 5)));
    R.place(this.rt, 540, lerp(952, 940, eo(seg(t, P5 + 2.8, P5 + 3.3))), eo(seg(t, P5 + 2.8, P5 + 3.3)));
  },
});
