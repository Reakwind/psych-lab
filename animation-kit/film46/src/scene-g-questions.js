const { seg, eo, eio, eob, lerp } = kit;
// the questions on Ruth's phone (their words are the app's; here a "?" card), and a magnifier exploring with curiosity
kit.scene('g-questions', {
  init(kit) {
    const card = (dy) => '<g transform="translate(0 ' + dy + ')"><rect class="shade" x="-176" y="-96" width="360" height="200" rx="30"/><rect x="-180" y="-104" width="360" height="200" rx="30" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<text x="0" y="0" text-anchor="middle" style="font:700 96px var(--sans);fill:var(--accent)">?</text><path class="ink" style="stroke-width:12;opacity:.35" d="M120 50 H-120"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="gw-p">' + R.bigPhone('gw') +
      '<g transform="translate(540 390)"><circle class="gw-glow" r="130" style="fill:var(--accent);opacity:.35"/><g transform="scale(1.7)">' + R.warm('gw-u', 'heart') + '</g></g>' +
      '<g class="gw-c2" transform="translate(556 744) rotate(3)">' + card(0) + '</g><g class="gw-c1" transform="translate(540 730)">' + card(0) + '</g>' +
      '<g class="gw-lens">' + R.lens('gw-l') + '</g></g></svg>' +
      '<div class="tag tag-cool gw-a">השאלות שיופיעו על המסך</div><div class="tag gw-b">להישאר אתו לכמה רגעים</div><div class="tag tag-warm gw-c">לחקור אותו בסקרנות</div></div>'));
    Object.assign(this, R.refs(kit, 'gw', ['p', 'glow', 'c1', 'lens', 'a', 'b', 'c']));
  },
  render(t) {
    this.p.setAttribute('transform', 'translate(0 ' + lerp(700, 0, eio(seg(t, 0, 0.7))) + ')');
    this.glow.setAttribute('transform', 'scale(' + (1 + 0.06 * Math.sin(t * 3)) + ')');
    this.c1.setAttribute('transform', 'translate(540 ' + (730 + lerp(40, 0, eob(seg(t, 0.8, 1.3), 1.4))) + ')');
    this.c1.style.opacity = eo(seg(t, 0.8, 1.0));
    const lp = seg(t, 4.2, 7.0), ang = lp * Math.PI * 2.2;
    R.xf(this.lens, 560 + Math.cos(ang) * 70, 380 + Math.sin(ang) * 50, eob(seg(t, 4.2, 4.6), 1.5) * 1.1, eo(seg(t, 4.2, 4.4)));
    R.place(this.a, 540, lerp(64, 52, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 2.4, 2.7))));
    R.place(this.b, 540, lerp(64, 52, eo(seg(t, 2.7, 3.2))), eo(seg(t, 2.7, 3.2)) * (1 - eo(seg(t, 4.1, 4.4))));
    R.place(this.c, 540, lerp(64, 52, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)));
  },
});
