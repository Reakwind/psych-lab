const { seg, eo, eio, eob, lerp } = kit;
// stop and ask: what matters to me? what could make me feel more like me? — not a whole plan, not doing more: first, remember what matters
const P5 = 9.32, SX = [946, 804, 662, 520, 378, 236, 94];
const SPOT = [[880, 250], [720, 105], [360, 105], [200, 250]];   // people, hobby, taking part, the spark
kit.scene('y-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ya', 0) +
      SX.map((x, k) => '<g class="ya-k' + k + '">' + R.task('ya-tk' + k, 128, 70, k === 2 || k === 4) + '</g>').join('') +
      '<g class="ya-cg">' + R.compass('ya-c', 95) + '</g>' +
      '<g class="ya-plan"><rect class="shade" x="-92" y="-150" width="190" height="310" rx="18"/><rect x="-100" y="-160" width="190" height="310" rx="18" style="fill:color-mix(in srgb, var(--ground) 35%, white);stroke:var(--second);stroke-width:6"/>' +
      [0, 1, 2, 3, 4, 5].map((k) => '<rect x="-70" y="' + (-128 + k * 46) + '" width="26" height="26" rx="6" style="fill:white;stroke:var(--second);stroke-width:4"/><path class="ink" style="stroke-width:7;opacity:.45" d="M-30 ' + (-115 + k * 46) + ' H60"/>').join('') + '</g>' +
      '<g class="ya-more">' + [0, 1, 2].map((k) => '<g transform="translate(0 ' + (-k * 74) + ')">' + R.task('ya-mo' + k, 150, 70) + '</g>').join('') + '</g>' +
      [0, 1, 2, 3].map((k) => '<g class="ya-b' + k + '">' + R.matter('ya-m' + k, k < 3 ? R.WANT[k] : 4, 60) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm ya-q1">מה חשוב לי?</div><div class="tag tag-warm ya-q2">מה יכול לגרום לי להרגיש יותר אני?</div>' +
      '<div class="tag struck ya-s1">תוכנית שלמה</div><div class="tag struck ya-s2">לעשות יותר</div><div class="tag tag-cool ya-r">קודם כול, להיזכר במה שחשוב לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'ya', ['body', 'head', 'eyes', 'mouth', 'cg', 'c-needle', 'c-glow', 'plan', 'more', 'q1', 'q2', 's1', 's2', 'r']));
    this.k = SX.map((x, k) => kit.stage.querySelector('.ya-k' + k)); this.b = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.ya-b' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.2) + ')');
    // she stops: the jostling blocks go still and drift up out of the frame; she closes her eyes
    const stop = eo(seg(t, 2.3, 2.9)), away = eio(seg(t, 2.9, 4.0));
    this.k.forEach((el, k) => el.setAttribute('transform', 'translate(' + SX[k] + ' ' + (330 + Math.sin(t * 7 + k) * 2 * (1 - stop) - 480 * away) + ') scale(1 1.25)'));
    if (t > 2.5 && t < P5 + 0.5) R.shut(this.eyes); else R.blink(this.eyes, t, 0.3);
    // the inner compass rises above her; its needle swings, then settles
    const c = eob(seg(t, 3.3, 4.1), 1.4);
    this.cg.setAttribute('transform', 'translate(540 250) scale(' + Math.max(0.001, c) + ')'); this.cg.style.opacity = eo(seg(t, 3.3, 3.5));
    const sw = seg(t, 3.5, 7.0);
    this['c-needle'].setAttribute('transform', 'rotate(' + (sw < 1 ? 540 * eio(sw) + 40 * Math.sin(sw * 12) * (1 - sw) : 0) + ')');
    this['c-glow'].setAttribute('opacity', 0.18 * eo(seg(t, P5 + 5.0, P5 + 6.0)) + 0.1 * eo(seg(t, 7.6, 8.4)));
    // the badges: grey at the edge, then back around the compass, warm again; the spark joins for "more me"
    const back = eio(seg(t, P5 + 5.2, P5 + 6.6));
    [0, 1, 2].forEach((k) => {
      const x = lerp(70, SPOT[k][0], back), y = lerp(520 + k * 120, SPOT[k][1], back) + Math.sin(t * 1.4 + k) * 5;
      this.b[k].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + lerp(0.64, 1, back) + ')');
      this.b[k].style.filter = 'grayscale(' + (1 - back) + ')'; this.b[k].style.opacity = lerp(0.55, 1, back) * (1 - 0.4 * eo(seg(t, P5 + 1.6, P5 + 2.0)) * (1 - back));
    });
    const sp = eob(seg(t, 7.7, 8.3), 1.6);
    this.b[3].setAttribute('transform', 'translate(' + SPOT[3][0] + ' ' + (SPOT[3][1] + Math.sin(t * 1.4 + 3) * 5) + ') scale(' + Math.max(0.001, sp) + ')');
    // not a whole plan, not doing more
    const pl = eob(seg(t, P5 + 1.9, P5 + 2.4), 1.4) * (1 - eo(seg(t, P5 + 4.8, P5 + 5.3)));
    this.plan.setAttribute('transform', 'translate(860 560) rotate(4) scale(' + Math.max(0.001, pl) + ')'); this.plan.style.opacity = pl > 0.01 ? 1 : 0;
    const mo = eob(seg(t, P5 + 3.6, P5 + 4.1), 1.4) * (1 - eo(seg(t, P5 + 4.8, P5 + 5.3)));
    this.more.setAttribute('transform', 'translate(200 800) scale(' + Math.max(0.001, mo) + ')'); this.more.style.opacity = mo > 0.01 ? 1 : 0;
    this.head.setAttribute('transform', 'rotate(' + 2 * Math.sin(t * 0.8) + ' 0 30) translate(0 -2)');
    this.mouth.setAttribute('d', t > P5 + 5.6 ? R.BIG : t > 7.7 ? R.SMILE : R.FLAT);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.q1, 540, lerp(992, 980, eo(seg(t, 3.55, 4.0))), o(3.55, 7.5));
    R.place(this.q2, 540, lerp(992, 980, eo(seg(t, 7.73, 8.2))), o(7.73, P5 + 1.4));
    R.place(this.s1, 860, lerp(352, 340, eo(seg(t, P5 + 1.94, P5 + 2.4))), o(P5 + 1.94, P5 + 4.8)); this.s1.style.setProperty('--s', eo(seg(t, P5 + 2.6, P5 + 3.1)));
    R.place(this.s2, 200, lerp(522, 510, eo(seg(t, P5 + 3.62, P5 + 4.0))), o(P5 + 3.62, P5 + 4.8)); this.s2.style.setProperty('--s', eo(seg(t, P5 + 4.1, P5 + 4.5)));
    R.place(this.r, 540, lerp(992, 980, eo(seg(t, P5 + 5.19, P5 + 5.6))), o(P5 + 5.19, 99));
  },
});
