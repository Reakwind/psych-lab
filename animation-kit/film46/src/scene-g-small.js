const { seg, eo, eio, eob, lerp } = kit;
// not something big: a big star rises and fades; the circle of attention finds tiny warm sparks around the room instead
const SPK = [[930, 760], [846, 668], [700, 930], [600, 760], [330, 950], [200, 640], [110, 760]];
const PATH = (p) => [lerp(960, 120, p), 790 + 120 * Math.sin(p * Math.PI * 2)];
kit.scene('g-small', {
  init(kit) {
    let rays = '';
    for (let k = 0; k < 12; k++) rays += '<rect class="amber" x="-6" y="-200" width="12" height="40" rx="6" transform="rotate(' + k * 30 + ')"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      SPK.map((s, k) => '<g class="gs-s' + k + '" transform="translate(' + s[0] + ' ' + s[1] + ')"><circle class="gs-g' + k + '" r="56" style="fill:var(--accent);opacity:0"/><circle class="gs-d' + k + '" r="20" style="fill:var(--accent);stroke:var(--second);stroke-width:4;opacity:0"/></g>').join('') +
      R.seated('gs', -120) + '<g class="gs-ring">' + R.attn('gs') + '</g><g class="gs-big"><g class="gs-rays">' + rays + '</g><g transform="scale(2)">' + R.star('gs-star') + '</g></g></svg>' +
      '<div class="tag gs-a">לא חייבת להיות משהו גדול או יוצא דופן</div><div class="tag tag-warm gs-b">דברים ממש קטנים</div><div class="tag tag-cool gs-c">שאנחנו לא תמיד עוצרים להעריך</div></div>'));
    Object.assign(this, R.refs(kit, 'gs', ['body', 'head', 'eyes', 'mouth', 'ring', 'big', 'rays', 'a', 'b', 'c']));
    this.g = SPK.map((_, k) => kit.stage.querySelector('.gs-g' + k)); this.d = SPK.map((_, k) => kit.stage.querySelector('.gs-d' + k));
    this.at = SPK.map(([x, y]) => { for (let p = 0; p <= 1; p += 0.005) { const [rx, ry] = PATH(p); if (Math.hypot(x - rx, y - ry) < 130) return p; } return 1; });
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // something big and extraordinary rises... and it isn't needed
    const up = eob(seg(t, 2.2, 2.9), 1.4), gone = eio(seg(t, 3.9, 4.7));
    R.xf(this.big, 720, lerp(380, 330, eio(seg(t, 2.2, 2.9))), up * (1 - 0.8 * gone), eo(seg(t, 2.2, 2.4)) * (1 - gone));
    this.rays.style.opacity = eo(seg(t, 3.1, 3.5));
    this.rays.setAttribute('transform', 'rotate(' + t * 20 + ') scale(' + (1 + 0.05 * Math.sin(t * 6)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 2.4, 3.0)) * (1 - gone) + 4 * Math.sin(t * 0.9) * eio(seg(t, 5.5, 6.5))) + ' 0 30)');
    // the circle drifts through the room; small things light up where it passes
    const sw = eio(seg(t, 5.4, 10.4)), [rx, ry] = PATH(sw);
    R.xf(this.ring, rx, ry, (120 + Math.sin(t * 2.4) * 4) * eob(seg(t, 5.2, 5.7), 1.4), eo(seg(t, 5.2, 5.4)) * (1 - eo(seg(t, 10.5, 11.0))));
    SPK.forEach((_, k) => {
      const lit = t > 5.4 && sw >= this.at[k] ? eo(seg(sw, this.at[k], this.at[k] + 0.05)) : 0;
      this.d[k].style.opacity = lit; this.g[k].style.opacity = 0.35 * lit * (0.8 + 0.2 * Math.sin(t * 3 + k));
    });
    this.mouth.setAttribute('d', t > 6.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)) * (1 - eo(seg(t, 6.6, 6.9))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)));
  },
});
