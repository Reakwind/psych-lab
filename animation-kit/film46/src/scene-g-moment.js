const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-moment', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gm', -120) + R.dayBar('gm', 220) + R.dayItems('gm') +
      '<g class="gm-up">' + R.warm('gm-u', 'heart') + '</g></svg><div class="tag tag-warm gm-a">רגע קטן של הכרת תודה</div></div>'));
    Object.assign(this, R.refs(kit, 'gm', ['body', 'head', 'eyes', 'mouth', 'up', 'a']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.gm-i' + i)); this.ug = kit.stage.querySelector('.gm-u-glow');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.off = R.dayStop(900, 540)[0];
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    R.placeDay(this.it, 220, this.off + 40 * t);
    R.xf(this.up, 600, 640 + Math.sin(t * 2) * 5, 1.2, 1);
    this.ug.style.opacity = 0.45 * (0.85 + 0.15 * Math.sin(t * 3));
    this.head.setAttribute('transform', 'rotate(' + (5 * eio(seg(t, 0.2, 1.0))) + ' 0 30)');
    R.place(this.a, 540, lerp(342, 330, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)));
  },
});
