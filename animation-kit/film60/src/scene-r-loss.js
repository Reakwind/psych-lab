const { seg, eo, eio, eob, lerp } = kit;
// some roles can't stay as they were: a real loss. One badge is put away; nothing is rushed in to replace it.
kit.scene('r-loss', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('rl', -140) +
      '<rect class="wood" x="760" y="640" width="260" height="18" rx="8"/><g transform="translate(890 640)">' + R.box('rl-bx') + '</g>' +
      '<g class="rl-b">' + R.role('rl-r', 4, 56) + '</g><g transform="translate(890 640)"><g class="rl-lidw"></g></g>' +
      '<rect class="rl-dim" width="1080" height="1080" style="fill:color-mix(in srgb, var(--second) 70%, var(--main))" opacity="0"/></svg>' +
      '<div class="tag rl-cap" style="background:color-mix(in srgb, var(--second) 18%, var(--ground))">אובדן אמיתי</div></div>'));
    Object.assign(this, R.refs(kit, 'rl', ['head', 'eyes', 'mouth', 'body', 'b', 'dim', 'cap']));
    this.lid = kit.stage.querySelector('.rl-bx-lid');
    this.lid.parentNode.removeChild(this.lid); kit.stage.querySelector('.rl-lidw').append(this.lid);
  },
  render(t) {
    R.blink(this.eyes, t, 0.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.4) + ')');
    this.dim.setAttribute('opacity', 0.16 * eio(seg(t, 0.2, 2.0)));
    // the lid lifts, the badge settles in, the lid closes
    const open = eio(seg(t, 1.2, 2.0)) * (1 - eio(seg(t, 4.6, 5.4)));
    this.lid.setAttribute('transform', 'translate(-110 -150) rotate(' + (-70 * open) + ') translate(110 150)');
    const f = eio(seg(t, 2.2, 4.4));
    this.b.setAttribute('transform', 'translate(' + lerp(700, 890, f) + ' ' + (lerp(420, 590, f) - 60 * Math.sin(Math.PI * f)) + ') scale(' + lerp(1, 0.8, f) + ')');
    this.b.style.opacity = 1 - eo(seg(t, 4.3, 4.7));
    this.head.setAttribute('transform', 'rotate(' + (10 * eio(seg(t, 1.0, 2.4)) - 4 * eio(seg(t, 6.0, 7.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3 ? 'M-10 30 Q2 24 14 30' : 'M-10 28 Q2 26 14 28');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 6.9, 7.5))), eo(seg(t, 6.9, 7.5)));
  },
});
