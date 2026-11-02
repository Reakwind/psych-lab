const { seg, eo, eio, eob, lerp } = kit;
// parts 1–3: the beam lands on her left hand; a close-up shows what she feels; it was there all along
const P2 = 10.15, P3 = 18.43;
const M = [[P2 + 1.6, 'המגע במשטח', 620, 800], [P2 + 3.6, 'הטמפרטורה', 860, 330], [P2 + 5.1, 'עקצוץ קטן', 430, 330], [P2 + 6.1, 'מתח או תנועה', 880, 880]];
kit.scene('m-hand', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="mh-room">' + R.room({ shoes: false }) + R.seated('mh', -60) + R.beam('mhb') + '</g>' +
      '<g class="mh-close" opacity="0">' + R.handClose('mh-c') +
      '<g class="mh-k0"><path class="ink" style="stroke:var(--accent);stroke-width:10;stroke-dasharray:18 14" d="M420 760 H900"/></g>' +
      '<g class="mh-k1" transform="translate(860 470)"><rect x="-14" y="-70" width="28" height="90" rx="14" style="fill:white;stroke:var(--second);stroke-width:5"/><circle cy="30" r="24" style="fill:#D96C6C;stroke:var(--second);stroke-width:5"/><rect x="-6" y="-30" width="12" height="60" style="fill:#D96C6C"/></g>' +
      '<g class="mh-k2">' + [[600, 520], [650, 470], [700, 515], [740, 470], [560, 470]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="9" class="amber"/>').join('') + '</g>' +
      '<g class="mh-k3"><path class="ink" style="stroke:var(--main);stroke-width:9" d="M900 640 q16 -16 32 0 t32 0 t32 0 M900 690 q16 -16 32 0 t32 0 t32 0"/></g>' + R.beam('mhc') + '</g>' +
      '<rect class="mh-veil" width="1080" height="1080" style="fill:var(--ground);opacity:0"/></svg>' +
      '<div class="tag tag-cool mh-title">מפגש 28 · תשומת לב לנשימה ולסריקת גוף</div><div class="tag tag-warm mh-left">כף יד שמאל</div>' +
      M.map((m, k) => '<div class="tag mh-t' + k + '">' + m[1] + '</div>').join('') +
      '<div class="tag mh-before">התחושות היו שם גם קודם</div><div class="tag tag-warm mh-att">מה שהשתנה: תשומת הלב</div><div class="tag tag-cool mh-mind">וזה חלק גדול ממיינדפולנס</div></div>'));
    Object.assign(this, R.refs(kit, 'mh', ['room', 'body', 'head', 'eyes', 'mouth', 'close', 'veil', 'k0', 'k1', 'k2', 'k3', 'title', 'left', 't0', 't1', 't2', 't3', 'before', 'att', 'mind']));
    this.b = R.beamRefs(kit, 'mhb'); this.c = R.beamRefs(kit, 'mhc');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 1.6, 2.0))));
    // the room dims; the beam of attention lands on her left hand
    const on = eio(seg(t, 1.8, 2.8));
    R.setBeam(this.b, lerp(540, 462, on), lerp(560, 716, on), lerp(500, 90, on), on);
    this.head.setAttribute('transform', 'rotate(' + (-10 * eio(seg(t, 2.2, 3.0))) + ' 0 30) translate(0 ' + 6 * eio(seg(t, 2.2, 3.0)) + ')');
    R.place(this.left, 700, lerp(612, 600, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)) * (1 - eo(seg(t, 5.2, 5.6))));
    // close-up of the hand
    const v = Math.sin(Math.PI * seg(t, 5.4, 6.4)), close = t > 5.9;
    this.veil.style.opacity = v; this.close.setAttribute('opacity', close ? 1 : 0); this.room.setAttribute('opacity', close ? 0 : 1);
    // sensations appear, one on each word
    const away = eio(seg(t, P3 + 0.4, P3 + 1.6)), back = eio(seg(t, P3 + 3.3, P3 + 4.4)), lit = 1 - 0.6 * away + 0.6 * back;
    M.forEach(([a, , x, y], k) => { const o = eo(seg(t, a, a + 0.5)); this['k' + k].style.opacity = o * lit; R.place(this['t' + k], x, lerp(y + 12, y, o), o * (1 - eo(seg(t, P3 + 0.2, P3 + 0.6)))); });
    this.k2.setAttribute('transform', 'translate(0 ' + Math.sin(t * 9) * 3 + ')'); this.k3.setAttribute('transform', 'translate(' + Math.sin(t * 4) * 8 + ' 0)');
    // they were there before: the beam drifts off and the hand dims, but the marks stay; it comes back and they brighten
    const bx = lerp(lerp(600, 540, 0), 980, away * (1 - back)), by = lerp(640, 200, away * (1 - back));
    R.setBeam(this.c, bx, by, 330, 1, 0.8);
    R.place(this.before, 540, lerp(84, 70, eo(seg(t, P3 + 1.0, P3 + 1.5))), eo(seg(t, P3 + 1.0, P3 + 1.5)));
    R.place(this.att, 540, lerp(176, 164, eo(seg(t, P3 + 3.3, P3 + 3.8))), eo(seg(t, P3 + 3.3, P3 + 3.8)));
    R.place(this.mind, 540, lerp(952, 940, eo(seg(t, P3 + 7.0, P3 + 7.5))), eo(seg(t, P3 + 7.0, P3 + 7.5)));
  },
});
