const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-one', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('po') + R.tree('po') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('po', 'stand') + '</g><g class="po-ring">' + R.attn('po') + '</g>' +
      '<g class="po-bd">' + R.bird('po-b', '#5B8DB8') + '</g><g class="po-fl">' + R.flier('po-f', 'color-mix(in srgb, var(--second) 30%, var(--ground))') + '</g></svg>' +
      '<div class="tag tag-cool po-a">עניין בציפורים</div><div class="tag po-l">ציפור</div></div>'));
    Object.assign(this, R.refs(kit, 'po', ['head', 'eyes', 'mouth', 'ring', 'bd', 'fl', 'a', 'l']));
    this.fw = kit.stage.querySelector('.po-f-w');
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    this.head.setAttribute('transform', 'rotate(10 0 30)');
    R.xf(this.ring, 760, 340 + Math.sin(t * 2) * 6, 230 + Math.sin(t * 2.4) * 4, 1);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    // at first, just... a bird: it flies in and lands on a branch
    const [px, py] = R.PERCH[0], f = eio(seg(t, 5.6, 7.1));
    this.fl.style.opacity = t > 5.6 && t < 7.1 ? 1 : 0;
    this.fl.setAttribute('transform', 'translate(' + lerp(-80, px, f) + ' ' + (lerp(200, py - 20, f) - Math.sin(Math.PI * f) * 60) + ')');
    this.fw.setAttribute('transform', 'scale(1 ' + Math.sin(t * 22) + ')');
    R.xf(this.bd, px, py - 40, 1, t >= 7.1 ? 1 : 0);
    this.bd.setAttribute('transform', 'translate(' + px + ' ' + (py - 40 - Math.abs(Math.sin(Math.min(1, (t - 7.1) * 2) * Math.PI)) * 12 * (t > 7.1 ? 1 : 0)) + ')');
    this.mouth.setAttribute('d', t > 7.3 ? 'M-10 26 Q2 32 14 26' : 'M-10 27 Q2 30 14 27');
    R.place(this.l, px, lerp(632, 620, eo(seg(t, 7.2, 7.6))), eo(seg(t, 7.2, 7.6)));
  },
});
