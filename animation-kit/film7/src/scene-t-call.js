const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-call', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('tc', -160) + '<g class="tc-ph">' + R.phoneCall('tc-c') + '<g transform="translate(0 -36)"><circle r="16" class="nira-skin" cy="2"/><path class="fra-hair" d="M-18 0 C-20 -26 20 -26 18 0 C10 -10 -10 -10 -18 0Z"/></g>' + '<path class="tc-ring ink" style="stroke:var(--accent);stroke-width:7;opacity:0" d="M74 -60 q16 16 0 32 M90 -76 q30 32 0 64"/></g>' + '</svg>' +
      '<div class="tag tag-cool tc-title">מפגש 7 · מחשבות הן לא עובדות</div><div class="tag tc-no">לא עונה</div></div>'));
    Object.assign(this, R.refs(kit, 'tc', ['body', 'head', 'eyes', 'mouth', 'ph', 'ring', 'title', 'no']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // she calls a good friend; it rings and rings
    this.ph.setAttribute('transform', 'translate(780 440) scale(' + eob(seg(t, 1.6, 2.2), 1.5) * 1.6 + ')');
    const ringing = t > 2.4 && t < 4.6;
    this.ring.style.opacity = ringing ? (Math.floor(t * 3) % 2 ? 1 : 0.3) : 0;
    this.ph.style.opacity = 1;
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 2.0, 2.6))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.8 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
    R.place(this.no, 780, lerp(612, 600, eo(seg(t, 4.7, 5.2))), eo(seg(t, 4.7, 5.2)));
  },
});