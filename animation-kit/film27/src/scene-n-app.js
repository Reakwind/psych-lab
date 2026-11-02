const { seg, eo, eio, eob, lerp } = kit;
const P = [[5.25, 'נשימה'], [5.85, 'הרפיה'], [6.45, 'מיינדפולנס'], [7.6, 'דמיון מודרך']];
kit.scene('n-app', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" style="fill:#1A2340;opacity:.12"/>' + R.bigPhone('nq') +
      [0, 1, 2, 3].map((k) => '<g class="nq-i' + k + '" transform="translate(690 ' + (318 + k * 130) + ')">' + R.tool('nq-ic' + k, [1, 3, 0, 2][k], 40) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool nq-top">גם תרגול קצר מהאפליקציה</div>' + P.map((p, k) => '<div class="btn nq-b' + k + '">' + p[1] + '</div>').join('') +
      '<div class="tag tag-warm nq-end">לשחרר קצת מהמתח של היום</div></div>'));
    Object.assign(this, R.refs(kit, 'nq', ['top', 'end', 'b0', 'b1', 'b2', 'b3', 'i0', 'i1', 'i2', 'i3']));
  },
  render(t) {
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)));
    P.forEach(([a], k) => {
      const o = eo(seg(t, a, a + 0.4));
      R.place(this['b' + k], 500, lerp(300 + k * 130, 288 + k * 130, o), o);
      this['i' + k].style.opacity = o;
    });
    R.place(this.end, 540, lerp(862, 850, eo(seg(t, 9.7, 10.2))), eo(seg(t, 9.7, 10.2)));
  },
});
