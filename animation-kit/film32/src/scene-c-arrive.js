const { seg, eo, eio, eob, lerp } = kit;
// parts 1–3: friends drop in and the questions come — "what happened?" at a tremor, a friend who can't hear, "is everything okay?";
// then everything holds still while Ruth's own three questions stack up beside her
const P2 = 6.42, P3 = 18.19;
const Q = [[P3 + 2.0, 'מה אני רוצה להגיד?', 250], [P3 + 3.9, 'כמה להסביר?', 420], [P3 + 5.7, 'והאם בכלל מתחשק לי לדבר על זה עכשיו?', 610]];
kit.scene('c-arrive', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.doorOpen('c1-door') + R.seated('c1', -200) +
      '<g class="c1-tr">' + R.tremor('c1') + '</g><g class="c1-fa">' + R.friend('c1a', 'a', 'stand') + '</g><g class="c1-fb">' + R.friend('c1b', 'b', 'stand') + '</g><g class="c1-ear">' + R.ear('c1-e') + '</g></svg>' +
      '<div class="tag tag-cool c1-title">מפגש 32 · איך לתקשר עם אחרים על פרקינסון</div><div class="tag c1-unpl">שיחות שלא בהכרח תכננתם לנהל</div>' +
      '<div class="say c1-what">מה קרה?</div><div class="say c1-dots">…</div><div class="say c1-hm">?</div><div class="say c1-ok">הכול בסדר?</div>' +
      '<div class="tag tag-cool c1-decide">וברגע אחד צריך להחליט</div>' + Q.map((q, k) => '<div class="thought sm kind c1-q' + k + '">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'c1', ['door', 'body', 'head', 'eyes', 'mouth', 'tr', 'fa', 'fb', 'ear', 'title', 'unpl', 'what', 'dots', 'hm', 'ok', 'decide', 'q0', 'q1', 'q2']));
    this.a = R.refs(kit, 'c1a', ['head', 'eyes', 'mouth']); this.b = R.refs(kit, 'c1b', ['head', 'eyes', 'mouth']);
    this.dots.style.setProperty('--tx', '30%'); this.what.style.setProperty('--tx', '60%'); this.ok.style.setProperty('--tx', '40%');
  },
  render(t) {
    const frz = eo(seg(t, P3 + 0.2, P3 + 0.8));
    if (t < P3) { R.blink(this.eyes, t, 0.6); R.blink(this.a.eyes, t, 1.4); R.blink(this.b.eyes, t, 2.3); }
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    // the door opens and two friends come in
    this.door.setAttribute('opacity', eo(seg(t, 1.8, 2.5)));
    const wa = eio(seg(t, 2.2, 4.4)), wb = eio(seg(t, 2.8, 5.0));
    const step = (w) => w > 0 && w < 1 ? Math.abs(Math.sin(t * 7)) * 8 : 0;
    this.fa.setAttribute('transform', 'translate(' + lerp(915, 620, wa) + ' ' + (866 - step(wa)) + ') scale(.92)'); this.fa.style.opacity = eo(seg(t, 2.2, 2.6));
    this.fb.setAttribute('transform', 'translate(' + lerp(915, 840, wb) + ' ' + (866 - step(wb)) + ') scale(.92)'); this.fb.style.opacity = eo(seg(t, 2.8, 3.2));
    // part 2: a tremor — "what happened?"; Ruth says something, a friend can't hear it; then the familiar "is everything okay?"
    this.tr.style.opacity = eo(seg(t, P2 + 0.8, P2 + 1.2)) * (1 - eo(seg(t, P2 + 6.5, P2 + 7.0)));
    this.tr.setAttribute('transform', 'translate(' + (370 + Math.sin(t * 40) * 3) + ' 700)');
    const lookA = t > P2 + 0.8 && t < P2 + 6.6 ? 1 : 0;
    this.b.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, P2 + 1.0, P2 + 1.5))) + ' 0 30)');
    R.place(this.what, 840, lerp(282, 270, eo(seg(t, P2 + 1.7, P2 + 2.1))), eo(seg(t, P2 + 1.7, P2 + 2.1)) * (1 - eo(seg(t, P2 + 3.3, P2 + 3.6))));
    R.place(this.dots, 330, lerp(312, 300, eo(seg(t, P2 + 3.6, P2 + 4.0))), eo(seg(t, P2 + 3.6, P2 + 4.0)) * (1 - eo(seg(t, P2 + 6.4, P2 + 6.7))));
    R.talk(this.mouth, t, t > P2 + 3.6 && t < P2 + 4.6);
    R.setG(this.ear, 520, 300, eob(seg(t, P2 + 4.5, P2 + 5.0), 1.6) * 0.8, eo(seg(t, P2 + 4.5, P2 + 4.8)) * (1 - eo(seg(t, P2 + 6.4, P2 + 6.7))));
    this.a.head.setAttribute('transform', 'rotate(' + (10 * eio(seg(t, P2 + 4.4, P2 + 5.0)) * (1 - eio(seg(t, P2 + 6.4, P2 + 7.0)))) + ' 0 30)');
    R.place(this.hm, 650, lerp(262, 250, eo(seg(t, P2 + 5.1, P2 + 5.5))), eo(seg(t, P2 + 5.1, P2 + 5.5)) * (1 - eo(seg(t, P2 + 6.4, P2 + 6.7))));
    R.place(this.ok, 640, lerp(282, 270, eo(seg(t, P2 + 9.9, P2 + 10.3))), eob(seg(t, P2 + 9.9, P2 + 10.3), 1.3) * (1 - eo(seg(t, P3 + 1.6, P3 + 1.9))));
    R.talk(this.a.mouth, t, t > P2 + 9.9 && t < P2 + 11.0);
    // Move into Ruth's own questions; clear the friends before the cards occupy that space.
    this.fa.style.opacity = Math.min(this.fa.style.opacity, 1 - frz); this.fb.style.opacity = Math.min(this.fb.style.opacity, 1 - frz);
    this.mouth.setAttribute('d', t > P3 ? R.mouthFlat : this.mouth.getAttribute('d'));
    this.head.setAttribute('transform', 'rotate(' + (-5 * frz) + ' 0 30)');
    if (t > P3) R.blink(this.eyes, t, 0.6);
    R.place(this.decide, 540, lerp(84, 70, eo(seg(t, P3 + 0.3, P3 + 0.8))), eo(seg(t, P3 + 0.3, P3 + 0.8)));
    Q.forEach(([a, , y], k) => R.put(this['q' + k], 700, lerp(y + 20, y, eo(seg(t, a, a + 0.4))), eob(seg(t, a, a + 0.4), 1.3), (k - 1) * 2, eo(seg(t, a, a + 0.25))));
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, P2 - 0.3, P2))));
    R.place(this.unpl, 540, lerp(952, 940, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)) * (1 - eo(seg(t, P2 + 0.3, P2 + 0.6))));
  },
});
