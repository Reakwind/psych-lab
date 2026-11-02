const { seg, eo, eio, eob, lerp } = kit;
const MOOD = 'M-70 30 C-100 30 -104 -10 -74 -16 C-74 -54 -24 -66 -6 -38 C10 -62 60 -56 58 -18 C90 -16 92 30 60 30Z';
kit.scene('x-brain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('x4') +
      '<g class="x4-mc"><path class="shade" transform="translate(0 8)" d="' + MOOD + '"/><path d="' + MOOD + '" style="fill:color-mix(in srgb, var(--second) 40%, var(--ground));stroke:var(--second);stroke-width:5"/></g>' +
      '<g class="x4-mw" transform="translate(985 870) scale(.72)">' + R.meter('x4-mt') + '</g><rect class="x4-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag x4-a">סיבות מובנות להרגיש מתח וחרדה</div><div class="tag tag-warm x4-b">החרדה עצמה עשויה להיות סימפטום</div><div class="tag tag-cool x4-c">השינויים במוח משפיעים גם על מצב הרוח</div></div>'));
    Object.assign(this, R.refs(kit, 'x4', ['nerves', 'glow', 'star', 'ring', 'mc', 'mt-fill', 'veil', 'a', 'b', 'c']));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.7));
    // inside Ruth's head: with Parkinson's there are understandable reasons for worry; and the brain's changes themselves touch anxiety and mood
    const sym = eo(seg(t, 7.0, 7.8));
    this.nerves.style.strokeDashoffset = (-t * (14 + 30 * sym)).toFixed(1);
    this.nerves.style.stroke = sym > 0.5 ? '#D96C6C' : 'var(--accent)';
    this.nerves.style.opacity = 0.6 + 0.4 * (sym ? Math.abs(Math.sin(t * 9)) : 1);
    const dim = eio(seg(t, 11.5, 13.2));
    this.glow.setAttribute('transform', 'scale(' + (1 + 0.08 * Math.sin(t * 3)) + ')'); this.glow.style.opacity = 0.5 * (1 - 0.7 * dim);
    this.star.style.opacity = 1 - 0.55 * dim; this.star.setAttribute('transform', 'rotate(' + t * 12 + ')');
    const mc = eio(seg(t, 10.4, 12.6));
    this.mc.setAttribute('transform', 'translate(' + lerp(260, 520, mc) + ' ' + lerp(260, 330, mc) + ') scale(' + lerp(0.6, 1, mc) + ')'); this.mc.style.opacity = eo(seg(t, 10.4, 10.9));
    R.setMeter(this['mt-fill'], 0.4 + 0.15 * eio(seg(t, 2.4, 3.2)) + 0.2 * eio(seg(t, 7.2, 8.0)) + 0.1 * eio(seg(t, 12.6, 13.4)));
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 2.53, 2.9))), eo(seg(t, 2.53, 2.9)) * (1 - eo(seg(t, 6.8, 7.1))));
    R.place(this.b, 540, lerp(972, 960, eo(seg(t, 7.23, 7.6))), eo(seg(t, 7.23, 7.6)));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 10.59, 11.0))), eo(seg(t, 10.59, 11.0)));
  },
});
