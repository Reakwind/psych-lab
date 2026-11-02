# Sketch helpers shared by the storyboards of sessions 25–37 (sb_s25.py … sb_s37.py). Copies of the session 3a/3b/4 helpers plus new ones.
import html
from sb_common import *

TEAL = '#4FA3A0'
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
_uid = [0]

def uid():
    _uid[0] += 1
    return 'm%d' % _uid[0]

def calm_disc(x, y, r):
    """The circle of attention from session 3a."""
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".16"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="5 6"></circle>'

def perfect(x, y):
    """The 'picture-perfect' meditator from session 3a."""
    return (f'<rect x="{x - 40}" y="{y - 52}" width="80" height="96" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<circle cx="{x}" cy="{y - 24}" r="9" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x - 12} {y + 4} L{x - 10} {y - 14} L{x + 10} {y - 14} L{x + 12} {y + 4} Z" fill="#B7D3C6" stroke="{INK}" stroke-width="1.5"></path>'
            f'<path d="M{x - 26} {y + 14} Q{x} {y + 2} {x + 26} {y + 14}" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>')

def daycard(x, y, icon, day):
    """Session 3a's practice-day cards (sun / cloud / mixed)."""
    ic = {'sun': f'<circle cx="{x}" cy="{y - 6}" r="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>',
          'cloud': f'<path d="M{x - 16} {y} q0 -14 14 -14 q4 -10 16 -6 q12 2 10 14 q8 4 2 6Z" fill="#C8CFD8" stroke="{INK}" stroke-width="1.5"></path>',
          'half': f'<circle cx="{x + 4}" cy="{y - 10}" r="10" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x - 18} {y + 2} q0 -12 12 -12 q4 -8 14 -4 q10 2 8 12 q6 4 2 4Z" fill="#E4E8ED" stroke="{INK}" stroke-width="1.5"></path>'}[icon]
    return (f'<rect x="{x - 40}" y="{y - 40}" width="80" height="84" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + ic
            + f'<text x="{x}" y="{y + 32}" text-anchor="middle" font-size="12" font-weight="600" fill="{INK}" direction="rtl">{html.escape(day)}</text>')

def lesson(x, y, k):
    return f'<rect x="{x - 14}" y="{y - 10}" width="28" height="20" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5" transform="rotate({(k % 3 - 1) * 8} {x} {y})"></rect><path d="M{x - 8} {y - 2} h16 M{x - 8} {y + 4} h10" stroke="{SLATE}" stroke-width="1.5"></path>'

def pacer(x, y, r, label=None, dots=None):
    o = f'<circle cx="{x}" cy="{y}" r="{r + 16}" fill="{TEAL}" opacity=".12"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="#CFE8E4" stroke="{TEAL}" stroke-width="3"></circle>'
    if label: o += f'<text x="{x}" y="{y + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="{INK}">{html.escape(label)}</text>'
    if dots:
        n, lit = dots
        o += ''.join(f'<circle cx="{x - (n - 1) * 9 + i * 18}" cy="{y + r + 28}" r="6" fill="{TEAL if i < lit else "#FFFFFF"}" stroke="{INK}" stroke-width="1.5"></circle>' for i in range(n))
    return o

def lying(x=96, hand=False, eyes_closed=False, blanket=False):
    """Ruth on the mat from sessions 3a/3b."""
    o = mat(60, 300, 230) + cushion(84, 292) + ruth_lie(x, 290)
    if hand: o += f'<ellipse cx="{x + 46}" cy="278" rx="12" ry="7" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></ellipse>'
    if eyes_closed: o += closed_eyes(x - 24, 288)
    if blanket: o += f'<path d="M{x + 10} 272 Q{x + 70} 262 {x + 136} 276 L{x + 136} 300 L{x + 10} 300Z" fill="#C9B8DA" stroke="{INK}" stroke-width="1.5" opacity=".95"></path>'
    return o

