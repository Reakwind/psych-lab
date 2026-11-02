const { seg, eo, eio, eob, lerp } = kit;
const U0 = 0.55;
kit.scene('u-off', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadLand('uo') + '<path class="uo-veer" style="fill:none;stroke:none"/>' +
      '<g class="uo-bb">' + R.busBack('uo-b') + '</g><g transform="translate(210 250) scale(.75)">' + R.battery('uo') + '</g></svg>' +
      '<div class="tag tag-warm uo-xa">הנוסעים מתחילים לקבוע את המסלול</div><div class="tag uo-xb">תשומת לב ואנרגיה</div><div class="tag tag-cool uo-xc">לא נשאר כוח לנווט</div></div>'));
    Object.assign(this, R.refs(kit, 'uo', ['center', 'branch', 'branchc', 'veer', 'bb', 'fill', 'h-glow', 'xa', 'xb', 'xc']));
    const L = this.center.getTotalLength(), p0 = this.center.getPointAtLength(L * U0);
    const d = 'M' + p0.x + ' ' + p0.y + ' C' + (p0.x + 220) + ' ' + (p0.y - 20) + ' ' + (p0.x + 420) + ' ' + (p0.y + 30) + ' 1180 ' + (p0.y + 70);
    this.branch.setAttribute('d', d); this.branchc.setAttribute('d', d); this.veer.setAttribute('d', d);
    this.L = L; this.VL = this.veer.getTotalLength();
  },
  at(pt, rot) {
    const s = lerp(0.12, 0.8, (pt.y - 468) / (1080 - 468));
    this.bb.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ') rotate(' + (rot || 0) + ') scale(' + s + ')');
  },
  render(t) {
    // the passengers take over the route: the bus turns off, away from the heart, and the battery runs down
    const u = U0 * eio(seg(t, 0, 3.2)) + 0.02, v = 0.72 * eio(seg(t, 3.2, 9.0));
    if (t < 3.2) this.at(this.center.getPointAtLength(this.L * u));
    else this.at(this.veer.getPointAtLength(this.VL * v), 14 * Math.sin(Math.PI * Math.min(1, v * 2)));
    this['h-glow'].setAttribute('r', 70 - 30 * eio(seg(t, 3.2, 8)));
    R.setBattery(this.fill, lerp(0.75, 0.1, eio(seg(t, 5.4, 11.6))));
    R.place(this.xa, 540, lerp(84, 70, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)));
    R.place(this.xb, 210, lerp(432, 420, eo(seg(t, 5.5, 5.9))), eo(seg(t, 5.5, 5.9)));
    R.place(this.xc, 210, lerp(512, 500, eo(seg(t, 11.2, 11.6))), eo(seg(t, 11.2, 11.6)));
  },
});
