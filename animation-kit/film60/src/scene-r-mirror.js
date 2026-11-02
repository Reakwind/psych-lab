const { seg, eo, eio, eob, lerp } = kit;
// years in a role: her portrait on the wall wears the role's badge; when the role changes, so does the picture
kit.scene('r-mirror', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(640 330)"><rect class="shade" x="-124" y="-146" width="260" height="300" rx="16"/><rect class="wood" x="-136" y="-158" width="272" height="316" rx="18"/>' +
      '<clipPath id="rm-clip"><rect x="-116" y="-138" width="232" height="276" rx="8"/></clipPath><rect x="-116" y="-138" width="232" height="276" rx="8" style="fill:color-mix(in srgb, var(--main) 16%, var(--ground))"/>' +
      '<g clip-path="url(#rm-clip)"><g class="rm-pic"><g transform="translate(0 390) scale(.95)">' + R.ruth('rm-p', 'stand') + '</g><g class="rm-pb" transform="translate(50 108)">' + R.role('rm-b', 1, 34) + '</g></g></g>' +
      '<path class="rm-crack" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:5;stroke-linecap:round;stroke-dasharray:0 1" d="M40 -138 L20 -80 L46 -40 L14 10 L36 60 L4 138"/></g>' +
      '<g class="rm-cal" transform="translate(400 190)">' + R.calendar('rm-c') + '</g>' +
      '<g transform="translate(330 1000)">' + R.ruth('rm', 'stand') + '</g></svg>' +
      '<div class="tag rm-years">במשך שנים</div><div class="tag tag-warm rm-cap">האופן שבו אנחנו רואים את עצמנו</div></div>'));
    Object.assign(this, R.refs(kit, 'rm', ['head', 'eyes', 'mouth', 'pic', 'pb', 'crack', 'cal', 'years', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // years go by: the calendar flips
    const c = eo(seg(t, 0.6, 1.1)), flips = Math.floor(seg(t, 1.2, 3.4) * 6);
    this.cal.setAttribute('transform', 'translate(400 190) scale(' + eob(c, 1.5) * (1 + 0.04 * (flips % 2)) + ')'); this.cal.style.opacity = c * (1 - eo(seg(t, 4.2, 4.8)));
    R.place(this.years, 400, lerp(294, 282, eo(seg(t, 1.6, 2.1))), eo(seg(t, 1.6, 2.1)) * (1 - eo(seg(t, 4.2, 4.8))));
    // a change in the role is more than a change in what she does: the badge in the picture fades, a crack runs through it
    const fade = eio(seg(t, 5.6, 7.0)), cr = eo(seg(t, 8.8, 9.8));
    this.pb.style.opacity = 1 - 0.85 * fade;
    this.pic.style.filter = 'grayscale(' + 0.6 * cr + ')';
    this.crack.style.strokeDasharray = cr + ' 1'; this.crack.style.opacity = cr > 0 ? 1 : 0;
    this.head.setAttribute('transform', 'rotate(' + (8 * eio(seg(t, 0.2, 1.0))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 9.2 ? 'M-10 30 Q2 24 14 30' : t > 6 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 9.4, 9.9))), eo(seg(t, 9.4, 9.9)));
  },
});
