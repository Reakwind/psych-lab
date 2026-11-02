const { seg, eo, eio, eob, lerp } = kit;
// the people around her are part of it; help doesn't have to mean someone does everything for her
kit.scene('r-help', {
  init(kit) {
    let pile = '';
    for (let k = 0; k < 6; k++) pile += '<rect class="slate-dk" x="' + (-60 + (k % 2) * 12) + '" y="' + (-300 - k * 44) + '" width="110" height="40" rx="8"/>';
    const pic = '<g class="rh-pic"><rect class="shade" x="-142" y="-160" width="300" height="330" rx="22"/><rect x="-150" y="-170" width="300" height="330" rx="22" style="fill:color-mix(in srgb, var(--ground) 60%, white);stroke:var(--second);stroke-width:6"/>' +
      '<clipPath id="rh-cl"><rect x="-140" y="-160" width="280" height="310" rx="16"/></clipPath><g clip-path="url(#rh-cl)"><g transform="translate(40 150) scale(.5)">' + R.friend('rh-p', 'a') + pile + '</g><g transform="translate(-70 150) scale(.36)">' + R.chair().replace(/<ellipse[^>]*\/>/, '') + '</g><g transform="translate(-80 110) scale(.36)">' + R.ruth('rh-q', 'sit') + '</g></g>' +
      '<path class="rh-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round" d="M-120 -140 L120 130 M120 -140 L-120 130"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('rh', -200) + '<g class="rh-fr">' + R.friend('rh-f', 'a') + '</g>' + pic + '</svg>' +
      '<div class="tag rh-cap">עושה הכול במקומנו?</div><div class="tag tag-cool rh-part">חלק מההתאמה</div></div>'));
    Object.assign(this, R.refs(kit, 'rh', ['head', 'eyes', 'mouth', 'body', 'fr', 'pic', 'x', 'cap', 'part']));
    this.fe = kit.stage.querySelector('.rh-f-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4); R.blink(this.fe, t, 1.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    const come = eio(seg(t, 0.3, 1.6));
    this.fr.setAttribute('transform', 'translate(' + lerp(1200, 600, come) + ' 1000)');
    R.place(this.part, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)) * (1 - eo(seg(t, 4.2, 4.6))));
    // the picture of someone carrying everything for her... and a cross through it
    const p = eob(seg(t, 4.6, 5.3), 1.4), x = eo(seg(t, 7.5, 8.1));
    this.pic.setAttribute('transform', 'translate(830 330) scale(' + p + ')'); this.pic.style.opacity = eo(seg(t, 4.6, 4.9));
    this.x.style.strokeDasharray = x + ' 1'; this.x.style.opacity = x > 0 ? 1 : 0;
    R.place(this.cap, 830, lerp(560, 548, eo(seg(t, 5.2, 5.7))), eo(seg(t, 5.2, 5.7)));
    this.head.setAttribute('transform', 'rotate(' + (8 * come) + ' 0 30)');
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
  },
});
