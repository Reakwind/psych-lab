const { seg, eo, eio, eob, lerp } = kit;
// a difficulty is made of what happens in the body, but not only: the small icons of the café moment gather around her
kit.scene('c-more', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' +
      '<circle class="cm-in" cx="540" cy="700" r="230" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:7;stroke-dasharray:18 14"/>' +
      '<circle class="cm-out" cx="540" cy="600" r="440" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:14 16;opacity:.4"/>' +
      '<g transform="translate(540 960) scale(.95)">' + R.ruth('cm', 'stand') + '</g>' +
      [1, 2, 3, 4].map((k) => '<g class="cm-i' + k + '"><circle r="62" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/><g transform="scale(.8)">' + R.cycIcon(k) + '</g></g>').join('') +
      '<g class="cm-i0"><g transform="scale(.9)">' + R.cycIcon(0) + '</g></g></svg>' +
      '<div class="tag tag-warm cm-cap">מה שקורה בגוף, אבל לא רק</div></div>'));
    Object.assign(this, R.refs(kit, 'cm', ['head', 'eyes', 'mouth', 'in', 'out', 'cap']));
    this.i = [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.cm-i' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    const a = eo(seg(t, 3.0, 3.8)), b = eo(seg(t, 5.8, 6.6));
    this.in.style.opacity = a; this.in.setAttribute('r', 200 + 30 * a);
    this.out.style.opacity = 0.4 * b; this.out.setAttribute('r', 380 + 60 * b);
    // the shaking hand sits by her body; thought, attention, feeling, action wait outside
    this.i[0].setAttribute('transform', 'translate(660 ' + (840) + ') scale(' + eob(seg(t, 3.2, 3.8), 1.6) + ')'); this.i[0].style.opacity = a;
    const P = [[0, 0], [860, 300], [900, 640], [180, 640], [220, 300]];
    for (let k = 1; k < 5; k++) { const p = seg(t, 5.9 + (k - 1) * 0.2, 6.5 + (k - 1) * 0.2); this.i[k].setAttribute('transform', 'translate(' + P[k][0] + ' ' + P[k][1] + ') scale(' + eob(p, 1.6) + ')'); this.i[k].style.opacity = eo(p); }
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 5.6, 6.1))), eo(seg(t, 5.6, 6.1)));
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
  },
});
