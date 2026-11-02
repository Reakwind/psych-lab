const { seg, eo, eio, eob, lerp } = kit;
// sometimes we follow instructions that help different areas let go of a little tension: a soft line sweeps along Ruth on her mat
kit.scene('g-scan', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('g5') + '<g class="g5-tg">' +
      [[330, 470], [330, 620], [560, 450], [560, 640], [800, 480], [800, 610]].map(([x, y], k) => '<path class="g5-t' + k + '" transform="translate(' + x + ' ' + y + ')" style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-20 0 l8 -12 l8 12 l8 -12 l8 12"/>').join('') +
      '</g><rect class="g5-rl" x="150" y="370" width="0" height="340" rx="44" style="fill:var(--main);opacity:.14"/><g class="g5-sw">' + R.scan('g5-sc') + '</g><rect class="g5-veil" width="1080" height="1080" style="fill:var(--ground)"/></svg>' +
      '<div class="tag tag-cool g5-a">נקשיב להנחיות</div><div class="tag tag-warm g5-b">שיעזרו לאזורים שונים לשחרר מעט מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g5', ['eyes', 'mouth', 'armR', 'sw', 'rl', 'veil', 'a', 'b']));
    this.tg = [0, 1, 2, 3, 4, 5].map((k) => kit.stage.querySelector('.g5-t' + k));
  },
  render(t) {
    this.veil.style.opacity = 1 - eo(seg(t, 0, 0.6));
    this.eyes.setAttribute('transform', t > 1.2 ? 'translate(0 -2) scale(1 .15)' : '');
    // the line sweeps from her head to her feet; behind it each area's tension marks fade and a calm tint stays
    const sx = lerp(260, 1000, eio(seg(t, 2.2, 6.0)));
    this.sw.setAttribute('transform', 'translate(' + sx + ' 540)'); this.sw.style.opacity = eo(seg(t, 2.0, 2.4)) * (1 - eo(seg(t, 5.9, 6.3)));
    this.rl.setAttribute('width', Math.max(0, sx - 150) * eo(seg(t, 2.2, 2.6)));
    this.tg.forEach((p, k) => { const x = [330, 330, 560, 560, 800, 800][k]; p.style.opacity = (0.5 + 0.5 * Math.abs(Math.sin(t * 8 + k))) * eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, (x - 260) / 740 * 3.8 + 2.2, (x - 260) / 740 * 3.8 + 2.7))); });
    R.handOn(this.armR, 0.6, 0.3 + 0.3 * Math.sin(t * 1.4));
    this.mouth.setAttribute('d', t > 4 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.0, 2.4))), eo(seg(t, 2.0, 2.4)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 3.4, 3.8))), eo(seg(t, 3.4, 3.8)));
  },
});
