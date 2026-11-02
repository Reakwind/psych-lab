const { seg, eo, eio, eob, lerp } = kit;
// parts 2–3 in bed; part 3 starts at 8.36
const P = 8.36;
kit.scene('n-busy', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bedTop('nb') +
      '<path class="nb-s1" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.5"/><path class="nb-s2" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.5"/>' +
      '<g class="nb-b1">' + R.balloon('nb-x') + '</g><g class="nb-b2">' + R.balloon('nb-y') + '</g>' +
      '<g class="nb-zz"><path class="ink" style="stroke:#C0392B;stroke-width:7" d="M300 384 l14 -22 l14 22 l14 -22 l14 22 M300 708 l14 -22 l14 22 l14 -22 l14 22"/></g>' +
      '<rect class="nb-veil" width="1080" height="1080" style="fill:#1A2340;opacity:.22"/><g transform="translate(176 164) scale(.62)"><g class="nb-cl">' + R.clock('nb-k') + '</g></g></svg>' +
      '<div class="tag tag-night nb-hard">לפעמים קשה להירדם</div><div class="tag nb-tired">לא משנה כמה עייפים</div><div class="tag tag-cool nb-tbody">הגוף רוצה לנוח</div><div class="tag tag-warm nb-thead">אבל הראש עוד עסוק</div>' +
      '<div class="tag tag-warm nb-tense">המתח של היום עדיין שם</div><div class="tag nb-trans">המעבר לשינה לא קורה ברגע שנכנסים למיטה</div></div>'));
    Object.assign(this, R.refs(kit, 'nb', ['eyes', 'mouth', 'glow', 's1', 's2', 'b1', 'b2', 'zz', 'hard', 'tired', 'tbody', 'thead', 'tense', 'trans']));
    this.kh = kit.stage.querySelector('.nb-k-h'); this.km = kit.stage.querySelector('.nb-k-m');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.glow.style.opacity = 0.18;
    R.place(this.hard, 620, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, P - 0.3, P))));
    R.place(this.tired, 620, lerp(176, 164, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)) * (1 - eo(seg(t, P - 0.3, P))));
    // the body lies still, the head is busy: thoughts float off
    R.place(this.tbody, 690, lerp(860, 848, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)) * (1 - eo(seg(t, P - 0.3, P))));
    [[this.b1, this.s1, 6.2, 420, 160], [this.b2, this.s2, 6.7, 640, 230]].forEach(([b, s, a, x, y], k) => {
      const p = eio(seg(t, a, a + 1.4)), bx = lerp(250, x, p), by = lerp(500, y, p);
      b.setAttribute('transform', 'translate(' + bx + ' ' + (by + Math.sin(t * 2 + k) * 6) + ') scale(' + eob(seg(t, a - 0.1, a + 0.4), 1.6) * 1.3 + ')');
      s.setAttribute('d', 'M250 520 C230 400 ' + (bx - 40) + ' ' + (by + 120) + ' ' + bx + ' ' + (by + 30)); s.style.opacity = 0.5 * eo(seg(t, a, a + 0.4));
    });
    R.place(this.thead, 300, lerp(882, 870, eo(seg(t, 6.3, 6.8))), eo(seg(t, 6.3, 6.8)) * (1 - eo(seg(t, P - 0.3, P))));
    // the day's tension is still there
    const z = eo(seg(t, P + 0.7, P + 1.1));
    this.zz.style.opacity = z; this.zz.setAttribute('transform', 'translate(' + Math.sin(t * 30) * 2 * z + ' 0)');
    this.mouth.setAttribute('d', z > 0.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
    R.place(this.tense, 540, lerp(84, 70, eo(seg(t, P + 0.7, P + 1.2))), eo(seg(t, P + 0.7, P + 1.2)));
    // and sleep doesn't come the moment she lies down: the clock keeps going
    const sp = eio(seg(t, P + 2.8, P + 6.6));
    this.km.setAttribute('transform', 'rotate(' + sp * 1080 + ')'); this.kh.setAttribute('transform', 'rotate(' + (60 + sp * 90) + ')');
    R.place(this.trans, 540, lerp(940, 928, eo(seg(t, P + 2.6, P + 3.1))), eo(seg(t, P + 2.6, P + 3.1)));
  },
});
