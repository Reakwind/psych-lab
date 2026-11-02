const { seg, eo, eio, eob, lerp } = kit;
// a small stop to be kind to ourselves: Ruth on her mat under the blanket, a warm glow, the meter low
kit.scene('g-pause', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('g17') + '<g transform="translate(640 540)">' + R.blanket('g17-bl') + '</g>' +
      '<ellipse class="g17-gl" cx="520" cy="545" rx="420" ry="250" style="fill:var(--accent);opacity:0"/><g class="g17-mw" transform="translate(990 900) scale(.7)">' + R.meter('g17-mt') + '</g>' +
      '<rect class="g17-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-red g17-ml">מתח</div><div class="tag tag-warm g17-a">עצירה קטנה כדי להיות טובים לעצמנו</div><div class="tag tag-cool g17-b">כמה רגעים של נוחות</div><div class="tag g17-c">להוריד הילוך ולהרפות בקצב שלהם</div></div>'));
    Object.assign(this, R.refs(kit, 'g17', ['eyes', 'mouth', 'armR', 'gl', 'mt-fill', 'veil', 'ml', 'a', 'b', 'c']));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.6));
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    const br = (1 - Math.cos(2 * Math.PI * t / 4.8)) / 2;
    R.handOn(this.armR, 0.6, 0.3 + 0.7 * br);
    this.gl.style.opacity = (0.08 + 0.06 * br) * eo(seg(t, 1.0, 2.5));
    R.setMeter(this['mt-fill'], lerp(0.25, 0.08, eio(seg(t, 5.0, 10.0))));
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.ml, 990, 920, 1);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 5.93, 6.3))), eo(seg(t, 5.93, 6.3)));
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 8.7, 9.1))), eo(seg(t, 8.7, 9.1)));
  },
});
