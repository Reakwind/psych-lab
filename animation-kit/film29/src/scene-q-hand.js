const { seg, eo, eio, eob, lerp } = kit;
// parts 1–3: the beam narrows onto her left hand; an iris opens into the close-up; touch, warmth, a tingle, tension; it was all there before
const P2 = 9.65, P3 = 19.78, HX = 462, HY = 718;
const M = [[P2 + 1.71, 'המגע במשטח', 620, 820], [P2 + 3.73, 'הטמפרטורה', 860, 330], [P2 + 5.2, 'עקצוץ קטן', 440, 330], [P2 + 6.21, 'מתח או תנועה', 880, 900]];
kit.scene('q-hand', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="q1-room">' + R.room({ shoes: false }) + R.seated('q1', -60) +
      '<g class="q1-fz">' + [[-30, -26], [24, -40], [40, 10], [-14, 22]].map(([x, y]) => '<circle cx="' + (HX + x) + '" cy="' + (HY + y) + '" r="7" class="amber"/>').join('') + '</g>' + R.beam('q1b') + '</g>' +
      '<clipPath id="q1-iris"><circle class="q1-ic" cx="' + HX + '" cy="' + HY + '" r="1"/></clipPath><circle class="q1-ir" cx="' + HX + '" cy="' + HY + '" r="1" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-dasharray:22 18"/>' +
      '<g class="q1-close" clip-path="url(#q1-iris)">' + R.handClose('q1-c') +
      '<g class="q1-k0"><path class="ink" style="stroke:var(--accent);stroke-width:10;stroke-dasharray:18 14" d="M420 770 H900"/></g>' +
      '<g class="q1-k1" transform="translate(860 470)"><rect x="-14" y="-70" width="28" height="90" rx="14" style="fill:white;stroke:var(--second);stroke-width:5"/><circle cy="30" r="24" style="fill:#D96C6C;stroke:var(--second);stroke-width:5"/><rect x="-6" y="-30" width="12" height="60" style="fill:#D96C6C"/></g>' +
      '<g class="q1-k2">' + [[600, 520], [650, 470], [700, 515], [740, 470], [560, 470]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="10" class="amber"/>').join('') + '</g>' +
      '<g class="q1-k3"><path class="ink" style="stroke:var(--main);stroke-width:9" d="M900 640 q16 -16 32 0 t32 0 t32 0 M900 690 q16 -16 32 0 t32 0 t32 0"/></g>' + R.beam('q1c') + '</g></svg>' +
      '<div class="tag tag-cool q1-title">מפגש 29 · תשומת לב לנשימה וסריקת גוף</div><div class="tag tag-warm q1-left">כף יד שמאל</div>' +
      M.map((m, k) => '<div class="tag q1-t' + k + '">' + m[1] + '</div>').join('') +
      '<div class="tag q1-before">התחושות היו שם גם קודם</div><div class="tag tag-warm q1-att">מה שהשתנה: תשומת הלב</div></div>'));
    Object.assign(this, R.refs(kit, 'q1', ['room', 'body', 'head', 'eyes', 'mouth', 'fz', 'ic', 'ir', 'close', 'k0', 'k1', 'k2', 'k3', 'title', 'left', 't0', 't1', 't2', 't3', 'before', 'att']));
    this.b = R.beamRefs(kit, 'q1b'); this.c = R.beamRefs(kit, 'q1c');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 2.6, 3.0))));
    // the room dims a little; the beam narrows onto her left hand and she looks down at it
    const on = eio(seg(t, 1.4, 2.6));
    R.setBeam(this.b, lerp(540, HX, on), lerp(560, HY, on), lerp(560, 96, on), on, on, -t * 0.02);
    this.head.setAttribute('transform', 'rotate(' + (6 * eio(seg(t, 2.0, 2.8))) + ' 0 30) translate(0 ' + 6 * eio(seg(t, 2.0, 2.8)) + ')');
    R.place(this.left, 770, lerp(612, 600, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)) * (1 - eo(seg(t, 7.0, 7.4))));
    // "you'll feel things there": tiny sparks around the hand
    this.fz.style.opacity = eo(seg(t, 4.4, 4.9)) * (0.6 + 0.4 * Math.sin(t * 6));
    // an iris opens from the beam into the close-up of her hand
    const ir = eio(seg(t, 7.6, 8.9)), r = lerp(96, 1400, ir);
    this.ic.setAttribute('r', t < 7.6 ? 0.001 : r); this.ir.setAttribute('r', r); this.ir.style.opacity = t > 7.6 && ir < 1 ? 1 : 0;
    this.room.setAttribute('opacity', ir >= 1 ? 0 : 1);
    // sensations appear, one on each word
    const away = eio(seg(t, P3 + 0.6, P3 + 1.6)), back = eio(seg(t, P3 + 3.3, P3 + 4.3)), out = away * (1 - back), lit = 1 - 0.6 * out;
    M.forEach(([a, , x, y], k) => { const o = eo(seg(t, a, a + 0.5)); this['k' + k].style.opacity = o * lit; R.place(this['t' + k], x, lerp(y + 12, y, o), o * (1 - eo(seg(t, P3 + 0.2, P3 + 0.6)))); });
    this.k1.setAttribute('transform', 'translate(860 ' + (470 - 4 * Math.sin(t * 2)) + ')');
    this.k2.setAttribute('transform', 'translate(0 ' + Math.sin(t * 9) * 3 + ')'); this.k3.setAttribute('transform', 'translate(' + Math.sin(t * 4) * 8 + ' 0)');
    // they were there before: the beam drifts off and the hand dims, but the marks stay; it comes back and they brighten
    R.setBeam(this.c, lerp(600, 960, out), lerp(640, 200, out), 330, ir, 0.8 * ir, -t * 0.02);
    R.place(this.before, 540, lerp(84, 70, eo(seg(t, P3 + 1.0, P3 + 1.5))), eo(seg(t, P3 + 1.0, P3 + 1.5)));
    R.place(this.att, 540, lerp(176, 164, eo(seg(t, P3 + 3.6, P3 + 4.1))), eo(seg(t, P3 + 3.6, P3 + 4.1)));
  },
});
