const { seg, eo, eio, eob, lerp } = kit;
const W = [['להפחית מעט את הדריכות', 3.71, 5.9], ['לשחרר חלק מהמתח שהגוף מחזיק', 6.09, 7.6], ['רגע של הפוגה מעומס המחשבות', 7.78, 99]];
kit.scene('x-ease', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x11', 0) + R.CALM.map((c, k) => R.cbadge('x11-c' + k, c, 64)).join('') +
      [0, 1, 2].map((k) => '<g class="x11-b' + k + '">' + R.balloon('x11-bl' + k) + '</g>').join('') + '</svg>' +
      W.map((w, k) => '<div class="tag tag-warm x11-n' + k + '">' + w[0] + '</div>').join('') + '<div class="tag tag-cool x11-a">נחקרו ונמצאו יעילים</div><div class="tag tag-red x11-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x11', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'a', 'ml']));
    this.c = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.x11-c' + k)); this.n = W.map((w, k) => kit.stage.querySelector('.x11-n' + k)); this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.x11-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the tools ease things a little: the meter drops a notch, the shoulders let go, the racing thoughts slow and drift off
    [840, 640, 440, 240].forEach((x, k) => R.setG(this.c[k], x, 230 + Math.sin(t * 1.4 + k) * 5, 1));
    const rel = eio(seg(t, 4.4, 6.2));
    this.body.setAttribute('transform', 'translate(0 ' + 8 * (1 - rel) + ') scale(1 ' + kit.breathe(t, 0.012 + 0.01 * rel, 3.6 + rel) + ')');
    this.tn.style.opacity = (1 - rel) * (0.6 + 0.4 * Math.abs(Math.sin(t * 9))); this.pf.style.opacity = 0;
    R.setMeter(this['mt-fill'], 0.8 - 0.15 * eio(seg(t, 3.6, 4.6)) - 0.1 * eio(seg(t, 6.0, 7.0)) - 0.05 * eio(seg(t, 7.8, 8.8)));
    const slow = eio(seg(t, 7.6, 9.0)), away = eio(seg(t, 8.0, 10.0));
    this.b.forEach((b, k) => { const a = t * lerp(2.4, 0.4, slow) + k * 2.09; R.setG(b, 500 + Math.cos(a) * 180 - 500 * away * (1 + k * 0.3), 360 + Math.sin(a) * 50 - 250 * away, 0.7, 1 - eo(seg(t, 9.0, 10.0))); });
    this.head.setAttribute('transform', 'rotate(' + lerp(-4, 4, rel) + ' 0 30) translate(0 ' + 6 * (1 - rel) + ')');
    this.mouth.setAttribute('d', rel > 0.5 ? R.mouthHappy : R.mouthNeutral);
    W.forEach(([w, a, b], k) => R.place(this.n[k], 540, lerp(972, 960, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b - 0.2, b)))));
    R.place(this.a, 540, 40, 1 - eo(seg(t, 0.2, 0.6)));
    R.place(this.ml, 920, 886, 1);
  },
});
