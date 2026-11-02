const { seg, eo, eio, eob, lerp } = kit;
// part 6: not changing the breath, only noticing the breath that is already happening — her own uneven breath draws itself
const f = (u) => (26 + 10 * Math.sin(u * 0.7) + 6 * Math.sin(u * 1.9)) * Math.sin(u * 1.45 + 0.4 * Math.sin(u * 0.5));
kit.scene('q-watch', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('q4', -60) + R.beam('q4b') +
      '<path class="q4-tr" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round;stroke-linejoin:round"/><circle class="q4-pen" r="14" style="fill:var(--accent);stroke:var(--second);stroke-width:4"/></svg>' +
      '<div class="tag q4-no">לא מנסים לשנות את הנשימה</div><div class="tag tag-cool q4-yes">רק שמים לב לנשימה שכבר מתרחשת</div></div>'));
    Object.assign(this, R.refs(kit, 'q4', ['body', 'eyes', 'mouth', 'tr', 'pen', 'no', 'yes']));
    this.b = R.beamRefs(kit, 'q4b');
  },
  render(t) {
    if (t > 0.8) R.closeEyes(this.eyes); else R.blink(this.eyes, t, 0.3);
    const v = f(t * 0.9);
    this.body.setAttribute('transform', 'scale(' + (1 + 0.0005 * v) + ' ' + (1 + 0.0004 * v) + ')');
    R.setBeam(this.b, 440, 660, lerp(190, 150, eio(seg(t, 0, 1.2))), 1, 1);
    // the trace of her breath scrolls in from the right, as it happens
    const show = eo(seg(t, 0.6, 1.4));
    this.tr.setAttribute('d', R.breathTrace(330, 250, 560, t)); this.tr.style.opacity = show;
    this.pen.setAttribute('transform', 'translate(890 ' + (250 - v) + ')'); this.pen.style.opacity = show;
    R.place(this.no, 540, lerp(84, 70, eo(seg(t, 0.8, 1.3))), eo(seg(t, 0.8, 1.3)) * (1 - eo(seg(t, 5.2, 5.6))));
    R.place(this.yes, 540, lerp(84, 70, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
  },
});
