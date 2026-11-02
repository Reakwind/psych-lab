const { seg, eo, eio, eob, lerp } = kit;
const O = [['אדם אחד', 3.25, 820], ['דבר אחד', 4.62, 540], ['שיתוף אחד', 6.81, 260]];
const LINES = '<path class="ink" style="stroke-width:7;opacity:.4" d="M-80 -40 H80 M-80 -14 H60 M-80 12 H80 M-80 38 H40"/>';
kit.scene('j-one', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('j14', 0) +
      '<g class="j14-cl"><g transform="translate(540 236) scale(.74) translate(-540 -280)">' + R.cloud('j14-cloud') + '</g></g>' +
      '<g class="j14-big">' + R.sayBubble('j14-bb', LINES) + '</g>' +
      '<g class="j14-o0">' + R.bust('j14-bu', 'a') + '</g><g class="j14-o1"><g transform="scale(2)">' + R.note('j14-note') + '</g></g><g class="j14-o2">' + R.badge('j14-sh', 'share', 70) + '</g></svg>' +
      O.map((o, k) => '<div class="tag tag-warm j14-n' + k + '">' + o[0] + '</div>').join('') + '<div class="tag tag-cool j14-a">לא צריך להתחיל בשיחה גדולה</div></div>'));
    Object.assign(this, R.refs(kit, 'j14', ['body', 'head', 'eyes', 'mouth', 'cl', 'big', 'a']));
    this.o = O.map((o, k) => kit.stage.querySelector('.j14-o' + k)); this.n = O.map((o, k) => kit.stage.querySelector('.j14-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // no big conversation: the big bubble shrinks away; one person, one thing, one share
    const gone = 1 - eio(seg(t, 0.0, 0.5));
    this.cl.setAttribute('transform', 'translate(540 236) scale(' + Math.max(0.001, gone) + ') translate(-540 -236)'); this.cl.style.opacity = gone;
    const big = eob(seg(t, 0.4, 1.0), 1.3), shrink = eio(seg(t, 2.0, 2.8));
    R.setG(this.big, 540, 280, 2.4 * big * (1 - 0.8 * shrink), eo(seg(t, 0.4, 0.6)) * (1 - eo(seg(t, 2.4, 2.8))));
    O.forEach(([w, a, x], k) => {
      R.setG(this.o[k], x, 330 + Math.sin(t * 1.3 + k) * 5, (k === 0 ? 0.9 : 1) * eob(seg(t, a - 0.2, a + 0.4), 1.6), t > a - 0.2 ? 1 : 0);
      R.place(this.n[k], x, lerp(172, 160, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.7) * 3 + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 0.32, 0.7))), eo(seg(t, 0.32, 0.7)));
  },
});
