const { seg, eo, eio, eob, lerp } = kit;
// with practice it gets better: turning attention, steadying it, widening it
const ST = [[2.9, 'להפנות', 850], [3.7, 'לייצב', 540], [4.25, 'להרחיב', 230]];
kit.scene('h-train', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('ht') + '</svg>' +
      ST.map((s, k) => '<div class="tag tag-warm ht-s' + k + '">' + s[1] + '</div>').join('') + '</div>'));
    this.A = R.attnRefs(kit, 'ht'); this.s = [0, 1, 2].map((k) => kit.stage.querySelector('.ht-s' + k));
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')'); A.lf.setAttribute('transform', 'scale(1)');
    R.worryAt(A, R.SPOT.worry[0], R.SPOT.worry[1], eo(seg(t, 0, 0.6)), t);
    // the circle starts on the worry, wobbling; she turns it, steadies it, widens it
    const turn = eio(seg(t, 2.9, 3.7)), steady = eo(seg(t, 3.7, 4.3)), wide = eio(seg(t, 4.3, 5.8));
    const x = lerp(R.SPOT.worry[0], 500, turn), y = lerp(R.SPOT.worry[1] + 20, 560, turn);
    R.ring(A, lerp(x, 520, wide), lerp(y, 540, wide), lerp(lerp(170, 220, turn), 520, wide), eo(seg(t, 0.3, 1.0)), t, 1 - steady);
    A.ring.style.opacity = eo(seg(t, 0.3, 1.0)) * (1 + 0.0 * t);
    const glowRim = 0.6 + 0.4 * Math.max(0, Math.sin(Math.PI * seg(t, 6.0, 7.2)));
    A.ring.lastChild.style.strokeWidth = (0.022 * (1 + glowRim)) + '';
    A.head.setAttribute('transform', 'rotate(' + lerp(-8, 2, turn) + ' 0 30)'); R.look(A.eyes, t, 0.6, lerp(4, 0, turn), 0);
    A.mouth.setAttribute('d', turn > 0.5 ? R.SMILE : R.FLAT);
    ST.forEach(([a, , x], k) => R.place(this.s[k], x, lerp(98, 86, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
