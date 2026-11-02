const { seg, eo, eio, eob, lerp } = kit;
// the same tasks at work or in the community may be too much now; she can still give by guiding others
kit.scene('r-guide', {
  init(kit) {
    let stack = '';
    for (let k = 0; k < 5; k++) stack += '<g class="ru-s' + k + '"><rect class="slate-dk" x="-80" y="' + (-70 - k * 74) + '" width="160" height="66" rx="12"/><rect class="slate" x="-72" y="' + (-62 - k * 74) + '" width="144" height="26" rx="8"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect class="wall-lo" width="1080" height="860"/><rect class="sky" opacity=".5" width="1080" height="640"/>' +
      '<rect class="floor" x="0" y="860" width="1080" height="220"/><rect class="floor-dk" x="0" y="860" width="1080" height="12"/>' +
      '<g transform="translate(840 860)">' + R.flip('ru-f') + '</g><g class="ru-stack" transform="translate(180 860)">' + stack + '</g>' +
      '<g transform="translate(440 1000)">' + R.armsFree(R.ruth('ru', 'stand'), 'ru') + '</g><g class="ru-fr">' + R.friend('ru-c', 'a') + '</g>' +
      '<g class="ru-note">' + R.note('ru-n') + '</g></svg>' +
      '<div class="tag tag-warm ru-cap">ליווי והדרכה של אחרים</div></div>'));
    Object.assign(this, R.refs(kit, 'ru', ['head', 'eyes', 'mouth', 'armR', 'stack', 'fr', 'note', 'cap']));
    this.s = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.ru-s' + k));
    this.ce = kit.stage.querySelector('.ru-c-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.8); R.blink(this.ce, t, 2.0);
    // the old load of tasks: a tall stack that sways, then is set aside
    const go = eio(seg(t, 3.4, 4.6));
    this.s.forEach((el, k) => el.setAttribute('transform', 'rotate(' + (Math.sin(t * 2.2) * 1.2 * k) + ' 0 0)'));
    this.stack.setAttribute('transform', 'translate(' + (180 - 160 * go) + ' 860)'); this.stack.style.opacity = 1 - go;
    // a younger colleague comes; Ruth shows her the way
    const come = eio(seg(t, 3.8, 5.2));
    this.fr.setAttribute('transform', 'translate(' + lerp(1200, 700, come) + ' 1000) scale(.92)');
    const point = eio(seg(t, 5.6, 6.4));
    this.armR.setAttribute('transform', 'rotate(' + (-80 * point) + ' 52 -326)');
    this.note.setAttribute('transform', 'translate(' + lerp(520, 590, point) + ' ' + lerp(830, 640, point) + ') scale(' + (1.4 + 0.4 * point) + ')'); this.note.style.opacity = eo(seg(t, 5.4, 5.8));
    this.head.setAttribute('transform', 'rotate(' + (-6 + 12 * come) + ' 0 30)');
    this.mouth.setAttribute('d', t > 5.6 ? 'M-12 24 Q2 36 16 24' : 'M-10 28 Q2 26 14 28');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.8, 7.3))), eo(seg(t, 6.8, 7.3)));
  },
});
