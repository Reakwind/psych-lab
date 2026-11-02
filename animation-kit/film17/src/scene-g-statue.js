const { seg, eo, eio, eob, lerp } = kit;
// no need to be a statue: the stiff grey Ruth is crossed out; the real Ruth, tremor and all, eases and lets her body be as it is
kit.scene('g-statue', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + '<g class="g13-sw" transform="translate(300 975) scale(.9)">' + R.statue('g13s') + '</g>' +
      '<g class="g13-xw" transform="translate(300 600)">' + R.xMark('g13-x', 150) + '</g><circle class="g13-gl" cx="700" cy="700" r="260" style="fill:var(--accent);opacity:0"/>' +
      '<g class="g13-w"><g class="g13-bd">' + R.ruth('g13', 'stand') + '<g transform="translate(76 -196)">' + R.tremor('g13tr') + '</g></g></g></svg>' +
      '<div class="tag tag-cool g13-a">לא צריך לנסות להיות כמו פסל</div><div class="tag g13-b">רעד, נוקשות, או הרבה תנועה בגוף</div><div class="tag tag-warm g13-c">אפשר להרפות יחד איתם</div>' +
      '<div class="tag tag-cool g13-d">לוותר על מאמץ</div><div class="tag tag-warm g13-e">ולתת לגוף להיות כפי שהוא</div></div>'));
    Object.assign(this, R.refs(kit, 'g13', ['sw', 'x-a', 'x-b', 'xw', 'gl', 'w', 'bd', 'eyes', 'head', 'mouth', 'a', 'b', 'c', 'd', 'e']));
    this.tr = kit.stage.querySelector('.g13tr-trem');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    R.drawOn(this['x-a'], eio(seg(t, 2.2, 2.6))); R.drawOn(this['x-b'], eio(seg(t, 2.5, 2.9)));
    const gone = eio(seg(t, 8.0, 9.0));
    this.sw.style.opacity = 1 - gone; this.xw.style.opacity = 1 - gone;
    // the real Ruth: a tremor at her hand, a gentle sway; she settles into it, then moves to the middle
    const x = lerp(720, 600, gone);
    this.w.setAttribute('transform', 'translate(' + x + ' 975)');
    const ease = eio(seg(t, 6.4, 7.6));
    this.bd.setAttribute('transform', 'rotate(' + (1.6 * Math.sin(t * 1.3) * (0.5 + ease)) + ' 0 0)');
    this.tr.style.opacity = eo(seg(t, 3.5, 4.0)); this.tr.setAttribute('transform', 'translate(' + 3 * Math.sin(t * 40) + ' 0)');
    this.gl.setAttribute('cx', x); this.gl.style.opacity = 0.16 * eo(seg(t, 10.2, 11.0)) * (0.8 + 0.2 * Math.sin(t * 1.5));
    this.head.setAttribute('transform', 'rotate(' + (4 * Math.sin(t * 0.8) * ease) + ' 0 30)');
    this.mouth.setAttribute('d', t > 6.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 2.6, 2.9))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 3.1, 3.5))), eo(seg(t, 3.1, 3.5)) * (1 - eo(seg(t, 9.8, 10.1))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 6.58, 6.9))), eo(seg(t, 6.58, 6.9)) * (1 - eo(seg(t, 9.8, 10.1))));
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 10.29, 10.6))), eo(seg(t, 10.29, 10.6)));
    R.place(this.e, 540, lerp(124, 112, eo(seg(t, 12.59, 12.9))), eo(seg(t, 12.59, 12.9)));
  },
});
