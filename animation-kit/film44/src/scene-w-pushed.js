const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-pushed', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wp', 0) + R.dayBar('wp', 220) +
      '<g class="wp-w0">' + R.warm('wp-t0', 'mug') + '</g><g class="wp-w1">' + R.warm('wp-t1', 'note') + '</g><g class="wp-w2">' + R.warm('wp-t2', 'people') + '</g><g class="wp-g">' + R.grey('wp-gb', 150) + '</g></svg>' +
      '<div class="tag tag-cool wp-a">דווקא הם הראשונים שיידחקו הצידה</div></div>'));
    Object.assign(this, R.refs(kit, 'wp', ['body', 'head', 'eyes', 'mouth', 'w0', 'w1', 'w2', 'g', 'a']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // a grey block shoves in from the morning side and pushes the good things along, the last one off the end
    const g = eio(seg(t, 2.5, 3.6)), off = eio(seg(t, 3.6, 4.6));
    R.xf(this.g, lerp(1200, 830, g), 220);
    const push = (x0, d) => Math.min(x0, lerp(1200, 830, g) - d);
    R.xf(this.w0, push(830, 120), 220);
    R.xf(this.w1, push(540, 230), 220);
    R.xf(this.w2, lerp(push(250, 340), -60, off), 220 + 500 * off * off, 1, 1 - eo(seg(t, 4.2, 4.8)));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 2.6, 3.2)) - 16 * off) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.6 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
  },
});
