const { seg, eo, eio, eob, lerp } = kit;
// she talks with the people close to her: what she wants help with, and what still matters to her to do herself
kit.scene('r-talk', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('rk', -200) + '<g transform="translate(600 1000)">' + R.friend('rk-f', 'a') + '</g>' +
      '<path class="rk-tail" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5" d="M300 430 L330 380 L360 410Z" opacity="0"/></svg>' +
      '<div class="say rk-a">הדברים שבהם אנחנו רוצים עזרה</div><div class="say warm rk-b">מה שעדיין חשוב לנו לעשות בעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'rk', ['head', 'eyes', 'mouth', 'body', 'a', 'b']));
    this.fe = kit.stage.querySelector('.rk-f-eyes'); this.fh = kit.stage.querySelector('.rk-f-head');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9); R.blink(this.fe, t, 2.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // she is talking: her mouth moves while Nira speaks
    const talking = t > 0.6 && t < 8.0;
    this.mouth.setAttribute('d', talking && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
    this.head.setAttribute('transform', 'rotate(10 0 30)');
    this.fh.setAttribute('transform', 'rotate(' + (-6 + 3 * Math.sin(t * 1.4)) + ' 0 30)');
    const a = seg(t, 4.4, 5.0), b = seg(t, 7.2, 7.8);
    R.put(this.a, 700, 190 + (1 - eo(a)) * 30, eob(a, 1.4), 0, eo(seg(t, 4.4, 4.7)));
    R.put(this.b, 420, 360 + (1 - eo(b)) * 30, eob(b, 1.4), 0, eo(seg(t, 7.2, 7.5)));
  },
});
