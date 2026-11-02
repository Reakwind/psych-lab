const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-reserve', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 540) scale(2)">' + R.battery('er') + '</g>' +
      '<rect class="er-half" x="452" y="368" width="176" height="172" style="fill:var(--ground);opacity:0"/><path class="er-line" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:8;stroke-dasharray:.05 .04" d="M410 540 H670"/></svg>' +
      '<div class="tag tag-cool er-cap">זה שיש כוח</div><div class="tag tag-warm er-all">לא חייבים להשתמש בכולו</div><div class="tag er-used">בשימוש</div><div class="tag er-res">שמור לאחר כך</div></div>'));
    Object.assign(this, R.refs(kit, 'er', ['fill', 'half', 'line', 'cap', 'all', 'used', 'res']));
  },
  render(t) {
    // a full battery: the top half for today, the bottom half kept in reserve
    R.setBattery(this.fill, 1);
    this.line.style.opacity = eo(seg(t, 0.8, 1.2));
    this.half.style.opacity = 0.35 * eo(seg(t, 3.0, 3.6));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)) * (1 - eo(seg(t, 2.9, 3.2))));
    R.place(this.all, 540, lerp(84, 70, eo(seg(t, 3.1, 3.6))), eo(seg(t, 3.1, 3.6)));
    R.place(this.used, 820, lerp(440, 428, eo(seg(t, 3.3, 3.8))), eo(seg(t, 3.3, 3.8)));
    R.place(this.res, 820, lerp(620, 608, eo(seg(t, 3.5, 4.0))), eo(seg(t, 3.5, 4.0)));
  },
});