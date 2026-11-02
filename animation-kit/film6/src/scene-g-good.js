const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-good', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('go', { sun: true, sunX: 820, sunY: 250 }) +
      '<g transform="translate(400 980)">' + R.roots('go-a') + '</g><g transform="translate(420 980) scale(-1 1)">' + R.roots('go-b') + '</g>' +
      '<g transform="translate(410 970)">' + R.ruth('go', 'stand') + '</g><g class="go-fr">' + R.armsFree(R.friend('go-f', 'a', 'stand'), 'go-f') + '</g></svg>' +
      '<div class="tag tag-cool go-calm">גם כשרגועים</div><div class="tag tag-warm go-nice">ברגעים נעימים</div><div class="tag go-who">בחוץ · עם מישהו שחשוב לנו</div></div>'));
    Object.assign(this, R.refs(kit, 'go', ['head', 'eyes', 'mouth', 'fr', 'calm', 'nice', 'who']));
    this.f = R.refs(kit, 'go-f', ['armR', 'eyes', 'head']);
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
    this.ra = kit.stage.querySelector('.go-a-r'); this.rb = kit.stage.querySelector('.go-b-r');
  },
  render(t) {
    R.blink(this.eyes, t, 0.9); R.blink(this.f.eyes, t, 2.4);
    // a good moment outside: grounding there too, to stay in it a little longer
    this.fr.setAttribute('transform', 'translate(' + lerp(1240, 700, eio(seg(t, 6.6, 8.6))) + ' 964)');
    const wv = eio(seg(t, 9.4, 9.8)) * (1 - eio(seg(t, 11.0, 11.5)));
    this.f.armR.setAttribute('transform', 'rotate(' + (-110 * wv + Math.sin(t * 9) * 10 * wv) + ' 52 -326)');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 8.0, 8.8))) + ' 0 30)');
    const r = eo(seg(t, 4.6, 6.0));
    [this.ra, this.rb].forEach((el) => { el.style.strokeDasharray = r + ' 1'; el.style.opacity = r > 0 ? 0.8 : 0; });
    R.place(this.calm, 540, lerp(84, 70, eo(seg(t, 2.7, 3.2))), eo(seg(t, 2.7, 3.2)) * (1 - eo(seg(t, 4.0, 4.3))));
    R.place(this.nice, 540, lerp(84, 70, eo(seg(t, 4.2, 4.7))), eo(seg(t, 4.2, 4.7)) * (1 - eo(seg(t, 7.8, 8.1))));
    R.place(this.who, 540, lerp(84, 70, eo(seg(t, 8.1, 8.6))), eo(seg(t, 8.1, 8.6)));
  },
});
