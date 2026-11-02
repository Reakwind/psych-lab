const { seg, eo, eio, eob, lerp } = kit;
kit.scene('n-button', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" style="fill:#1A2340;opacity:.12"/><g class="nbt-b">' + R.sleepButton('nbt') + '</g>' +
      '<path class="nbt-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:18;stroke-linecap:round" d="M330 340 L750 720 M750 340 L330 720"/></svg>' +
      '<div class="tag tag-night nbt-now">זה לא אומר שתירדמו מיד</div><div class="tag tag-warm nbt-btn">שינה אי אפשר להפעיל בלחיצת כפתור</div><div class="tag tag-cool nbt-try">וגם לא צריך לנסות</div></div>'));
    Object.assign(this, R.refs(kit, 'nbt', ['b', 'cap', 'x', 'now', 'btn', 'try']));
  },
  render(t) {
    R.place(this.now, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
    this.b.setAttribute('transform', 'translate(540 540) scale(' + eob(seg(t, 0.2, 0.8), 1.5) * 1.3 + ')');
    // a "sleep" button: pressed... and it doesn't work like that
    const press = Math.sin(Math.PI * seg(t, 4.8, 5.4));
    this.cap.setAttribute('transform', 'translate(0 ' + 22 * press + ')');
    this.x.style.strokeDasharray = eo(seg(t, 5.5, 6.0)) + ' 1'; this.x.style.opacity = t > 5.5 ? 1 : 0;
    R.place(this.btn, 540, lerp(822, 810, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3)));
    R.place(this.try, 540, lerp(912, 900, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)));
  },
});
