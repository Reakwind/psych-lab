const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-pack', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pk', { sun: true, sunX: 170, sunY: 190 }) + '<g class="pk-r">' + R.ruthBack('pk-r', false) + '</g>' +
      '<g class="pk-eye">' + R.tool('pk-e', 2, 60) + '</g><g class="pk-b0">' + R.tool('pk-t0', 1, 56) + '</g><g class="pk-b1">' + R.tool('pk-t1', 3, 56) + '</g></svg>' +
      '<div class="tag tag-cool pk-see">לזהות</div><div class="tag tag-warm pk-use">ולהשתמש יותר במה שכבר עוזר</div></div>'));
    Object.assign(this, R.refs(kit, 'pk', ['r', 'eye', 'b0', 'b1', 'see', 'use']));
    this.pack = kit.stage.querySelector('.pk-r-pack');
  },
  render(t) {
    this.r.setAttribute('transform', 'translate(540 1010) scale(.9)');
    // practice notices what already helps (the eye)...
    const e = eob(seg(t, 1.6, 2.2), 1.6);
    this.eye.setAttribute('transform', 'translate(830 ' + (240 + Math.sin(t * 2) * 6) + ') scale(' + e + ')');
    R.place(this.see, 830, lerp(332, 320, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)));
    // ...and those things go into her backpack, as tools
    [[this.b0, 300, 300, 0.9], [this.b1, 560, 230, 1.1]].forEach(([el, x, y, a], k) => {
      const p = eob(seg(t, a, a + 0.5), 1.6), f = eio(seg(t, 3.4 + k * 0.5, 4.4 + k * 0.5));
      el.setAttribute('transform', 'translate(' + lerp(x, 540, f) + ' ' + (lerp(y, 720, f) - Math.sin(f * Math.PI) * 80) + ') scale(' + p * lerp(1, 0.45, f) + ')');
      el.style.opacity = 1 - eo(seg(t, 4.3 + k * 0.5, 4.5 + k * 0.5));
    });
    const bump = Math.sin(Math.PI * seg(t, 4.3, 4.7)) + Math.sin(Math.PI * seg(t, 4.8, 5.2));
    this.pack.setAttribute('transform', 'translate(0 -280) scale(' + (1 + 0.05 * bump) + ') translate(0 280)');
    R.place(this.use, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
  },
});
