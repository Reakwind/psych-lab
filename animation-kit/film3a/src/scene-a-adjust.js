const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-adjust', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="aj-met" style="fill:none;stroke:var(--second);stroke-width:7;stroke-dasharray:18 14;opacity:.45"/><path class="aj-own" style="fill:none;stroke:var(--main);stroke-width:12;stroke-linecap:round"/>' +
      '<g transform="translate(880 300)">' + R.dial('aj-d') + '</g></svg>' +
      '<div class="tag tag-cool aj-l2">הנשימה שלכם</div><div class="tag aj-g">בעדינות</div><div class="tag aj-a">התאמות</div><div class="tag tag-warm aj-cap">הקצב שמתאים לכם</div></div>'));
    Object.assign(this, R.refs(kit, 'aj', ['met', 'own', 'l2', 'g', 'a', 'cap']));
    this.hand = kit.stage.querySelector('.aj-d-hand');
  },
  render(t) {
    // the strict line fades; Ruth turns the dial and her breath settles into a pace of its own
    const fade = eo(seg(t, 0.3, 2.0)), calm = eio(seg(t, 3.3, 6.5));
    this.met.setAttribute('d', R.wavePath(80, 520, 920, 70, 3, -t * 2.2)); this.met.style.opacity = 0.45 * (1 - fade);
    const amp = lerp(86, 60, calm), k = lerp(3, 1.6, calm), jit = 10 * (1 - calm);
    let d = '';
    for (let i = 0; i <= 80; i++) { const x = 80 + 920 * i / 80, y = lerp(780, 640, calm) - amp * Math.sin((i / 80) * k * 2 * Math.PI - t * lerp(1.8, 1.0, calm)) + jit * Math.sin(i * 1.7 + t * 9); d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
    this.own.setAttribute('d', d);
    this.hand.setAttribute('transform', 'rotate(' + lerp(60, -40, eio(seg(t, 3.3, 5.0))) + ')');
    R.place(this.l2, 190, lerp(660, 520, calm), 1);
    R.place(this.g, 640, lerp(96, 84, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)));
    R.place(this.a, 400, lerp(96, 84, eo(seg(t, 3.4, 3.9))), eo(seg(t, 3.4, 3.9)));
    R.place(this.cap, 540, lerp(950, 938, eo(seg(t, 5.5, 6.0))), eo(seg(t, 5.5, 6.0)));
  },
});
