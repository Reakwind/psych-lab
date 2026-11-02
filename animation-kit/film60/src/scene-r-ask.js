const { seg, eo, eio, eob, lerp } = kit;
// three questions to take away
const Q = [[2.0, 'איזה תפקידים חשובים לי ומשהו בהם השתנה?'], [6.0, 'מה חשוב לי בהם?'], [8.1, 'והאם יש דרך למלא אותם בצורה קצת שונה?']];
kit.scene('r-ask', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('ra', -200) + '</svg>' +
      Q.map((q, k) => '<div class="say ra-q' + k + (k === 1 ? ' warm' : '') + '" style="width:600px">' + q[1] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'ra', ['head', 'eyes', 'mouth', 'body']));
    this.q = Q.map((q, k) => kit.stage.querySelector('.ra-q' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4.2) + ')');
    Q.forEach(([a], k) => { const p = seg(t, a, a + 0.5); R.put(this.q[k], 730, [180, 380, 560][k] + (1 - eo(p)) * 30, eob(p, 1.4), 0, eo(seg(t, a, a + 0.25))); });
    this.head.setAttribute('transform', 'rotate(' + (6 + 3 * Math.sin(t * 0.8)) + ' 0 30)');
    this.mouth.setAttribute('d', t > 9 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
