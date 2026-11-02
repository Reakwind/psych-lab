const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-options', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('po') + '<g class="po-ring">' + R.attn('po') + '</g><g class="po-ache">' + R.ache('po-a') + '</g>' +
      '<g class="po-hg">' + R.hourglass('po-h') + '</g></svg>' +
      '<div class="tag tag-cool po-with">אפשר לתרגל יחד עם אי הנוחות</div><div class="tag tag-warm po-ta">לקצר את התרגול</div><div class="tag tag-warm po-tb">לפתוח את העיניים</div>' +
      '<div class="tag tag-warm po-tc">תנוחה נוחה יותר</div><div class="tag tag-warm po-td">או לעשות משהו אחר</div></div>'));
    Object.assign(this, R.refs(kit, 'po', ['eyes', 'mouth', 'ring', 'ache', 'hg', 'with', 'ta', 'tb', 'tc', 'td']));
    this.cu = kit.stage.querySelector('.po-cushion'); this.ring.style.opacity = 0.8;
  },
  render(t) {
    // practise alongside the discomfort: the circle widens to hold it too
    const w = eio(seg(t, 2.4, 3.6));
    this.ring.setAttribute('transform', 'translate(' + lerp(560, 520, w) + ' 540) scale(' + lerp(360, 470, w) + ')');
    this.ache.setAttribute('transform', 'translate(650 566) scale(' + (0.9 + 0.06 * Math.sin(t * 3)) + ')'); this.ache.style.opacity = lerp(1, 0.6, w);
    R.place(this.with, 540, lerp(84, 70, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
    // or adjust: shorter, eyes open, a more comfortable position, something else
    const h = eob(seg(t, 4.4, 4.9), 1.6), sh = eio(seg(t, 4.9, 5.6));
    this.hg.setAttribute('transform', 'translate(900 870) scale(' + h * lerp(0.55, 0.4, sh) + ')');
    R.place(this.ta, 880, lerp(972, 960, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)));
    if (t > 5.6) this.eyes.removeAttribute('transform'); else this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    R.place(this.tb, 250, lerp(222, 210, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
    const cb = 1 + 0.12 * Math.sin(Math.PI * seg(t, 7.3, 8.1));
    this.cu.setAttribute('transform', 'translate(226 540) scale(' + cb + ') translate(-226 -540)');
    R.place(this.tc, 260, lerp(972, 960, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
    R.place(this.td, 580, lerp(852, 840, eo(seg(t, 9.0, 9.5))), eo(seg(t, 9.0, 9.5)));
    this.mouth.setAttribute('d', t > 7.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
