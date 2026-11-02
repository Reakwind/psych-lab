const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], WARM = [1, 3];
kit.scene('p-balance', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('pl', -200) + R.dayBar('pl', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (WARM.includes(k) ? R.warm('pl-w' + k, 'heart') : R.grey('pl-g' + k, 136)) + '</g>').join('') +
      '<g class="pl-ring">' + R.attn('pl') + '</g><g class="pl-ph">' + R.phone('pl-p', 0, 0, 'ariel') + '</g></svg>' +
      '<div class="tag tag-cool pl-a">לאזן מעט את ההטיה</div><div class="tag tag-warm pl-b">לאמן את הקשב</div><div class="tag pl-c">לזהות גם חוויות נעימות</div></div>'));
    Object.assign(this, R.refs(kit, 'pl', ['body', 'head', 'eyes', 'mouth', 'ring', 'ph', 'a', 'b', 'c']));
    this.gl = WARM.map((k) => kit.stage.querySelector('.pl-w' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // Ariel, on Ruth's phone, introduces the practice
    this.ph.setAttribute('transform', 'translate(560 640) scale(' + 1.9 * eob(seg(t, 0.2, 0.8), 1.5) + ') rotate(-6)');
    this.head.setAttribute('transform', 'rotate(' + (8 - 16 * eio(seg(t, 2.0, 2.8))) + ' 0 30)');
    // attention widens from the grey to take in the warm ones too
    const w = eio(seg(t, 3.9, 5.2));
    this.ring.setAttribute('transform', 'translate(' + lerp(830, 520, w) + ' 220) scale(' + lerp(120, 480, w) + ' ' + lerp(110, 130, w) + ')');
    this.ring.style.opacity = eo(seg(t, 1.0, 1.4));
    this.gl.forEach((g) => (g.style.opacity = 0.45 * eio(seg(t, 6.2, 7.0))));
    this.mouth.setAttribute('d', t > 6.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)) * (1 - eo(seg(t, 3.9, 4.2))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)));
    R.place(this.c, 760, lerp(352, 340, eo(seg(t, 6.3, 6.8))), eo(seg(t, 6.3, 6.8)));
  },
});
