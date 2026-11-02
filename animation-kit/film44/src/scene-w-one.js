const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('w-one', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wu', 0) + R.dayBar('wu', 220) +
      [0, 1, 3, 4].map((k) => '<g transform="translate(' + X[k] + ' 220)">' + R.grey('wu-g' + k, 136) + '</g>').join('') +
      '<circle class="wu-slot" cx="510" cy="220" r="52" style="fill:none;stroke:var(--accent);stroke-width:6;stroke-dasharray:12 10"/><g class="wu-w">' + R.warm('wu-t', 'mug') + '</g></svg>' +
      '<div class="tag tag-cool wu-a">לבחור דבר אחד</div><div class="tag tag-warm wu-b">אפילו בקטן</div><div class="tag wu-c">ומה יכול לעזור לעשות את זה קצת יותר בקלות</div></div>'));
    Object.assign(this, R.refs(kit, 'wu', ['body', 'head', 'eyes', 'mouth', 'slot', 'w', 'a', 'b', 'c']));
    this.gl = kit.stage.querySelector('.wu-t-glow');
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // choose one thing, and think how it could fit into life — even in a small way
    const up = eio(seg(t, 1.9, 2.6)), go = eio(seg(t, 3.6, 5.0)), small = eio(seg(t, 5.4, 6.0));
    R.xf(this.w, lerp(720, 510, go), lerp(lerp(700, 480, up), 220, go) + Math.sin(t * 2.2) * 6 * (1 - go), lerp(1.2, 1, go) - 0.2 * small, eo(seg(t, 1.9, 2.1)));
    this.slot.style.opacity = 1 - eo(seg(t, 4.8, 5.1));
    this.gl.style.opacity = 0.45 * eio(seg(t, 5.0, 5.8)) * (0.8 + 0.2 * Math.sin(t * 3));
    this.head.setAttribute('transform', 'rotate(' + (6 * up - 12 * go) + ' 0 30) translate(0 ' + (-8 * go) + ')');
    this.mouth.setAttribute('d', t > 5.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)) * (1 - eo(seg(t, 7.0, 7.3))));
    R.place(this.b, 510, lerp(312, 300, eo(seg(t, 5.5, 6.0))), eo(seg(t, 5.5, 6.0)) * (1 - eo(seg(t, 7.0, 7.3))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
