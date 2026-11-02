const { seg, eo, eio, eob, lerp } = kit;
// click: a close look at the switch as it snaps on
kit.scene('m-click', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--ground) 92%, var(--second))"/>' +
      '<circle cx="540" cy="520" r="420" style="fill:var(--ground)"/><g class="m7-sww">' + R.switchSvg('m7-sw') + '</g><rect class="m7-fl" width="1080" height="1080" style="fill:white;opacity:0"/></svg>' +
      '<div class="count big red m7-k">קליק</div></div>'));
    Object.assign(this, R.refs(kit, 'm7', ['sww', 'fl', 'k']));
    this.sw = R.swRefs(kit, 'm7-sw');
  },
  render(t) {
    const z = eio(seg(t, 0.0, 0.4)), on = t >= 0.48 ? 1 : 0, sh = Math.exp(-(t - 0.48) * 9) * (t > 0.48 ? 1 : 0);
    this.sww.setAttribute('transform', 'translate(' + (540 + 14 * Math.sin(t * 60) * sh) + ' ' + (560 + 10 * Math.cos(t * 50) * sh) + ') scale(' + lerp(2.4, 3.0, z) + ')');
    R.setSwitch(this.sw, on);
    this.sw.halo.style.opacity = on * (0.35 + 0.15 * Math.sin(t * 6));
    this.fl.style.opacity = 0.55 * sh;
    R.put(this.k, 540, 990, 0.7 + 0.3 * eob(seg(t, 0.48, 0.8), 1.8), -3, eo(seg(t, 0.48, 0.6)));
  },
});
