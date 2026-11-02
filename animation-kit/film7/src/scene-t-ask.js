const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tak', -150) +
      '<g class="tak-pz"><circle r="60" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/><rect x="-22" y="-26" width="14" height="52" rx="5" class="metal"/><rect x="8" y="-26" width="14" height="52" rx="5" class="metal"/></g></svg>' +
      '<div class="thought sm tak-q1">מה המחשבה שעוברת לי בראש עכשיו?</div><div class="thought sm kind tak-q2">היא עובדה, או הפרשנות שלי?</div></div>'));
    Object.assign(this, R.refs(kit, 'tak', ['body', 'head', 'eyes', 'pz', 'q1', 'q2']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.4) + ')');
    // pause, and ask two questions
    this.pz.setAttribute('transform', 'translate(350 300) scale(' + eob(seg(t, 0.5, 1.0), 1.8) * (1 - eo(seg(t, 2.0, 2.4))) + ')');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 1.8, 2.4))) + ' 0 30)');
    R.put(this.q1, 760, lerp(300, 280, eo(seg(t, 1.9, 2.4))), eob(seg(t, 1.9, 2.4), 1.3), 0, eo(seg(t, 1.9, 2.1)));
    R.put(this.q2, 760, lerp(560, 540, eo(seg(t, 6.0, 6.5))), eob(seg(t, 6.0, 6.5), 1.3), 0, eo(seg(t, 6.0, 6.2)));
  },
});