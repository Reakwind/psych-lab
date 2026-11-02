const { seg, eo, eio, eob, lerp } = kit;
// into the head (session 2): research shows gratitude practice can support wellbeing; the bulb glows warmer
kit.scene('g-research', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('gr') + '</svg>' +
      '<div class="tag tag-cool gr-a">מחקרים מראים</div><div class="tag tag-warm gr-b">לתמוך ברווחה הנפשית</div></div>'));
    Object.assign(this, R.refs(kit, 'gr', ['glow', 'star', 'ring', 'nerves', 'eye', 'a', 'b']));
  },
  render(t) {
    const warm = eio(seg(t, 1.0, 4.0));
    this.glow.setAttribute('transform', 'scale(' + (0.7 + 0.6 * warm + 0.05 * Math.sin(t * 4)) + ')');
    this.glow.style.opacity = 0.3 + 0.5 * warm;
    this.star.setAttribute('transform', 'rotate(' + t * 25 + ') scale(' + (0.8 + 0.3 * warm) + ')');
    this.ring.setAttribute('transform', 'rotate(' + (-t * 30) + ')');
    this.nerves.style.strokeDashoffset = -t * 40; this.nerves.style.opacity = 0.4 + 0.6 * warm;
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.b, 540, lerp(1002, 990, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)));
  },
});
