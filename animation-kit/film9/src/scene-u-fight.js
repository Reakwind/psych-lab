const { seg, eo, eio, eob, lerp } = kit;
const W = [[4.4, 'להשתיק', 850, 70, ''], [5.4, 'להתווכח', 590, 70, ''], [6.6, 'לשכנע אותו לרדת', 300, 70, ''], [11.5, 'ואפילו לעשות עסקאות', 540, 164, 'tag-warm']];
kit.scene('u-fight', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.busFront('uf') + '</svg>' +
      W.map((w, k) => '<div class="tag ' + w[4] + ' uf-w' + k + '">' + w[1] + '</div>').join('') + '<div class="tag tag-cool uf-t">נוסע שלא רוצים באוטובוס</div></div>'));
    Object.assign(this, R.refs(kit, 'uf', ['q0', 'head', 'eyes', 'mouth', 'body', 't', 'w0', 'w1', 'w2', 'w3']));
    this.v = [0, 1, 2, 3].map((k) => R.voiceRefs(kit, 'uf-v' + k));
    R.mood(this.v[1], 1, false); R.mood(this.v[2], 0, false); R.mood(this.v[3], 1, false);
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3) + ')');
    // an unwanted passenger climbs on; Ruth turns round and argues with it, hands off the wheel
    const p = eob(seg(t, 0.3, 0.9), 1.8);
    this.q0.setAttribute('transform', 'translate(800 640) scale(' + Math.max(0.001, p) + ') translate(-800 -640)');
    R.mood(this.v[0], 0, Math.floor(t * 4) % 2 === 0);
    this.v[0].g.setAttribute('transform', 'translate(' + Math.sin(t * 36) * 4 + ' 0)');
    const turn = eio(seg(t, 1.0, 1.8)), argue = t > 4.3 && t < 12.2;
    this.head.setAttribute('transform', 'rotate(' + 14 * turn + ' 0 30) translate(' + 10 * turn + ' 0)');
    this.mouth.setAttribute('d', argue ? (Math.floor(t * 5) % 2 ? 'M-10 22 Q2 40 14 22 Q2 28 -10 22' : 'M-10 26 Q2 34 14 26') : 'M-10 30 Q2 24 14 30');
    R.place(this.t, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 3.9, 4.3))));
    W.forEach(([a, , x, y], k) => R.place(this['w' + k], x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4))));
  },
});
