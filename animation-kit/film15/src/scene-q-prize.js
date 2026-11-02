const { seg, eo, eio, eob, lerp } = kit;
// no forcing the breath to fit the box exactly: its corners soften; a trophy for "the most precise breath" appears and is crossed out
kit.scene('q-prize', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qz', -230, false) + R.box('qzb') +
      '<g class="qz-tw">' + R.trophy('qz-tr') + R.xMark('qz-x', 120) + '</g></svg>' +
      '<div class="tag tag-cool qz-p">תנו לעצמכם זמן להתרגל אליו</div><div class="tag qz-a">הנשימה לא אמורה להרגיש מאומצת</div><div class="tag tag-warm qz-b">לא מנסים להכריח אותה להתאים בדיוק לקופסה</div>' +
      '<div class="tag tag-cool qz-c">אף אחד לא יתן לנו פרס על הנשימה הכי מדויקת</div></div>'));
    Object.assign(this, R.refs(kit, 'qz', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'tw', 'x-a', 'x-b', 'p', 'a', 'b', 'c']));
    this.x = R.boxRefs(kit, 'qzb');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    const soft = eio(seg(t, 5.0, 6.8)), dot = 13.12 / 2.4 + 5.6 / 2.4 + t / 2.6;
    R.setBox(this.x, { dot, soft, rad: 80, lit: (n) => (n / 3 <= dot % 4 + 0.01 && n / 3 > dot % 4 - 1 ? 1 : 0), ring: 0.45 + 0.1 * Math.sin(t * 1.3) });
    // the trophy pops above Ruth's shoulder, then the red cross
    const pop = eob(seg(t, 8.6, 9.2), 1.6), xa = eio(seg(t, 9.6, 10.0)), xb = eio(seg(t, 9.9, 10.3));
    this.tw.setAttribute('transform', 'translate(300 250) scale(' + Math.max(0.001, 0.8 * pop) + ') rotate(' + (-6 * Math.sin(t * 2) * (1 - xb)) + ')');
    this.tw.style.opacity = 1 - 0.5 * eo(seg(t, 10.6, 11.4));
    R.drawOn(this['x-a'], xa); R.drawOn(this['x-b'], xb);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 4 * Math.sin(t * 0.6)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 10.2 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.8, 2.2))), eo(seg(t, 1.8, 2.2)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.6, 5.0))), eo(seg(t, 4.6, 5.0)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 7.9, 8.3))), eo(seg(t, 7.9, 8.3)));
  },
});
