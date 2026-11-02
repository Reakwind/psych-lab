const { seg, eo, eio, eob, lerp } = kit;
const W = [[3.7, 'איך שאנחנו מרגישים', 230, ''], [6.1, 'הביטחון', 340, ''], [8.3, 'המוטיבציה', 450, ''], [10.8, 'הבחירה אם לנסות בכלל', 560, 'tag-warm']];
kit.scene('m-path', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('mh') +
      '<g class="mh-walk"><g class="mh-a">' + R.ruth('mh', 'stand') + '</g><g class="mh-b">' + R.ruth('mh-b', 'step') + '</g></g>' +
      '<g class="mh-cl">' + R.rainCloud('mh-rc') + '</g></svg>' +
      W.map((w, k) => '<div class="tag ' + w[3] + ' mh-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool mh-again">שוב ושוב</div></div>'));
    Object.assign(this, R.refs(kit, 'mh', ['walk', 'a', 'b', 'head', 'eyes', 'mouth', 'cl', 'w0', 'w1', 'w2', 'w3', 'again']));
    this.rain = kit.stage.querySelector('.mh-rc-rain');
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    // the same cloud comes back over her, again and again; at "to try at all" she steps back from the first stone
    const back = eio(seg(t, 11.5, 12.6)), stepping = t > 11.5 && t < 12.6, step = stepping ? Math.floor(t * 3) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    const x = lerp(300, 200, back);
    this.walk.setAttribute('transform', 'translate(' + x + ' 990)');
    const bob = [0.2, 1.1, 2.0].reduce((s, a) => s + Math.sin(Math.PI * seg(t, a, a + 0.7)), 0);
    this.cl.setAttribute('transform', 'translate(' + (x + 10) + ' ' + lerp(-140, 330, eo(seg(t, 0, 1.0))) + ') scale(' + (0.9 + 0.08 * bob) + ')');
    this.rain.setAttribute('transform', 'translate(0 ' + ((t * 40) % 24) + ')');
    this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
    this.head.setAttribute('transform', 'rotate(' + lerp(4, -6, back) + ' 0 30)');
    R.place(this.again, 300, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 3.2, 3.6))));
    W.forEach(([a, , y], k) => R.place(this['w' + k], 790, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
