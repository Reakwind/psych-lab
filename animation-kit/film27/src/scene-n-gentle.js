const { seg, eo, eio, eob, lerp } = kit;
const D = 'M880 300 C700 300 640 360 560 500 C470 660 330 800 170 820';
kit.scene('n-gentle', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><defs><linearGradient id="ng2-g" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#F6E3C4"/><stop offset="1" stop-color="#C9CFE0"/></linearGradient></defs>' +
      '<rect width="1080" height="1080" fill="url(#ng2-g)"/><circle cx="900" cy="230" r="64" class="amber"/><g transform="translate(130 840)">' + R.moon('ng2-m', 52) + '</g>' +
      '<path class="ng2-cliff" d="M880 300 H330 V820 H170" style="fill:none;stroke:var(--second);stroke-width:10;stroke-dasharray:22 18;stroke-linecap:round;opacity:.35"/>' +
      '<path class="ng2-p" d="' + D + '" style="fill:none;stroke:var(--accent);stroke-width:22;stroke-linecap:round"/>' +
      '<g class="ng2-w"><g class="ng2-a">' + R.ruth('ng2-a', 'stand') + '</g><g class="ng2-b">' + R.ruth('ng2-b', 'step') + '</g></g></svg>' +
      '<div class="tag tag-cool ng2-top">המטרה: מעבר קצת יותר רגוע מהיום אל השינה</div></div>'));
    Object.assign(this, R.refs(kit, 'ng2', ['cliff', 'p', 'w', 'a', 'b', 'top']));
    this.len = this.p.getTotalLength();
  },
  render(t) {
    // not a sudden drop, a calmer way down
    this.cliff.style.opacity = 0.35 * (1 - eo(seg(t, 2.0, 3.0)));
    this.p.style.filter = 'drop-shadow(0 0 ' + (12 * eo(seg(t, 1.6, 2.6))) + 'px var(--accent))';
    const k = eio(seg(t, 1.0, 5.3)), pt = this.p.getPointAtLength(this.len * lerp(0.35, 0.92, k)), step = k > 0 && k < 1 ? Math.floor(t * 2.4) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + pt.x + ' ' + (pt.y - 8) + ') scale(-.34 .34)');
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)));
  },
});
