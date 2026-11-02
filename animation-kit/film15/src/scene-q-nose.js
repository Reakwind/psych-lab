const { seg, eo, eio, eob, lerp } = kit;
// air in through the nose, out through the mouth; but any way that feels comfortable is fine
kit.scene('q-nose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.torso('q9') +
      '<path class="q9-out" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-dasharray:.06 .06" d="M696 302 C760 316 820 340 900 360"/>' +
      '<path class="q9-ai" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round;stroke-linejoin:round" d="M762 238 L742 256 L766 270"/>' +
      '<path class="q9-ao" style="fill:none;stroke:var(--accent);stroke-width:8;stroke-linecap:round;stroke-linejoin:round" d="M872 334 L902 360 L870 374"/></svg>' +
      '<div class="tag tag-warm q9-p">ואנחנו רק נותנים לו את הקצב</div><div class="tag tag-cool q9-a">שואפים דרך האף</div><div class="tag tag-warm q9-b">נושפים דרך הפה</div><div class="tag q9-c">אבל זה ממש לא חובה</div><div class="tag tag-cool q9-d">תעשו מה שנוח לכם</div></div>'));
    Object.assign(this, R.refs(kit, 'q9', ['lung', 'gut', 'belly', 'air', 'out', 'ai', 'ao', 'p', 'a', 'b', 'c', 'd']));
    this.dia = kit.stage.querySelector('g.q9-dia');
  },
  render(t) {
    // breathing cycles: in for 2 s, out for 2.4 s
    const per = 4.4, c = ((t - 0.4) % per + per) % per, inn = c < 2.0, b = inn ? eio(c / 2.0) : 1 - eio((c - 2.0) / 2.4);
    this.lung.setAttribute('transform', 'translate(540 560) scale(' + (1 + 0.05 * b) + ' ' + (1 + 0.08 * b) + ') translate(-540 -560)');
    this.dia.setAttribute('transform', 'translate(0 ' + 40 * b + ')');
    this.gut.setAttribute('transform', 'translate(' + 12 * b + ' ' + 26 * b + ')');
    this.belly.setAttribute('transform', 'translate(640 0) scale(' + (1 + 0.18 * b) + ' 1) translate(-640 0)');
    const show = eo(seg(t, 2.3, 2.8)) * (1 - 0.6 * eo(seg(t, 5.4, 6.0)));
    this.air.style.opacity = (inn ? 1 : 0.15) * show; this.air.style.strokeDashoffset = -t * 0.3;
    this.out.style.opacity = (inn ? 0.15 : 1) * eo(seg(t, 3.6, 4.1)) * (1 - 0.6 * eo(seg(t, 5.4, 6.0))); this.out.style.strokeDashoffset = -t * 0.3;
    this.ai.style.opacity = this.air.style.opacity; this.ao.style.opacity = this.out.style.opacity;
    R.place(this.p, 540, 980, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 880, lerp(142, 130, eo(seg(t, 2.52, 2.9))), eo(seg(t, 2.52, 2.9)));
    R.place(this.b, 880, lerp(422, 410, eo(seg(t, 3.74, 4.1))), eo(seg(t, 3.74, 4.1)));
    R.place(this.c, 540, lerp(992, 980, eo(seg(t, 5.56, 5.9))), eo(seg(t, 5.56, 5.9)) * (1 - eo(seg(t, 6.8, 7.0))));
    R.place(this.d, 540, lerp(992, 980, eo(seg(t, 7.03, 7.4))), eo(seg(t, 7.03, 7.4)));
  },
});
