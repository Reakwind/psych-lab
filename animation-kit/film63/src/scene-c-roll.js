const { seg, eo, eio, eob, lerp } = kit;
// each part can act on all the others, and the ring keeps on rolling
kit.scene('c-roll', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' + R.cycle('co') + '</svg>' +
      R.CYC.map((c, k) => '<div class="tag co-l' + k + '">' + c[2] + '</div>').join('') + '<div class="tag tag-warm co-cap">המעגל ממשיך להתגלגל</div></div>'));
    Object.assign(this, R.refs(kit, 'co', ['dot', 'cap']));
    this.x = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.co-x' + k));
    this.a = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.co-a' + k));
    this.ah = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.co-ah' + k));
    this.d = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.co-n' + k + '-disc'));
    [0, 1, 2, 3, 4].forEach((k) => R.place(kit.stage.querySelector('.co-l' + k), R.CLAB[k][0], R.CLAB[k][1] - 29, 1));
  },
  render(t) {
    this.a.forEach((el, k) => { el.style.strokeDasharray = '1 0'; el.style.opacity = 1; this.ah[k].style.opacity = 1; });
    this.d.forEach((el) => { el.style.fill = 'color-mix(in srgb, var(--second) ' + Math.round(14 + 14 * eio(seg(t, 4.0, 6.5))) + '%, color-mix(in srgb, var(--ground) 40%, white))'; });
    // links across the ring
    this.x.forEach((el, k) => { el.style.opacity = 0.75 * eo(seg(t, 1.6 + k * 0.25, 2.3 + k * 0.25)); el.style.strokeDashoffset = (-t * 40).toFixed(1); });
    // a dot runs round the ring, faster and faster
    const ang = 40 * t + 18 * Math.max(0, t - 3) * Math.max(0, t - 3);
    const [x, y] = R.ringAt(ang % 360);
    this.dot.setAttribute('cx', x); this.dot.setAttribute('cy', y); this.dot.style.opacity = eo(seg(t, 0.3, 0.8));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
  },
});
