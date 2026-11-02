const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-walk', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j15', { sun: true }) + '<circle class="j15-gl" r="200" style="fill:var(--accent);opacity:0"/>' +
      '<g class="j15-rw"><g class="j15-ra">' + R.ruthBack('j15a', false) + '</g><g class="j15-rb">' + R.ruthBack('j15b', true) + '</g></g>' +
      '<g class="j15-fw"><g class="j15-fa">' + R.friendBack('j15c', false) + '</g><g class="j15-fb">' + R.friendBack('j15d', true) + '</g></g></svg>' +
      '<div class="tag tag-warm j15-a">קצת יותר ביחד בתוך הדרך הזאת</div></div>'));
    Object.assign(this, R.refs(kit, 'j15', ['gl', 'rw', 'ra', 'rb', 'fw', 'fa', 'fb', 'a']));
    this.tops = R.PATH.map((p, k) => kit.stage.querySelector('.j15-st' + k + '-top'));
  },
  render(t) {
    // Ruth and her friend walk her path side by side; the stones they pass light up
    const k = lerp(0.1, 0.95, eio(seg(t, 0.0, 5.78)));
    const [x, y, r] = R.onPath(k), s = 0.66 * r / 130, step = Math.floor(t * 1.8) % 2, bob = Math.abs(Math.sin(t * Math.PI * 1.8)) * -5;
    this.ra.style.opacity = step ? 0 : 1; this.rb.style.opacity = step ? 1 : 0; this.fa.style.opacity = step ? 1 : 0; this.fb.style.opacity = step ? 0 : 1;
    this.rw.setAttribute('transform', 'translate(' + (x - 70 * s / 0.66) + ' ' + (y + bob) + ') scale(' + s + ')');
    this.fw.setAttribute('transform', 'translate(' + (x + 120 * s / 0.66) + ' ' + (y + bob) + ') scale(' + s + ')');
    R.litStone(this.tops[0], 1); R.litStone(this.tops[1], eo(seg(t, 2.0, 3.0)));
    this.gl.setAttribute('transform', 'translate(' + (x + 25) + ' ' + (y - 230 * s / 0.66) + ') scale(' + (s / 0.66) + ')'); this.gl.style.opacity = 0.18 * eo(seg(t, 3.2, 4.0));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 3.29, 3.7))), eo(seg(t, 3.29, 3.7)));
  },
});
