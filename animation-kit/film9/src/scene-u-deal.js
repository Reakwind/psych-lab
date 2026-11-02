const { seg, eo, eio, eob, lerp } = kit;
kit.scene('u-deal', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.busFront('ux') + '</svg>' +
      '<div class="tag tag-warm ux-n">מבוכה</div><div class="thought ux-c" style="width:720px">"רוצה שאני ארד מהאוטובוס? סבבה, אז תפסיק ללכת לאירועים משפחתיים."</div></div>'));
    Object.assign(this, R.refs(kit, 'ux', ['q0', 'head', 'eyes', 'mouth', 'body', 'n', 'c']));
    this.v = [0, 1, 2, 3].map((k) => R.voiceRefs(kit, 'ux-v' + k));
    R.mood(this.v[1], 1, false); R.mood(this.v[2], 0, false); R.mood(this.v[3], 1, false);
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3) + ')');
    // embarrassment offers a deal, word for word
    const talk = t > 2.5 && t < 8.6;
    R.mood(this.v[0], 0, talk && Math.floor(t * 5) % 2 === 0);
    this.q0.setAttribute('transform', 'translate(800 640) scale(' + (1 + 0.05 * Math.sin(t * 2)) + ') translate(-800 -640)');
    this.head.setAttribute('transform', 'rotate(14 0 30) translate(10 0)');
    this.mouth.setAttribute('d', 'M-10 31 Q2 23 14 31');
    R.place(this.n, 800, lerp(474, 462, eo(seg(t, 1.2, 1.6))), eo(seg(t, 1.2, 1.6)));
    R.put(this.c, 540, 210 + (1 - eo(seg(t, 2.5, 3.1))) * 40, 0.3 + 0.7 * eob(seg(t, 2.5, 3.1), 1.4), 0, eo(seg(t, 2.5, 2.8)));
  },
});
