const { seg, eo, eio, eob, lerp } = kit;
const PAD = '<rect class="shade" x="-86" y="-104" width="180" height="230" rx="14"/><rect x="-90" y="-112" width="180" height="230" rx="14" style="fill:color-mix(in srgb, var(--accent) 16%, white);stroke:var(--second);stroke-width:5"/>' +
  [0, 1, 2, 3].map((k) => '<circle class="wl2-dot' + k + ' amber" cx="-60" cy="' + (-66 + k * 46) + '" r="9" style="opacity:0"/><rect class="wl2-ln' + k + ' slate" x="-42" y="' + (-72 + k * 46) + '" width="110" height="12" rx="6"/>').join('');
kit.scene('w-list', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wl2', -200) +
      '<g class="wl2-pad">' + PAD + '</g><g class="wl2-fr">' + R.friend('wl2-f', 'a') + '</g></svg>' +
      '<div class="tag tag-cool wl2-a">לעצור לרגע</div><div class="tag tag-warm wl2-b">מהם הדברים שעושים לכם טוב?</div><div class="tag wl2-c">לכתוב כמה מהם</div><div class="tag wl2-d">לדבר עליהם עם מישהו קרוב</div></div>'));
    Object.assign(this, R.refs(kit, 'wl2', ['body', 'head', 'eyes', 'mouth', 'pad', 'fr', 'a', 'b', 'c', 'd']));
    this.ln = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.wl2-ln' + k)); this.dt = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.wl2-dot' + k));
    this.fe = kit.stage.querySelector('.wl2-f-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.fe, t, 2.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // stop for a moment and think; then write a few down
    this.head.setAttribute('transform', 'rotate(' + (t < 6.8 ? -10 * eio(seg(t, 1.8, 2.6)) : 10 * eio(seg(t, 6.8, 7.4)) - 10 * eio(seg(t, 8.4, 9.2)) * 2) + ' 0 30)');
    R.xf(this.pad, 420, 640, 0.85 * eob(seg(t, 6.8, 7.3), 1.4), eo(seg(t, 6.8, 7.0)));
    this.ln.forEach((el, k) => { const p = eio(seg(t, 7.4 + k * 0.5, 7.9 + k * 0.5)); el.setAttribute('width', 110 * p); this.dt[k].style.opacity = eo(seg(t, 7.4 + k * 0.5, 7.6 + k * 0.5)); });
    // or talk them over with someone close
    const f = eio(seg(t, 8.2, 9.4));
    this.fr.setAttribute('transform', 'translate(' + lerp(1240, 860, f) + ' 990) scale(.92)');
    this.mouth.setAttribute('d', t > 4.8 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, 4.5, 4.8))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3)));
    R.place(this.c, 540, lerp(192, 180, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)));
    R.place(this.d, 760, lerp(292, 280, eo(seg(t, 8.4, 8.9))), eo(seg(t, 8.4, 8.9)));
  },
});
