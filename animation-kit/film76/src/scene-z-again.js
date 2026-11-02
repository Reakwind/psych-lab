const { seg, eo, eio, eob, lerp } = kit;
// on another day, in another situation, these five steps can look completely different: notice. steady. choose. take a step. acknowledge.
const IN = [6.65, 8.22, 9.84, 11.26, 12.98], SY = [930, 800, 900, 780, 880], SR = [84, 70, 80, 66, 76];
kit.scene('z-again', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('za', { sun: true, sunX: 860, sunY: 250 }) +
      '<rect width="1080" height="1080" style="fill:var(--second)" opacity=".1"/>' + [0, 1, 2].map((k) => '<g class="za-cl' + k + '">' + R.greyCloud('za-c' + k) + '</g>').join('') +
      R.SX.map((x, k) => R.stone('za-g' + k, x, SY[k], SR[k])).join('') +
      '<g class="za-w"><g class="za-a">' + R.ruth('za', 'stand') + '</g><g class="za-b">' + R.ruth('za-b', 'step') + '</g></g>' +
      R.SX.map((x, k) => '<g class="za-s' + k + '">' + R.stepB('za-sb' + k, k, 54) + '</g>').join('') + '</svg>' +
      '<div class="tag za-x">ביום אחר, במצב אחר</div><div class="tag tag-cool za-y">חמשת השלבים יכולים להיראות אחרת לגמרי</div>' + R.STEPS.map((s, k) => '<div class="tag tag-warm za-t' + k + '">' + s + '</div>').join('') + '</div>'));
    kit.css('.za-st0,.za-st1,.za-st2,.za-st3,.za-st4,.za-st5,.za-st6,.za-st7,.za-st8,.za-st9,.za-st10{display:none}');
    Object.assign(this, R.refs(kit, 'za', ['w', 'a', 'b', 'eyes', 'mouth', 'sun', 'x', 'y']));
    this.s = R.SX.map((x, k) => kit.stage.querySelector('.za-s' + k)); this.tg = R.SX.map((x, k) => kit.stage.querySelector('.za-t' + k));
    this.top = R.SX.map((x, k) => kit.stage.querySelector('.za-g' + k + '-top')); this.cl = [0, 1, 2].map((k) => kit.stage.querySelector('.za-cl' + k));
    this.gl = R.SX.map((x, k) => kit.stage.querySelector('.za-sb' + k + '-glow'));
  },
  render(t) {
    // a different sky: clouds drift over the sun
    this.cl.forEach((c, k) => c.setAttribute('transform', 'translate(' + (((t * (14 + k * 6) + k * 400) % 1400) - 160) + ' ' + (180 + k * 90) + ') scale(' + (1.2 - k * 0.2) + ')'));
    this.sun.style.opacity = 0.55;
    R.SX.forEach((x, k) => {
      const a = IN[k], lit = eo(seg(t, a, a + 0.4)), p = eob(seg(t, 0.6 + k * 0.25, 1.1 + k * 0.25), 1.6);
      this.s[k].setAttribute('transform', 'translate(' + x + ' ' + (SY[k] - 235 + 5 * Math.sin(t * 1.4 + k)) + ') scale(' + Math.max(0.001, p * (1 + 0.12 * lit)) + ')');
      this.s[k].style.opacity = 0.5 + 0.5 * lit; this.gl[k].setAttribute('opacity', 0.3 * lit);
      this.top[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * lit) + '%, var(--ground))';
      R.place(this.tg[k], x, lerp(SY[k] - 335, SY[k] - 347, lit), lit);
    });
    // Ruth hops from stone to stone on each word
    let x = R.SX[0], y = SY[0], lift = 0, moving = false;
    for (let k = 0; k < 4; k++) { const p = eio(seg(t, IN[k + 1] - 0.5, IN[k + 1] + 0.1)); if (p > 0) { x = lerp(R.SX[k], R.SX[k + 1], p); y = lerp(SY[k], SY[k + 1], p); lift = Math.sin(Math.PI * p) * 50; moving = moving || p < 1; } }
    this.a.style.opacity = moving ? 0 : 1; this.b.style.opacity = moving ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + x + ' ' + (y - 4 - lift) + ') scale(.3)'); this.w.style.opacity = eo(seg(t, 5.6, 6.2));
    R.blink(this.eyes, t, 0.4); this.mouth.setAttribute('d', R.SMILE);
    R.place(this.x, 540, lerp(84, 70, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.y, 540, lerp(164, 150, eo(seg(t, 3.5, 3.9))), eo(seg(t, 3.5, 3.9)) * (1 - eo(seg(t, 6.3, 6.6))));
  },
});
