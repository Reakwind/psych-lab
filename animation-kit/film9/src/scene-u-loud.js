const { seg, eo, eio, eob, lerp } = kit;
const L = [['חרדה', 3.8, 914, 250], ['תסכול', 4.4, 792, 340], ['מבוכה', 5.1, 670, 250], ['בושה', 5.8, 548, 340], ['ביקורת עצמית', 6.3, 426, 250]];
kit.scene('u-loud', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('ul') + R.busSide('ul') +
      L.map((l, k) => '<path class="ink ul-l' + k + '" style="stroke-width:4;opacity:0" d="M' + l[2] + ' ' + (l[3] + 58) + ' L' + R.wx(k) + ' ' + R.WTOP + '"/>').join('') + '</svg>' +
      L.map((l, k) => '<div class="tag ul-w' + k + '">' + l[0] + '</div>').join('') + '<div class="tag tag-warm ul-t">הנוסעים הרועשים יותר</div></div>'));
    this.o = R.sideRefs(kit, 'ul');
    Object.assign(this, R.refs(kit, 'ul', ['t', 'w0', 'w1', 'w2', 'w3', 'w4', 'l0', 'l1', 'l2', 'l3', 'l4']));
    R.mood(this.o.v[5], 1, false);
  },
  render(t) {
    const o = this.o;
    R.scroll(o, t, 260); R.blink(o.reyes, t, 0.4);
    o.bus.setAttribute('transform', 'translate(0 ' + Math.abs(Math.sin(t * 7)) * -3 + ')');
    // the loud ones, named one by one: they swell and shout
    L.forEach(([, a, x, y], k) => {
      const p = eo(seg(t, a, a + 0.4)), on = t > a;
      R.place(this['w' + k], x, lerp(y + 12, y, p), p); this['l' + k].style.opacity = p * 0.6;
      R.mood(o.v[k], 0, on && Math.floor(t * 4 + k) % 2 === 0);
      o.v[k].g.setAttribute('transform', 'translate(' + (on ? Math.sin(t * 38 + k) * 4 : 0) + ' 0) scale(' + (1 + 0.14 * p) + ')');
    });
    o.rmouth.setAttribute('d', t > 4 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.t, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
  },
});
