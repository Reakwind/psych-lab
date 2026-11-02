const { seg, eo, eio, eob, lerp } = kit;
const COLS = ['#5B8DB8', '#D96C6C', 'var(--accent)', '#6FAE7A', '#9A6FB0'];
const B = [[592, 532, 0, 1], [930, 490, 1, 1], [790, 190, 2, 0.9], [900, 230, 3, 0.9], [640, 260, 4, 0.85]];
kit.scene('p-drift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pd') + R.tree('pd') +
      '<g class="pd-cl"><path class="slate" d="M-120 50 C-170 50 -170 -10 -126 -16 C-130 -70 -60 -90 -30 -56 C-10 -100 70 -96 80 -44 C130 -50 150 10 120 50Z"/><path class="slate-dk" opacity=".5" d="M-120 50 H120 C130 30 126 20 116 14 C60 30 -60 30 -130 20 C-136 34 -132 44 -120 50Z"/></g>' +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('pd', 'stand') + '</g><g class="pd-ring">' + R.attn('pd') + '</g>' +
      B.map((b, k) => '<g transform="translate(' + b[0] + ' ' + b[1] + ') scale(' + b[3] + ')">' + R.bird('pd-b' + k, COLS[b[2]]) + '</g>').join('') + '</svg>' +
      '<div class="tag pd-a">פחות ססגוניים מציפורים</div></div>'));
    Object.assign(this, R.refs(kit, 'pd', ['head', 'eyes', 'mouth', 'ring', 'cl', 'a']));
    this.b = B.map((_, k) => R.refs(kit, 'pd-b' + k, ['g', 'c']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    // naturally, attention drifts off to greyer places
    const d = eio(seg(t, 0.8, 4.4));
    this.cl.setAttribute('transform', 'translate(' + (330 + Math.sin(t * 0.8) * 10) + ' 250) scale(' + (1 + 0.15 * d) + ')');
    R.xf(this.ring, lerp(760, 330, d), lerp(340, 250, d) + Math.sin(t * 2) * 6, lerp(230, 210, d), 1);
    B.forEach((_, k) => { const c = 1 - eio(seg(t, 1.6 + k * 0.3, 3.0 + k * 0.3)); this.b[k].c.style.opacity = c; this.b[k].g.style.opacity = 1 - c; });
    this.head.setAttribute('transform', 'rotate(' + lerp(8, -8, d) + ' 0 30) translate(0 ' + (-4 * d) + ')');
    this.mouth.setAttribute('d', t > 3.0 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
  },
});
