const { seg, eo, eio, eob, lerp } = kit;
// not ignoring what is hard, not pretending all is well; gratitude can feel warm, and it can feel fragile or mixed
const [OFF, PICK] = R.dayStop(300, 540);
kit.scene('g-hard', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('gh', -120) + R.dayBar('gh', 220) + R.dayItems('gh') +
      '<g class="gh-up">' + R.warm('gh-u', 'heart') + '<clipPath id="gh-half"><rect x="-60" y="-60" width="60" height="120"/></clipPath><g class="gh-mix" clip-path="url(#gh-half)"><circle r="46" style="fill:color-mix(in srgb, var(--second) 40%, var(--ground));opacity:.75"/></g>' +
      '<path class="gh-crack" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1;stroke-dashoffset:1" d="M-6 -46 L8 -18 L-8 2 L10 24 L0 46"/></g></svg>' +
      '<div class="tag gh-a">לא להתעלם ממה שקשה</div><div class="tag struck gh-b">הכול טוב</div><div class="tag tag-warm gh-c">שמחה וחמימות</div><div class="tag tag-cool gh-d">שברירית או מורכבת</div></div>'));
    Object.assign(this, R.refs(kit, 'gh', ['body', 'head', 'eyes', 'mouth', 'up', 'mix', 'crack', 'a', 'b', 'c', 'd']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.gh-i' + i)); this.ug = kit.stage.querySelector('.gh-u-glow');
    R.placeDay(this.it, 220, OFF); this.it[PICK].style.opacity = 0;
    this.gr = R.DAYK.map((k, i) => (k === 'g' ? this.it[i] : null));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the grey blocks stay in view: a gentle pulse, nothing covered up
    const pulse = Math.sin(Math.PI * seg(t, 1.2, 2.4));
    this.gr.forEach((g, i) => { if (g) g.setAttribute('transform', 'translate(' + R.dayX(i, OFF) + ' 220) scale(' + (1 + 0.1 * pulse) + ')'); });
    this.b.style.setProperty('--s', eio(seg(t, 4.0, 4.6)));
    // warmth: the moment glows, and she smiles...
    const joy = eio(seg(t, 6.6, 7.6)), frag = eio(seg(t, 9.6, 10.6));
    R.xf(this.up, 760, 470 + Math.sin(t * 2) * 6, 1.5 + 0.15 * joy, 1);
    this.ug.style.opacity = (0.25 + 0.3 * joy - 0.25 * frag) * (0.85 + 0.15 * Math.sin(t * 3));
    // ...and it can also feel fragile, or mixed
    this.crack.style.strokeDashoffset = 1 - frag; this.mix.style.opacity = eio(seg(t, 10.4, 11.2));
    this.head.setAttribute('transform', 'rotate(' + (6 * joy - 2 * frag + 5 * eio(seg(t, 10.4, 11.2))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 10.0 ? 'M-10 28 Q2 28 14 28' : joy > 0.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(342, 330, eo(seg(t, 1.2, 1.7))), eo(seg(t, 1.2, 1.7)) * (1 - eo(seg(t, 5.4, 5.7))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.2, 3.7))), eo(seg(t, 3.2, 3.7)) * (1 - eo(seg(t, 5.4, 5.7))));
    R.place(this.c, 760, lerp(592, 580, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)) * (1 - eo(seg(t, 9.8, 10.1))));
    R.place(this.d, 760, lerp(592, 580, eo(seg(t, 10.1, 10.6))), eo(seg(t, 10.1, 10.6)));
  },
});
