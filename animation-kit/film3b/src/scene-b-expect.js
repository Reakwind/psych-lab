const { seg, eo, eio, eob, lerp } = kit;
const P25 = 6.67, P26 = 11.58, P27 = 20.24;
kit.scene('b-expect', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('be', -140) +
      '<g class="be-box"><rect class="shade" x="-84" y="-56" width="176" height="122" rx="18"/><rect x="-90" y="-64" width="180" height="124" rx="18" style="fill:color-mix(in srgb, var(--second) 30%, var(--ground));stroke:var(--second);stroke-width:6"/><path class="ink" style="stroke-width:6" d="M-90 -24 H90"/></g>' +
      '<path class="be-w1" style="fill:none;stroke:var(--main);stroke-width:12;stroke-linecap:round"/><path class="be-w2" style="fill:none;stroke:var(--second);stroke-width:10;stroke-linecap:round;stroke-linejoin:round;opacity:.6"/>' +
      '<g class="be-bow"><path style="fill:var(--accent);stroke:var(--second);stroke-width:5" d="M0 0 C-50 -50 -90 -10 -60 20 C-40 40 -10 16 0 0Z M0 0 C50 -50 90 -10 60 20 C40 40 10 16 0 0Z M-6 0 L-30 70 L-12 66 L0 10 L12 66 L30 70 L6 0Z"/><circle r="14" class="amber-dk"/></g></svg>' +
      '<div class="tag tag-cool be-last">טיפ אחרון</div><div class="tag be-boxlab">ציפיות</div><div class="tag tag-warm be-aside">שמים אותן בצד</div>' +
      '<div class="tag struck be-c1">חייבים להירגע</div><div class="tag struck be-c2">חוויה מיוחדת</div><div class="tag be-l1">רגועה וזורמת</div><div class="tag be-l2">משעממת, לא נוחה</div>' +
      '<div class="tag tag-warm be-gift">כמה רגעים של נשימה ותשומת לב</div><div class="tag tag-cool be-body2">והגוף עושה את שלו</div></div>'));
    Object.assign(this, R.refs(kit, 'be', ['body', 'head', 'eyes', 'mouth', 'box', 'w1', 'w2', 'bow', 'last', 'boxlab', 'aside', 'c1', 'c2', 'l1', 'l2', 'gift', 'body2']));
  },
  render(t) {
    if (t > P27 + 4.8) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 1.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 5) + ')');
    R.place(this.last, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, P25 - 0.4, P25))));
    // expectations, as a box in her lap that she sets down to one side
    const appear = eob(seg(t, 2.4, 3.0), 1.6), aside = eio(seg(t, 4.8, 5.9));
    const bx = lerp(360, 780, aside), by = lerp(640, 900, aside) - Math.sin(aside * Math.PI) * 90;
    this.box.setAttribute('transform', 'translate(' + bx + ' ' + by + ') scale(' + appear + ') rotate(' + aside * 6 + ')');
    R.place(this.boxlab, bx, by - 44 - 28, appear > 0.5 ? 1 : 0);
    this.boxlab.style.transform += ' scale(' + appear + ')';
    R.place(this.aside, 540, lerp(84, 70, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)) * (1 - eo(seg(t, P25 - 0.2, P25 + 0.2))));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 5.0, 5.8))) + ' 0 30)');
    // no need to relax, no need for anything special
    const ck = (1 - eo(seg(t, P26 - 0.4, P26)));
    R.place(this.c1, 760, lerp(392, 380, eo(seg(t, P25 + 1.2, P25 + 1.7))), eo(seg(t, P25 + 1.2, P25 + 1.7)) * ck);
    R.place(this.c2, 760, lerp(492, 480, eo(seg(t, P25 + 3.0, P25 + 3.5))), eo(seg(t, P25 + 3.0, P25 + 3.5)) * ck);
    this.c1.style.setProperty('--s', eo(seg(t, P25 + 1.8, P25 + 2.3))); this.c2.style.setProperty('--s', eo(seg(t, P25 + 3.6, P25 + 4.1)));
    // one day calm and flowing, another dull and uncomfortable
    const w1 = eo(seg(t, P26 + 2.4, P26 + 3.0)), w2 = eo(seg(t, P26 + 5.9, P26 + 6.5));
    this.w1.setAttribute('d', R.wavePath(330, 230, 660, 50, 1.6, -t * 1.2)); this.w1.style.opacity = w1;
    let d = '';
    for (let i = 0; i <= 80; i++) { const x = 330 + 660 * i / 80, y = 400 - 22 * Math.sin((i / 80) * 4 * 2 * Math.PI - t * 2) + 14 * Math.sin(i * 1.3 + t * 3); d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
    this.w2.setAttribute('d', d); this.w2.style.opacity = 0.6 * w2 * (1 - eo(seg(t, P27, P27 + 0.6)));
    R.place(this.l1, 660, lerp(312, 300, w1), w1 * (1 - eo(seg(t, P27, P27 + 0.6))));
    R.place(this.l2, 660, lerp(472, 460, w2), w2 * (1 - eo(seg(t, P27, P27 + 0.6))));
    // a few moments of breath, tied up like a small gift to herself
    const bow = eob(seg(t, P27 + 1.0, P27 + 1.6), 1.8);
    this.bow.setAttribute('transform', 'translate(660 ' + (230 - 50 * Math.sin(Math.PI * 0.5 * 1.6 * 2 - t * 1.2) * 0) + ') scale(' + bow + ')');
    R.place(this.gift, 660, lerp(372, 360, eo(seg(t, P27 + 3.5, P27 + 4.0))), eo(seg(t, P27 + 3.5, P27 + 4.0)));
    R.place(this.body2, 660, lerp(452, 440, eo(seg(t, P27 + 4.9, P27 + 5.4))), eo(seg(t, P27 + 4.9, P27 + 5.4)));
    this.mouth.setAttribute('d', t > P27 + 1.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
