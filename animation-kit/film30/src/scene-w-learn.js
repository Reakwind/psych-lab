const { seg, eo, eio, eob, lerp } = kit;
// part 12: back inside her head — noticing starts a pulse, bringing attention back runs it along the path, which glows brighter: this is brain learning
kit.scene('w-learn', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('w7') + R.brainPath('w7') + '</svg>' +
      '<div class="tag tag-warm big w7-np">זאת נוירופלסטיות</div><div class="tag tag-cool w7-lr">זאת למידה מוחית</div><div class="tag w7-see">שמים לב</div><div class="tag tag-warm w7-ret">ומחזירים את הקשב</div></div>'));
    Object.assign(this, R.refs(kit, 'w7', ['bulb', 'nerves', 'eye', 'np', 'lr', 'see', 'ret']));
    this.b = R.brainRefs(kit, 'w7'); this.bulb.style.opacity = 0; this.nerves.style.opacity = 0.25;
  },
  render(t) {
    this.eye.setAttribute('transform', (t % 4.3) > 4.15 ? 'translate(790 512) scale(1 .15) translate(-790 -512)' : '');
    // notice: the first cell flashes; bring back: a pulse runs the path; twice
    let u = -1; [[5.6, 6.7], [7.6, 8.6]].forEach(([a, b]) => { if (t >= a && t <= b) u = eio(seg(t, a, b)); });
    R.setBrain(this.b, lerp(0.75, 1, eo(seg(t, 5.6, 8.6))), u, 1);
    const fl = Math.sin(Math.PI * seg(t, 4.1, 4.7)) + Math.sin(Math.PI * seg(t, 7.1, 7.6));
    this.b.n[0].setAttribute('r', 17 + 12 * fl);
    R.place(this.np, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eob(seg(t, 0.3, 0.8), 1.3) * (1 - eo(seg(t, 1.9, 2.1))));
    R.place(this.lr, 540, lerp(84, 70, eo(seg(t, 2.1, 2.5))), eo(seg(t, 2.1, 2.5)));
    R.place(this.see, 760, lerp(932, 920, eo(seg(t, 4.1, 4.5))), eo(seg(t, 4.1, 4.5)));
    R.place(this.ret, 340, lerp(932, 920, eo(seg(t, 5.5, 5.9))), eo(seg(t, 5.5, 5.9)));
  },
});
