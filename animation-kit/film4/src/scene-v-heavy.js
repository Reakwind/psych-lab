const { seg, eo, eio, eob, lerp } = kit;
kit.scene('v-heavy', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('vy', 200) +
      '<g transform="translate(900 380)"><g class="vy-vg">' + R.voice('vy-v') + '</g></g><rect class="vy-dim" width="1080" height="1080" style="fill:var(--second);opacity:0"/></svg>' +
      '<div class="thought sm vy-c">כמה דקות לא שוות את זה</div><div class="tag tag-warm vy-cap">כשמחשבה נהיית עובדה</div></div>'));
    Object.assign(this, R.refs(kit, 'vy', ['body', 'head', 'eyes', 'mouth', 'vg', 'dim', 'c', 'cap']));
    this.ve = kit.stage.querySelector('.vy-v-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8); R.blink(this.ve, t, 2.2);
    this.vg.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.2) * 8 + ')');
    // a critical thought hangs over Ruth; how she feels shifts, and once she takes it as fact it turns heavy
    const fact = eio(seg(t, 6.7, 7.5));
    this.c.classList.toggle('heavy', fact > 0.5);
    R.put(this.c, lerp(330, 470, fact), lerp(300, 330, fact) + Math.sin(t * 1.6) * 6 * (1 - fact), lerp(0.85, 1.12, eob(seg(t, 0.2, 0.8), 1.4)) * lerp(1, 1.06, fact), lerp(-2, 3, fact), eo(seg(t, 0.2, 0.5)));
    this.dim.style.opacity = 0.12 * eo(seg(t, 3.8, 5.0));
    const sag = eio(seg(t, 4.0, 5.2)) * 0.4 + 0.6 * fact;
    this.head.setAttribute('transform', 'rotate(' + (-5 * sag) + ' 0 30) translate(0 ' + 10 * sag + ')');
    this.body.setAttribute('transform', 'translate(0 ' + 6 * sag + ') scale(1 ' + (1 - 0.025 * sag) + ')');
    this.mouth.setAttribute('d', sag > 0.3 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)));
  },
});
