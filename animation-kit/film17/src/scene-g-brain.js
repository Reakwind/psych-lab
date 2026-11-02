const { seg, eo, eio, eob, lerp } = kit;
// inside the head (session 2's cutaway): imagining a place lights some of the same areas that the real thing does
const SP = [[430, 330], [560, 300], [620, 430], [480, 440]];
kit.scene('g-brain', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('g7') +
      SP.map(([x, y], k) => '<circle class="g7-s' + k + '" cx="' + x + '" cy="' + y + '" r="34" style="fill:var(--accent);opacity:0"/>').join('') +
      '<path class="g7-l1" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:8;stroke-linecap:round;stroke-dasharray:.04 .05;opacity:0" d="M870 300 C820 300 700 300 620 330"/>' +
      '<path class="g7-l2" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:8;stroke-linecap:round;stroke-dasharray:.04 .05;opacity:0" d="M930 720 C880 640 840 560 800 520"/>' +
      R.imgBubble('g7b') + '<g class="g7-real"><rect class="shade" x="-104" y="-64" width="216" height="140" rx="12"/><rect x="-110" y="-72" width="220" height="144" rx="12" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>' +
      '<clipPath id="g7-rc"><rect x="-96" y="-58" width="192" height="116" rx="6"/></clipPath><g clip-path="url(#g7-rc)"><g transform="scale(.5)">' + R.miniLand('g7r') + '</g></g></g></svg>' +
      '<div class="tag tag-cool g7-a">זה לא רק רעיון נחמד</div><div class="tag tag-warm g7-b">דמיון יכול להפעיל במח</div><div class="tag g7-c">תהליכים שפועלים גם בחוויה ממשית</div></div>'));
    Object.assign(this, R.refs(kit, 'g7', ['bulb', 'nerves', 'l1', 'l2', 'real', 'a', 'b', 'c']));
    this.bg = kit.stage.querySelector('.g7b'); this.bb = R.bubRefs(kit, 'g7b'); this.s = SP.map((p, k) => kit.stage.querySelector('.g7-s' + k));
  },
  render(t) {
    this.bulb.style.opacity = 0;
    this.nerves.style.strokeDashoffset = -t * 6;
    // imagined first: a bubble over her head, its line into the brain, the areas light
    const im = eo(seg(t, 4.6, 5.4)), real = eo(seg(t, 9.0, 9.8));
    R.setBub(this.bb, this.bg, 880, 190, im, 0.62, 0, 0);
    this.l1.style.opacity = eo(seg(t, 5.2, 5.6)); this.l1.style.strokeDashoffset = -t * 0.3;
    this.real.setAttribute('transform', 'translate(940 820) scale(' + Math.max(0.001, eob(seg(t, 9.0, 9.6), 1.4)) + ')'); this.real.style.opacity = real;
    this.l2.style.opacity = eo(seg(t, 9.5, 9.9)); this.l2.style.strokeDashoffset = -t * 0.3;
    this.s.forEach((c, k) => { const on = eo(seg(t, 5.6 + k * 0.2, 6.0 + k * 0.2)), pulse = 1 + 0.25 * Math.sin(t * 4 + k) + 0.3 * Math.sin(Math.PI * seg(t, 9.9 + k * 0.1, 10.6 + k * 0.1)); c.style.opacity = 0.55 * on; c.setAttribute('r', 34 * pulse); });
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 4.8, 5.1))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 5.13, 5.5))), eo(seg(t, 5.13, 5.5)));
    R.place(this.c, 540, lerp(992, 980, eo(seg(t, 9.48, 9.8))), eo(seg(t, 9.48, 9.8)));
  },
});
