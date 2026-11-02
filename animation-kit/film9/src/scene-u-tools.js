const { seg, eo, eio, eob, lerp } = kit;
kit.scene('u-tools', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.busFront('ut') +
      '<circle class="ut-spot" cx="800" cy="610" r="190" style="fill:var(--accent);opacity:0"/>' +
      '<g class="ut-e">' + R.tool('ut-eye', 2, 64) + '</g><g class="ut-br">' + R.tool('ut-air', 1, 64) + '</g></svg>' +
      '<div class="tag tag-cool ut-a">מיינדפולנס</div><div class="tag ut-s">איזה נוסע מדבר?</div><div class="tag ut-n">בלי להיכנס מיד לוויכוח</div><div class="tag tag-cool ut-b">נשימה</div><div class="tag tag-warm ut-h">להתייצב, הידיים על ההגה</div></div>'));
    Object.assign(this, R.refs(kit, 'ut', ['spot', 'e', 'br', 'head', 'eyes', 'mouth', 'body', 'a', 's', 'n', 'b', 'h']));
    this.v = [0, 1, 2, 3].map((k) => R.voiceRefs(kit, 'ut-v' + k));
    R.mood(this.v[1], 1, false); R.mood(this.v[2], 0, false); R.mood(this.v[3], 1, false);
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // a soft light on the passenger who's talking: noticed, not argued with; then a breath, and she settles back to the wheel
    R.mood(this.v[0], 0, t < 9 && Math.floor(t * 4) % 2 === 0);
    this.spot.style.opacity = 0.22 * eo(seg(t, 3.3, 3.9));
    const be = eob(seg(t, 0.7, 1.2), 1.8), bb = eob(seg(t, 7.8, 8.3), 1.8);
    this.e.setAttribute('transform', 'translate(430 190) scale(' + Math.max(0.001, be) + ')');
    this.br.setAttribute('transform', 'translate(660 190) scale(' + Math.max(0.001, bb) + ')');
    const back = eio(seg(t, 5.0, 6.0));
    this.head.setAttribute('transform', 'rotate(' + lerp(14, 0, back) + ' 0 30) translate(' + lerp(10, 0, back) + ' 0)');
    this.body.setAttribute('transform', 'scale(1 ' + (t > 8 ? kit.breathe(t, 0.025, 4) : 1) + ')');
    this.mouth.setAttribute('d', t > 9.4 ? 'M-10 26 Q2 32 14 26' : 'M-10 28 Q2 28 14 28');
    R.place(this.a, 430, lerp(282, 270, eo(seg(t, 0.8, 1.2))), eo(seg(t, 0.8, 1.2)));
    R.place(this.s, 800, lerp(442, 430, eo(seg(t, 3.3, 3.7))), eo(seg(t, 3.3, 3.7)) * (1 - eo(seg(t, 7.4, 7.8))));
    R.place(this.n, 540, lerp(84, 70, eo(seg(t, 4.9, 5.3))), eo(seg(t, 4.9, 5.3)) * (1 - eo(seg(t, 9.0, 9.4))));
    R.place(this.b, 660, lerp(282, 270, eo(seg(t, 7.9, 8.3))), eo(seg(t, 7.9, 8.3)));
    R.place(this.h, 540, lerp(84, 70, eo(seg(t, 9.5, 9.9))), eo(seg(t, 9.5, 9.9)));
  },
});
