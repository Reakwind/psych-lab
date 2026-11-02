const { seg, eo, eio, eob, lerp } = kit;
// one sentence fits and warms; another doesn't, and drifts on without being forced; then she just listens
kit.scene('h-natural', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g class="hz-ring">' + R.attn('hz') + '</g>' + R.seated('hz', -160) +
      '<g class="hz-ph"><g transform="scale(1.7)">' + R.phone('hz-p', 0, 0, 'ariel') + '</g></g>' +
      '<g class="hz-snd"><path class="ink" style="stroke:var(--accent);stroke-width:8" d="M70 -40 q22 40 0 80 M100 -64 q36 64 0 128"/></g>' +
      '<g class="hz-ca"><circle class="hz-glow" r="190" style="fill:var(--accent);opacity:0"/>' + R.lineCard('hz-la') + '</g><g class="hz-cb">' + R.lineCard('hz-lb') + '</g></svg>' +
      '<div class="tag tag-warm hz-a">חלק ירגישו טבעיים</div><div class="tag hz-b">ואחרים פחות</div><div class="tag tag-cool hz-c">לא צריך להכריח את עצמנו</div><div class="tag tag-warm hz-d">פשוט מקשיבים ושמים לב</div></div>'));
    Object.assign(this, R.refs(kit, 'hz', ['ring', 'body', 'head', 'eyes', 'mouth', 'ph', 'snd', 'ca', 'cb', 'glow', 'a', 'b', 'c', 'd']));
    this.wa = kit.stage.querySelector('.hz-la-warm');
  },
  render(t) {
    const closed = t > 9.9 && t < 12.6;
    if (closed) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    R.xf(this.ph, 360, 690, 1, 1);
    // card one arrives and warms: it feels natural, she nods
    const a = eio(seg(t, 0.6, 1.4));
    R.xf(this.ca, lerp(1250, 760, a), 260 + Math.sin(t * 1.6) * 6, 0.8, 1);
    this.wa.style.opacity = eio(seg(t, 2.2, 2.8)); this.glow.style.opacity = 0.25 * eio(seg(t, 2.4, 3.0));
    // card two stays pale; she tilts her head; it is let go, gently, never pushed
    const b = eio(seg(t, 3.2, 3.9)), away = eio(seg(t, 5.6, 8.4));
    R.xf(this.cb, lerp(1250, 760, b) + 560 * away, 520 + Math.sin(t * 1.4 + 1) * 6 + 120 * away, 0.8, 1 - eo(seg(t, 7.6, 8.4)));
    const nod = Math.sin(Math.PI * 4 * seg(t, 2.4, 3.2)) * 5, tilt = 8 * eio(seg(t, 3.9, 4.5)) * (1 - eio(seg(t, 5.8, 6.6)));
    this.head.setAttribute('transform', 'translate(0 ' + nod + ') rotate(' + (tilt + 4 * eio(seg(t, 9.8, 10.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.4 && t < 3.9 ? 'M-12 24 Q2 36 16 24' : t > 3.9 && t < 6.2 ? 'M-10 28 Q2 28 14 28' : 'M-10 26 Q2 32 14 26');
    // then she simply listens and notices
    R.xf(this.snd, 360, 690, 1, (0.5 + 0.5 * Math.sin(t * 5)) * eo(seg(t, 9.8, 10.2)));
    R.xf(this.ring, 340, 620, (300 + Math.sin(t * 2.4) * 6) * eob(seg(t, 10.6, 11.3), 1.4), eo(seg(t, 10.6, 10.9)));
    R.place(this.a, 760, lerp(152, 140, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)) * (1 - eo(seg(t, 9.4, 9.8))));
    R.place(this.b, 760, lerp(652, 640, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)) * (1 - eo(seg(t, 5.4, 5.8))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)) * (1 - eo(seg(t, 9.4, 9.8))));
    R.place(this.d, 540, lerp(84, 70, eo(seg(t, 9.8, 10.3))), eo(seg(t, 9.8, 10.3)));
  },
});
