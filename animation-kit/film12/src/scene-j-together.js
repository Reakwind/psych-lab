const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-together', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j7', { sun: true }) + R.packed('j7', false) + '<g class="j7-fr">' + R.friend('j7f', 'a') + '</g>' +
      '<g class="j7-cb">' + R.packBehind('j7c') + '</g><path class="j7-arc" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:8;stroke-linecap:round;stroke-dasharray:0 1"/></svg>' +
      '<div class="tag j7-a">ממשהו שעושים בשבילכם</div><div class="tag tag-warm j7-b">למשהו שמוצאים יחד</div><div class="tag tag-cool j7-c">דרך שמתאימה לכם, לאדם שמולכם ולקשר ביניכם</div></div>'));
    Object.assign(this, R.refs(kit, 'j7', ['w', 'pack', 'straps', 'head', 'eyes', 'mouth', 'fr', 'cb', 'arc', 'a', 'b', 'c', 'st0-top']));
    this.f = R.refs(kit, 'j7f', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2);
    // first the friend carries Ruth's pack for her; then Ruth takes it back and they find the way together
    const take = eio(seg(t, 1.8, 2.8)) * (1 - eio(seg(t, 5.4, 6.2))), close = eio(seg(t, 5.8, 6.8));
    const fx = lerp(760, 690, close);
    this.fr.setAttribute('transform', 'translate(' + fx + ' 976)');
    this.pack.style.opacity = 1 - take; this.straps.style.opacity = 1 - take;
    const cx = lerp(380, fx + 92, take), cy = lerp(970, 1050, take);
    this.cb.setAttribute('transform', 'translate(' + cx + ' ' + cy + ') scale(' + lerp(1, 0.62, take) + ')'); this.cb.style.opacity = take > 0.02 && take < 0.98 ? 1 : take >= 0.98 ? 1 : 0;
    this.w.setAttribute('transform', 'translate(380 ' + (970 - 4 * take) + ')');
    this.mouth.setAttribute('d', take > 0.5 ? R.mouthFlat : close > 0.5 ? R.mouthHappy : R.mouthNeutral);
    this.head.setAttribute('transform', 'rotate(' + (-6 * close) + ' 0 30)');
    this.f.head.setAttribute('transform', 'rotate(' + (8 * close) + ' 0 30)'); this.f.mouth.setAttribute('d', R.mouthHappy);
    R.litStone(this['st0-top'], eo(seg(t, 6.1, 7.0)));
    const k = eio(seg(t, 9.0, 10.0));
    this.arc.setAttribute('d', 'M420 500 Q' + ((380 + fx) / 2 + 20) + ' 330 ' + (fx - 40) + ' 500'); this.arc.style.opacity = k > 0 ? 1 : 0; this.arc.style.strokeDasharray = k + ' 1';
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.8, 3.2))), eo(seg(t, 2.8, 3.2)) * (1 - eo(seg(t, 5.7, 6.0))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 6.06, 6.4))), eo(seg(t, 6.06, 6.4)));
    R.place(this.c, 540, lerp(152, 140, eo(seg(t, 7.2, 7.6))), eo(seg(t, 7.2, 7.6)));
  },
});
