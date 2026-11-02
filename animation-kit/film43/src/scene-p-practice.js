const { seg, eo, eio, eob, lerp } = kit;
const CHS = [[7.0, 820, 'heart', 'רגש'], [7.5, 540, 'body', 'גוף'], [7.9, 260, 'mind', 'מחשבות']];
kit.scene('p-practice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<ellipse class="pp-glow" cx="500" cy="640" rx="110" ry="130" style="fill:var(--accent);opacity:0"/>' + R.seated('pp', 0) +
      CHS.map((c, k) => '<g class="pp-c' + k + '">' + R.badge('pp-bd' + k, R.CH[c[2]]) + '</g>').join('') + '</svg>' +
      CHS.map((c, k) => '<div class="tag pp-t' + k + '">' + c[3] + '</div>').join('') + '<div class="tag tag-cool pp-a">תרגול מיינדפולנס פשוט וקצר</div><div class="tag tag-warm pp-b">איך חוויה נעימה מופיעה</div></div>'));
    Object.assign(this, R.refs(kit, 'pp', ['body', 'head', 'eyes', 'mouth', 'glow', 'c0', 'c1', 'c2', 't0', 't1', 't2', 'a', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)) * (1 - eo(seg(t, 4.6, 4.9))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.9, 5.4))), eo(seg(t, 4.9, 5.4)));
    // in feeling, in the body, in thoughts
    CHS.forEach(([a, x], k) => {
      R.xf(this['c' + k], x, 250 + Math.sin(t * 1.4 + k) * 6, eob(seg(t, a, a + 0.5), 1.8), eo(seg(t, a, a + 0.2)));
      R.place(this['t' + k], x, lerp(352, 340, eo(seg(t, a + 0.2, a + 0.6))), eo(seg(t, a + 0.2, a + 0.6)));
    });
    this.glow.style.opacity = 0.25 * eio(seg(t, 7.5, 8.2));
    this.mouth.setAttribute('d', t > 7.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
