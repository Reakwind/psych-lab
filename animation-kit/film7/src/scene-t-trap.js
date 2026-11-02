const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-trap', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" class="sky"/>' + '<path d="M140 980 C140 760 420 860 460 660 C500 460 260 480 300 320 C340 170 640 260 760 180 C840 130 900 150 920 140" style="fill:none;stroke:color-mix(in srgb, var(--accent) 22%, var(--ground));stroke-width:70;stroke-linecap:round"/>' + '<g transform="translate(940 130)"><rect class="wood" x="-5" y="-90" width="10" height="110"/><path d="M5 -90 L80 -64 L5 -40Z" style="fill:#6FAE7A"/></g>' +
      '<path class="tr-dark" d="M0 1080 L0 300 L700 1080Z" style="fill:var(--second);opacity:0"/><path style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-dasharray:30 25" d="M140 980 L620 470"/>' +
      '<g class="tr-pit"><ellipse cx="640" cy="460" rx="110" ry="40" style="fill:var(--second)"/><ellipse cx="640" cy="452" rx="96" ry="30" style="fill:color-mix(in srgb, var(--second) 80%, black)"/></g><circle class="tr-dot amber-dk" r="24"/></svg>' +
      '<div class="tag tag-warm tr-a">מלכודות חשיבה</div><div class="tag tr-b">לכיוון השלילי והמאיים</div></div>'));
    Object.assign(this, R.refs(kit, 'tr', ['dark', 'pit', 'dot', 'a', 'b']));
  },
  render(t) {
    // some shortcuts end in a trap
    const p = eob(seg(t, 3.4, 4.0), 1.5), go = eio(seg(t, 4.2, 5.4)), fall = eio(seg(t, 5.4, 5.9));
    this.pit.setAttribute('transform', 'translate(640 460) scale(' + p + ') translate(-640 -460)');
    this.dot.setAttribute('cx', lerp(140, 640, go)); this.dot.setAttribute('cy', lerp(980, 452, go)); this.dot.setAttribute('r', 24 * (1 - fall));
    this.dark.style.opacity = 0.22 * eo(seg(t, 8.0, 9.0));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
    R.place(this.b, 300, lerp(752, 740, eo(seg(t, 8.1, 8.6))), eo(seg(t, 8.1, 8.6)));
  },
});