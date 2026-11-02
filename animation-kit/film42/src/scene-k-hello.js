const { seg, eo, eio, eob, lerp } = kit;
kit.scene('k-hello', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('kh', 0) + '</svg>' +
      '<div class="tag tag-cool kh-title">מפגש 42 · מבוא ללדאוג לעצמי</div><div class="tag kh-care">לדאוג לעצמכם</div><div class="tag tag-warm kh-q">מה זה בעצם אומר?</div></div>'));
    Object.assign(this, R.refs(kit, 'kh', ['body', 'head', 'eyes', 'mouth', 'title', 'care', 'q']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)));
    R.place(this.care, 540, lerp(176, 164, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    // ...but what does it actually mean? Ruth tilts her head
    this.head.setAttribute('transform', 'rotate(' + (-9 * eio(seg(t, 4.2, 4.8))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 4.4 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.q, 790, lerp(352, 340, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});
