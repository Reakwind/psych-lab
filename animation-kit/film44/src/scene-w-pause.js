const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('w-pause', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wq', -60) + '<g class="wq-day">' + R.dayBar('wq', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + R.grey('wq-g' + k, k ? 136 : 150) + '</g>').join('') +
      [750, 590, 430].map((x, k) => '<g transform="translate(' + x + ' 146) scale(.95)">' + R.grey('wq-p' + k, 130) + '</g>').join('') + '</g>' +
      '<g transform="translate(880 400) scale(.9)">' + R.clock('wq-c') + '</g><g class="wq-ph">' + R.phone('wq-p', 0, 0, 'ariel') + '</g></svg>' +
      '<div class="tag tag-warm wq-a">בואו ניקח עכשיו כמה דקות</div><div class="tag wq-b">כדי להתבונן בזה</div></div>'));
    Object.assign(this, R.refs(kit, 'wq', ['body', 'head', 'eyes', 'mouth', 'day', 'ph', 'a', 'b']));
    this.ch = kit.stage.querySelector('.wq-c-h'); this.cm = kit.stage.querySelector('.wq-c-m');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    // Ariel, on the phone: let's take a few minutes now. The clock stops; the day steps back.
    const m = t < 0.9 ? 220 * t : 198 + 60 * eo(seg(t, 0.9, 1.4));
    this.cm.setAttribute('transform', 'rotate(' + m + ')'); this.ch.setAttribute('transform', 'rotate(' + m / 12 + ')');
    this.day.style.opacity = 1 - 0.75 * eio(seg(t, 0.9, 1.8));
    this.ph.setAttribute('transform', 'translate(620 620) scale(' + 2.2 * eob(seg(t, 0.4, 1.0), 1.5) + ') rotate(-6)');
    const up = eio(seg(t, 0.8, 1.8));
    this.body.setAttribute('transform', 'translate(0 ' + 10 * (1 - up) + ') scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 + 16 * up) + ' 0 30) translate(0 ' + 10 * (1 - up) + ')');
    this.mouth.setAttribute('d', t > 1.4 ? 'M-10 26 Q2 32 14 26' : 'M-10 30 Q2 24 14 30');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
  },
});
