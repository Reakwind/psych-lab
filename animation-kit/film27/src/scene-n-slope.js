const { seg, eo, eio, eob, lerp } = kit;
const D = 'M880 300 C700 300 640 360 560 500 C470 660 330 800 170 820';
kit.scene('n-slope', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><defs><linearGradient id="ns-g" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#F6E3C4"/><stop offset="1" stop-color="#C9CFE0"/></linearGradient></defs>' +
      '<rect width="1080" height="1080" fill="url(#ns-g)"/><circle cx="900" cy="230" r="64" class="amber"/><g transform="translate(130 840)">' + R.moon('ns-m', 52) + '</g>' +
      '<path class="ns-pf" pathLength="1" d="' + D + '" style="fill:none;stroke:var(--second);stroke-width:8;stroke-linecap:round;opacity:.25"/><path class="ns-p" pathLength="1" d="' + D + '" style="fill:none;stroke:var(--accent);stroke-width:22;stroke-linecap:round"/><path class="ns-pp" d="' + D + '" style="fill:none;stroke:none"/>' +
      '<g class="ns-w"><g class="ns-a">' + R.ruth('ns-a', 'stand') + '</g><g class="ns-b">' + R.ruth('ns-b', 'step') + '</g></g></svg>' +
      '<div class="tag tag-cool ns-try">שגרת ערב: משהו שאפשר לנסות בעצמכם</div><div class="tag ns-pace">להוריד בהדרגה את הקצב</div><div class="tag tag-night ns-ready">ולהתכונן לשינה</div></div>'));
    Object.assign(this, R.refs(kit, 'ns', ['p', 'pf', 'pp', 'w', 'a', 'b', 'try', 'pace', 'ready']));
    this.len = this.pp.getTotalLength();
  },
  render(t) {
    R.place(this.try, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
    // Ruth at the top of her evening; a faint way down appears
    this.pf.style.strokeDasharray = '.012 .02'; this.pf.style.strokeDashoffset = 0; this.pf.style.opacity = 0.35 * eo(seg(t, 1.0, 2.6));
    // the idea: a gentle slope from the day down into sleep
    this.p.style.strokeDasharray = eio(seg(t, 5.6, 7.6)) + ' 1'; this.p.style.opacity = t > 5.6 ? 1 : 0;
    const k = eio(seg(t, 7.4, 12.2)), pt = this.pp.getPointAtLength(this.len * lerp(0.02, 0.9, k));
    const walking = k > 0 && k < 1, step = walking ? Math.floor(t * 2.4) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + pt.x + ' ' + (pt.y - 8) + ') scale(-.34 .34)');
    this.w.style.opacity = eo(seg(t, 0.6, 1.1));
    R.place(this.pace, 760, lerp(472, 460, eo(seg(t, 8.4, 8.9))), eo(seg(t, 8.4, 8.9)));
    R.place(this.ready, 330, lerp(952, 940, eo(seg(t, 10.2, 10.7))), eo(seg(t, 10.2, 10.7)));
  },
});
