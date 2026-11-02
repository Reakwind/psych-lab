const { seg, eo, eio, eob, lerp } = kit;
// let's see how it works: say today you really don't want to exercise; even starting feels like too much
kit.scene('z-exercise', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.gym('ze', -150) + '</svg>' +
      '<div class="tag ze-a">נניח שהיום אתם ממש לא רוצים להתאמן</div><div class="tag tag-warm ze-b">אפילו להתחיל מרגיש יותר מדי</div></div>'));
    Object.assign(this, R.refs(kit, 'ze', ['body', 'head', 'eyes', 'mouth', 'db', 'mat-flat', 'mat-roll', 'a', 'b']));
  },
  render(t) {
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, 0);
    this.body.setAttribute('transform', 'translate(0 ' + 6 * eio(seg(t, 6.0, 7.0)) + ') scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    // the dumbbell by the mat grows and grows: too much
    const big = eio(seg(t, 6.06, 8.4));
    this.db.setAttribute('transform', 'translate(' + lerp(640, 720, big) + ' ' + lerp(905, 800, big) + ') scale(' + lerp(1, 2.6, big) + ')');
    R.look(this.eyes, t, 0.6, t > 4.6 ? 4 : 0, t > 4.6 ? 2 : 0);
    this.head.setAttribute('transform', 'rotate(' + (t > 4.6 ? -8 * eio(seg(t, 6.0, 7.2)) : 0) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.2 ? R.SAD : t > 4.6 ? R.FLAT : R.SMILE);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.87, 3.3))), eo(seg(t, 2.87, 3.3)));
    R.place(this.b, 540, lerp(164, 150, eo(seg(t, 6.06, 6.5))), eo(seg(t, 6.06, 6.5)));
  },
});
