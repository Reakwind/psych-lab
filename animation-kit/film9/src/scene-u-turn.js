const { seg, eo, eio, eob, lerp } = kit;
const U0 = 0.55;
kit.scene('u-turn', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadLand('un') + '<g class="un-bb">' + R.busBack('un-b') + '</g></svg>' +
      '<div class="tag un-xa">לא בוחרים כל נוסע שעולה</div><div class="tag un-xb">ולא שולטים בכל מה שבדרך</div><div class="tag tag-cool un-xc">נשארים בכיסא הנהג</div><div class="tag tag-warm un-xd" style="font-size:40px">ובוחרים את הפנייה הבאה</div></div>'));
    Object.assign(this, R.refs(kit, 'un', ['center', 'branch', 'branchc', 'bb', 'b-tl', 'h-glow', 'hrt', 'xa', 'xb', 'xc', 'xd']));
    const L = this.center.getTotalLength(), p0 = this.center.getPointAtLength(L * U0);
    const d = 'M' + p0.x + ' ' + p0.y + ' C' + (p0.x + 220) + ' ' + (p0.y - 20) + ' ' + (p0.x + 420) + ' ' + (p0.y + 30) + ' 1180 ' + (p0.y + 70);
    this.branch.setAttribute('d', d); this.branchc.setAttribute('d', d); this.L = L;
  },
  render(t) {
    // at the junction she signals, and takes the road toward the heart
    const u = lerp(0.02, U0 - 0.02, eio(seg(t, 0, 8.6))) + lerp(0, 0.5, eio(seg(t, 11.8, 13.5)));
    const p = this.center.getPointAtLength(this.L * u), s = lerp(0.12, 0.8, (p.y - 468) / 612);
    this.bb.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ') rotate(' + -8 * Math.sin(Math.PI * seg(t, 11.8, 13.2)) + ') scale(' + s + ')');
    this['b-tl'].style.opacity = t > 9.6 && t < 12.6 && Math.floor(t * 3) % 2 === 0 ? 0.25 : 1;
    this['b-tl'].style.fill = t > 9.6 && t < 12.6 ? 'var(--accent)' : '#D96C6C';
    this.hrt.setAttribute('transform', 'translate(556 432) scale(' + lerp(0.55, 0.85, eio(seg(t, 11.8, 13.0))) + ')');
    this['h-glow'].setAttribute('r', 70 + 24 * Math.sin(t * 3) * eo(seg(t, 11.8, 12.4)));
    R.place(this.xa, 540, lerp(84, 70, eo(seg(t, 1.5, 1.9))), eo(seg(t, 1.5, 1.9)) * (1 - eo(seg(t, 9.2, 9.6))));
    R.place(this.xb, 540, lerp(176, 164, eo(seg(t, 5.0, 5.4))), eo(seg(t, 5.0, 5.4)) * (1 - eo(seg(t, 9.2, 9.6))));
    R.place(this.xc, 540, lerp(84, 70, eo(seg(t, 9.6, 10.0))), eo(seg(t, 9.6, 10.0)));
    R.place(this.xd, 540, lerp(176, 164, eo(seg(t, 11.8, 12.3))), eo(seg(t, 11.8, 12.3)));
  },
});
