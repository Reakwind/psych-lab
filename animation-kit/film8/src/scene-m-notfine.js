const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-notfine', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="translate(540 600) scale(.78) translate(-540 -480)">' + R.picture('mn') + '</g></svg>' +
      '<div class="tag struck mn-a">"הכל בסדר"</div><div class="tag struck mn-b">להעמיד פנים שאין קושי</div><div class="tag tag-warm mn-q">מה יש עוד בסיפור הזה?</div></div>'));
    Object.assign(this, R.refs(kit, 'mn', ['dark', 'a', 'b', 'q']));
    this.rain = kit.stage.querySelector('.mn-rc-rain');
  },
  render(t) {
    // not "everything's fine", not pretending: the light opens onto the rest of the picture
    this.a.style.setProperty('--s', eio(seg(t, 3.0, 3.5))); this.b.style.setProperty('--s', eio(seg(t, 5.6, 6.2)));
    R.place(this.a, 780, lerp(84, 70, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)));
    R.place(this.b, 330, lerp(84, 70, eo(seg(t, 4.7, 5.1))), eo(seg(t, 4.7, 5.1)));
    const p = eio(seg(t, 7.2, 9.4)), r = lerp(150, 820, p), cx = lerp(706, 540, p), cy = lerp(300, 480, p);
    this.dark.setAttribute('d', R.spotD(cx, cy, r, 150, 190, 930, 770));
    this.rain.setAttribute('transform', 'translate(0 ' + ((t * 40) % 24) + ')');
    R.place(this.q, 540, lerp(964, 950, eo(seg(t, 8.2, 8.7))), eo(seg(t, 8.2, 8.7)));
  },
});
