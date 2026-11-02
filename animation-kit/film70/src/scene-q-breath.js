const { seg, eo, eio, eob, lerp } = kit;
// or she has been holding her breath without noticing, and suddenly takes a really big breath; then the camera pulls back to the room
kit.scene('q-breath', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="qr-cam">' + R.roomSeat('qr', 0) + '</g></svg>' +
      '<div class="tag tag-red qr-a">המצח מכווץ</div><div class="tag tag-red qr-b">הלסתות מהודקות</div>' +
      '<div class="tag tag-warm qr-c">נשימה ממש גדולה</div><div class="tag qr-d">החזקנו את האוויר בלי לשים לב</div><div class="tag tag-red qr-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'qr', ['cam', 'body', 'head', 'eyes', 'mouth', 'brow', 'tb', 'jaw', 'ck', 'tn', 'pf', 'mt-fill', 'a', 'b', 'c', 'd', 'ml']));
  },
  render(t) {
    // the camera: close on her face, then back out to the whole room
    const back = eio(seg(t, 4.9, 6.7)), z = lerp(1.9, 1, back);
    this.cam.setAttribute('transform', 'translate(' + lerp(540, 500, back) + ' ' + lerp(500, 540, back) + ') scale(' + z + ') translate(-500 -540)');
    // the brow and jaw from before let go
    const off = 1 - eo(seg(t, 0.0, 0.8));
    this.brow.setAttribute('opacity', off); this.tb.setAttribute('opacity', off * 0.8); this.jaw.setAttribute('opacity', off * 0.8);
    // holding: cheeks full and still; then a big breath in, and a long breath out
    const hold = t < 1.7 ? eo(seg(t, 0.4, 1.0)) : 1 - eo(seg(t, 1.7, 2.0));
    const inn = eio(seg(t, 1.7, 2.7)), out = eio(seg(t, 2.8, 4.4));
    this.ck.setAttribute('opacity', hold);
    const swell = 0.06 * inn * (1 - out);
    this.body.setAttribute('transform', 'translate(0 ' + (-10 * swell / 0.06) + ') scale(1 ' + (1 + swell + (t > 4.4 ? kit.breathe(t, 0.01, 3.6) - 1 : 0)) + ')');
    this.head.setAttribute('transform', 'translate(0 ' + (-8 * inn * (1 - out)) + ')');
    this.mouth.setAttribute('d', t < 1.7 ? 'M-6 28 L10 28' : t < 2.8 ? R.mouthO : out < 0.9 ? 'M-4 27 Q2 22 8 27 Q8 32 2 32 Q-4 32 -4 27Z' : R.mouthNeutral);
    this.pf.style.opacity = t > 2.8 && t < 4.6 ? (0.5 + 0.5 * Math.abs(Math.sin(t * 4))) * (1 - eo(seg(t, 4.2, 4.6))) : 0;
    this.pf.setAttribute('transform', 'translate(' + 30 * seg(t, 2.8, 4.6) + ' 0)');
    this.tn.style.opacity = 0;
    if (t < 1.6 || t > 2.8) R.blink(this.eyes, t, 0.4); else this.eyes.setAttribute('transform', 'translate(0 -3)');
    R.setMeter(this['mt-fill'], 0.35);
    R.place(this.a, 250, 250, 1 - eo(seg(t, 0, 0.5)));
    R.place(this.b, 820, 630, 1 - eo(seg(t, 0, 0.5)));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 1.74, 2.2))), eo(seg(t, 1.74, 2.2)) * (1 - eo(seg(t, 4.9, 5.3))));
    R.place(this.d, 540, lerp(912, 900, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)) * (1 - eo(seg(t, 4.9, 5.3))));
    R.place(this.ml, 920, 886, eo(seg(t, 6.0, 6.6)));
  },
});
