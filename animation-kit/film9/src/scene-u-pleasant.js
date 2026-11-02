const { seg, eo, eio, eob, lerp } = kit;
const MOOD = [0, 1, 0, 1, 0, 1];
kit.scene('u-pleasant', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('ue') + R.busSide('ue') +
      MOOD.map((w, k) => (w ? '<circle class="ue-g' + k + '" cx="' + R.wx(k) + '" cy="510" r="100" style="fill:var(--accent);opacity:0"/>' : '')).join('') + '</svg>' +
      '<div class="tag ue-a">רגעים נעימים</div><div class="tag ue-b">הכרת תודה</div><div class="tag tag-warm ue-c">לא רק נוסעים קשים, גם נוסעים נעימים</div></div>'));
    this.o = R.sideRefs(kit, 'ue');
    Object.assign(this, R.refs(kit, 'ue', ['a', 'b', 'c', 'g1', 'g3', 'g5']));
    MOOD.forEach((w, k) => R.mood(this.o.v[k], w, false));
  },
  render(t) {
    const o = this.o;
    R.scroll(o, t, 300); R.blink(o.reyes, t, 0.4);
    o.bus.setAttribute('transform', 'translate(0 ' + Math.abs(Math.sin(t * 7)) * -3 + ')');
    // the pleasant passengers light up: they were on board all along
    [1, 3, 5].forEach((k, i) => { const p = eo(seg(t, 1.8 + i * 0.5, 2.4 + i * 0.5)); this['g' + k].style.opacity = 0.3 * p * (0.8 + 0.2 * Math.sin(t * 3 + k)); o.v[k].g.setAttribute('transform', 'translate(0 ' + (t > 7.9 ? -Math.abs(Math.sin(t * 4 + k)) * 10 : 0) + ')'); });
    o.rmouth.setAttribute('d', t > 3 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 760, lerp(222, 210, eo(seg(t, 1.8, 2.2))), eo(seg(t, 1.8, 2.2)));
    R.place(this.b, 330, lerp(222, 210, eo(seg(t, 2.9, 3.3))), eo(seg(t, 2.9, 3.3)));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 7.9, 8.3))), eo(seg(t, 7.9, 8.3)));
  },
});
