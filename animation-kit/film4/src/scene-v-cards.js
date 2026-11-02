const { seg, eo, eio, eob, lerp } = kit;
const VX = 900, VY = 380;
kit.scene('v-cards', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('vc', 200) +
      '<g transform="translate(' + VX + ' ' + VY + ')"><g class="vc-vg">' + R.voice('vc-v') + '</g></g></svg>' +
      '<div class="thought kind sm vc-k">גם כמה דקות נחשבות</div><div class="thought sm vc-c">אין טעם לנסות, שום דבר לא ישתנה</div>' +
      '<div class="tag tag-warm vc-tk">מאוזנות · תומכות</div><div class="tag vc-tc">ביקורתיות · מוגזמות</div></div>'));
    Object.assign(this, R.refs(kit, 'vc', ['body', 'head', 'eyes', 'mouth', 'vg', 'k', 'c', 'tk', 'tc']));
    this.ve = kit.stage.querySelector('.vc-v-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 1.2); R.blink(this.ve, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.vg.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.2) * 8 + ')');
    // thoughts rise out of the voice as cards: a balanced one, then a critical one
    const fly = (el, a, x, y) => { const p = eio(seg(t, a, a + 0.8)); R.put(el, lerp(VX - 40, x, p), lerp(VY, y, p) - Math.sin(p * Math.PI) * 60, lerp(0.2, 1, eob(seg(t, a, a + 0.8), 1.4)), 0, eo(seg(t, a, a + 0.3))); };
    fly(this.k, 3.2, 330, 230); fly(this.c, 5.4, 330, 520);
    R.place(this.tk, 330, lerp(108, 96, eo(seg(t, 3.9, 4.4))), eo(seg(t, 3.9, 4.4)));
    R.place(this.tc, 330, lerp(380, 368, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 3.4, 4.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 7.4 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
  },
});
