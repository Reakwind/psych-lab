const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-alarm', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('ta') +
      '<g class="ta-al"><circle r="70" style="fill:#D96C6C;opacity:.3"/><circle r="40" style="fill:#D9534F;stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke:#D9534F;stroke-width:8" d="M-70 -50 l-22 -18 M70 -50 l22 -18 M0 -86 v-26"/></g>' +
      '<rect class="ta-tint" width="1080" height="1080" style="fill:#5B6E92;opacity:0"/></svg>' +
      '<div class="tag tag-cool ta-a">בנוי לזהות סכנות ולהגן</div><div class="tag ta-b">בלחץ: ממהר להניח שמשהו לא בסדר</div><div class="tag tag-warm ta-c">ואז הכול מרגיש שלילי יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'ta', ['bulb', 'al', 'tint', 'a', 'b', 'c']));
    this.bulb.style.opacity = 0;
  },
  render(t) {
    // the brain's alarm: there to protect us, quicker under stress — and it colours how things feel
    const on = eob(seg(t, 3.0, 3.6), 1.6), fast = seg(t, 6.2, 6.8);
    this.al.setAttribute('transform', 'translate(520 360) scale(' + on * (1 + 0.08 * Math.sin(t * lerp(4, 14, fast))) + ')');
    this.al.style.opacity = on > 0 ? 0.75 + 0.25 * Math.sin(t * lerp(4, 14, fast)) : 0;
    this.tint.style.opacity = 0.22 * eo(seg(t, 9.6, 11.0));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.2, 3.7))), eo(seg(t, 3.2, 3.7)) * (1 - eo(seg(t, 6.0, 6.3))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 6.3, 6.8))), eo(seg(t, 6.3, 6.8)) * (1 - eo(seg(t, 9.5, 9.8))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 9.8, 10.3))), eo(seg(t, 9.8, 10.3)));
  },
});