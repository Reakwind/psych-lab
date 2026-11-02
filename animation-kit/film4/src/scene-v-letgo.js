const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-letgo', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<ellipse class="vl-glow amber-lt" cx="270" cy="966" rx="170" ry="34" opacity="0"/><g transform="translate(270 962)"><g class="vl-body">' + R.ruth('vl', 'stand') + '</g></g></svg>' +
      '<div class="thought sm vl-c">כמה דקות לא שוות את זה</div><div class="tag tag-warm vl-just">רק מחשבה</div><div class="tag tag-cool vl-cap">יציב וגמיש יותר</div></div>'));
    Object.assign(this, R.refs(kit, 'vl', ['glow', 'body', 'head', 'eyes', 'mouth', 'c', 'just', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.head.setAttribute('transform', 'rotate(' + (9 - 9 * eio(seg(t, 4.6, 5.6))) + ' 0 30)');
    // she smiles at the harsh thought and lets it pass: it drifts up and away
    this.mouth.setAttribute('d', t > 0.9 ? 'M-14 22 Q2 40 18 22' : 'M-10 26 Q2 32 14 26');
    const go = eio(seg(t, 3.3, 5.2));
    R.put(this.c, 760 + go * 120, 470 - go * 700, 1 - 0.35 * go, go * 10, 1 - eo(seg(t, 4.2, 5.2)));
    R.place(this.just, 760, lerp(470, 456, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)) * (1 - eo(seg(t, 8.0, 8.5))));
    // ...and stands a little steadier
    const st = eo(seg(t, 8.3, 9.3));
    this.glow.style.opacity = 0.7 * st;
    this.body.setAttribute('transform', 'scale(' + (1 + 0.02 * st) + ' ' + (1 + 0.03 * st) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 8.5, 9.0))), eo(seg(t, 8.5, 9.0)));
  },
});
