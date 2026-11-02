const { seg, eo, eio, eob, lerp } = kit;
// whatever way you chose: no grades; be generous with yourselves; credit for the effort and the choice — small steps count too
const CX = 850, CY = 230, TN = [700, 1010];
kit.scene('y-grade', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bigLand('yg', { sun: true, sunX: 300, sunY: 400 }) +
      '<circle class="yg-warm" cx="' + TN[0] + '" cy="820" r="230" style="fill:var(--accent)" opacity="0"/>' +
      '<g transform="translate(' + TN[0] + ' ' + TN[1] + ')">' + R.stone('yg-tn', 0, 0, 70) + '</g>' +
      '<g class="yg-w" transform="translate(' + TN[0] + ' ' + (TN[1] + 6) + ') scale(.82)">' + R.ruthBack('yg', false) + '</g>' +
      '<g transform="translate(' + CX + ' ' + CY + ')">' + R.compass('yg-c', 90) + '</g>' +
      '<g class="yg-card">' + R.grades('yg-gr') + '</g><g class="yg-h">' + R.heart('yg-hh', 2.2) + '</g>' +
      '<g class="yg-s0">' + R.star('yg-st0') + '</g><g class="yg-s1">' + R.star('yg-st1') + '</g></svg>' +
      '<div class="tag struck yg-a">לחלק לעצמנו ציונים</div><div class="tag tag-warm yg-b">להיות נדיבים כלפי עצמנו</div>' +
      '<div class="tag yg-e">קרדיט על המאמץ</div><div class="tag yg-f">ועל הבחירה</div><div class="tag tag-warm yg-g">גם צעדים קטנים נחשבים</div></div>'));
    Object.assign(this, R.refs(kit, 'yg', ['warm', 'tn-top', 'c-needle', 'card', 'h', 's0', 's1', 'a', 'b', 'e', 'f', 'g']));
    this.top = [1, 2].map((k) => kit.stage.querySelector('.yg-st' + k + '-top'));
  },
  render(t) {
    const lit = (el, p) => { el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * p) + '%, var(--ground))'; };
    const small = Math.sin(Math.PI * seg(t, 10.7, 12.3));
    lit(this.top[0], 1); lit(this.top[1], 1); lit(this['tn-top'], 1);
    this['tn-top'].style.filter = 'brightness(' + (1 + 0.25 * small) + ')';
    this['c-needle'].setAttribute('transform', 'rotate(' + (R.aim(CX, CY, TN[0], TN[1]) + 3 * Math.sin(t * 2)) + ')');
    // a card of grades floats in, gets struck off and drifts away
    const c = eob(seg(t, 2.6, 3.2), 1.4), gone = eio(seg(t, 4.6, 5.4));
    this.card.setAttribute('transform', 'translate(' + lerp(380, -200, gone) + ' ' + (440 + 6 * Math.sin(t * 1.5)) + ') rotate(' + (-6 - 20 * gone) + ') scale(' + Math.max(0.001, 0.9 * c) + ')');
    this.card.style.opacity = c > 0.01 ? 1 - gone : 0;
    // generous with herself: a warm glow and a heart
    const w = eo(seg(t, 5.6, 6.4));
    this.warm.setAttribute('opacity', 0.22 * w + 0.05 * w * Math.sin(t * 2));
    const h = eob(seg(t, 5.7, 6.3), 1.6);
    this.h.setAttribute('transform', 'translate(' + TN[0] + ' ' + (560 + 8 * Math.sin(t * 2)) + ') scale(' + Math.max(0.001, h) + ')');
    // two stars: the effort, the choice
    [[8.55, 520], [9.38, 880]].forEach(([a, x], k) => { const p = eob(seg(t, a, a + 0.5), 1.8); this['s' + k].setAttribute('transform', 'translate(' + x + ' ' + (640 + 6 * Math.sin(t * 2 + k)) + ') rotate(' + 10 * Math.sin(t + k) + ') scale(' + Math.max(0.001, 0.8 * p) + ')'); });
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, 380, lerp(232, 220, eo(seg(t, 3.45, 3.9))), o(3.45, 4.8)); this.a.style.setProperty('--s', eo(seg(t, 4.0, 4.5)));
    R.place(this.b, 380, lerp(92, 80, eo(seg(t, 5.6, 6.0))), o(5.6, 99));
    R.place(this.e, 380, lerp(172, 160, eo(seg(t, 7.81, 8.2))), o(7.81, 99));
    R.place(this.f, 380, lerp(252, 240, eo(seg(t, 9.38, 9.8))), o(9.38, 99));
    R.place(this.g, 380, lerp(342, 330, eo(seg(t, 10.67, 11.1))), o(10.67, 99));
  },
});
