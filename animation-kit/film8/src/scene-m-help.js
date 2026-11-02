const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-help', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.talRoom('mx') + '</svg>' +
      '<div class="tag tag-cool mx-a">בני המשפחה מציעים לעזור</div><div class="tag tag-warm mx-b">כל אחד יביא משהו</div></div>'));
    Object.assign(this, R.refs(kit, 'mx', ['tal', 'serve', 'fam0', 'fam1', 'fam2', 'dish0', 'dish1', 'dish2', 't-head', 't-eyes', 't-mouth', 'a', 'b']));
    this.serve.style.opacity = 0;
    this.fe = [0, 1, 2].map((k) => kit.stage.querySelector('.mx-f' + k + '-eyes'));
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.6); this.fe.forEach((e, k) => R.blink(e, t, 1.3 + k * 0.7));
    // the family comes in from the left, and each sets down a dish
    [0, 1, 2].forEach((k) => {
      const w = eio(seg(t, 0.1 + (2 - k) * 0.25, 1.3 + (2 - k) * 0.25)), bob = w > 0 && w < 1 ? Math.abs(Math.sin(t * 9 + k)) * -8 : 0;
      this['fam' + k].setAttribute('transform', 'translate(' + lerp(-640, 0, w) + ' ' + bob + ')');
      const a = 2.5 + k * 0.25, d = eo(seg(t, a, a + 0.5));
      this['dish' + k].setAttribute('transform', 'translate(0 ' + lerp(-70, 0, d) + ')'); this['dish' + k].style.opacity = eo(seg(t, a, a + 0.2));
    });
    this['t-head'].setAttribute('transform', 'rotate(' + lerp(-10, -4, eio(seg(t, 0.6, 1.4))) + ' 0 30)');
    this['t-mouth'].setAttribute('d', t > 2.8 ? 'M-10 27 Q2 31 14 27' : 'M-10 30 Q2 24 14 30');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.1, 1.5))), eo(seg(t, 1.1, 1.5)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)));
  },
});
