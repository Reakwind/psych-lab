const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('w-muscle', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayBar('wm', 220) +
      [0, 2, 4].map((k) => '<g transform="translate(' + X[k] + ' 220)">' + R.grey('wm-g' + k, 136) + '</g>').join('') +
      '<g class="wm-w0">' + R.warm('wm-t0', 'mug') + '</g><g class="wm-w1">' + R.warm('wm-t1', 'note') + '</g>' +
      '<g class="wm-bd"><circle class="shade" cy="14" r="230"/><circle r="230" style="fill:color-mix(in srgb, var(--accent) 16%, var(--ground));stroke:var(--second);stroke-width:8"/><g class="wm-arm">' + R.arm('wm-a') + '</g></g></svg>' +
      '<div class="tag tag-cool wm-c">בוחרים לתת לזה מקום</div><div class="tag wm-d">אפילו בקטן</div><div class="tag tag-warm wm-e">מחזקים את השריר הזה</div><div class="tag wm-f">ועם הזמן, קצת יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'wm', ['w0', 'w1', 'bd', 'arm', 'c', 'd', 'e', 'f']));
    this.bi = kit.stage.querySelector('.wm-a-bi'); this.fore = kit.stage.querySelector('.wm-a-fore');
  },
  render(t) {
    // giving a good thing a place, even a small one...
    R.xf(this.w0, 670, 220 + Math.sin(t * 2) * 3, 0.75 * eob(seg(t, 2.8, 3.3), 1.6), eo(seg(t, 2.8, 3.0)));
    R.xf(this.w1, 350, 220 + Math.sin(t * 2 + 1) * 3, eob(seg(t, 10.8, 11.3), 1.6), eo(seg(t, 10.8, 11.0)));
    // ...strengthens the muscle; over time it grows
    const arm = eob(seg(t, 6.3, 6.9), 1.4), flex = eio(seg(t, 6.8, 7.6)), more = eio(seg(t, 10.8, 11.6));
    this.bd.setAttribute('transform', 'translate(540 640) scale(' + arm + ')'); this.bd.style.opacity = eo(seg(t, 6.3, 6.5));
    this.arm.setAttribute('transform', 'translate(140 150) scale(1.25)');
    this.fore.setAttribute('transform', 'translate(-170 10) rotate(' + lerp(-60, 0, flex) + ' 0 0)');
    const b = 0.8 + 0.25 * flex + 0.25 * more + 0.03 * Math.sin(t * 3) * flex;
    this.bi.setAttribute('transform', 'translate(-100 ' + (-30 - 16 * (b - 0.8)) + ') scale(' + b + ' ' + (b + 0.15 * (b - 0.8)) + ')');
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)) * (1 - eo(seg(t, 6.1, 6.4))));
    R.place(this.d, 670, lerp(312, 300, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3)) * (1 - eo(seg(t, 6.1, 6.4))));
    R.place(this.e, 540, lerp(84, 70, eo(seg(t, 6.4, 6.9))), eo(seg(t, 6.4, 6.9)) * (1 - eo(seg(t, 10.5, 10.8))));
    R.place(this.f, 540, lerp(84, 70, eo(seg(t, 10.8, 11.3))), eo(seg(t, 10.8, 11.3)));
  },
});
