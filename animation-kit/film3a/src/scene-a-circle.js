const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-circle', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="ac-ring">' + R.attn('ac') + '</g>' + R.seated('ac', 0) + '<g class="ac-tg">' + R.tremor('ac') + '</g>' +
      '<g class="ac-cl">' + R.tool('ac-b', 0, 46) + '</g></svg>' +
      '<div class="tag ac-body-t">גוף</div><div class="tag ac-mind">ראש</div><div class="tag tag-cool ac-cap">מה שקורה עכשיו, כמו שזה</div></div>'));
    Object.assign(this, R.refs(kit, 'ac', ['ring', 'body', 'head', 'eyes', 'tg', 'cl', 'mind', 'cap']));
    this.bt = kit.stage.querySelector('.ac-body-t');
  },
  render(t) {
    // the circle widens to take in what is here: the body (her trembling hand) and the mind (a passing thought)
    this.ring.setAttribute('transform', 'translate(500 620) scale(' + lerp(300, 430, eio(seg(t, 0.4, 3.0))) + ')');
    this.tg.setAttribute('transform', 'translate(' + (476 + Math.sin(t * 40) * 3) + ' 712)');
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    const c = eob(seg(t, 4.8, 5.4), 1.8);
    this.cl.setAttribute('transform', 'translate(' + (640 + Math.sin(t * 1.3) * 10) + ' ' + (330 + Math.cos(t * 1.1) * 6) + ') scale(' + c + ')');
    const b = eo(seg(t, 4.3, 4.8));
    this.tg.style.opacity = 0.6 + 0.4 * Math.max(b, 0);
    R.place(this.bt, 300, lerp(752, 740, b), b);
    R.place(this.mind, 780, lerp(316, 304, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.0, 6.5))), eo(seg(t, 6.0, 6.5)));
  },
});
