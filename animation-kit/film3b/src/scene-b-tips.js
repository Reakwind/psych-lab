const { seg, eo, eio, eob, lerp } = kit;
const P22 = 11.11, P23 = 22.07;
kit.scene('b-tips', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('bt') + '<g class="bt-bl">' + R.blanket('bt-b') + '</g>' +
      '<g class="bt-pg">' + R.pacer('bt-p', 5) + '</g><path class="bt-nat" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round"/>' +
      '<g class="bt-dg"><g transform="scale(.9)">' + R.dial('bt-d') + '</g></g><g class="bt-sw">' + R.swirl('bt-s') + '</g><g class="bt-stop">' + R.stopSign('bt-x') + '</g></svg>' +
      '<div class="tag tag-cool bt-env">סביבה נוחה</div><div class="tag tag-warm bt-pos">תנוחה שמתאימה לכם</div><div class="tag bt-pace">לשנות את הקצב כשצריך</div><div class="tag tag-warm bt-eff">לא צריך להרגיש מאומץ</div>' +
      '<div class="tag bt-dz">סחרחורת? חוזרים לנשימה טבעית</div><div class="tag tag-cool bt-st">יותר מדי? עוצרים</div></div>'));
    Object.assign(this, R.refs(kit, 'bt', ['glow', 'armR', 'eyes', 'bl', 'pg', 'nat', 'dg', 'sw', 'stop', 'env', 'pos', 'pace', 'eff', 'dz', 'st']));
    this.p = R.refs(kit, 'bt-p', ['ring', 'core']); this.cu = kit.stage.querySelector('.bt-cushion'); this.hand = kit.stage.querySelector('.bt-d-hand');
    this.ph = 0; this.prev = 0;
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    // make it comfortable: a blanket, the cushion
    const bl = eio(seg(t, 3.9, 4.8));
    this.bl.setAttribute('transform', 'translate(' + lerp(1150, 640, bl) + ' 540)');
    const cb = 1 + 0.08 * Math.sin(Math.PI * seg(t, 6.0, 6.6));
    this.cu.setAttribute('transform', 'translate(226 540) scale(' + cb + ') translate(-226 -540)');
    R.place(this.env, 540, lerp(84, 70, eo(seg(t, 4.0, 4.5))), eo(seg(t, 4.0, 4.5)) * (1 - eo(seg(t, P22 - 0.5, P22 - 0.1))));
    R.place(this.pos, 540, lerp(940, 928, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)) * (1 - eo(seg(t, P22 - 0.5, P22 - 0.1))));
    // the pace is hers to change: the dial slows the pacer
    const slow = eio(seg(t, P22 + 2.4, P22 + 4.0));
    const period = lerp(4.2, 7, slow), dt = t - this.prev; this.prev = t; this.ph = t < 0.05 ? 0 : this.ph + Math.max(0, Math.min(dt, 0.2)) / period;
    const breathe = (1 - Math.cos(2 * Math.PI * this.ph)) / 2;
    const pac = eo(seg(t, P22 + 0.2, P22 + 0.8)) * (1 - eo(seg(t, P23 + 1.2, P23 + 2.0))) + 0.6 * eo(seg(t, P23 + 4.8, P23 + 5.6)) * (1 - eo(seg(t, P23 + 7.6, P23 + 8.2)));
    this.pg.setAttribute('transform', 'translate(540 165) scale(.9)'); this.pg.style.opacity = pac;
    const s = lerp(0.55, 1, breathe); this.p.core.setAttribute('r', 110 * s); this.p.ring.setAttribute('r', 150 * s);
    R.handOn(this.armR, 1, breathe * (pac > 0.3 ? 1 : 0.4));
    this.glow.style.opacity = 0.25 * breathe;
    const dg = eob(seg(t, P22 + 2.2, P22 + 2.8), 1.6) * (1 - eo(seg(t, P23, P23 + 0.5)));
    this.dg.setAttribute('transform', 'translate(880 900) scale(' + dg + ')');
    this.hand.setAttribute('transform', 'rotate(' + lerp(50, -40, slow) + ')');
    R.place(this.pace, 540, lerp(84, 70, eo(seg(t, P22 + 2.4, P22 + 2.9))), eo(seg(t, P22 + 2.4, P22 + 2.9)) * (1 - eo(seg(t, P22 + 8.6, P22 + 9.0))));
    R.place(this.eff, 540, lerp(940, 928, eo(seg(t, P22 + 8.9, P22 + 9.4))), eo(seg(t, P22 + 8.9, P22 + 9.4)) * (1 - eo(seg(t, P23 - 0.3, P23))));
    // feeling dizzy: let the count go and breathe naturally; if it's too much, stop
    const dz = eo(seg(t, P23 + 1.2, P23 + 1.8)) * (1 - eo(seg(t, P23 + 4.6, P23 + 5.2)));
    this.sw.style.opacity = dz; this.sw.setAttribute('transform', 'translate(200 330) rotate(' + t * 120 + ') scale(1.6)');
    const nat = eo(seg(t, P23 + 3.8, P23 + 4.6)) * (1 - eo(seg(t, P23 + 4.8, P23 + 5.4)));
    this.nat.setAttribute('d', R.wavePath(300, 190, 480, 34, 1.5, -t * 1.3)); this.nat.style.opacity = nat;
    R.place(this.dz, 540, lerp(84, 70, eo(seg(t, P23 + 1.3, P23 + 1.8))), eo(seg(t, P23 + 1.3, P23 + 1.8)) * (1 - eo(seg(t, P23 + 8.8, P23 + 9.2))));
    const sp = eob(seg(t, P23 + 9.4, P23 + 10.0), 1.8);
    this.stop.setAttribute('transform', 'translate(880 900) scale(' + sp * 0.9 + ')');
    R.place(this.st, 540, lerp(84, 70, eo(seg(t, P23 + 9.4, P23 + 9.9))), eo(seg(t, P23 + 9.4, P23 + 9.9)));
  },
});
