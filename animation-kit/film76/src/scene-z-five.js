const { seg, eo, eio, eob, lerp } = kit;
// instead, five simple steps: notice, steady, choose, take a step, acknowledge — once you see how each leads to the next, it's easier to connect
const P5 = 11.84, IN = [3.75, 5.28, 6.91, 8.33, 10.05], SY = 880, BY = 620;
kit.scene('z-five', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('zf', { sun: true, sunX: 880, sunY: 230 }) +
      R.SX.map((x, k) => R.stone('zf-g' + k, x, SY, 88)).join('') +
      R.SX.slice(0, 4).map((x, k) => '<path class="zf-ar' + k + '" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:9;stroke-linecap:round" d="M' + (x - 40) + ' ' + (SY - 50) + ' Q' + (x - 97) + ' ' + (SY - 120) + ' ' + (x - 155) + ' ' + (SY - 50) + '"/>').join('') +
      '<g class="zf-w"><g class="zf-a">' + R.ruth('zf', 'stand') + '</g><g class="zf-b">' + R.ruth('zf-b', 'step') + '</g></g>' +
      R.SX.map((x, k) => '<g class="zf-s' + k + '">' + R.stepB('zf-sb' + k, k, 60) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm zf-a5">חמישה שלבים פשוטים</div>' + R.STEPS.map((s, k) => '<div class="tag zf-t' + k + '">' + s + '</div>').join('') +
      '<div class="tag tag-cool zf-c">כל שלב מוביל לשלב הבא</div></div>'));
    kit.css('.zf-st0,.zf-st1,.zf-st2,.zf-st3,.zf-st4,.zf-st5,.zf-st6,.zf-st7,.zf-st8,.zf-st9,.zf-st10{display:none}');
    Object.assign(this, R.refs(kit, 'zf', ['w', 'a', 'b', 'eyes', 'mouth', 'a5', 'c']));
    this.s = R.SX.map((x, k) => kit.stage.querySelector('.zf-s' + k)); this.tg = R.SX.map((x, k) => kit.stage.querySelector('.zf-t' + k));
    this.top = R.SX.map((x, k) => kit.stage.querySelector('.zf-g' + k + '-top')); this.ar = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.zf-ar' + k));
  },
  render(t) {
    R.SX.forEach((x, k) => {
      const a = IN[k], p = eob(seg(t, a - 0.1, a + 0.4), 1.6), lit = eo(seg(t, a, a + 0.4));
      this.s[k].setAttribute('transform', 'translate(' + x + ' ' + (BY + 5 * Math.sin(t * 1.4 + k)) + ') scale(' + Math.max(0.001, p) + ')');
      this.top[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * lit) + '%, var(--ground))';
      R.place(this.tg[k], x, lerp(512, 500, lit), lit);
    });
    // arrows draw from each stone to the next, and Ruth hops along them
    const hop = (k) => P5 + 2.6 + k * 0.85;
    this.ar.forEach((el, k) => { const d = eio(seg(t, hop(k) - 0.4, hop(k) + 0.3)); el.style.strokeDasharray = d + ' 1'; el.style.opacity = d > 0 ? 1 : 0; });
    let x = R.SX[0], lift = 0, moving = false;
    for (let k = 0; k < 4; k++) { const p = eio(seg(t, hop(k), hop(k) + 0.6)); if (p > 0) { x = lerp(R.SX[k], R.SX[k + 1], p); lift = Math.sin(Math.PI * p) * 60; moving = moving || (p > 0 && p < 1); } }
    this.a.style.opacity = moving ? 0 : 1; this.b.style.opacity = moving ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + x + ' ' + (SY - 4 - lift) + ') scale(.34)');
    this.w.style.opacity = eo(seg(t, 0.2, 0.8));
    R.blink(this.eyes, t, 0.4); this.mouth.setAttribute('d', R.BIG);
    R.place(this.a5, 540, lerp(84, 70, eo(seg(t, 2.02, 2.4))), eo(seg(t, 2.02, 2.4)));
    R.place(this.c, 540, lerp(164, 150, eo(seg(t, P5 + 3.34, P5 + 3.8))), eo(seg(t, P5 + 3.34, P5 + 3.8)));
  },
});
