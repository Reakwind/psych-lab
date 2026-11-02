const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-noneed', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('ao', -180) +
      '<g class="ao-card"><rect class="shade" x="-232" y="-160" width="480" height="330" rx="28"/><rect x="-240" y="-170" width="480" height="330" rx="28" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' +
      '<rect class="slate" x="-60" y="-196" width="120" height="40" rx="12"/></g></svg>' +
      '<div class="tag struck ao-i0">לשנות את עצמכם</div><div class="tag struck ao-i1">לפתור מראש את כל הספקות</div><div class="tag tag-warm ao-cap">לא צריך מראש</div></div>'));
    Object.assign(this, R.refs(kit, 'ao', ['body', 'head', 'eyes', 'mouth', 'card', 'i0', 'i1', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // the "before you can practise" list — both items crossed off
    const c = eio(seg(t, 0.2, 0.9));
    this.card.setAttribute('transform', 'translate(' + lerp(1300, 800, c) + ' 470) rotate(' + lerp(8, -2, c) + ')');
    R.place(this.i0, lerp(1300, 800, c), 382, 1); R.place(this.i1, lerp(1300, 800, c), 492, 1);
    this.i0.style.setProperty('--s', eo(seg(t, 1.6, 2.2))); this.i1.style.setProperty('--s', eo(seg(t, 5.0, 5.7)));
    this.mouth.setAttribute('d', t > 5.8 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.3, 1.8))), eo(seg(t, 1.3, 1.8)));
  },
});
