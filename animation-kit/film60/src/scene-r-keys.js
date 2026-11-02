const { seg, eo, eio, eob, lerp } = kit;
kit.scene('r-keys', {
  init(kit) {
    let ruth = R.armsFree(R.ruth('rk', 'stand'), 'rk'), fr = R.armsFree(R.friend('rk-f', 'a'), 'rk-f');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(400 1000)">' + ruth + '</g><g class="rk-fr">' + fr + '</g>' + '<g class="rk-k">' + R.keys('rk-ki') + '</g></svg>' +
      '<div class="tag tag-warm rk-cap">והשינויים האלה עלולים לכאוב</div></div>'));
    Object.assign(this, R.refs(kit, 'rk', ['head', 'eyes', 'mouth', 'armR', 'fr', 'k', 'cap']));
    this.fa = kit.stage.querySelector('.rk-f-armL'); this.fe = kit.stage.querySelector('.rk-f-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.7); R.blink(this.fe, t, 2.1);
    // someone else steps in to do what she used to do
    const come = eio(seg(t, 0.3, 1.8));
    this.fr.setAttribute('transform', 'translate(' + lerp(1220, 700, come) + ' 1000)');
    // she holds out her car keys, and hands them over
    const reach = eio(seg(t, 2.0, 2.8)), pass = eio(seg(t, 3.0, 4.2)), back = eio(seg(t, 4.4, 5.2));
    this.armR.setAttribute('transform', 'rotate(' + (-70 * reach * (1 - back)) + ' 52 -326)');
    this.fa.setAttribute('transform', 'rotate(' + (60 * eio(seg(t, 2.6, 3.4)) * (1 - 0.6 * eio(seg(t, 4.8, 5.6)))) + ' -52 -326)');
    const kx = lerp(lerp(470, 560, reach), 610, pass), ky = lerp(lerp(810, 640, reach), 650, pass);
    this.k.setAttribute('transform', 'translate(' + (kx + eio(seg(t, 4.8, 5.6)) * 40) + ' ' + (ky + eio(seg(t, 4.8, 5.6)) * 150) + ') rotate(' + (-20 + 30 * pass) + ') scale(1.1)');
    this.k.style.opacity = eo(seg(t, 1.9, 2.2)) * (1 - eo(seg(t, 5.4, 5.8)));
    // and it can hurt
    this.head.setAttribute('transform', 'rotate(' + (6 * come - 10 * eio(seg(t, 6.4, 7.4))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.8 ? 'M-10 30 Q2 22 14 30' : t > 4.4 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 7.6, 8.1))), eo(seg(t, 7.6, 8.1)));
  },
});
