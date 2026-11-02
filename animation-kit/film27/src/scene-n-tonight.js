const { seg, eo, eio, eob, lerp } = kit;
const A = [[6.1, 'להניח את הטלפון בצד'], [8.35, 'להחליש את האור'], [10.15, 'להפעיל מוזיקה שקטה'], [12.35, 'לעשות תרגול נשימה קצר']];
kit.scene('n-tonight', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.eveRoom('nt', -120, 700) +
      '<g transform="translate(150 530) scale(.8)">' + R.radio('nt-r') + '</g><g class="nt-n1">' + R.notes('nt-na') + '</g><g class="nt-n2">' + R.notes('nt-nb') + '</g>' +
      '<g class="nt-ph"><rect class="metal" x="-26" y="-44" width="52" height="88" rx="10"/><rect class="nt-scr" x="-20" y="-36" width="40" height="66" rx="4" style="fill:#BFE0F0"/></g>' +
      '<path class="nt-wave" style="fill:none;stroke:var(--main);stroke-width:9;stroke-linecap:round"/></svg>' +
      '<div class="tag tag-cool nt-top">סימן קטן אחד שהיום נגמר</div>' + A.map((a, k) => '<div class="tag tag-warm nt-t' + k + '">' + a[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'nt', ['body', 'head', 'eyes', 'mouth', 'n1', 'n2', 'ph', 'scr', 'wave', 'top', 't0', 't1', 't2', 't3']));
    this.e = R.eveRefs(kit, 'nt');
  },
  render(t) {
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)));
    A.forEach(([a], k) => R.place(this['t' + k], 540, lerp(176, 164, eo(seg(t, a, a + 0.5))), eo(seg(t, a, a + 0.5)) * (k < 3 ? 1 - eo(seg(t, A[k + 1][0] - 0.4, A[k + 1][0] - 0.1)) : 1)));
    // the phone goes from her lap to the window sill, its screen off
    const ph = eio(seg(t, 6.1, 7.1));
    this.ph.setAttribute('transform', 'translate(' + lerp(395, 250, ph) + ' ' + (lerp(690, 520, ph) - Math.sin(ph * Math.PI) * 60) + ')');
    this.scr.style.fill = ph > 0.9 ? 'var(--second)' : '#BFE0F0';
    // the light goes down
    const dim = eio(seg(t, 8.35, 9.4));
    R.setEve(this.e, 1, 1, lerp(0.6, 0.8, dim), lerp(1, 0.45, dim));
    // quiet music
    const m = eo(seg(t, 10.1, 10.5));
    [this.n1, this.n2].forEach((el, k) => { const p = ((t - 10.1) * 0.5 + k * 0.5) % 1; el.setAttribute('transform', 'translate(' + (170 + k * 44 + Math.sin(p * 6) * 12) + ' ' + (480 - p * 180) + ') scale(.7)'); el.style.opacity = m * Math.sin(p * Math.PI); });
    // a short breathing practice
    const br = eo(seg(t, 12.3, 12.8));
    this.wave.setAttribute('d', R.wavePath(230, 300, 300, 26, 1.5, -t * 1.4)); this.wave.style.opacity = br;
    if (t > 12.6) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.5);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008 + 0.012 * br, 4.2) + ')');
    this.mouth.setAttribute('d', t > 6.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
