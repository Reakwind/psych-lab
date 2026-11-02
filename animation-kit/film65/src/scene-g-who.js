const { seg, eo, eio, eob, lerp } = kit;
// the guest is a metaphor from ACT: thoughts, feelings and body sensations that are hard for us.
// With Parkinson's: embarrassment at a gathering, worry about how we'll manage, a tremor or unwanted symptom.
const BADGE = [[8.5, 780, 215, 'מחשבות'], [9.15, 540, 215, 'רגשות'], [9.7, 300, 215, 'תחושות בגוף']];
const EX = [[3.9, 'מבוכה במפגש חברתי'], [5.6, 'דאגה לגבי איך נסתדר'], [7.45, 'רעד או סימפטום לא רצוי']];
const P2 = 12.4;
kit.scene('g-who', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.partyShot('gw') + '<g class="gw-links">' +
      BADGE.map((b, k) => '<path class="gw-l' + k + '" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:.03 .03;opacity:0" d="M' + b[1] + ' ' + b[2] + ' Q' + ((b[1] + 880) / 2) + ' ' + (b[2] + 300) + ' 880 640"/>').join('') + '</g>' +
      '<g class="gw-b0">' + R.tool('gw-t0', 0, 66) + '</g><g class="gw-b1">' + R.tool('gw-t1', 3, 66) + '</g><g class="gw-b2">' + R.bodyBadge('gw-t2', 66) + '</g></svg>' +
      BADGE.map((b, k) => '<div class="tag gw-bl' + k + '">' + b[3] + '</div>').join('') + EX.map((e, k) => '<div class="tag gw-e' + k + '">' + e[1] + '</div>').join('') +
      '<div class="tag tag-cool gw-act">מטאפורה משיטת טיפול: ACT</div><div class="tag tag-cool gw-pd">כשחיים עם פרקינסון</div></div>'));
    this.P = R.partyRefs(kit, 'gw');
    this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.gw-b' + k)); this.bl = [0, 1, 2].map((k) => kit.stage.querySelector('.gw-bl' + k));
    this.l = [0, 1, 2].map((k) => kit.stage.querySelector('.gw-l' + k)); this.e = [0, 1, 2].map((k) => kit.stage.querySelector('.gw-e' + k));
    Object.assign(this, R.refs(kit, 'gw', ['act', 'pd']));
  },
  render(t) {
    const P = this.P;
    // push in on the guest by the door
    R.camAt(P, lerp(1, 1.3, eio(seg(t, 0, 1.8))), 1080, 500);
    P.open.setAttribute('opacity', 0); P.gg.style.opacity = 1;
    R.partyPlace(P, R.FA, R.FB); R.partyLive(P, t, 1); P.ba.style.opacity = P.bb.style.opacity = 1 - eo(seg(t, 1.0, 1.8)); R.walkTo(P, R.HOME, false, t); R.arms(P.r, 0, 0); R.arms(P.a, 0, 0); R.arms(P.b, 0, 0);
    R.soften(P.g, 0, t); R.blink(P.g.eyes, t, 1.9);
    R.place(this.act, 540, lerp(84, 70, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)) * (1 - eo(seg(t, P2 + 0.6, P2 + 1.1))));
    // he stands for thoughts, feelings and sensations in the body
    const off = eo(seg(t, P2 + 0.6, P2 + 1.2));
    BADGE.forEach(([a, x, y], k) => {
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + eob(seg(t, a, a + 0.5), 1.8) * (1 - off) + ')');
      R.place(this.bl[k], x, y + 84, eo(seg(t, a + 0.2, a + 0.6)) * (1 - off));
      const l = eo(seg(t, a + 0.1, a + 0.8)); this.l[k].style.opacity = l > 0 ? 0.6 * (1 - off) : 0; this.l[k].style.strokeDashoffset = (-t * 0.05).toFixed(3);
    });
    // with Parkinson's he takes different shapes: embarrassment, worry, a tremor
    R.place(this.pd, 540, lerp(84, 70, eo(seg(t, P2 + 1.0, P2 + 1.5))), eo(seg(t, P2 + 1.0, P2 + 1.5)));
    const ex = EX.map(([a]) => eo(seg(t, P2 + a, P2 + a + 0.5)));
    EX.forEach((_, k) => R.place(this.e[k], 460, lerp(162 + k * 80, 150 + k * 80, ex[k]), ex[k] * (k < 2 && ex[k + 1] > 0 ? 0.55 : 1)));
    const ph = (k) => ex[k] * (EX[k + 1] ? 1 - ex[k + 1] : 1);
    P.g.blush.setAttribute('opacity', ph(0));
    P.g.sweat.setAttribute('opacity', ph(1)); P.g.sweat.setAttribute('transform', 'translate(0 ' + 10 * ((t * 0.8) % 1) + ')');
    P.g.trem.setAttribute('opacity', ph(2));
    const wob = ph(1) * Math.sin(t * 3) * 4, shake = ph(2) * Math.sin(t * 40) * 3;
    P.gg.setAttribute('transform', 'translate(' + (935 + shake) + ' 900) rotate(' + wob + ' 0 -40)');
    if (ph(0) > 0.5) P.g.brow.setAttribute('d', 'M-52 -236 L-16 -232 M52 -236 L16 -232');
  },
});
