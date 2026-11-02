const { seg, eo, eio, eob, lerp } = kit;
// parts 10–12: with close people, explain more — the frame splits into outside (right: how it looks) and inside (left: session 2's head cutaway).
// Slow to get up looks like unwillingness; a still face looks like no interest — neither is the case
const P11 = 13.32, P12 = 23.77, SP = 7.0;
kit.scene('c-split', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><defs><clipPath id="c6-cr"><rect class="c6-cr" x="0" y="0" width="1080" height="1080"/></clipPath><clipPath id="c6-cl"><rect class="c6-cll" x="0" y="0" width="0" height="1080"/></clipPath></defs>' +
      '<g clip-path="url(#c6-cr)">' + R.room({ shoes: false }) + R.doorOpen('c6-door') + '<g class="c6-out">' + R.seated('c6', -100) + '<g class="c6-fb" transform="translate(700 866) scale(.9)">' + R.friend('c6b', 'b', 'stand') + '</g></g>' +
      '<g class="c6-q">' + R.qCloud('c6-qc') + '</g></g>' +
      '<g clip-path="url(#c6-cl)"><rect width="540" height="1080" style="fill:color-mix(in srgb, var(--main) 14%, var(--ground))"/><g class="c6-in">' + R.profile('c6p') + '<g transform="translate(540 352)"><g class="c6-ht">' + R.heart('c6-h') + '</g></g></g></g>' +
      '<rect class="c6-div" x="536" y="0" width="8" height="1080" style="fill:var(--second);opacity:0"/></svg>' +
      '<div class="tag tag-cool c6-close">לפעמים דווקא עם האנשים הקרובים, שמכירים אתכם הכי טוב</div><div class="tag tag-warm c6-more">צריך להסביר יותר</div>' +
      '<div class="tag tag-cool c6-diff">נראה מבחוץ אחרת לגמרי ממה שמרגישים מבפנים</div><div class="tag c6-out-t">מבחוץ</div><div class="tag c6-in-t">מבפנים</div>' +
      '<div class="tag c6-i0">תנועה איטית</div><div class="tag c6-i1">קושי להתחיל פעולה</div><div class="tag struck c6-o0">חוסר רצון להשתתף?</div><div class="tag struck c6-o1">עצלנות?</div><div class="tag tag-warm c6-not">וזה לא המצב</div>' +
      '<div class="tag c6-i2">האטה בדיבור</div><div class="tag c6-i3">שינוי ביכולת ההבעה</div><div class="tag struck c6-o2">חוסר עניין בשיחה?</div><div class="tag tag-warm c6-not2">וזה גם לא המצב</div>' +
      '<div class="say c6-talk">…</div></div>'));
    Object.assign(this, R.refs(kit, 'c6', ['cr', 'cll', 'door', 'out', 'fb', 'q', 'in', 'ht', 'div', 'body', 'head', 'eyes', 'mouth', 'close', 'more', 'diff', 'out-t', 'in-t', 'i0', 'i1', 'o0', 'o1', 'not', 'i2', 'i3', 'o2', 'not2', 'talk']));
    this.f = R.refs(kit, 'c6b', ['head', 'eyes', 'mouth']);
    this.p = R.refs(kit, 'c6p', ['eye', 'glow', 'star']);
    this.talk.style.setProperty('--tx', '75%');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.8);
    this.p.eye.setAttribute('transform', (t % 4.3) > 4.15 ? 'translate(790 512) scale(1 .15) translate(-790 -512)' : '');
    // the split: the people slide to the right half, the inside view opens on the left
    const sp = eio(seg(t, SP, SP + 1.1));
    this.out.setAttribute('transform', 'translate(' + 270 * sp + ' 0)');
    this.cr.setAttribute('x', 540 * sp); this.cll.setAttribute('width', 540 * sp); this.div.style.opacity = sp;
    this.in.setAttribute('transform', 'translate(' + lerp(-60, 270, sp) + ' 560) scale(.56) translate(-540 -520)');
    R.place(this.close, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, SP - 0.4, SP))));
    R.place(this.more, 540, lerp(162, 150, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)) * (1 - eo(seg(t, SP - 0.4, SP))));
    R.place(this.diff, 540, lerp(84, 70, eo(seg(t, SP + 1.0, SP + 1.5))), eo(seg(t, SP + 1.0, SP + 1.5)) * (1 - eo(seg(t, P11 + 7.8, P11 + 8.1))));
    R.place(this['out-t'], 810, lerp(172, 160, eo(seg(t, 9.3, 9.7))), eo(seg(t, 9.3, 9.7)));
    R.place(this['in-t'], 270, lerp(172, 160, eo(seg(t, 11.9, 12.3))), eo(seg(t, 11.9, 12.3)));
    // the bulb inside is lit: she wants to; the heart: she cares
    this.p.glow.setAttribute('transform', 'scale(' + (1 + 0.1 * Math.sin(t * 3)) + ')'); this.p.star.setAttribute('transform', 'rotate(' + t * 15 + ')');
    R.setG(this.ht, 0, 0, eob(seg(t, P12 + 2.4, P12 + 3.0), 1.6) * (1 + 0.06 * Math.sin(t * 5)), eo(seg(t, P12 + 2.4, P12 + 2.7)));
    // part 11: the friend waits by the open door; Ruth gets up slowly
    this.door.setAttribute('opacity', eo(seg(t, P11, P11 + 0.6)) * (1 - eo(seg(t, P12, P12 + 0.6))));
    const up = eio(seg(t, P11 + 0.8, P11 + 9.0)) * (1 - eio(seg(t, P12 - 0.6, P12)));
    this.body.setAttribute('transform', 'translate(' + (14 * up) + ' ' + (-26 * up) + ') rotate(' + (7 * up) + ')');
    this.f.head.setAttribute('transform', 'rotate(' + (t > P11 && t < P12 ? -8 : 6) + ' 0 30)');
    R.setG(this.q, 970, 330 + Math.sin(t * 2) * 5, eob(seg(t, P11 + 5.4, P11 + 5.9), 1.5) * 0.8, eo(seg(t, P11 + 5.4, P11 + 5.7)) * (1 - eo(seg(t, P11 + 8.2, P11 + 8.6))));
    const tg = (el, x, y, a, b, sk) => { R.place(el, x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b, b + 0.3)))); if (sk != null) el.style.setProperty('--s', eo(seg(t, sk, sk + 0.4))); };
    tg(this.i0, 270, 780, P11 + 0.86, P12 - 0.3); tg(this.i1, 270, 850, P11 + 2.64, P12 - 0.3);
    tg(this.o0, 810, 760, P11 + 5.67, P12 - 0.3, P11 + 8.2); tg(this.o1, 810, 830, P11 + 7.45, P12 - 0.3, P11 + 8.3);
    tg(this.not, 540, 70, P11 + 8.2, P12 - 0.3);
    // part 12: the friend talks, Ruth listens with a still face
    R.talk(this.f.mouth, t, t > P12 + 0.3 && t < P12 + 4.4);
    R.place(this.talk, 930, lerp(352, 340, eo(seg(t, P12 + 0.3, P12 + 0.7))), eo(seg(t, P12 + 0.3, P12 + 0.7)) * (1 - eo(seg(t, P12 + 4.4, P12 + 4.7))));
    this.mouth.setAttribute('d', t > P12 ? R.mouthFlat : t > P11 ? 'M-10 28 Q2 30 14 28' : R.mouthNeutral);
    tg(this.i2, 270, 780, P12 + 0.32, 99); tg(this.i3, 270, 850, P12 + 1.35, 99);
    tg(this.o2, 810, 800, P12 + 4.34, 99, P12 + 6.3); tg(this.not2, 540, 70, P12 + 6.3, 99);
  },
});
