const { seg, eo, eio, eob, lerp } = kit;
// a good breath or sigh, a stretch or some movement; music we love, a shower, a short walk outside
const BX = [[900, 200], [720, 160], [540, 145], [360, 160], [180, 200]];
const IN = [1.65, 3.29, 6.15, 8.29, 9.03];
kit.scene('q-helps', {
  init(kit) {
    const me = R.armsFree(R.ruth('qe', 'stand'), 'qe').replace('<g class="qe-eyes">', R.faceBits('qe') + '<g class="qe-eyes">');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.openDoor('qe-od') +
      '<g transform="translate(250 520) scale(.9)">' + R.radio('qe-rd') + '</g>' + [0, 1, 2].map((k) => '<g class="qe-n' + k + '">' + R.notes('qe-nt' + k) + '</g>').join('') +
      '<g class="qe-r" transform="translate(540 960)">' + me + '<g transform="translate(0 -200)">' + R.puffs('qe-pf') + '</g></g>' +
      R.HELP.map((h, k) => R.cbadge('qe-b' + k, h[0], 62)).join('') + '</svg>' +
      R.HELP.map((h, k) => '<div class="tag tag-warm qe-t' + k + '">' + h[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'qe', ['r', 'body', 'head', 'eyes', 'mouth', 'armL', 'armR', 'pf', 'od']));
    this.b = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.qe-b' + k)); this.tg = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.qe-t' + k));
    this.n = [0, 1, 2].map((k) => kit.stage.querySelector('.qe-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.b.forEach((b, k) => R.setG(b, BX[k][0], BX[k][1] + Math.sin(t * 1.4 + k) * 5, eob(seg(t, IN[k] - 0.1, IN[k] + 0.4), 1.6), eo(seg(t, IN[k] - 0.1, IN[k] + 0.1))));
    this.tg.forEach((g, k) => { const a = IN[k], b = IN[k + 1] || 99; R.place(g, 540, lerp(332, 320, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b - 0.15, b + 0.15)))); });
    // a long sigh
    const inn = eio(seg(t, 1.6, 2.3)), out = eio(seg(t, 2.4, 3.3));
    this.r.setAttribute('transform', 'translate(540 960) scale(1 ' + (1 + 0.03 * inn * (1 - out)) + ')');
    this.pf.style.opacity = t > 2.4 && t < 3.4 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 5)) : 0;
    // a stretch, arms up and down again
    const up = eio(seg(t, 3.3, 4.0)) * (1 - eio(seg(t, 5.2, 5.9)));
    R.raise(this, 0.85 * up + 0.05 * Math.sin(t * 3) * up);
    // music from the radio, and she sways to it
    const mu = t > 6.0 ? 1 : 0;
    this.n.forEach((n, k) => { const ph = ((t - 6.1) * 0.45 + k / 3) % 1; n.setAttribute('transform', 'translate(' + (280 + 60 * ph + 20 * Math.sin(ph * 9)) + ' ' + (470 - 220 * ph) + ') scale(.6)'); n.style.opacity = mu * Math.sin(Math.PI * ph); });
    this.head.setAttribute('transform', 'rotate(' + (t > 6.2 && t < 9.0 ? 5 * Math.sin((t - 6.2) * 3) : t > 9.2 ? 6 * eio(seg(t, 9.2, 9.8)) : 0) + ' 0 30)');
    // a short walk outside: the door opens on the light
    this.od.setAttribute('opacity', eo(seg(t, 9.0, 9.7)));
    R.look(this.eyes, t, 0.4, t > 9.2 ? 4 * eio(seg(t, 9.2, 9.8)) : 0, 0);
    this.mouth.setAttribute('d', t > 3.3 ? R.mouthHappy : t > 2.4 && t < 3.3 ? R.mouthO : R.mouthNeutral);
  },
});
