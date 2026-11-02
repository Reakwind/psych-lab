const { seg, eo, eio, eob, lerp } = kit;
// the steps themselves: each of us chooses in our own life, by what matters to us and what is possible for us now
const P = [[820, 'a', [990, 640]], [540, null, [540, 420]], [260, 'b', [90, 640]]];
kit.scene('y-own', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('yo', { sun: true, sunX: 880, sunY: 260 }) +
      P.map((p, k) => R.stone('yo-g' + k, p[2][0], p[2][1], 64)).join('') +
      P.map((p, k) => '<g transform="translate(' + p[0] + ' 1030) scale(.72)">' + (p[1] ? R.friendBack('yo-p' + k, p[1]) : R.ruthBack('yo-p' + k, false)) + '</g>').join('') +
      P.map((p, k) => '<g transform="translate(' + p[0] + ' 556)">' + R.compass('yo-c' + k, 58) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm yo-a">כל אחד בוחר בחיים שלו</div><div class="tag yo-b">לפי מה שחשוב לו</div><div class="tag yo-c">ומה שאפשרי עבורו עכשיו</div></div>'));
    kit.css('.yo-st0,.yo-st1,.yo-st2,.yo-st3,.yo-st4,.yo-st5,.yo-st6,.yo-st7,.yo-st8,.yo-st9,.yo-st10{display:none}');
    Object.assign(this, R.refs(kit, 'yo', ['a', 'b', 'c']));
    this.n = P.map((p, k) => kit.stage.querySelector('.yo-c' + k + '-needle')); this.g = P.map((p, k) => kit.stage.querySelector('.yo-g' + k + '-top'));
  },
  render(t) {
    P.forEach(([x, , tg], k) => {
      const turn = eio(seg(t, 1.7 + k * 0.25, 2.6 + k * 0.25));
      this.n[k].setAttribute('transform', 'rotate(' + (lerp(0, R.aim(x, 556, tg[0], tg[1]), turn) + 3 * Math.sin(t * 2 + k)) + ')');
      const l = eo(seg(t, 2.5 + k * 0.25, 2.9 + k * 0.25));
      this.g[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * l) + '%, var(--ground))';
    });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.64, 2.0))), eo(seg(t, 1.64, 2.0)));
    R.place(this.b, 540, lerp(164, 150, eo(seg(t, 3.53, 3.9))), eo(seg(t, 3.53, 3.9)));
    R.place(this.c, 540, lerp(244, 230, eo(seg(t, 4.84, 5.2))), eo(seg(t, 4.84, 5.2)));
  },
});
