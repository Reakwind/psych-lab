const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-you', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x6', -120) +
      '<g transform="translate(468 676) scale(1.25) rotate(-8)">' + R.phone('x6p', 0, 0, 'ariel') + '</g><g class="x6-tr" transform="translate(500 742)">' + R.tremor('x6-trm') + '</g>' +
      '<path class="x6-ar" d="M600 640 H850" style="fill:none;stroke:var(--second);stroke-width:7;stroke-dasharray:14 12;stroke-linecap:round"/><path class="x6-ah" d="M626 618 L600 640 L626 662 M824 618 L850 640 L824 662" style="fill:none;stroke:var(--second);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>' +
      '<g class="x6-bw">' + R.balloon('x6-bl') + '</g></svg>' +
      '<div class="tag tag-warm x6-a">איך זה אצלכם?</div><div class="tag tag-cool x6-c">מתח נפשי משפיע על הסימפטומים?</div><div class="tag tag-red x6-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x6', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'tr', 'ar', 'ah', 'bw', 'a', 'c', 'ml']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // Ariel, on her phone, invites her to look at her own pattern: does stress touch her symptoms?
    const lk = eo(seg(t, 4.0, 4.6));
    this.ar.style.opacity = lk; this.ah.style.opacity = lk; this.ar.style.strokeDashoffset = (-t * 30).toFixed(1);
    this.tr.setAttribute('transform', 'translate(' + (352 + Math.sin(t * 30) * 2 * lk) + ' 712) scale(-1.3 1.3)'); this.tr.style.opacity = lk;
    R.setMeter(this['mt-fill'], 0.45 + 0.1 * Math.sin(t * 2) * lk);
    R.setG(this.bw, 300, 300 + Math.sin(t * 1.4) * 6, 1.2 * eob(seg(t, 7.0, 7.5), 1.5), eo(seg(t, 7.0, 7.2)));
    this.head.setAttribute('transform', 'rotate(' + (t < 6.9 ? 8 * eio(seg(t, 0.4, 1.2)) : lerp(8, -8, eio(seg(t, 6.9, 7.8)))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.a, 380, lerp(342, 330, eo(seg(t, 2.72, 3.1))), eo(seg(t, 2.72, 3.1)) * (1 - eo(seg(t, 6.6, 6.9))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 4.1, 4.5))), eo(seg(t, 4.1, 4.5)));
    R.place(this.ml, 920, 886, 1);
  },
});
