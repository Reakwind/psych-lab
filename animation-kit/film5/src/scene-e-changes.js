const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-changes', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ec', 760, []) + '</svg>' +
      '<div class="tag tag-cool ec-cap">האנרגיה יכולה להשתנות</div><div class="tag tag-warm ec-up">ערניים · יציבים · מרוכזים</div><div class="tag ec-down">הכול דורש קצת יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'ec', ['curve', 'cap', 'up', 'down']));
  },
  render(t) {
    // energy across a day, morning (right) to evening (left)
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 4.0, 4.5))), eo(seg(t, 4.0, 4.5)));
    this.curve.style.strokeDasharray = eio(seg(t, 4.2, 9.0)) + ' 1';
    R.place(this.up, 760, lerp(432, 420, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)));
    R.place(this.down, 460, lerp(622, 610, eo(seg(t, 14.7, 15.2))), eo(seg(t, 14.7, 15.2)));
  },
});