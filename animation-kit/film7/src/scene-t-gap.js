const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-gap', {
  init(kit) {
    let tiles = '';
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) tiles += '<rect class="tp-t' + (i * 3 + j) + '" x="' + (446 + i * 44) + '" y="' + (304 + j * 44) + '" width="40" height="40" rx="8" style="fill:color-mix(in srgb, var(--accent) 35%, var(--ground));stroke:var(--second);stroke-width:4"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('tp') + '<g class="tp-puz">' + tiles + '</g><rect class="tp-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-cool tp-a">הפרשנות של המוח</div><div class="tag tag-warm tp-b">מנסה להבין, ומהר</div></div>'));
    Object.assign(this, R.refs(kit, 'tp', ['bulb', 'puz', 'veil', 'a', 'b', 't4']));
    this.bulb.style.opacity = 0; this.t4.style.opacity = 0;
    this.ts = [0, 1, 2, 3, 5, 6, 7, 8].map((k) => kit.stage.querySelector('.tp-t' + k));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.8));
    // inside the head: the brain assembles a picture of what's happening, piece by piece, fast
    this.ts.forEach((el, k) => { const a = 5.6 + k * 0.12, p = eob(seg(t, a, a + 0.3), 1.6); el.style.opacity = eo(seg(t, 1.2 + k * 0.1, 1.5 + k * 0.1)); el.setAttribute('transform', 'translate(0 ' + (1 - eio(seg(t, 1.2 + k * 0.1, 1.6 + k * 0.1))) * -40 + ')'); });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
    R.place(this.b, 540, lerp(1000, 988, eo(seg(t, 6.4, 6.9))), eo(seg(t, 6.4, 6.9)));
  },
});