const { seg, eo, eio, eob, lerp } = kit;
// slowly all her attention goes to him; the party carries on, and she stays at the door
kit.scene('g-stuck', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gs') + '</svg><div class="tag gs-a">כל תשומת הלב אליו</div><div class="tag tag-cool gs-b">המפגש ממשיך</div></div>'));
    this.P = R.partyRefs(kit, 'gs'); this.a = kit.stage.querySelector('.gs-a'); this.b = kit.stage.querySelector('.gs-b');
  },
  render(t) {
    const P = this.P;
    R.camAt(P, 1.25, 800, 700);
    P.open.setAttribute('opacity', 1); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(915 900)');
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.walkTo(P, R.DOOR, false, t);
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    R.arms(P.r, 20, -20); P.g.armL.setAttribute('transform', 'rotate(50 -113 -190)'); P.g.armR.setAttribute('transform', 'rotate(-50 113 -190)');
    // the circle of attention closes in on her and the guest
    const c = eio(seg(t, 1.4, 3.4));
    P.ring.setAttribute('opacity', eo(seg(t, 1.4, 2.0))); P.ring.setAttribute('transform', 'translate(830 690) scale(' + lerp(520, 250, c) + ')');
    // behind her, the friends laugh and cheer
    const cheer = Math.max(0, Math.sin(Math.PI * seg(t, 5.0, 6.4)));
    R.arms(P.a, 40 * cheer, -110 * cheer); R.arms(P.b, 110 * cheer, -40 * cheer);
    const glance = eio(seg(t, 6.6, 7.1)) * (1 - eio(seg(t, 7.6, 8.1)));
    P.r.head.setAttribute('transform', 'rotate(' + (-8 + 16 * glance) + ' 0 30)');
    R.look(P.r.eyes, t, 0.4, 4 - 8 * glance, 0);
    P.r.mouth.setAttribute('d', R.FLAT);
    R.place(this.a, 600, lerp(84, 70, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)));
    R.place(this.b, 230, lerp(184, 172, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)));
  },
});
