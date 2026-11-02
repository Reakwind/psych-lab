const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('ph') + R.tree('ph') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('ph', 'stand') + '</g><g class="ph-ring">' + R.attn('ph') + '</g></svg>' +
      '<div class="tag tag-cool ph-title">מפגש 43 · להתבונן בחוויה נעימה</div><div class="tag ph-b">פתאום רואים אותו בכל מקום</div></div>'));
    Object.assign(this, R.refs(kit, 'ph', ['head', 'eyes', 'mouth', 'ring', 'title', 'b']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
    // when something occupies us, attention goes looking for it
    const on = eob(seg(t, 1.3, 1.9), 1.5), go = eio(seg(t, 3.0, 4.4));
    R.xf(this.ring, lerp(250, 760, go), lerp(560, 340, go) + Math.sin(t * 2) * 6, (lerp(110, 230, go) + Math.sin(t * 2.4) * 4) * on, eo(seg(t, 1.3, 1.5)));
    this.head.setAttribute('transform', 'rotate(' + (10 * go) + ' 0 30)');
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
  },
});
