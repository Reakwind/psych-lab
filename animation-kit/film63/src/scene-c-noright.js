const { seg, eo, eio, eob, lerp } = kit;
// no need to do all of these, and no "right" tool to find
const X = [860, 700, 540, 380, 220];
kit.scene('c-noright', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".6"/>' +
      X.map((x, k) => R.tool('cn-t' + k, k, 66)).join('') + '</svg>' +
      '<div class="tag tag-cool cn-a">לא צריך לעשות את כל הדברים האלה</div><div class="tag struck cn-b">הכלי "הנכון"</div></div>'));
    Object.assign(this, R.refs(kit, 'cn', ['a', 'b']));
    this.t = X.map((x, k) => kit.stage.querySelector('.cn-t' + k));
  },
  render(t) {
    // the badges line up; any one of them will do
    this.t.forEach((el, k) => { const p = seg(t, 0.1 + k * 0.08, 0.6 + k * 0.08), pick = k === 2 ? eo(seg(t, 1.8, 2.4)) : 0;
      el.setAttribute('transform', 'translate(' + X[k] + ' ' + (520 - 40 * pick + Math.sin(t * 1.5 + k) * 6) + ') scale(' + eob(p, 1.6) * (1 + 0.15 * pick) + ')'); el.style.opacity = eo(p); });
    R.place(this.a, 540, lerp(284, 270, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    R.place(this.b, 540, lerp(744, 730, eo(seg(t, 3.2, 3.7))), eo(seg(t, 3.2, 3.7)));
    this.b.style.setProperty('--s', eo(seg(t, 4.2, 4.8)));
  },
});
