const { seg, eo, eio, eob, lerp } = kit;
// at first the rhythm may feel strange or mechanical: the dot ticks round stiffly and Ruth tilts her head; that's fine, give it time, and it smooths out
kit.scene('q-strange', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qs', -230, false) + R.box('qsb') + '</svg>' +
      '<div class="count qs-q">?</div><div class="tag qs-p">ואפשר לחזור לנשימה הטבעית</div><div class="tag tag-cool qs-a">כמה דגשים אחרונים שיכולים ממש לעזור</div>' +
      '<div class="tag tag-warm qs-b">הקצב יכול להרגיש קצת מוזר או מכני</div><div class="tag qs-c">זה בסדר</div><div class="tag tag-cool qs-d">תנו לעצמכם זמן להתרגל אליו</div></div>'));
    Object.assign(this, R.refs(kit, 'qs', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'q', 'p', 'a', 'b', 'c', 'd']));
    this.x = R.boxRefs(kit, 'qsb');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    const back = eio(seg(t, 0.2, 1.2)), smooth = eio(seg(t, 10.4, 12.4));
    // the dot: steady speed, but in stiff jumps until she gets used to it
    const u = Math.max(0, t - 1.2) / 2.4, stiff = Math.floor(u * 3) / 3 + eio(Math.min(1, (u * 3 % 1) / 0.35)) / 3;
    const dot = lerp(stiff, u, smooth);
    R.setBox(this.x, { draw: [back, back, back, back], ticks: back, dot: t > 1.2 ? dot : 4, dotA: back, wave: 1 - back, waveAmp: 0.8, wavePh: -t * 1.4, lit: (n) => (n / 3 <= dot % 4 + 0.01 && n / 3 > dot % 4 - 1 ? 1 : 0), ring: back * 0.45 });
    const puzzled = eo(seg(t, 6.06, 6.6)) * (1 - eo(seg(t, 8.3, 8.9)));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.015, 4.4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 - 14 * puzzled) + ' 0 30)');
    this.mouth.setAttribute('d', puzzled > 0.5 ? R.mouthFlat : t > 8.4 ? R.mouthHappy : R.mouthNeutral);
    R.put(this.q, 390, 360 - 10 * Math.sin(t * 3) * puzzled, 0.6 + 0.4 * eob(seg(t, 6.06, 6.5), 1.6), 10, puzzled);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 5.7, 6.0))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 6.06, 6.4))), eo(seg(t, 6.06, 6.4)));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 8.31, 8.6))), eo(seg(t, 8.31, 8.6)) * (1 - eo(seg(t, 10.3, 10.6))));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 10.6, 11.0))), eo(seg(t, 10.6, 11.0)));
  },
});
