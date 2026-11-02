const { seg, eo, eio, eob, lerp } = kit;
// notice the embarrassment and tell yourself: I can feel a little embarrassed and still take part
kit.scene('g-part', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gq') + '</svg><div class="tag gq-a">מבוכה</div>' +
      '<div class="say gq-say">"אני יכולה להרגיש קצת מבוכה ועדיין לקחת חלק."</div></div>'));
    this.P = R.partyRefs(kit, 'gq'); Object.assign(this, R.refs(kit, 'gq', ['a', 'say']));
  },
  render(t) {
    const P = this.P;
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(940 852)');
    P.st.setAttribute('opacity', 1); P.st.setAttribute('transform', 'translate(940 900)');
    R.soften(P.g, 1, t); R.blink(P.g.eyes, t, 1.9);
    R.partyPlace(P, R.FA, R.FB); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0); R.arms(P.r, 0, 0);
    R.walkTo(P, R.HOME, false, t); R.blink(P.r.eyes, t, 0.4);
    // the guest shows as embarrassment; a small blush on Ruth too
    const em = eo(seg(t, 1.9, 2.5));
    P.g.blush.setAttribute('opacity', em); P.r.blush.setAttribute('opacity', 0.8 * em * (1 - 0.5 * eo(seg(t, 7.0, 8.0))));
    R.place(this.a, 940, lerp(482, 470, em), em);
    // her sentence; the friends turn to her as she joins in
    const s = eo(seg(t, 4.6, 5.1));
    R.put(this.say, R.HOME + 40, 250, lerp(0.9, 1, s), 0, s);
    R.partyLive(P, t, 1 - s); P.ba.style.opacity = 0.5 * (1 - s); P.bb.style.opacity = 0.5 * (1 - s);
    const join = eio(seg(t, 6.7, 7.4));
    P.a.head.setAttribute('transform', 'rotate(' + lerp(6, 10, join) + ' 0 30)'); P.b.head.setAttribute('transform', 'rotate(' + lerp(-6, -10, join) + ' 0 30)');
    P.r.head.setAttribute('transform', 'rotate(' + (t < 2.6 ? -6 * em : -6 + 6 * eio(seg(t, 3.0, 3.6))) + ' 0 30)');
    P.r.mouth.setAttribute('d', join > 0.5 && Math.floor(t * 4) % 2 ? R.TALK : join > 0.5 ? R.SMILE : 'M-10 26 Q2 31 14 26');
  },
});
