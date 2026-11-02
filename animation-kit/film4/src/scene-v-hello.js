const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('vh', 0) +
      '<g class="vh-vg"><g class="vh-vs">' + R.voice('vh-v') + '</g></g></svg><div class="tag tag-cool vh-title">מפגש 4 · הקול הפנימי</div></div>'));
    Object.assign(this, R.refs(kit, 'vh', ['body', 'head', 'eyes', 'vg', 'vs', 'title']));
    this.v = R.refs(kit, 'vh-v', ['eyes']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.v.eyes, t, 2.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // everyone has one: a small voice pops up by Ruth's head, and she turns to it
    const p = eob(seg(t, 0.8, 1.4), 1.8);
    this.vg.setAttribute('transform', 'translate(720 ' + (400 + Math.sin(t * 2.2) * 8) + ')');
    this.vs.setAttribute('transform', 'scale(' + p + ')');
    this.head.setAttribute('transform', 'rotate(' + (7 * eio(seg(t, 1.3, 1.9))) + ' 0 30)');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)));
  },
});
