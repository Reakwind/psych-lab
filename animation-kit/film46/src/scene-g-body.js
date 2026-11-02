const { seg, eo, eio, eob, lerp } = kit;
// something the body allowed us to do; something that went a little better than expected
const OLD = [[870, 190, 1000, 980], [560, 190, 900, 980], [230, 190, 800, 980]];
kit.scene('g-body', {
  init(kit) {
    const old = [
      R.bust(R.friend('gy-a', 'a'), 0, 0.55) + R.heartMark(58, -56, 0.6),
      R.bust(R.ruth('gy-r1', 'stand'), -38, 0.42) + R.bust(R.friend('gy-b', 'b'), 42, 0.42) + R.heartMark(2, -62, 0.45),
      R.bust(R.pal('gy-p'), -40, 0.42) + R.bust(R.ruth('gy-r2', 'stand'), 42, 0.42) + R.heartMark(0, 52, 0.5),
    ];
    const walk = '<g transform="translate(0 84) scale(.33)">' + R.ruth('gy-w', 'step') + '</g><path class="ink" style="stroke-width:5;opacity:.5" d="M-74 70 H-40 M-84 50 H-50"/>';
    const day = '<g transform="translate(0 6) scale(.62)">' + R.dayCard('gy-dc', 'sun') + '</g><g transform="translate(40 40)"><circle r="26" style="fill:#6FAE7A;stroke:var(--second);stroke-width:4"/><path style="fill:none;stroke:var(--ground);stroke-width:7;stroke-linecap:round;stroke-linejoin:round" d="M-11 1 l7 7 l14 -15"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('gy', -120) + '<g class="gy-up">' + R.warm('gy-u', 'heart') + '</g>' +
      old.map((p, k) => '<g class="gy-o' + k + '">' + R.badge('gy-ob' + k, p) + '</g>').join('') +
      '<g class="gy-n0">' + R.badge('gy-nb0', walk) + '</g><g class="gy-n1">' + R.badge('gy-nb1', day) + '</g></svg>' +
      '<div class="tag gy-t0">משהו שהגוף אפשר לנו לעשות</div><div class="tag gy-t1">משהו שהלך היום קצת יותר טוב משציפינו</div></div>'));
    Object.assign(this, R.refs(kit, 'gy', ['body', 'head', 'eyes', 'mouth', 'up', 'o0', 'o1', 'o2', 'n0', 'n1', 't0', 't1']));
    this.ug = kit.stage.querySelector('.gy-u-glow');
    ['gy-a', 'gy-b', 'gy-p', 'gy-r1', 'gy-r2', 'gy-w'].forEach((id) => { const m = kit.stage.querySelector('.' + id + '-mouth'); if (m) m.setAttribute('d', 'M-12 24 Q2 36 16 24'); });
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.wl = kit.stage.querySelector('.gy-w-ruth');
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.xf(this.up, 760, 470 + Math.sin(t * 2) * 6, 1.5, 1);
    this.ug.style.opacity = 0.4 * (0.85 + 0.15 * Math.sin(t * 3));
    // the first three gather on the floor beside her, making room
    const m = eio(seg(t, 0.2, 1.2));
    OLD.forEach(([x0, y0, x1, y1], k) => R.xf(this['o' + k], lerp(x0, x1, m), lerp(y0, y1, m) - Math.sin(Math.PI * m) * 60, lerp(1, 0.42, m), 1));
    R.xf(this.n0, 760, 190 + Math.sin(t * 1.4) * 5, eob(seg(t, 1.4, 2.0), 1.6), eo(seg(t, 1.4, 1.6)));
    this.wl.setAttribute('transform', 'translate(' + Math.sin(t * 4) * 6 + ' 0)');
    R.xf(this.n1, 360, 190 + Math.sin(t * 1.4 + 1) * 5, eob(seg(t, 3.5, 4.1), 1.6), eo(seg(t, 3.5, 3.7)));
    R.place(this.t0, 540, lerp(352, 340, eo(seg(t, 1.7, 2.1))), eo(seg(t, 1.7, 2.1)) * (1 - eo(seg(t, 3.4, 3.7))));
    R.place(this.t1, 540, lerp(352, 340, eo(seg(t, 3.8, 4.2))), eo(seg(t, 3.8, 4.2)));
    this.head.setAttribute('transform', 'rotate(' + (Math.sin(t * 0.8) * 4 - 4) + ' 0 30)');
  },
});
