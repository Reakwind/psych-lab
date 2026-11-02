const { seg, eo, eio, eob, lerp } = kit;
const W = [[4.9, 'דאגה'], [5.5, 'מחשבה שלא מרפה'], [7.9, 'עומס']];
kit.scene('g-drift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('gd', 0) +
      '<path d="M500 440 Q572 360 860 200" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.55"/>' +
      '<g class="gd-b"><g transform="scale(2.2)">' + R.balloon('gd-bl') + '</g>' +
      '<path class="gd-i0" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:8;stroke-linecap:round" d="M-60 0 q15 -24 30 0 t30 0 t30 0 t30 0"/>' +
      '<path class="gd-i1 ink" style="stroke-width:8;opacity:0" d="M-30 -10 a30 30 0 1 1 10 26 M-34 0 l-6 22 l22 -4"/>' +
      '<g class="gd-i2" opacity="0"><rect class="slate-dk" x="-46" y="0" width="92" height="22" rx="6"/><rect class="slate" x="-40" y="-22" width="80" height="22" rx="6"/><rect class="slate-dk" x="-34" y="-44" width="68" height="22" rx="6"/></g></g></svg>' +
      W.map((w, k) => '<div class="tag gd-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool gd-room">יושבים בחדר</div></div>'));
    Object.assign(this, R.refs(kit, 'gd', ['body', 'head', 'eyes', 'mouth', 'b', 'i0', 'i1', 'i2', 'w0', 'w1', 'w2', 'room']));
    this.dots = kit.stage.querySelectorAll('.gd-bl .metal');
  },
  render(t) {
    R.blink(this.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.b.setAttribute('transform', 'translate(860 ' + (170 + Math.sin(t * 1.6) * 8) + ')');
    R.place(this.room, 250, lerp(592, 580, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    // what the attention is caught in: a worry, a thought that won't let go, a pile of too much
    const a = eo(seg(t, 4.8, 5.3)), b = eo(seg(t, 5.4, 5.9)), c = eo(seg(t, 7.8, 8.3));
    this.dots.forEach((d) => (d.style.opacity = 1 - a));
    this.i0.style.strokeDasharray = a + ' 1'; this.i0.style.opacity = a > 0 ? 1 - b : 0;
    this.i1.style.opacity = b * (1 - c); this.i1.setAttribute('transform', 'rotate(' + t * 90 + ')');
    this.i2.setAttribute('opacity', c);
    [a * (1 - b), b * (1 - c), c].forEach((o, k) => R.place(this['w' + k], 860, 330, o));
    this.mouth.setAttribute('d', t > 5 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(6 0 30)');
  },
});
