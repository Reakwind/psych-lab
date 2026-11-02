const { seg, eo, eio, eob, lerp } = kit;
// from here, take a step that fits what you chose and what is possible today: maybe five minutes of the workout,
// maybe an easier level, maybe asking someone to do it with you
const P14 = 8.04, OX = [880, 560, 240], OIN = [P14 + 1.28, P14 + 5.62, P14 + 7.79];
const OT = ['להתחיל בחמש דקות של האימון', 'לבחור רמת קושי נמוכה יותר', 'לבקש ממישהו שיעשה ביחד אתכם'];
kit.scene('z-step', {
  init(kit) {
    const ob = (k) => {
      const bg = '<circle class="shade" cy="8" r="66"/><circle r="66" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>';
      const g = [
        '<circle r="46" style="fill:var(--ground);stroke:var(--second);stroke-width:6"/><path d="M0 0 L0 -40 A40 40 0 0 1 20 -34.6Z" style="fill:var(--accent)"/><path class="ink" style="stroke-width:6" d="M0 0 V-34 M0 0 L18 10"/><circle class="metal" r="6"/>',
        '<g transform="scale(.62)">' + R.dial('zp-dl' + k).replace('<g class="zp-dl' + k + '-hand">', '<g class="zp-dl' + k + '-hand" transform="rotate(-60)">') + '</g>',
        '<g transform="translate(-22 0) scale(.5)"><circle class="skin" cx="0" cy="-30" r="22"/><path class="knit" d="M-34 50 C-34 10 -20 -4 0 -4 C20 -4 34 10 34 50Z"/></g><g transform="translate(24 4) scale(.5)"><circle class="nira-skin" cx="0" cy="-30" r="22"/><path class="fra-top" d="M-34 50 C-34 10 -20 -4 0 -4 C20 -4 34 10 34 50Z"/></g>'][k];
      return '<g class="zp-o' + k + '">' + bg + g + '</g>';
    };
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(-150 0)">' + R.chair() + '</g>' + R.openDoor('zp-od') +
      '<g transform="translate(900 900)">' + R.mat('zp-mat') + '</g><g transform="translate(760 905) scale(.8)">' + R.dumbbell('zp-db') + '</g>' +
      '<g class="zp-fr"><g class="zp-fa">' + R.friend('zp-f', 'a', 'stand') + '</g><g class="zp-fb">' + R.friend('zp-f2', 'a', 'step') + '</g></g>' +
      '<g class="zp-w"><g class="zp-a">' + R.armsFree(R.ruth('zp', 'stand'), 'zp') + '</g><g class="zp-b">' + R.ruth('zp-b', 'step') + '</g></g>' +
      [0, 1, 2].map(ob).join('') + R.strip('zp') + '</svg>' + R.stripTag('zp') +
      '<div class="tag zp-t1">צעד שמתאים למה שבחרתם</div><div class="tag zp-t2">ולמה שאפשרי עבורכם היום</div>' + OT.map((o, k) => '<div class="tag tag-warm zp-ot' + k + '">' + o + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'zp', ['od', 'mat-flat', 'mat-roll', 'fr', 'fa', 'fb', 'w', 'a', 'b', 'armL', 'armR', 'eyes', 'mouth', 't1', 't2']));
    this.fe = R.refs(kit, 'zp-f', ['eyes', 'mouth']); this.S = R.stripRefs(kit, 'zp');
    this.o = [0, 1, 2].map((k) => kit.stage.querySelector('.zp-o' + k)); this.ot = [0, 1, 2].map((k) => kit.stage.querySelector('.zp-ot' + k));
  },
  render(t) {
    R.setStrip(this.S, t, 3, 1.51);
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, eio(seg(t, 1.6, 2.8)));
    // she walks over onto the mat
    const walk = eio(seg(t, 2.8, 4.2)), stepping = t > 2.8 && t < 4.2, st = stepping ? Math.floor(t * 4) % 2 : 0;
    this.a.style.opacity = st ? 0 : 1; this.b.style.opacity = st ? 1 : 0;
    this.w.setAttribute('transform', 'translate(' + lerp(330, 640, walk) + ' ' + (962 - (st ? 5 : 0)) + ') scale(.9)');
    // and starts gently: arms up and down, slowly
    R.raise(this, t > P14 + 1.6 ? 0.25 + 0.25 * Math.sin((t - P14 - 1.6) * 1.6 - Math.PI / 2) + 0.25 : 0);
    R.blink(this.eyes, t, 0.4); this.mouth.setAttribute('d', t > 4.4 ? R.BIG : R.SMILE);
    // the three options
    this.o.forEach((el, k) => { const p = eob(seg(t, OIN[k] - 0.1, OIN[k] + 0.4), 1.6); el.setAttribute('transform', 'translate(' + OX[k] + ' ' + (310 + 5 * Math.sin(t * 1.4 + k)) + ') scale(' + Math.max(0.001, p) + ')'); });
    this.ot.forEach((el, k) => { const a = OIN[k], b = OIN[k + 1] || 99; R.place(el, Math.max(250, Math.min(830, OX[k])), lerp(442, 430, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b - 0.2, b + 0.2)))); });
    // a friend comes in to do it with her
    this.od.setAttribute('opacity', eo(seg(t, OIN[2] - 0.2, OIN[2] + 0.4)));
    const fw = eio(seg(t, OIN[2] + 0.2, OIN[2] + 1.6)), fs = t > OIN[2] + 0.2 && t < OIN[2] + 1.6 ? Math.floor(t * 4) % 2 : 0;
    this.fa.style.opacity = fs ? 0 : 1; this.fb.style.opacity = fs ? 1 : 0;
    this.fr.setAttribute('transform', 'translate(' + lerp(1000, 900, fw) + ' 962) scale(-.86 .86)'); this.fr.style.opacity = eo(seg(t, OIN[2] + 0.1, OIN[2] + 0.4));
    R.blink(this.fe.eyes, t, 1.4); this.fe.mouth.setAttribute('d', R.BIG);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.t1, 540, lerp(302, 290, eo(seg(t, 3.04, 3.45))), o(3.04, P14 + 0.6));
    R.place(this.t2, 540, lerp(382, 370, eo(seg(t, 5.41, 5.8))), o(5.41, P14 + 0.6));
  },
});
