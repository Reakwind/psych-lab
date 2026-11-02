const { seg, eo, eio, eob, lerp } = kit;
const W = [['לתרגול נשימה', 3.24, 800], ['לתנועה', 3.82, 540], ['להליכה', 4.49, 280]];
kit.scene('j-invite', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('j11', { sun: true }) +
      '<circle class="j11-br" cx="540" cy="720" r="330" style="fill:var(--main);opacity:0"/><circle class="j11-bc" cx="540" cy="720" r="330" style="fill:none;stroke:var(--main);stroke-width:8;opacity:0"/>' +
      R.packedFree('j11') + '<g class="j11-fr">' + R.armsFree(R.friend('j11f', 'a'), 'j11f') + '</g></svg>' +
      W.map((w, k) => '<div class="tag tag-warm j11-n' + k + '">' + w[0] + '</div>').join('') + '<div class="tag tag-cool j11-a">להזמין מישהו להצטרף</div></div>'));
    Object.assign(this, R.refs(kit, 'j11', ['w', 'br', 'bc', 'armL', 'armR', 'head', 'eyes', 'mouth', 'fr', 'a']));
    this.f = R.refs(kit, 'j11f', ['armL', 'armR', 'head', 'eyes', 'mouth']); this.n = W.map((w, k) => kit.stage.querySelector('.j11-n' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5); R.blink(this.f.eyes, t, 2.2);
    // an invitation: to breathe together, to move together, to walk together
    const br = seg(t, 3.0, 6.0), b = Math.sin(Math.PI * Math.min(1, br * 2)) * (br > 0 ? 1 : 0);
    this.br.style.opacity = 0.14 * eo(seg(t, 3.0, 3.4)); this.bc.style.opacity = 0.5 * eo(seg(t, 3.0, 3.4));
    [this.br, this.bc].forEach((c) => c.setAttribute('r', 300 + 40 * Math.sin(t * 2.2)));
    const up = eio(seg(t, 3.7, 4.1)) * (1 - eio(seg(t, 4.3, 4.7)));
    R.raise(this, up * 0.8); R.raise(this.f, up * 0.8);
    const walk = seg(t, 4.5, 5.94), bob = walk > 0 ? Math.abs(Math.sin(t * 7)) * -8 : 0;
    this.w.setAttribute('transform', 'translate(' + (380 + 40 * walk) + ' ' + (970 + bob) + ')');
    this.fr.setAttribute('transform', 'translate(' + (700 + 40 * walk) + ' ' + (976 + bob) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 0.8, 1.6))) + ' 0 30)'); this.f.head.setAttribute('transform', 'rotate(6 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy); this.f.mouth.setAttribute('d', R.mouthHappy);
    W.forEach(([w, a, x], k) => R.place(this.n[k], x, lerp(54, 40, eo(seg(t, a, a + 0.3))), eo(seg(t, a, a + 0.3))));
    R.place(this.a, 540, lerp(162, 150, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
  },
});
