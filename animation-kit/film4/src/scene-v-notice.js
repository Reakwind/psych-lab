const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(270 962)">' + R.ruth('vn', 'stand') + '</g>' +
      '<path class="vn-stir" pathLength="1" style="fill:none;stroke:color-mix(in srgb, var(--accent) 70%, var(--second));stroke-width:9;stroke-linecap:round" d="M210 690 q15 -24 30 0 t30 0 t30 0 t30 0"/>' +
      '<rect class="vn-ring" x="525" y="380" width="470" height="180" rx="44" style="fill:none;stroke:var(--accent);stroke-width:10;opacity:0"/></svg>' +
      '<div class="thought sm vn-c">כמה דקות לא שוות את זה</div><div class="btn vn-pass">לתת לחלוף</div><div class="btn keep vn-keep">לאמץ</div>' +
      '<div class="tag tag-cool vn-t1">לשים לב</div><div class="tag tag-warm vn-t2">ולבחור</div></div>'));
    Object.assign(this, R.refs(kit, 'vn', ['head', 'eyes', 'mouth', 'stir', 'ring', 'c', 'pass', 'keep', 't1', 't2']));
  },
  render(t) {
    R.blink(this.eyes, t, 2.2);
    this.head.setAttribute('transform', 'rotate(' + (9 + Math.sin(t * 0.8) * 2) + ' 0 30)');
    R.put(this.c, 760, 470 + Math.sin(t * 1.6) * 6, 1, 0, 1);
    // she notices the thought, and what it stirs in her, then chooses
    const n = eo(seg(t, 2.4, 3.0));
    this.ring.style.opacity = 0.8 * n * (1 - eo(seg(t, 5.0, 5.6)));
    const s = eo(seg(t, 4.2, 5.0));
    this.stir.style.strokeDasharray = s + ' 1'; this.stir.style.opacity = s > 0 ? 1 - 0.5 * eo(seg(t, 6.0, 7.0)) : 0;
    this.stir.setAttribute('transform', 'translate(0 ' + Math.sin(t * 6) * 3 * s + ')');
    R.put(this.pass, 650, 640, eob(seg(t, 5.0, 5.5), 1.6), 0, eo(seg(t, 5.0, 5.2)));
    R.put(this.keep, 880, 640, eob(seg(t, 5.2, 5.7), 1.6), 0, eo(seg(t, 5.2, 5.4)));
    R.place(this.t1, 760, lerp(316, 304, eo(seg(t, 2.5, 3.0))), eo(seg(t, 2.5, 3.0)));
    R.place(this.t2, 760, lerp(746, 734, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)));
  },
});
