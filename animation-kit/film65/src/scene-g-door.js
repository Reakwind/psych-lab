const { seg, eo, eio, eob, lerp } = kit;
// she stands at the door and tries to make him leave: argues, pushes, checks again and again. He won't go.
kit.scene('g-door', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gd', { extra: '<g class="gd-cl">' + R.clash('gd-c') + '</g>' }) + '</svg><div class="tag tag-warm gd-no">האורח מסרב ללכת</div></div>'));
    this.P = R.partyRefs(kit, 'gd'); this.cl = kit.stage.querySelector('.gd-cl'); this.no = kit.stage.querySelector('.gd-no');
  },
  render(t) {
    const P = this.P;
    R.camAt(P, lerp(1, 1.25, eio(seg(t, 0.2, 1.8))), 800, 700);
    P.open.setAttribute('opacity', 1); P.gg.style.opacity = 1;
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    // she hurries over, then checks back over her shoulder again and again
    const go = eio(seg(t, 0.3, 1.7)), peek1 = eio(seg(t, 7.8, 8.4)) * (1 - eio(seg(t, 8.6, 9.1))), peek2 = eio(seg(t, 9.3, 9.8)) * (1 - eio(seg(t, 10.0, 10.5)));
    const x = lerp(R.HOME, R.DOOR, go) - 90 * (peek1 + peek2);
    R.walkTo(P, x, (t > 0.3 && t < 1.7) || (t > 7.8 && t < 10.5 && (peek1 + peek2) > 0.05 && (peek1 + peek2) < 0.95), t);
    // arguing
    const arg = t > 4.5 && t < 6.1;
    this.cl.style.opacity = arg ? 1 : 0; this.cl.setAttribute('transform', 'translate(838 470) scale(' + (0.8 + 0.08 * Math.sin(t * 12)) + ')');
    P.r.mouth.setAttribute('d', arg && Math.floor(t * 6) % 2 ? R.TALK : R.FLAT);
    // pushing: both hands out; he rocks back and comes straight back
    const push = Math.max(0, Math.sin(Math.PI * seg(t, 6.1, 7.5)));
    R.arms(P.r, -70 * push, -80 * push);
    const rock = Math.sin(Math.PI * seg(t, 6.4, 7.5));
    P.gg.setAttribute('transform', 'translate(' + (915 + 18 * rock) + ' 900) rotate(' + 6 * rock + ' 0 -40)');
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    P.g.mouth.setAttribute('d', arg && Math.floor(t * 6 + 1) % 2 ? 'M-30 -150 Q0 -130 30 -150' : 'M-30 -148 Q0 -170 30 -148');
    // he refuses: plants his feet, shakes his head
    const ref = seg(t, 11.6, 12.9);
    if (ref > 0 && ref < 1) P.gg.setAttribute('transform', 'translate(915 900) rotate(' + 5 * Math.sin(ref * Math.PI * 4) + ' 0 -40)');
    P.g.armL.setAttribute('transform', 'rotate(' + 50 * eio(seg(t, 11.6, 12.2)) + ' -113 -190)'); P.g.armR.setAttribute('transform', 'rotate(' + -50 * eio(seg(t, 11.6, 12.2)) + ' 113 -190)');
    const back = peek1 + peek2;
    P.r.head.setAttribute('transform', 'rotate(' + (go > 0.9 ? -8 * (1 - back) + 10 * back : -6) + ' 0 30)');
    R.look(P.r.eyes, t, 0.4, 4 - 8 * back, 0);
    R.place(this.no, 540, lerp(84, 70, eo(seg(t, 11.6, 12.1))), eo(seg(t, 11.6, 12.1)));
  },
});
