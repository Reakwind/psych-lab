const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-tense', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(578 866)">' + R.roots('gt-a') + '</g><g transform="translate(622 866) scale(-1 1)">' + R.roots('gt-b') + '</g>' + R.seated('gt', 0) +
      '<path class="gt-zig" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:8;stroke-linecap:round;stroke-linejoin:round" d="M380 470 l16 -20 l16 20 l16 -20 l16 20 M560 470 l16 -20 l16 20 l16 -20 l16 20"/>' +
      '<g class="gt-dots">' + [[380, 330], [460, 300], [560, 290], [640, 340], [420, 380]].map(([x, y]) => '<circle class="slate" cx="' + x + '" cy="' + y + '" r="10"/>').join('') + '</g>' +
      '<path class="gt-worry" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:7;stroke-linecap:round;opacity:.7" d="M440 250 q15 -24 30 0 t30 0 t30 0 t30 0"/></svg>' +
      '<div class="tag gt-cap">מתוחים · מפוזרים · דואגים</div><div class="tag tag-warm gt-help">קרקוע יכול לעזור</div><div class="tag tag-cool gt-not">לא חייבים לחכות לרגע כזה</div></div>'));
    Object.assign(this, R.refs(kit, 'gt', ['body', 'head', 'eyes', 'mouth', 'zig', 'dots', 'worry', 'cap', 'help', 'not']));
    this.ra = kit.stage.querySelector('.gt-a-r'); this.rb = kit.stage.querySelector('.gt-b-r');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    // tense, scattered, caught in worry...
    const z = eo(seg(t, 4.0, 4.5)), d = eo(seg(t, 4.6, 5.1)), w = eo(seg(t, 6.0, 6.6)), calm = eio(seg(t, 7.0, 8.6));
    this.zig.style.strokeDasharray = z + ' 1'; this.zig.style.opacity = z > 0 ? 1 - calm : 0;
    this.zig.setAttribute('transform', 'translate(0 ' + Math.sin(t * 9) * 2 + ')');
    this.dots.style.opacity = d * (1 - calm); this.dots.setAttribute('transform', 'translate(' + Math.sin(t * 5) * 8 + ' ' + Math.cos(t * 4) * 6 + ')');
    this.worry.style.strokeDasharray = w + ' 1'; this.worry.style.opacity = w > 0 ? 0.7 * (1 - calm) : 0;
    this.body.setAttribute('transform', 'translate(0 ' + (-6 * z * (1 - calm)) + ') scale(1 ' + kit.breathe(t, 0.008, lerp(2, 4, calm)) + ')');
    this.mouth.setAttribute('d', calm > 0.5 ? 'M-12 24 Q2 36 16 24' : z > 0.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    // ...grounding helps there
    [this.ra, this.rb].forEach((el) => { el.style.strokeDasharray = calm + ' 1'; el.style.opacity = calm > 0 ? 1 : 0; });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)) * (1 - eo(seg(t, 8.2, 8.6))));
    R.place(this.help, 540, lerp(84, 70, eo(seg(t, 8.4, 8.9))), eo(seg(t, 8.4, 8.9)));
    R.place(this.not, 540, lerp(1000, 988, eo(seg(t, 8.6, 9.1))), eo(seg(t, 8.6, 9.1)));
  },
});
