const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="ah-cam">' + R.room({}) + R.seated('ah', 0) +
      R.phone('ahp', 561, 654, 'ariel') + '<ellipse class="skin" cx="526" cy="700" rx="14" ry="12"/><ellipse class="skin" cx="596" cy="700" rx="14" ry="12"/></g></svg>' +
      '<div class="tag tag-cool ah-title">מפגש 3 · תרגול עם פרקינסון</div><div class="tag ah-hi">היי, אני אריאל</div><div class="tag tag-warm ah-who">פסיכולוג קליני · מורה למיינדפולנס</div></div>'));
    Object.assign(this, R.refs(kit, 'ah', ['cam', 'body', 'head', 'eyes', 'title', 'hi', 'who']));
    this.g = R.refs(kit, 'ahp-g', ['head', 'eyes']);
  },
  render(t) {
    // Ruth's phone lights up with a new guide; the camera moves in to meet him
    const push = eio(seg(t, 0.7, 2.4)), z = lerp(1, 2.2, push), fx = lerp(540, 561, push), fy = lerp(560, 630, push);
    this.cam.setAttribute('transform', 'translate(540 540) scale(' + z + ') translate(' + (-fx) + ' ' + (-fy) + ')');
    R.blink(this.eyes, t, 0.7); R.blink(this.g.eyes, t, 2.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 0.2, 0.9))) + ' 0 30) translate(0 ' + 4 * eio(seg(t, 0.2, 0.9)) + ')');
    this.g.head.setAttribute('transform', 'rotate(' + (5 * Math.sin(t * 1.4)) + ' 0 30)');
    R.place(this.title, 540, 70, 1 - eo(seg(t, 1.8, 2.3)));
    R.place(this.hi, 830, lerp(420, 408, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)));
    R.place(this.who, 540, lerp(950, 938, eo(seg(t, 2.1, 2.6))), eo(seg(t, 2.1, 2.6)));
  },
});
