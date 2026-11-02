const { seg, eo, eio, eob, lerp } = kit;
// part 16: sitting (right) or lying (left), eyes open or closed; find the posture that suits the body today, and give yourselves a few minutes
kit.scene('q-posture', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><defs><clipPath id="q9-cr"><rect class="q9-cr" x="0" y="0" width="1080" height="1080"/></clipPath><clipPath id="q9-cl"><rect class="q9-cll" x="0" y="0" width="0" height="1080"/></clipPath></defs>' +
      '<g clip-path="url(#q9-cr)">' + R.room({ shoes: false }) + '<g class="q9-r"><ellipse class="q9-g0" cx="500" cy="640" rx="170" ry="210" style="fill:var(--accent);opacity:0"/>' + R.seated('q9', 0) + '</g></g>' +
      '<g clip-path="url(#q9-cl)"><rect class="floor" width="540" height="1080"/>' + [-3, -2, -1].map((k) => '<rect class="floor-dk" opacity=".3" x="0" y="' + (224.8 + k * 80.6) + '" width="540" height="3.1"/>').join('') + [9, 10].map((k) => '<rect class="floor-dk" opacity=".3" x="0" y="' + (224.8 + k * 80.6) + '" width="540" height="3.1"/>').join('') +
      '<g transform="translate(-50 200) scale(.62)">' + R.lying('q9l') + '<ellipse class="q9-g1" cx="500" cy="540" rx="360" ry="200" style="fill:var(--accent);opacity:0"/></g></g>' +
      '<rect class="q9-div" x="536" y="0" width="8" height="1080" style="fill:var(--second);opacity:0"/></svg>' +
      '<div class="tag tag-cool q9-sit">בישיבה</div><div class="tag tag-cool q9-lie">או בשכיבה</div><div class="tag q9-open">בעיניים פקוחות</div><div class="tag q9-shut">או עצומות</div>' +
      '<div class="tag q9-find">מצאו תנוחה שמתאימה לגוף שלכם היום</div><div class="tag tag-warm q9-give">תנו לעצמכם כמה דקות של תשומת לב מכל הלב</div></div>'));
    Object.assign(this, R.refs(kit, 'q9', ['cr', 'cll', 'r', 'g0', 'g1', 'body', 'eyes', 'mouth', 'div', 'sit', 'lie', 'open', 'shut', 'find', 'give']));
    this.le = kit.stage.querySelector('.q9l-eyes'); kit.stage.querySelector('.q9l-plant').style.opacity = 0; this.lm = kit.stage.querySelector('.q9l-mouth');
  },
  render(t) {
    // the frame splits: the armchair moves to the right half, the mat appears on the left
    const sp = eio(seg(t, 0.5, 1.5));
    this.r.setAttribute('transform', 'translate(' + lerp(-60, 270, sp) + ' 0)');
    this.cr.setAttribute('x', 540 * sp); this.cll.setAttribute('width', 540 * sp); this.div.style.opacity = sp;
    R.place(this.sit, 810, lerp(212, 200, eo(seg(t, 1.1, 1.6))), eo(seg(t, 1.1, 1.6)));
    R.place(this.lie, 270, lerp(212, 200, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
    // eyes open, then closed, on both
    const shut = t > 4.1;
    if (shut) { R.closeEyes(this.eyes); R.closeEyes(this.le); } else { R.blink(this.eyes, t, 0.2); R.blink(this.le, t, 1.4); }
    R.place(this.open, 540, lerp(84, 70, eo(seg(t, 3.1, 3.5))), eo(seg(t, 3.1, 3.5)) * (1 - eo(seg(t, 3.9, 4.1))));
    R.place(this.shut, 540, lerp(84, 70, eo(seg(t, 4.0, 4.4))), eo(seg(t, 4.0, 4.4)) * (1 - eo(seg(t, 8.0, 8.3))));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    R.place(this.find, 540, lerp(952, 940, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
    // a few minutes of wholehearted attention: a warm glow on both
    const g = eo(seg(t, 8.2, 9.4));
    this.g0.style.opacity = 0.2 * g; this.g1.style.opacity = 0.2 * g;
    this.mouth.setAttribute('d', t > 8.6 ? R.mouthHappy : R.mouthNeutral); this.lm.setAttribute('d', t > 8.6 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.give, 540, lerp(84, 70, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)));
  },
});
