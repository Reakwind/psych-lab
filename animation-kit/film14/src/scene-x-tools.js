const { seg, eo, eio, eob, lerp } = kit;
// four calming tools, named one after another; research found them effective
const T = [['נשימה והרפיה', 1.39, 840], ['קרקוע', 2.05, 640], ['מיינדפולנס', 2.63, 440], ['דמיון מודרך', 3.54, 240]];
kit.scene('x-tools', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x10', 0) + T.map((c, k) => R.cbadge('x10-c' + k, R.CALM[k], 64)).join('') + '</svg>' +
      T.map((c, k) => '<div class="tag tag-warm x10-n' + k + '">' + c[0] + '</div>').join('') + '<div class="tag tag-cool x10-a">נחקרו ונמצאו יעילים</div><div class="tag x10-b">בוויסות והתמודדות עם מתח וחרדה</div><div class="tag tag-red x10-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x10', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'a', 'b', 'ml']));
    this.c = T.map((c, k) => kit.stage.querySelector('.x10-c' + k)); this.n = T.map((c, k) => kit.stage.querySelector('.x10-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'translate(0 8) scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 9)); this.pf.style.opacity = 0;
    R.setMeter(this['mt-fill'], 0.8);
    const ok = eo(seg(t, 5.3, 5.8));
    T.forEach(([w, a, x], k) => {
      R.setG(this.c[k], x, 230 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a - 0.2, a + 0.3), 1.6) * (1 + 0.06 * ok * Math.sin(t * 4 + k)), eo(seg(t, a - 0.2, a)));
      R.place(this.n[k], x, lerp(332, 320, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    this.head.setAttribute('transform', 'rotate(' + (t < 1.2 ? 0 : -6 + 4 * Math.sin(t * 0.8)) + ' 0 30) translate(0 6)');
    this.mouth.setAttribute('d', t > 5.3 ? R.mouthNeutral : R.mouthSad);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 5.29, 5.7))), eo(seg(t, 5.29, 5.7)));
    R.place(this.b, 540, lerp(972, 960, eo(seg(t, 7.2, 7.6))), eo(seg(t, 7.2, 7.6)));
    R.place(this.ml, 920, 886, 1);
  },
});
