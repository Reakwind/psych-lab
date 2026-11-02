const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-postures', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="ap-room">' + R.room({}) + R.chair() +
      '<ellipse class="ap-cush" cx="500" cy="590" rx="130" ry="74" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground))"/><g transform="translate(500 742)"><g class="ap-body">' + R.ruth('ap', 'sit') + '</g></g></g>' +
      '<g class="ap-top" opacity="0">' + R.overhead('apo') + '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop('apt') + '</g></g>' +
      '<rect class="ap-veil" width="1080" height="1080" style="fill:var(--ground);opacity:0"/></svg>' +
      '<div class="tag ap-up">זקוף</div><div class="tag ap-lean">נשענים</div><div class="tag tag-warm ap-lie">שוכבים · הרבה פעמים מומלץ</div><div class="tag ap-cu">כרית או תמיכה</div><div class="tag tag-cool ap-cap">מה שנוח לכם כרגע</div></div>'));
    Object.assign(this, R.refs(kit, 'ap', ['room', 'cush', 'body', 'head', 'eyes', 'mouth', 'top', 'veil', 'up', 'lean', 'lie', 'cu', 'cap']));
    this.cu2 = kit.stage.querySelector('.apo-cushion'); this.te = kit.stage.querySelector('.apt-eyes');
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // sitting up straight, then leaning back on a cushion...
    const up = eio(seg(t, 3.2, 3.7)), lean = eio(seg(t, 4.2, 5.0));
    this.body.setAttribute('transform', 'translate(0 ' + (6 * lean) + ') scale(' + (1 - 0.03 * lean) + ' ' + (1 + 0.02 * up - 0.05 * lean) + ')');
    this.cush.style.opacity = eo(seg(t, 4.0, 4.6));
    this.cush.setAttribute('transform', 'translate(0 ' + lerp(-200, 0, eob(seg(t, 4.0, 4.7), 1.4)) + ')');
    R.place(this.up, 760, lerp(400, 388, eo(seg(t, 3.3, 3.7))), eo(seg(t, 3.3, 3.7)) * (1 - eo(seg(t, 4.2, 4.5))));
    R.place(this.lean, 760, lerp(400, 388, eo(seg(t, 4.3, 4.7))), eo(seg(t, 4.3, 4.7)) * (1 - eo(seg(t, 6.6, 6.9))));
    // ...or lying down, seen from above
    const v = Math.sin(Math.PI * seg(t, 6.6, 7.4));
    this.veil.style.opacity = v;
    const top = t > 7.0;
    this.top.setAttribute('opacity', top ? 1 : 0); this.room.setAttribute('opacity', top ? 0 : 1);
    R.blink(this.te, t, 1.2);
    R.place(this.lie, 540, lerp(84, 70, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)));
    const cb = 1 + 0.1 * Math.sin(Math.PI * seg(t, 9.6, 10.2));
    this.cu2.setAttribute('transform', 'translate(226 540) scale(' + cb + ') translate(-226 -540)');
    R.place(this.cu, 226, lerp(800, 788, eo(seg(t, 9.6, 10.1))), eo(seg(t, 9.6, 10.1)));
    R.place(this.cap, 540, lerp(940, 926, eo(seg(t, 12.2, 12.7))), eo(seg(t, 12.2, 12.7)));
  },
});
