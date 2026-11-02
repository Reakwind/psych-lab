const { seg, eo, eio, eob, lerp } = kit;
// he's still there, maybe still loud — but now she can turn back to her people and what matters to her
kit.scene('g-still', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gt') + '</svg><div class="tag gt-a">האורח עדיין שם</div><div class="tag tag-warm gt-b">לאנשים ולדברים שחשובים</div></div>'));
    this.P = R.partyRefs(kit, 'gt'); Object.assign(this, R.refs(kit, 'gt', ['a', 'b']));
  },
  render(t) {
    const P = this.P;
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(935 900)');
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    const loud = 1 + 0.4 * Math.max(0, Math.sin(Math.PI * seg(t, 0.7, 1.4))) + 0.4 * Math.max(0, Math.sin(Math.PI * seg(t, 3.4, 4.1)));
    P.g.noise.setAttribute('transform', 'translate(0 -228) scale(' + loud * (1 + 0.08 * Math.sin(t * 19)) + ') translate(0 228)');
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0); R.arms(P.r, 0, 0);
    R.walkTo(P, R.HOME, false, t); R.blink(P.r.eyes, t, 0.4);
    // the circle of attention settles on the party
    const c = eio(seg(t, 5.4, 7.2));
    P.ring.setAttribute('opacity', eo(seg(t, 5.4, 6.0))); P.ring.setAttribute('transform', 'translate(410 700) scale(' + lerp(140, 330, c) + ')');
    const glance = eio(seg(t, 0.6, 1.1)) * (1 - eio(seg(t, 4.6, 5.2)));
    P.r.head.setAttribute('transform', 'rotate(' + (-8 * glance + (t > 7 ? 4 * Math.sin(t * 2) : 0)) + ' 0 30)');
    P.r.mouth.setAttribute('d', t > 7.1 && Math.floor(t * 4) % 2 ? R.TALK : glance > 0.5 ? 'M-10 27 Q2 29 14 27' : R.SMILE);
    R.place(this.a, 900, lerp(482, 470, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 5.4, 5.9))));
    R.place(this.b, 420, lerp(84, 70, eo(seg(t, 8.9, 9.4))), eo(seg(t, 8.9, 9.4)));
  },
});
