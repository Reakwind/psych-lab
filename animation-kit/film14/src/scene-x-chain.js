const { seg, eo, eio, eob, lerp } = kit;
// stress spreads: to breathing, muscles, sleep, mood and energy, and the Parkinson's symptoms can grow
const C = [['breath', 'נשימה', 2.16, 860, 600, 680], ['muscle', 'שרירים', 3.31, 800, 360, 440], ['sleep', 'שינה', 4.68, 540, 230, 140], ['mood', 'מצב רוח', 5.75, 280, 360, 440], ['energy', 'אנרגיה', 6.9, 220, 600, 680]];
kit.scene('x-chain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(540 980)">' + R.ruth('x9', 'stand') + '</g>' +
      '<g class="x9-trs"><g transform="translate(470 790) scale(-1.4 1.4)">' + R.tremor('x9-t1') + '</g><g transform="translate(610 790) scale(1.4)">' + R.tremor('x9-t2') + '</g></g>' +
      C.map((c, k) => '<path class="x9-ar' + k + '" pathLength="1" d="M540 380 L' + c[3] + ' ' + c[4] + '" style="fill:none;stroke:#D96C6C;stroke-width:7;stroke-linecap:round;stroke-dasharray:0 1"/>').join('') +
      '<g class="x9-mw" transform="translate(540 440) scale(.5)">' + R.meter('x9-mt') + '</g>' + C.map((c, k) => R.cbadge('x9-c' + k, c[0])).join('') + '</svg>' +
      C.map((c, k) => '<div class="tag x9-n' + k + '">' + c[1] + '</div>').join('') + '<div class="tag tag-red x9-ml">מתח נפשי</div><div class="tag tag-warm x9-a">הסימפטומים עלולים להתגבר</div></div>'));
    Object.assign(this, R.refs(kit, 'x9', ['eyes', 'head', 'mouth', 'trs', 'mt-fill', 'ml', 'a']));
    this.c = C.map((c, k) => kit.stage.querySelector('.x9-c' + k)); this.n = C.map((c, k) => kit.stage.querySelector('.x9-n' + k)); this.ar = C.map((c, k) => kit.stage.querySelector('.x9-ar' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    R.setMeter(this['mt-fill'], 0.5 + 0.3 * eio(seg(t, 0.5, 2.0)));
    C.forEach(([k0, w, a, x, y, ty], k) => {
      const d = eio(seg(t, a - 0.5, a)); this.ar[k].style.strokeDasharray = d + ' 1'; this.ar[k].style.opacity = (d > 0 ? 1 : 0) * (1 - 0.6 * eo(seg(t, 8.5, 9.5)));
      R.setG(this.c[k], x, y + Math.sin(t * 1.5 + k) * 4, eob(seg(t, a - 0.1, a + 0.4), 1.5), eo(seg(t, a - 0.1, a + 0.1)));
      R.place(this.n[k], x, lerp(ty + 10, ty, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    const sym = eio(seg(t, 9.5, 12.5));
    this.trs.style.opacity = sym; this.trs.setAttribute('transform', 'translate(' + Math.sin(t * 34) * 3 * sym + ' 0)');
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.8) * 3 + ' 0 30) translate(0 ' + 4 * sym + ')');
    this.mouth.setAttribute('d', sym > 0.4 ? R.mouthSad : R.mouthNeutral);
    R.place(this.ml, 670, lerp(384, 372, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 12.05, 12.4))), eo(seg(t, 12.05, 12.4)));
  },
});
