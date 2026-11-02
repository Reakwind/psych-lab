const { seg, eo, eio, eob, lerp } = kit;
// four easings, read right to left, top row first: a break, a shorter activity, asking for help, going easier on ourselves
const CUT = '<g class="ke-cut"><rect class="slate-dk" x="-60" y="-24" width="120" height="48" rx="12"/><rect class="slate" x="-54" y="-18" width="108" height="18" rx="8"/></g><path class="ke-snip" style="fill:none;stroke:#C0392B;stroke-width:6;stroke-dasharray:10 8;opacity:0" d="M-6 -40 V40"/>';
const HELP = '<g class="ke-hl"><rect class="fra-top" x="-74" y="-16" width="56" height="32" rx="14"/><ellipse class="nira-skin" cx="-14" cy="2" rx="20" ry="16"/></g><g class="ke-hr"><rect class="knit" x="18" y="-18" width="56" height="32" rx="14"/><ellipse class="skin" cx="14" cy="-2" rx="20" ry="16"/></g>';
const B = [[2.7, 820, 320, '<g transform="translate(-4 14) scale(.62)">' + R.mug('ke-m') + '</g>', 'לקחת הפסקה'], [3.4, 260, 320, CUT, 'לקצר פעילות'],
  [4.5, 840, 640, HELP, 'לבקש עזרה'], [6.2, 240, 640, '<g transform="scale(1.1)">' + R.warm('ke-h', 'heart') + '</g>', 'להקל קצת על עצמנו']];
kit.scene('k-ease', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ke', 0) +
      B.map((b, k) => '<g class="ke-p' + k + '">' + R.badge('ke-bd' + k, b[3]) + '</g>').join('') + '</svg>' +
      B.map((b, k) => '<div class="tag ke-t' + k + '">' + b[4] + '</div>').join('') + '<div class="tag tag-warm ke-a">ולפעמים</div></div>'));
    Object.assign(this, R.refs(kit, 'ke', ['body', 'head', 'eyes', 'mouth', 'p0', 'p1', 'p2', 'p3', 't0', 't1', 't2', 't3', 'a', 'cut', 'snip', 'hl', 'hr']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    B.forEach(([a, x, y], k) => {
      R.xf(this['p' + k], x, y + Math.sin(t * 1.5 + k) * 5, eob(seg(t, a - 0.2, a + 0.3), 1.7), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], x, lerp(y + 104, y + 92, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    // the activity gets shorter; two hands meet; Ruth looks to each in turn
    const c = eio(seg(t, 3.8, 4.4));
    this.snip.style.opacity = eo(seg(t, 3.5, 3.7)) * (1 - eo(seg(t, 4.4, 4.7)));
    this.cut.setAttribute('transform', 'translate(' + (30 * c) + ' 0) scale(' + (1 - 0.5 * c) + ' 1)');
    const h = eio(seg(t, 4.7, 5.4));
    this.hl.setAttribute('transform', 'translate(' + (-26 * (1 - h)) + ' 0)'); this.hr.setAttribute('transform', 'translate(' + (26 * (1 - h)) + ' 0)');
    const look = t < 3.1 ? 8 : t < 4.3 ? -8 : t < 6.0 ? 10 : -10;
    this.head.setAttribute('transform', 'rotate(' + look * eio(seg(t, 2.4, 2.9)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)));
  },
});
