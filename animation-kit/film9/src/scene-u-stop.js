const { seg, eo, eio, eob, lerp } = kit;
const IN = [[0, 1.5, 1, null], [3, 0, 1, 2.2], [1, 2.4, 0, null], [4, 2.9, 0, null], [2, 3.4, 1, null], [5, 3.9, 1, null]];
const W = [[5.4, 'נחמדים ומנומסים', 780, 150, 'tag-warm'], [7.6, 'קולניים', 830, 250, ''], [8.5, 'תובעניים', 560, 250, ''], [9.4, 'נודניקים', 290, 250, '']];
kit.scene('u-stop', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('us') +
      '<g transform="translate(40 790)"><rect class="metal" x="-6" y="-420" width="12" height="420" rx="5"/><circle r="40" cy="-420" style="fill:var(--main);stroke:var(--second);stroke-width:6"/><rect class="light" x="-22" y="-426" width="44" height="12" rx="6"/></g>' + R.busSide('us') + '</svg>' +
      W.map((w, k) => '<div class="tag ' + w[4] + ' us-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool us-t">עולים ויורדים נוסעים</div></div>'));
    this.o = R.sideRefs(kit, 'us');
    Object.assign(this, R.refs(kit, 'us', ['w0', 'w1', 'w2', 'w3', 't']));
    IN.forEach(([k, , w]) => R.mood(this.o.v[k], w, false));
  },
  render(t) {
    const o = this.o;
    R.scroll(o, 0, 0); R.blink(o.reyes, t, 0.4);
    // at a stop: passengers get on and off; the kind ones smile, the loud ones shout
    IN.forEach(([k, a, warm, out]) => {
      const p = k === 3 ? 1 - eio(seg(t, out, out + 0.4)) : eob(seg(t, a, a + 0.45), 2);
      R.popIn(o.px[k], R.WIN[k], p);
      const loud = !warm && t > 7.6, kind = warm && t > 5.4;
      R.mood(o.v[k], warm, loud && Math.floor(t * 4 + k) % 2 === 0);
      o.v[k].g.setAttribute('transform', 'translate(' + (loud ? Math.sin(t * 40 + k) * 4 : 0) + ' ' + (kind ? -Math.abs(Math.sin(t * 4 + k)) * 10 : 0) + ')');
    });
    R.place(this.t, 540, lerp(84, 70, eo(seg(t, 1.3, 1.7))), eo(seg(t, 1.3, 1.7)));
    W.forEach(([a, , x, y], k) => R.place(this['w' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
