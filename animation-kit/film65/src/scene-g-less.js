const { seg, eo, eio, eob, lerp } = kit;
// it doesn't mean giving up; it means seeing he's already here, and struggling with him a little less
const NO = [[1.2, 'ויתרנו', 820], [2.3, 'אין מה לעשות', 520]];
kit.scene('g-less', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('ge') + '</svg>' +
      NO.map((n, k) => '<div class="tag struck ge-n' + k + '">' + n[1] + '</div>').join('') + '<div class="tag ge-a">הוא כבר כאן</div><div class="tag tag-warm ge-b">להיאבק בו קצת פחות</div></div>'));
    this.P = R.partyRefs(kit, 'ge'); this.n = NO.map((_, k) => kit.stage.querySelector('.ge-n' + k)); Object.assign(this, R.refs(kit, 'ge', ['a', 'b']));
  },
  render(t) {
    const P = this.P;
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(940 852)');
    P.st.setAttribute('opacity', 1); P.st.setAttribute('transform', 'translate(940 900)');
    R.soften(P.g, 1, t); R.blink(P.g.eyes, t, 1.9);
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0); R.arms(P.r, 0, 0);
    NO.forEach(([a, , x], k) => { const el = this.n[k]; R.place(el, x, lerp(98, 86, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, 4.6, 5.1)))); el.style.setProperty('--s', eo(seg(t, a + 0.5, a + 0.9))); });
    // a nod to him: you're here
    const nod = Math.sin(Math.PI * seg(t, 5.7, 6.5));
    P.r.head.setAttribute('transform', 'rotate(-6 0 30) translate(0 ' + 10 * nod + ')'); P.g.eyes.setAttribute('transform', 'translate(-6 0)');
    R.place(this.a, 900, lerp(452, 440, eo(seg(t, 5.8, 6.3))), eo(seg(t, 5.8, 6.3)) * (1 - eo(seg(t, 9.6, 10.1))));
    // her shoulders drop, and she heads back to her friends
    const back = eio(seg(t, 8.4, 10.2));
    R.walkTo(P, lerp(R.DOOR, R.HOME, back), t > 8.4 && t < 10.2, t);
    R.blink(P.r.eyes, t, 0.4); R.look(P.r.eyes, t, 0.4, lerp(4, -2, back), 0);
    P.r.mouth.setAttribute('d', 'M-10 26 Q2 31 14 26');
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 8.0, 8.5))), eo(seg(t, 8.0, 8.5)));
  },
});
