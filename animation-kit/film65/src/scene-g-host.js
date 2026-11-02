const { seg, eo, eio, eob, lerp } = kit;
// the guest is in the house, but he doesn't have to become the master of the house
kit.scene('g-host', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gh', { seated: true }) + '</svg><div class="tag tag-warm gh-a">הוא לא חייב להפוך לבעל הבית</div></div>'));
    this.P = R.partyRefs(kit, 'gh'); this.a = kit.stage.querySelector('.gh-a');
  },
  render(t) {
    const P = this.P;
    R.camAt(P, lerp(1.08, 1, eio(seg(t, 0, 4))), 540, 640);
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(950 870) scale(.82)');
    P.st.setAttribute('opacity', 1); P.st.setAttribute('transform', 'translate(950 900) scale(.82)');
    R.soften(P.g, 1, t); R.blink(P.g.eyes, t, 1.9);
    // Ruth in her own armchair, her friends around her, the music on
    R.partyPlace(P, 210, 790); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    P.ba.setAttribute('transform', 'translate(250 330) scale(.75)'); P.bb.setAttribute('transform', 'translate(750 330) scale(-.75 .75)');
    R.blink(P.r.eyes, t, 0.4);
    P.r.head.setAttribute('transform', 'rotate(' + 4 * Math.sin(t * 1.4) + ' 0 30)');
    P.r.mouth.setAttribute('d', Math.floor(t * 3) % 3 === 0 ? R.TALK : R.SMILE);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)));
  },
});
