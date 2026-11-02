const { seg, eo, eio, eob, lerp } = kit;
// part 18: it's not always easy, and you don't need to know in advance; little by little Ruth finds her words — her cards fan out —
// to feel understood, keep her boundaries and get support her way. Both friends beside her
const CARDS = 6;
kit.scene('c-words', {
  init(kit) {
    let fan = '';
    for (let k = 0; k < CARDS; k++) fan += '<g class="c9-k' + k + '">' + R.wordCard('c9-w' + k) + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<ellipse class="c9-glow" cx="380" cy="640" rx="170" ry="220" style="fill:var(--accent);opacity:0"/>' + R.seated('c9', -120) +
      '<g transform="translate(720 866) scale(.9)">' + R.friend('c9a', 'a', 'stand') + '</g><g transform="translate(900 866) scale(.9)">' + R.friend('c9b', 'b', 'stand') + '</g>' + fan + '</svg>' +
      '<div class="tag tag-cool c9-hard">לא תמיד קל לדבר על הדברים האלה</div><div class="tag tag-cool c9-know">ולא צריך לדעת מראש מה לומר בכל מצב</div><div class="tag tag-warm c9-find">לאט לאט אפשר למצוא את המילים</div>' +
      '<div class="tag tag-warm c9-t0">להרגיש מובנים ומובנות יותר</div><div class="tag tag-warm c9-t1">לשמור על הגבולות שלכם</div><div class="tag tag-warm c9-t2">ולקבל תמיכה בדרך שמתאימה לכם</div></div>'));
    Object.assign(this, R.refs(kit, 'c9', ['glow', 'body', 'eyes', 'mouth', 'hard', 'know', 'find', 't0', 't1', 't2']));
    this.k = [...Array(CARDS).keys()].map((k) => kit.stage.querySelector('.c9-k' + k));
    this.a = R.refs(kit, 'c9a', ['eyes', 'mouth']); this.b = R.refs(kit, 'c9b', ['eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.a.eyes, t, 1.5); R.blink(this.b.eyes, t, 2.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    this.mouth.setAttribute('d', t > 6.6 ? R.mouthHappy : R.mouthNeutral);
    this.a.mouth.setAttribute('d', R.mouthHappy); this.b.mouth.setAttribute('d', t > 10.3 ? R.mouthHappy : R.mouthNeutral);
    // her cards rise from her lap and fan out above her
    const f = eio(seg(t, 6.6, 8.6));
    this.k.forEach((el, k) => {
      const a = (k - (CARDS - 1) / 2) * 16 * f, o = eo(seg(t, 6.5 + k * 0.12, 6.9 + k * 0.12));
      el.setAttribute('transform', 'translate(380 ' + lerp(700, 330, f) + ') rotate(' + a + ') translate(0 ' + (-90 * f) + ') scale(' + lerp(0.6, 1.25, f) + ')');
      el.style.opacity = o;
    });
    this.glow.style.opacity = 0.2 * eo(seg(t, 10.3, 11.3));
    R.place(this.hard, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 2.9, 3.1))));
    R.place(this.know, 540, lerp(84, 70, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)) * (1 - eo(seg(t, 6.3, 6.5))));
    R.place(this.find, 540, lerp(84, 70, eo(seg(t, 6.5, 7.0))), eo(seg(t, 6.5, 7.0)));
    [[10.29, 840], [12.16, 910], [13.88, 980]].forEach(([a, y], k) => R.place(this['t' + k], 540, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
