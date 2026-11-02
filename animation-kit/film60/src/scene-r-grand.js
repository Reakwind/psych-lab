const { seg, eo, eio, eob, lerp } = kit;
// grandparents: a shorter visit with the grandchildren, or a quieter thing to do together
kit.scene('r-grand', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('rg', -180) +
      '<g transform="translate(540 230)">' + R.clock('rg-cl') + '</g><path class="rg-arc" style="fill:none;stroke:var(--accent);stroke-width:14;stroke-linecap:round"/>' +
      '<g class="rg-tb">' + R.puzzleTable('rg-p') + '</g><g class="rg-k">' + R.kid('rg-c') + '</g></svg>' +
      '<div class="tag rg-short">מפגש קצר יותר</div><div class="tag tag-warm rg-quiet">פעילות משותפת ושקטה יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'rg', ['head', 'eyes', 'mouth', 'body', 'arc', 'tb', 'k', 'short', 'quiet']));
    this.mh = kit.stage.querySelector('.rg-cl-m'); this.ke = kit.stage.querySelector('.rg-c-eyes');
    this.last = kit.stage.querySelector('.rg-p-last');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ke, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the grandchild comes in
    const come = eio(seg(t, 0.2, 1.6)), hop = t > 0.2 && t < 1.6 ? Math.abs(Math.sin(t * 9)) * 10 : 0;
    // a short visit: the clock's hand sweeps only a little way
    const sw = eio(seg(t, 2.6, 3.6));
    this.mh.setAttribute('transform', 'rotate(' + (60 * sw) + ')');
    const a0 = -Math.PI / 2, a1 = a0 + Math.PI / 3 * sw, rr = 90;
    this.arc.setAttribute('d', 'M' + (540 + rr * Math.cos(a0)) + ' ' + (230 + rr * Math.sin(a0)) + ' A' + rr + ' ' + rr + ' 0 0 1 ' + (540 + rr * Math.cos(a1)).toFixed(1) + ' ' + (230 + rr * Math.sin(a1)).toFixed(1));
    this.arc.style.opacity = sw > 0 ? 1 : 0;
    R.place(this.short, 760, lerp(214, 202, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)));
    // a quieter shared activity: a puzzle on a little table between them
    const tb = eo(seg(t, 4.6, 5.3)), piece = eio(seg(t, 6.2, 7.0));
    this.tb.setAttribute('transform', 'translate(700 900) scale(' + (0.7 + 0.3 * eob(tb, 1.4)) + ')'); this.tb.style.opacity = tb;
    this.last.setAttribute('transform', 'translate(' + (-41 * piece) + ' ' + (-30 * Math.sin(Math.PI * piece)) + ')');
    this.k.setAttribute('transform', 'translate(' + lerp(1180, 910, come) + ' ' + (1000 - hop) + ')');
    R.place(this.quiet, 540, lerp(84, 70, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
    this.head.setAttribute('transform', 'rotate(' + (8 * come) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
