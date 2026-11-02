const { seg, eo, eio, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('small-steps', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('small') +
      '<g class="small-walker"><g class="small-a">' + R.ruthBack('small-a', false) + '</g><g class="small-b">' + R.ruthBack('small-b', true) + '</g></g>' +
      '</svg><div class="tag tag-cool small-join">הצעדים הקטנים מתחברים</div><div class="tag small-effort">בהתחלה: מאמץ</div><div class="tag tag-warm small-easy">עם הזמן: קל יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'small', ['walker', 'a', 'b', 'join', 'effort', 'easy']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.small-st' + i + '-top'));
  },
  render(t) {
    // slow and effortful at first, then easier and quicker
    const k = t < 3.7 ? lerp(0.1, 1.1, seg(t, 0, 3.7)) : t < 8.1 ? lerp(1.1, 2.0, seg(t, 3.7, 8.1)) : lerp(2.0, 6.2, eio(seg(t, 8.1, 13.7)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130;
    const rate = t < 8.1 ? 1.6 : 2.6;
    const step = Math.floor(t * rate) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    const lean = 3 + 6 * eio(seg(t, 4.0, 5.0)) * (1 - eio(seg(t, 8.0, 9.0)));
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y + Math.abs(Math.sin(t * Math.PI * rate)) * -5 * s * 2) + ') scale(' + s + ') rotate(' + lean + ')');
    // each stone she reaches lights up; later the lit stones run ahead of her and join into a path
    const ahead = 4 * eio(seg(t, 9.0, 12.5));
    this.tops.forEach((el, i) => { const on = clampTo(k + ahead - i + 0.6); el.style.fill = on > 0 ? 'color-mix(in srgb, var(--accent) ' + Math.round(on * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))' : ''; });
    R.place(this.join, 540, lerp(110, 96, eo(seg(t, 0.6, 1.2))), eo(seg(t, 0.6, 1.2)) * (1 - eo(seg(t, 3.6, 4.0))));
    R.place(this.effort, 540, lerp(110, 96, eo(seg(t, 4.3, 4.9))), eo(seg(t, 4.3, 4.9)) * (1 - eo(seg(t, 8.2, 8.6))));
    R.place(this.easy, 540, lerp(110, 96, eo(seg(t, 8.5, 9.1))), eo(seg(t, 8.5, 9.1)));
  },
});
function clampTo(v) { return Math.max(0, Math.min(1, v)); }
