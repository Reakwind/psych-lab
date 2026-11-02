const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-include', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.overhead('ai') + '<g class="ai-ring">' + R.attn('ai') + '</g>' +
      '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop('ai') + '</g><g class="ai-tg">' + R.tremor('ai') + '</g></svg>' +
      '<div class="tag tag-warm ai-cap">גם זה חלק מהרגע</div></div>'));
    Object.assign(this, R.refs(kit, 'ai', ['ring', 'tg', 'cap']));
    this.eyes = kit.stage.querySelector('.ai-eyes');
  },
  render(t) {
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    this.tg.setAttribute('transform', 'translate(' + (548 + Math.sin(t * 40) * 3) + ' 430) rotate(-90)');
    // the circle of attention widens until the tremor is inside it too
    const g = eio(seg(t, 1.8, 6.5));
    this.ring.setAttribute('transform', 'translate(500 540) scale(' + lerp(150, 470, g) + ')');
    this.ring.style.opacity = eo(seg(t, 0.4, 1.4));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 7.6, 8.1))), eo(seg(t, 7.6, 8.1)));
  },
});
