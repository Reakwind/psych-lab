const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-pacing', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="ei-g"><circle cx="540" cy="500" r="280" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:8"/>' +
      '<path class="ei-arc" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:18;stroke-linecap:round" d="M540 240 A260 260 0 1 1 539 240"/><g transform="translate(540 510) scale(1.4)">' + R.battery('ei') + '</g></g></svg>' +
      '<div class="tag tag-warm ei-cap">ניהול הקצב והאנרגיה</div><div class="tag tag-cool ei-en">Pacing</div></div>'));
    Object.assign(this, R.refs(kit, 'ei', ['g', 'arc', 'fill', 'cap', 'en']));
  },
  render(t) {
    this.g.setAttribute('transform', 'translate(540 500) scale(' + eob(seg(t, 0.2, 0.9), 1.5) + ') translate(-540 -500)');
    R.setBattery(this.fill, 0.62 + 0.04 * Math.sin(t * 1.4));
    this.arc.style.strokeDasharray = eio(seg(t, 2.2, 5.6)) * 0.7 + ' 1';
    R.place(this.cap, 540, lerp(910, 898, eo(seg(t, 2.3, 2.8))), eo(seg(t, 2.3, 2.8)));
    R.place(this.en, 540, lerp(84, 70, eo(seg(t, 4.8, 5.3))), eo(seg(t, 4.8, 5.3)));
  },
});