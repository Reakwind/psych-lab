const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('k-room', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kr', 0) + R.dayBar('kr', 220) +
      '<g class="kr-w0">' + R.warm('kr-wa', 'shoe') + '</g><g class="kr-w1">' + R.warm('kr-wb', 'people') + '</g>' +
      X.map((x, k) => '<g class="kr-s' + k + '">' + R.grey('kr-g' + k, 136) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool kr-a">קל לשכוח לדאוג לעצמכם</div><div class="tag tag-warm kr-b">לפנות מקום למשהו שחשוב</div><div class="tag kr-c">לוותר על משהו שפחות חשוב כרגע</div></div>'));
    Object.assign(this, R.refs(kit, 'kr', ['body', 'head', 'eyes', 'mouth', 'w0', 'w1', 's0', 's1', 's2', 's3', 's4', 'a', 'b', 'c']));
    this.gl = kit.stage.querySelector('.kr-wb-glow');
    X.forEach((x, k) => R.xf(this['s' + k], x, 220));
  },
  render(t) {
    R.blink(this.eyes, t, 1.3);
    this.body.setAttribute('transform', 'translate(0 ' + 10 * (1 - eio(seg(t, 7.6, 8.6))) + ') scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // squeezed out, they drift away and are forgotten
    const f = eio(seg(t, 1.4, 3.0));
    R.xf(this.w0, 670 + 60 * f, 110 - 60 * f + Math.sin(t * 2) * 5, 0.75, 1 - f);
    // making room for something that matters: one comes back, looking for a place
    const back = eio(seg(t, 3.4, 4.6)), land = eio(seg(t, 7.2, 8.0));
    const hover = 0.75 * (1 - f * (1 - back)) + 0.25 * back;
    R.xf(this.w1, lerp(lerp(350, 330, f), 510, back), lerp(lerp(110, 70, f), 120, back) + (1 - land) * Math.sin(t * 2.6) * 8 * back + land * (220 - 120), lerp(0.75, 1, back), lerp(1 - 0.6 * f, 1, back));
    this.gl.style.opacity = 0.4 * eio(seg(t, 7.8, 8.6));
    // letting go of something less important for now: one grey block lifts away
    const off = eio(seg(t, 6.2, 7.2));
    R.xf(this.s2, 510 + 320 * off, 220 + 520 * off * off, 1 - 0.3 * off, 1 - eo(seg(t, 6.8, 7.3)));
    this.head.setAttribute('transform', 'rotate(' + (-6 * back + 10 * off * (1 - land)) + ' 0 30) translate(0 ' + 10 * (1 - eio(seg(t, 7.6, 8.6))) + ')');
    this.mouth.setAttribute('d', t > 8.0 ? 'M-12 24 Q2 36 16 24' : t > 3.6 ? 'M-10 26 Q2 32 14 26' : 'M-10 30 Q2 24 14 30');
    R.place(this.a, 540, lerp(312, 300, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)) * (1 - eo(seg(t, 3.2, 3.5))));
    R.place(this.b, 540, lerp(312, 300, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)) * (1 - eo(seg(t, 5.9, 6.2))));
    R.place(this.c, 540, lerp(312, 300, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)));
  },
});
