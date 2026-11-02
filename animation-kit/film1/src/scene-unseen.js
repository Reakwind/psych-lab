const { seg, eo, eio, lerp } = kit;
kit.scene('unseen', {
  init(kit) {
    const passer = R.nira('unseen-p', 'stand').replace(/nira-top-dk/g, 'slate-dk').replace(/nira-top/g, 'slate').replace(/nira-hair-dk/g, 'hair-dk').replace(/nira-hair/g, 'hair-dk');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('unseen') +
      '<g class="unseen-walker">' + R.packBehind('unseen') + '<g class="unseen-body">' + R.ruth('unseen', 'stand') + '</g>' + R.straps('unseen') + R.packX('unseen') + '</g>' +
      '<g class="unseen-passer">' + passer + '</g>' +
      '</svg><div class="tag tag-warm unseen-tired">מתיש</div><div class="tag tag-cool unseen-cap">גם כשלא רואים מבחוץ</div></div>'));
    Object.assign(this, R.refs(kit, 'unseen', ['walker', 'body', 'pack', 'straps', 'xray', 'head', 'eyes', 'mouth', 'passer', 'tired', 'cap']));
    this.p = R.refs(kit, 'unseen-p', ['head', 'eyes']);
  },
  render(t) {
    // the stones weigh her down
    const sag = eio(seg(t, 0.6, 2.4));
    this.walker.setAttribute('transform', 'translate(400 ' + (970 + 6 * sag) + ')');
    this.body.setAttribute('transform', 'scale(1 ' + (1 - 0.025 * sag) + ')');
    this.pack.setAttribute('transform', 'translate(0 ' + 14 * sag + ')'); this.straps.setAttribute('transform', 'translate(0 ' + 6 * sag + ')');
    this.xray.setAttribute('transform', 'translate(0 ' + 14 * sag + ')');
    this.head.setAttribute('transform', 'rotate(' + (5 * sag) + ' 0 30) translate(0 ' + 8 * sag + ')');
    this.mouth.setAttribute('d', sag > 0.5 ? 'M-10 30 Q2 26 14 30' : 'M-10 26 Q2 32 14 26');
    R.blink(this.eyes, t, 0.5);
    R.place(this.tired, 400, lerp(330, 318, eo(seg(t, 2.2, 2.8))), eo(seg(t, 2.2, 2.8)) * (1 - eo(seg(t, 4.2, 4.6))));
    // a passer-by sees only a woman walking: the see-through view goes away
    const come = eio(seg(t, 4.0, 6.0));
    this.passer.setAttribute('transform', 'translate(' + lerp(1240, 820, come) + ' ' + (960 + (come > 0 && come < 1 ? Math.abs(Math.sin(t * 7.5)) * -6 : 0)) + ') scale(.92)');
    this.p.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 6.0, 6.6))) + ' 0 30)');
    R.blink(this.p.eyes, t, 2.4);
    this.xray.style.opacity = 1 - eo(seg(t, 6.2, 7.0));
    R.place(this.cap, 540, lerp(110, 96, eo(seg(t, 6.6, 7.2))), eo(seg(t, 6.6, 7.2)));
  },
});
