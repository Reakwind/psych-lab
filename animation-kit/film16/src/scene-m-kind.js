const { seg, eo, eio, eob, lerp } = kit;
// noticing, and turning to herself more gently: her inner voice (session 4) warms and speaks kindly
const K = [['זה הגיוני.', 7.85], ['קשה לי,', 9.31], ['ואני רוצה שהקושי הזה יעבור.', 10.3]];
kit.scene('m-kind', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m19', -200) + '<g class="m19-bw">' + R.battery('m19-b') + '</g>' +
      '<circle class="m19-gl" cx="300" cy="640" r="230" style="fill:var(--accent);opacity:0"/><g class="m19-vw">' + R.voice('m19v') + '</g>' +
      '<g class="m19-s2w" transform="translate(500 300) scale(.85)">' + R.switchSvg('m19-s2') + R.xMark('m19-x', 110) + '</g></svg>' + R.pileHtml('m19') +
      K.map((k, j) => '<div class="thought kind xs m19-c' + j + '">' + k[0] + '</div>').join('') +
      '<div class="tag tag-cool m19-p">לא חייבים מיד לעשות עם זה משהו</div><div class="tag tag-warm m19-q">ובטח שלא להתחיל להיאבק גם במאבק</div><div class="tag tag-cool m19-a">להתחיל מלשים לב</div><div class="tag tag-warm m19-b">ממקום קצת יותר מבין ורך</div></div>'));
    Object.assign(this, R.refs(kit, 'm19', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'gl', 'vw', 's2w', 'p', 'q', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm19-sw'); this.pl = R.pileRefs(kit, 'm19'); this.v = R.refs(kit, 'm19v', ['grey', 'warm', 'eyes', 'mouth']); this.c = K.map((k, j) => kit.stage.querySelector('.m19-c' + j));
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    R.setPile(this.pl, () => 1, 1.16, 0);
    this.s2w.style.opacity = 1 - eo(seg(t, 0.0, 0.6));
    // the inner voice appears over her head and turns warm; it speaks the kind lines
    const v = eob(seg(t, 1.2, 1.9), 1.4), warm = eio(seg(t, 4.9, 6.0));
    this.vw.setAttribute('transform', 'translate(250 330) scale(' + Math.max(0.001, 1.2 * v) + ')');
    this.v.warm.setAttribute('opacity', warm); this.v.grey.style.opacity = 1 - warm;
    R.blink(this.v.eyes, t, 1.3);
    const talk = (t > 6.14 && t < 7.24) || (t > 7.85 && t < 8.7) || (t > 9.31 && t < 12.26);
    this.v.mouth.setAttribute('d', talk && Math.sin(t * 18) > 0 ? 'M-2 2 Q10 16 22 2' : 'M-2 4 Q10 10 22 4');
    this.gl.style.opacity = 0.16 * warm * (0.8 + 0.2 * Math.sin(t * 1.5));
    K.forEach(([w, a], j) => R.put(this.c[j], 530, lerp(130, 112, eo(seg(t, a, a + 0.4))) + j * 100, 0.85 + 0.15 * eob(seg(t, a, a + 0.5), 1.5), j % 2 ? 2 : -2, eo(seg(t, a, a + 0.3))));
    this.body.setAttribute('transform', 'translate(0 2) scale(1 ' + kit.breathe(t, 0.016, 4.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 4 * warm) + ' 0 30)');
    this.mouth.setAttribute('d', warm > 0.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.q, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.37, 1.7))), eo(seg(t, 1.37, 1.7)) * (1 - eo(seg(t, 4.6, 4.9))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.89, 5.2))), eo(seg(t, 4.89, 5.2)) * (1 - eo(seg(t, 7.4, 7.8))));
  },
});
