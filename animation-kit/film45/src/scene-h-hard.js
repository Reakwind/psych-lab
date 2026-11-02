const { seg, eo, eio, eob, lerp } = kit;
// the encouragement she gave so easily floats toward her and can't get in
kit.scene('h-hard', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('hd', -160) +
      '<g class="hd-cl">' + R.rain('hd-r') + '</g><g class="hd-vg">' + R.voice('hd-v') + '</g>' +
      '<g class="hd-bump"><circle r="70" style="fill:none;stroke:var(--second);stroke-width:6;stroke-dasharray:10 14;opacity:.5"/></g></svg>' +
      '<div class="thought sm warm hd-w">"זה באמת לא פשוט"</div><div class="tag tag-warm hd-a">קצת עידוד</div><div class="tag hd-b">קשה לנו להציע אותו לעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'hd', ['body', 'head', 'eyes', 'mouth', 'cl', 'vg', 'bump', 'w', 'a', 'b']));
    this.v = R.refs(kit, 'hd-v', ['eyes', 'mouth']); this.dr = kit.stage.querySelector('.hd-r-drops');
    this.v.mouth.setAttribute('d', 'M-2 10 Q10 2 22 10');
    this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
    this.w.style.width = '380px';
  },
  render(t) {
    R.blink(this.eyes, t, 0.4); R.blink(this.v.eyes, t, 1.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(-5 0 30) translate(0 12)');
    R.xf(this.cl, 340 + Math.sin(t * 0.8) * 10, 330, 0.85, 1); this.dr.style.strokeDashoffset = -t * 60;
    R.xf(this.vg, 790, 470 + Math.sin(t * 2.2) * 8, 1.55, 1);
    // the warm card drifts in from the right toward Ruth... and stops short, then backs away
    const go = eio(seg(t, 0.4, 2.8)), back = eio(seg(t, 3.4, 4.8)), hit = Math.max(0, 1 - Math.abs(t - 2.9) / 0.4);
    const x = lerp(1250, 600, go) + 160 * back - 20 * Math.sin(Math.PI * seg(t, 2.8, 3.3));
    R.put(this.w, x, 300 + Math.sin(t * 1.8) * 8, 1, -3 + 4 * back, 1 - 0.55 * back);
    R.xf(this.bump, 450, 360, 1 + 0.25 * hit, hit * 0.9);
    R.place(this.a, 760, lerp(184, 172, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)));
  },
});
