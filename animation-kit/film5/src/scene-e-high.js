const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-high', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.chair() + '<g transform="translate(330 962) scale(-1 1)">' + R.ruth('eg', 'water') + '</g>' +
      '<g class="eg-drops">' + [0, 1, 2].map((k) => '<ellipse class="eg-d' + k + ' glass" rx="7" ry="11" style="fill:color-mix(in srgb, var(--main) 50%, var(--ground))"/>').join('') + '</g>' +
      '<g transform="translate(860 360) scale(1.1)">' + R.battery('eg') + '</g></svg>' +
      '<div class="tag tag-cool eg-a">יש יותר אנרגיה</div><div class="tag tag-warm eg-b">זמן טוב למשימה שדורשת יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'eg', ['eyes', 'mouth', 'fill', 'a', 'b', 'd0', 'd1', 'd2']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    R.setBattery(this.fill, lerp(0.6, 0.86, eio(seg(t, 0.3, 1.2))));
    // with more energy, she takes on the bigger job
    [this.d0, this.d1, this.d2].forEach((el, k) => { const p = ((t * 1.4 + k / 3) % 1); el.setAttribute('cx', 110 - p * 20); el.setAttribute('cy', 700 + p * 70); el.style.opacity = t > 2.0 ? 1 - p : 0; });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 4.5, 4.8))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3)));
  },
});