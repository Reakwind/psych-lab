const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-ground', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(578 866)">' + R.roots('gg-a') + '</g><g transform="translate(622 866) scale(-1 1)">' + R.roots('gg-b') + '</g>' + R.seated('gg', 0) +
      '<path class="gg-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.55"/><g class="gg-b">' + R.balloon('gg-bl') + '</g></svg>' +
      '<div class="tag tag-cool gg-back">להחזיר את תשומת הלב לכאן</div><div class="tag tag-warm gg-name">Grounding · קרקוע</div><div class="tag gg-earth">להתחבר לקרקע</div></div>'));
    Object.assign(this, R.refs(kit, 'gg', ['body', 'head', 'eyes', 'mouth', 'str', 'b', 'back', 'name', 'earth']));
    this.ra = kit.stage.querySelector('.gg-a-r'); this.rb = kit.stage.querySelector('.gg-b-r');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the string gently draws the balloon back toward Ruth
    const back = eio(seg(t, 2.0, 5.2)), x = lerp(860, 600, back), y = lerp(170, 360, back) + Math.sin(t * 1.6) * 8 * (1 - back);
    this.b.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + lerp(1.6, 0.9, back) + ')');
    this.b.style.opacity = 1 - 0.6 * eo(seg(t, 5.0, 6.0));
    this.str.setAttribute('d', 'M500 440 Q' + (500 + (x - 500) * 0.3) + ' ' + (y + 100 * (1 - back)) + ' ' + x + ' ' + (y + 30));
    this.head.setAttribute('transform', 'rotate(' + (6 - 6 * back) + ' 0 30)');
    this.mouth.setAttribute('d', back > 0.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.back, 540, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)) * (1 - eo(seg(t, 7.0, 7.4))));
    R.place(this.name, 540, lerp(84, 70, eo(seg(t, 7.4, 7.9))), eo(seg(t, 7.4, 7.9)));
    // ...and small roots reach down from her feet into the floor
    const r = eo(seg(t, 9.8, 11.4));
    [this.ra, this.rb].forEach((el) => { el.style.strokeDasharray = r + ' 1'; el.style.opacity = r > 0 ? 1 : 0; });
    R.place(this.earth, 600, lerp(1000, 988, eo(seg(t, 10.0, 10.5))), eo(seg(t, 10.0, 10.5)));
  },
});
