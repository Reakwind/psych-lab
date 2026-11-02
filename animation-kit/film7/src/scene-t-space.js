const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-space', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g class="tk-walker"><g class="tk-a">' + R.ruth('tk', 'stand') + '</g><g class="tk-b">' + R.ruth('tk-b', 'step') + '</g></g>' +
      '<g class="tk-gap"><path class="ink tk-line" pathLength="1" style="stroke-width:6"/><path class="ink tk-ends" style="stroke-width:6"/></g></svg>' +
      '<div class="thought sm tk-c">"בטח משהו לא בסדר."</div><div class="tag tag-warm tk-st">מחשבה</div><div class="tag tag-cool tk-cap">נוצר קצת מרחב</div><div class="tag tk-auto">לא חייבים ללכת אחריה</div></div>'));
    Object.assign(this, R.refs(kit, 'tk', ['walker', 'a', 'b', 'head', 'eyes', 'line', 'ends', 'gap', 'c', 'st', 'cap', 'auto']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    // once it's labelled a thought, she can step back from it
    const back = eio(seg(t, 3.3, 4.4)), stepping = t > 3.3 && t < 4.4, step = stepping ? Math.floor(t * 3) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    const rx = lerp(400, 270, back), cx = lerp(640, 760, back);
    this.walker.setAttribute('transform', 'translate(' + rx + ' 962)');
    R.put(this.c, cx, 470 + Math.sin(t * 1.6) * 6, lerp(0.9, 1, back), 0, 1);
    R.put(this.st, cx + 150, 400, eob(seg(t, 1.1, 1.5), 2), -8, eo(seg(t, 1.1, 1.3)));
    const g = eo(seg(t, 4.2, 5.0)), x0 = rx + 70, x1 = cx - 225;
    this.gap.setAttribute('transform', 'translate(' + x0 + ' 600)');
    this.line.setAttribute('d', 'M0 0 H' + (x1 - x0)); this.line.style.strokeDasharray = g + ' 1'; this.line.style.opacity = g > 0 ? 1 : 0;
    this.ends.setAttribute('d', 'M0 -22 V22 M' + (x1 - x0) + ' -22 V22'); this.ends.style.opacity = g;
    this.head.setAttribute('transform', 'rotate(' + (6 * (1 - back) + 3) + ' 0 30)');
    R.place(this.cap, (x0 + x1) / 2, lerp(642, 630, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
    R.place(this.auto, 540, lerp(84, 70, eo(seg(t, 7.4, 7.9))), eo(seg(t, 7.4, 7.9)));
  },
});