const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-curious', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('mc', -60) + '<g class="mc-mg">' + R.magnifier('mc-m') + '</g></svg>' +
      '<div class="tag tag-cool mc-look">התבוננות יותר סקרנית ופחות שיפוטית</div><div class="tag tag-warm mc-what">שמים לב למה שיש</div>' +
      '<div class="tag struck mc-j">לשפוט</div><div class="tag struck mc-c">לשנות</div></div>'));
    Object.assign(this, R.refs(kit, 'mc', ['body', 'head', 'eyes', 'mouth', 'mg', 'look', 'what', 'j', 'c']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    // a curious look: the magnifier drifts over what's there
    const m = eob(seg(t, 2.2, 2.8), 1.5);
    this.mg.setAttribute('transform', 'translate(' + (720 + Math.sin(t * 0.8) * 90) + ' ' + (560 + Math.cos(t * 0.6) * 70) + ') scale(' + m + ')');
    this.head.setAttribute('transform', 'rotate(' + (Math.sin(t * 0.8) * 6) + ' 0 30)');
    R.place(this.look, 540, lerp(84, 70, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    R.place(this.what, 540, lerp(176, 164, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)));
    // without rushing to judge or change it
    R.place(this.j, 860, lerp(312, 300, eo(seg(t, 7.3, 7.7))), eo(seg(t, 7.3, 7.7))); this.j.style.setProperty('--s', eio(seg(t, 7.7, 8.1)));
    R.place(this.c, 860, lerp(402, 390, eo(seg(t, 7.8, 8.2))), eo(seg(t, 7.8, 8.2))); this.c.style.setProperty('--s', eio(seg(t, 8.2, 8.6)));
  },
});
