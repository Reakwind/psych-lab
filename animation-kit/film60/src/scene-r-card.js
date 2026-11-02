const { seg, eo, eio, eob, lerp } = kit;
// the role and the way it's filled are two different things: one card, two layers
kit.scene('r-card', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' +
      '<g transform="translate(200 1000) scale(.9)">' + R.ruth('rc', 'stand') + '</g><g class="rc-g">' + R.roleCard('rc') + '</g></svg>' +
      '<div class="lyr rc-top">התפקיד עצמו</div><div class="lyr rc-way" style="font-size:36px">הדרך שבה אנחנו ממלאים אותו</div><div class="tag tag-warm rc-cap">יש הבדל</div></div>'));
    Object.assign(this, R.refs(kit, 'rc', ['head', 'eyes', 'mouth', 'g', 'way', 'top', 'cap']));
    this.wayT = kit.stage.querySelector('div.rc-way'); this.wayP = kit.stage.querySelector('path.rc-way');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    const a = eob(seg(t, 0.3, 1.0), 1.4), split = eio(seg(t, 2.6, 3.4));
    this.g.setAttribute('transform', 'translate(640 480) scale(' + (0.6 + 0.4 * a) + ')'); this.g.style.opacity = eo(seg(t, 0.3, 0.6));
    this.wayP.setAttribute('d', R.wayPath(0));
    this.wayP.setAttribute('transform', 'translate(0 ' + (-150 * (1 - split)) + ')'); this.wayP.style.opacity = split;
    R.put(this.top, 640, 376, 1, 0, eo(seg(t, 1.5, 2.0)));
    R.put(this.wayT, 640, 564, 1, 0, eo(seg(t, 3.0, 3.5)));
    R.place(this.cap, 640, lerp(184, 170, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    this.head.setAttribute('transform', 'rotate(-8 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
  },
});
