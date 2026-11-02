const { seg, eo, eio, eob, lerp } = kit;
kit.scene('w-noproject', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="wj-cb">' + R.clipboard('wj-c') + '</g></svg>' +
      '<div class="tag tag-cool wj-a">חשוב לי להדגיש</div><div class="tag struck wj-p">עוד פרויקט</div><div class="tag struck wj-m">עוד איזו משימה</div></div>'));
    Object.assign(this, R.refs(kit, 'wj', ['cb', 'a', 'p', 'm']));
  },
  render(t) {
    this.cb.setAttribute('transform', 'translate(540 600) scale(' + 1.3 * eob(seg(t, 0.3, 0.9), 1.4) + ') rotate(' + Math.sin(t * 1.2) * 2 + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.3, 1.8))), eo(seg(t, 1.3, 1.8)));
    // we are not looking for another project, another task
    R.place(this.p, 540, lerp(472, 460, eo(seg(t, 3.4, 3.9))), eo(seg(t, 3.4, 3.9))); this.p.style.setProperty('--s', eio(seg(t, 4.0, 4.6)));
    R.place(this.m, 540, lerp(612, 600, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3))); this.m.style.setProperty('--s', eio(seg(t, 5.4, 6.0)));
  },
});
