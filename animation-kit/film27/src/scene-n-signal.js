const { seg, eo, eio, eob, lerp } = kit;
const S = [[4.2, 'היום מסתיים'], [6.15, 'אפשר להוריד קצב'], [8.3, 'אפשר להתחיל לנוח']];
kit.scene('n-signal', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.eveRoom('ng', -120, 700) + '</svg>' +
      '<div class="tag tag-cool ng-top">סימן לגוף ולמוח</div>' + S.map((s, k) => '<div class="tag ' + (k === 2 ? 'tag-warm ' : 'tag-night ') + 'ng-t' + k + '">' + s[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'ng', ['body', 'head', 'eyes', 'mouth', 'top', 't0', 't1', 't2']));
    this.e = R.eveRefs(kit, 'ng');
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
    // each step down: night comes in at the window, the lamp lowers, she lets go
    const s0 = eio(seg(t, 4.2, 5.2)), s1 = eio(seg(t, 6.2, 7.2)), s2 = eio(seg(t, 8.3, 9.3));
    R.setEve(this.e, 1, lerp(0.45, 1, s0), 0.45 + 0.2 * s0 + 0.2 * s1 + 0.15 * s2, 0.7 - 0.2 * s0 - 0.2 * s1 - 0.1 * s2);
    S.forEach(([a], k) => R.place(this['t' + k], 760, lerp(176 + k * 90, 164 + k * 90, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
    if (t > 9.6) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else if (t > 8.4) this.eyes.setAttribute('transform', 'translate(0 -1) scale(1 .55)'); else R.blink(this.eyes, t, 0.4);
    this.head.setAttribute('transform', 'rotate(' + (5 * s1 + 4 * s2) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
