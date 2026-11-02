const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('w-air', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wa', 0) + R.dayBar('wa', 220) +
      X.map((x, k) => '<g class="wa-s' + k + '">' + R.grey('wa-g' + k, 136) + '</g>').join('') +
      '<path class="wa-b0" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round;opacity:0"/><path class="wa-b1" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round;opacity:0"/>' +
      '<g class="wa-w">' + R.warm('wa-t', 'mug') + '</g></svg>' +
      '<div class="tag tag-cool wa-a">אוויר בתוך יום עמוס</div><div class="tag tag-warm wa-b">מזכירים לנו מי אנחנו ומה חשוב לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'wa', ['body', 'head', 'eyes', 'mouth', 's0', 's1', 's2', 's3', 's4', 'b0', 'b1', 'w', 'a', 'b']));
    this.gl = kit.stage.querySelector('.wa-t-glow');
  },
  render(t) {
    R.blink(this.eyes, t, 1.4);
    // the grey blocks part, and air blows through the gap
    const part = eio(seg(t, 1.0, 2.0));
    X.forEach((x, k) => R.xf(this['s' + k], x + (k < 2 ? 60 : k > 2 ? -60 : 0) * part, 220, 1, k === 2 ? 1 - part : 1));
    [0, 1].forEach((k) => { this['b' + k].setAttribute('d', R.wavePath(380, 140 + k * 140, 320, 12, 1.5, -t * 4 + k)); this['b' + k].style.opacity = 0.7 * eio(seg(t, 1.6, 2.4)); });
    // a good moment rises into it: it lifts us
    const up = eio(seg(t, 2.2, 3.0)), lift = eio(seg(t, 4.2, 5.0));
    R.xf(this.w, 510, lerp(420, 220, up) - 30 * lift + Math.sin(t * 2) * 5, 1.1 * up, up);
    this.gl.style.opacity = 0.45 * lift;
    this.body.setAttribute('transform', 'translate(0 ' + (-6 * lift) + ') scale(1 ' + kit.breathe(t, 0.012 + 0.012 * part, 4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 * up) + ' 0 30) translate(0 ' + (-6 * lift) + ')');
    this.mouth.setAttribute('d', t > 4.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, 4.3, 4.6))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
  },
});
