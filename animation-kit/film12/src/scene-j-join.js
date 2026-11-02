const { seg, eo, eio, eob, lerp } = kit;
const B = [['ear', 'יקשיב', 7.86, 820, 250], ['ask', 'יתעניין', 8.42, 620, 200], ['cheer', 'יעודד', 9.31, 420, 250]];
kit.scene('j-join', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j4', { sun: true }) + R.packed('j4', false) +
      '<g class="j4-fr"><g class="j4-fa">' + R.friend('j4f', 'a') + '</g><g class="j4-fb">' + R.friend('j4g', 'a', 'step') + '</g></g>' + B.map((b, k) => R.badge('j4-bg' + k, b[0])).join('') + '</svg>' +
      B.map((b, k) => '<div class="tag tag-warm j4-n' + k + '">' + b[1] + '</div>').join('') + '<div class="tag tag-cool j4-a">שמישהו יצטרף אליכם</div><div class="tag j4-b">או לעשות את הדברים לבד</div></div>'));
    Object.assign(this, R.refs(kit, 'j4', ['w', 'head', 'eyes', 'mouth', 'fr', 'fa', 'fb', 'a', 'b']));
    this.f = R.refs(kit, 'j4f', ['head', 'eyes', 'mouth']); this.g = R.refs(kit, 'j4g', ['eyes']);
    this.bg = B.map((b, k) => kit.stage.querySelector('.j4-bg' + k)); this.n = B.map((b, k) => kit.stage.querySelector('.j4-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2); R.blink(this.g.eyes, t, 2.2);
    // the friend walks up to join her; then steps aside: Ruth goes on alone, and from the side come listening, interest, encouragement
    const come = eio(seg(t, 0.9, 2.4)), back = eio(seg(t, 3.5, 4.8)), walking = (come > 0 && come < 1) || (back > 0 && back < 1);
    const fx = lerp(1240, 660, come) + 280 * back;
    this.fr.setAttribute('transform', 'translate(' + fx + ' ' + (976 - 30 * back + (walking ? Math.abs(Math.sin(t * 7)) * -6 : 0)) + ') scale(' + lerp(1, 0.88, back) + ')');
    this.fa.style.opacity = walking ? 0 : 1; this.fb.style.opacity = walking ? 1 : 0;
    const go = eio(seg(t, 3.8, 5.6));
    this.w.setAttribute('transform', 'translate(' + lerp(380, 300, go) + ' 970)');
    this.head.setAttribute('transform', 'rotate(' + (-6 * come * (1 - back) + 4 * eio(seg(t, 7.6, 8.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.8 ? R.mouthHappy : R.mouthNeutral);
    this.f.head.setAttribute('transform', 'rotate(' + (6 * come) + ' 0 30)'); this.f.mouth.setAttribute('d', R.mouthHappy);
    B.forEach(([k0, w, a, x, y], k) => {
      const p = eio(seg(t, a - 0.6, a + 0.1));
      R.setG(this.bg[k], lerp(930, x, p), lerp(560, y, p) + Math.sin(t * 1.5 + k) * 5 * p, lerp(0.3, 1, eob(seg(t, a - 0.6, a + 0.1), 1.3)), eo(seg(t, a - 0.6, a - 0.4)));
      R.place(this.n[k], x, lerp(y + 82, y + 70, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.14, 1.5))), eo(seg(t, 1.14, 1.5)) * (1 - eo(seg(t, 3.3, 3.6))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.2, 4.6))), eo(seg(t, 4.2, 4.6)) * (1 - eo(seg(t, 7.2, 7.5))));
  },
});