def closed_eyes(x, y):
    """Paints over head()'s open eyes with closed ones (head centre x, y)."""
    return (f'<circle cx="{x - 5}" cy="{y}" r="4.6" fill="{SKIN}"></circle><circle cx="{x + 5}" cy="{y}" r="4.6" fill="{SKIN}"></circle>'
            f'<path d="M{x - 9} {y} q4 3 8 0 M{x + 1} {y} q4 3 8 0" fill="none" stroke="{INK}" stroke-width="1.5"></path>')

def meter(x, y, level, label='מתח'):
    return (f'<rect x="{x - 10}" y="{y - 70}" width="20" height="80" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 6}" y="{y + 6 - 72 * level}" width="12" height="{72 * level}" rx="6" fill="#E66A7A"></rect>' + lbl(x, y + 30, label, size=11))

def voice(x, y, warm=False, s=1):
    """Ruth's inner voice from session 4."""
    c = '#FFE3A8' if warm else '#E4E8ED'
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-26 6 q-4 -24 18 -26 q8 -14 24 -6 q18 0 14 18 q10 10 -2 20 h-46 q-12 0 -8 -6Z" fill="{c}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M-8 22 l-8 12 l14 -12Z" fill="{c}" stroke="{INK}" stroke-width="1.5"></path><circle cx="-6" cy="2" r="2.4" fill="{INK}"></circle><circle cx="8" cy="2" r="2.4" fill="{INK}"></circle>'
            f'<path d="M-6 10 q7 5 14 0" fill="none" stroke="{INK}" stroke-width="1.6"></path></g>')

def balloon(x, y, inner=''):
    """The drifting-thought balloon from sessions 3a and 6."""
    return (f'<path d="M{x - 30} {y + 14} C{x - 46} {y + 14} {x - 46} {y - 10} {x - 28} {y - 12} C{x - 26} {y - 34} {x + 4} {y - 38} {x + 10} {y - 20} C{x + 24} {y - 34} {x + 46} {y - 22} {x + 40} {y - 4} C{x + 52} {y + 2} {x + 48} {y + 14} {x + 36} {y + 14}Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>' + inner)

def string(x1, y1, x2, y2):
    return f'<path d="M{x1} {y1} C{(x1 + x2) / 2} {y1 - 30} {(x1 + x2) / 2} {y2 + 30} {x2} {y2}" fill="none" stroke="{SLATE}" stroke-width="1.6" stroke-dasharray="4 4"></path>'

def glow(x, y, rx, ry):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{SPARK}" opacity=".35" stroke="{AMBER}" stroke-width="2"></ellipse>'

def sound(x, y):
    return f'<path d="M{x} {y - 10} q8 10 0 20 M{x + 8} {y - 18} q14 18 0 36" fill="none" stroke="{AMBER}" stroke-width="3" stroke-linecap="round"></path>'

def roots(x, y):
    return f'<path d="M{x - 10} {y} q-8 14 -24 18 M{x - 10} {y} q0 16 -6 26 M{x + 10} {y} q8 14 24 18 M{x + 10} {y} q0 16 6 26" stroke="#8C6A4A" stroke-width="2.5" fill="none" stroke-linecap="round"></path>'

def anchor_icon(x, y, s=1):
    """The small anchor from session 3a (a steadying point)."""
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M0 14 v-30 m-14 12 q14 24 28 0" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"></path>'
            f'<circle cx="0" cy="-20" r="5" fill="none" stroke="{INK}" stroke-width="3"></circle><path d="M-8 -8 h16" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path></g>')

def hourglass(x, y):
    return f'<path d="M{x - 15} {y - 34} h30 l-26 34 l26 34 h-30 l26 -34Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path><path d="M{x - 6} {y + 26} h12 l-6 -8Z" fill="{AMBER}"></path>'

