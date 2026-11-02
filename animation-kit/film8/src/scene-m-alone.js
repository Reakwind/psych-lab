const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-alone', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.talRoom('ma') + '</svg>' +
      '<div class="tag tag-cool ma-lim">מגבלה פיזית</div><div class="tag ma-a">ארוחה שלמה לבד</div><div class="tag tag-warm ma-b">משימה קשה יותר</div><div class="tag ma-name">טל</div></div>'));
    Object.assign(this, R.refs(kit, 'ma', ['tal', 'serve', 'fam0', 'fam1', 'fam2', 'dish0', 'dish1', 'dish2', 'pot0', 'pot1', 'pot2', 'pot3', 't-head', 't-eyes', 't-mouth', 'lim', 'a', 'b', 'name']));
    [0, 1, 2].forEach((k) => { this['fam' + k].style.opacity = 0; this['dish' + k].style.opacity = 0; });
    this.serve.style.opacity = 0;
  },
  render(t) {
    R.blink(this['t-eyes'], t, 0.6);
    // a whole meal, alone: the pots pile up beside Tal
    [0, 1, 2, 3].forEach((k) => { const a = 2.7 + k * 0.35, p = eob(seg(t, a, a + 0.4), 1.8); this['pot' + k].setAttribute('transform', 'translate(0 ' + lerp(-80, 0, eo(seg(t, a, a + 0.4))) + ')'); this['pot' + k].style.opacity = eo(seg(t, a, a + 0.15)); });
    const sag = eio(seg(t, 4.6, 5.6));
    this['t-head'].setAttribute('transform', 'rotate(' + lerp(0, -10, eio(seg(t, 2.6, 3.4))) + ' 0 30) translate(0 ' + 8 * sag + ')');
    this['t-mouth'].setAttribute('d', t > 3 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    this.tal.setAttribute('transform', 'translate(0 ' + 6 * sag + ')');
    R.place(this.name, 900, 518, 1 - eo(seg(t, 0.6, 1.0)));
    R.place(this.lim, 900, lerp(530, 518, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.8, 3.2))), eo(seg(t, 2.8, 3.2)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 5.4, 5.8))), eo(seg(t, 5.4, 5.8)));
  },
});
