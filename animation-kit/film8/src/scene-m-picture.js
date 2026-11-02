const { seg, eo, eio, eob, lerp } = kit;
const W = [[11.2, 'קשה', 760], [12.2, 'מתסכל', 540], [13.0, 'מדאיג', 320]];
kit.scene('m-picture', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.picture('mp') + '</svg>' +
      '<div class="tag tag-cool mp-nat">טבעיות · עולות לכולנו</div><div class="tag tag-warm mp-part">רק חלק מהתמונה</div>' + W.map((w, k) => '<div class="tag mp-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mp', ['pic', 'dark', 'rc', 'nat', 'part', 'w0', 'w1', 'w2']));
  },
  render(t) {
    // the whole picture, then the light shrinks to its hard corner: the rain cloud
    this.pic.setAttribute('transform', 'translate(540 480) scale(' + lerp(0.92, 1, eo(seg(t, 0, 1.2))) + ') translate(-540 -480)');
    const p = eio(seg(t, 7.4, 9.6)), r = lerp(820, 150, p), cx = lerp(540, 706, p), cy = lerp(480, 300, p);
    this.dark.setAttribute('d', R.spotD(cx, cy, r, 150, 190, 930, 770));
    this.rc.querySelector('.mp-rc-rain').setAttribute('transform', 'translate(0 ' + ((t * 40) % 24) + ')');
    R.place(this.nat, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 7.0, 7.4))));
    R.place(this.part, 540, lerp(84, 70, eo(seg(t, 7.6, 8.1))), eo(seg(t, 7.6, 8.1)));
    W.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(844, 832, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
