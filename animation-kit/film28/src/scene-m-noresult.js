const { seg, eo, eio, eob, lerp } = kit;
// parts 14–15; part 15 starts at 8.9
const P = 8.9;
const C = [[P + 2.4, 'חוסר שקט'], [P + 3.2, 'מוסחות'], [P + 4.9, 'עייפות'], [P + 5.9, 'רעשים מהסביבה']];
kit.scene('m-noresult', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="mn-sun">' + R.dayCard('mn-s', 'sun') + '</g><g class="mn-cl">' + R.dayCard('mn-c', 'cloud') + '</g>' +
      '<g class="mn-eq"><rect x="-40" y="-26" width="80" height="14" rx="7" class="metal"/><rect x="-40" y="12" width="80" height="14" rx="7" class="metal"/></g></svg>' +
      '<div class="tag tag-warm mn-top">אין תוצאה מסוימת שצריך להגיע אליה</div><div class="tag tag-cool mn-calm">רגועים ומרוכזים יותר</div>' +
      C.map((c, k) => '<div class="tag mn-c' + k + '">' + c[1] + '</div>').join('') +
      '<div class="tag mn-same">לא יותר טוב, לא פחות טוב</div><div class="tag tag-cool mn-real">פשוט המציאות של הרגע הזה</div></div>'));
    Object.assign(this, R.refs(kit, 'mn', ['sun', 'cl', 'eq', 'top', 'calm', 'c0', 'c1', 'c2', 'c3', 'same', 'real']));
  },
  render(t) {
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    // sometimes calm and focused...
    this.sun.setAttribute('transform', 'translate(780 400) scale(' + eob(seg(t, 6.2, 6.8), 1.5) * 1.2 + ')');
    R.place(this.calm, 780, lerp(612, 600, eo(seg(t, 6.4, 6.9))), eo(seg(t, 6.4, 6.9)));
    // ...other times restless, distracted, tired, noisy
    this.cl.setAttribute('transform', 'translate(300 400) scale(' + eob(seg(t, P + 2.2, P + 2.8), 1.5) * 1.2 + ')');
    C.forEach(([a], k) => R.place(this['c' + k], 300, lerp(612 + k * 80, 600 + k * 80, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5))));
    // neither better nor worse
    this.eq.setAttribute('transform', 'translate(540 400) scale(' + eob(seg(t, P + 10.6, P + 11.1), 1.6) + ')');
    R.place(this.same, 780, lerp(712, 700, eo(seg(t, P + 10.7, P + 11.2))), eo(seg(t, P + 10.7, P + 11.2)));
    R.place(this.real, 540, lerp(952, 940, eo(seg(t, P + 12.7, P + 13.2))), eo(seg(t, P + 12.7, P + 13.2)));
  },
});
