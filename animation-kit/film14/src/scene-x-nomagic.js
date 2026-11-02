const { seg, eo, eio, eob, lerp } = kit;
const X = [['תרופת פלא', 2.4, 760], ['רגיעה לפי דרישה', 4.4, 320]];
kit.scene('x-nomagic', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('x14p', { sun: true }) + '<g class="x14-mw" transform="translate(860 900) scale(.8)">' + R.meter('x14-mt') + '</g>' +
      '<g transform="translate(540 990) scale(1.3)">' + R.roots('x14') + '</g>' + R.packed('x14') + R.cbadge('x14-c0', 'relax', 64) + '</svg>' +
      X.map((x, k) => '<div class="tag struck x14-x' + k + '">' + x[0] + '</div>').join('') + '<div class="tag tag-warm x14-a">לשחרר קצת חרדה</div><div class="tag tag-cool x14-b">או למצוא יותר יציבות</div><div class="tag tag-warm x14-cc">רגע של שקט במהלך היום</div><div class="tag tag-red x14-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x14', ['w', 'eyes', 'head', 'mouth', 'mt-fill', 'r', 'c0', 'a', 'b', 'cc', 'ml']));
    this.x = X.map((x, k) => kit.stage.querySelector('.x14-x' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // not a magic pill, not calm on demand; but sometimes a little less anxiety, a little more steadiness: roots grow from her feet
    const st = eio(seg(t, 8.6, 9.8));
    this.w.setAttribute('transform', 'translate(540 980) rotate(' + (1.5 * Math.sin(t * 1.8) * (1 - st)) + ' 0 0)');
    R.setG(this.c0, lerp(700, 860, eio(seg(t, 0.0, 1.0))), lerp(520, 560, eio(seg(t, 0.0, 1.0))), lerp(1, 0.6, eio(seg(t, 0.0, 1.0))), 1 - eo(seg(t, 0.6, 1.2)));
    R.setMeter(this['mt-fill'], 0.55 - 0.15 * eio(seg(t, 6.4, 7.4)));
    const r = eio(seg(t, 8.7, 9.9)); this.r.style.strokeDasharray = r + ' 1'; this.r.style.opacity = r > 0 ? 1 : 0;
    X.forEach(([w, a, x], k) => { R.place(this.x[k], x, lerp(54, 40, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))); this.x[k].style.setProperty('--s', eio(seg(t, a + 0.6, a + 1.1))); });
    this.head.setAttribute('transform', 'rotate(' + (t < 6.4 ? 0 : 4) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.cc, 540, 140, 1 - eo(seg(t, 0.1, 0.5)));
    R.place(this.a, 540, lerp(152, 140, eo(seg(t, 6.55, 6.9))), eo(seg(t, 6.55, 6.9)) * (1 - eo(seg(t, 8.5, 8.8))));
    R.place(this.b, 540, lerp(152, 140, eo(seg(t, 8.87, 9.2))), eo(seg(t, 8.87, 9.2)));
    R.place(this.ml, 860, 920, 1);
  },
});
