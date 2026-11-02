const { seg, eo, eio, eob, lerp } = kit;
const B = [[4.8, 880, 200, 'מקלחת חמה'], [5.85, 710, 165, 'ספר'], [6.3, 540, 150, 'מוזיקה'], [7.05, 370, 165, 'אור חלש יותר'], [8.5, 200, 200, 'זמן שקט עם אדם קרוב']];
kit.scene('n-pleasant', {
  init(kit) {
    const ic = [R.shower('np-i0'), '<g transform="scale(.62)">' + R.book('np-i1') + '</g>', '<g transform="translate(-16 34) scale(.8)">' + R.notes('np-i2') + '</g>', '<g transform="translate(0 -8) scale(.95)">' + R.bulb('np-i3') + '</g>', '<g transform="scale(.9)">' + R.tool('np-i4', 3, 56).replace(/<circle[^>]*\/><circle[^>]*\/>/, '') + '</g>'];
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.eveRoom('np', -120, 700) +
      '<g class="np-fr"><g transform="scale(.98)">' + R.friend('np-f', 'a') + '</g></g>' +
      B.map((b, k) => '<g class="np-b' + k + '">' + R.disc('np-d' + k, 64) + ic[k] + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool np-top">לקראת סוף היום: משהו נעים ומרגיע</div>' + B.map((b, k) => '<div class="tag np-t' + k + '">' + b[3] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'np', ['body', 'head', 'eyes', 'mouth', 'fr', 'top', 'b0', 'b1', 'b2', 'b3', 'b4', 't0', 't1', 't2', 't3', 't4']));
    this.e = R.eveRefs(kit, 'np'); this.fe = kit.stage.querySelector('.np-f-eyes');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.7); R.blink(this.fe, t, 2.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.8) + ')');
    const dim = eio(seg(t, 7.1, 8.2));
    R.setEve(this.e, 1, 0.3, lerp(0.2, 0.45, dim), lerp(1, 0.6, dim));
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 4.3, 4.7))));
    // pleasant, calming things light up one by one
    B.forEach(([a, x, y], k) => {
      const p = eob(seg(t, a, a + 0.5), 1.6);
      this['b' + k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 1.4 + k) * 5) + ') scale(' + p + ')');
      R.place(this['t' + k], x, lerp(y + 92, y + 80, eo(seg(t, a + 0.1, a + 0.6))) + [0, 60, 0, 60, 120][k], eo(seg(t, a + 0.1, a + 0.6)));
    });
    // quiet time with someone close
    const f = eio(seg(t, 8.4, 9.8));
    this.fr.setAttribute('transform', 'translate(' + lerp(1240, 910, f) + ' 962)');
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 9.2, 9.9))) + ' 0 30)');
  },
});
