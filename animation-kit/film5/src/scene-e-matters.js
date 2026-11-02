const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-matters', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(300 962)">' + R.ruth('ez', 'stand') + '</g>' +
      '<g transform="translate(300 330) scale(.62)">' + R.battery('ez') + '</g>' +
      '<path class="ez-f0" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:9;stroke-linecap:round" d="M350 300 C480 220 600 220 700 280"/><path class="ez-f1" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:9;stroke-linecap:round" d="M350 340 C500 380 700 440 820 470"/>' +
      '<g class="ez-k0">' + R.tool('ez-b0', 3, 66) + '</g><g class="ez-k1">' + R.tool('ez-b1', 4, 66) + '</g><path class="ez-line" style="fill:none;stroke:var(--second);stroke-width:6;stroke-dasharray:10 8;opacity:0" d="M260 340 H340"/></svg>' +
      '<div class="tag tag-cool ez-a">לבחור איפה להשקיע</div><div class="tag ez-b">ושיישאר מספיק</div><div class="tag tag-warm ez-c">לדברים שהכי חשובים לכם</div></div>'));
    Object.assign(this, R.refs(kit, 'ez', ['eyes', 'mouth', 'fill', 'f0', 'f1', 'k0', 'k1', 'line', 'a', 'b', 'c']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.1);
    R.setBattery(this.fill, 0.66);
    // knowing her battery, she chooses where the energy goes — and keeps enough for what matters most
    this.k0.setAttribute('transform', 'translate(760 300) scale(' + eob(seg(t, 3.6, 4.1), 1.6) + ')');
    this.k1.setAttribute('transform', 'translate(880 480) scale(' + eob(seg(t, 4.0, 4.5), 1.6) + ')');
    [this.f0, this.f1].forEach((el, k) => { const p = eo(seg(t, 4.5 + k * 0.4, 5.6 + k * 0.4)); el.style.strokeDasharray = p + ' 1'; el.style.opacity = p > 0 ? 1 : 0; });
    this.line.style.opacity = eo(seg(t, 7.5, 8.0));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.7, 4.2))), eo(seg(t, 3.7, 4.2)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)) * (1 - eo(seg(t, 9.0, 9.3))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 9.2, 9.7))), eo(seg(t, 9.2, 9.7)));
  },
});