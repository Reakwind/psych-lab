const { seg, eo, eio, eob, lerp } = kit;
const ID = [[3.4, 400, 890], [3.6, 540, 870], [3.8, 680, 890]];
kit.scene('k-phone', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k12') + R.pileSvg('k12', 3) + R.seated('k12', 0) + R.deckSvg('k12') +
      '<g class="k12-pw">' + R.bigPhone('k12') + ID.map((b, k) => '<g class="k12-i' + k + '">' + R.balloon('k12-bl' + k) + '</g>').join('') + '</g><g class="k12-fg">' + R.finger('k12-fn') + '</g></svg>' +
      '<div class="k12-scr">' + R.qcard('k12-q', 'ומה תמיד רציתם ללמוד אבל עוד לא יצא לכם?') + R.qcard('k12-q2', '') + '<div class="btn keep k12-b1">עוד רעיונות</div><div class="btn k12-b2">לשאלה הבאה</div></div></div>'));
    Object.assign(this, R.refs(kit, 'k12', ['body', 'eyes', 'pw', 'fg', 'q', 'q2', 'b1', 'b2', 'scr']));
    this.i = ID.map((b, k) => kit.stage.querySelector('.k12-i' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the game on the phone: a press here for more ideas, a press there for the next question
    const up = eio(seg(t, 0.0, 0.7)), dy = lerp(1000, 0, up);
    this.pw.setAttribute('transform', 'translate(0 ' + dy + ')');
    // the screen's contents live in a clipped box that rides with the phone (screen at 300,190, 480 × 790)
    this.scr.style.transform = 'translate(0px,' + dy + 'px)';
    const sw = eio(seg(t, 5.9, 6.6));
    R.flipCard(this.q, 240 - 560 * sw, 210, 0.8, 0, 1, 1);
    R.flipCard(this.q2, lerp(800, 240, eio(seg(t, 6.3, 7.0))), 210, 0.8, 0, 0, t > 6.3 ? 1 : 0);
    const p1 = seg(t, 2.9, 3.2), p2 = seg(t, 5.5, 5.8), press = (p) => 1 - 0.08 * Math.sin(Math.PI * p);
    R.put(this.b1, 240, 460, press(p1), 0, 1); R.put(this.b2, 240, 580, press(p2), 0, 1);
    this.b1.style.filter = p1 > 0 && p1 < 1 ? 'brightness(.9)' : ''; this.b2.style.filter = p2 > 0 && p2 < 1 ? 'brightness(.9)' : '';
    ID.forEach(([a, x, y], k) => R.setG(this.i[k], x, y + Math.sin(t * 1.5 + k) * 5, 0.75 * eob(seg(t, a, a + 0.4), 1.5), (t > a ? 1 : 0) * (1 - eo(seg(t, 5.4, 5.8)))));
    // the finger: from below to the first button, then the second, then away
    const f1 = eio(seg(t, 2.0, 2.9)), f2 = eio(seg(t, 4.6, 5.5)), f3 = eio(seg(t, 6.2, 7.2));
    const fx = lerp(lerp(lerp(900, 640, f1), 650, f2), 900, f3), fy = lerp(lerp(lerp(1250, 672, f1), 792, f2), 1250, f3) + 10 * Math.sin(Math.PI * p1) + 10 * Math.sin(Math.PI * p2);
    this.fg.setAttribute('transform', 'translate(' + fx + ' ' + fy + ') rotate(-14)');
  },
});
