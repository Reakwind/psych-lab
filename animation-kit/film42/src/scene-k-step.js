const { seg, eo, eio, eob, lerp } = kit;
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
const lit = (v) => Math.max(0, Math.min(1, v));
kit.scene('k-step', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('ks', { sun: true, sunX: 820, sunY: 260 }) +
      '<g class="ks-walker"><g class="ks-a">' + R.ruthBack('ks-a', false) + '</g><g class="ks-b">' + R.ruthBack('ks-b', true) + '</g></g></svg>' +
      '<div class="tag struck ks-task">עוד משימה</div><div class="tag tag-cool ks-op">הזדמנות לגלות</div><div class="tag tag-warm ks-st">צעד אחר צעד</div><div class="tag ks-ok">מה מרגיש נכון</div><div class="tag tag-warm ks-room">ולעשות לזה קצת יותר מקום</div></div>'));
    Object.assign(this, R.refs(kit, 'ks', ['walker', 'a', 'b', 'sun', 'task', 'op', 'st', 'ok', 'room']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.ks-st' + i + '-top'));
  },
  render(t) {
    // not another task to live up to
    R.place(this.task, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 4.6, 4.9))));
    this.task.style.setProperty('--s', eio(seg(t, 2.7, 3.3)));
    R.place(this.op, 540, lerp(84, 70, eo(seg(t, 4.9, 5.4))), eo(seg(t, 4.9, 5.4)) * (1 - eo(seg(t, 10.8, 11.1))));
    // step by step: each stone she reaches lights up
    const k = t < 6.2 ? lerp(1.4, 1.6, seg(t, 0, 6.2)) : lerp(1.6, 4.4, eio(seg(t, 6.2, 11.6)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130, walking = t > 6.2 && t < 11.6;
    const step = walking ? Math.floor(t * 2) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y - (walking ? Math.abs(Math.sin(t * Math.PI * 2)) * 6 : 0)) + ') scale(' + s + ')');
    this.tops.forEach((el, i) => { const on = i <= 1 ? 1 : lit(k - i + 0.6); el.style.fill = on > 0 ? 'color-mix(in srgb, var(--accent) ' + Math.round(on * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))' : ''; });
    R.place(this.st, 300, lerp(262, 250, eo(seg(t, 6.4, 6.9))), eo(seg(t, 6.4, 6.9)));
    R.place(this.ok, 300, lerp(352, 340, eo(seg(t, 8.2, 8.7))), eo(seg(t, 8.2, 8.7)));
    // and maybe make a little more room for it: the sun comes out
    this.sun.style.opacity = eio(seg(t, 10.8, 12.2));
    R.place(this.room, 540, lerp(84, 70, eo(seg(t, 11.1, 11.6))), eo(seg(t, 11.1, 11.6)));
  },
});
