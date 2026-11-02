const { seg, eo, eio, eob, lerp } = kit;
// now choose: what matters to me here? maybe that staying active matters, one of the ways you look after yourself —
// or maybe that today you've already pushed yourself enough, and what you need now is to do a bit less
const P12 = 12.51, CX = 700, CY = 330, DB = [640, 905], CH = [350, 640];
kit.scene('z-choose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.gym('zc', -150) +
      '<circle class="zc-gd" cx="' + DB[0] + '" cy="' + DB[1] + '" r="110" style="fill:var(--accent)" opacity="0"/><circle class="zc-gc" cx="' + CH[0] + '" cy="' + CH[1] + '" r="230" style="fill:var(--accent)" opacity="0"/>' +
      '<g class="zc-cg">' + R.compass('zc-c', 110) + '</g>' + R.strip('zc') + '</svg>' + R.stripTag('zc') +
      '<div class="tag tag-warm zc-a">מה חשוב לי כאן?</div><div class="tag zc-b">להישאר פעילים</div><div class="tag zc-c2">אחת הדרכים שלנו לדאוג לעצמנו</div>' +
      '<div class="tag zc-d">היום כבר דחפתי את עצמי מספיק</div><div class="tag tag-warm zc-e">לעשות קצת פחות</div></div>'));
    Object.assign(this, R.refs(kit, 'zc', ['body', 'head', 'eyes', 'mouth', 'db', 'mat-flat', 'mat-roll', 'gd', 'gc', 'cg', 'c-needle', 'c-glow', 'a', 'b', 'c2', 'd', 'e']));
    this.S = R.stripRefs(kit, 'zc');
  },
  render(t) {
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, 0);
    this.db.setAttribute('transform', 'translate(' + DB[0] + ' ' + DB[1] + ')');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    R.setStrip(this.S, t, 2, 1.21);
    // her compass: it looks around, points to the dumbbell (staying active), then to her armchair (a bit less)
    const c = eob(seg(t, 1.3, 1.9), 1.4);
    this.cg.setAttribute('transform', 'translate(' + CX + ' ' + CY + ') scale(' + Math.max(0.001, c) + ')');
    let a = 30 * Math.sin(t * 2.2) * (1 - eo(seg(t, 4.6, 5.2)));
    a = lerp(a, R.aim(CX, CY, DB[0], DB[1]), eio(seg(t, 4.8, 5.6)));
    a = lerp(a, R.aim(CX, CY, CH[0], CH[1]), eio(seg(t, P12 + 2.2, P12 + 3.0)));
    this['c-needle'].setAttribute('transform', 'rotate(' + (a + 2 * Math.sin(t * 3)) + ')');
    this.gd.setAttribute('opacity', 0.25 * eo(seg(t, 7.8, 8.4)) * (1 - eo(seg(t, P12 + 2.0, P12 + 2.6))));
    this.gc.setAttribute('opacity', 0.18 * eo(seg(t, P12 + 6.9, P12 + 7.6)));
    // she looks at one, then settles back into her chair
    const back = eio(seg(t, P12 + 6.9, P12 + 7.8));
    R.look(this.eyes, t, 0.6, t < P12 + 2 ? 5 : 2, t < P12 + 2 ? 2 : -2);
    this.head.setAttribute('transform', 'rotate(' + (t < P12 + 2 ? 4 : -3 * back) + ' 0 30)');
    this.mouth.setAttribute('d', t > 7.6 ? R.SMILE : R.FLAT);
    const o = (a0, b) => eo(seg(t, a0, a0 + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, CX, lerp(512, 500, eo(seg(t, 1.79, 2.2))), o(1.79, P12 + 0.2));
    R.place(this.b, 790, lerp(722, 710, eo(seg(t, 7.85, 8.3))), o(7.85, P12 + 0.2));
    R.place(this.c2, 700, lerp(592, 580, eo(seg(t, 10.57, 11.0))), o(10.57, P12 + 0.2));
    R.place(this.d, 700, lerp(512, 500, eo(seg(t, P12 + 2.43, P12 + 2.9))), o(P12 + 2.43, 99));
    R.place(this.e, 700, lerp(592, 580, eo(seg(t, P12 + 7.09, P12 + 7.5))), o(P12 + 7.09, 99));
  },
});
