const { seg, eo, eio, eob, lerp } = kit;
// thoughts just come, to everyone: balloons pop up over Ruth and over her two friends
const POPS = [[0, 1.0], [0, 2.6], [1, 4.6], [2, 5.4], [0, 5.9], [1, 6.6], [2, 7.0]];
const HEAD = [[500, 330], [230, 330], [870, 330]];
kit.scene('f-all', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fa', 0) +
      '<g class="fa-fa">' + R.friend('fa-a', 'a', 'stand') + '</g><g class="fa-fb">' + R.friend('fa-b', 'b', 'stand') + '</g>' +
      POPS.map((p, k) => '<g class="fa-p' + k + '">' + R.balloon('fa-pb' + k) + '</g>').join('') + '</svg>' + R.loud('fa') +
      '<div class="tag tag-cool fa-cap">מחשבות פשוט מגיעות, לכולנו</div></div>'));
    Object.assign(this, R.refs(kit, 'fa', ['body', 'head', 'eyes', 'mouth', 'fa', 'fb', 'c', 'bang', 'cap']));
    this.p = POPS.map((_, k) => kit.stage.querySelector('.fa-p' + k));
    this.fe = [kit.stage.querySelector('.fa-a-eyes'), kit.stage.querySelector('.fa-b-eyes')];
  },
  render(t) {
    R.blink(this.eyes, t, 0.4); R.blink(this.fe[0], t, 1.6); R.blink(this.fe[1], t, 2.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + 6 * (1 - eio(seg(t, 0, 1.2))) + ' 0 30) translate(0 ' + 8 * (1 - eio(seg(t, 0, 1.2))) + ')');
    this.mouth.setAttribute('d', t > 1 ? 'M-10 26 Q2 32 14 26' : 'M-10 28 Q2 24 14 28');
    // the loud card shrinks back into one passing thought
    const out = eio(seg(t, 0.1, 1.0));
    R.put(this.c, lerp(470, 500, out), lerp(250, 300, out), lerp(1.1, 0.3, out), 0, 1 - eo(seg(t, 0.5, 1.0)));
    // her friends step in at the sides
    const fin = eio(seg(t, 3.6, 4.5));
    this.fa.setAttribute('transform', 'translate(' + lerp(-160, 230, fin) + ' 975)');
    this.fb.setAttribute('transform', 'translate(' + lerp(1240, 870, fin) + ' 975)');
    // balloons pop up over each head, drift up and fade
    POPS.forEach(([w, a], k) => {
      const p = seg(t, a, a + 2.6), [x, y] = HEAD[w];
      this.p[k].setAttribute('transform', 'translate(' + (x + (w ? 0 : 60) + Math.sin(p * 5 + k) * 14) + ' ' + (y - 120 * p - (w ? 0 : 0)) + ') scale(' + eob(seg(t, a, a + 0.4), 1.8) * 0.9 + ')');
      this.p[k].style.opacity = p > 0 && p < 1 ? 1 - eo(seg(t, a + 1.8, a + 2.6)) : 0;
    });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
  },
});
