const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-shortcut', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" class="sky"/>' + '<path d="M140 980 C140 760 420 860 460 660 C500 460 260 480 300 320 C340 170 640 260 760 180 C840 130 900 150 920 140" style="fill:none;stroke:color-mix(in srgb, var(--accent) 22%, var(--ground));stroke-width:70;stroke-linecap:round"/>' + '<g transform="translate(940 130)"><rect class="wood" x="-5" y="-90" width="10" height="110"/><path d="M5 -90 L80 -64 L5 -40Z" style="fill:#6FAE7A"/></g>' +
      '<path class="tq-cut" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-dasharray:.03 .025" d="M140 980 L820 260"/><circle class="tq-dot amber-dk" r="24"/>' +
      '<path class="tq-miss ink" style="stroke:#C0392B;stroke-width:10;opacity:0" d="M800 240 l40 40 M840 240 l-40 40"/></svg>' +
      '<div class="tag tag-cool tq-a">קיצורי דרך</div><div class="tag tq-b">פשוט יותר, פחות אי־ודאות</div><div class="tag tag-warm tq-c">לפעמים על חשבון הדיוק</div></div>'));
    Object.assign(this, R.refs(kit, 'tq', ['cut', 'dot', 'miss', 'a', 'b', 'c']));
  },
  render(t) {
    // the long way round, or a quick straight shortcut — which lands just beside the target
    const d = eo(seg(t, 3.3, 4.6)), go = eio(seg(t, 4.0, 5.6));
    this.cut.style.opacity = d > 0 ? 1 : 0;
    this.cut.style.strokeDasharray = (d * 0.03) + ' .025';
    this.dot.setAttribute('cx', lerp(140, 820, go)); this.dot.setAttribute('cy', lerp(980, 260, go));
    this.miss.style.opacity = eo(seg(t, 11.9, 12.3));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
    R.place(this.b, 300, lerp(612, 600, eo(seg(t, 6.0, 6.5))), eo(seg(t, 6.0, 6.5)));
    R.place(this.c, 760, lerp(392, 380, eo(seg(t, 11.9, 12.4))), eo(seg(t, 11.9, 12.4)));
  },
});