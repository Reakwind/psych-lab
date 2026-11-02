const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-onward', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j16', { sun: true }) + '<circle class="j16-gl" r="200" style="fill:var(--accent);opacity:.18"/>' +
      '<g class="j16-rw"><g class="j16-ra">' + R.ruthBack('j16a', false) + '</g><g class="j16-rb">' + R.ruthBack('j16b', true) + '</g></g>' +
      '<g class="j16-fw"><g class="j16-fa">' + R.friendBack('j16c', false) + '</g><g class="j16-fb">' + R.friendBack('j16d', true) + '</g></g></svg>' +
      '<div class="tag tag-warm j16-p">קצת יותר ביחד בתוך הדרך הזאת</div><div class="tag tag-cool j16-a">אולי תתחילו ופתאום לא תרצו להפסיק</div></div>'));
    Object.assign(this, R.refs(kit, 'j16', ['gl', 'rw', 'ra', 'rb', 'fw', 'fa', 'fb', 'p', 'a']));
    this.tops = R.PATH.map((p, k) => kit.stage.querySelector('.j16-st' + k + '-top'));
  },
  render(t) {
    // they walk on; one stone after another lights up ahead of them
    const k = lerp(0.95, 1.9, eio(seg(t, 0.0, 4.95)) * 0.6 + seg(t, 0, 4.95) * 0.4);
    const [x, y, r] = R.onPath(k), s = 0.66 * r / 130, step = Math.floor(t * 1.8) % 2, bob = Math.abs(Math.sin(t * Math.PI * 1.8)) * -5;
    this.ra.style.opacity = step ? 0 : 1; this.rb.style.opacity = step ? 1 : 0; this.fa.style.opacity = step ? 1 : 0; this.fb.style.opacity = step ? 0 : 1;
    this.rw.setAttribute('transform', 'translate(' + (x - 70 * s / 0.66) + ' ' + (y + bob) + ') scale(' + s + ')');
    this.fw.setAttribute('transform', 'translate(' + (x + 120 * s / 0.66) + ' ' + (y + bob) + ') scale(' + s + ')');
    this.gl.setAttribute('transform', 'translate(' + (x + 25) + ' ' + (y - 230 * s / 0.66) + ') scale(' + (s / 0.66) + ')');
    this.tops.forEach((top, j) => R.litStone(top, j < 2 ? 1 : eo(seg(t, 1.5 + (j - 2) * 0.35, 1.9 + (j - 2) * 0.35))));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 1.2, 1.5)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.63, 2.0))), eo(seg(t, 1.63, 2.0)));
  },
});
