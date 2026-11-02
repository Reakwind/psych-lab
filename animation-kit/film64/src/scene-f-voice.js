const { seg, eo, eio, eob, lerp } = kit;
// the inner voice joins in: harsh, critical, judging
const W = [[4.3, 'תקיף', 150], [4.8, 'ביקורתי', 225], [5.55, 'שיפוטי', 300]];
kit.scene('f-voice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fv', 0) +
      '<g class="fv-vg"><g class="fv-vs">' + R.voice('fv-v') + '</g></g></svg>' + R.loud('fv') +
      W.map((w, k) => '<div class="tag fv-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'fv', ['body', 'head', 'eyes', 'mouth', 'vg', 'vs', 'c', 'bang']));
    this.v = R.refs(kit, 'fv-v', ['eyes', 'mouth']);
    this.w = W.map((_, k) => kit.stage.querySelector('.fv-w' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 1.3); R.blink(this.v.eyes, t, 2.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    const sh = 4;
    R.put(this.c, lerp(430, 470, eio(seg(t, 0, 1.5))) + Math.sin(t * 31) * sh, 250 + Math.cos(t * 27) * sh * 0.6, 1.1, Math.sin(t * 23) * 1.5, 1);
    // the voice pops up by her head and keeps talking
    const p = eob(seg(t, 0.5, 1.1), 1.8);
    this.vg.setAttribute('transform', 'translate(790 ' + (480 + Math.sin(t * 2.2) * 8) + ')');
    this.vs.setAttribute('transform', 'scale(' + p * 1.25 + ')');
    const talking = t > 1.2 && t < 9.0 && Math.floor(t * 5) % 2;
    this.v.mouth.setAttribute('d', talking ? 'M-2 6 Q10 -4 22 6 Q10 12 -2 6' : 'M-2 6 Q10 0 22 6');
    W.forEach(([a, , y], k) => R.place(this.w[k], 900, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
    // what it says brings her down
    const down = eio(seg(t, 7.6, 8.6));
    this.head.setAttribute('transform', 'rotate(' + (-10 * (1 - eio(seg(t, 0, 1.2))) + 6 * down) + ' 0 30) translate(0 ' + 8 * down + ')');
    this.mouth.setAttribute('d', 'M-10 28 Q2 ' + lerp(26, 22, down) + ' 14 28');
  },
});
