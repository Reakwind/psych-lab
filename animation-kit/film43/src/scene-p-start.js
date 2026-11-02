const { seg, eo, eio, eob, lerp } = kit;
const COLS = ['#5B8DB8', '#D96C6C', 'var(--accent)', '#6FAE7A', '#9A6FB0'];
const B = [[930, 490, 1, 1], [790, 190, 2, 0.9], [900, 230, 3, 0.9], [640, 260, 4, 0.85], [120, 640, 2, 0.8], [1000, 720, 4, 0.8]];
kit.scene('p-start', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.land('pz') + R.tree('pz') +
      '<g transform="translate(250 1010) scale(.95)">' + R.ruth('pz', 'stand') + '</g>' +
      B.map((b, k) => '<g transform="translate(' + b[0] + ' ' + b[1] + ') scale(' + b[3] + ')">' + R.bird('pz-b' + k, COLS[b[2]]).replace('-c" style="opacity:0"', '-c"') + '</g>').join('') +
      '<g class="pz-ring">' + R.attn('pz') + '</g><g class="pz-fl">' + R.flier('pz-f', '#5B8DB8') + '</g><g class="pz-bd">' + R.bird('pz-n', '#5B8DB8').replace('-c" style="opacity:0"', '-c"') + '</g></svg>' +
      '<div class="tag tag-cool pz-a">עם הזמן, טבע שני</div><div class="tag tag-warm pz-b">בואו נתחיל</div></div>'));
    Object.assign(this, R.refs(kit, 'pz', ['head', 'eyes', 'mouth', 'ring', 'fl', 'bd', 'a', 'b']));
    this.fw = kit.stage.querySelector('.pz-f-w');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    // a bird flies in and lands on the branch nearest Ruth; she notices it straight away
    const [px, py] = R.PERCH[0], f = eio(seg(t, 0.2, 1.8));
    this.fl.style.opacity = t < 1.8 ? 1 : 0;
    this.fl.setAttribute('transform', 'translate(' + lerp(1160, px, f) + ' ' + (lerp(120, py - 50, f) - Math.sin(Math.PI * f) * 80) + ')');
    this.fw.setAttribute('transform', 'scale(1 ' + Math.sin(t * 22) + ')');
    this.bd.style.opacity = t >= 1.8 ? 1 : 0;
    this.bd.setAttribute('transform', 'translate(' + px + ' ' + (py - 40) + ')');
    R.xf(this.ring, px, py - 40, (110 + Math.sin(t * 2.4) * 4) * eob(seg(t, 1.9, 2.4), 1.5), eo(seg(t, 1.9, 2.1)));
    this.head.setAttribute('transform', 'rotate(' + (4 + 8 * eio(seg(t, 1.4, 2.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 2.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.3, 4.8))), eo(seg(t, 4.3, 4.8)));
  },
});
