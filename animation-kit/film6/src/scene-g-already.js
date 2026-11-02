const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-already', {
  init(kit) {
    const g = (cls, cx, cy, rx, ry) => '<ellipse class="' + cls + '" cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" style="fill:var(--accent);opacity:0"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + g('ga-chair', 520, 700, 250, 190) +
      '<g transform="translate(578 866)">' + R.roots('ga-a') + '</g><g transform="translate(622 866) scale(-1 1)">' + R.roots('ga-b') + '</g>' + R.seated('ga', 0) +
      g('ga-hands', 505, 722, 56, 30) + g('ga-feet', 598, 862, 70, 18) +
      '<g class="ga-snd"><path class="ink" style="stroke:var(--accent);stroke-width:8" d="M330 400 q16 20 0 40 M352 384 q28 36 0 72 M374 368 q40 52 0 104"/></g>' +
      '<path class="ga-look" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:10 12" d="M470 520 C380 560 220 640 160 690"/></svg>' +
      '<div class="tag tag-cool ga-cap">לא צריך שום דבר מיוחד</div><div class="tag ga-t0">הכיסא שתומך</div><div class="tag ga-t1">כפות ידיים ורגליים</div><div class="tag ga-t2">צלילים</div><div class="tag ga-t3">מה שרואים</div></div>'));
    Object.assign(this, R.refs(kit, 'ga', ['chair', 'body', 'eyes', 'mouth', 'hands', 'feet', 'snd', 'look', 'cap', 't0', 't1', 't2', 't3']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.ra = kit.stage.querySelector('.ga-a-r'); this.rb = kit.stage.querySelector('.ga-b-r');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    [this.ra, this.rb].forEach((el) => (el.style.opacity = 0.5));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
    // ordinary things already here light up as she notices them
    const pulse = (a) => eo(seg(t, a, a + 0.5)) * (0.22 + 0.06 * Math.sin(t * 3));
    this.chair.style.opacity = pulse(9.1); this.hands.style.opacity = pulse(11.6) * 2; this.feet.style.opacity = pulse(12.3) * 2;
    const s = eo(seg(t, 13.4, 13.9));
    this.snd.style.opacity = s; this.snd.setAttribute('transform', 'translate(' + (Math.sin(t * 6) * 3) + ' 0)');
    this.look.style.opacity = eo(seg(t, 16.0, 16.5)); this.look.style.strokeDashoffset = -t * 30;
    R.place(this.t0, 860, lerp(612, 600, eo(seg(t, 9.2, 9.7))), eo(seg(t, 9.2, 9.7)));
    R.place(this.t1, 860, lerp(772, 760, eo(seg(t, 11.7, 12.2))), eo(seg(t, 11.7, 12.2)));
    R.place(this.t2, 380, lerp(292, 280, eo(seg(t, 13.5, 14.0))), eo(seg(t, 13.5, 14.0)));
    R.place(this.t3, 170, lerp(552, 540, eo(seg(t, 16.1, 16.6))), eo(seg(t, 16.1, 16.6)));
  },
});
