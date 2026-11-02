const { seg, eo, eio, eob, lerp } = kit;
// the day stops; one warm moment is lifted out and Ruth gives thanks for it
const SP = 110, OFF0 = 110 * 9.95;
const [OFF1, PICK] = R.dayStop(OFF0 + 40, 540);
const DS = Math.max(0.6, Math.min(1.8, 3 * (OFF1 - OFF0) / SP));
kit.scene('g-pause', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gp', -120) + R.dayBar('gp', 220) + R.dayItems('gp') +
      '<g class="gp-ring">' + R.attn('gp') + '</g><g class="gp-up">' + R.warm('gp-u', 'heart') + '</g></svg>' +
      '<div class="tag tag-cool gp-a">נעצור לרגע</div><div class="tag gp-b">נשים לב לאחד מהם</div><div class="tag tag-warm gp-c">רגע של הכרת תודה</div></div>'));
    Object.assign(this, R.refs(kit, 'gp', ['body', 'head', 'eyes', 'mouth', 'ring', 'up', 'a', 'b', 'c']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.gp-i' + i));
    this.wt = R.DAYK.map((k, i) => (k === 'w' ? kit.stage.querySelector('.gp-w' + i) : null));
    this.ug = kit.stage.querySelector('.gp-u-glow');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    const off = lerp(OFF0, OFF1, eo(seg(t, 0, DS)));
    R.placeDay(this.it, 220, off, PICK);
    this.wt.forEach((w, i) => { if (w && i !== PICK) { w.style.opacity = 0.45; this.it[i].setAttribute('transform', 'translate(' + R.dayX(i, off) + ' 220) scale(.7)'); } });
    // the circle settles on one; it lifts out of the day and comes close, glowing
    R.xf(this.ring, 540, 220, 110 + Math.sin(t * 2.4) * 4, 1 - eo(seg(t, 2.2, 2.8)));
    const lift = eio(seg(t, 1.3, 2.6));
    this.it[PICK].style.opacity = lift > 0 ? 0 : 1;
    this.it[PICK].setAttribute('transform', 'translate(' + R.dayX(PICK, off) + ' 220) scale(1)');
    R.xf(this.up, lerp(R.dayX(PICK, off), 760, lift), lerp(220, 470, lift) + Math.sin(t * 2) * 6 * lift, lerp(1, 1.5, lift), lift > 0 ? 1 : 0);
    this.ug.style.opacity = 0.45 * eio(seg(t, 2.6, 3.4)) * (0.85 + 0.15 * Math.sin(t * 3));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.8, 2.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.8 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 4.8, 5.1))));
    R.place(this.b, 540, lerp(1002, 990, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)) * (1 - eo(seg(t, 4.8, 5.1))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)));
  },
});
