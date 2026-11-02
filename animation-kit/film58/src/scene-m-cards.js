const { seg, eo, eio, eob, lerp } = kit;
const QY = [520, 660, 800];
kit.scene('m-cards', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mc', 0) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' +
      '<g class="mc-strip">' + [970, 838, 706, 574].map((x, k) => '<g transform="translate(' + x + ' 250)">' + R.task('mc-b' + k, 116, 66) + '</g>').join('') + '</g>' +
      '<path class="mc-link ink" pathLength="1" style="stroke:var(--accent);stroke-width:8;stroke-dasharray:.03 .025" d="M372 400 C440 300 500 260 560 250"/></svg>' +
      '<div class="mc-move" style="position:absolute;inset:0"><svg class="art" viewBox="0 0 1080 1080">' + R.bigPhone('mc') + '<g transform="translate(540 330)">' + R.matter('mc-m', 0, 80) + '</g></svg>' +
      QY.map((y, k) => '<div class="q ph mc-q' + k + '">?</div>').join('') + '</div>' +
      '<div class="tag tag-warm mc-cap">איך הוא פוגש את החיים שלנו עכשיו</div></div>'));
    Object.assign(this, R.refs(kit, 'mc', ['move', 'strip', 'link', 'cap', 'm']));
    this.q = [0, 1, 2].map((k) => kit.stage.querySelector('.mc-q' + k));
    this.glow = kit.stage.querySelector('.mc-m-glow');
  },
  render(t) {
    // the app: short questions to reconnect with what matters
    const up = eio(seg(t, 0.2, 1.1)), aside = eio(seg(t, 6.6, 7.6));
    this.move.style.transform = 'translate(' + (-250 * aside) + 'px,' + (lerp(1000, 0, up) - 30 * aside) + 'px) scale(' + (1 - 0.38 * aside) + ')';
    QY.forEach((y, k) => { const a = 2.1 + k * 0.35, p = seg(t, a, a + 0.5); R.put(this.q[k], 540, y + (1 - eo(p)) * 40, eob(p, 1.4), 0, eo(seg(t, a, a + 0.25))); });
    this.glow.setAttribute('opacity', 0.5 * eo(seg(t, 3.9, 4.6)) * (0.8 + 0.2 * Math.sin(t * 2)));
    // ... and to see how it meets her days now
    this.strip.setAttribute('transform', 'translate(' + (600 * (1 - eio(seg(t, 6.9, 7.8)))) + ' 0)');
    const l = eo(seg(t, 7.6, 8.6));
    this.link.style.strokeDashoffset = (-t * 0.08).toFixed(3); this.link.style.opacity = l > 0 ? l : 0;
    this.link.setAttribute('d', 'M360 400 C430 320 470 270 ' + lerp(360, 512, l) + ' ' + lerp(400, 250, l));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.9, 7.4))), eo(seg(t, 6.9, 7.4)));
  },
});
