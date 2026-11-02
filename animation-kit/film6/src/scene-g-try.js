const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-try', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="gy-cam">' + R.room({}) +
      '<g transform="translate(578 866)">' + R.roots('gy-a') + '</g><g transform="translate(622 866) scale(-1 1)">' + R.roots('gy-b') + '</g>' + R.seated('gy', 0) +
      '<ellipse class="gy-glow" cx="598" cy="866" rx="90" ry="22" style="fill:var(--accent);opacity:0"/></g></svg><div class="tag tag-warm gy-cap">בואו ננסה ביחד</div></div>'));
    Object.assign(this, R.refs(kit, 'gy', ['cam', 'eyes', 'glow', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    // down to the ground: the camera settles on her feet on the floor
    const z = eio(seg(t, 0.5, 3.4)), s = lerp(1, 2.2, z), fx = lerp(540, 600, z), fy = lerp(540, 820, z);
    this.cam.setAttribute('transform', 'translate(540 540) scale(' + s + ') translate(' + (-fx) + ' ' + (-fy) + ')');
    this.glow.style.opacity = 0.35 * eo(seg(t, 2.6, 3.6)) * (0.85 + 0.15 * Math.sin(t * 3));
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)));
  },
});
