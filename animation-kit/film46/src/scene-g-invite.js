const { seg, eo, eio, eob, lerp } = kit;
// Ariel's invitation; Ruth closes her eyes and one thing she is grateful for slowly glows in her mind (it stays unnamed)
kit.scene('g-invite', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gi', -120) +
      '<g class="gi-ph"><g transform="scale(1.7)">' + R.phone('gi-p', 0, 0, 'ariel') + '</g></g>' +
      '<g class="gi-mem">' + R.memory('gi-m', '<circle class="gi-glow" r="110" style="fill:var(--accent);opacity:0"/><g class="gi-tok">' + R.warm('gi-u', 'heart') + '</g>') + '</g></svg>' +
      '<div class="tag tag-warm gi-a">משהו אחד שאתם מכירים עליו תודה</div></div>'));
    Object.assign(this, R.refs(kit, 'gi', ['body', 'head', 'eyes', 'mouth', 'ph', 'mem', 'glow', 'tok', 'a']));
  },
  render(t) {
    const closed = t > 1.6;
    if (closed) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.016, 4.2) + ')');
    R.xf(this.ph, 390, lerp(760, 690, eio(seg(t, 0, 0.6))), eob(seg(t, 0, 0.6), 1.4), eo(seg(t, 0, 0.2)) * (1 - eo(seg(t, 2.4, 3.2))));
    R.xf(this.mem, 760, 300 + Math.sin(t * 1.2) * 6, 1.05 * eob(seg(t, 1.8, 2.5), 1.4), eo(seg(t, 1.8, 2.0)));
    // the moment forms slowly, through the silence
    const g = eio(seg(t, 2.4, 7.0));
    this.tok.setAttribute('transform', 'scale(' + (0.3 + 1.1 * g) + ')'); this.tok.style.opacity = 0.2 + 0.8 * g;
    this.glow.style.opacity = 0.4 * g * (0.85 + 0.15 * Math.sin(t * 2));
    this.head.setAttribute('transform', 'rotate(' + (4 * eio(seg(t, 1.6, 2.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
  },
});
