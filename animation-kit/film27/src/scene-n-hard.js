const { seg, eo, eio, eob, lerp } = kit;
kit.scene('n-hard', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.bedTop('nh') + '<rect width="1080" height="1080" style="fill:#1A2340;opacity:.22"/>' +
      '<g class="nh-tg">' + R.tremor('nh') + '</g><g transform="translate(930 210) scale(.62)">' + R.battery('nh') + '</g></svg>' +
      '<div class="tag tag-night nh-pd">בפרקינסון, השינה יכולה להיות מאתגרת במיוחד</div><div class="tag tag-warm nh-sym">וחוסר שינה משפיע גם על הסימפטומים</div></div>'));
    Object.assign(this, R.refs(kit, 'nh', ['eyes', 'mouth', 'glow', 'duvet', 'tg', 'fill', 'bolt', 'pd', 'sym']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    this.glow.style.opacity = 0.12; this.mouth.setAttribute('d', 'M-10 30 Q2 24 14 30');
    // a restless night: the duvet shifts
    this.duvet.setAttribute('transform', 'translate(' + (Math.sin(t * 1.3) * 8) + ' ' + (Math.sin(t * 0.9) * 10) + ')');
    R.place(this.pd, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
    // too little sleep drains the battery, and symptoms show more
    R.setBattery(this.fill, lerp(0.7, 0.18, eio(seg(t, 3.8, 5.6))));
    const tr = eo(seg(t, 6.1, 6.5));
    this.tg.style.opacity = tr; this.tg.setAttribute('transform', 'translate(' + (548 + Math.sin(t * 40) * 3) + ' 650) rotate(90)');
    R.place(this.sym, 540, lerp(940, 928, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
  },
});
