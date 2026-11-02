const { seg, eo, eio, eob, lerp } = kit;
kit.scene('b-belly', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.torso('bb') +
      '<path class="bb-arrow ink" style="stroke:var(--accent);stroke-width:12;opacity:0" d="M880 480 C900 600 860 720 800 790 M780 760 L798 794 L832 772"/>' +
      '<rect class="bb-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-warm bb-to">אל הבטן</div><div class="tag bb-chest">לא רק בחזה</div><div class="tag tag-cool bb-dia">הסרעפת</div>' +
      '<div class="tag tag-warm bb-in">שאיפה: הבטן עולה</div><div class="tag bb-out">נשיפה: יורדת</div></div>'));
    Object.assign(this, R.refs(kit, 'bb', ['lung', 'dia', 'gut', 'belly', 'air', 'arrow', 'veil', 'to', 'chest', 'dia', 'in', 'out']));
    this.diaTag = kit.stage.querySelectorAll('.bb-dia')[1];
    this.diaG = kit.stage.querySelector('g.bb-dia');
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.9));
    // inside view: a slow breath cycle; first the chest moves, then the breath goes down to the belly
    const per = 5.2, b = (1 - Math.cos(2 * Math.PI * t / per)) / 2, inhaling = Math.sin(2 * Math.PI * t / per) > 0;
    const chestOnly = eo(seg(t, 10.8, 11.6)) * (1 - eo(seg(t, 14.6, 15.2))), belly = eo(seg(t, 14.8, 15.6));
    const chest = 0.4 + 0.6 * chestOnly - 0.3 * belly, bel = 0.3 * (1 - chestOnly) + 0.7 * belly;
    this.lung.setAttribute('transform', 'translate(540 560) scale(' + (1 + 0.06 * b * chest + 0.04 * b * bel) + ' ' + (1 + 0.04 * b * chest + 0.08 * b * bel) + ') translate(-540 -560)');
    this.diaG.setAttribute('transform', 'translate(0 ' + (46 * b * bel) + ')');
    this.gut.setAttribute('transform', 'translate(' + (14 * b * bel) + ' ' + (30 * b * bel) + ')');
    this.belly.setAttribute('transform', 'translate(640 0) scale(' + (1 + 0.22 * b * bel) + ' 1) translate(-640 0)');
    this.air.style.strokeDashoffset = (inhaling ? 1 : -1) * t * 0.25;
    this.air.style.opacity = 0.9;
    this.arrow.style.opacity = eo(seg(t, 6.8, 7.3)) * (1 - eo(seg(t, 10.4, 10.9)));
    R.place(this.to, 900, lerp(392, 380, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)) * (1 - eo(seg(t, 10.4, 10.9))));
    R.place(this.chest, 220, lerp(512, 500, eo(seg(t, 11.0, 11.5))), eo(seg(t, 11.0, 11.5)) * (1 - eo(seg(t, 14.5, 15.0))));
    R.place(this.diaTag, 220, lerp(712, 700, eo(seg(t, 13.8, 14.3))), eo(seg(t, 13.8, 14.3)));
    R.place(this.in, 540, lerp(84, 70, eo(seg(t, 15.1, 15.6))), eo(seg(t, 15.1, 15.6)));
    R.place(this.out, 540, lerp(162, 150, eo(seg(t, 16.1, 16.6))), eo(seg(t, 16.1, 16.6)));
  },
});
