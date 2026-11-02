const { seg, eo, eio, eob, lerp } = kit;
// then a guest nobody invited: loud, unpleasant, not someone she wanted to see now
kit.scene('g-arrive', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('ga') + '</svg><div class="tag ga-a">רועש · לא נעים</div></div>'));
    this.P = R.partyRefs(kit, 'ga'); this.a = kit.stage.querySelector('.ga-a');
  },
  render(t) {
    const P = this.P;
    R.partyPlace(P, R.FA, R.FB); R.walkTo(P, R.HOME, false, t); R.arms(P.r, 0, 0); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    // the door swings open on him
    const op = eio(seg(t, 0.5, 1.2));
    P.open.setAttribute('opacity', op);
    P.gg.style.opacity = eo(seg(t, 0.9, 1.3));
    P.gg.setAttribute('transform', 'translate(915 900) scale(' + lerp(0.85, 1, eob(seg(t, 0.9, 1.5), 1.6)) + ')');
    const loud = 1 + 0.5 * Math.max(0, Math.sin(Math.PI * seg(t, 3.5, 4.3)));
    R.soften(P.g, 0, t); P.g.noise.setAttribute('transform', 'translate(0 -228) scale(' + loud * (1 + 0.08 * Math.sin(t * 19)) + ') translate(0 228)');
    R.blink(P.g.eyes, t, 1.9);
    // the party falters: everyone turns to the door
    const look = eio(seg(t, 1.2, 2.0));
    R.partyLive(P, t, 1 - 0.7 * look);
    P.a.head.setAttribute('transform', 'rotate(' + lerp(6, -10, look) + ' 0 30)'); P.b.head.setAttribute('transform', 'rotate(' + lerp(-6, -12, look) + ' 0 30)');
    P.r.head.setAttribute('transform', 'rotate(' + -10 * look + ' 0 30)');
    R.look(P.r.eyes, t, 0.4, 4 * look, 0);
    P.r.mouth.setAttribute('d', t > 6.6 ? R.FLAT : t > 1.4 ? 'M-10 27 Q2 29 14 27' : R.SMILE);
    R.place(this.a, 915, lerp(482, 470, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
  },
});
