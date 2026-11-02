const { seg, eo, eio, eob, lerp } = kit;
// and sometimes it helps to talk with someone about our thoughts
kit.scene('f-talk', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fk', 0) +
      '<g class="fk-fr">' + R.friend('fk-f', 'a', 'stand') + '</g><g class="fk-vg"><g class="fk-vs">' + R.voice('fk-v') + '</g></g>' +
      '<g class="fk-br">' + R.talk('fk-tr') + '</g><g class="fk-bf">' + R.talk('fk-tf') + '</g>' +
      R.WAYS.map(([x, k], i) => '<g transform="translate(' + x + ' 150)"><g class="fk-w' + i + '">' + R.tool('fk-t' + i, k, 56) + '</g></g>').join('') + '</svg>' +
      '<div class="tag fk-l">לדבר עם מישהו</div></div>'));
    Object.assign(this, R.refs(kit, 'fk', ['body', 'head', 'eyes', 'mouth', 'fr', 'vg', 'vs', 'br', 'bf', 'w3', 'l']));
    this.fe = kit.stage.querySelector('.fk-f-eyes'); this.fh = kit.stage.querySelector('.fk-f-head'); this.fm = kit.stage.querySelector('.fk-f-mouth');
    this.v = R.refs(kit, 'fk-v', ['grey', 'warm', 'mouth']);
  },
  render(t) {
    R.blink(this.eyes, t, 0.3); R.blink(this.fe, t, 1.7);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the warm voice from before drifts off as a friend comes in
    const vo = 1 - eo(seg(t, 0, 0.6));
    this.vg.setAttribute('transform', 'translate(800 420) scale(' + 1.25 * vo + ')'); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-4 2 Q10 16 24 2');
    const fin = eio(seg(t, 0.2, 1.2));
    this.fr.setAttribute('transform', 'translate(' + lerp(1240, 840, fin) + ' 975)');
    this.w3.setAttribute('transform', 'scale(' + eob(seg(t, 1.5, 2.0), 1.8) + ')');
    R.place(this.l, 210, lerp(238, 226, eo(seg(t, 1.7, 2.1))), eo(seg(t, 1.7, 2.1)));
    // they talk in turns
    const turn = Math.floor((t - 1.4) / 0.9) % 2, on = t > 1.4;
    this.br.setAttribute('transform', 'translate(650 370) scale(' + (on && turn === 0 ? 0.9 : 0.7) + ')'); this.br.style.opacity = on ? (turn === 0 ? 1 : 0.45) : 0;
    this.bf.setAttribute('transform', 'translate(840 330) scale(-' + (on && turn === 1 ? 0.9 : 0.7) + ' ' + (on && turn === 1 ? 0.9 : 0.7) + ')'); this.bf.style.opacity = on ? (turn === 1 ? 1 : 0.45) : 0;
    this.mouth.setAttribute('d', on && turn === 0 && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-10 26 Q2 32 14 26');
    this.fm.setAttribute('d', on && turn === 1 && Math.floor(t * 5) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
    this.head.setAttribute('transform', 'rotate(' + 8 * fin + ' 0 30)');
    this.fh.setAttribute('transform', 'rotate(-6 0 30)');
  },
});
