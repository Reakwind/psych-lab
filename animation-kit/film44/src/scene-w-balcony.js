const { seg, eo, eio, eob, lerp } = kit;
const T = [[5.1, 830, 'mug', 'קפה של הבוקר במרפסת'], [6.7, 540, 'note', 'שיר שמשמח אותנו'], [8.2, 250, 'people', 'מפגש עם חבר']];
kit.scene('w-balcony', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.balcony('wb') + R.seated('wb', -110) +
      '<g transform="translate(790 720)">' + R.table('wb-tb') + '</g>' + R.dayBar('wb', 220) +
      T.map((x, k) => '<g class="wb-w' + k + '">' + R.warm('wb-t' + k, x[2]) + '</g>').join('') + '</svg>' +
      T.map((x, k) => '<div class="tag wb-l' + k + '">' + x[3] + '</div>').join('') +
      '<div class="tag tag-cool wb-title">מפגש 44 · לעשות דברים שעושים לנו טוב</div><div class="tag tag-warm wb-a">דברים קטנים שעושים לנו טוב</div></div>'));
    Object.assign(this, R.refs(kit, 'wb', ['body', 'head', 'eyes', 'mouth', 'w0', 'w1', 'w2', 'l0', 'l1', 'l2', 'title', 'a', 'line', 'sun', 'moon']));
    this.steam = kit.stage.querySelector('.wb-tb-m-steam');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    this.steam.setAttribute('transform', 'translate(0 ' + (-((t * 10) % 12)) + ')'); this.steam.style.opacity = 0.3 + 0.2 * Math.sin(t * 2);
    this.head.setAttribute('transform', 'rotate(' + (6 + Math.sin(t * 0.7) * 3) + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 3.2, 3.5))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
    // her day; small good things find their place on it: morning coffee, a song, a friend
    const ln = eio(seg(t, 3.6, 5.0));
    this.line.setAttribute('transform', 'translate(970 0) scale(' + Math.max(0.001, ln) + ' 1) translate(-970 0)');
    this.sun.setAttribute('transform', 'translate(1010 220) scale(' + eob(seg(t, 3.4, 3.9), 1.6) + ')');
    this.moon.setAttribute('transform', 'translate(84 220) scale(' + eob(seg(t, 4.8, 5.2), 1.6) + ')');
    T.forEach(([a, x], k) => {
      R.xf(this['w' + k], x, 220 + Math.sin(t * 2 + k) * 3, eob(seg(t, a - 0.1, a + 0.4), 1.7), eo(seg(t, a - 0.1, a + 0.1)));
      R.place(this['l' + k], x, lerp(k % 2 ? 372 : 296, k % 2 ? 360 : 284, eo(seg(t, a + 0.1, a + 0.5))), eo(seg(t, a + 0.1, a + 0.5)));
    });
  },
});
