const { seg, eo, eio, eob, lerp } = kit;
// what they can help with, across the day: to focus, to rest, to recover after effort, to get ready for sleep; and sometimes simply a few minutes for yourself
const U = [['focus', 'להתמקד', 1.62, 840, 830], ['rest', 'לנוח', 2.26, 640, 900], ['recover', 'להתאושש אחרי מאמץ', 2.75, 440, 830], ['bed', 'להתכונן לשינה', 5.0, 240, 900]];
kit.scene('x-uses', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="x15-dl">' + R.dayLine('x15', 760, []) + '<g class="x15-rw">' + R.ruth('x15w', 'stand') + '</g>' + U.map((u, k) => R.cbadge('x15-c' + k, u[0], 80)).join('') + '</g>' +
      '<g class="x15-rm">' + R.room({}) + R.seated('x15', -120) + '<g class="x15-tb"><rect class="wood" x="752" y="704" width="14" height="158" rx="6"/><rect class="wood" x="874" y="704" width="14" height="158" rx="6"/><rect class="wood-lt" x="726" y="688" width="188" height="24" rx="10"/></g>' +
      '<g class="x15-hg" transform="translate(820 604) scale(.62)">' + R.hourglass('x15-hgl') + '</g></g></svg>' +
      U.map((u, k) => '<div class="tag tag-warm x15-n' + k + '">' + u[1] + '</div>').join('') + '<div class="tag tag-cool x15-a">לעצור ולהקדיש כמה דקות לעצמנו</div><div class="tag tag-cool x15-h">לפעמים הם יעזרו</div></div>'));
    Object.assign(this, R.refs(kit, 'x15', ['dl', 'curve', 'rm', 'rw', 'body', 'eyes', 'head', 'mouth', 'hg', 'a', 'h'])); this.wk = R.refs(kit, 'x15w', ['eyes', 'mouth']);
    this.c = U.map((u, k) => kit.stage.querySelector('.x15-c' + k)); this.n = U.map((u, k) => kit.stage.querySelector('.x15-n' + k));
  },
  render(t) {
    this.curve.style.opacity = 0;
    const sw = eio(seg(t, 6.3, 7.1));
    this.rm.style.opacity = sw; this.dl.style.opacity = 1 - sw;
    U.forEach(([k0, w, a, x, ty], k) => {
      R.setG(this.c[k], x, 380 + Math.sin(t * 1.4 + k) * 5, eob(seg(t, a - 0.2, a + 0.3), 1.6), eo(seg(t, a - 0.2, a)));
      R.place(this.n[k], x, lerp(ty + 12, ty, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - sw));
    });
    // Ruth walks along the day, from morning to evening, under each use as it is named
    let wx = 980; U.forEach(([k0, w, a, x]) => { wx = lerp(wx, x, eio(seg(t, a - 0.6, a + 0.1))); });
    const moving = U.some(([k0, w, a]) => t > a - 0.6 && t < a + 0.1);
    this.rw.setAttribute('transform', 'translate(' + wx + ' ' + (756 + (moving ? Math.abs(Math.sin(t * 8)) * -5 : 0)) + ') scale(.42)');
    R.blink(this.wk.eyes, t, 1.1); this.wk.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.h, 540, lerp(54, 40, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)) * (1 - sw));
    if (t > 7.4) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.02, 4.6) + ')');
    this.head.setAttribute('transform', 'rotate(' + 4 * Math.sin(t * 0.6) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    this.hg.setAttribute('transform', 'translate(820 604) scale(.62) rotate(' + (t > 8.9 ? 180 * eio(seg(t, 8.9, 9.8)) : 0) + ')');
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 8.94, 9.3))), eo(seg(t, 8.94, 9.3)));
  },
});
