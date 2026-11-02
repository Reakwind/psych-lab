const { seg, eo, eio, eob, lerp } = kit;
// and from there, two questions
kit.scene('m-need', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m20', -200) + '<g class="m20-bw">' + R.battery('m20-b') + '</g>' +
      '<circle class="m20-gl" cx="300" cy="640" r="230" style="fill:var(--accent);opacity:.16"/><g class="m20-vw" transform="translate(250 330) scale(1.2)">' + R.voice('m20v') + '</g></svg>' + R.pileHtml('m20') +
      ['זה הגיוני.', 'קשה לי,', 'ואני רוצה שהקושי הזה יעבור.'].map((k, j) => '<div class="thought kind xs m20-c' + j + '">' + k + '</div>').join('') +
      '<div class="tag tag-cool m20-a">מה אני צריך עכשיו?</div><div class="tag tag-warm m20-b">מה יכול לעזור לי להתמודד עם הרגע הזה קצת יותר בקלות?</div></div>'));
    Object.assign(this, R.refs(kit, 'm20', ['body', 'eyes', 'head', 'mouth', 'bw', 'b-fill', 'gl', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm20-sw'); this.pl = R.pileRefs(kit, 'm20'); this.v = R.refs(kit, 'm20v', ['grey', 'warm', 'eyes', 'mouth']); this.c = [0, 1, 2].map((j) => kit.stage.querySelector('.m20-c' + j));
    this.tn = kit.stage.querySelector('.m20-tn');
  },
  render(t) {
    R.setSwitch(this.sw, 1); this.sw.halo.style.opacity = 0.3 + 0.12 * Math.sin(t * 5);
    R.blink(this.eyes, t, 0.6); this.tn.style.opacity = 0;
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], 0.04);
    R.setPile(this.pl, () => 1, 1.16, 0);
    this.v.warm.setAttribute('opacity', 1); this.v.grey.style.opacity = 0; R.blink(this.v.eyes, t, 1.3);
    const talk = (t > 1.93 && t < 3.22) || (t > 4.1 && t < 7.82);
    this.v.mouth.setAttribute('d', talk && Math.sin(t * 18) > 0 ? 'M-2 2 Q10 16 22 2' : 'M-2 4 Q10 10 22 4');
    this.c.forEach((c, j) => R.put(c, 530, 112 + j * 100, 1, j % 2 ? 2 : -2, 1 - eo(seg(t, 0.3, 0.9))));
    this.body.setAttribute('transform', 'translate(0 2) scale(1 ' + kit.breathe(t, 0.016, 4.0) + ')');
    this.head.setAttribute('transform', 'rotate(' + (6 - 10 * eio(seg(t, 1.9, 2.6))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.93, 2.3))), eo(seg(t, 1.93, 2.3)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.1, 4.5))), eo(seg(t, 4.1, 4.5)));
  },
});
