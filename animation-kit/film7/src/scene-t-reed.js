const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-reed', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 520) scale(3.4)">' + R.reed('tz2') + '</g></svg><div class="tag tag-warm tz2-cap">גמישות מחשבתית</div></div>'));
    Object.assign(this, R.refs(kit, 'tz2', ['stem', 'cap']));
  },
  render(t) {
    // flexible: it bends in the wind and doesn't break
    this.stem.setAttribute('transform', 'rotate(' + (Math.sin(t * 2.2) * 14) + ' 0 40)');
    R.place(this.cap, 540, lerp(872, 860, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)));
  },
});