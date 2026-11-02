const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-notest', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="an3-met" style="fill:none;stroke:var(--second);stroke-width:7;stroke-dasharray:18 14;opacity:.45"/><path class="an3-own" style="fill:none;stroke:var(--main);stroke-width:12;stroke-linecap:round"/>' +
      '<g class="an3-card"><rect x="-90" y="-70" width="180" height="140" rx="20" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/></g>' +
      '<path class="an3-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:12;stroke-linecap:round" d="M800 270 L960 410 M960 270 L800 410"/></svg>' +
      '<div class="count an3-score" style="color:#C0392B">100</div><div class="tag an3-l1">קצב קבוע</div><div class="tag tag-cool an3-l2">הנשימה שלכם</div>' +
      '<div class="tag tag-warm an3-cap">לא מבחן</div><div class="tag an3-hard">לפעמים זה מרגיש קשה</div></div>'));
    Object.assign(this, R.refs(kit, 'an3', ['met', 'own', 'card', 'x', 'score', 'l1', 'l2', 'cap', 'hard']));
  },
  render(t) {
    // the "right" way to breathe, steady and strict, above Ruth's own breath
    this.met.setAttribute('d', R.wavePath(80, 520, 920, 70, 3, -t * 2.2));
    // asked for deeper and steadier, her own wave strains to keep up
    const deep = eio(seg(t, 5.8, 7.0)) * (1 - eio(seg(t, 11.5, 12.8))), keep = eio(seg(t, 8.0, 9.0)) * (1 - eio(seg(t, 11.5, 12.8)));
    const amp = 46 + 40 * deep, k = 2.2 + 0.8 * keep, jit = 10 * Math.max(deep, keep);
    let d = '';
    for (let i = 0; i <= 80; i++) { const x = 80 + 920 * i / 80, y = 780 - amp * Math.sin((i / 80) * k * 2 * Math.PI - t * 1.8) + jit * Math.sin(i * 1.7 + t * 9); d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
    this.own.setAttribute('d', d);
    R.place(this.l1, 170, 400, eo(seg(t, 0.3, 0.8))); R.place(this.l2, 190, 660, eo(seg(t, 0.6, 1.1)));
    // no score here: the grade is struck out
    const c = eob(seg(t, 1.8, 2.3), 2);
    this.card.setAttribute('transform', 'translate(880 340) rotate(-6) scale(' + c + ')');
    R.put(this.score, 880, 340, c, -6, eo(seg(t, 1.8, 2.0)));
    this.x.style.strokeDasharray = eo(seg(t, 2.9, 3.4)) + ' 1'; this.x.style.opacity = t > 2.9 ? 1 : 0;
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.9, 3.4))), eo(seg(t, 2.9, 3.4)));
    R.place(this.hard, 540, lerp(940, 928, eo(seg(t, 10.2, 10.7))), eo(seg(t, 10.2, 10.7)));
  },
});
