const { seg, eo, eio, eob, lerp } = kit;
kit.scene('o-head', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('oh') + '<rect class="oh-veil" width="1080" height="1080" style="fill:var(--ground)"/>' +
      '<g class="oh-b">' + R.balloon('oh-bl') + '</g><g class="oh-gap"><path class="ink oh-line" pathLength="1" style="stroke-width:7"/><path class="ink oh-ends" style="stroke-width:7"/></g></svg>' +
      '<div class="tag tag-cool oh-a">היכולת המדהימה של המוח האנושי</div><div class="tag oh-b2">לזהות מחשבות</div><div class="tag tag-warm oh-c">ולהתבונן בהן ממרחק בריא</div></div>'));
    Object.assign(this, R.refs(kit, 'oh', ['veil', 'glow', 'star', 'b', 'line', 'ends', 'a', 'b2', 'c']));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.7));
    // inside the head: the bulb lights; a thought is recognised and seen from a little way off
    const lit = eo(seg(t, 2.1, 2.8));
    this.glow.setAttribute('transform', 'scale(' + (0.6 + 0.5 * lit + 0.06 * Math.sin(t * 4) * lit) + ')'); this.glow.style.opacity = 0.2 + 0.6 * lit;
    const bp = eob(seg(t, 3.9, 4.5), 1.6), off = eio(seg(t, 5.0, 6.2));
    R.setBal(this.b, lerp(560, 900, off), lerp(380, 180, off) + Math.sin(t * 1.4) * 6, bp * lerp(1.2, 1.5, off), eo(seg(t, 3.9, 4.1)));
    const g = eo(seg(t, 5.9, 6.6)), x0 = 740, x1 = 860, y = 330;
    this.line.setAttribute('d', 'M' + x0 + ' ' + (y + 60) + ' L' + x1 + ' ' + y); this.line.style.strokeDasharray = g + ' 1'; this.line.style.opacity = g > 0 ? 1 : 0;
    this.ends.setAttribute('d', 'M' + (x0 - 14) + ' ' + (y + 40) + ' L' + (x0 + 14) + ' ' + (y + 80) + ' M' + (x1 - 14) + ' ' + (y - 20) + ' L' + (x1 + 14) + ' ' + (y + 20)); this.ends.style.opacity = g;
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.1, 2.5))), eo(seg(t, 2.1, 2.5)));
    R.place(this.b2, 540, lerp(940, 928, eo(seg(t, 3.9, 4.3))), eo(seg(t, 3.9, 4.3)) * (1 - eo(seg(t, 5.6, 5.9))));
    R.place(this.c, 540, lerp(940, 928, eo(seg(t, 5.9, 6.3))), eo(seg(t, 5.9, 6.3)));
  },
});
