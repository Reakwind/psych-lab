const { seg, eo, eio, eob, lerp } = kit;
// of course we want them gone: push them aside, fight them, avoid what sets them off
const V = [[4.1, 'לדחוק הצידה', 850], [5.6, 'להילחם', 540], [6.8, 'להימנע', 260]];
kit.scene('g-fight', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gf', { extra: '<g class="gf-cl">' + R.clash('gf-c') + '</g>' }) + '</svg>' +
      V.map((v, k) => '<div class="tag gf-v' + k + '">' + v[1] + '</div>').join('') + '</div>'));
    this.P = R.partyRefs(kit, 'gf'); this.cl = kit.stage.querySelector('.gf-cl'); this.v = [0, 1, 2].map((k) => kit.stage.querySelector('.gf-v' + k));
  },
  render(t) {
    const P = this.P;
    R.camAt(P, 1.25, 800, 700);
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1;
    R.partyPlace(P, R.FA, R.FB); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    // she wishes him gone: a shooing wave
    const shoo = seg(t, 1.6, 3.2) > 0 && seg(t, 1.6, 3.2) < 1 ? Math.sin(t * 9) : 0;
    // push him aside
    const push = Math.max(0, Math.sin(Math.PI * seg(t, 4.1, 5.4)));
    const rock = Math.sin(Math.PI * seg(t, 4.4, 5.4));
    // fight: the clash
    const fight = t > 5.6 && t < 6.8;
    this.cl.style.opacity = fight ? 1 : 0; this.cl.setAttribute('transform', 'translate(845 470) scale(' + (0.8 + 0.08 * Math.sin(t * 12)) + ')');
    // avoid: she backs away from everything and hunches
    const av = eio(seg(t, 6.8, 8.0));
    R.walkTo(P, lerp(R.DOOR, R.DOOR - 55, av), t > 6.8 && t < 8.0, t);
    R.arms(P.r, -20 * shoo * (1 - push) + (fight ? -40 : 0) - 70 * push + 18 * av, -40 * Math.abs(shoo) - 80 * push + (fight ? -60 : 0) - 18 * av);
    P.gg.setAttribute('transform', 'translate(' + (935 + 22 * rock + (fight ? Math.sin(t * 30) * 3 : 0)) + ' 900) rotate(' + 6 * rock + ' 0 -40)');
    R.partyLive(P, t, 1 - 0.5 * av);
    P.r.head.setAttribute('transform', 'rotate(' + lerp(-8, 10, av) + ' 0 30) translate(0 ' + 10 * av + ')');
    R.look(P.r.eyes, t, 0.4, lerp(4, 0, av), 3 * av);
    P.r.mouth.setAttribute('d', fight && Math.floor(t * 6) % 2 ? R.TALK : R.FLAT);
    V.forEach(([a, , x], k) => R.place(this.v[k], x, lerp(98, 86, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
