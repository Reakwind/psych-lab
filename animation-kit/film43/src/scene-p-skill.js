const { seg, eo, eio, eob, lerp } = kit;
const KIND = ['g', 'w', 'g', 'g', 'w', 'g', 'w', 'g', 'w', 'g'], SP = 70, GAP = 150;
kit.scene('p-skill', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ps', 0) + R.dayBar('ps', 220) +
      '<clipPath id="ps-clip"><rect x="130" y="100" width="830" height="240"/></clipPath><g clip-path="url(#ps-clip)">' +
      KIND.map((k, i) => '<g class="ps-i' + i + '">' + (k === 'w' ? R.warm('ps-w' + i, 'dot') : R.grey('ps-g' + i, 120)) + '</g>').join('') + '</g>' +
      '<g class="ps-ring">' + R.attn('ps') + '</g></svg>' +
      '<div class="tag tag-cool ps-a">ככל שחוזרים על התרגול</div><div class="tag tag-warm ps-b">בזמן שהם קורים</div></div>'));
    Object.assign(this, R.refs(kit, 'ps', ['body', 'head', 'eyes', 'mouth', 'ring', 'a', 'b']));
    this.it = KIND.map((_, i) => kit.stage.querySelector('.ps-i' + i)); this.gl = KIND.map((k, i) => kit.stage.querySelector('.ps-w' + i + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the day goes by; attention, now practised, catches the pleasant moments as they pass
    const ring = eob(seg(t, 1.0, 1.6), 1.5);
    R.xf(this.ring, 540, 220, (110 + Math.sin(t * 2.4) * 4) * ring, eo(seg(t, 1.0, 1.2)));
    KIND.forEach((k, i) => {
      const x = 1060 - ((t * SP + i * GAP) % (KIND.length * GAP)) + 200;
      this.it[i].setAttribute('transform', 'translate(' + x + ' 220)');
      if (k === 'w') this.gl[i].style.opacity = t > 1.4 ? 0.55 * Math.max(0, 1 - Math.abs(x - 540) / 120) : 0;
    });
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.6) * 3 + ' 0 30) translate(0 -4)');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)));
  },
});
