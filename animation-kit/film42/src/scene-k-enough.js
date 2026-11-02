const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], UP = [1, 3];
// the three examples Nira gives, right to left
const EX = [[9.3, 910, 470, 'shoe', 'ספורט', 560], [9.8, 710, 410, 'yarn', 'תחביב', 500], [11.1, 510, 470, 'people', 'זמן עם מישהו', 560]];
kit.scene('k-enough', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kn', -220) + R.dayBar('kn', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + (UP.includes(k) ? R.warm('kn-w' + k) : R.grey('kn-g' + k)) + '</g>').join('') +
      EX.map((e, k) => '<g class="kn-e' + k + '">' + R.warm('kn-x' + k, e[3]) + '</g>').join('') + '</svg>' +
      EX.map((e, k) => '<div class="tag kn-t' + k + '">' + e[4] + '</div>').join('') +
      '<div class="tag tag-warm kn-a">לוודא שיש לנו מספיק כאלה</div><div class="tag tag-cool kn-b">משהו שאנחנו נהנים ממנו</div></div>'));
    Object.assign(this, R.refs(kit, 'kn', ['body', 'head', 'eyes', 'mouth', 'e0', 'e1', 'e2', 't0', 't1', 't2', 'a', 'b']));
    this.gl = UP.map((k) => kit.stage.querySelector('.kn-w' + k + '-glow'));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // self-care: making sure there are enough of the warm ones
    const g = eio(seg(t, 3.5, 4.3));
    this.gl.forEach((el, k) => (el.style.opacity = 0.4 * g * (0.75 + 0.25 * Math.sin(t * 3 + k))));
    // things we enjoy: sport, a hobby, time with someone who matters
    EX.forEach(([a, x, y, , , ty], k) => {
      R.xf(this['e' + k], x, y + Math.sin(t * 1.6 + k) * 6 * eo(seg(t, a, a + 0.6)), 1.55 * eob(seg(t, a - 0.1, a + 0.4), 1.7), eo(seg(t, a - 0.1, a + 0.1)));
      R.place(this['t' + k], x, lerp(ty + 12, ty, eo(seg(t, a + 0.1, a + 0.5))), eo(seg(t, a + 0.1, a + 0.5)));
    });
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 8.8, 9.6))) + ' 0 30)');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)) * (1 - eo(seg(t, 7.0, 7.3))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
