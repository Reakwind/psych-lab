const { seg, eo, eio, eob, lerp } = kit;
// she doesn't have to like him, agree with him, or give him the comfiest seat — she just goes back to the party
const NO = [[2.0, 'לאהוב אותו', 850], [2.9, 'להסכים איתו', 545], [4.7, 'הספה הכי נוחה', 235]];
kit.scene('g-back', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gb', { extra: '<ellipse class="gb-glow" cx="520" cy="690" rx="230" ry="170" style="fill:var(--accent)" opacity="0"/>' }) + '</svg>' +
      NO.map((n, k) => '<div class="tag struck gb-n' + k + '">' + n[1] + '</div>').join('') + '<div class="tag tag-warm gb-yes">פשוט חוזרים למפגש</div></div>'));
    this.P = R.partyRefs(kit, 'gb'); this.n = NO.map((_, k) => kit.stage.querySelector('.gb-n' + k));
    Object.assign(this, R.refs(kit, 'gb', ['glow', 'yes']));
  },
  render(t) {
    const P = this.P;
    // he steps inside and the door shuts behind him
    const inn = eio(seg(t, 0.2, 1.4));
    P.open.setAttribute('opacity', 1 - eio(seg(t, 1.0, 1.8)));
    P.gg.style.opacity = 1; P.gg.setAttribute('transform', 'translate(' + lerp(915, 935, inn) + ' 900)');
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9); P.g.armL.removeAttribute('transform'); P.g.armR.removeAttribute('transform');
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0); R.arms(P.r, 0, 0);
    R.walkTo(P, R.HOME, false, t); R.blink(P.r.eyes, t, 0.4);
    NO.forEach(([a, , x], k) => { const el = this.n[k]; R.place(el, x, lerp(98, 86, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, 6.6, 7.1)))); el.style.setProperty('--s', eo(seg(t, a + 0.5, a + 0.9))); });
    // he eyes the armchair; no
    const eye = eio(seg(t, 4.4, 5.0)) * (1 - eio(seg(t, 6.0, 6.5)));
    P.g.eyes.setAttribute('transform', 'translate(' + -8 * eye + ' 0)');
    this.glow.setAttribute('opacity', 0.22 * eye);
    P.r.head.setAttribute('transform', 'rotate(' + (t > 7.2 ? -6 + 3 * Math.sin(t * 2) : 4 * Math.sin(t * 0.8)) + ' 0 30)');
    P.r.mouth.setAttribute('d', t > 7.4 && Math.floor(t * 4) % 2 ? R.TALK : R.SMILE);
    R.place(this.yes, 540, lerp(84, 70, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
