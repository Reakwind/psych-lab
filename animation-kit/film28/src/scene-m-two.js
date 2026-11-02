const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-two', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g class="mt-c0">' + R.frame('mt-f0', 340, 420) + R.tool('mt-b', 1, 100) + '</g><g class="mt-c1">' + R.frame('mt-f1', 340, 420) + '<g transform="translate(0 10) scale(1.1)">' + R.bodyIcon('mt-bi') + '</g></g></svg>' +
      '<div class="tag tag-cool mt-t0">מודעות לנשימה</div><div class="tag tag-warm mt-t1">סריקת גוף</div><div class="tag mt-top">שני תרגילים מוכרים</div></div>'));
    Object.assign(this, R.refs(kit, 'mt', ['c0', 'c1', 't0', 't1', 'top']));
    this.line = kit.stage.querySelector('.mt-bi-line');
  },
  render(t) {
    [[0.3, 760], [1.4, 320]].forEach(([a, x], k) => {
      this['c' + k].setAttribute('transform', 'translate(' + x + ' 470) scale(' + eob(seg(t, a, a + 0.5), 1.5) + ')');
      R.place(this['t' + k], x, lerp(732, 720, eo(seg(t, a + 0.2, a + 0.7))), eo(seg(t, a + 0.2, a + 0.7)));
    });
    this.line.setAttribute('transform', 'translate(0 ' + (Math.sin(t * 1.6) * 110) + ')');
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
  },
});
