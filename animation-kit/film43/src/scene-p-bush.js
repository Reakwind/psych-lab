const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-bush', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pu') +
      '<rect class="pu-sky" width="1080" height="470" style="fill:#F2A68C;opacity:0"/>' +
      '<g class="pu-grass"><ellipse cx="250" cy="900" rx="190" ry="54" style="fill:color-mix(in srgb, var(--main) 35%, #CDE8B0)"/>' +
      [[170, 890], [230, 912], [300, 884], [340, 906], [200, 920]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="9" style="fill:#FFF3C4"/><circle class="amber" cx="' + x + '" cy="' + y + '" r="4"/>').join('') + '</g>' +
      '<g class="pu-bush">' + R.bush('pu-b') + '</g><g class="pu-ring">' + R.attn('pu') + '</g></svg>' +
      '<div class="tag tag-cool pu-a">לזהות סכנות ותנועות חשודות בין השיחים</div><div class="tag pu-s">צבע יפה בשמיים</div><div class="tag pu-g">מקום שבו הדשא נעים</div></div>'));
    Object.assign(this, R.refs(kit, 'pu', ['sky', 'grass', 'bush', 'ring', 'a', 's', 'g']));
    this.eyes = kit.stage.querySelector('.pu-b-eyes'); this.lv = kit.stage.querySelector('.pu-b-leaves');
  },
  render(t) {
    // through most of history, danger in the bushes mattered more
    const rustle = seg(t, 3.9, 7.4) > 0 && seg(t, 3.9, 7.4) < 1 ? Math.sin(t * 30) * 6 : 0;
    this.bush.setAttribute('transform', 'translate(780 1030)');
    this.lv.setAttribute('transform', 'rotate(' + rustle * 0.4 + ' 0 -60) translate(' + rustle + ' 0)');
    this.eyes.style.opacity = eo(seg(t, 5.0, 5.4)) * (Math.floor(t * 1.3) % 4 === 3 ? 0.2 : 1);
    const snap = eob(seg(t, 5.6, 6.1), 1.6);
    R.xf(this.ring, 780, 900, lerp(400, 250, snap) + Math.sin(t * 3) * 4, eo(seg(t, 5.6, 5.8)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    // ...than a lovely colour in the sky, or where the grass is soft: they pass unseen
    this.sky.style.opacity = 0.32 * eio(seg(t, 7.8, 8.8));
    R.place(this.s, 330, lerp(212, 200, eo(seg(t, 8.0, 8.5))), 0.6 * eo(seg(t, 8.0, 8.5)));
    this.grass.style.opacity = 0.55 + 0.45 * eio(seg(t, 9.3, 10.0));
    R.place(this.g, 260, lerp(772, 760, eo(seg(t, 9.5, 10.0))), 0.6 * eo(seg(t, 9.5, 10.0)));
  },
});
