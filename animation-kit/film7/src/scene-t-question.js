const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-question', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="thought heavy tv-c" style="width:760px;font-size:50px">"שום דבר אף פעם לא מסתדר לי."</div><div class="count tv-q" style="font-size:150px;color:var(--accent)">?</div>' +
      '<div class="tag tag-warm tv-cap">אותן מילים. רק סימן שאלה.</div></div>'));
    Object.assign(this, R.refs(kit, 'tv', ['c', 'q', 'cap']));
  },
  render(t) {
    // the full stop becomes a question mark, and the thought softens
    const q = t > 1.3;
    const txt = q ? '"שום דבר אף פעם לא מסתדר לי?"' : '"שום דבר אף פעם לא מסתדר לי."';
    if (this.c.textContent !== txt) this.c.textContent = txt;
    this.c.classList.toggle('heavy', !q);
    this.c.style.background = q ? 'color-mix(in srgb, var(--ground) 40%, white)' : '';
    R.put(this.c, 540, 540, 1 + 0.04 * Math.sin(Math.PI * seg(t, 1.3, 1.8)), 0, 1);
    const p = seg(t, 0.8, 1.4);
    R.put(this.q, lerp(540, 165, eio(p)), lerp(260, 540, eio(p)), lerp(1.4, 0.4, eio(p)), 0, p > 0 && p < 1 ? 1 : 0);
    R.place(this.cap, 540, lerp(812, 800, eo(seg(t, 5.8, 6.3))), eo(seg(t, 5.8, 6.3)));
  },
});