const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 540, 250], AT = [3.1, 3.6, 4.1];
kit.scene('n-repeat', {
  init(kit) {
    const art = (k) => '<g transform="translate(80 -112)">' + R.moon('nr2-m' + k, 26) + '</g><g transform="translate(-30 -70) scale(.75)">' + R.shower('nr2-s' + k) + '</g>' +
      '<g transform="translate(-40 50) scale(.52)">' + R.book('nr2-b' + k) + '</g><g transform="translate(66 50) scale(.75)">' + R.bulb('nr2-u' + k) + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><rect width="1080" height="1080" style="fill:#1A2340;opacity:.1"/>' +
      X.map((x, k) => '<g class="nr2-c' + k + '"><circle class="nr2-g' + k + '" r="190" style="fill:var(--accent);opacity:0"/>' + R.frame('nr2-f' + k, 260, 320) + art(k) + '</g>').join('') + '</svg>' +
      '<div class="tag nr2-a">ולא רק מה שעושים חשוב</div><div class="tag tag-cool nr2-b">גם החזרה</div><div class="tag tag-warm nr2-c">אותן פעולות, כל ערב, נעשות מוכרות</div></div>'));
    Object.assign(this, R.refs(kit, 'nr2', ['a', 'b', 'c', 'c0', 'c1', 'c2', 'g0', 'g1', 'g2']));
  },
  render(t) {
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 2.7, 3.0))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.0, 3.5))), eo(seg(t, 3.0, 3.5)));
    // the same few steps, evening after evening...
    AT.forEach((a, k) => {
      this['c' + k].setAttribute('transform', 'translate(' + X[k] + ' 480) scale(' + eob(seg(t, a, a + 0.5), 1.5) + ')');
      this['g' + k].style.opacity = 0.18 * eo(seg(t, 7.2 + k * 0.15, 7.7 + k * 0.15));
    });
    // ...become familiar
    R.place(this.c, 540, lerp(812, 800, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)));
  },
});
