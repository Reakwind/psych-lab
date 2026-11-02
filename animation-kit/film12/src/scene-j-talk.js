const { seg, eo, eio, eob, lerp } = kit;
const S = [['helps', 'מה עוזר לכם', 3.8], ['less', 'מה פחות', 5.6], ['try', 'ומה הייתם רוצים לנסות', 8.2]];
kit.scene('j-talk', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('j5', -240) + R.friendSeat('j5', 820) + R.teaTable('j5', 548) +
      '<g class="j5-sb">' + R.sayBubble('j5-say', S.map((s, k) => R.badge('j5-i' + k, s[0], 50)).join('')) + '</g></svg>' +
      S.map((s, k) => '<div class="tag tag-warm j5-n' + k + '">' + s[1] + '</div>').join('') + '<div class="tag tag-cool j5-a">אפשר וכדאי לדבר על זה</div></div>'));
    Object.assign(this, R.refs(kit, 'j5', ['body', 'head', 'eyes', 'mouth', 'sb', 'a']));
    this.f = R.refs(kit, 'j5f', ['head', 'eyes', 'mouth', 'body']);
    this.i = S.map((s, k) => kit.stage.querySelector('.j5-i' + k)); this.n = S.map((s, k) => kit.stage.querySelector('.j5-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // over tea Ruth tells her friend what helps, what less, and what she would like to try
    const talk = t > 1.2;
    R.setG(this.sb, 330, 250 + Math.sin(t * 1.4) * 4, eob(seg(t, 3.4, 3.9), 1.5), eo(seg(t, 3.4, 3.6)));
    S.forEach(([k0, w, a], k) => {
      const nx = k < 2 ? S[k + 1][2] : 99;
      R.setG(this.i[k], 0, 0, eob(seg(t, a - 0.2, a + 0.3), 1.6) * (1 - eio(seg(t, nx - 0.3, nx))), t > a - 0.2 && t < nx ? 1 : 0);
      R.place(this.n[k], 640, lerp(222, 210, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, nx - 0.3, nx))));
    });
    this.mouth.setAttribute('d', talk && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 36 14 24' : R.mouthNeutral);
    this.head.setAttribute('transform', 'rotate(6 0 30)');
    this.f.head.setAttribute('transform', 'rotate(' + (6 + Math.sin(t * 1.2) * 3) + ' 0 30)'); this.f.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.31, 1.7))), eo(seg(t, 1.31, 1.7)));
  },
});
