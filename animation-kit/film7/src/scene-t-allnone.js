const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-allnone', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect x="240" y="620" width="600" height="40" rx="20" style="fill:color-mix(in srgb, var(--accent) 22%, var(--ground));stroke:var(--second);stroke-width:6"/>' +
      '<circle cx="260" cy="640" r="34" class="slate-dk"/><circle cx="820" cy="640" r="34" class="slate-dk"/><circle class="tz-knob" r="44" style="fill:var(--accent);stroke:var(--second);stroke-width:6"/></svg>' +
      '<div class="thought tz-c">"אם אני לא יכול לעשות את זה כמו פעם, אין טעם לעשות את זה בכלל."</div><div class="tag tz-l">כלום</div><div class="tag tz-r">הכול</div><div class="tag tag-warm tz-cap">הולך לקצה</div></div>'));
    Object.assign(this, R.refs(kit, 'tz', ['knob', 'c', 'l', 'r', 'cap']));
  },
  render(t) {
    // all or nothing: no middle ground on the switch
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.7, 1.2))), eo(seg(t, 0.7, 1.2)));
    R.put(this.c, 540, 340, eob(seg(t, 0.9, 1.4), 1.4), 0, eo(seg(t, 0.9, 1.1)));
    const s = eob(seg(t, 4.3, 4.7), 2.2), wob = Math.sin(t * 3) * 0.06 * (1 - seg(t, 4.0, 4.3));
    this.knob.setAttribute('cx', lerp(lerp(540, 820, 0.5 + wob), 260, s)); this.knob.setAttribute('cy', 640);
    R.place(this.l, 260, 700, 1); R.place(this.r, 820, 700, 1);
  },
});