const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-distance', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="vd-walker"><g class="vd-a">' + R.ruth('vd', 'stand') + '</g><g class="vd-b">' + R.ruth('vd-b', 'step') + '</g></g>' +
      '<g class="vd-gap"><path class="ink vd-line" pathLength="1" style="stroke-width:6" d="M0 0 H1"/><path class="ink vd-ends" style="stroke-width:6"/></g></svg>' +
      '<div class="thought sm vd-c">כמה דקות לא שוות את זה</div><div class="tag struck vd-pos">לחשוב חיובי</div><div class="tag tag-warm vd-cap">מרחק בריא</div></div>'));
    Object.assign(this, R.refs(kit, 'vd', ['walker', 'a', 'b', 'head', 'eyes', 'mouth', 'gap', 'line', 'ends', 'c', 'pos', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    // not "think positive" — instead, a step back: the thought stays, but at arm's length
    const back = eio(seg(t, 3.0, 4.2)), stepping = t > 3.0 && t < 4.2;
    const rx = lerp(400, 270, back);
    const step = stepping ? Math.floor(t * 3) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + rx + ' 962)');
    const cx = lerp(640, 760, back);
    R.put(this.c, cx, 470 + Math.sin(t * 1.6) * 6, lerp(0.9, 1, back), 0, eo(seg(t, 0, 0.3)));
    // the gap between her and the thought, measured
    const g = eo(seg(t, 4.0, 4.8)), x0 = rx + 70, x1 = cx - 225;
    this.gap.setAttribute('transform', 'translate(' + x0 + ' 600)');
    this.line.setAttribute('d', 'M0 0 H' + (x1 - x0)); this.line.style.strokeDasharray = g + ' 1';
    this.ends.setAttribute('d', 'M0 -22 V22 M' + (x1 - x0) + ' -22 V22'); this.ends.style.opacity = g;
    this.head.setAttribute('transform', 'rotate(' + (6 * (1 - back) + 3) + ' 0 30)');
    R.place(this.pos, 540, lerp(84, 70, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)) * (1 - eo(seg(t, 3.4, 3.9))));
    this.pos.style.setProperty('--s', eo(seg(t, 2.2, 2.7)));
    R.place(this.cap, (x0 + x1) / 2, lerp(642, 630, eo(seg(t, 4.2, 4.7))), eo(seg(t, 4.2, 4.7)));
  },
});
