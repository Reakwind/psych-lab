const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-tremor', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.overhead('ar') + '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop('ar') + '</g>' +
      '<g class="ar-tg">' + R.tremor('ar') + '</g><path class="ar-stiff ink" style="stroke-width:6;opacity:0" d="M330 420 l-14 -22 M356 414 l-6 -26 M384 418 l4 -26"/>' +
      '<g class="ar-hg">' + R.hourglass('ar-h') + '</g><path class="ar-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round" d="M230 790 L370 990 M370 790 L230 990"/></svg>' +
      '<div class="tag ar-what">רעד · נוקשות · תנועות</div><div class="tag tag-warm ar-ok">וזה בסדר</div><div class="tag tag-cool ar-wait">לא צריך לחכות שייעלמו</div></div>'));
    Object.assign(this, R.refs(kit, 'ar', ['tg', 'stiff', 'hg', 'x', 'what', 'ok', 'wait']));
    this.eyes = kit.stage.querySelector('.ar-eyes');
  },
  render(t) {
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    // during practice the tremor and stiffness may stay
    const tr = eo(seg(t, 2.3, 2.7));
    this.tg.style.opacity = tr; this.tg.setAttribute('transform', 'translate(' + (548 + Math.sin(t * 40) * 3) + ' 430) rotate(-90)');
    this.stiff.style.opacity = 0.7 * eo(seg(t, 2.8, 3.2));
    R.place(this.what, 540, lerp(212, 200, eo(seg(t, 2.5, 3.0))), eo(seg(t, 2.5, 3.0)));
    R.place(this.ok, 540, lerp(84, 70, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)));
    // no need to wait for them to stop: the hourglass is crossed out
    const h = eob(seg(t, 6.8, 7.4), 1.5), flip = eio(seg(t, 7.6, 8.3));
    this.hg.setAttribute('transform', 'translate(300 890) scale(' + h * 0.85 + ') rotate(' + flip * 180 + ')');
    this.x.style.strokeDasharray = eo(seg(t, 9.0, 9.5)) + ' 1'; this.x.style.opacity = t > 9.0 ? 1 : 0;
    R.place(this.wait, 700, lerp(870, 858, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)));
  },
});
