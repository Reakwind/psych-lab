const { seg, eo, eio, eob, lerp } = kit;
// instead of making him leave, she lets him be there — and goes back
kit.scene('g-allow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gl') + '</svg><div class="tag tag-warm gl-a">לתת לו להיות שם</div></div>'));
    this.P = R.partyRefs(kit, 'gl'); this.a = kit.stage.querySelector('.gl-a');
  },
  render(t) {
    const P = this.P;
    const out = eio(seg(t, 4.2, 6.2));
    R.camAt(P, lerp(1.25, 1, out), 800, 700);
    P.open.setAttribute('opacity', 1); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(915 900)');
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    // she lowers her hands
    const low = eio(seg(t, 1.2, 2.2));
    R.arms(P.r, 20 * (1 - low), -20 * (1 - low));
    const g = eio(seg(t, 4.3, 6.0));
    P.g.armL.setAttribute('transform', 'rotate(' + 50 * (1 - low) + ' -113 -190)'); P.g.armR.setAttribute('transform', 'rotate(' + -50 * (1 - low) + ' 113 -190)');
    R.walkTo(P, lerp(R.DOOR, R.HOME, g), t > 4.3 && t < 6.0, t);
    R.blink(P.r.eyes, t, 0.4);
    P.r.head.setAttribute('transform', 'rotate(' + lerp(-8, 6, eio(seg(t, 3.9, 4.5))) + ' 0 30)');
    P.r.mouth.setAttribute('d', t > 5.4 ? R.SMILE : 'M-10 27 Q2 29 14 27');
    P.ring.setAttribute('opacity', 0);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)));
  },
});
