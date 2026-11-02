const { seg, eo, eio, eob, lerp } = kit;
const COLS = ['#5B8DB8', '#D96C6C', 'var(--accent)', '#6FAE7A', '#9A6FB0'];
// birds on the tree, then birds everywhere: [x, y, colour, appear at, scale]
const B = [[592, 532, 0, 0, 1], [930, 490, 1, 3.5, 1], [790, 190, 2, 3.8, 0.9], [900, 230, 3, 4.1, 0.9], [640, 260, 4, 4.3, 0.85],
  [120, 640, 2, 9.8, 0.8], [440, 600, 3, 10.0, 0.7], [1000, 720, 4, 10.2, 0.8], [360, 860, 0, 10.4, 0.9], [990, 900, 1, 10.6, 0.9]];
const FL = [[6.9, 150, 0], [7.2, 260, 1], [10.0, 120, 2]];
const TG = [[3.45, 870, 'זנים'], [4.57, 690, 'צבעים'], [5.21, 510, 'קולות'], [6.88, 290, 'איך הן עפות']];
kit.scene('p-many', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pm') + R.tree('pm') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('pm', 'stand') + '</g><g class="pm-ring">' + R.attn('pm') + '</g>' +
      B.map((b, k) => R.bird('pm-b' + k, COLS[b[2]])).join('') + FL.map((f, k) => R.flier('pm-f' + k, COLS[f[2]])).join('') +
      '<g class="pm-n0">' + R.noteMark('pm-nn0') + '</g><g class="pm-n1">' + R.noteMark('pm-nn1') + '</g></svg>' +
      TG.map((g, k) => '<div class="tag pm-t' + k + '">' + g[2] + '</div>').join('') + '<div class="tag tag-warm pm-all">פתאום ציפורים בכל מקום</div></div>'));
    Object.assign(this, R.refs(kit, 'pm', ['head', 'eyes', 'mouth', 'ring', 'n0', 'n1', 't0', 't1', 't2', 't3', 'all']));
    this.b = B.map((_, k) => R.refs(kit, 'pm-b' + k, ['g', 'c'])); this.bg = B.map((_, k) => kit.stage.querySelector('.pm-b' + k));
    this.f = FL.map((_, k) => kit.stage.querySelector('.pm-f' + k)); this.fw = FL.map((_, k) => kit.stage.querySelector('.pm-f' + k + '-w'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.head.setAttribute('transform', 'rotate(' + (10 - 14 * eio(seg(t, 9.6, 10.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.xf(this.ring, 760, 340 + Math.sin(t * 2) * 6, (230 + Math.sin(t * 2.4) * 4) * (1 + 1.6 * eio(seg(t, 9.6, 10.8))), 1 - eio(seg(t, 9.6, 10.8)));
    // species, colours, songs, flight — and then birds everywhere
    B.forEach(([x, y, , a, s], k) => {
      const p = k === 0 ? 1 : eob(seg(t, a, a + 0.4), 1.6);
      this.bg[k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 3 + k) * 2) + ') scale(' + s * p + ')');
      this.bg[k].style.opacity = k === 0 ? 1 : eo(seg(t, a, a + 0.15));
      const c = eio(seg(t, Math.max(a, 4.5), Math.max(a, 4.5) + 0.6)); this.b[k].c.style.opacity = c; this.b[k].g.style.opacity = 1 - c;
    });
    [[0, 840, 380], [1, 640, 180]].forEach(([k, x, y]) => {
      const a = 5.2 + k * 0.3, p = seg(t, a, a + 2.4);
      R.xf(this['n' + k], x + Math.sin(p * 6) * 20, y - 90 * p, eob(seg(t, a, a + 0.4), 1.5), eo(seg(t, a, a + 0.2)) * (1 - eo(seg(t, a + 1.8, a + 2.4))));
    });
    FL.forEach(([a, y], k) => {
      const p = seg(t, a, a + 3.2);
      this.f[k].setAttribute('transform', 'translate(' + lerp(1160, -120, p) + ' ' + (y + Math.sin(p * 9) * 30) + ') scale(.9)');
      this.f[k].style.opacity = p > 0 && p < 1 ? 1 : 0;
      this.fw[k].setAttribute('transform', 'scale(1 ' + Math.sin(t * 20 + k) + ')');
    });
    TG.forEach(([a, x], k) => R.place(this['t' + k], x, lerp(84, 70, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, 9.4, 9.7)))));
    R.place(this.all, 540, lerp(84, 70, eo(seg(t, 9.8, 10.3))), eo(seg(t, 9.8, 10.3)));
  },
});
