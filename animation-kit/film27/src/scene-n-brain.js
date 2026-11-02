const { seg, eo, eio, eob, lerp } = kit;
const W = [[4.0, 'לזכור', 250, 150], [4.6, 'ללמוד', 830, 150], [5.2, 'לחשוב', 200, 640], [7.2, 'מצב הרוח', 880, 760]];
kit.scene('n-brain', {
  init(kit) {
    let blocks = '';
    for (let k = 0; k < 6; k++) blocks += '<rect class="nr-k' + k + '" x="-18" y="-18" width="36" height="36" rx="8" style="fill:' + ['#8FB3E0', '#E8A33D', '#7FC0A8', '#E58AA3', '#B39DDB', '#E0C36A'][k] + ';stroke:var(--second);stroke-width:4"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('nr') + '<g clip-path="url(#nr-clip)">' + blocks + '</g>' +
      '<rect class="nr-night" width="1080" height="1080" style="fill:#1A2340;opacity:0;pointer-events:none"/><g class="nr-zz"><text x="0" y="0" style="font-size:64px;font-weight:700;fill:var(--second)">z</text><text x="44" y="-50" style="font-size:50px;font-weight:700;fill:var(--second)">z</text></g></svg>' +
      W.map((w, k) => '<div class="tag nr-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool nr-top">לשינה יש תפקיד חשוב</div><div class="tag tag-night nr-sleep">בזמן השינה, המוח ממשיך לעבוד</div><div class="tag tag-warm nr-end">התאוששות והתארגנות</div></div>'));
    Object.assign(this, R.refs(kit, 'nr', ['bulb', 'eye', 'nerves', 'night', 'zz', 'top', 'sleep', 'end', 'w0', 'w1', 'w2', 'w3']));
    this.k = [0, 1, 2, 3, 4, 5].map((i) => kit.stage.querySelector('.nr-k' + i));
    this.bulb.style.opacity = 0;
  },
  render(t) {
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 3.6, 4.0))));
    W.forEach(([a, , x, y], k) => R.place(this['w' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)) * (1 - eo(seg(t, 8.0, 8.4)))));
    // asleep: the eye closes, the light lowers; inside, the brain keeps working
    const sl = eio(seg(t, 8.2, 9.2));
    this.eye.setAttribute('transform', sl > 0.5 ? 'translate(790 512) scale(1 .15) translate(-790 -512)' : '');
    this.night.style.opacity = 0.2 * sl;
    this.zz.style.opacity = sl * (0.6 + 0.4 * Math.sin(t * 2)); this.zz.setAttribute('transform', 'translate(880 ' + (380 - (t % 3) * 12) + ')');
    this.nerves.style.strokeDashoffset = -t * 40; this.nerves.style.opacity = 0.4 + 0.6 * sl;
    R.place(this.sleep, 540, lerp(84, 70, eo(seg(t, 8.2, 8.7))), eo(seg(t, 8.2, 8.7)));
    // scattered pieces drift, then line up in order: recovering and getting organised
    const org = eio(seg(t, 13.8, 15.6));
    this.k.forEach((el, i) => {
      const sx = 400 + ((i * 97) % 220), sy = 300 + ((i * 61) % 130), tx = 420 + (i % 3) * 64, ty = 330 + Math.floor(i / 3) * 64;
      const x = lerp(sx + Math.sin(t * 0.9 + i) * 26, tx, org), y = lerp(sy + Math.cos(t * 0.8 + i * 2) * 20, ty, org);
      el.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + (1 - org) * (i * 40 + t * 20) + ')');
      el.style.opacity = eo(seg(t, 9.0 + i * 0.2, 9.5 + i * 0.2));
    });
    R.place(this.end, 540, lerp(940, 928, eo(seg(t, 14.0, 14.5))), eo(seg(t, 14.0, 14.5)));
  },
});
