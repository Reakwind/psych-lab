const { seg, eo, eio, eob, lerp } = kit;
kit.scene('u-wheel', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cab('uh', { mirror: true }) +
      '<g class="uh-gl" style="opacity:0"><circle cx="234" cy="760" r="80" style="fill:var(--accent);opacity:.35"/><circle cx="626" cy="760" r="80" style="fill:var(--accent);opacity:.35"/></g></svg>' +
      '<div class="tag tag-cool uh-a">הם הנוסעים, לא הנהגים</div><div class="tag uh-b">ההגה עדיין בידיים שלנו</div><div class="thought sm kind uh-q">"לאן חשוב לי לנסוע עכשיו?"</div><div class="tag tag-cool uh-c">וזה משהו שאפשר לתרגל</div></div>'));
    Object.assign(this, R.refs(kit, 'uh', ['view', 'center', 'route', 'h-glow', 'gl', 'mq0', 'mq1', 'mq2', 'a', 'b', 'q', 'c']));
    this.m = [0, 1, 2].map((k) => R.voiceRefs(kit, 'uh-m' + k));
  },
  render(t) {
    // eyes ahead, hands on the wheel; the passengers still chatter in the mirror
    this.view.setAttribute('transform', 'translate(60 ' + (-111 + Math.sin(t * 5) * 2) + ') scale(.889)');
    this.center.style.strokeDashoffset = -t * 90;
    R.mood(this.m[0], 0, Math.floor(t * 3) % 2 === 0); R.mood(this.m[1], 1, false); R.mood(this.m[2], 0, Math.floor(t * 3 + 1) % 2 === 0);
    this.gl.style.opacity = eo(seg(t, 2.6, 3.2)) * (0.75 + 0.25 * Math.sin(t * 3));
    const r = eio(seg(t, 7.4, 9.2));
    this.route.style.strokeDasharray = r + ' 1'; this.route.style.opacity = r > 0 ? 0.85 : 0;
    this['h-glow'].setAttribute('r', 70 + 26 * Math.sin(t * 3) * eo(seg(t, 7.4, 8)));
    R.place(this.a, 540, lerp(124, 110, eo(seg(t, 0.8, 1.2))), eo(seg(t, 0.8, 1.2)) * (1 - eo(seg(t, 12.0, 12.4))));
    R.place(this.b, 430, lerp(532, 520, eo(seg(t, 2.6, 3.0))), eo(seg(t, 2.6, 3.0)) * (1 - eo(seg(t, 7.0, 7.4))));
    R.put(this.q, 540, 300 + (1 - eo(seg(t, 7.4, 8.0))) * 40, 0.3 + 0.7 * eob(seg(t, 7.4, 8.0), 1.5), 0, eo(seg(t, 7.4, 7.7)));
    R.place(this.c, 540, lerp(124, 110, eo(seg(t, 12.4, 12.8))), eo(seg(t, 12.4, 12.8)));
  },
});
