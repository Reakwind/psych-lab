const { seg, eo, eio, eob, lerp } = kit;
const W = [[6.3, 'להכין', 830, ''], [7.7, 'לארח', 590, ''], [9.4, 'כולם יחד סביב השולחן', 290, 'tag-warm']];
kit.scene('m-tal', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.talRoom('mt') + '<rect class="mt-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-cool mt-title">ניקח לדוגמה את טל</div><div class="tag mt-name">טל</div>' + W.map((w, k) => '<div class="tag ' + w[3] + ' mt-w' + k + '">' + w[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'mt', ['veil', 'tal', 'serve', 'fam0', 'fam1', 'fam2', 'dish0', 'dish1', 'dish2', 'pot0', 'pot1', 'pot2', 'pot3', 't-eyes', 't-mouth', 'title', 'name', 'w0', 'w1', 'w2']));
    [0, 1, 2, 3].forEach((k) => (this['pot' + k].style.opacity = 0)); [0, 1, 2].forEach((k) => (this['dish' + k].style.opacity = 0));
    this.fe = [0, 1, 2].map((k) => kit.stage.querySelector('.mt-f' + k + '-eyes'));
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.3); this.fe.forEach((e, k) => R.blink(e, t, 1.1 + k));
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.7));
    // Tal comes in with a dish, sets it on the table; then the family is there around it
    const walk = eio(seg(t, 0.2, 1.6)), put = eio(seg(t, 6.3, 7.1));
    const tx = lerp(320, 0, walk), bob = walk > 0 && walk < 1 ? Math.abs(Math.sin(t * 9)) * -10 : 0;
    this.tal.setAttribute('transform', 'translate(' + tx + ' ' + bob + ')');
    this.serve.setAttribute('transform', 'translate(' + (tx + lerp(0, -580, put)) + ' ' + (bob + lerp(0, -128, put) - Math.sin(Math.PI * put) * 80) + ')');
    this['t-mouth'].setAttribute('d', 'M-12 24 Q2 36 16 24');
    [0, 1, 2].forEach((k) => { const p = eob(seg(t, 9.3 + k * 0.3, 10.0 + k * 0.3), 1.3); this['fam' + k].setAttribute('transform', 'translate(0 ' + lerp(110, 0, p) + ')'); this['fam' + k].style.opacity = eo(seg(t, 9.3 + k * 0.3, 9.6 + k * 0.3)); });
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 5.7, 6.1))));
    R.place(this.name, 900 + tx, lerp(530, 518, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)));
    W.forEach(([a, , x], k) => R.place(this['w' + k], x, lerp(84, 70, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
