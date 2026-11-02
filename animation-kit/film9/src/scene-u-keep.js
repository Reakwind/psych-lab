const { seg, eo, eio, eob, lerp } = kit;
const MOOD = [0, 1, 0, 0, 1, 0], TALK = [0, 2, 3, 5];
kit.scene('u-keep', {
  init(kit) {
    const dots = TALK.map((k) => '<g class="uk-m' + k + '"><path d="M-40 14 C-56 14 -56 -16 -36 -16 H36 C56 -16 56 14 36 14 H-10 L-26 30 L-22 14Z" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:4"/>' +
      '<circle class="metal" cx="-18" cy="-1" r="5"/><circle class="metal" cx="0" cy="-1" r="5"/><circle class="metal" cx="18" cy="-1" r="5"/></g>').join('');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('uk') + R.busSide('uk') + dots + '</svg>' +
      '<div class="tag tag-cool uk-a">ACT</div><div class="tag tag-warm uk-b">ממשיכים לנהוג, גם כשהנוסעים על האוטובוס</div><div class="tag uk-c">חלקם אפילו יישארו לאורך הדרך</div></div>'));
    this.o = R.sideRefs(kit, 'uk');
    Object.assign(this, R.refs(kit, 'uk', ['a', 'b', 'c']));
    this.m = TALK.map((k) => kit.stage.querySelector('.uk-m' + k));
    MOOD.forEach((w, k) => R.mood(this.o.v[k], w, false));
  },
  render(t) {
    const o = this.o;
    R.scroll(o, t, 300); R.blink(o.reyes, t, 0.4);
    o.bus.setAttribute('transform', 'translate(0 ' + Math.abs(Math.sin(t * 7)) * -3 + ')');
    // eyes on the road: she keeps driving while they keep murmuring
    o.rmouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    this.m.forEach((m, i) => { const a = 9.7 + i * 0.35, p = eob(seg(t, a, a + 0.4), 1.8); m.style.opacity = eo(seg(t, a, a + 0.2)); m.setAttribute('transform', 'translate(' + (R.wx(TALK[i]) + 30) + ' ' + (392 + Math.sin(t * 3 + i) * 6) + ') scale(' + Math.max(0.001, p) + ')'); });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.2, 3.6))), eo(seg(t, 3.2, 3.6)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.9, 5.3))), eo(seg(t, 4.9, 5.3)));
    R.place(this.c, 540, lerp(272, 260, eo(seg(t, 11.7, 12.1))), eo(seg(t, 11.7, 12.1)));
  },
});
