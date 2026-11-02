const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-strong', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tsg', 0) +
      '<path class="tsg-w" style="fill:none;stroke:color-mix(in srgb, var(--accent) 60%, var(--second));stroke-width:12;stroke-linecap:round"/></svg>' +
      '<div class="tag tag-cool tsg-a">כשמחשבה מעוררת רגש חזק</div><div class="tag tsg-b">בלי להתווכח איתה</div><div class="tag tag-warm tsg-c">ובלי למהר לשנות אותה</div></div>'));
    Object.assign(this, R.refs(kit, 'tsg', ['body', 'head', 'eyes', 'mouth', 'w', 'a', 'b', 'c']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    // a strong feeling rises; she lets it be, without fighting it
    const sw = eio(seg(t, 2.6, 3.6)) * (1 - 0.5 * eio(seg(t, 6.0, 7.5)));
    this.w.setAttribute('d', R.wavePath(260, 300, 560, 20 + 50 * sw, 2.4, -t * 2.5)); this.w.style.opacity = eo(seg(t, 2.6, 3.0));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, lerp(3.6, 2.2, sw)) + ')');
    this.mouth.setAttribute('d', sw > 0.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.7, 3.2))), eo(seg(t, 2.7, 3.2)));
    R.place(this.b, 300, lerp(472, 460, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)));
    R.place(this.c, 780, lerp(472, 460, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
  },
});