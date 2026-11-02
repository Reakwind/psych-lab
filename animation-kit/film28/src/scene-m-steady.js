const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-steady', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<g transform="translate(518 866)">' + R.roots('ms2-a') + '</g><g transform="translate(562 866) scale(-1 1)">' + R.roots('ms2-b') + '</g>' + R.seated('ms2', 0) +
      '<ellipse class="ms2-gb" cx="505" cy="650" rx="70" ry="60" style="fill:var(--accent);opacity:0"/><g class="ms2-bl"><g transform="scale(.9)">' + R.balloon('ms2-x') + '</g></g>' + R.beam('ms2b') + '</svg>' +
      '<div class="tag tag-cool ms2-train">ככל שחוזרים, מאמנים את תשומת הלב</div><div class="tag ms2-body">מה שקורה בגוף</div><div class="tag ms2-mind">ובמחשבות</div>' +
      '<div class="tag tag-warm ms2-less">פחות התנגדות</div><div class="tag tag-warm ms2-more">יותר יציבות</div></div>'));
    Object.assign(this, R.refs(kit, 'ms2', ['body', 'eyes', 'mouth', 'gb', 'bl', 'train', 'body', 'mind', 'less', 'more']));
    this.tb = kit.stage.querySelector('.ms2-body.tag') || kit.stage.querySelectorAll('.ms2-body')[1];
    this.rs = [kit.stage.querySelector('.ms2-a-r'), kit.stage.querySelector('.ms2-b-r')];
    this.b = R.beamRefs(kit, 'ms2b'); this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.2) + ')');
    // with practice the beam wobbles less and less
    const wob = lerp(1, 0.08, eio(seg(t, 1.0, 12.0)));
    R.setBeam(this.b, 505 + 110 * wob * Math.sin(t * 1.7), 560 + 90 * wob * Math.cos(t * 1.3), lerp(200, 260, eio(seg(t, 11.5, 13.5))), 1, 1);
    R.place(this.train, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)) * (1 - eo(seg(t, 11.5, 11.9))));
    // getting to know the body and the mind
    this.gb.style.opacity = eo(seg(t, 8.8, 9.3)) * (0.3 + 0.08 * Math.sin(t * 3)) * (1 - eo(seg(t, 11.6, 12.2)));
    R.place(this.tb, 830, lerp(712, 700, eo(seg(t, 8.8, 9.3))), eo(seg(t, 8.8, 9.3)) * (1 - eo(seg(t, 11.6, 12.0))));
    const m = eob(seg(t, 9.2, 9.7), 1.6) * (1 - eo(seg(t, 11.6, 12.2)));
    this.bl.setAttribute('transform', 'translate(700 ' + (290 + Math.sin(t * 2) * 6) + ') scale(' + m + ')');
    R.place(this.mind, 700, lerp(372, 360, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)) * (1 - eo(seg(t, 11.6, 12.0))));
    // meeting experience with less resistance, more steadiness: roots at her feet
    R.place(this.less, 760, lerp(84, 70, eo(seg(t, 11.9, 12.4))), eo(seg(t, 11.9, 12.4)));
    R.place(this.more, 320, lerp(84, 70, eo(seg(t, 13.2, 13.7))), eo(seg(t, 13.2, 13.7)));
    this.rs.forEach((r) => { r.style.strokeDasharray = eio(seg(t, 13.0, 14.4)) + ' 1'; r.style.opacity = t > 13.0 ? 1 : 0; });
  },
});
