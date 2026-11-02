const { seg, eo, eio, eob, lerp } = kit;
// what we can be grateful for: a dear person, someone who supported us, a moment we could be there for someone else
const BX = [870, 560, 230];
kit.scene('g-people', {
  init(kit) {
    const pics = [
      R.bust(R.friend('gq-a', 'a'), 0, 0.55) + R.heartMark(58, -56, 0.6),
      R.bust(R.ruth('gq-r1', 'stand'), -38, 0.42) + R.bust(R.friend('gq-b', 'b'), 42, 0.42) + R.heartMark(2, -62, 0.45),
      R.bust(R.pal('gq-p'), -40, 0.42) + R.bust(R.ruth('gq-r2', 'stand'), 42, 0.42) + R.heartMark(0, 52, 0.5),
    ];
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gq', -120) +
      '<g class="gq-bar">' + R.dayBar('gq', 220) + '</g><g class="gq-up">' + R.warm('gq-u', 'heart') + '</g>' +
      pics.map((p, k) => '<g class="gq-c' + k + '">' + R.badge('gq-bd' + k, p) + '</g>').join('') + '</svg>' +
      '<div class="tag gq-t0">אדם שיקר לנו</div><div class="tag gq-t1">מישהו שתמך בנו</div><div class="tag gq-t2">להיות שם בשביל אדם אחר</div></div>'));
    Object.assign(this, R.refs(kit, 'gq', ['body', 'head', 'eyes', 'mouth', 'bar', 'up', 'c0', 'c1', 'c2', 't0', 't1', 't2']));
    this.ug = kit.stage.querySelector('.gq-u-glow');
    ['gq-a', 'gq-b', 'gq-p', 'gq-r1', 'gq-r2'].forEach((id) => { const m = kit.stage.querySelector('.' + id + '-mouth'); if (m) m.setAttribute('d', 'M-12 24 Q2 36 16 24'); });
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.bar.style.opacity = 1 - eo(seg(t, 0, 0.6));
    R.xf(this.up, 760, 470 + Math.sin(t * 2) * 6, 1.5, 1);
    this.ug.style.opacity = 0.4 * (0.85 + 0.15 * Math.sin(t * 3));
    [1.3, 2.3, 4.9].forEach((a, k) => {
      R.xf(this['c' + k], BX[k], 190 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a - 0.2, a + 0.4), 1.6), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], BX[k], lerp(312, 300, eo(seg(t, a + 0.1, a + 0.5))), eo(seg(t, a + 0.1, a + 0.5)));
    });
    this.head.setAttribute('transform', 'rotate(' + (Math.sin(t * 0.8) * 4 - 4) + ' 0 30)');
  },
});
