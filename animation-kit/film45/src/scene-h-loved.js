const { seg, eo, eio, eob, lerp } = kit;
// Ruth (right) and two people she loves: a man (middle) and a woman (left), each under a small rain cloud.
// Part 2 local 0–9.49, part 3 from 9.49: "אתה עושה כמיטב יכולתך" ~10.9–12.4, "תני לעצמך…" ~13.1–16.3
const HEARTS = [[4.6, 0], [5.0, 1], [5.4, 0], [5.8, 1], [7.4, 0], [7.8, 1]];
kit.scene('h-loved', {
  init(kit) {
    const heart = '<path class="amber-dk" d="M0 30 C-48 2 -32 -40 0 -16 C32 -40 48 2 0 30Z"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<g class="hl-f1">' + R.pal('hl-m') + '</g><g class="hl-f2">' + R.friend('hl-w', 'a') + '</g>' +
      '<g transform="translate(870 990) scale(.9)"><g class="hl-rb">' + R.ruth('hl', 'stand') + '</g></g>' +
      '<g class="hl-c1">' + R.rain('hl-r1') + '</g><g class="hl-c2">' + R.rain('hl-r2') + '</g>' +
      HEARTS.map((h, k) => '<g class="hl-h' + k + '">' + heart + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool hl-a">כשמישהו שאנחנו אוהבים מתקשה</div><div class="tag tag-warm hl-b">מילים של הבנה ותמיכה</div><div class="tag hl-c">שאנחנו כאן בשבילו</div>' +
      '<div class="thought sm warm hl-q1">"אתה עושה כמיטב יכולתך"</div><div class="thought sm warm hl-q2">"תני לעצמך קצת קרדיט, זה באמת לא פשוט"</div></div>'));
    Object.assign(this, R.refs(kit, 'hl', ['f1', 'f2', 'rb', 'head', 'eyes', 'mouth', 'c1', 'c2', 'a', 'b', 'c', 'q1', 'q2']));
    this.m = R.refs(kit, 'hl-m', ['head', 'eyes', 'mouth']); this.w = R.refs(kit, 'hl-w', ['head', 'eyes', 'mouth']);
    this.d1 = kit.stage.querySelector('.hl-r1-drops'); this.d2 = kit.stage.querySelector('.hl-r2-drops');
    this.h = HEARTS.map((_, k) => kit.stage.querySelector('.hl-h' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.m.eyes, t, 1.4); R.blink(this.w.eyes, t, 2.6);
    // two people she loves walk in, struggling
    const inn = eio(seg(t, 0, 1.4));
    this.f1.setAttribute('transform', 'translate(' + lerp(-200, 560, inn) + ' 990) scale(.88)');
    this.f2.setAttribute('transform', 'translate(' + lerp(-420, 250, inn) + ' 990) scale(.88)');
    // the man is comforted on his card, the woman on hers
    const ok1 = eio(seg(t, 11.6, 12.6)), ok2 = eio(seg(t, 15.2, 16.4));
    const sad = (r, ok) => { r.head.setAttribute('transform', 'translate(0 ' + 14 * (1 - ok) + ') rotate(' + (6 * (1 - ok)) + ' 0 30)'); r.mouth.setAttribute('d', ok > 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 30 Q2 24 14 30'); };
    sad(this.m, ok1); sad(this.w, ok2);
    const cl = (g, d, x, ok, k) => { R.xf(g, x + Math.sin(t * 0.8 + k) * 10, 450 - 40 * ok, 0.8 * eob(seg(t, 1.0 + k * 0.3, 1.6 + k * 0.3), 1.4), eo(seg(t, 1.0 + k * 0.3, 1.2 + k * 0.3)) * (1 - ok)); d.style.strokeDashoffset = -t * 60; };
    cl(this.c1, this.d1, 560, ok1, 0); cl(this.c2, this.d2, 250, ok2, 1);
    // warm words rise from Ruth and drift to them
    this.h.forEach((el, k) => {
      const [a, who] = HEARTS[k], p = seg(t, a, a + 1.6), tx = who ? 250 : 560;
      R.xf(el, lerp(820, tx, eio(p)), lerp(520, 520, p) - Math.sin(Math.PI * p) * 160, 0.9, p > 0 && p < 1 ? Math.min(1, 4 * (1 - p)) : 0);
    });
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 1.2, 2.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 4.2, 4.5))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)) * (1 - eo(seg(t, 9.3, 9.6))));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)) * (1 - eo(seg(t, 9.3, 9.6))));
    // the two quotes, right to left: first over the man, then over the woman
    R.put(this.q1, 650, lerp(180, 160, eio(seg(t, 10.8, 11.4))), 1, -2, eo(seg(t, 10.8, 11.2)));
    R.put(this.q2, 330, lerp(300, 280, eio(seg(t, 13.0, 13.6))), 1, 2, eo(seg(t, 13.0, 13.4)));
  },
});
