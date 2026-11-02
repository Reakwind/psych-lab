const { seg, eo, eio, eob, lerp } = kit;
const TK = [[3.9, 0], [4.9, 1], [6.1, 0], [7.0, 1]];
kit.scene('k-share', {
  init(kit) {
    // Ruth in her armchair on the left, a friend in a second armchair facing her (the friend's chair is mirrored)
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('k13', -200) +
      '<g class="k13-fw"><g transform="translate(1560 0) scale(-1 1)"><g transform="translate(264 0)">' + R.chair() + '<g transform="translate(500 742)">' + R.friend('k13f', 'a', 'sit') + '</g></g></g></g>' +
      '<g class="k13-s0">' + R.speech('k13-sp0') + '</g><g class="k13-s1">' + R.speech('k13-sp1') + '</g><g class="k13-spk">' + R.spark('k13') + '</g></svg>' +
      R.qcard('k13-q', 'מי תמיד מצליח להצחיק אתכם?') + '<div class="tag tag-cool k13-a">לשתף במשחק מישהו נוסף</div><div class="tag tag-warm k13-b">לעורר השראה</div><div class="tag tag-warm k13-c">ולפתוח שיחה מפתיעה</div></div>'));
    Object.assign(this, R.refs(kit, 'k13', ['body', 'head', 'eyes', 'mouth', 'fw', 's0', 's1', 'spk', 'glow', 'star', 'q', 'a', 'b', 'c']));
    Object.assign(this, { fe: kit.stage.querySelector('.k13f-eyes'), fm: kit.stage.querySelector('.k13f-mouth'), fh: kit.stage.querySelector('.k13f-head') });
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.fe, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // a friend joins; one card between them; they take turns talking, and a spark lights between them
    const j = eio(seg(t, 1.6, 2.6));
    this.fw.setAttribute('transform', 'translate(' + lerp(140, 0, j) + ' 0)'); this.fw.style.opacity = j;
    R.flipCard(this.q, 548, 470 + Math.sin(t * 1.2) * 6, 0.62, 0, eio(seg(t, 2.6, 3.4)), eo(seg(t, 2.4, 2.8)));
    TK.forEach(([a, k], i) => { if (t >= a && (i === TK.length - 1 || t < TK[i + 1][0])) this.who = k; });
    const talk = t > 3.9 ? this.who : -1;
    [this.s0, this.s1].forEach((s, k) => R.setG(s, k ? 800 : 280, 250 + Math.sin(t * 2 + k) * 4, 0.62 * (talk === k ? eob(seg((t * 10) % 10, 0, 3), 1.2) : 0), talk === k ? 1 : 0));
    const sp = eob(seg(t, 5.0, 5.6), 1.5);
    this.spk.setAttribute('transform', 'translate(548 230) scale(' + Math.max(0.001, 1.1 * sp) + ')'); this.spk.style.opacity = eo(seg(t, 5.0, 5.2));
    this.glow.setAttribute('transform', 'scale(' + (1 + 0.12 * Math.sin(t * 4)) + ')'); this.star.setAttribute('transform', 'rotate(' + t * 20 + ')');
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 8, eio(seg(t, 1.8, 2.6))) + ' 0 30)'); this.fh.setAttribute('transform', 'rotate(6 0 30)');
    this.mouth.setAttribute('d', t > 2.4 ? R.mouthHappy : R.mouthNeutral); this.fm.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.2, 2.6))), eo(seg(t, 2.2, 2.6)));
    R.place(this.b, 540, lerp(972, 960, eo(seg(t, 5.18, 5.6))), eo(seg(t, 5.18, 5.6)) * (1 - eo(seg(t, 6.3, 6.5))));
    R.place(this.c, 540, lerp(972, 960, eo(seg(t, 6.48, 6.9))), eo(seg(t, 6.48, 6.9)));
  },
});
