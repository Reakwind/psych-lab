const { seg, eo, eio, eob, lerp } = kit;
// part 15: said plainly — mindfulness does not cure Parkinson's; but it is a tool (session 1's "being present" badge) for practising how to meet the challenges on the way
kit.scene('w-cure', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('w9', { sun: true, sunX: 900, sunY: 360 }) + R.wader('w9r') + '<g class="w9-tl">' + R.tool('w9-t', 2, 56) + '</g></svg>' +
      '<div class="tag tag-cool w9-no">חשוב לומר: מיינדפולנס אינו מרפא פרקינסון</div><div class="tag tag-warm w9-but">אבל הוא יכול לעזור לנו להתאמן בהתמודדות</div><div class="tag w9-ch">עם חלק מהאתגרים של החיים עם המחלה</div></div>'));
    Object.assign(this, R.refs(kit, 'w9', ['tl', 'no', 'but', 'ch']));
    this.r = R.waderRefs(kit, 'w9r'); this.r.tuft.style.display = 'none';
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.w9-st' + i + '-top'));
  },
  render(t) {
    // she stands at the start of the path, then walks on
    const k = lerp(0.15, 2.4, eio(seg(t, 8.1, 10.9))), walking = t > 8.1 && t < 10.9;
    R.setWader(this.r, k, t, walking, 0);
    const [x, y, r] = R.onPath(k), s = 0.62 * r / 130;
    // the badge flies to her backpack and stays there
    const f = eio(seg(t, 4.0, 5.6)), px = x, py = y - 285 * s;
    R.setG(this.tl, lerp(860, px, f), lerp(300, py, f) - 80 * Math.sin(Math.PI * f), lerp(1.3, 0.5 * s / 0.6, f) * eob(seg(t, 3.8, 4.2), 1.5), eo(seg(t, 3.8, 4.1)));
    this.tops.forEach((el, i) => R.litStone(el, eo(seg(k, i - 0.2, i + 0.3))));
    R.place(this.no, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.but, 540, lerp(162, 150, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    R.place(this.ch, 540, lerp(242, 230, eo(seg(t, 8.0, 8.5))), eo(seg(t, 8.0, 8.5)));
  },
});
