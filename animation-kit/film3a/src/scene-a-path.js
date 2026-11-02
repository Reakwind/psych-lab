const { seg, eo, eio, eob, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('a-path', {
  init(kit) {
    let notes = '';
    for (let k = 0; k < 5; k++) notes += '<g class="ah2-n' + k + '">' + R.note('ah2-note' + k) + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('ah2') +
      '<g class="ah2-walker"><g class="ah2-a">' + R.ruthBack('ah2-a', false) + '</g><g class="ah2-b">' + R.ruthBack('ah2-b', true) + '</g></g>' + notes +
      '</svg><div class="tag tag-warm ah2-cap">הדרך שלכם לתרגל</div><div class="tag ah2-add">הדברים הקטנים מצטברים</div></div>'));
    Object.assign(this, R.refs(kit, 'ah2', ['walker', 'a', 'b', 'cap', 'add']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.ah2-st' + i + '-top'));
    this.ns = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ah2-n' + k));
  },
  render(t) {
    // the small lessons settle on the stones of her path and light them, as she walks on
    const k = lerp(0.1, 2.6, eio(seg(t, 0.3, 6.4)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130, step = Math.floor(t * 2) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y - Math.abs(Math.sin(t * Math.PI * 2)) * 6 * s) + ') scale(' + s + ')');
    this.ns.forEach((el, i) => {
      const a = 0.6 + i * 0.5, p = eio(seg(t, a, a + 0.8)), [sx, sy, sr] = R.PATH[i];
      el.setAttribute('transform', 'translate(' + lerp(540, sx, p) + ' ' + (lerp(1180, sy - sr * 0.1, p) - Math.sin(p * Math.PI) * 200) + ') scale(' + lerp(1.4, sr / 110, p) + ')');
      el.style.opacity = 1 - eo(seg(t, a + 0.8, a + 1.1));
      const lit = eo(seg(t, a + 0.7, a + 1.1));
      this.tops[i].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(lit * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))';
    });
    R.place(this.add, 540, lerp(186, 174, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});
