const { seg, eo, eio, eob, lerp } = kit;
// self-compassion: the voice warms and lifts the extra weight away; the pack and the path stay
const CAM = 'translate(540 1020) scale(1.6) translate(-540 -1020)';
kit.scene('h-lighter', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="' + CAM + '">' + R.land('hg') +
      '<g class="hg-walker"><g class="hg-a">' + R.ruthBack('hg-a', false) + '</g><g class="hg-b">' + R.ruthBack('hg-b', true) + '</g></g><g class="hg-wt">' + R.weight() + '</g>' +
      '<g class="hg-vg">' + R.voice('hg-v') + '</g></g></svg>' +
      '<div class="tag tag-warm hg-t0">חמלה עצמית</div><div class="tag tag-warm hg-t1">קצת פחות קשים עם עצמנו</div><div class="tag tag-cool hg-t2">בתוך ההתמודדות</div></div>'));
    Object.assign(this, R.refs(kit, 'hg', ['walker', 'wt', 'vg', 't0', 't1', 't2']));
    this.ga = kit.stage.querySelector('g.hg-a'); this.gb = kit.stage.querySelector('g.hg-b');
    this.st = kit.stage.querySelector('.hg-st2'); this.st.setAttribute('transform', 'translate(-40 0)');
    this.v = R.refs(kit, 'hg-v', ['grey', 'warm', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.v.eyes, t, 0.9);
    const go = eio(seg(t, 4.0, 6.3)), walking = t > 4.0, step = walking ? Math.floor(t * 1.8) % 2 : 0;
    const k = 1.3 + 0.4 * go, [x, y, r] = R.onPath(k), s = 0.66 * r / 130;
    this.ga.style.opacity = step ? 0 : 1; this.gb.style.opacity = step ? 1 : 0;
    const up = eio(seg(t, 2.5, 3.6));
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y + (walking ? Math.abs(Math.sin(t * Math.PI * 1.8)) * -5 : 0)) + ') scale(' + s + ') rotate(' + lerp(11, 3, up) + ')');
    // the voice turns warm...
    const w = eio(seg(t, 0.3, 1.1));
    this.v.warm.setAttribute('opacity', w); this.v.grey.setAttribute('opacity', 1 - w);
    this.v.mouth.setAttribute('d', w > 0.5 ? 'M-6 2 Q10 16 26 2' : 'M-2 10 Q10 2 22 10');
    const vx = x + 190 * s, vy = y - 520 * s + Math.sin(t * 2.2) * 6;
    R.xf(this.vg, vx, vy, 1.1 * s * (1 + 0.15 * Math.sin(Math.PI * seg(t, 0.3, 1.1))), 1);
    // ...and lifts the extra weight off her pack and away
    const wx = lerp(x + 30 * s, x + 330, up), wy = lerp(y - 262 * s, y - 860 * s, up) - Math.sin(Math.PI * up) * 40;
    R.xf(this.wt, wx, wy, 1.05 * s * (1 - 0.4 * up), 1 - eo(seg(t, 3.2, 3.8)));
    R.place(this.t0, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.t1, 540, lerp(176, 164, eo(seg(t, 2.5, 3.0))), eo(seg(t, 2.5, 3.0)));
    R.place(this.t2, 540, lerp(1002, 990, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});
