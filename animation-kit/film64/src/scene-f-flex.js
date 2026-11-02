const { seg, eo, eio, eob, lerp } = kit;
// like a workout: she stretches, and the reed bends and springs back — mental flexibility
kit.scene('f-flex', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(400 962)">' + R.armsFree(R.ruth('fx', 'stand'), 'fx') + '</g><g class="fx-rg">' + R.reedB('fx-r') + '</g></svg>' +
      '<div class="tag fx-gym">כמו באימון גופני</div><div class="tag tag-warm fx-cap">גמישות מחשבתית</div></div>'));
    Object.assign(this, R.refs(kit, 'fx', ['armL', 'armR', 'head', 'eyes', 'mouth', 'rg', 'gym', 'cap']));
    this.stem = kit.stage.querySelector('.fx-r-stem'); this.tip = kit.stage.querySelector('.fx-r-tip');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    // two slow stretches
    const a = Math.max(0, Math.sin(Math.PI * seg(t, 1.2, 2.8))) + Math.max(0, Math.sin(Math.PI * seg(t, 3.0, 4.6)));
    R.raise(this, 0.85 * a);
    this.head.setAttribute('transform', 'rotate(' + (-4 * a) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    // the reed bends with her and springs back
    const pop = eob(seg(t, 0.6, 1.2), 1.6);
    this.rg.setAttribute('transform', 'translate(790 430) scale(' + 1.9 * pop + ')');
    const b = 0.9 * Math.sin(Math.PI * seg(t, 1.2, 2.8)) - 0.7 * Math.sin(Math.PI * seg(t, 3.0, 4.6)) + 0.2 * Math.sin(t * 5) * eo(seg(t, 4.6, 5.0)) * (1 - eo(seg(t, 5.0, 6.0)));
    R.bend(this.stem, this.tip, b);
    R.place(this.gym, 540, lerp(100, 86, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
    R.place(this.cap, 790, lerp(574, 562, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)));
  },
});
