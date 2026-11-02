const { seg, eo, eio, eob, lerp } = kit;
kit.scene('c-invite', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ci', -150) + '<g class="ci-ph">' + R.invite('ci-i') + '</g></svg>' +
      '<div class="tag tag-warm ci-cap">קצת יותר קשה להגיד כן</div></div>'));
    Object.assign(this, R.refs(kit, 'ci', ['head', 'eyes', 'mouth', 'body', 'ph', 'cap']));
    this.yes = kit.stage.querySelector('.ci-i-yes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // next time an invitation comes, "yes" is a bit harder: the button drifts away and greys
    const p = eob(seg(t, 0.5, 1.1), 1.5), buzz = t > 1.0 && t < 2.0 ? Math.sin(t * 60) * 4 : 0;
    this.ph.setAttribute('transform', 'translate(' + (720 + buzz) + ' 470) rotate(' + (6 + buzz * 0.3) + ') scale(' + 1.25 * p + ')'); this.ph.style.opacity = eo(seg(t, 0.5, 0.8));
    const hard = eio(seg(t, 3.4, 5.4));
    this.yes.style.fill = 'color-mix(in srgb, #6FAE7A ' + Math.round(100 - 70 * hard) + '%, var(--ground))';
    this.yes.setAttribute('transform', 'translate(' + (30 * hard) + ' ' + (12 * hard) + ') scale(' + (1 - 0.25 * hard) + ')');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 0.8, 1.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.4 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)));
  },
});
