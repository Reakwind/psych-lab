const { seg, eo, eio, eob, lerp } = kit;
// notice it is hard; then the camera pulls back: Ruth's room is one window among many
const S = 0.8, G = 270, CY = 590, SMALL = 240 / 1080;
const FIG = (k) => [R.friend('hn-f' + k, 'a'), R.pal('hn-f' + k), R.friend('hn-f' + k, 'b'), R.friend('hn-f' + k, 'g'), R.pal('hn-f' + k).replace(/pal-top/g, 'frb-top'), R.friend('hn-f' + k, 'a').replace(/fra-top/g, 'knit-lt'), R.friend('hn-f' + k, 'b').replace(/frb-top/g, 'fra-top'), R.pal('hn-f' + k).replace(/pal-top/g, 'fra-top')][k];
const POS = [[1, -1], [0, -1], [-1, -1], [1, 0], [-1, 0], [1, 1], [0, 1], [-1, 1]];
kit.scene('h-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      POS.map((p, k) => '<g class="hn-t' + k + '">' + R.tile('hn-tt' + k, FIG(k)) + '</g>').join('') +
      '<clipPath id="hn-clip"><rect class="hn-cr" x="0" y="0" width="1080" height="1080" rx="0"/></clipPath>' +
      '<g class="hn-cam"><g clip-path="url(#hn-clip)">' + R.room({}) + '<g class="hn-ring">' + R.attn('hn') + '</g>' + R.seated('hn', -160) + '<g class="hn-cl">' + R.rain('hn-r') + '</g></g>' +
      '<rect class="hn-frame" x="0" y="0" width="1080" height="1080" rx="120" style="fill:none;stroke:var(--second);stroke-width:27;opacity:0"/></g></svg>' +
      '<div class="tag tag-cool hn-a">לשים לב למה שאנחנו עוברים</div><div class="tag hn-b">משהו קשה לנו</div>' +
      '<div class="tag tag-warm hn-c">לא לבד</div><div class="tag hn-d">קושי הוא חלק מהחוויה האנושית</div></div>'));
    Object.assign(this, R.refs(kit, 'hn', ['cam', 'cr', 'frame', 'ring', 'body', 'head', 'eyes', 'mouth', 'cl', 'a', 'b', 'c', 'd']));
    this.t = POS.map((_, k) => kit.stage.querySelector('.hn-t' + k));
    this.dr = [kit.stage.querySelector('.hn-r-drops')].concat(POS.map((_, k) => kit.stage.querySelector('.hn-tt' + k + '-r-drops')));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.4) + ')');
    this.dr.forEach((d) => (d.style.strokeDashoffset = -t * 60));
    // the circle of attention settles around her: noticing what she is going through
    R.xf(this.ring, 340, 620, (300 + Math.sin(t * 2.4) * 6) * eob(seg(t, 0.6, 1.3), 1.4), eo(seg(t, 0.6, 0.9)));
    // ...and acknowledging that something is hard
    R.xf(this.cl, 340 + Math.sin(t * 0.8) * 10, 330, 0.8 * eob(seg(t, 3.6, 4.2), 1.4), 0.9 * eo(seg(t, 3.6, 3.8)));
    this.head.setAttribute('transform', 'rotate(' + (-4 * eio(seg(t, 3.8, 4.6))) + ' 0 30) translate(0 ' + 6 * eio(seg(t, 3.8, 4.6)) + ')');
    this.mouth.setAttribute('d', t > 4.0 ? 'M-10 28 Q2 28 14 28' : 'M-10 26 Q2 32 14 26');
    // pull back: one window among many, everyone with their own small cloud
    const z = eio(seg(t, 5.4, 7.0)), s = lerp(1, SMALL, z);
    this.cam.setAttribute('transform', 'translate(540 ' + lerp(540, CY, z) + ') scale(' + s + ') translate(-540 -540)');
    this.cr.setAttribute('rx', 120 * z); this.frame.style.opacity = eo(seg(t, 6.2, 7.0));
    POS.forEach(([i, j], k) => {
      const a = 6.2 + k * 0.12, p = eob(seg(t, a, a + 0.5), 1.4);
      R.xf(this.t[k], 540 + i * G + Math.sin(t * 0.7 + k) * 3 * p, CY + j * G, S * p, eo(seg(t, a, a + 0.2)));
    });
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.b, 790, lerp(392, 380, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)));
    R.place(this.d, 540, lerp(1012, 1000, eo(seg(t, 8.0, 8.5))), eo(seg(t, 8.0, 8.5)));
  },
});
