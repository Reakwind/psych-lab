const { seg, eo, eio, eob, lerp } = kit;
// acceptance: give the guest a little room, and the meeting with him softens
kit.scene('g-room', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gr') + '</svg><div class="tag tag-warm gr-a">קבלה</div><div class="tag tag-cool gr-b">לתת לו קצת מקום</div></div>'));
    this.P = R.partyRefs(kit, 'gr'); Object.assign(this, R.refs(kit, 'gr', ['a', 'b']));
  },
  render(t) {
    const P = this.P;
    const out = eio(seg(t, 0, 1.6));
    R.camAt(P, lerp(1.25, 1, out), 800, 700);
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1;
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, eio(seg(t, 4.5, 6.5))); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    // she drops her guard and sets a small stool by the door
    const calm = eio(seg(t, 0.4, 1.6));
    R.walkTo(P, R.DOOR, false, t); R.arms(P.r, 50 * (1 - calm), -50 * (1 - calm));
    const st = eob(seg(t, 3.8, 4.4), 1.5);
    P.st.setAttribute('opacity', eo(seg(t, 3.8, 4.1))); P.st.setAttribute('transform', 'translate(940 900) scale(' + st + ')');
    // he sits; he softens
    const sit = eio(seg(t, 4.5, 5.3));
    P.gg.setAttribute('transform', 'translate(940 ' + lerp(900, 852, sit) + ') translate(0 ' + (-40 * Math.sin(Math.PI * sit)) + ')');
    R.soften(P.g, eio(seg(t, 4.8, 6.6)), t); R.blink(P.g.eyes, t, 1.9);
    P.r.head.setAttribute('transform', 'rotate(' + lerp(-8, -4, calm) + ' 0 30)'); R.look(P.r.eyes, t, 0.4, 4, 0);
    P.r.mouth.setAttribute('d', t > 5.4 ? 'M-10 26 Q2 31 14 26' : R.FLAT);
    P.ring.setAttribute('opacity', 1 - eo(seg(t, 0.4, 1.4))); P.ring.setAttribute('transform', 'translate(840 690) scale(250)');
    R.place(this.a, 680, lerp(84, 70, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    R.place(this.b, 380, lerp(84, 70, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
  },
});
