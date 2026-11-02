const { seg, eo, eio, eob, lerp } = kit;
// five percent kinder: a long bar, a small warm sliver from the right
const X0 = 140, X1 = 940, Y = 250;
kit.scene('h-five', {
  init(kit) {
    let ticks = '';
    for (let k = 1; k < 20; k++) ticks += '<rect class="slate" opacity=".35" x="' + (X1 - k * 40 - 2) + '" y="' + (Y - 20) + '" width="4" height="40" rx="2"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hf', -160) +
      '<g class="hf-vg">' + R.voice('hf-v') + '</g>' +
      '<rect class="shade" x="' + (X0 + 6) + '" y="' + (Y - 26) + '" width="' + (X1 - X0) + '" height="64" rx="32"/><rect x="' + X0 + '" y="' + (Y - 32) + '" width="' + (X1 - X0) + '" height="64" rx="32" style="fill:color-mix(in srgb, var(--second) 16%, var(--ground));stroke:var(--second);stroke-width:5"/>' + ticks +
      '<clipPath id="hf-c"><rect x="' + X0 + '" y="' + (Y - 32) + '" width="' + (X1 - X0) + '" height="64" rx="32"/></clipPath><g clip-path="url(#hf-c)"><rect class="hf-fill" x="' + X1 + '" y="' + (Y - 32) + '" width="0" height="64" style="fill:var(--accent)"/></g>' +
      '<circle class="hf-glow" cx="' + (X1 - 20) + '" cy="' + Y + '" r="70" style="fill:var(--accent);opacity:0"/></svg>' +
      '<div class="count hf-n" style="font-size:120px">5%</div><div class="tag tag-warm hf-a">חמישה אחוזים יותר נחמדים לעצמנו</div><div class="tag tag-cool hf-b">זאת התחלה טובה</div></div>'));
    Object.assign(this, R.refs(kit, 'hf', ['body', 'head', 'eyes', 'mouth', 'vg', 'fill', 'glow', 'n', 'a', 'b']));
    this.v = R.refs(kit, 'hf-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-6 2 Q10 16 26 2');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.v.eyes, t, 1.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.xf(this.vg, 800, 560 + Math.sin(t * 2.2) * 8, 1.4, 1);
    const f = eio(seg(t, 0.9, 1.9)), w = (X1 - X0) * 0.05 * f;
    this.fill.setAttribute('x', X1 - w); this.fill.setAttribute('width', w);
    this.glow.style.opacity = 0.3 * eio(seg(t, 1.6, 2.2)) * (0.8 + 0.2 * Math.sin(t * 3));
    R.put(this.n, X1 - 70, lerp(140, 128, eo(seg(t, 1.2, 1.7))), eob(seg(t, 1.2, 1.7), 1.5), 0, eo(seg(t, 1.2, 1.5)));
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 1.6, 2.3))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(352, 340, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)));
    R.place(this.b, 800, lerp(752, 740, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
  },
});
