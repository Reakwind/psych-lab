const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-natural', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + '<ellipse class="pn-pglow" cx="130" cy="720" rx="120" ry="160" style="fill:var(--accent);opacity:0"/>' + R.room({ shoes: false }) +
      '<g transform="translate(200 528)">' + R.radio('pn-rad') + '</g><g class="pn-n1">' + R.notes('pn-na') + '</g><g class="pn-n2">' + R.notes('pn-nb') + '</g>' +
      '<g class="pn-bk">' + R.basket('pn-bs') + '</g><g class="pn-fig"><g transform="translate(560 900)">' + R.ruth('pn', 'stand') + '</g></g>' +
      '<path class="pn-sigh ink" style="stroke-width:6;opacity:0" d="M600 512 q30 -8 60 4 M604 528 q34 10 62 30"/>' +
      '<path class="pn-sh ink" style="stroke:var(--accent);stroke-width:7;opacity:0" d="M470 590 q20 -18 46 -16 M650 590 q-20 -18 -46 -16"/>' +
      '<g class="pn-hg">' + R.tool('pn-h', 3, 56) + '</g></svg>' +
      '<div class="tag tag-cool pn-top">דרכים טבעיות להירגע ולהתייצב</div><div class="tag pn-t0">אנחה אחרי מאמץ</div><div class="tag pn-t1">הכתפיים משתחררות</div>' +
      '<div class="tag tag-warm pn-t2">מוזיקה</div><div class="tag tag-warm pn-t3">טבע</div><div class="tag tag-warm pn-t4">פעילות שאוהבים</div></div>'));
    Object.assign(this, R.refs(kit, 'pn', ['pglow', 'n1', 'n2', 'bk', 'fig', 'head', 'eyes', 'mouth', 'sigh', 'sh', 'hg', 'top', 't0', 't1', 't2', 't3', 't4']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.9);
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 1.8, 2.3))), eo(seg(t, 1.8, 2.3)));
    // after an effort she puts the heavy basket down, and a sigh comes out by itself
    const down = eio(seg(t, 7.6, 8.5));
    this.bk.setAttribute('transform', 'translate(' + lerp(640, 760, down) + ' ' + (lerp(760, 900, down) - Math.sin(down * Math.PI) * 30) + ')');
    const s = Math.sin(Math.PI * seg(t, 8.8, 10.2));
    this.sigh.style.opacity = 0.75 * s; this.sigh.setAttribute('transform', 'translate(' + 16 * seg(t, 8.8, 10.2) + ' 0)');
    this.mouth.setAttribute('d', s > 0.2 ? 'M-6 26 Q2 36 10 26 Q2 22 -6 26' : t > 10.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    // her shoulders drop on their own
    const sh = eio(seg(t, 10.2, 11.2));
    this.fig.setAttribute('transform', 'translate(560 900) scale(1 ' + (1 - 0.018 * sh) + ') translate(-560 -900)');
    this.sh.style.opacity = 0.8 * Math.sin(Math.PI * seg(t, 10.2, 12.0));
    R.place(this.t0, 830, lerp(392, 380, eo(seg(t, 8.8, 9.3))), eo(seg(t, 8.8, 9.3)) * (1 - eo(seg(t, 12.6, 13.0))));
    R.place(this.t1, 830, lerp(482, 470, eo(seg(t, 10.2, 10.7))), eo(seg(t, 10.2, 10.7)) * (1 - eo(seg(t, 12.6, 13.0))));
    // music, nature, something we love
    const m = eo(seg(t, 13.1, 13.5));
    [this.n1, this.n2].forEach((el, k) => { const ph = ((t - 13.1) * 0.5 + k * 0.5) % 1; el.setAttribute('transform', 'translate(' + (220 + k * 40 + Math.sin(ph * 6) * 14) + ' ' + (470 - ph * 200) + ') scale(.8)'); el.style.opacity = m * Math.sin(ph * Math.PI); });
    R.place(this.t2, 260, lerp(232, 220, m), m);
    const n = eo(seg(t, 13.8, 14.3));
    this.pglow.style.opacity = n * (0.22 + 0.06 * Math.sin(t * 3));
    R.place(this.t3, 150, lerp(952, 940, n), n);
    const h = eob(seg(t, 14.4, 14.9), 1.8);
    this.hg.setAttribute('transform', 'translate(560 ' + (290 + Math.sin(t * 2) * 6) + ') scale(' + h + ')');
    R.place(this.t4, 830, lerp(262, 250, eo(seg(t, 14.5, 15.0))), eo(seg(t, 14.5, 15.0)));
  },
});
