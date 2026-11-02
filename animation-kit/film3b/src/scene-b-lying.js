const { seg, eo, eio, eob, lerp } = kit;
const P10 = 5.18;
kit.scene('b-lying', {
  init(kit) {
    const dots = (n, cls) => '<g class="' + cls + '">' + Array.from({ length: n }, (_, k) => '<circle class="' + cls + k + '" cx="' + ((k - (n - 1) / 2) * 52) + '" cy="0" r="18" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/>').join('') + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('bl') + dots(3, 'bl-in') + dots(5, 'bl-out') +
      '<rect class="bl-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-warm bl-cap">קל יותר בשכיבה על הגב</div><div class="tag tag-cool bl-rh">המקצב</div><div class="tag bl-ti">שאיפה · שלוש</div><div class="tag bl-to">נשיפה · חמש</div></div>'));
    Object.assign(this, R.refs(kit, 'bl', ['glow', 'armR', 'eyes', 'veil', 'in', 'out', 'cap', 'rh', 'ti', 'to']));
    this.di = [0, 1, 2].map((k) => kit.stage.querySelector('.bl-in' + k)); this.do = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.bl-out' + k));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.8));
    R.blink(this.eyes, t, 0.4);
    // lying on her back, a hand on the belly that rises and falls
    const b = (1 - Math.cos(2 * Math.PI * t / 5)) / 2, on = eio(seg(t, 0.6, 1.6));
    R.handOn(this.armR, on, b * on);
    this.glow.style.opacity = 0.25 * b * on;
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.5, 3.0))), eo(seg(t, 2.5, 3.0)) * (1 - eo(seg(t, P10 + 1.6, P10 + 2.0))));
    // the rhythm: in for three, out for five
    R.place(this.rh, 540, lerp(84, 70, eo(seg(t, P10 + 2.1, P10 + 2.6))), eo(seg(t, P10 + 2.1, P10 + 2.6)));
    const i = eo(seg(t, P10 + 3.9, P10 + 4.4)), o = eo(seg(t, P10 + 5.9, P10 + 6.4));
    this.in.setAttribute('transform', 'translate(800 900) scale(' + i + ')'); this.out.setAttribute('transform', 'translate(300 900) scale(' + o + ')');
    this.di.forEach((el, k) => { el.style.fill = t > P10 + 4.0 + k * 0.25 ? 'var(--main)' : 'var(--ground)'; });
    this.do.forEach((el, k) => { el.style.fill = t > P10 + 6.0 + k * 0.2 ? 'var(--accent)' : 'var(--ground)'; });
    R.place(this.ti, 800, 952, i); R.place(this.to, 300, 952, o);
  },
});
