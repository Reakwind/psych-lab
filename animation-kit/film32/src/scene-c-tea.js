const { seg, eo, eio, eob, lerp } = kit;
// parts 8–9: over tea with a friend, Ruth uses her cards: explain what matters right now (her voice), or set a boundary
const P9 = 14.25;
const C = [[6.6, 13.9, 'הפרקינסון משפיע על הקול שלי, אז יכול להיות שתצטרכו לבקש ממני לחזור על משהו.'], [P9 + 2.1, 20.7, 'תודה ששאלת, אבל אני מעדיפה לא לדבר על זה עכשיו.']];
kit.scene('c-tea', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('c5', -240) + R.friendSeat('c5', 820) + R.teaTable('c5', 548) +
      '<g transform="translate(514 756) scale(.4)">' + R.mug('c5-m1') + '</g><g transform="translate(548 772)">' + R.stack('c5-st', 4) + '</g><g class="c5-fly">' + R.wordCard('c5-fc') + '</g></svg>' +
      '<div class="tag tag-cool c5-what">אז מה אומרים?</div><div class="tag tag-cool c5-rel">לפעמים אפשר פשוט להסביר את מה שרלוונטי לרגע הזה</div><div class="tag tag-cool c5-bnd">אפשר גם להציב גבול</div>' +
      C.map((c, k) => '<div class="thought card c5-c' + k + '">' + c[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'c5', ['body', 'head', 'eyes', 'mouth', 'fly', 'what', 'rel', 'bnd', 'c0', 'c1']));
    this.f = R.refs(kit, 'c5f', ['head', 'eyes', 'mouth']);
    this.st = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.c5-st-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(6 0 30)');
    // a card lifts from the stack and opens into what she says; afterwards it goes back
    let n = 3, fly = 0, fx = 548, fy = 740;
    C.forEach(([a, b], k) => {
      const up = eio(seg(t, a - 0.5, a)), back = eio(seg(t, b - 0.6, b));
      if (t > a - 0.5 && t < b) { fly = up * (1 - back); }
      const o = eo(seg(t, a, a + 0.35)) * (1 - eo(seg(t, b - 0.6, b - 0.3)));
      R.put(this['c' + k], 540, lerp(330, 310, eo(seg(t, a, a + 0.4))), lerp(0.4, 1, eob(seg(t, a, a + 0.4), 1.2)), 0, o);
    });
    R.showStack(this.st, n);
    R.setG(this.fly, lerp(fx, 540, fly), lerp(fy, 470, fly), 1 + 0.6 * fly, fly > 0.02 ? 1 - eo(seg(fly, 0.7, 1)) : 0);
    const talking = (t > 6.9 && t < 13.4) || (t > P9 + 2.2 && t < P9 + 5.6);
    R.talk(this.mouth, t, talking);
    const nod = Math.sin(Math.PI * seg(t, 13.4, 14.2)) + Math.sin(Math.PI * seg(t, P9 + 5.6, P9 + 6.4));
    this.f.head.setAttribute('transform', 'rotate(' + (6 + 6 * nod) + ' 0 30)'); this.f.mouth.setAttribute('d', t > 13.6 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.what, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 2.0, 2.3))));
    R.place(this.rel, 540, lerp(84, 70, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)) * (1 - eo(seg(t, P9, P9 + 0.3))));
    R.place(this.bnd, 540, lerp(84, 70, eo(seg(t, P9 + 0.3, P9 + 0.8))), eo(seg(t, P9 + 0.3, P9 + 0.8)));
  },
});
