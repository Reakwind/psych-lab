const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-pills', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ep', 760, [975, 760, 480]) + '</svg>' +
      '<div class="tag tag-cool ep-cap">האנרגיה יכולה להשתנות</div><div class="tag tag-warm ep-up">ערניים · יציבים · מרוכזים</div><div class="tag ep-down">הכול דורש קצת יותר</div><div class="tag tag-warm ep-pills">זמני התרופות</div></div>'));
    Object.assign(this, R.refs(kit, 'ep', ['curve', 'pill0', 'pill1', 'pill2', 'cap', 'up', 'down', 'pills']));
  },
  render(t) {
    this.curve.style.strokeDasharray = '1 0';
    R.place(this.cap, 540, 70, 1); R.place(this.up, 760, 420, 1 - eo(seg(t, 0.4, 0.8))); R.place(this.down, 460, 610, 1 - eo(seg(t, 0.4, 0.8)));
    // sometimes it follows the timing of the pills
    [this.pill0, this.pill1, this.pill2].forEach((el, k) => el.setAttribute('transform', 'translate(' + [975, 760, 480][k] + ' 806) scale(' + eob(seg(t, 0.9 + k * 0.25, 1.4 + k * 0.25), 2) + ')'));
    R.place(this.pills, 760, lerp(872, 860, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)));
  },
});