const { seg, eo, eio, eob, lerp } = kit;
const WORDS = [9.0, 10.1, 11.0, 12.0];
kit.scene('more-than-movement', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g transform="translate(540 540) scale(2.4) translate(-561 -650)">' + R.room({}) + R.chair() + '<g transform="translate(500 742)">' + R.ruth('mtm-r0', 'sit') + '</g>' +
      '<rect class="metal" x="524" y="596" width="74" height="116" rx="12"/></g>' +
      '<clipPath id="mtm-open"><rect class="mtm-clip" x="470" y="434" width="140" height="226" rx="14"/></clipPath>' +
      '<g clip-path="url(#mtm-open)"><g class="mtm-world">' + R.land('mtm') +
      '<g class="mtm-walker" transform="translate(400 970)">' + R.packBehind('mtm') + '<g class="mtm-a">' + R.ruth('mtm-a', 'stand') + '</g><g class="mtm-b">' + R.ruth('mtm-b', 'step') + '</g>' + R.straps('mtm') + R.packX('mtm') + '</g>' +
      ['M330 660 L232 628', 'M470 660 L572 628', 'M330 754 L232 808', 'M470 754 L572 808'].map((d, k) => '<path class="mtm-l' + k + ' ink" style="stroke-width:3;stroke-dasharray:6 8;fill:none" d="' + d + '"/>').join('') +
      '</g></g></svg><div class="tag tag-cool mtm-move">תנועה</div>' +
      '<div class="tag mtm-t0">מצב הרוח</div><div class="tag mtm-t1">הקשב</div><div class="tag mtm-t2">המוטיבציה</div><div class="tag mtm-t3">החשיבה</div></div>'));
    Object.assign(this, R.refs(kit, 'mtm', ['clip', 'world', 'walker', 'a', 'b', 'xray', 'l0', 'l1', 'l2', 'l3', 'move', 't0', 't1', 't2', 't3', 'w0', 'w1', 'w2', 'w3']));
    this.ea = kit.stage.querySelector('.mtm-a-eyes'); this.eb = kit.stage.querySelector('.mtm-b-eyes');
  },
  render(t) {
    // the phone screen opens up into the path of the program
    const o = eio(seg(t, 0.1, 1.4));
    this.clip.setAttribute('x', lerp(470, -10, o)); this.clip.setAttribute('y', lerp(434, -10, o));
    this.clip.setAttribute('width', lerp(140, 1100, o)); this.clip.setAttribute('height', lerp(226, 1100, o));
    this.clip.setAttribute('rx', lerp(14, 0, o));
    this.world.setAttribute('transform', 'translate(540 540) scale(' + lerp(0.6, 1, o) + ') translate(-540 -540)');
    // Ruth walks toward us along the path: all anyone sees is her movement
    const walking = t < 4.6;
    const step = walking ? Math.floor(t * 2.4) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    const bob = walking ? Math.abs(Math.sin(t * Math.PI * 2.4)) * -8 : Math.sin(t * 1.2) * 2;
    const s = lerp(0.9, 1, eio(seg(t, 1.0, 4.6)));
    this.walker.setAttribute('transform', 'translate(400 ' + (970 + bob) + ') scale(' + s + ')');
    R.blink(this.ea, t, 1.1); R.blink(this.eb, t, 1.1);
    R.place(this.move, 540, lerp(110, 96, eo(seg(t, 1.6, 2.2))), eo(seg(t, 1.6, 2.2)) * (1 - eo(seg(t, 4.6, 5.0))));
    // ...but inside her backpack, four heavy stones
    const x = eo(seg(t, 5.2, 6.0));
    this.xray.style.opacity = x;
    const ws = [this.w0, this.w1, this.w2, this.w3], ls = [this.l0, this.l1, this.l2, this.l3], ts = [this.t0, this.t1, this.t2, this.t3];
    // words come in reading order (right to left, top to bottom); each lights its own stone
    const ORDER = [1, 0, 3, 2], pos = [[150, 600], [660, 600], [150, 780], [660, 780]];
    WORDS.forEach((a, j) => {
      const k = ORDER[j], p = eob(seg(t, a - 0.3, a + 0.3), 1.8);
      ws[k].setAttribute('transform', 'translate(' + [-48, 48, -48, 48][k] + ' ' + [-310, -310, -216, -216][k] + ') scale(' + lerp(0.6, 1, p) + ') translate(' + [48, -48, 48, -48][k] + ' ' + [310, 310, 216, 216][k] + ')');
      R.place(ts[j], pos[k][0], pos[k][1], eo(seg(t, a, a + 0.4)));
      ls[k].style.opacity = 0.55 * eo(seg(t, a - 0.2, a + 0.3));
    });
  },
});
