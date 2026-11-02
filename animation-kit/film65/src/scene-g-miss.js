const { seg, eo, eio, eob, lerp } = kit;
// when most of her attention and energy go to controlling what she can't, she misses the party
kit.scene('g-miss', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gm') + '<g class="gm-bat">' + R.battery('gm') + '</g></svg>' +
      '<div class="tag gm-a">הקשב והאנרגיה</div><div class="tag tag-warm gm-b">נפספס את המסיבה</div></div>'));
    this.P = R.partyRefs(kit, 'gm'); Object.assign(this, R.refs(kit, 'gm', ['bat', 'fill', 'a', 'b']));
  },
  render(t) {
    const P = this.P;
    R.camAt(P, 1.25, 800, 700);
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(935 900)');
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    R.partyPlace(P, R.FA, R.FB);
    // she guards the door, arms out
    R.walkTo(P, R.DOOR, false, t); R.arms(P.r, 50, -50);
    P.r.head.setAttribute('transform', 'rotate(-8 0 30)'); R.look(P.r.eyes, t, 0.4, 4, 0); P.r.mouth.setAttribute('d', R.FLAT);
    // attention on him, and her battery drains
    P.ring.setAttribute('opacity', 1); P.ring.setAttribute('transform', 'translate(840 690) scale(250)');
    this.bat.setAttribute('transform', 'translate(560 170) scale(' + 0.7 * eob(seg(t, 1.5, 2.0), 1.6) + ')');
    R.setBattery(this.fill, lerp(0.8, 0.12, eio(seg(t, 2.0, 8.0))));
    // behind her the party winds down; the friends wave goodbye
    const live = 1 - eio(seg(t, 5.0, 8.0));
    R.partyLive(P, t, live);
    const wave = eo(seg(t, 7.4, 8.0)) * (1 - eo(seg(t, 9.6, 10.2)));
    R.arms(P.a, 0, -150 * wave + 20 * Math.sin(t * 8) * wave); R.arms(P.b, 150 * wave + 20 * Math.sin(t * 8) * wave, 0);
    R.place(this.a, 560, lerp(262, 250, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    R.place(this.b, 300, lerp(84, 70, eo(seg(t, 8.1, 8.6))), eo(seg(t, 8.1, 8.6)));
  },
});
