const { seg, eo, eio, eob, lerp } = kit;
kit.scene('n-kids', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.eveRoom('nk', -120, 700) +
      '<path class="nk-str" d="M420 430 Q520 330 640 300" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:0"/>' +
      '<g class="nk-bub"><g transform="scale(3.2)">' + R.balloon('nk-bl') + '</g><g class="nk-crib" transform="translate(10 10) scale(.8)">' + R.crib('nk-c') + '</g></g></svg>' +
      '<div class="tag tag-cool nk-title">מפגש 27 · שגרת ערב לקראת השינה</div><div class="tag nk-kids">תינוקות וילדים קטנים?</div><div class="tag tag-warm nk-adult">שגרת ערב יכולה לעזור גם למבוגרים</div></div>'));
    Object.assign(this, R.refs(kit, 'nk', ['body', 'head', 'eyes', 'mouth', 'str', 'bub', 'crib', 'title', 'kids', 'adult']));
    this.e = R.eveRefs(kit, 'nk');
    kit.stage.querySelectorAll('.nk-bl .metal').forEach((d) => (d.style.opacity = 0));
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // dusk at the window; the lamp is on
    R.setEve(this.e, eo(seg(t, 0, 3)), 0, 0.15 * seg(t, 0, 11), 1);
    R.place(this.title, 540, lerp(84, 70, eo(seg(t, 0.2, 0.7))), eo(seg(t, 0.2, 0.7)) * (1 - eo(seg(t, 4.2, 4.7))));
    // an evening routine? that's for babies...
    const b = eob(seg(t, 4.6, 5.2), 1.5);
    this.bub.setAttribute('transform', 'translate(760 ' + (250 + Math.sin(t * 1.6) * 8) + ') scale(' + b + ')');
    this.str.style.opacity = 0.5 * eo(seg(t, 4.8, 5.2));
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 4.4, 5.0))) + ' 0 30)');
    R.place(this.kids, 760, lerp(432, 420, eo(seg(t, 5.0, 5.5))), eo(seg(t, 5.0, 5.5)) * (1 - eo(seg(t, 7.4, 7.8))));
    // ...but it can help adults too
    this.mouth.setAttribute('d', t > 9.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.adult, 540, lerp(84, 70, eo(seg(t, 9.5, 10.0))), eo(seg(t, 9.5, 10.0)));
  },
});
