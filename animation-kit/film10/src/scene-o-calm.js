const { seg, eo, eio, eob, lerp } = kit;
const W = [[4.1, 'יותר בקלות', 840], [7.4, 'יותר חמלה', 580], [9.1, 'מרחב ויציבות פנימית', 280]];
const BS = [[0.0, 120, 0.9], [2.5, 210, 0.7], [5.5, 160, 0.8], [8.0, 240, 0.6]];
kit.scene('o-calm', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(500 660) scale(330)">' + R.attn('oc') + '</g>' + R.seated('oc', 0) +
      BS.map((b, k) => '<g class="oc-b' + k + '">' + R.balloon('oc-bl' + k) + '</g>').join('') + '</svg>' + W.map((w, k) => '<div class="tag tag-warm oc-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'oc', ['body', 'head', 'eyes', 'mouth', 'attn', 'w0', 'w1', 'w2']));
    this.b = BS.map((b, k) => kit.stage.querySelector('.oc-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    // calm: thoughts still drift by, small and far; around her a wider, warmer space
    this.attn.setAttribute('transform', 'scale(' + lerp(0.6, 1.25, eio(seg(t, 0.5, 9.5))) + ')'); this.attn.style.opacity = eo(seg(t, 0.3, 1.5));
    BS.forEach(([a, y, s], k) => { const p = seg(t, a, a + 9); R.setBal(this.b[k], lerp(1160, -120, p), y + Math.sin(t * 1.2 + k) * 8, s, p > 0 && p < 1 ? 0.8 : 0); });
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.6) * 4 + ' 0 30)');
    W.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(354, 340, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
