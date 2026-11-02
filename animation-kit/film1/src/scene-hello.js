const { seg, eo, eio, eob, lerp } = kit;
kit.scene('hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="hello-cam">' +
      R.room({}) + R.chair() + '<g transform="translate(500 742)">' + R.ruth('hello', 'sit') + '</g>' +
      '<clipPath id="hello-screen"><rect x="532" y="606" width="58" height="94" rx="6"/></clipPath>' +
      '<g class="hello-phone"><rect class="metal" x="524" y="596" width="74" height="116" rx="12"/>' +
      '<g clip-path="url(#hello-screen)"><rect class="amber-lt" x="532" y="606" width="58" height="94"/>' +
      '<g transform="translate(561 712) scale(.17)">' + R.nira('hello-n', 'stand') + '</g>' +
      '<g class="hello-wave"><ellipse class="nira-skin" cx="0" cy="0" rx="4" ry="5"/></g></g></g>' +
      '<ellipse class="skin" cx="526" cy="700" rx="14" ry="12"/><ellipse class="skin" cx="596" cy="700" rx="14" ry="12"/>' +
      '</g></svg><div class="tag tag-cool hello-title">מפגש 1 · ברוכים הבאים</div><div class="tag hello-hi">היי, אני נירה</div><div class="tag tag-warm hello-who">פסיכולוגית קלינית</div></div>'));
    Object.assign(this, R.refs(kit, 'hello', ['cam', 'head', 'eyes', 'ruth', 'phone', 'wave', 'title', 'hi', 'who']));
    this.n = R.refs(kit, 'hello-n', ['eyes', 'head']);
  },
  render(t) {
    // the camera settles on Ruth, then moves in to the phone where Nira says hello
    const push = eio(seg(t, 0.9, 2.6));
    const z = lerp(1, 2.4, push), fx = lerp(540, 561, push), fy = lerp(560, 650, push);
    this.cam.setAttribute('transform', 'translate(540 540) scale(' + z + ') translate(' + (-fx) + ' ' + (-fy) + ')');
    R.blink(this.eyes, t, 0.7); R.blink(this.n.eyes, t, 2.2);
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 0.2, 0.9))) + ' 0 30) translate(0 ' + 4 * eio(seg(t, 0.2, 0.9)) + ')');
    this.ruth.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.phone.setAttribute('transform', 'translate(0 ' + lerp(14, 0, eob(seg(t, 0, 0.6), 1.5)) + ')');
    // Nira waves on the screen
    const w = Math.sin(t * 7) * eo(seg(t, 0.3, 0.6)) * (1 - eo(seg(t, 2.6, 3.0)));
    this.wave.setAttribute('transform', 'translate(' + (575 + w * 3) + ' ' + (650 - 4 * eo(seg(t, 0.3, 0.6))) + ')');
    this.n.head.setAttribute('transform', 'rotate(' + (4 * Math.sin(t * 1.3)) + ' 0 30)');
    R.place(this.title, 540, 70, 1 - eo(seg(t, 2.2, 2.7)));
    R.place(this.hi, 820, lerp(420, 408, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    R.place(this.who, 820, lerp(496, 484, eo(seg(t, 3.8, 4.3))), eo(seg(t, 3.8, 4.3)));
  },
});
