const { seg, eo, eio, eob, lerp } = kit;
const Q = [[780, 220], [880, 330], [660, 300], [960, 200], [740, 390], [600, 180]];
kit.scene('n-doctor', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('nd', -170) +
      Q.map((q, k) => '<g class="nd-q' + k + '"><circle r="40" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/><text y="16" text-anchor="middle" style="font-size:46px;font-weight:700;fill:var(--second)">?</text></g>').join('') +
      '<g class="nd-mn"><circle r="40" style="fill:color-mix(in srgb, var(--accent) 30%, var(--ground));stroke:var(--second);stroke-width:5"/><g transform="translate(-4 0) scale(.9)">' + R.moon('nd-m', 22) + '</g></g>' +
      '<g class="nd-dr"><g class="nd-da">' + R.friend('nd-a', 'g') + '</g><g class="nd-db">' + R.friend('nd-b', 'g', 'step') + '</g><path class="ink" style="stroke-width:6" d="M-30 -330 C-36 -280 -10 -250 0 -250 C10 -250 36 -280 30 -330"/><circle class="metal" cx="0" cy="-246" r="10"/></g></svg>' +
      '<div class="tag nd-many">יש הרבה גורמים שיכולים להשפיע</div><div class="tag tag-warm nd-not">שגרת ערב לא יכולה לפתור את כולם</div>' +
      '<div class="tag tag-cool nd-hard">קושי משמעותי או מתמשך בשינה?</div><div class="tag tag-warm nd-doc">כדאי לדבר על זה עם הרופא</div></div>'));
    Object.assign(this, R.refs(kit, 'nd', ['body', 'head', 'eyes', 'mouth', 'mn', 'dr', 'da', 'db', 'many', 'not', 'hard', 'doc']));
    this.q = Q.map((_, k) => kit.stage.querySelector('.nd-q' + k));
    this.de = [kit.stage.querySelector('.nd-a-eyes'), kit.stage.querySelector('.nd-b-eyes')];
  },
  render(t) {
    R.blink(this.eyes, t, 0.4); this.de.forEach((e) => R.blink(e, t, 1.3));
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // many things affect sleep; a routine covers only one of them
    const gone = eio(seg(t, 6.6, 7.4));
    Q.forEach(([x, y], k) => { const p = eob(seg(t, 1.6 + k * 0.15, 2.1 + k * 0.15), 1.6); this.q[k].setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 1.5 + k) * 6) + ') scale(' + p * (1 - gone) + ')'); });
    const m = eob(seg(t, 5.2, 5.7), 1.6);
    this.mn.setAttribute('transform', 'translate(' + Q[0][0] + ' ' + (Q[0][1] + Math.sin(t * 1.5) * 6) + ') scale(' + m * 1.2 * (1 - gone) + ')');
    R.place(this.many, 540, lerp(84, 70, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 6.6, 7.0))));
    R.place(this.not, 760, lerp(482, 470, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)) * (1 - eo(seg(t, 6.6, 7.0))));
    // for real, lasting difficulty: talk to the doctor
    const come = eio(seg(t, 7.0, 9.0)), walking = come > 0 && come < 1, step = walking ? Math.floor(t * 2.4) % 2 : 0;
    this.da.style.opacity = step ? 0 : 1; this.db.style.opacity = step ? 1 : 0;
    this.dr.setAttribute('transform', 'translate(' + lerp(1240, 760, come) + ' ' + (962 + (walking ? Math.abs(Math.sin(t * Math.PI * 2.4)) * -6 : 0)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-8 * eio(seg(t, 8.4, 9.2))) + ' 0 30)');
    R.place(this.hard, 540, lerp(84, 70, eo(seg(t, 7.1, 7.6))), eo(seg(t, 7.1, 7.6)));
    R.place(this.doc, 540, lerp(176, 164, eo(seg(t, 11.3, 11.8))), eo(seg(t, 11.3, 11.8)));
    this.mouth.setAttribute('d', t > 11.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
