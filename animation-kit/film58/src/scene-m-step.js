const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-step', {
  init(kit) {
    const M = R.M58;
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mp', 230) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' +
      '<rect class="mp-slot" x="-64" y="-35" width="128" height="70" rx="14" style="fill:color-mix(in srgb, var(--accent) 30%, var(--ground));stroke:var(--accent);stroke-width:6;stroke-dasharray:14 10" opacity="0"/>' +
      M.STRIP.map((x, k) => R.task('mp-b' + k)).join('') + R.matter('mp-m', 0, 84) + '</svg>' +
      '<div class="q mp-q">ואיזה צעד קטן אוכל לעשות כדי לתת לו עוד קצת מקום?</div><div class="tag tag-warm mp-cap">עוד קצת מקום</div></div>'));
    Object.assign(this, R.refs(kit, 'mp', ['head', 'eyes', 'mouth', 'body', 'slot', 'm', 'q', 'cap']));
    this.b = M.STRIP.map((x, k) => kit.stage.querySelector('.mp-b' + k));
    this.glow = kit.stage.querySelector('.mp-m-glow');
  },
  render(t) {
    const M = R.M58, y = M.SY + 110;
    R.blink(this.eyes, t, 0.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const q = seg(t, 0.1, 0.7);
    R.put(this.q, 540, 128 + (1 - eo(q)) * 30, eob(q, 1.4), 0, eo(seg(t, 0.1, 0.4)));
    // on "צעד": the blocks shuffle apart and open a gap between two of them
    const open = eio(seg(t, 0.9, 2.0));
    this.b.forEach((el, k) => el.setAttribute('transform', 'translate(' + (M.STRIP[k] + (k < 3 ? 64 : -64) * open) + ' ' + y + ')'));
    const gx = (M.STRIP[2] + M.STRIP[3]) / 2;
    this.slot.setAttribute('transform', 'translate(' + gx + ' ' + y + ')'); this.slot.setAttribute('opacity', eo(seg(t, 1.6, 2.1)));
    // the badge settles into it
    const f = eio(seg(t, 2.2, 3.3));
    this.m.setAttribute('transform', 'translate(' + lerp(330, gx, f) + ' ' + (lerp(640, y, f) - 90 * Math.sin(Math.PI * f)) + ') scale(' + lerp(1, 0.46, f) + ')');
    this.glow.setAttribute('opacity', 0.5 * eo(seg(t, 3.2, 3.8)));
    R.place(this.cap, 470, lerp(446, 434, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
    this.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 1.0, 2.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
