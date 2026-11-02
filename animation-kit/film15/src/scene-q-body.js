const { seg, eo, eio, eob, lerp } = kit;
// inside Ruth's chest (session 3b's cutaway): the lungs fill on their own, no big breath and no forced hold; a small box gives the rhythm
kit.scene('q-body', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.torso('q8') + R.box('q8b') + '<rect class="q8-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag q8-a">לא צריך לקחת נשימה גדולה במיוחד</div><div class="tag q8-b">וגם לא להחזיק אותה בכוח</div><div class="tag tag-cool q8-c">הגוף נושם</div><div class="tag tag-warm q8-d">ואנחנו רק נותנים לו את הקצב</div></div>'));
    Object.assign(this, R.refs(kit, 'q8', ['lung', 'gut', 'belly', 'air', 'veil', 'a', 'b', 'c', 'd']));
    this.dia = kit.stage.querySelector('g.q8-dia'); this.x = R.boxRefs(kit, 'q8b');
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.8));
    const box = eo(seg(t, 7.9, 8.5));
    // a calm natural breath; after "the rhythm" it follows the little box's four even beats
    const nat = (1 - Math.cos(2 * Math.PI * t / 4.6)) / 2;
    const dp = Math.max(0, t - 8.0) / 0.9, k = Math.floor(dp % 4), f = dp % 1;
    const bx = k === 0 ? eio(f) : k === 1 ? 1 : k === 2 ? 1 - eio(f) : 0;
    const b = lerp(nat, bx, box);
    this.lung.setAttribute('transform', 'translate(540 560) scale(' + (1 + 0.05 * b) + ' ' + (1 + 0.08 * b) + ') translate(-540 -560)');
    this.dia.setAttribute('transform', 'translate(0 ' + 40 * b + ')');
    this.gut.setAttribute('transform', 'translate(' + 12 * b + ' ' + 26 * b + ')');
    this.belly.setAttribute('transform', 'translate(640 0) scale(' + (1 + 0.18 * b) + ' 1) translate(-640 0)');
    this.air.style.opacity = 0;
    R.setBox(this.x, { x: 900, y: 790, w: 150, alpha: box, pane: 0.7, dot: t > 8 ? dp : 0, lit: 0, ring: 0.3 + 0.6 * bx });
    R.place(this.a, 540, lerp(992, 980, eo(seg(t, 1.6, 2.0))), eo(seg(t, 1.6, 2.0)) * (1 - eo(seg(t, 4.0, 4.3))));
    R.place(this.b, 540, lerp(992, 980, eo(seg(t, 4.23, 4.6))), eo(seg(t, 4.23, 4.6)) * (1 - eo(seg(t, 7.8, 8.1))));
    R.place(this.c, 880, lerp(532, 520, eo(seg(t, 5.67, 6.0))), eo(seg(t, 5.67, 6.0)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.d, 540, lerp(992, 980, eo(seg(t, 8.14, 8.5))), eo(seg(t, 8.14, 8.5)));
  },
});
