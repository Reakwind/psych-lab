const { seg, eo, eio, eob, lerp } = kit;
// and then we can be more present, focus on what matters; feel better, and function better
kit.scene('h-present', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.attnRoom('hp', { extra: '<g class="hp-fr">' + R.friend('hp-f', 'a', 'stand') + '</g><g class="hp-bf">' + R.talk('hp-tf') + '</g><g class="hp-br">' + R.talk('hp-tr') + '</g>' }) + '</svg>' +
      '<div class="tag tag-warm hp-a">נוכחים, במה שחשוב לנו</div><div class="tag tag-cool hp-b">להרגיש יותר טוב</div><div class="tag tag-cool hp-c">לתפקד יותר טוב</div></div>'));
    this.A = R.attnRefs(kit, 'hp'); Object.assign(this, R.refs(kit, 'hp', ['fr', 'bf', 'br', 'a', 'b', 'c']));
    this.f = R.refs(kit, 'hp-f', ['eyes', 'head', 'mouth']);
  },
  render(t) {
    const A = this.A;
    A.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    A.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')'); A.lf.setAttribute('transform', 'scale(1)');
    R.worryAt(A, 940, 190, 0.6, t);
    // her friend comes in; the circle settles, steady, around the two of them
    const fin = eio(seg(t, 0.6, 2.4));
    this.fr.setAttribute('transform', 'translate(' + lerp(1180, 830, fin) + ' 975)'); R.blink(this.f.eyes, t, 1.7);
    const c = eio(seg(t, 2.6, 4.0));
    R.ring(A, lerp(520, 650, c), lerp(540, 590, c), lerp(520, 380, c), 1, t, 0);
    A.gP.setAttribute('opacity', 0.25 * eo(seg(t, 4.5, 5.2)) * (1 - eo(seg(t, 7.0, 7.8))));
    // they talk
    const on = t > 4.4, turn = Math.floor((t - 4.4) / 1.0) % 2;
    this.br.setAttribute('transform', 'translate(640 380) scale(.8)'); this.br.style.opacity = on ? (turn === 0 ? 1 : 0.45) : 0;
    this.bf.setAttribute('transform', 'translate(850 330) scale(-.8 .8)'); this.bf.style.opacity = on ? (turn === 1 ? 1 : 0.45) : 0;
    A.mouth.setAttribute('d', on && turn === 0 && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 38 14 24' : R.BIG);
    this.f.mouth.setAttribute('d', on && turn === 1 && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
    this.f.head.setAttribute('transform', 'rotate(-6 0 30)');
    A.head.setAttribute('transform', 'rotate(' + 8 * fin + ' 0 30)'); R.look(A.eyes, t, 0.6, 4 * fin, 0);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)));
    R.place(this.b, 300, lerp(176, 164, eo(seg(t, 8.4, 8.9))), eo(seg(t, 8.4, 8.9)));
    R.place(this.c, 300, lerp(256, 244, eo(seg(t, 10.1, 10.6))), eo(seg(t, 10.1, 10.6)));
  },
});
