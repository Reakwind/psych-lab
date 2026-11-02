const { seg, eo, eio, eob, lerp } = kit;
const P7 = 17.64;
kit.scene('b-reverse', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('br', -170) +
      '<path class="br-wave" style="fill:none;stroke:var(--main);stroke-width:12;stroke-linecap:round;stroke-linejoin:round"/>' +
      '<g class="br-dialg"><g transform="scale(1.2)">' + R.dial('br-d') + '</g></g><g transform="translate(940 760)">' + R.meter('br-m') + '</g>' +
      '<g class="br-badge">' + R.tool('br-b', 1, 66) + '<path class="br-ok" pathLength="1" style="fill:none;stroke:#2E8B57;stroke-width:14;stroke-linecap:round;stroke-linejoin:round" d="M40 40 L62 64 L104 14"/></g></svg>' +
      '<div class="tag tag-cool br-cap">ועובד גם בכיוון ההפוך</div><div class="tag br-mlab">מתח</div><div class="tag br-ex">נשיפה ארוכה יותר</div><div class="tag tag-warm br-rest">מנוחה והתאוששות</div>' +
      '<div class="tag br-not">לא נעלם לגמרי</div><div class="tag tag-warm br-tool">כלי שימושי, מוכח מחקרית</div></div>'));
    Object.assign(this, R.refs(kit, 'br', ['body', 'head', 'eyes', 'mouth', 'wave', 'dialg', 'badge', 'ok', 'cap', 'mlab', 'ex', 'rest', 'not', 'tool']));
    this.hand = kit.stage.querySelector('.br-d-hand'); this.fill = kit.stage.querySelector('.br-m-fill');
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)) * (1 - eo(seg(t, P7 - 0.6, P7 - 0.2))));
    // a dial Ruth can turn: deeper breaths, a longer out-breath...
    const d = eob(seg(t, 3.6, 4.2), 1.6), deep = eio(seg(t, 7.8, 9.0)), long = eio(seg(t, 9.2, 10.4));
    this.dialg.setAttribute('transform', 'translate(700 560) scale(' + d + ')');
    this.hand.setAttribute('transform', 'rotate(' + lerp(70, lerp(10, -50, long), deep) + ')');
    // the wave: out-breath stretched (asymmetric) once she lengthens it
    let w = '';
    for (let i = 0; i <= 120; i++) {
      const x = 90 + 900 * i / 120, ph = (i / 120) * lerp(3, 2, deep) - t * lerp(0.5, 0.3, deep), f = ph - Math.floor(ph);
      const inF = lerp(0.5, 0.35, long), v = f < inF ? Math.sin(Math.PI * f / inF / 2) : Math.cos(Math.PI * (f - inF) / (1 - inF) / 2);
      w += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + (300 - lerp(40, 80, deep) * (v * 2 - 1)).toFixed(1);
    }
    this.wave.setAttribute('d', w);
    // ...and the tension meter comes down — not to zero
    const level = lerp(0.78, 0.32, eio(seg(t, 11.1, 13.4))) + 0.02 * Math.sin(t * 2);
    this.fill.setAttribute('y', -8 - 274 * level); this.fill.setAttribute('height', 274 * level);
    this.mouth.setAttribute('d', level < 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, lerp(3.6, 6, long)) + ')');
    R.place(this.mlab, 940, 790, 1);
    R.place(this.ex, 700, lerp(704, 692, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)) * (1 - eo(seg(t, P7 + 4.6, P7 + 5.0))));
    R.place(this.rest, 540, lerp(84, 70, eo(seg(t, 14.9, 15.4))), eo(seg(t, 14.9, 15.4)) * (1 - eo(seg(t, P7 + 0.2, P7 + 0.6))));
    R.place(this.not, 940, lerp(392, 380, eo(seg(t, P7 + 1.4, P7 + 1.9))), eo(seg(t, P7 + 1.4, P7 + 1.9)));
    const b = eob(seg(t, P7 + 5.4, P7 + 6.0), 1.8);
    this.badge.setAttribute('transform', 'translate(700 ' + (lerp(560, 560, b)) + ') scale(' + b + ')');
    this.dialg.style.opacity = 1 - eo(seg(t, P7 + 5.0, P7 + 5.5));
    this.ok.style.strokeDasharray = eo(seg(t, P7 + 6.3, P7 + 6.8)) + ' 1'; this.ok.style.opacity = t > P7 + 6.3 ? 1 : 0;
    R.place(this.tool, 540, lerp(84, 70, eo(seg(t, P7 + 6.4, P7 + 6.9))), eo(seg(t, P7 + 6.4, P7 + 6.9)));
  },
});
