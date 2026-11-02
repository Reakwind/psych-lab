const { seg, eo, eio, eob, lerp } = kit;
const PAN = [[720, 2.6, 'דואגים · מתקשרים שוב'], [360, 7.8, 'נפגעים · כועסים'], [0, 11.0, 'ממשיכים ביום']];
kit.scene('t-afternoons', {
  init(kit) {
    const panel = (k, x, inner) => '<g class="ta-p' + k + '"><clipPath id="ta-cl' + k + '"><rect x="' + (x + 8) + '" y="160" width="344" height="760" rx="30"/></clipPath><g clip-path="url(#ta-cl' + k + ')">' +
      '<rect x="' + x + '" y="160" width="360" height="520" class="wall-lo"/><rect x="' + x + '" y="680" width="360" height="260" class="floor"/>' + inner + '</g>' +
      '<rect x="' + (x + 8) + '" y="160" width="344" height="760" rx="30" style="fill:none;stroke:var(--second);stroke-width:6"/></g>';
    const fig = (id, x, extra, pose) => '<g transform="translate(' + (x + 180) + ' 900) scale(.9)">' + R.ruth(id, pose || 'stand') + extra + '</g>';
    const worry = fig('ta0', 720, '<rect x="40" y="-470" width="40" height="70" rx="8" style="fill:var(--second)"/><path class="ta-ring ink" style="stroke:var(--accent);stroke-width:8" d="M96 -470 q20 20 0 40 M116 -490 q36 40 0 80"/>');
    const hurt = fig('ta1', 360, '<path class="ink" style="stroke:#C0392B;stroke-width:8" d="M-90 -380 l14 -18 l14 18 l14 -18 M60 -380 l14 -18 l14 18 l14 -18"/>');
    const busy = '<g transform="translate(200 900) scale(-.9 .9)">' + R.ruth('ta2', 'water') + '</g><g transform="translate(40 770) scale(.6)"><path class="leaf" d="M0 0 C-30 -40 -40 -70 -40 -110 C-10 -90 0 -50 0 0Z M0 0 C20 -60 40 -80 70 -96 C60 -50 30 -20 0 0Z"/><path class="amber-dk" d="M-40 0 H40 L30 70 H-30Z"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + panel(0, 720, worry) + panel(1, 360, hurt) + panel(2, 0, busy) + '</svg>' +
      PAN.map((p, k) => '<div class="tag ta-t' + k + '">' + p[2] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'ta', ['p0', 'p1', 'p2', 'ring', 't0', 't1', 't2']));
    const m1 = kit.stage.querySelector('.ta1-mouth'), m0 = kit.stage.querySelector('.ta0-mouth'), m2 = kit.stage.querySelector('.ta2-mouth');
    m0.setAttribute('d', 'M-10 30 Q2 22 14 30'); m1.setAttribute('d', 'M-12 32 Q2 20 16 32'); m2.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    // three thoughts, three afternoons: worried and calling again, hurt and angry, simply getting on with the day
    PAN.forEach(([x, a], k) => {
      const p = eio(seg(t, a - 0.6, a + 0.2));
      this['p' + k].setAttribute('transform', 'translate(0 ' + lerp(1000, 0, p) + ')');
      R.place(this['t' + k], x + 180, lerp(122, 110, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)));
    });
    this.ring.style.opacity = Math.floor(t * 3) % 2 ? 1 : 0.2;
  },
});