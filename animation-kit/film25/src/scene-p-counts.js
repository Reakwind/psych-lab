const { seg, eo, eio, eob, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
const LIT = [[5.2, 820, 940], [6.2, 230, 840], [7.5, 820, 740]];
kit.scene('p-counts', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pc2', { sun: true }) +
      '<g class="pc2-walker"><g class="pc2-a">' + R.ruthBack('pc2-a', false) + '</g><g class="pc2-b">' + R.ruthBack('pc2-b', true) + '</g></g></svg>' +
      '<div class="tag tag-cool pc2-pace">הקצב ואופן התרגול שמתאימים לכם</div><div class="tag pc2-l0">תרגול שלם</div><div class="tag pc2-l1">חלק מתרגול</div><div class="tag pc2-l2">נשימה אחת מודעת</div>' +
      '<div class="tag tag-warm pc2-all">הכול נחשב</div></div>'));
    Object.assign(this, R.refs(kit, 'pc2', ['walker', 'a', 'b', 'pace', 'l0', 'l1', 'l2', 'all']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.pc2-st' + i + '-top'));
  },
  render(t) {
    // Ruth walks on along her path; each kind of practice lights a stone
    const k = lerp(0.1, 2.8, eio(seg(t, 0.3, 10.6)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130, step = Math.floor(t * 2) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y - Math.abs(Math.sin(t * Math.PI * 2)) * 6 * s) + ') scale(' + s + ')');
    this.tops.forEach((el, i) => {
      const a = i < 3 ? LIT[i][0] : 9.5 + (i - 3) * 0.12, lit = eo(seg(t, a, a + 0.4));
      el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(lit * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))';
    });
    LIT.forEach(([a, lx, ly], i) => R.place(this['l' + i], lx, lerp(ly + 12, ly, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
    R.place(this.pace, 540, lerp(84, 70, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)) * (1 - eo(seg(t, 9.0, 9.4))));
    R.place(this.all, 540, lerp(84, 70, eo(seg(t, 9.4, 9.9))), eo(seg(t, 9.4, 9.9)));
  },
});
