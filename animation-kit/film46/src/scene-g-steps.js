const { seg, eo, eio, eob, lerp } = kit;
// stop with one thing, a few short questions, then on with the day
const SP = 110, OFFS = 1500, [OFF1, PICK] = R.dayStop(OFFS + SP * 0.9, 540);
const D1 = Math.max(0.6, Math.min(1.8, 3 * (OFF1 - OFFS - SP * 0.6) / SP));
kit.scene('g-steps', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gt', -120) + R.dayBar('gt', 220) + R.dayItems('gt') +
      '<g class="gt-up"><g class="gt-ring">' + R.attn('gt') + '</g>' + R.warm('gt-u', 'heart') + '</g>' + [0, 1, 2].map((k) => '<g class="gt-q' + k + '">' + R.qmark('gt-qq' + k) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool gt-a">נעצור עם דבר אחד</div><div class="tag gt-b">כמה שאלות קצרות</div><div class="tag tag-warm gt-c">ונמשיך ביום שלנו</div></div>'));
    Object.assign(this, R.refs(kit, 'gt', ['body', 'head', 'eyes', 'mouth', 'up', 'ring', 'q0', 'q1', 'q2', 'a', 'b', 'c']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.gt-i' + i)); this.ug = kit.stage.querySelector('.gt-u-glow');
    this.wt = R.DAYK.map((k, i) => (k === 'w' ? kit.stage.querySelector('.gt-w' + i) : null));
  },
  render(t) {
    R.blink(this.eyes, t, 0.2);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // scrolling, then easing to a stop on one warm moment; later the day moves on again
    const A = OFFS + SP * Math.min(t, 0.6);
    let off = t < 0.6 ? A : lerp(OFFS + SP * 0.6, OFF1, eo(seg(t, 0.6, 0.6 + D1)));
    if (t > 7.0) off = OFF1 + SP * (t - 7.0) * eio(seg(t, 7.0, 7.8));
    R.placeDay(this.it, 220, off);
    this.wt.forEach((w, i) => { if (w) w.style.opacity = i === PICK ? 1 : 0.5; });
    const lift = eio(seg(t, 1.8, 2.8)) - eio(seg(t, 6.2, 7.0));
    this.it[PICK].style.opacity = lift > 0.01 ? 0 : 1;
    const ux = lerp(540, 760, lift), uy = lerp(220, 470, lift);
    R.xf(this.up, ux, uy + Math.sin(t * 2) * 6 * lift, lerp(1, 1.5, lift), lift > 0.01 ? 1 : 0);
    this.ring.setAttribute('transform', 'scale(' + (90 + Math.sin(t * 2.4) * 3) * eob(seg(t, 3.6, 4.2), 1.4) + ')'); this.ring.style.opacity = eo(seg(t, 3.6, 3.8)) * (1 - eo(seg(t, 6.0, 6.3)));
    this.ug.style.opacity = 0.4 * lift;
    [0, 1, 2].forEach((k) => {
      const a = 4.4 + k * 0.35, inn = eob(seg(t, a, a + 0.4), 1.6), out = eo(seg(t, 5.9, 6.3)), ang = t * 1.2 + k * 2.09;
      R.xf(this['q' + k], 760 + Math.cos(ang) * 150, 470 + Math.sin(ang) * 120, 0.9 * inn * (1 - out), eo(seg(t, a, a + 0.15)) * (1 - out));
    });
    this.head.setAttribute('transform', 'rotate(' + (8 * lift) + ' 0 30)');
    this.mouth.setAttribute('d', lift > 0.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 4.8, 5.1))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)) * (1 - eo(seg(t, 6.5, 6.8))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)));
  },
});
