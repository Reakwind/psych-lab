const { seg, eo, eio, eob, lerp } = kit;
const BELL = [['קושי', 9.33, 820], ['דאגה', 9.8, 640], ['חוסר ודאות', 10.83, 440]];
kit.scene('x-human', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x3', -120) +
      '<ellipse class="x3-bg" cx="380" cy="660" rx="110" ry="130" style="fill:var(--accent);opacity:0"/><circle class="x3-hg" cx="380" cy="520" r="96" style="fill:var(--main);opacity:0"/>' +
      '<g class="x3-lp">' + R.loop('x3-loop') + '</g><g class="x3-bw">' + R.bell('x3-bl') + '</g><g class="x3-sww"><g transform="scale(2.4)">' + R.swirl('x3-sw') + '</g></g>' +
      [0, 1, 2].map((k) => '<g class="x3-b' + k + '">' + R.balloon('x3-bln' + k) + '</g>').join('') + '</svg>' +
      BELL.map((b, k) => '<div class="tag tag-warm x3-n' + k + '">' + b[0] + '</div>').join('') +
      '<div class="tag tag-cool x3-a">גם על הגוף וגם על התודעה</div><div class="tag x3-c">זה חלק מלהיות בן אדם</div><div class="tag tag-cool x3-d">ככה המערכת שלנו מגיבה</div><div class="tag tag-red x3-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x3', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'nw', 'mt-fill', 'bg', 'hg', 'lp', 'bw', 'sww', 'a', 'c', 'd', 'ml']));
    this.n = BELL.map((b, k) => kit.stage.querySelector('.x3-n' + k)); this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.x3-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // the signs settle; stress lives in the body and in the mind, each touching the other; it's human: an alarm that rings for hardship, worry, uncertainty
    const calm = eio(seg(t, 0.0, 1.0));
    this.body.setAttribute('transform', 'translate(0 ' + 8 * (1 - calm) + ') scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = 1 - calm; this.pf.style.opacity = 1 - calm; this.nw.setAttribute('opacity', 1 - calm);
    this.sww.setAttribute('transform', 'translate(380 330) scale(' + Math.max(0.001, 1 - calm) + ') rotate(' + t * 160 + ')');
    this.b.forEach((b, k) => { const a = t * 2.4 + k * 2.09; R.setG(b, 360 + Math.cos(a) * 170 * (1 + calm), 330 + Math.sin(a) * 55 - 300 * calm, 0.7, 1 - calm); });
    this.bg.style.opacity = 0.28 * eo(seg(t, 2.1, 2.6)) * (0.8 + 0.2 * Math.sin(t * 3));
    this.hg.style.opacity = 0.22 * eo(seg(t, 3.1, 3.6)) * (0.8 + 0.2 * Math.sin(t * 3 + 1.5));
    const lp = eob(seg(t, 3.5, 4.1), 1.4);
    this.lp.setAttribute('transform', 'translate(540 590) scale(' + Math.max(0.001, 0.9 * lp) + ') rotate(' + t * 40 + ')'); this.lp.style.opacity = eo(seg(t, 3.5, 3.7)) * (1 - eo(seg(t, 6.4, 6.9)));
    const ring = BELL.reduce((s, [w, a]) => s + (t > a && t < a + 0.6 ? Math.sin((t - a) * 40) * (1 - (t - a) / 0.6) : 0), 0);
    this.bw.setAttribute('transform', 'translate(920 470) scale(' + Math.max(0.001, eob(seg(t, 6.9, 7.4), 1.5)) + ') rotate(' + 14 * ring + ')'); this.bw.style.opacity = eo(seg(t, 6.9, 7.1));
    R.setMeter(this['mt-fill'], lerp(0.85, 0.5, calm) + BELL.reduce((s, [w, a]) => s + 0.07 * eob(seg(t, a, a + 0.4), 1.4), 0));
    this.head.setAttribute('transform', 'rotate(' + (t > 4.6 && t < 6.0 ? Math.sin((t - 4.6) * 6) * 4 : 0) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    BELL.forEach(([w, a, x], k) => R.place(this.n[k], x, lerp(162, 150, eo(seg(t, a, a + 0.3))), eo(seg(t, a, a + 0.3))));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.2, 2.6))), eo(seg(t, 2.2, 2.6)) * (1 - eo(seg(t, 4.4, 4.7))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 4.67, 5.0))), eo(seg(t, 4.67, 5.0)) * (1 - eo(seg(t, 6.5, 6.8))));
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 6.8, 7.2))), eo(seg(t, 6.8, 7.2)));
    R.place(this.ml, 920, 886, 1);
  },
});
