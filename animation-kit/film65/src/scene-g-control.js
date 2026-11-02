const { seg, eo, eio, eob, lerp } = kit;
// and if something in our control can help, we do it: her pill, on time
kit.scene('g-control', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gc', { extra:
      '<g class="gc-pill"><rect x="-30" y="-14" width="60" height="28" rx="14" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/><path d="M-30 0 a14 14 0 0 1 14 -14 h14 v28 h-14 a14 14 0 0 1 -14 -14Z" style="fill:#D96C6C"/></g>' +
      '<g class="gc-tick"><circle r="38" style="fill:#6FAE7A"/><path class="ink" style="stroke:white;stroke-width:9" d="M-16 2 l10 12 l22 -24"/></g>' }) + '</svg><div class="tag tag-cool gc-a">מה שבשליטה שלנו – עושים</div></div>'));
    this.P = R.partyRefs(kit, 'gc'); Object.assign(this, R.refs(kit, 'gc', ['pill', 'tick', 'a']));
  },
  render(t) {
    const P = this.P;
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(935 900)');
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    R.walkTo(P, R.HOME, false, t); R.blink(P.r.eyes, t, 0.4);
    // she takes her pill with a glass of water
    // a glass of water in her hand, her pill above it; she takes it
    const hold = eio(seg(t, 0.9, 1.6)) * (1 - eio(seg(t, 4.6, 5.4)));
    R.arms(P.r, 0, 0);
    P.r.glass.setAttribute('opacity', eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 4.6, 5.0))));
    const pill = eob(seg(t, 1.4, 1.9), 1.6) * (1 - eo(seg(t, 3.2, 3.6)));
    const go = eio(seg(t, 2.8, 3.5));
    this.pill.setAttribute('transform', 'translate(' + lerp(R.HOME + 95, R.HOME + 10, go) + ' ' + lerp(470, 570, go) + ') scale(' + 1.2 * pill * lerp(1, 0.5, go) + ')');
    P.r.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.2, 1.8)) * (1 - go) + 4 * Math.sin(Math.PI * seg(t, 3.6, 4.6))) + ' 0 30)');
    P.r.mouth.setAttribute('d', t > 2.9 && t < 3.6 ? 'M-6 26 Q2 30 10 26' : R.SMILE);
    this.tick.setAttribute('transform', 'translate(' + (R.HOME + 10) + ' 300) scale(' + eob(seg(t, 3.8, 4.3), 1.8) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.7, 2.2))), eo(seg(t, 1.7, 2.2)));
  },
});
