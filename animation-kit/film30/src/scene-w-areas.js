const { seg, eo, eio, eob, lerp } = kit;
// part 14: evidence of change in brain activity in areas of attention and emotion regulation — two areas glow in the cutaway
kit.scene('w-areas', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('wb') + R.brainPath('wb') +
      '<g clip-path="url(#wb-clip)"><ellipse class="wb-a0" cx="600" cy="330" rx="110" ry="70" style="fill:#FFF6D8;fill-opacity:.55;stroke:var(--second);stroke-width:7;stroke-dasharray:16 12;opacity:0"/>' +
      '<ellipse class="wb-a1" cx="450" cy="440" rx="100" ry="58" style="fill:#FFF6D8;fill-opacity:.55;stroke:var(--second);stroke-width:7;stroke-dasharray:16 12;opacity:0"/></g></svg>' +
      '<div class="tag tag-cool wb-act">שינויים בפעילות המוחית</div><div class="tag tag-warm wb-t0">קשב</div><div class="tag tag-warm wb-t1">ויסות רגשי</div></div>'));
    Object.assign(this, R.refs(kit, 'wb', ['bulb', 'nerves', 'eye', 'a0', 'a1', 'act', 't0', 't1']));
    this.b = R.brainRefs(kit, 'wb'); this.bulb.style.opacity = 0; this.nerves.style.opacity = 0.25;
  },
  render(t) {
    this.eye.setAttribute('transform', (t % 4.3) > 4.15 ? 'translate(790 512) scale(1 .15) translate(-790 -512)' : '');
    R.setBrain(this.b, 1, -1, 1);
    [[5.3, 'a0'], [5.7, 'a1']].forEach(([a, k]) => { this[k].style.opacity = 0.85 * eo(seg(t, a, a + 0.5)) * (0.8 + 0.2 * Math.sin(t * 3)); this[k].style.strokeDashoffset = -t * 20; });
    R.place(this.act, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
    R.place(this.t0, 720, lerp(172, 160, eo(seg(t, 5.3, 5.7))), eo(seg(t, 5.3, 5.7)));
    R.place(this.t1, 330, lerp(652, 640, eo(seg(t, 5.7, 6.1))), eo(seg(t, 5.7, 6.1)));
  },
});
