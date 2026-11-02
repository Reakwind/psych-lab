const { seg, eo, eio, eob, lerp } = kit;
// parts 8–9: mental skills train too — mindfulness: the circle of attention, then the beam resting on this moment, open and curious, not judging
const P9 = 7.2;
kit.scene('w-mind', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + '<g class="w5-ring">' + R.attn('w5') + '</g>' + R.seated('w5', -60) + R.beam('w5b') + '</svg>' +
      '<div class="tag tag-cool w5-mental">גם יכולות מנטליות אפשר לאמן</div><div class="tag tag-warm w5-mf">וזה קורה כשמתרגלים מיינדפולנס</div>' +
      '<div class="tag tag-cool w5-now">הפניית תשומת הלב למה שקורה ברגע הזה</div><div class="tag w5-open">בפתיחות</div><div class="tag w5-cur">ובסקרנות</div><div class="tag tag-warm w5-judge">בלי למהר לשפוט</div></div>'));
    Object.assign(this, R.refs(kit, 'w5', ['ring', 'body', 'eyes', 'mouth', 'mental', 'mf', 'now', 'open', 'cur', 'judge']));
    this.b = R.beamRefs(kit, 'w5b');
  },
  render(t) {
    if (t > 5.5) R.closeEyes(this.eyes); else R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    this.mouth.setAttribute('d', t > 5.6 ? R.mouthHappy : R.mouthNeutral);
    const ring = eo(seg(t, 1.9, 3.0)) * (1 - eo(seg(t, P9 + 1.6, P9 + 2.4)));
    this.ring.setAttribute('transform', 'translate(440 600) scale(' + lerp(220, 330, eo(seg(t, 1.9, 3.0))) + ')'); this.ring.style.opacity = ring;
    // the beam settles on her breath, here and now
    const on = eio(seg(t, P9 + 2.0, P9 + 3.2));
    R.setBeam(this.b, 440, lerp(560, 650, on), lerp(420, 150, on), on, on);
    R.place(this.mental, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, P9 + 1.8, P9 + 2.1))));
    R.place(this.mf, 540, lerp(952, 940, eo(seg(t, 5.4, 5.9))), eo(seg(t, 5.4, 5.9)) * (1 - eo(seg(t, P9 + 6.6, P9 + 6.9))));
    R.place(this.now, 540, lerp(84, 70, eo(seg(t, P9 + 2.2, P9 + 2.7))), eo(seg(t, P9 + 2.2, P9 + 2.7)));
    R.place(this.open, 800, lerp(332, 320, eo(seg(t, P9 + 5.6, P9 + 6.0))), eo(seg(t, P9 + 5.6, P9 + 6.0)));
    R.place(this.cur, 800, lerp(412, 400, eo(seg(t, P9 + 6.3, P9 + 6.7))), eo(seg(t, P9 + 6.3, P9 + 6.7)));
    R.place(this.judge, 540, lerp(952, 940, eo(seg(t, P9 + 7.1, P9 + 7.6))), eo(seg(t, P9 + 7.1, P9 + 7.6)));
  },
});
