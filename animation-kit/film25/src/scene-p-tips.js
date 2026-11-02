const { seg, eo, eio, eob, lerp } = kit;
// parts 12–13: Ariel deals three cards; they flip on their words. Part 13 starts at 5.57.
const P = 5.57, X = [830, 540, 250], FLIP = [P + 1.0, P + 4.7, P + 8.3], HAB = [P + 12.8, P + 14.4, P + 15.9];
kit.scene('p-tips', {
  init(kit) {
    const front = [
      '<g transform="translate(0 -10)">' + R.tool('pt-f0', 1, 74) + '</g><g transform="translate(78 -104) scale(.42)">' + R.star('pt-s0') + '</g>',
      '<rect class="shade" x="-92" y="-62" width="190" height="130" rx="26"/><rect class="mat" x="-100" y="-74" width="190" height="130" rx="26"/><ellipse class="cushion" cx="-60" cy="-10" rx="28" ry="46"/>' +
        '<g transform="translate(70 -110) scale(.45)"><path class="leaf" d="M0 40 C-40 -10 -50 -40 -50 -80 C-10 -60 0 -20 0 40Z M0 40 C20 -20 50 -50 80 -60 C70 -10 40 20 0 40Z"/><rect class="amber" x="-36" y="36" width="72" height="50" rx="10"/></g>',
      '<g transform="translate(0 -92)">' + R.tool('pt-f2', 1, 42) + '</g><path class="ink" style="stroke-width:10" d="M0 -40 V-12 M-14 -26 H14"/>' +
        '<g class="pt-h0" transform="translate(0 60)">' + R.pill('pt-pl') + '</g><g class="pt-h1" transform="translate(0 60)">' + R.dumbbell('pt-db') + '</g><g class="pt-h2" transform="translate(0 60) scale(.8)">' + R.toothbrush('pt-tb') + '</g>'];
    let cards = '';
    for (let k = 0; k < 3; k++) cards += '<g class="pt-c' + k + '"><g class="pt-k' + k + '"><g class="pt-bk' + k + '">' + R.cardBack('pt-cb' + k, 260, 320) + '</g><g class="pt-fr' + k + '">' + R.frame('pt-fm' + k, 260, 320) + front[k] + '</g></g></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="pt-room">' + R.room({ shoes: false }) + R.seated('pt', -230) +
      '<g transform="translate(830 962) scale(1.02)">' + R.ariel('pt-a', 'stand') + '</g></g><rect class="pt-veil" width="1080" height="1080" style="fill:var(--ground);opacity:0"/>' + cards + '</svg>' +
      '<div class="tag tag-cool pt-top">עוד היום · להקל על התרגול</div><div class="tag pt-l0">תרגול אחד מוכר</div><div class="tag pt-l1">מקום קבוע ונעים בבית</div><div class="tag pt-l2">להצמיד למשהו קבוע</div>' +
      '<div class="tag tag-warm pt-m0">נטילת התרופות</div><div class="tag tag-warm pt-m1">סיום תרגילי התעמלות</div><div class="tag tag-warm pt-m2">צחצוח שיניים</div></div>'));
    Object.assign(this, R.refs(kit, 'pt', ['room', 'body', 'eyes', 'head', 'veil', 'top', 'l0', 'l1', 'l2', 'm0', 'm1', 'm2', 'h0', 'h1', 'h2']));
    this.c = [0, 1, 2].map((k) => R.refs(kit, 'pt', ['c' + k, 'k' + k, 'bk' + k, 'fr' + k]));
    this.ae = kit.stage.querySelector('.pt-a-eyes');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); R.blink(this.ae, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.head.setAttribute('transform', 'rotate(-6 0 30)');
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)));
    // three cards, face down; then the room fades back and they come forward
    const fwd = eio(seg(t, P - 0.3, P + 0.8));
    this.veil.style.opacity = 0.88 * fwd;
    this.c.forEach((c, k) => {
      const a = 2.7 + k * 0.25, p = eob(seg(t, a, a + 0.5), 1.5);
      const x = lerp(lerp(700, 380, k / 2), X[k], fwd), y = lerp(250, 400, fwd), s = lerp(0.5, 1.12, fwd) * p;
      c['c' + k].setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + lerp((k - 1) * 8, 0, fwd) + ') scale(' + s + ')');
      const f = seg(t, FLIP[k], FLIP[k] + 0.5), sx = Math.abs(Math.cos(Math.PI * f));
      c['k' + k].setAttribute('transform', 'scale(' + Math.max(0.02, sx) + ' 1)');
      c['bk' + k].style.opacity = f < 0.5 ? 1 : 0; c['fr' + k].style.opacity = f < 0.5 ? 0 : 1;
    });
    R.place(this.l0, X[0], lerp(592, 580, eo(seg(t, FLIP[0] + 0.3, FLIP[0] + 0.8))), eo(seg(t, FLIP[0] + 0.3, FLIP[0] + 0.8)));
    R.place(this.l1, X[1], lerp(672, 660, eo(seg(t, FLIP[1] + 0.3, FLIP[1] + 0.8))), eo(seg(t, FLIP[1] + 0.3, FLIP[1] + 0.8)));
    R.place(this.l2, X[2], lerp(592, 580, eo(seg(t, FLIP[2] + 0.3, FLIP[2] + 0.8))), eo(seg(t, FLIP[2] + 0.3, FLIP[2] + 0.8)));
    // something we already do: pills, exercises, brushing teeth, one after another
    HAB.forEach((a, k) => {
      const on = eo(seg(t, a, a + 0.4)) * (k < 2 ? 1 - eo(seg(t, HAB[k + 1] - 0.2, HAB[k + 1] + 0.1)) : 1);
      this['h' + k].style.opacity = on; R.place(this['m' + k], X[2], lerp(762, 750, on), on);
    });
  },
});
