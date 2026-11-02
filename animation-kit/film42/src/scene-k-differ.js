const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-differ', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) +
      '<path class="kf-div" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:.02 .02;opacity:.45" d="M540 300 V1060"/>' +
      '<g transform="translate(780 990) scale(.9)">' + R.ruth('kf', 'stand') + '<g class="kf-p1" transform="translate(0 -196)">' + R.pot('kf-pa') + '</g></g>' +
      '<g transform="translate(300 990) scale(.9)">' + R.friend('kf-f', 'a') + '<g class="kf-p2" transform="translate(0 -196)">' + R.pot('kf-pb') + '</g></g>' +
      '<g class="kf-w">' + R.warm('kf-wt', 'heart') + '</g><g class="kf-g">' + R.grey('kf-gb', 130) + '</g></svg>' +
      '<div class="tag tag-cool kf-a">לא נראה זהה אצל כולם</div><div class="tag tag-warm kf-b">נעים ותומך</div><div class="tag kf-c">עוד מטלה</div></div>'));
    Object.assign(this, R.refs(kit, 'kf', ['head', 'eyes', 'mouth', 'div', 'p1', 'p2', 'w', 'g', 'a', 'b', 'c']));
    this.fh = kit.stage.querySelector('.kf-f-head'); this.fe = kit.stage.querySelector('.kf-f-eyes'); this.fm = kit.stage.querySelector('.kf-f-mouth');
    this.wg = kit.stage.querySelector('.kf-wt-glow');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.fe, t, 2.2);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
    // the same meal: two people, one pot each
    this.div.style.opacity = 0.45 * eo(seg(t, 4.8, 5.6));
    const pin = eob(seg(t, 5.2, 5.8), 1.5);
    this.p1.setAttribute('transform', 'translate(0 ' + (-196 + Math.sin(t * 2) * 3) + ') scale(' + pin + ')');
    this.p2.setAttribute('transform', 'translate(0 ' + (-196 + Math.sin(t * 2 + 1) * 3) + ') scale(' + pin + ')');
    // for one it feels pleasant and supportive...
    const w = eio(seg(t, 7.8, 8.6));
    R.xf(this.w, 780, lerp(420, 360, w) + Math.sin(t * 2) * 6 * w, 1.15 * eob(seg(t, 7.8, 8.3), 1.6), eo(seg(t, 7.8, 8.0)));
    this.wg.style.opacity = 0.35 * w;
    this.mouth.setAttribute('d', t > 8.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + (-6 * w) + ' 0 30)');
    R.place(this.b, 780, lerp(222, 210, eo(seg(t, 8.0, 8.5))), eo(seg(t, 8.0, 8.5)));
    // ...for another, one more chore
    const g = eio(seg(t, 11.6, 12.3));
    R.xf(this.g, 300, lerp(300, 380, g), eob(seg(t, 11.6, 12.1), 1.4), eo(seg(t, 11.6, 11.8)));
    this.fm.setAttribute('d', t > 11.8 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    this.fh.setAttribute('transform', 'translate(0 ' + 8 * g + ') rotate(' + (5 * g) + ' 0 30)');
    R.place(this.c, 300, lerp(222, 210, eo(seg(t, 11.8, 12.3))), eo(seg(t, 11.8, 12.3)));
  },
});
