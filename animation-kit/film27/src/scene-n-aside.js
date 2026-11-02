const { seg, eo, eio, eob, lerp } = kit;
const I = [[7.6, 860, 250, 'עבודה'], [8.2, 640, 240, 'חדשות מלחיצות'], [9.7, 420, 250, 'משימות שדורשות ריכוז']];
kit.scene('n-aside', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.eveRoom('na', -170, 640) +
      '<g transform="translate(900 862)"><rect class="shade" x="-118" y="-150" width="236" height="156" rx="12"/><rect class="wood" x="-124" y="-160" width="248" height="160" rx="12"/><rect class="wood-lt" x="-108" y="-144" width="216" height="62" rx="8"/><rect class="wood-lt" x="-108" y="-74" width="216" height="62" rx="8"/><rect class="metal" x="-24" y="-118" width="48" height="10" rx="5"/><rect class="metal" x="-24" y="-48" width="48" height="10" rx="5"/></g>' +
      '<g class="na-i0"><g transform="scale(1.1)">' + R.laptop('na-l') + '</g></g><g class="na-i1">' + R.paper('na-p') + '</g><g class="na-i2">' + R.tasks('na-k') + '</g></svg>' +
      '<div class="tag tag-warm na-top">להניח בצד את מה שמשאיר את הראש פעיל</div>' + I.map((b, k) => '<div class="tag na-t' + k + '">' + b[3] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'na', ['body', 'head', 'eyes', 'mouth', 'top', 'i0', 'i1', 'i2', 't0', 't1', 't2']));
    this.e = R.eveRefs(kit, 'na');
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.8) + ')');
    R.setEve(this.e, 1, 0.45, 0.45, 0.7);
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)));
    // work, stressful news, demanding tasks: each one goes into the drawer
    I.forEach(([a, x, y], k) => {
      const p = eob(seg(t, a, a + 0.5), 1.5), away = eio(seg(t, 10.9 + k * 0.35, 11.9 + k * 0.35));
      this['i' + k].setAttribute('transform', 'translate(' + lerp(x, 900, away) + ' ' + (lerp(y, 780, away) - Math.sin(away * Math.PI) * 60) + ') scale(' + p * lerp(1, 0.2, away) + ')');
      this['i' + k].style.opacity = 1 - eo(seg(t, 11.7 + k * 0.35, 11.9 + k * 0.35));
      R.place(this['t' + k], x, lerp(y + 122, y + 110, eo(seg(t, a + 0.1, a + 0.6))), eo(seg(t, a + 0.1, a + 0.6)) * (1 - eo(seg(t, 10.8, 11.1))));
    });
    this.mouth.setAttribute('d', t > 12.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
