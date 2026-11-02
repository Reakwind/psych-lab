const { seg, eo, eio, eob, lerp } = kit;
// a party at Ruth's: people she loves, food, music, and she wants to be part of it
kit.scene('g-party', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gp') + '</svg><div class="tag tag-cool gp-title">מפגש 65 · מטאפורת האורח הלא מוזמן</div></div>'));
    this.P = R.partyRefs(kit, 'gp'); this.title = kit.stage.querySelector('.gp-title'); this.sn = kit.stage.querySelector('.gp-sn');
  },
  render(t) {
    const P = this.P;
    P.gg.style.opacity = 0;
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.walkTo(P, R.HOME, false, t);
    P.notes.forEach((n) => { n.style.opacity = n.style.opacity * eo(seg(t, 5.3, 6.0)); });
    R.blink(P.r.eyes, t, 0.4);
    // she opens her arms to her guests
    const w = Math.sin(Math.PI * seg(t, 0.8, 2.4));
    R.arms(P.r, 60 * w, -60 * w); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    this.sn.setAttribute('transform', 'scale(' + (1 + 0.06 * Math.sin(Math.PI * seg(t, 4.9, 5.6))) + ')');
    P.r.head.setAttribute('transform', 'rotate(' + (t > 7.6 ? -6 + 3 * Math.sin(t * 2) : 4 * Math.sin(t * 0.8)) + ' 0 30)');
    P.r.mouth.setAttribute('d', t > 7.8 && Math.floor(t * 4) % 2 ? R.TALK : R.SMILE);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 3.4, 3.9))));
  },
});
