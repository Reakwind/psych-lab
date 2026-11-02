const { seg, eo, eio, eob, lerp } = kit;
const C = [['מחשבה', 820, ''], ['רגש', 540, ''], ['מעשה', 260, 'kind']];
kit.scene('t-notpos', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<path class="tm-a0 ink" style="stroke-width:10" d="M690 600 H660 M680 580 L660 600 L680 620"/><path class="tm-a1 ink" style="stroke-width:10" d="M410 600 H390 M410 580 L390 600 L410 620"/></svg>' +
      C.map((c, k) => '<div class="thought xs ' + c[2] + ' tm-c' + k + '" style="width:220px">' + c[0] + '</div>').join('') +
      '<div class="tag struck tm-pos" style="font-size:40px">לחשוב חיובי</div><div class="tag tag-warm tm-cap">לא כל מחשבה חייבת לקבוע</div></div>'));
    Object.assign(this, R.refs(kit, 'tm', ['a0', 'a1', 'c0', 'c1', 'c2', 'pos', 'cap']));
  },
  render(t) {
    // flexibility isn't "thinking positive"
    R.place(this.pos, 540, lerp(212, 200, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)));
    this.pos.style.setProperty('--s', eo(seg(t, 4.5, 5.1)));
    // it loosens the link from a thought to how we feel and what we do
    C.forEach(([, x], k) => R.put(this['c' + k], x, 600, 1, 0, eo(seg(t, 5.4 + k * 0.2, 5.8 + k * 0.2))));
    const loose = eio(seg(t, 7.1, 8.4));
    [this.a0, this.a1].forEach((el) => { el.style.opacity = eo(seg(t, 5.8, 6.2)) * (1 - 0.7 * loose); el.style.strokeDasharray = loose > 0 ? (12 * (1 - loose) + 2) + ' 10' : ''; });
    this.c0.style.transform += ' translateX(' + (loose * 40) + 'px)';
    R.place(this.cap, 540, lerp(812, 800, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});