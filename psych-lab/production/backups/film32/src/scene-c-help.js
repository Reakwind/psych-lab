const { seg, eo, eio, eob, lerp } = kit;
// parts 15–17: misunderstanding can come from love (a heart from the friend); a friend rushes to do it for Ruth — her mug — though not every
// difficulty needs help; Ruth says when she wants help, and how; the friend steps back and the mug comes back to her
const P16 = 4.65, P17 = 16.21;
kit.scene('c-help', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, plant: false }) + R.seated('c8', -240) + R.teaTable('c8', 548) +
      '<g class="c8-fw">' + R.friend('c8a', 'a', 'stand') + '</g><g class="c8-mug">' + R.mug('c8-m') + '</g><g class="c8-ht">' + R.heart('c8-h') + '</g></svg>' +
      '<div class="tag tag-warm c8-love">לפעמים חוסר ההבנה יכול להגיע ממקום אוהב</div><div class="tag tag-cool c8-rush">אנשים שרוצים לעזור יכולים למהר לעשות משהו במקומכם</div>' +
      '<div class="tag c8-not">אבל לא כל קושי דורש עזרה</div><div class="tag tag-warm c8-nohelp">ולא כל עזרה באמת עוזרת</div>' +
      '<div class="tag tag-cool c8-tell">לפעמים חשוב להגיד לאנשים</div><div class="tag tag-warm c8-when">מתי אתם רוצים עזרה</div><div class="tag tag-warm c8-how">ואיך אתם רוצים לקבל אותה</div></div>'));
    Object.assign(this, R.refs(kit, 'c8', ['body', 'head', 'eyes', 'mouth', 'fw', 'mug', 'ht', 'love', 'rush', 'not', 'nohelp', 'tell', 'when', 'how']));
    this.f = R.refs(kit, 'c8a', ['head', 'eyes', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.f.eyes, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    // the friend, warm; a heart rises from her
    R.setG(this.ht, 820, lerp(380, 300, eo(seg(t, 0.9, 2.6))), 0.9 * eob(seg(t, 0.9, 1.4), 1.6), eo(seg(t, 0.9, 1.2)) * (1 - eo(seg(t, P16, P16 + 0.5))));
    // Ruth reaches for her mug; the friend hurries over and takes it for her; then (part 17) puts it back and steps back
    const rush = eio(seg(t, P16 + 3.0, P16 + 4.2)), back = eio(seg(t, P17 + 1.0, P17 + 2.4));
    const fx = lerp(820, 640, rush * (1 - back)), step = (rush > 0 && rush < 1) || (back > 0 && back < 1) ? Math.abs(Math.sin(t * 8)) * 8 : 0;
    this.fw.setAttribute('transform', 'translate(' + fx + ' ' + (866 - step) + ') scale(.92)');
    const reach = eio(seg(t, P16 + 1.4, P16 + 2.6)), grab = eio(seg(t, P16 + 4.0, P16 + 4.8)), give = eio(seg(t, P17 + 2.4, P17 + 3.6));
    let mx = lerp(570, 520, reach), my = 740;
    mx = lerp(mx, 600, grab * (1 - back)); my = lerp(my, 630, grab * (1 - back));
    mx = lerp(mx, 400, give); my = lerp(my, 700, give);
    this.mug.setAttribute('transform', 'translate(' + mx + ' ' + my + ') scale(.7)');
    this.head.setAttribute('transform', 'rotate(' + (8 * reach * (1 - give) + 6) + ' 0 30)');
    this.mouth.setAttribute('d', t > P17 + 3.4 ? R.mouthHappy : t > P16 + 4.4 && t < P17 ? R.mouthFlat : t > P17 ? (Math.floor(t * 6) % 2 && t < P17 + 3.0 ? 'M-10 24 Q2 36 14 24' : R.mouthNeutral) : R.mouthNeutral);
    this.f.mouth.setAttribute('d', t < P16 || t > P17 + 2.0 ? R.mouthHappy : R.mouthNeutral);
    this.f.head.setAttribute('transform', 'rotate(' + (-6 + 10 * Math.sin(Math.PI * seg(t, P17 + 0.4, P17 + 1.2))) + ' 0 30)');
    R.place(this.love, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, P16, P16 + 0.3))));
    R.place(this.rush, 540, lerp(84, 70, eo(seg(t, P16 + 0.4, P16 + 0.9))), eo(seg(t, P16 + 0.4, P16 + 0.9)) * (1 - eo(seg(t, P17, P17 + 0.3))));
    R.place(this.not, 540, lerp(932, 920, eo(seg(t, P16 + 5.8, P16 + 6.2))), eo(seg(t, P16 + 5.8, P16 + 6.2)) * (1 - eo(seg(t, P17, P17 + 0.3))));
    R.place(this.nohelp, 540, lerp(1002, 990, eo(seg(t, P16 + 8.7, P16 + 9.1))), eo(seg(t, P16 + 8.7, P16 + 9.1)) * (1 - eo(seg(t, P17, P17 + 0.3))));
    R.place(this.tell, 540, lerp(84, 70, eo(seg(t, P17 + 0.4, P17 + 0.9))), eo(seg(t, P17 + 0.4, P17 + 0.9)));
    R.place(this.when, 780, lerp(172, 160, eo(seg(t, P17 + 3.3, P17 + 3.7))), eo(seg(t, P17 + 3.3, P17 + 3.7)));
    R.place(this.how, 330, lerp(172, 160, eo(seg(t, P17 + 4.9, P17 + 5.3))), eo(seg(t, P17 + 4.9, P17 + 5.3)));
  },
});
