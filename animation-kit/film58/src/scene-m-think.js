const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-think', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mk', 0) +
      '<rect class="mk-veil" width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' +
      '<g class="mk-trail"><circle class="light" cx="590" cy="400" r="14" style="stroke:var(--second);stroke-width:4"/><circle class="light" cx="626" cy="356" r="20" style="stroke:var(--second);stroke-width:4"/></g>' +
      '<g class="mk-cloud"><g transform="translate(-540 -300)">' + R.cloud('mk-c') + '</g></g>' + R.matter('mk-m', 0, 84) + '</svg>' +
      '<div class="tag tag-cool mk-cap">משהו שבאמת חשוב לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'mk', ['head', 'eyes', 'mouth', 'body', 'veil', 'trail', 'cloud', 'm', 'cap']));
    this.glow = kit.stage.querySelector('.mk-m-glow');
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.2) + ')');
    this.veil.setAttribute('opacity', 0.28 * (1 - eio(seg(t, 0.0, 0.9))));
    // she closes her eyes and holds it in mind; the badge rests in a thought bubble while Ariel leaves a long quiet pause
    const closed = t > 1.4 && t < 7.6;
    this.eyes.setAttribute('transform', closed ? 'translate(0 -2) scale(1 .15)' : '');
    const c = eob(seg(t, 0.4, 1.2), 1.4);
    this.cloud.setAttribute('transform', 'translate(760 250) scale(' + 0.42 * c + ')'); this.cloud.style.opacity = eo(seg(t, 0.4, 0.8));
    this.trail.style.opacity = eo(seg(t, 0.2, 0.6));
    this.m.setAttribute('transform', 'translate(' + lerp(780, 760, eio(seg(t, 0, 1.0))) + ' ' + (lerp(470, 262, eio(seg(t, 0, 1.0))) + Math.sin(t * 1.1) * 6) + ')');
    this.glow.setAttribute('opacity', 0.25 + 0.2 * Math.sin(t * 1.5));
    this.head.setAttribute('transform', 'rotate(' + (4 * eio(seg(t, 0.6, 1.6))) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
  },
});
