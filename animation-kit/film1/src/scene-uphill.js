const { seg, eo, eio, eob, lerp } = kit;
// where Ruth stands along the path: k is a position between stones (0 = nearest)
const onPath = (k) => { const P = R.PATH, i = Math.min(P.length - 2, Math.floor(k)), f = k - i; return [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f), lerp(P[i][2], P[i + 1][2], f)]; };
kit.scene('uphill', {
  init(kit) {
    const friend = (id, x, y, s) => '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + R.nira(id, 'stand') + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="uphill-cam">' + R.land('uphill') +
      '<g class="uphill-door"><rect class="wood" x="700" y="560" width="90" height="170" rx="6"/><rect class="wood-lt" opacity=".6" x="714" y="576" width="62" height="60" rx="4"/><circle class="amber" cx="712" cy="650" r="6"/><rect class="shade" x="690" y="728" width="110" height="10" rx="5"/></g>' +
      '<g class="uphill-bench"><rect class="wood" x="300" y="600" width="130" height="16" rx="6"/><rect class="wood" x="310" y="616" width="12" height="40"/><rect class="wood" x="408" y="616" width="12" height="40"/>' +
      '<path class="light" d="M320 520 h96 v52 h-46 l-16 16 v-16 h-34Z" style="stroke:var(--second);stroke-width:4"/><circle class="metal" cx="348" cy="546" r="5"/><circle class="metal" cx="368" cy="546" r="5"/><circle class="metal" cx="388" cy="546" r="5"/></g>' +
      '<g class="uphill-friends">' + friend('uphill-f1', 610, 520, 0.2) + friend('uphill-f2', 650, 524, 0.19) + '</g>' +
      '<g class="uphill-walker"><g class="uphill-a">' + R.ruthBack('uphill-a', false) + '</g><g class="uphill-b">' + R.ruthBack('uphill-b', true) + '</g></g>' +
      '</g></svg><div class="tag tag-cool uphill-want">דברים שרוצים לעשות</div><div class="tag uphill-t0">לצאת מהבית</div><div class="tag uphill-t1">לנהל שיחה</div><div class="tag uphill-t2">לפגוש אנשים</div></div>'));
    Object.assign(this, R.refs(kit, 'uphill', ['cam', 'door', 'bench', 'friends', 'walker', 'a', 'b', 'want', 't0', 't1', 't2']));
    const f2 = kit.stage.querySelector('.uphill-f2-ruth'); if (f2) f2.querySelectorAll('.nira-top').forEach((e) => e.setAttribute('class', 'knit-lt'));
  },
  render(t) {
    // the camera tilts up the path; Ruth climbs slowly, leaning into it
    const tilt = eio(seg(t, 0, 1.6));
    this.cam.setAttribute('transform', 'translate(540 540) scale(' + lerp(1.07, 1, tilt) + ') translate(-540 ' + (-540 + lerp(-34, 0, tilt)) + ')');
    const k = lerp(0.1, 1.6, eio(seg(t, 0.4, 8.6)));
    const [x, y, r] = onPath(k), s = 0.66 * r / 130;
    const step = Math.floor(t * 1.8) % 2;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (y + Math.abs(Math.sin(t * Math.PI * 1.8)) * -5) + ') scale(' + s + ') rotate(' + (4 + 3 * eio(seg(t, 4, 7))) + ')');
    R.place(this.want, 540, lerp(110, 96, eo(seg(t, 0.4, 1.0))), eo(seg(t, 0.4, 1.0)) * (1 - eo(seg(t, 3.4, 3.8))));
    const pop = (el, a, tag, tx, ty) => { const p = eob(seg(t, a, a + 0.6), 1.6); el.setAttribute('transform', 'translate(0 ' + lerp(30, 0, p) + ')'); el.style.opacity = eo(seg(t, a, a + 0.3)); R.place(tag, tx, ty, eo(seg(t, a + 0.2, a + 0.6))); };
    pop(this.door, 3.8, this.t0, 745, 760);
    pop(this.bench, 5.1, this.t1, 365, 680);
    pop(this.friends, 6.5, this.t2, 630, 420);
  },
});
