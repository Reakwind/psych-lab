const { seg, eo, eio, eob, lerp } = kit;
// time to practise: a few options, each working with attention and balance a little differently — which feels right today?
const CY = [330, 520, 710];
kit.scene('h-choose', {
  init(kit) {
    const icon = [
      '<circle r="44" style="fill:var(--accent);opacity:.15"/><circle r="44" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:10 8"/><circle r="10" class="amber"/>',
      '<path class="metal" d="M-4 -30 h8 l4 56 h-16Z"/><rect class="metal" x="-56" y="-36" width="112" height="9" rx="4"/><path class="slate" d="M-62 -4 H-18 Q-22 12 -40 12 Q-58 12 -62 -4Z"/><path class="amber" d="M18 -4 H62 Q58 12 40 12 Q22 12 18 -4Z"/><path class="ink" style="stroke-width:3" d="M-52 -30 L-62 -4 M-28 -30 L-18 -4 M28 -30 L18 -4 M52 -30 L62 -4"/>',
      '<g transform="translate(-14 26) scale(1.1)">' + R.sprout('hx-l') + '</g><path class="amber-dk" transform="translate(-30 -8) scale(.7)" d="M0 26 C-40 2 -26 -32 0 -12 C26 -32 40 2 0 26Z"/>'];
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(240 552)">' + R.photo('hx-ph') + '</g>' + R.seated('hx', -190) + '<g class="hx-ph2">' + R.bigPhone('hx') + '</g>' +
      CY.map((y, k) => '<g class="hx-o' + k + '"><rect x="-150" y="-70" width="300" height="140" rx="26" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/><g transform="translate(0 0)">' + icon[k] + '</g></g>').join('') +
      '</svg><div class="tag tag-warm hx-q">מה מרגיש לי הכי מתאים היום?</div></div>'));
    Object.assign(this, R.refs(kit, 'hx', ['body', 'head', 'eyes', 'mouth', 'ph2', 'q']));
    this.o = [0, 1, 2].map((k) => kit.stage.querySelector('.hx-o' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const up = eio(seg(t, 0.2, 1.4));
    this.ph2.setAttribute('transform', 'translate(300 ' + lerp(1000, 60, up) + ') scale(.8)');
    // the options pop up, each moving its own way
    this.o.forEach((el, k) => {
      const a = 4.6 + k * 0.45, p = eob(seg(t, a, a + 0.5), 1.6), w = seg(t, 6.6, 9.6) > 0 && seg(t, 6.6, 9.6) < 1 ? 1 : 0;
      const wig = w * [Math.sin(t * 6) * 4, 0, 0][k], bob = w * [0, Math.sin(t * 5) * 6, 0][k], sc = w * [0, 0, 0.05 * Math.sin(t * 4)][k];
      el.setAttribute('transform', 'translate(' + (732 + bob) + ' ' + (CY[k] + (1 - eo(seg(t, a, a + 0.5))) * 30) + ') rotate(' + wig + ') scale(' + (p * (1 + sc)) + ')');
      el.style.opacity = eo(seg(t, a, a + 0.25));
    });
    const lean = eio(seg(t, 10.8, 11.6));
    this.head.setAttribute('transform', 'rotate(' + (6 * up + 4 * lean) + ' 0 30)'); R.look(this.eyes, t, 0.6, 4 * up, -2 * up);
    this.mouth.setAttribute('d', R.SMILE);
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 14.7, 15.2))), eo(seg(t, 14.7, 15.2)));
  },
});
