const { seg, eo, eio, eob, lerp } = kit;
const VX = 900, VY = 380;
kit.scene('v-keep', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('vk', 200) +
      '<g transform="translate(' + VX + ' ' + VY + ')"><g class="vk-vg">' + R.voice('vk-v') + '</g></g>' +
      '<g class="vk-sp">' + [[-120, -90], [110, -110], [130, 60], [-130, 50]].map(([x, y]) => '<path class="amber" transform="translate(' + (VX + x) + ' ' + (VY + y) + ')" d="M0 -18 C3 -5 5 -3 18 0 C5 3 3 5 0 18 C-3 5 -5 3 -18 0 C-5 -3 -3 -5 0 -18Z"/>').join('') + '</g></svg>' +
      '<div class="thought kind sm vk-c">לא צריך שיתחשק לי כדי להתחיל</div><div class="tag tag-warm vk-cap">הקול המבין והאכפתי</div></div>'));
    Object.assign(this, R.refs(kit, 'vk', ['body', 'head', 'eyes', 'mouth', 'vg', 'sp', 'c', 'cap']));
    this.v = R.refs(kit, 'vk-v', ['grey', 'warm', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 1.5); R.blink(this.v.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // she keeps a balanced thought; it joins her inner voice, which warms and grows
    const into = eio(seg(t, 3.0, 3.9));
    R.put(this.c, lerp(330, VX - 20, into), lerp(300, VY, into) - Math.sin(into * Math.PI) * 80, lerp(eob(seg(t, 0.4, 1.0), 1.4), 0.15, into), 0, eo(seg(t, 0.4, 0.7)) * (1 - eo(seg(t, 3.7, 3.95))));
    const w = eo(seg(t, 3.8, 4.8)), grow = eob(seg(t, 3.8, 4.6), 2.2);
    this.v.warm.setAttribute('opacity', w); this.v.grey.setAttribute('opacity', 1 - w);
    this.v.mouth.setAttribute('d', w > 0.5 ? 'M-6 2 Q10 16 26 2' : 'M-2 4 Q10 10 22 4');
    this.vg.setAttribute('transform', 'translate(0 ' + Math.sin(t * 2.2) * 8 + ') scale(' + lerp(1, 1.25, grow) + ')');
    this.sp.style.opacity = Math.sin(Math.PI * seg(t, 4.0, 5.4));
    this.sp.setAttribute('transform', 'translate(' + VX + ' ' + VY + ') scale(' + lerp(0.7, 1.2, seg(t, 4.0, 5.4)) + ') translate(' + -VX + ' ' + -VY + ')');
    this.mouth.setAttribute('d', t > 4.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 3.6, 4.4))) + ' 0 30)');
    R.place(this.cap, 330, lerp(150, 138, eo(seg(t, 5.8, 6.3))), eo(seg(t, 5.8, 6.3)));
  },
});
