const { seg, eo, eio, eob, lerp } = kit;
// not to erase it, argue with it or fix it — but to notice it
const NO = [[1.55, 'להעלים', 840], [3.45, 'להתווכח', 540], [4.7, 'לתקן', 240]];
kit.scene('f-not', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fn', 0) + '</svg>' + R.loud('fn') +
      NO.map((n, k) => '<div class="tag struck fn-n' + k + '">' + n[1] + '</div>').join('') + '<div class="tag tag-warm fn-yes">לשים לב</div></div>'));
    Object.assign(this, R.refs(kit, 'fn', ['body', 'head', 'eyes', 'mouth', 'c', 'bang', 'yes']));
    this.n = NO.map((_, k) => kit.stage.querySelector('.fn-n' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // a hard thought comes back
    const back = eob(seg(t, 0.2, 0.8), 1.4), sh = 3 * (1 - eio(seg(t, 7.0, 8.5)));
    R.put(this.c, 540 + Math.sin(t * 31) * sh, 300 + Math.cos(t * 27) * sh * 0.6, back, Math.sin(t * 23) * sh * 0.3, eo(seg(t, 0.2, 0.5)));
    // erase it? argue? fix it? each idea crossed out
    NO.forEach(([a, , x], k) => {
      const el = this.n[k], o = eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, 6.2, 6.8)));
      R.place(el, x, lerp(100, 88, eo(seg(t, a, a + 0.4))), o);
      el.style.setProperty('--s', eo(seg(t, a + 0.5, a + 0.9)));
    });
    // just notice it: she turns to look, and labels it
    const look = eio(seg(t, 6.6, 7.4));
    this.head.setAttribute('transform', 'rotate(' + (-6 * look) + ' 0 30)');
    R.look(this.eyes, t, 0.7, 3 * look, -3 * look);
    R.put(this.yes, 760, 220, eob(seg(t, 7.0, 7.5), 2), -8, eo(seg(t, 7.0, 7.2)));
    this.mouth.setAttribute('d', 'M-10 ' + lerp(28, 26, look) + ' Q2 ' + lerp(24, 30, look) + ' 14 ' + lerp(28, 26, look));
  },
});
