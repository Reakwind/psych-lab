const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], IT = [['g'], ['w', 'mug'], ['g'], ['w', 'note'], ['w', 'people']];
const LENS = '<circle r="70" style="fill:white;opacity:.25"/><circle r="70" style="fill:none;stroke:var(--second);stroke-width:12"/><path class="ink" style="stroke-width:22" d="M50 50 L110 110"/>';
kit.scene('w-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wo', 0) + R.dayBar('wo', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (IT[k][0] === 'w' ? R.warm('wo-w' + k, IT[k][1]) : R.grey('wo-g' + k, 136)) + '</g>').join('') +
      [0, 1, 2].map((k) => '<path class="wo-sp' + k + ' amber" d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4Z" style="opacity:0"/>').join('') +
      '<g class="wo-lens">' + LENS + '</g></svg>' +
      '<div class="tag tag-cool wo-a">קודם כול לזהות</div><div class="tag tag-warm wo-b">ולשים לב מה הם נותנים לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'wo', ['body', 'head', 'eyes', 'mouth', 'lens', 'sp0', 'sp1', 'sp2', 'a', 'b']));
    this.gl = kit.stage.querySelector('.wo-w3-glow');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // first, recognise them: the lens stops on one
    const l = eio(seg(t, 1.4, 2.4));
    R.xf(this.lens, lerp(900, 350, l) + Math.sin(t * 1.3) * 6 * l, lerp(560, 220, l), 1, eo(seg(t, 1.4, 1.6)));
    // and notice what it gives us
    const g = eio(seg(t, 5.0, 5.8));
    this.gl.style.opacity = 0.5 * g;
    [0, 1, 2].forEach((k) => { const p = ((t - 5.0) * 0.6 + k / 3) % 1; R.xf(this['sp' + k], 350 + (k - 1) * 50, 160 - 120 * p, 1.4, t > 5.0 ? Math.sin(Math.PI * p) : 0); });
    this.head.setAttribute('transform', 'rotate(' + (-8 * l) + ' 0 30) translate(0 -6)');
    this.mouth.setAttribute('d', t > 5.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 4.8, 5.1))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)));
  },
});
