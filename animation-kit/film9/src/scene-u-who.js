const { seg, eo, eio, eob, lerp } = kit;
// label, time, tag x, row y (row A 250, row B 340)
const L = [['מחשבות אוטומטיות', 4.6, 860, 250], ['רגשות', 7.3, 792, 340], ['זיכרונות', 7.9, 600, 250], ['עייפות', 8.6, 548, 340], ['תחושות לא נעימות בגוף', 9.3, 320, 250], ['סימפטומים', 11.5, 290, 340]];
kit.scene('u-who', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('uw') + R.busSide('uw') +
      L.map((l, k) => '<path class="ink uw-l' + k + '" style="stroke-width:4;opacity:0" d="M' + l[2] + ' ' + (l[3] + 58) + ' L' + R.wx(k) + ' ' + R.WTOP + '"/>').join('') + '</svg>' +
      L.map((l, k) => '<div class="tag uw-w' + k + '">' + l[0] + '</div>').join('') + '<div class="tag tag-cool uw-t">הנוסעים: החוויות הפנימיות שמצטרפות בדרך</div></div>'));
    this.o = R.sideRefs(kit, 'uw');
    Object.assign(this, R.refs(kit, 'uw', ['t', 'w0', 'w1', 'w2', 'w3', 'w4', 'w5', 'l0', 'l1', 'l2', 'l3', 'l4', 'l5']));
    this.o.v.forEach((v) => R.mood(v, 0, false));
  },
  render(t) {
    const o = this.o;
    R.scroll(o, t, 260); R.blink(o.reyes, t, 0.4);
    o.bus.setAttribute('transform', 'translate(0 ' + Math.abs(Math.sin(t * 7)) * -3 + ')');
    // each passenger gets its name, and puffs up as it's named
    L.forEach(([, a, x, y], k) => {
      const p = eo(seg(t, a, a + 0.4));
      R.place(this['w' + k], x, lerp(y + 12, y, p), p); this['l' + k].style.opacity = p * 0.6;
      o.v[k].g.setAttribute('transform', 'scale(' + (1 + 0.18 * Math.sin(Math.PI * seg(t, a, a + 0.6))) + ')');
    });
    R.place(this.t, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
  },
});
