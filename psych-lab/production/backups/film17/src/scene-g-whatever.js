const { seg, eo, eio, eob, lerp } = kit;
// whatever comes up is fine: a picture, a sensation, a memory, or just the words; she listens and breathes
const K = [['picture', 'תמונה', 1.4, 880], ['feel', 'תחושה', 2.0, 680], ['memory', 'זיכרון', 2.59, 480], ['words', 'או רק המילים עצמן', 3.7, 250]];
kit.scene('g-whatever', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g15', -200, false) + '<circle class="g15-gl" cx="300" cy="620" r="240" style="fill:var(--main);opacity:0"/>' +
      '<g transform="translate(296 704) scale(1.1)">' + R.phone('g15ph', 0, 0, 'ariel') + '</g>' + R.imgBubble('g15b') + K.map((k, j) => R.pic('g15-k' + j, k[0])).join('') + '</svg>' +
      K.map((k, j) => '<div class="tag ' + (j % 2 ? 'tag-warm' : 'tag-cool') + ' g15-n' + j + '">' + k[1] + '</div>').join('') +
      '<div class="tag tag-warm g15-p">ונותנים לדמיון להגיב בדרכו</div><div class="tag g15-a">מה שיעלה</div><div class="tag tag-cool g15-b">מקשיבים ונושמים, והמוח עושה את שלו</div></div>'));
    Object.assign(this, R.refs(kit, 'g15', ['body', 'eyes', 'head', 'mouth', 'tn', 'gl', 'p', 'a', 'b']));
    this.bg = kit.stage.querySelector('.g15b'); this.bb = R.bubRefs(kit, 'g15b'); this.k = K.map((k, j) => kit.stage.querySelector('.g15-k' + j)); this.n = K.map((k, j) => kit.stage.querySelector('.g15-n' + j));
  },
  render(t) {
    this.tn.style.opacity = 0;
    if (t > 5.6) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    // the soft bubble gives way to four small ones, right to left
    R.setBub(this.bb, this.bg, 620, 280, 1 - eio(seg(t, 0.4, 1.2)), 1, 0, 4);
    K.forEach(([kind, w, a, x], j) => {
      R.setG(this.k[j], x, 260 + Math.sin(t * 1.3 + j) * 5, 0.9 * eob(seg(t, a - 0.2, a + 0.3), 1.6), eo(seg(t, a - 0.2, a)));
      R.place(this.n[j], x, lerp(362, 350, eo(seg(t, a, a + 0.35))), eo(seg(t, a, a + 0.35)));
    });
    const br = (1 - Math.cos(2 * Math.PI * Math.max(0, t - 5.5) / 4.2)) / 2;
    this.gl.style.opacity = 0.14 * eo(seg(t, 5.5, 6.2)) * (0.6 + 0.4 * br);
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.03 * br) + ')');
    this.head.setAttribute('transform', 'rotate(' + (t > 5.5 ? 4 : -6) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.34, 0.7))), eo(seg(t, 0.34, 0.7)) * (1 - eo(seg(t, 5.2, 5.5))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 5.51, 5.9))), eo(seg(t, 5.51, 5.9)));
  },
});
