const { seg, eo, eio, eob, lerp } = kit;
// which one would you like to try?
const CY = [330, 520, 710], K = ['scan', 'breath', 'stretch'];
kit.scene('q-try', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('qt', -190) + '<g class="qt-ph">' + R.bigPhone('qt') + '</g>' +
      CY.map((y, k) => '<g class="qt-o' + k + '"><rect x="-150" y="-70" width="300" height="140" rx="26" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>' + R.cbadge('qt-c' + k, K[k], 52) + '</g>').join('') +
      '</svg><div class="tag tag-warm qt-q">איזה בא לכם לנסות?</div></div>'));
    Object.assign(this, R.refs(kit, 'qt', ['body', 'head', 'eyes', 'mouth', 'ph', 'q']));
    this.o = [0, 1, 2].map((k) => kit.stage.querySelector('.qt-o' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const up = eio(seg(t, 0, 0.8));
    this.ph.setAttribute('transform', 'translate(300 ' + lerp(1000, 60, up) + ') scale(.8)');
    this.o.forEach((el, k) => { const a = 0.6 + k * 0.2, p = eob(seg(t, a, a + 0.4), 1.6); el.setAttribute('transform', 'translate(732 ' + (CY[k] + (1 - eo(seg(t, a, a + 0.4))) * 30) + ') scale(' + Math.max(0.001, p) + ')'); el.style.opacity = eo(seg(t, a, a + 0.2)); });
    this.head.setAttribute('transform', 'rotate(' + 8 * up + ' 0 30)'); R.look(this.eyes, t, 0.6, 4 * up, -2 * up);
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 0.36, 0.8))), eo(seg(t, 0.36, 0.8)));
  },
});
