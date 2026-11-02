const { seg, eo, eio, eob, lerp } = kit;
// parts 13–14: a small explanation prevents many misunderstandings — over tea Ruth plays two cards and the friend's question cloud pops;
// then two more cards say what helps her take part: a few more seconds (a sandglass), tell me if you didn't hear (an ear)
const P14 = 14.11;
const C = [[3.95, 8.4, 'אני כן רוצה לבוא. פשוט לוקח לי יותר זמן להתארגן.'], [8.76, P14 - 0.2, 'אני מקשיבה, גם אם לא תמיד רואים את זה על הפנים שלי.'],
  [P14 + 4.0, P14 + 9.2, 'אם לוקח לי יותר זמן לענות, תנו לי עוד כמה שניות.'], [P14 + 9.5, 28.6, 'אם לא שמעתם אותי, אני מעדיפה שתגידו לי ואני אחזור על זה.']];
kit.scene('c-explain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('c7', -240) + R.friendSeat('c7', 820) + R.teaTable('c7', 548) +
      '<g transform="translate(514 756) scale(.4)">' + R.mug('c7-m1') + '</g><g transform="translate(548 772)">' + R.stack('c7-st', 7) + '</g><g class="c7-q">' + R.qCloud('c7-qc') + '</g>' +
      '<g class="c7-hg">' + R.hourglass('c7-h') + '</g><g class="c7-ear">' + R.ear('c7-e') + '</g></svg>' +
      '<div class="tag tag-cool c7-small">הסבר קטן יכול למנוע הרבה אי־הבנות</div><div class="tag tag-cool c7-help">מה יעזור לכם להשתתף בצורה שמתאימה לכם</div>' +
      C.map((c, k) => '<div class="thought card c7-c' + k + '">' + c[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'c7', ['body', 'head', 'eyes', 'mouth', 'q', 'hg', 'ear', 'small', 'help', 'c0', 'c1', 'c2', 'c3']));
    this.f = R.refs(kit, 'c7f', ['head', 'eyes', 'mouth']);
    this.st = [0, 1, 2, 3, 4, 5, 6].map((k) => kit.stage.querySelector('.c7-st-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(6 0 30)');
    // each card opens into what she says, then joins the stack
    let n = 3, talking = false;
    C.forEach(([a, b], k) => {
      const o = eo(seg(t, a, a + 0.35)) * (1 - eo(seg(t, b - 0.6, b - 0.3)));
      R.put(this['c' + k], 500, lerp(330, 310, eo(seg(t, a, a + 0.4))), lerp(0.4, 1, eob(seg(t, a, a + 0.4), 1.2)), 0, o);
      n += eo(seg(t, b - 0.5, b - 0.1));
      if (t > a + 0.1 && t < b - 1.2) talking = true;
    });
    R.showStack(this.st, n);
    R.talk(this.mouth, t, talking);
    // the friend's question cloud, until it is cleared up
    const q = eob(seg(t, 0.5, 1.0), 1.5) * (1 - eio(seg(t, 12.8, 13.4)));
    R.setG(this.q, 940, 340 + Math.sin(t * 2) * 5, Math.max(0.001, 0.85 * q), q > 0.01 ? 1 : 0);
    this.f.mouth.setAttribute('d', t > 13.2 ? R.mouthHappy : R.mouthNeutral);
    this.f.head.setAttribute('transform', 'rotate(' + (6 + 6 * Math.sin(Math.PI * seg(t, 13.2, 14.0))) + ' 0 30)');
    // part 14: a sandglass for "a few more seconds", an ear for "tell me if you didn't hear"
    R.setG(this.hg, 160, 300, 0.7 * eob(seg(t, P14 + 4.2, P14 + 4.7), 1.5), eo(seg(t, P14 + 4.2, P14 + 4.5)) * (1 - eo(seg(t, P14 + 8.6, P14 + 9.0))));
    this.hg.setAttribute('transform', this.hg.getAttribute('transform') + ' rotate(' + 180 * eio(seg(t, P14 + 6.6, P14 + 7.4)) + ')');
    R.setG(this.ear, 160, 300, 0.9 * eob(seg(t, P14 + 9.6, P14 + 10.1), 1.5), eo(seg(t, P14 + 9.6, P14 + 9.9)));
    R.place(this.small, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, P14, P14 + 0.3))));
    R.place(this.help, 540, lerp(84, 70, eo(seg(t, P14 + 0.4, P14 + 0.9))), eo(seg(t, P14 + 0.4, P14 + 0.9)));
  },
});
