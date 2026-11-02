const { seg, eo, eio, eob, lerp } = kit;
const XS = [930, 780, 620, 460, 300];
kit.scene('g-minute', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('gm', 620, []) +
      '<path class="gm-link" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:14;stroke-linecap:round" d="M' + XS.map((x) => x + ' 620').join(' L') + '"/>' +
      XS.map((x, k) => '<g class="gm-d' + k + '" transform="translate(' + x + ' 620)"><circle r="30" style="fill:var(--ground);stroke:var(--second);stroke-width:6"/><circle class="gm-c' + k + '" r="16" class="amber" style="fill:var(--accent)"/></g>').join('') + '</svg>' +
      '<div class="tag tag-warm gm-cap">דקה פה ושם</div><div class="tag tag-cool gm-fam">ככל שזה מוכר, קל יותר לחזור</div></div>'));
    Object.assign(this, R.refs(kit, 'gm', ['curve', 'link', 'cap', 'fam', 'd0', 'd1', 'd2', 'd3', 'd4']));
  },
  render(t) {
    this.curve.style.opacity = 0;
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.7, 1.2))), eo(seg(t, 0.7, 1.2)));
    // a minute here and there across the day...
    XS.forEach((x, k) => { const p = eob(seg(t, 1.0 + k * 0.7, 1.5 + k * 0.7), 1.8); this['d' + k].setAttribute('transform', 'translate(' + x + ' 620) scale(' + p + ')'); });
    // ...joins up as it becomes familiar
    const l = eio(seg(t, 5.4, 7.6));
    this.link.style.strokeDasharray = l + ' 1'; this.link.style.opacity = l > 0 ? 1 : 0;
    R.place(this.fam, 540, lerp(780, 768, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
  },
});
