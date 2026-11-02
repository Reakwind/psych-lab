const { seg, eo, eio, eob, lerp } = kit;
// parts 17–19 in the meadow: every return of attention, every pause before reacting, every bit of patience is one more walk along the trail;
// not in one day — the sun sets with the trail half worn; days pass, and the trail becomes Ruth's path of stones
const P18 = 18.43, P19 = 25.71;
const BEAT = [4.0, 10.29, 16.62];
const TOP = [[0.4, 'תשומת הלב נודדת ואתם מחזירים אותה'], [5.66, 'שמים לב למה שקורה בתוככם לפני שמגיבים'], [11.96, 'פוגשים את עצמכם בקצת יותר סבלנות']];
kit.scene('w-steps', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.meadow('wa') + '<rect class="wa-dusk" width="1080" height="1080" style="fill:#2A3350;opacity:0"/>' +
      '<g class="wa-fp">' + BEAT.map((_, k) => '<circle class="wa-f' + k + '" r="40" style="fill:none;stroke:var(--accent);stroke-width:8;opacity:0"/>').join('') + '</g>' + R.wader('war') + '</svg>' +
      TOP.map((m, k) => '<div class="tag tag-cool wa-q' + k + '">' + m[1] + '</div>').join('') + '<div class="tag tag-warm wa-pr">אתם מתרגלים</div>' +
      '<div class="tag tag-cool wa-day">לא צריך ליצור את כל השביל ביום אחד</div><div class="tag tag-warm wa-cant">יותר מזה, אי אפשר ליצור אותו ביום אחד</div>' +
      '<div class="tag tag-cool wa-ret">כל פעם שחוזרים אליו, עוברים בו שוב</div><div class="tag wa-grad">ובהדרגה, הדרך יכולה להפוך</div>' +
      '<div class="tag tag-warm wa-a0">למוכרת</div><div class="tag tag-warm wa-a1">ברורה</div><div class="tag tag-warm wa-a2">ונגישה יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'wa', ['sun', 'dusk', 'f0', 'f1', 'f2', 'q0', 'q1', 'q2', 'pr', 'day', 'cant', 'ret', 'grad', 'a0', 'a1', 'a2']));
    this.m = R.meadowStyle(kit, 'wa'); this.r = R.waderRefs(kit, 'war');
    this.st = R.PATH.map((_, k) => kit.stage.querySelector('.wa-ns' + k)); this.tops = R.PATH.map((_, k) => kit.stage.querySelector('.wa-nt' + k + '-top'));
  },
  render(t) {
    // day one: a slow walk up the half-worn trail; each practice leaves the trail behind her more worn
    const day2 = t > P19 + 0.6;
    const k = day2 ? lerp(-0.2, 6.2, eio(seg(t, P19 + 0.8, P19 + 9.8))) : lerp(0, 3.4, seg(t, 0.3, P18 + 2.0));
    const walking = day2 ? t > P19 + 0.8 : t > 0.3 && t < P18 + 2.0;
    let bonus = 0; BEAT.forEach((b) => { bonus += 0.12 * eo(seg(t, b, b + 1.0)); });
    const kAt = (b) => lerp(0, 3.4, seg(b, 0.3, P18 + 2.0));
    const wear = [];
    for (let n = 0; n < R.NB; n++) {
      let w = 0.42;
      BEAT.forEach((b) => { if (n < kAt(b)) w += 0.12 * eo(seg(t, b, b + 1.0)); });
      // later days wear it in all the way
      w = lerp(w, 1, eo(seg(t, P19 - 0.6, P19 + 0.6)) * 0.5 + 0.5 * eo(Math.max(0, Math.min(1, day2 ? k - n : 0))));
      wear.push(Math.min(1, w));
    }
    R.setWear(this.m, wear);
    R.setWader(this.r, Math.max(0, k), t, walking, 1 - wear[Math.max(0, Math.min(R.NB - 1, Math.floor(k)))]);
    this.r.w.style.opacity = day2 ? eo(seg(t, P19 + 0.6, P19 + 1.0)) * (1 - eo(seg(k, 5.4, 6.2))) : 1 - eo(seg(t, P19 - 0.6, P19 - 0.1));
    // a ring of light at her feet on each "you are practising"
    BEAT.forEach((b, i) => { const p = seg(t, b, b + 1.4), [x, y, r] = R.onPath(kAt(b)); this['f' + i].setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + (0.6 + 1.6 * p) * r / 100 + ' ' + (0.6 + 1.6 * p) * r / 260 + ')'); this['f' + i].style.opacity = p > 0 && p < 1 ? 1 - p : 0; });
    // the sun: across the sky on day one, down at dusk; a new morning; then the days pass
    const sx = day2 ? lerp(220, 860, seg(t, P19 - 0.2, P19 + 9.8)) : lerp(300, 860, seg(t, 0, P18 + 6.0));
    const arc = day2 ? Math.sin(Math.PI * seg(t, P19 - 0.2, P19 + 9.8)) : Math.sin(Math.PI * Math.min(1, seg(t, 0, P18 + 6.0)) * 0.5 + Math.PI / 2 * seg(t, 0, P18 + 6.0));
    this.sun.setAttribute('cx', sx); this.sun.setAttribute('cy', 470 - 190 * Math.max(0, arc));
    this.dusk.style.opacity = 0.24 * eo(seg(t, P18 + 2.5, P18 + 6.0)) * (1 - eo(seg(t, P19 - 0.4, P19 + 0.8)));
    // the stones rise out of the trail, near to far, and light as she reaches them
    this.st.forEach((el, n) => { const p = eob(seg(t, P19 + 4.3 + n * 0.22, P19 + 4.8 + n * 0.22), 1.5); el.style.opacity = eo(seg(t, P19 + 4.3 + n * 0.22, P19 + 4.6 + n * 0.22)); el.setAttribute('transform', 'translate(0 ' + (16 * (1 - p)) + ')'); R.litStone(this.tops[n], eo(seg(k, n - 0.2, n + 0.3))); });
    TOP.forEach(([a], i) => { const nx = i < 2 ? TOP[i + 1][0] : P18; R.place(this['q' + i], 540, lerp(84, 70, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)) * (1 - eo(seg(t, nx - 0.3, nx)))); });
    const pop = BEAT.reduce((s, b) => s + Math.sin(Math.PI * seg(t, b, b + 0.5)) * 0.15, 0);
    R.put(this.pr, 540, 160, 1 + pop, 0, eo(seg(t, 4.0, 4.4)) * (1 - eo(seg(t, P18 - 0.3, P18))));
    R.place(this.day, 540, lerp(84, 70, eo(seg(t, P18 + 0.3, P18 + 0.8))), eo(seg(t, P18 + 0.3, P18 + 0.8)) * (1 - eo(seg(t, P18 + 3.3, P18 + 3.6))));
    R.place(this.cant, 540, lerp(84, 70, eo(seg(t, P18 + 3.5, P18 + 4.0))), eo(seg(t, P18 + 3.5, P18 + 4.0)) * (1 - eo(seg(t, P19 - 0.3, P19))));
    R.place(this.ret, 540, lerp(84, 70, eo(seg(t, P19 + 0.3, P19 + 0.8))), eo(seg(t, P19 + 0.3, P19 + 0.8)) * (1 - eo(seg(t, P19 + 4.0, P19 + 4.3))));
    R.place(this.grad, 540, lerp(84, 70, eo(seg(t, P19 + 4.2, P19 + 4.7))), eo(seg(t, P19 + 4.2, P19 + 4.7)));
    [[6.73, 780], [7.38, 540], [7.93, 300]].forEach(([a, x], i) => R.place(this['a' + i], x, lerp(172, 160, eo(seg(t, P19 + a, P19 + a + 0.4))), eo(seg(t, P19 + a, P19 + a + 0.4))));
  },
});
