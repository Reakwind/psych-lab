const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190];
kit.scene('w-full', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('wf', -60) + R.dayBar('wf', 220) +
      X.map((x, k) => '<g transform="translate(' + x + ' 220)">' + R.grey('wf-g' + k, k ? 136 : 150) + '</g>').join('') +
      [750, 590, 430].map((x, k) => '<g transform="translate(' + x + ' 146) scale(.95)">' + R.grey('wf-p' + k, 130) + '</g>').join('') +
      '<g transform="translate(880 400) scale(.9)">' + R.clock('wf-c') + '</g></svg>' +
      '<div class="tag tag-cool wf-a">היום מתמלא</div><div class="tag wf-b">ולא מספיקים לקחת כמה דקות לעצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'wf', ['body', 'head', 'eyes', 'mouth', 'a', 'b']));
    this.ch = kit.stage.querySelector('.wf-c-h'); this.cm = kit.stage.querySelector('.wf-c-m');
    this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'translate(0 10) scale(1 ' + (kit.breathe(t, 0.008, 3.6) - 0.03) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 - 14 * eio(seg(t, 0.6, 1.2))) + ' 0 30) translate(0 10)');
    // the hours race by
    const m = t * 220 * (0.4 + eio(seg(t, 0.5, 1.5)));
    this.cm.setAttribute('transform', 'rotate(' + m + ')'); this.ch.setAttribute('transform', 'rotate(' + m / 12 + ')');
    R.place(this.a, 540, lerp(312, 300, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)));
  },
});
