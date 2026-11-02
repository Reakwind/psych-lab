const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-quiet', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pq') + '<g class="pq-ring">' + R.attn('pq') + '</g>' +
      '<g class="pq-dis"><g class="pq-bell" transform="translate(140 190) scale(.8)">' + R.bell('pq-bl') + '</g><g class="pq-ph" transform="translate(950 200) scale(.6) rotate(12)">' + R.phoneCall('pq-pc') + '</g>' +
      '<g class="pq-nt" transform="translate(150 900) scale(.9)">' + R.notes('pq-n') + '</g></g>' +
      '<g class="pq-ache">' + R.ache('pq-a') + '</g></svg>' +
      '<div class="tag tag-warm pq-unc">דווקא כשעוצרים, אי־נוחות מורגשת יותר</div><div class="tag pq-less">פחות הסחות דעת</div><div class="tag tag-cool pq-ok">זה לא אומר שאתם עושים משהו לא נכון</div></div>'));
    Object.assign(this, R.refs(kit, 'pq', ['eyes', 'mouth', 'ring', 'dis', 'bell', 'ph', 'nt', 'ache', 'unc', 'less', 'ok']));
    this.ring.style.opacity = 0.8; this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    // the everyday noise around her quiets down...
    const quiet = eio(seg(t, 6.4, 7.6));
    this.dis.style.opacity = 1 - quiet;
    this.bell.setAttribute('transform', 'translate(140 190) scale(.8) rotate(' + Math.sin(t * 9) * 8 * (1 - quiet) + ')');
    this.ring.setAttribute('transform', 'translate(560 540) scale(' + lerp(470, 360, quiet) + ')');
    // ...and a discomfort that was there all along becomes clearer
    const a = eo(seg(t, 2.8, 3.4)) * lerp(0.45, 1, eio(seg(t, 6.8, 11.5)));
    this.ache.style.opacity = a; this.ache.setAttribute('transform', 'translate(650 566) scale(' + (0.9 + 0.08 * Math.sin(t * 3)) + ')');
    this.mouth.setAttribute('d', a > 0.7 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.unc, 540, lerp(84, 70, eo(seg(t, 2.8, 3.3))), eo(seg(t, 2.8, 3.3)));
    R.place(this.less, 540, lerp(176, 164, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)) * (1 - eo(seg(t, 13.6, 14.0))));
    R.place(this.ok, 540, lerp(940, 928, eo(seg(t, 14.0, 14.5))), eo(seg(t, 14.0, 14.5)));
  },
});
