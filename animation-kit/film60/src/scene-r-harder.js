const { seg, eo, eio, eob, lerp } = kit;
const DIM = [1, 4];
kit.scene('r-harder', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' +
      '<g transform="translate(540 1010)">' + R.ruth('rh', 'stand') + '</g>' + R.RING.map((p, k) => '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + R.role('rh-b' + k, k) + '</g>').join('') +
      '<g class="rh-hg">' + R.hourglass('rh-hgi') + '</g><g class="rh-bt">' + R.battery('rh') + '</g></svg>' +
      '<div class="tag rh-time">יותר זמן</div><div class="tag rh-en">יותר אנרגיה</div></div>'));
    Object.assign(this, R.refs(kit, 'rh', ['head', 'eyes', 'mouth', 'hg', 'bt', 'fill', 'time', 'en']));
    this.b = R.RING.map((p, k) => kit.stage.querySelector('.rh-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    // with Parkinson's, some roles feel out of reach: two badges grey out
    const d = eio(seg(t, 1.6, 3.2));
    DIM.forEach((k) => { this.b[k].style.filter = 'grayscale(' + d + ')'; this.b[k].style.opacity = 1 - 0.5 * d; });
    // more time
    const h = eo(seg(t, 8.5, 9.0)), turn = eio(seg(t, 9.0, 10.0));
    this.hg.setAttribute('transform', 'translate(830 800) scale(' + 0.7 * eob(h, 1.5) + ') rotate(' + 180 * turn + ')'); this.hg.style.opacity = h;
    R.place(this.time, 830, lerp(924, 912, eo(seg(t, 8.8, 9.3))), eo(seg(t, 8.8, 9.3)));
    // more energy
    const b = eo(seg(t, 9.6, 10.1));
    this.bt.setAttribute('transform', 'translate(250 800) scale(' + 0.8 * eob(b, 1.5) + ')'); this.bt.style.opacity = b;
    R.setBattery(this.fill, 0.75 - 0.55 * eio(seg(t, 10.1, 11.4)));
    R.place(this.en, 250, lerp(924, 912, eo(seg(t, 10.2, 10.7))), eo(seg(t, 10.2, 10.7)));
    this.head.setAttribute('transform', 'rotate(' + (-6 * d) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.4 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
  },
});
