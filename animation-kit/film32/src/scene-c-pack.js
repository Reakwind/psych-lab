const { seg, eo, eio, eob, lerp } = kit;
// part 6: on her path (session 1), Ruth with her backpack — you don't have to explain Parkinson's to everyone;
// Parkinson's is the backpack she copes with, not who she is
kit.scene('c-pack', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('c3', { sun: true }) +
      '<ellipse class="c3-glow" cx="540" cy="760" rx="170" ry="260" style="fill:var(--accent);opacity:0"/><g transform="translate(540 1000) scale(.82)">' + R.packed('c3') + '</g>' +
      '<path class="c3-ln" d="M330 720 L430 690" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:8 10;opacity:0"/></svg>' +
      '<div class="tag tag-cool c3-not">אתם לא חייבים להסביר את הפרקינסון לכל אחד</div><div class="tag tag-warm c3-pd">פרקינסון</div>' +
      '<div class="tag c3-cope">משהו שאתם מתמודדים איתו</div><div class="tag tag-warm c3-def">לא משהו שמגדיר אתכם</div></div>'));
    Object.assign(this, R.refs(kit, 'c3', ['glow', 'eyes', 'mouth', 'head', 'ln', 'not', 'pd', 'cope', 'def']));
    this.tops = R.PATH.map((_, i) => kit.stage.querySelector('.c3-st' + i + '-top'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.tops.forEach((el, i) => { el.style.fill = i < 2 ? 'var(--accent)' : ''; });
    R.place(this.not, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    // the backpack is named; what she carries, not who she is
    const pd = eo(seg(t, 4.5, 4.9));
    R.place(this.pd, 250, lerp(732, 720, pd), pd); this.ln.style.opacity = pd;
    R.place(this.cope, 250, lerp(812, 800, eo(seg(t, 6.6, 7.0))), eo(seg(t, 6.6, 7.0)));
    const me = eo(seg(t, 8.0, 8.6));
    this.glow.style.opacity = 0.2 * me;
    R.place(this.def, 540, lerp(162, 150, me), me);
    this.mouth.setAttribute('d', t > 8.2 ? R.mouthHappy : R.mouthNeutral);
    this.head.setAttribute('transform', 'rotate(' + (-4 * eio(seg(t, 8.2, 8.9))) + ' 0 30)');
  },
});
