const { seg, eo, eio, eob, lerp } = kit;
// a busy day slides by: grey demands, and small warm moments slipping past between them; then the circle of attention catches one
const SP = 110;
kit.scene('g-busy', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gb', -120) + R.dayBar('gb', 220) + R.dayItems('gb') +
      '<g class="gb-ring">' + R.attn('gb') + '</g></svg>' +
      '<div class="tag tag-cool gb-a">כל מה שצריך לעשות</div><div class="tag tag-warm gb-b">קל לפספס את הדברים שאנחנו מעריכים</div><div class="tag gb-c">את התרגול הזה נקדיש להם</div></div>'));
    Object.assign(this, R.refs(kit, 'gb', ['body', 'head', 'eyes', 'mouth', 'ring', 'a', 'b', 'c']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.gb-i' + i));
    this.wt = R.DAYK.map((k, i) => (k === 'w' ? kit.stage.querySelector('.gb-w' + i) : null));
    this.gl = R.DAYK.map((k, i) => (k === 'w' ? kit.stage.querySelector('.gb-w' + i + '-glow') : null));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.2) + ')');
    const off = SP * t;
    R.placeDay(this.it, 220, off);
    // the warm ones are small and dim, easy to miss, until the circle arrives at the end
    const ring = eio(seg(t, 7.6, 8.4));
    this.wt.forEach((w, i) => { if (!w) return; const x = R.dayX(i, off), near = Math.max(0, 1 - Math.abs(x - 540) / 110) * ring; w.style.opacity = 0.45 + 0.55 * near; this.it[i].setAttribute('transform', 'translate(' + x + ' 220) scale(' + (0.7 + 0.3 * near) + ')'); this.gl[i].style.opacity = 0.45 * near; });
    R.xf(this.ring, 540, 220, (110 + Math.sin(t * 2.4) * 4) * eob(seg(t, 7.6, 8.3), 1.4), eo(seg(t, 7.6, 7.9)));
    // her eyes follow the grey blocks, busy
    this.head.setAttribute('transform', 'rotate(' + (Math.sin(t * 1.3) * 5) + ' 0 30) translate(0 -4)');
    this.mouth.setAttribute('d', t > 8.2 ? 'M-10 26 Q2 32 14 26' : 'M-10 28 Q2 28 14 28');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 6.4, 6.7))));
    R.place(this.b, 540, lerp(342, 330, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)) * (1 - eo(seg(t, 6.4, 6.7))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
  },
});