def win(state='day'):
    """Paints the room window for the time of day: day, dusk or night."""
    sky = {'day': '#DCEBF2', 'dusk': '#F3C9A8', 'night': '#3F4A63'}[state]
    o = f'<rect x="18" y="150" width="64" height="56" rx="4" fill="{sky}" stroke="{INK}" stroke-width="2"></rect>'
    if state == 'night': o += f'<path d="M58 164 a10 10 0 1 0 0 20 a7 7 0 1 1 0 -20Z" fill="#E9E4C8"></path><circle cx="30" cy="160" r="1.6" fill="#FFFFFF"></circle><circle cx="40" cy="192" r="1.4" fill="#FFFFFF"></circle>'
    if state == 'dusk': o += f'<circle cx="40" cy="198" r="10" fill="{AMBER}"></circle>'
    o += f'<line x1="50" y1="150" x2="50" y2="206" stroke="{INK}" stroke-width="1.5"></line><line x1="18" y1="178" x2="82" y2="178" stroke="{INK}" stroke-width="1.5"></line>'
    return o

def lamp(x, y=318, on=1.0):
    """A floor lamp; on = 0..1 brightness."""
    o = f'<path d="M{x} {y} v-120 M{x - 14} {y} h28" stroke="{INK}" stroke-width="3" fill="none"></path>'
    if on > 0: o += f'<path d="M{x - 16} {y - 116} L{x - 60} {y} L{x + 60} {y} L{x + 16} {y - 116}Z" fill="{SPARK}" opacity="{0.22 * on:.2f}"></path>'
    o += f'<path d="M{x - 18} {y - 118} L{x - 12} {y - 142} L{x + 12} {y - 142} L{x + 18} {y - 118}Z" fill="{"#FFE3A8" if on > 0 else "#E7DCCB"}" stroke="{INK}" stroke-width="2"></path>'
    return o

def evening(level):
    """Dims the whole frame toward night: level 0..1."""
    return f'<rect width="342" height="360" fill="#2A3350" opacity="{0.42 * level:.2f}"></rect>'

def bed(x=60, y=318, w=230):
    """Ruth's bed, headboard on the left."""
    return (f'<rect x="{x}" y="{y - 64}" width="14" height="64" rx="4" fill="#C9A27E" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x + 10}" y="{y - 34}" width="{w - 10}" height="26" rx="6" fill="#C9A27E" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x + 12}" y="{y - 46}" width="{w - 14}" height="16" rx="6" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<path d="M{x + w - 8} {y - 8} v8 M{x + 18} {y - 8} v8" stroke="{INK}" stroke-width="3"></path>')

def in_bed(x=60, y=318, w=230, mood='calm', eyes_closed=False):
    """Ruth lying in bed under the duvet, head on the pillow on the left."""
    hx, hy = x + 34, y - 56
    o = bed(x, y, w) + f'<ellipse cx="{x + 34}" cy="{y - 50}" rx="22" ry="9" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></ellipse>'
    o += head(hx, hy, mood=mood)
    o += f'<path d="M{x + 48} {y - 62} Q{x + 140} {y - 76} {x + w - 6} {y - 54} L{x + w - 6} {y - 36} L{x + 48} {y - 36}Z" fill="#9FB7D6" stroke="{INK}" stroke-width="2"></path>'
    if eyes_closed: o += closed_eyes(hx, hy)
    return o

def kettle(x, y, steam=True):
    o = (f'<path d="M{x - 26} {y} Q{x - 30} {y - 40} {x} {y - 44} Q{x + 30} {y - 40} {x + 26} {y}Z" fill="#B9C4CF" stroke="{INK}" stroke-width="2"></path>'
         f'<path d="M{x + 24} {y - 30} l18 -12" stroke="{INK}" stroke-width="4" stroke-linecap="round"></path><path d="M{x - 12} {y - 44} q12 -14 24 0" fill="none" stroke="{INK}" stroke-width="3"></path>')
    if steam: o += f'<path d="M{x + 44} {y - 50} q-8 -10 0 -20 q8 -10 0 -20 M{x + 54} {y - 46} q-6 -8 0 -16 q6 -8 0 -16" fill="none" stroke="{SLATE}" stroke-width="2" stroke-linecap="round"></path>'
    return o

