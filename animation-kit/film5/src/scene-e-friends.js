const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-friends', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('ef') + '<g transform="translate(540 980)">' + R.ruth('ef', 'stand') + '</g>' +
      '<g transform="translate(540 380) scale(.62)">' + R.battery('ef') + '</g><g class="ef-fa">' + R.friend('ef-a', 'a') + '</g><g class="ef-fb">' + R.friend('ef-b', 'b') + '</g>' +
      '<path class="ef-dn" style="fill:none;stroke:#D96C6C;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;opacity:0" d="M640 320 V440 M614 414 L640 440 L666 414"/>' +
      '<path class="ef-up" style="fill:none;stroke:#6FAE7A;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;opacity:0" d="M440 440 V320 M414 346 L440 320 L466 346"/></svg>' +
      '<div class="tag tag-warm ef-a1">שונה מאדם לאדם</div><div class="tag tag-cool ef-a2">ומיום ליום</div></div>'));
    Object.assign(this, R.refs(kit, 'ef', ['head', 'eyes', 'mouth', 'fill', 'fa', 'fb', 'dn', 'up', 'a1', 'a2']));
    this.ea = kit.stage.querySelector('.ef-a-eyes'); this.eb = kit.stage.querySelector('.ef-b-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ea, t, 1.9); R.blink(this.eb, t, 2.9);
    // one friend leaves her drained, another fills her up
    const ain = eio(seg(t, 0.2, 1.4)), aout = eio(seg(t, 2.6, 3.4)), bin = eio(seg(t, 3.0, 4.0));
    this.fa.setAttribute('transform', 'translate(' + (lerp(1240, 840, ain) + aout * 420) + ' 976)');
    this.fb.setAttribute('transform', 'translate(' + lerp(-200, 240, bin) + ' 976)');
    const dn = eio(seg(t, 1.6, 2.4)), up = eio(seg(t, 4.3, 5.2));
    R.setBattery(this.fill, 0.7 - 0.36 * dn + 0.5 * up);
    this.dn.style.opacity = eo(seg(t, 1.5, 1.8)) * (1 - eo(seg(t, 2.8, 3.1))); this.up.style.opacity = eo(seg(t, 4.2, 4.5)) * (1 - eo(seg(t, 6.0, 6.4)));
    this.head.setAttribute('transform', 'rotate(' + (8 * ain * (1 - aout) - 8 * bin) + ' 0 30)');
    this.mouth.setAttribute('d', up > 0.5 ? 'M-12 24 Q2 36 16 24' : dn > 0.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.a1, 540, lerp(84, 70, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
    R.place(this.a2, 540, lerp(176, 164, eo(seg(t, 8.7, 9.2))), eo(seg(t, 8.7, 9.2)));
  },
});