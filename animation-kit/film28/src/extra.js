// Session 28 additions: the beam of attention (session 3a's circle of attention as a light Ruth can point), a close-up of her hand, a magnifier, new leaves.
Object.assign(R, {
  // dims the frame except a soft round hole; the hole carries the warm dashed rim of the circle of attention. Move it with R.setBeam.
  beam(id) {
    return '<defs><radialGradient id="' + id + '-g"><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
      '<mask id="' + id + '-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080"><rect width="1080" height="1080" fill="#fff"/><circle class="' + id + '-hole" r="1" fill="url(#' + id + '-g)"/></mask></defs>' +
      '<rect class="' + id + '-dim" width="1080" height="1080" mask="url(#' + id + '-m)" style="fill:#1A2340;opacity:0"/>' +
      '<g class="' + id + '-rim"><circle r="1" style="fill:#FFE6A8;opacity:.16"/><circle r="1" style="fill:none;stroke:var(--accent);stroke-width:.022;stroke-dasharray:.06 .05;opacity:.9"/></g>';
  },
  beamRefs(kit, id) { return { hole: kit.stage.querySelector('.' + id + '-hole'), dim: kit.stage.querySelector('.' + id + '-dim'), rim: kit.stage.querySelector('.' + id + '-rim') }; },
  // centre x, y, radius r; dim 0..1 darkens the rest; rim 0..1 shows the dashed edge
  setBeam(b, x, y, r, dim, rim) {
    b.hole.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r * 1.25 + ')');
    b.dim.style.opacity = 0.42 * dim;
    b.rim.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r + ')'); b.rim.style.opacity = rim == null ? dim : rim;
  },
  // a close-up of Ruth's left hand resting on the armrest (her sleeve comes in from the left)
  handClose(id) {
    return '<rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--accent) 14%, var(--ground))"/>' +
      '<rect class="shade" x="-40" y="700" width="1180" height="260" rx="120"/><rect class="chair" x="-40" y="660" width="1180" height="280" rx="130"/><rect class="chair-dk" opacity=".35" x="-40" y="860" width="1180" height="80" rx="40"/>' +
      '<g class="' + id + '-hand"><path class="knit" d="M-40 560 C120 540 260 548 360 570 L380 700 C260 712 120 716 -40 716Z"/><path class="knit-dk" opacity=".5" d="M-40 690 C120 690 260 690 380 684 L380 700 C260 712 120 716 -40 716Z"/>' +
      '<rect class="knit-lt" x="340" y="562" width="44" height="142" rx="18"/>' +
      '<path class="skin" d="M380 590 C440 560 560 556 640 580 L860 596 C890 600 892 632 862 636 L700 640 L880 650 C910 654 910 688 880 690 L700 690 L860 704 C888 708 886 738 858 738 L640 728 C560 740 450 730 380 700Z"/>' +
      '<path class="skin" d="M520 590 C560 520 620 500 690 506 C720 510 716 540 690 544 C640 550 610 570 600 596Z"/>' +
      '<path class="skin-dk" opacity=".5" d="M380 700 C450 730 560 740 640 728 L858 738 C870 738 878 732 882 724 L640 714 C560 724 460 714 380 690Z"/>' +
      '<path class="ink" style="stroke-width:4;opacity:.35" d="M700 640 L860 640 M700 690 L860 690"/></g>';
  },
  magnifier(id) {
    return '<g class="' + id + '"><circle r="96" style="fill:color-mix(in srgb, var(--ground) 30%, white);opacity:.35"/><circle r="96" style="fill:none;stroke:var(--second);stroke-width:14"/><path class="ink" style="stroke-width:26" d="M70 70 L170 170"/><path class="light" opacity=".7" d="M-60 -30 a66 66 0 0 1 40 -40" style="fill:none;stroke:white;stroke-width:10;stroke-linecap:round"/></g>';
  },
  leaf(id, a) {
    return '<path class="' + id + ' leaf-lt" d="M0 0 C' + (30 * a) + ' -50 ' + (80 * a) + ' -60 ' + (110 * a) + ' -50 C' + (90 * a) + ' -10 ' + (40 * a) + ' 10 0 0Z" style="stroke:var(--second);stroke-width:3"/>';
  },
  frame(id, w, h) {
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="28"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="28" style="fill:color-mix(in srgb, var(--ground) 45%, white);stroke:var(--second);stroke-width:6"/></g>';
  },
  // a simple body outline for the body-scan card (centre 0,0), scan line id-line
  bodyIcon(id) {
    return '<g class="' + id + '"><circle cx="0" cy="-110" r="34" class="skin"/><path class="knit" d="M-50 -66 Q0 -84 50 -66 L60 30 H-60Z"/><path class="skirt" d="M-56 30 H56 L50 130 H10 L0 60 L-10 130 H-50Z"/>' +
      '<rect class="' + id + '-line" x="-90" y="-4" width="180" height="8" rx="4" style="fill:var(--accent)"/></g>';
  },
});