def counter(y=250):
    return f'<rect x="0" y="{y}" width="342" height="16" fill="#C9A27E" stroke="{INK}" stroke-width="2"></rect><rect x="0" y="{y + 16}" width="342" height="{360 - y - 16}" fill="#E7DCCB"></rect>'

def gradecard(x, y, rows, ticks=None, w=170, stamp=None):
    """The judging mind's report card: one question per row with a tick box."""
    h = 34 + 34 * len(rows)
    o = f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
    o += f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="22" rx="8" fill="#E4E8ED" stroke="{INK}" stroke-width="2"></rect>'
    for i, r in enumerate(rows):
        ry = y - h / 2 + 44 + i * 34
        o += f'<text x="{x + w / 2 - 12}" y="{ry + 4}" text-anchor="start" font-size="10.5" font-weight="600" fill="{INK}" direction="rtl">{html.escape(r)}</text>'
        o += f'<rect x="{x - w / 2 + 10}" y="{ry - 9}" width="18" height="18" rx="3" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'
        if ticks and i < len(ticks) and ticks[i]:
            o += f'<text x="{x - w / 2 + 19}" y="{ry + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="#C0392B">{ticks[i]}</text>'
    if stamp:
        o += f'<text x="{x - w / 2 + 36}" y="{y - h / 2 + 16}" font-size="12" font-weight="700" fill="#C0392B">{stamp}</text>'
    return o

def spotlight(cx, cy, r, dark=0.55):
    """Dims the frame except a soft circle: the beam of attention."""
    i = uid()
    return (f'<defs><radialGradient id="{i}g"><stop offset="70%" stop-color="#000" stop-opacity="1"></stop><stop offset="100%" stop-color="#000" stop-opacity="0"></stop></radialGradient>'
            f'<mask id="{i}"><rect width="342" height="360" fill="#FFF"></rect><circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{i}g)"></circle></mask></defs>'
            f'<rect width="342" height="360" fill="#1F2A33" opacity="{dark}" mask="url(#{i})"></rect>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * 0.86:.0f}" fill="none" stroke="{SPARK}" stroke-width="2" opacity=".8"></circle>')

def chair_hand(x=200, y=262):
    """Ruth's left hand resting on the armrest (on the viewer's right)."""
    return f'<ellipse cx="{x}" cy="{y}" rx="13" ry="8" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></ellipse>'

def doctor(x):
    return friend(x, '#F4F6F8', '#5A6470') + f'<path d="M{x - 6} 214 q6 18 12 0" fill="none" stroke="{SLATE}" stroke-width="2"></path><circle cx="{x}" cy="232" r="4" fill="{SLATE}"></circle>'

def badge(x, y, glyph, fill='#FFFFFF', r=18):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{INK}" stroke-width="1.5"></circle><text x="{x}" y="{y + 6}" text-anchor="middle" font-size="{r}" fill="{INK}">{glyph}</text>'

def trophy(x, y):
    return (f'<path d="M{x - 18} {y - 30} h36 v14 q0 22 -18 24 q-18 -2 -18 -24Z" fill="{SPARK}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 18} {y - 24} q-14 0 -12 10 q2 8 12 8 M{x + 18} {y - 24} q14 0 12 10 q-2 8 -12 8" fill="none" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x} {y + 8} v10 M{x - 12} {y + 20} h24" stroke="{INK}" stroke-width="3"></path>')

def set_height(path, h):
    """Sets the canvas preview height of a storyboard page (build() writes a default)."""
    s = open(path, encoding='utf-8').read().replace('"height":4700', '"height":%d' % h)
    open(path, 'w', encoding='utf-8').write(s)
