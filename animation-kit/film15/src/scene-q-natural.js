const { seg, eo, eio, eob, lerp } = kit;
// the square melts into a soft wave: Ruth's own, natural breath
kit.scene('q-natural', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qn', -230, false) + R.box('qnb') +
      '<g class="qn-r0"><circle r="22" style="fill:var(--main);stroke:var(--second);stroke-width:5"/></g><g class="qn-r1"><circle r="22" style="fill:var(--main);stroke:var(--second);stroke-width:5"/></g></svg>' +
      '<div class="tag tag-warm qn-a">ואפשר לחזור לנשימה הטבעית</div></div>'));
    Object.assign(this, R.refs(kit, 'qn', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'r0', 'r1', 'a']));
    this.x = R.boxRefs(kit, 'qnb');
  },
  render(t) {
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    if (t < 1.0) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    const m = eio(seg(t, 0.6, 2.2));
    R.setBox(this.x, { draw: [1 - m, 1 - m, 1 - m, 1 - m], ticks: 1 - m, dot: 4, dotA: 1 - m, lit: 0, ring: 0.3 * (1 - m), wave: m, waveAmp: 0.8, wavePh: -t * 1.4 });
    [this.r0, this.r1].forEach((r, k) => { r.setAttribute('transform', 'translate(' + (k ? 690 : 770) + ' 150)'); r.style.opacity = 1 - eo(seg(t, 0.3, 1.0)); });
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.018, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 4 * m) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.2 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)));
  },
});
