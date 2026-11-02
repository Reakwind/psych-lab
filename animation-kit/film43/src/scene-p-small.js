const { seg, eo, eio, eob, lerp } = kit;
const KIND = ['g', 'w', 'g', 'g', 'w', 'g', 'w', 'g', 'w', 'g'], SP = 70, GAP = 150, T0 = 8.48;
const SM = [[3.5, 880, 'נוחות'], [4.1, 710, 'עניין'], [4.6, 320, 'הנאה'], [5.2, 150, 'חיבור']];
const COLS = ['#5B8DB8', '#D96C6C', 'var(--accent)', '#6FAE7A', '#9A6FB0'];
const B = [[592, 532, 0, 1], [930, 490, 1, 1], [790, 190, 2, 0.9], [900, 230, 3, 0.9], [640, 260, 4, 0.85], [120, 640, 2, 0.8], [440, 600, 3, 0.7], [1000, 720, 4, 0.8], [360, 860, 0, 0.9]];
kit.scene('p-small', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('pn', 0) + R.dayBar('pn', 220) +
      '<clipPath id="pn-clip"><rect x="130" y="100" width="830" height="240"/></clipPath><g clip-path="url(#pn-clip)">' +
      KIND.map((k, i) => '<g class="pn-i' + i + '">' + (k === 'w' ? R.warm('pn-w' + i, 'dot') : R.grey('pn-g' + i, 120)) + '</g>').join('') + '</g>' +
      '<g class="pn-ring">' + R.attn('pn') + '</g>' + SM.map((s, k) => '<g class="pn-s' + k + '">' + R.warm('pn-sw' + k, 'dot') + '</g>').join('') + '</svg>' +
      SM.map((s, k) => '<div class="tag pn-t' + k + '">' + s[2] + '</div>').join('') + '<div class="tag tag-cool pn-a">לא רק רגעים גדולים</div></div>'));
    kit.stage.append(kit.h('<div class="ground pn-out" style="opacity:0"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pnl') + R.tree('pnl') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('pnr', 'stand') + '</g>' +
      B.map((b, k) => '<g transform="translate(' + b[0] + ' ' + b[1] + ') scale(' + b[3] + ')">' + R.bird('pn-b' + k, COLS[b[2]]).replace('-c" style="opacity:0"', '-c"') + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm pn-birds">בדיוק כמו עם הציפורים</div></div>'));
    Object.assign(this, R.refs(kit, 'pn', ['body', 'head', 'eyes', 'mouth', 'ring', 's0', 's1', 's2', 's3', 't0', 't1', 't2', 't3', 'a', 'out', 'birds']));
    this.it = KIND.map((_, i) => kit.stage.querySelector('.pn-i' + i)); this.gl = KIND.map((k, i) => kit.stage.querySelector('.pn-w' + i + '-glow'));
    this.re = kit.stage.querySelector('.pnr-eyes'); this.rm = kit.stage.querySelector('.pnr-mouth'); this.rh = kit.stage.querySelector('.pnr-head');
    this.rm.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.re, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.xf(this.ring, 540, 220, 110 + Math.sin(t * 2.4) * 4, 1);
    // the day keeps passing, as in the scene before
    KIND.forEach((k, i) => {
      const x = 1060 - (((t + T0) * SP + i * GAP) % (KIND.length * GAP)) + 200;
      this.it[i].setAttribute('transform', 'translate(' + x + ' 220)');
      if (k === 'w') this.gl[i].style.opacity = 0.55 * Math.max(0, 1 - Math.abs(x - 540) / 120);
    });
    // small moments of comfort, interest, enjoyment, connection
    SM.forEach(([a, x], k) => {
      R.xf(this['s' + k], x, 380 + Math.sin(t * 1.6 + k) * 5, 0.75 * eob(seg(t, a - 0.2, a + 0.3), 1.7), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], x, lerp(448, 436, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.6) * 3 + ' 0 30) translate(0 -4)');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.1, 1.6))), eo(seg(t, 1.1, 1.6)));
    // just like with the birds
    this.out.style.opacity = eio(seg(t, 9.3, 10.2));
    this.rh.setAttribute('transform', 'rotate(10 0 30)');
    R.place(this.birds, 540, lerp(84, 70, eo(seg(t, 10.5, 11.0))), eo(seg(t, 10.5, 11.0)));
  },
});
