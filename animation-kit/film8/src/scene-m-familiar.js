const { seg, eo, eio, eob, lerp } = kit;
const C = [[2.5, '"זה לא יהיה כמו פעם."', 790, 250], [4.8, '"אני לא אצליח."', 290, 370], [7.1, '"בשביל מה בכלל לנסות?"', 800, 520]];
kit.scene('m-familiar', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mf', -40) + '</svg>' +
      C.map((c, k) => '<div class="thought sm mf-c' + k + '">' + c[1] + '</div>').join('') + '<div class="tag tag-cool mf-title">מפגש 8 · איזון מחשבות</div></div>'));
    Object.assign(this, R.refs(kit, 'mf', ['body', 'head', 'eyes', 'mouth', 'c0', 'c1', 'c2', 'title']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // familiar thoughts rise around her, one per quote
    C.forEach(([a, , x, y], k) => { const p = eob(seg(t, a, a + 0.6), 1.5); R.put(this['c' + k], x, y + (1 - eo(seg(t, a, a + 0.6))) * 60 + Math.sin(t * 1.4 + k) * 5, 0.3 + 0.7 * p, 0, eo(seg(t, a, a + 0.3))); });
    this.mouth.setAttribute('d', t > 2.6 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + (t > 7.1 ? 6 : t > 4.8 ? -6 : t > 2.5 ? 5 : 0) + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 2.1, 2.5))));
  },
});
