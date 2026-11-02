const { seg, eo, eio, eob, lerp } = kit;
// three thoughts in turn: a familiar one, one she pushes back on, one that is a bit much (and a bit funny)
const CARDS = [[1.6, 3.8, 'עדיף לחכות עד שיהיה לי יותר טוב', 'מוכרות', 2.2], [3.8, 7.3, 'אם לא בא לי, אז לא צריך', 'מעוררות התנגדות', 3.9], [7.3, 11.3, 'פספסתי יום, אז מה הטעם', 'קצת מוגזמות, מצחיקות', 7.5]];
kit.scene('v-kinds', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('vq', 200) +
      '<g transform="translate(900 380)"><g class="vq-vg">' + R.voice('vq-v') + '</g></g></svg>' +
      CARDS.map((c, k) => '<div class="thought sm vq-c' + k + '">' + c[2] + '</div><div class="tag vq-t' + k + '">' + c[3] + '</div>').join('') +
      '<div class="tag tag-warm vq-cap">זה חלק מהעניין</div></div>'));
    Object.assign(this, R.refs(kit, 'vq', ['body', 'head', 'eyes', 'mouth', 'vg', 'c0', 'c1', 'c2', 't0', 't1', 't2', 'cap']));
    this.v = R.refs(kit, 'vq-v', ['grey', 'warm', 'eyes', 'mouth']);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-6 2 Q10 16 26 2');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.v.eyes, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.vg.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.2) * 8 + ') scale(1.25)');
    CARDS.forEach(([a, b, , , ta], k) => {
      const inn = eio(seg(t, a, a + 0.6)), out = eio(seg(t, b - 0.5, b));
      R.put(this['c' + k], lerp(330, -300, out), lerp(-120, 300, inn), 1, lerp(-6, 0, inn) - out * 8, k === 2 && b > 11 ? 1 : 1 - out);
      R.place(this['t' + k], 330, lerp(470, 458, eo(seg(t, ta + 0.4, ta + 0.9))), eo(seg(t, ta + 0.4, ta + 0.9)) * (1 - eo(seg(t, b - 0.6, b - 0.2))));
    });
    // Ruth reacts: a nod, a shake of the head, a laugh
    const nod = Math.sin(Math.PI * 4 * seg(t, 2.6, 3.4)) * 5, shake = Math.sin(Math.PI * 4 * seg(t, 4.4, 5.4)) * 7, laugh = Math.sin(Math.PI * 6 * seg(t, 8.0, 9.2));
    this.head.setAttribute('transform', 'translate(' + shake * 0.6 + ' ' + (nod + Math.abs(laugh) * -4) + ') rotate(' + (shake - 6) + ' 0 30)');
    this.mouth.setAttribute('d', t > 7.9 && t < 9.6 ? 'M-16 20 Q2 46 20 20 Z' : t > 4.2 && t < 6.6 ? 'M-10 30 Q2 24 14 30' : 'M-12 24 Q2 36 16 24');
    this.mouth.style.fill = t > 7.9 && t < 9.6 ? 'var(--second)' : '';
    R.place(this.cap, 330, lerp(610, 598, eo(seg(t, 9.6, 10.1))), eo(seg(t, 9.6, 10.1)));
  },
});
