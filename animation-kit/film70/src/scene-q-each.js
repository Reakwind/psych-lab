const { seg, eo, eio, eob, lerp } = kit;
// simple, everyday things — and each of us is helped by something different
const BX = [[900, 200], [720, 160], [540, 145], [360, 160], [180, 200]];
const WHO = [[820, 'fa', 4], [540, null, 2], [260, 'fb', 1]];   // friend a: a walk; Ruth: music; friend b: a stretch
kit.scene('q-each', {
  init(kit) {
    const fig = (k) => { const [x, f] = WHO[k]; return '<g class="qa-p' + k + '" transform="translate(' + x + ' 950) scale(.8)">' + (f ? R.friend('qa-' + f, f === 'fa' ? 'a' : 'b') : R.ruth('qa-ru', 'stand')) + '</g>'; };
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + fig(0) + fig(1) + fig(2) +
      R.HELP.map((h, k) => R.cbadge('qa-b' + k, h[0], 62)).join('') + '</svg>' +
      '<div class="tag qa-a">פשוטים ויום־יומיים</div><div class="tag tag-warm qa-c">לכל אחד ואחת עוזר משהו אחר</div></div>'));
    Object.assign(this, R.refs(kit, 'qa', ['a', 'c']));
    this.b = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.qa-b' + k));
    this.e = ['qa-fa', 'qa-ru', 'qa-fb'].map((id) => R.refs(kit, id, ['eyes', 'mouth', 'head']));
  },
  render(t) {
    this.e.forEach((e, k) => { R.blink(e.eyes, t, k * 1.3); e.mouth.setAttribute('d', R.mouthHappy); });
    const pick = WHO.map((w) => w[2]);
    this.b.forEach((b, k) => {
      const i = pick.indexOf(k);
      if (i < 0) { R.setG(b, BX[k][0], BX[k][1] + Math.sin(t * 1.4 + k) * 5, 1 - 0.3 * eo(seg(t, 2.6, 3.2)), 1 - eo(seg(t, 2.6, 3.2))); return; }
      const p = eio(seg(t, 2.9 + i * 0.3, 3.8 + i * 0.3)), x = lerp(BX[k][0], WHO[i][0], p), y = lerp(BX[k][1], 430, p) + Math.sin(t * 1.4 + k) * 5;
      R.setG(b, x, y, lerp(1, 0.9, p), 1);
      if (p > 0.95) this.e[i].head.setAttribute('transform', 'rotate(' + 3 * Math.sin(t * 2 + i) + ' 0 30)');
    });
    R.place(this.a, 540, lerp(84 + 210, 70 + 210, eo(seg(t, 1.36, 1.8))), eo(seg(t, 1.36, 1.8)) * (1 - eo(seg(t, 2.6, 3.0))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 2.87, 3.3))), eo(seg(t, 2.87, 3.3)));
  },
});
