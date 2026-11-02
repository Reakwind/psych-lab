const { seg, eo, eio, eob, lerp } = kit;
kit.scene('x-night', {
  init(kit) {
    const worry = R.balloon('x7-bl').replace('fill:color-mix(in srgb, var(--ground) 40%, white)', 'fill:color-mix(in srgb, var(--second) 30%, var(--ground))');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('x7', -120) + '<g class="x7-bw">' + worry + '</g><g class="x7-bt">' + R.battery('x7') + '</g></svg>' +
      '<div class="tag tag-warm x7-a">כשאתם מודאגים ממשהו</div><div class="tag tag-cool x7-c">אחרי לילה שלא ישנתם בו טוב</div><div class="tag tag-red x7-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x7', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'nw', 'mt-fill', 'bw', 'bt', 'fill', 'a', 'c', 'ml']));
  },
  render(t) {
    // worry: a grey thought, tight shoulders, the meter up; after a bad night: dark window, a yawn, a low battery
    const wo = eio(seg(t, 2.4, 3.2)), night = eio(seg(t, 5.0, 5.8)), tired = eo(seg(t, 6.2, 6.8));
    if (night < 0.5) R.blink(this.eyes, t, 0.6); else this.eyes.setAttribute('transform', 'translate(0 4) scale(1 ' + lerp(1, 0.45, tired) + ')');
    this.body.setAttribute('transform', 'translate(0 ' + (6 * wo * (1 - night) + 8 * tired) + ') scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    this.tn.style.opacity = wo * (1 - night) * (0.6 + 0.4 * Math.abs(Math.sin(t * 9))); this.pf.style.opacity = 0;
    R.setG(this.bw, 300, 290 + Math.sin(t * 1.3) * 6, 1.3 * eob(seg(t, 2.4, 2.9), 1.5), eo(seg(t, 2.4, 2.6)) * (1 - eo(seg(t, 4.9, 5.4))));
    this.nw.setAttribute('opacity', night);
    R.setG(this.bt, 680, 730, 0.5 * eob(seg(t, 6.6, 7.1), 1.5), eo(seg(t, 6.6, 6.8))); R.setBattery(this.fill, 0.2);
    R.setMeter(this['mt-fill'], 0.4 + 0.25 * wo + 0.1 * night);
    const yawn = t > 6.5 && t < 7.6;
    this.head.setAttribute('transform', 'rotate(' + (yawn ? -6 : 4 * tired) + ' 0 30) translate(0 ' + 6 * tired + ')');
    this.mouth.setAttribute('d', yawn ? R.mouthYawn : wo > 0.5 ? R.mouthSad : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.56, 2.9))), eo(seg(t, 2.56, 2.9)) * (1 - eo(seg(t, 4.9, 5.2))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 5.23, 5.6))), eo(seg(t, 5.23, 5.6)));
    R.place(this.ml, 920, 886, 1);
  },
});
