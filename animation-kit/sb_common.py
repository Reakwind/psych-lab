# Shared sketch helpers and page builder for the session storyboards (rough frames as inline SVG, one card per narration part).
import html, re, math

INK = '#3B4450'; SLATE = '#5D6B7A'; AMBER = '#E8A33D'; SPARK = '#FFC93C'; PLUM = '#8C5C82'; SKIN = '#F2C29E'; PAPER = '#FBFAF7'; FLOOR = '#E9E4DA'

def lbl(x, y, text, fill='#FFFFFF', color=INK, size=14):
    w = len(text) * size * 0.56 + 18
    return (f'<g><rect x="{x - w / 2:.0f}" y="{y - 13}" width="{w:.0f}" height="26" rx="13" fill="{fill}" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="{size}" font-weight="600" fill="{color}" direction="rtl">{html.escape(text)}</text></g>')

def room(door_open=False, shoes=True, plant=True, clock=False, dim=False):
    o = [f'<rect x="0" y="0" width="342" height="360" fill="{"#EEF0F2" if dim else PAPER}"></rect>',
         f'<rect x="0" y="318" width="342" height="42" fill="{FLOOR}"></rect>',
         f'<line x1="0" y1="318" x2="342" y2="318" stroke="{INK}" stroke-width="2"></line>',
         # the window sits low so the top of the frame stays free for the scale
         f'<rect x="18" y="150" width="64" height="56" rx="4" fill="#DCEBF2" stroke="{INK}" stroke-width="2"></rect>',
         f'<line x1="50" y1="150" x2="50" y2="206" stroke="{INK}" stroke-width="1.5"></line><line x1="18" y1="178" x2="82" y2="178" stroke="{INK}" stroke-width="1.5"></line>']
    if door_open:
        o.append(f'<rect x="262" y="150" width="58" height="168" fill="#FFF3C4" stroke="{INK}" stroke-width="2"></rect>')
        o.append(f'<path d="M262 150 L240 162 L240 306 L262 318 Z" fill="#E7DCCB" stroke="{INK}" stroke-width="2"></path>')
    else:
        o.append(f'<rect x="262" y="150" width="58" height="168" fill="#E7DCCB" stroke="{INK}" stroke-width="2"></rect><circle cx="272" cy="238" r="3.5" fill="{INK}"></circle>')
    if shoes:
        o.append(f'<ellipse cx="236" cy="314" rx="11" ry="5" fill="{SLATE}"></ellipse><ellipse cx="250" cy="315" rx="11" ry="5" fill="{SLATE}"></ellipse>')
    if plant:
        o.append(f'<path d="M24 292 L52 292 L48 318 L28 318 Z" fill="#C9805A" stroke="{INK}" stroke-width="2"></path>'
                 f'<path d="M38 292 C30 276 22 272 18 262 M38 292 C40 274 46 266 54 258 M38 292 C38 280 34 270 36 256" fill="none" stroke="#4E8B5F" stroke-width="3" stroke-linecap="round"></path>')
    if clock:
        o.append(f'<circle cx="176" cy="62" r="20" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><line x1="176" y1="62" x2="176" y2="48" stroke="{INK}" stroke-width="2"></line><line x1="176" y1="62" x2="187" y2="66" stroke="{INK}" stroke-width="2"></line>'
                 f'<path d="M200 50 A26 26 0 0 1 204 74" fill="none" stroke="{INK}" stroke-width="1.5" stroke-dasharray="3 4"></path>')
    return ''.join(o)

def chair():
    return (f'<path d="M110 318 L110 238 Q110 222 126 222 L194 222 Q210 222 210 238 L210 318" fill="#B9A6C9" stroke="{INK}" stroke-width="2"></path>'
            f'<rect x="102" y="262" width="116" height="30" rx="10" fill="#A893BC" stroke="{INK}" stroke-width="2"></rect>')

def head(x, y, r=15, mood='calm'):
    mouth = {'calm': f'M{x - 5} {y + 6} Q{x} {y + 9} {x + 5} {y + 6}', 'flat': f'M{x - 5} {y + 7} L{x + 5} {y + 7}', 'happy': f'M{x - 6} {y + 5} Q{x} {y + 12} {x + 6} {y + 5}'}[mood]
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>'
            f'<path d="M{x - r} {y - 2} Q{x - r + 2} {y - r - 6} {x} {y - r - 2} Q{x + r - 2} {y - r - 6} {x + r} {y - 2}" fill="#C8CCD2" stroke="{INK}" stroke-width="1.5"></path>'
            f'<circle cx="{x - 5}" cy="{y}" r="4" fill="none" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x + 5}" cy="{y}" r="4" fill="none" stroke="{INK}" stroke-width="1.5"></circle>'
            f'<path d="{mouth}" fill="none" stroke="{INK}" stroke-width="1.5" stroke-linecap="round"></path>')

def ruth(x, pose='sit', mood='calm'):
    if pose == 'sit':
        return (f'<path d="M{x - 16} 276 L{x - 16} 240 Q{x - 16} 228 {x} 228 Q{x + 16} 228 {x + 16} 240 L{x + 16} 276 Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
                f'<path d="M{x - 10} 278 L{x + 26} 280 L{x + 28} 316 M{x + 6} 278 L{x + 36} 282 L{x + 38} 316" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"></path>'
                + head(x, 212, mood=mood))
    if pose == 'bend':
        return (f'<path d="M{x - 14} 300 L{x - 2} 262 Q{x + 6} 250 {x + 20} 256 L{x + 26} 270 L{x + 6} 304 Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
                f'<path d="M{x - 10} 300 L{x - 14} 316 M{x + 2} 302 L{x + 4} 316" stroke="{INK}" stroke-width="7" stroke-linecap="round"></path>'
                f'<path d="M{x + 20} 262 L{x + 36} 306" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>' + head(x + 30, 248, mood=mood))
    legs = (f'M{x - 7} 268 L{x - 9} 316 M{x + 7} 268 L{x + 9} 316' if pose != 'step' else f'M{x - 7} 268 L{x - 20} 316 M{x + 7} 268 L{x + 16} 314')
    return (f'<path d="M{x - 17} 270 L{x - 17} 214 Q{x - 17} 202 {x} 202 Q{x + 17} 202 {x + 17} 214 L{x + 17} 270 Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="{legs}" stroke="{INK}" stroke-width="7" stroke-linecap="round" fill="none"></path>' + head(x, 186, mood=mood))

def spark(x, y, state):
    if state == 'none':
        return f'<circle cx="{x}" cy="{y}" r="14" fill="none" stroke="{SLATE}" stroke-width="2" stroke-dasharray="4 4"></circle>'
    if state == 'dim':
        return f'<path d="M{x} {y - 11} L{x + 3} {y - 3} L{x + 11} {y} L{x + 3} {y + 3} L{x} {y + 11} L{x - 3} {y + 3} L{x - 11} {y} L{x - 3} {y - 3} Z" fill="#D9D4C3" stroke="{SLATE}" stroke-width="1.5"></path>'
    return (f'<circle cx="{x}" cy="{y}" r="22" fill="{SPARK}" opacity=".25"></circle>'
            f'<path d="M{x} {y - 16} L{x + 4} {y - 4} L{x + 16} {y} L{x + 4} {y + 4} L{x} {y + 16} L{x - 4} {y + 4} L{x - 16} {y} L{x - 4} {y - 4} Z" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></path>')

def scale(cx, cy, tilt, right_items=(), left_items=(), right_label='מאמץ', left_label='תמורה', left_small=False, lens=False):
    # effort on the right (where a right-to-left reader starts), reward on the left; positive tilt = effort side down
    o = [f'<line x1="{cx}" y1="{cy}" x2="{cx}" y2="{cy + 70}" stroke="{INK}" stroke-width="3"></line><path d="M{cx - 18} {cy + 74} L{cx + 18} {cy + 74}" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path>',
         f'<g transform="rotate({tilt} {cx} {cy})"><line x1="{cx - 96}" y1="{cy}" x2="{cx + 96}" y2="{cy}" stroke="{INK}" stroke-width="4" stroke-linecap="round"></line><circle cx="{cx}" cy="{cy}" r="5" fill="{INK}"></circle></g>']
    import math
    a = math.radians(tilt)
    for side, items, label, col in ((1, right_items, right_label, SLATE), (-1, left_items, left_label, AMBER)):
        px = cx + side * 96 * math.cos(a); py = cy + side * 96 * math.sin(a)
        by = py + 42
        o.append(f'<path d="M{px} {py} L{px - 30} {by} M{px} {py} L{px + 30} {by}" stroke="{INK}" stroke-width="1.5"></path>')
        o.append(f'<path d="M{px - 36} {by} Q{px} {by + 22} {px + 36} {by} Z" fill="{col}" stroke="{INK}" stroke-width="2"></path>')
        k = 0.55 if (side == -1 and left_small) else 1
        for i, it in enumerate(items):
            if side == 1:
                w = (26 if it == 'big' else 14) * k; h = (20 if it == 'big' else 10) * k
                o.append(f'<rect x="{px - 30 + i * 15}" y="{by - h - (i % 2) * 8}" width="{w}" height="{h}" rx="3" fill="#8996A5" stroke="{INK}" stroke-width="1.5"></rect>')
            else:
                r = 8 * k
                fill = {'heart': '#E66A7A', 'talk': '#FFFFFF', 'glow': SPARK, 'compass': '#7FB7A8'}.get(it, AMBER)
                o.append(f'<circle cx="{px - 18 + i * 16}" cy="{by - r - 1}" r="{r}" fill="{fill}" stroke="{INK}" stroke-width="1.5" opacity="{0.55 if left_small else 1}"></circle>')
        o.append(lbl(px, by + 30, label, fill='#FFFFFF', size=12))
    if lens:
        px = cx + 96 * math.cos(a); py = cy + 96 * math.sin(a) + 30
        o.append(f'<circle cx="{px}" cy="{py}" r="30" fill="#FFFFFF" fill-opacity=".25" stroke="{INK}" stroke-width="3"></circle><line x1="{px + 21}" y1="{py + 21}" x2="{px + 40}" y2="{py + 40}" stroke="{INK}" stroke-width="5" stroke-linecap="round"></line>')
    return ''.join(o)

def thought(x1, y1, x2, y2):
    return f'<path d="M{x1} {y1} Q{(x1 + x2) / 2 - 20} {(y1 + y2) / 2} {x2} {y2}" fill="none" stroke="{SLATE}" stroke-width="2" stroke-dasharray="3 5"></path>'

def phone(x, y, text='קפה מחר?'):
    return (f'<rect x="{x}" y="{y}" width="22" height="36" rx="4" fill="{INK}"></rect><rect x="{x + 3}" y="{y + 4}" width="16" height="26" rx="2" fill="#DCEBF2"></rect>'
            + lbl(x + 11, y - 18, text, size=12))

def bighead(content):
    return (f'<rect x="0" y="0" width="342" height="360" fill="#F3EEF6"></rect>'
            f'<path d="M70 360 L70 250 Q50 230 56 190 Q60 80 171 70 Q282 80 286 190 Q292 230 272 250 L272 360 Z" fill="{SKIN}" stroke="{INK}" stroke-width="2.5"></path>'
            f'<path d="M110 150 Q110 108 150 104 Q171 92 192 104 Q232 108 232 150 Q240 176 214 190 Q200 212 171 206 Q142 212 128 190 Q102 176 110 150 Z" fill="#F7C9D4" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M150 120 Q160 136 150 150 M192 120 Q182 136 192 152 M171 110 L171 196" fill="none" stroke="{INK}" stroke-width="1.5"></path>' + content)

def frame(inner):
    return f'<svg viewBox="0 0 342 360" width="100%" style="display: block; border-radius: 14px; background: {PAPER}" font-family="Rubik, sans-serif" role="img">{inner}</svg>'

# Session 1 sketches: Ruth's room, then the path of stepping stones (the program) and her backpack (hidden symptoms → tools).
SKY = '#E7F0EE'; HILL = '#BFD8C9'; HILL2 = '#A9CBB8'; STONE = '#D9CBB0'; PACK = '#C9805A'; NIRA = '#E8A33D'

def land(sun=False, far=True):
    o = [f'<rect width="342" height="360" fill="{SKY}"></rect>']
    if sun: o.append(f'<circle cx="250" cy="120" r="34" fill="{SPARK}" opacity=".8"></circle>')
    if far: o.append(f'<path d="M0 210 Q90 160 180 196 T342 186 V360 H0Z" fill="{HILL}"></path>')
    o.append(f'<path d="M0 250 Q120 214 220 240 T342 236 V360 H0Z" fill="{HILL2}"></path>')
    return ''.join(o)

def stones(pts, lit=()):
    return ''.join(f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r * .42:.0f}" fill="{SPARK if i in lit else STONE}" stroke="{INK}" stroke-width="1.5"></ellipse>' for i, (x, y, r) in enumerate(pts))

PATH = [(171, 340, 34), (150, 304, 28), (176, 274, 24), (158, 250, 20), (178, 230, 16), (164, 214, 13), (176, 201, 10)]

def pack(x, y, xray=False, items=(), heavy=False):
    """A backpack drawn on Ruth's back (x, y = its centre). xray: shows what is inside."""
    dy = 6 if heavy else 0
    o = f'<rect x="{x - 22}" y="{y - 26 + dy}" width="44" height="58" rx="12" fill="{PACK}" stroke="{INK}" stroke-width="2"></rect>'
    if xray:
        o = f'<rect x="{x - 22}" y="{y - 26 + dy}" width="44" height="58" rx="12" fill="#FFFFFF" fill-opacity=".55" stroke="{INK}" stroke-width="2" stroke-dasharray="4 3"></rect>'
        for k, c in enumerate(items):
            o += f'<circle cx="{x - 9 + (k % 2) * 18}" cy="{y - 10 + (k // 2) * 22 + dy}" r="8" fill="{c}" stroke="{INK}" stroke-width="1.2"></circle>'
    return o

def nira(x, pose='stand', wave=False):
    hand = f'<path d="M{x + 14} {y_(208)} l18 -24" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>' if wave else ''
    return (f'<path d="M{x - 15} 270 L{x - 15} 214 Q{x - 15} 202 {x} 202 Q{x + 15} 202 {x + 15} 214 L{x + 15} 270 Z" fill="{NIRA}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 6} 268 L{x - 8} 316 M{x + 6} 268 L{x + 8} 316" stroke="{INK}" stroke-width="7" stroke-linecap="round" fill="none"></path>'
            f'<circle cx="{x}" cy="186" r="15" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>'
            f'<path d="M{x - 17} 186 C{x - 22} 160 {x + 22} 160 {x + 17} 186 C{x + 10} 176 {x - 10} 176 {x - 17} 186Z" fill="#5A3A2E"></path>'
            f'<path d="M{x - 5} 192 Q{x} 197 {x + 5} 192" stroke="{INK}" stroke-width="1.5" fill="none"></path>' + hand)

def y_(v): return v

TOOLS = [('psychology', '#A9C4FF'), ('air', '#B3EFE4'), ('visibility', '#FFDEA3'), ('favorite', '#FFD7F3'), ('groups', '#D6EBC8')]
def tool(x, y, k, r=14):
    c = TOOLS[k][1]
    glyph = ['<path d="M-7 2 q0 -10 7 -10 q7 0 7 10" fill="none" stroke="#3B4450" stroke-width="2"></path>',
             '<path d="M-8 -2 q4 -6 8 0 t8 0 M-8 4 q4 -6 8 0 t8 0" fill="none" stroke="#3B4450" stroke-width="2"></path>',
             '<ellipse rx="8" ry="5" fill="none" stroke="#3B4450" stroke-width="2"></ellipse><circle r="2.5" fill="#3B4450"></circle>',
             '<path d="M0 7 C-10 0 -6 -9 0 -4 C6 -9 10 0 0 7Z" fill="#E66A7A"></path>',
             '<circle cx="-4" cy="-2" r="3" fill="#3B4450"></circle><circle cx="4" cy="-2" r="3" fill="#3B4450"></circle><path d="M-8 6 q4 -5 8 0 q4 -5 8 0" fill="none" stroke="#3B4450" stroke-width="2"></path>'][k]
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{c}" stroke="{INK}" stroke-width="1.5"></circle>{glyph}</g>'

GREYS = ['#9AA3AD', '#8996A5', '#7B8794', '#6C7884']

# ---- helpers added for sessions 3 onward ----
ARIEL = '#5B8DB8'; BEARD = '#6B4A3A'

def ariel(x, y0=0, wave=False):
    """Ariel, the second guide: a man in a blue shirt, short dark hair and beard."""
    y = lambda v: v + y0
    hand = f'<path d="M{x + 15} {y(214)} l18 -24" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>' if wave else ''
    return (f'<path d="M{x - 17} {y(270)} L{x - 17} {y(214)} Q{x - 17} {y(202)} {x} {y(202)} Q{x + 17} {y(202)} {x + 17} {y(214)} L{x + 17} {y(270)} Z" fill="{ARIEL}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 7} {y(268)} L{x - 8} {y(316)} M{x + 7} {y(268)} L{x + 8} {y(316)}" stroke="{INK}" stroke-width="7" stroke-linecap="round" fill="none"></path>'
            f'<circle cx="{x}" cy="{y(186)}" r="15" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>'
            f'<path d="M{x - 15} {y(182)} Q{x - 14} {y(166)} {x} {y(167)} Q{x + 14} {y(166)} {x + 15} {y(182)} Q{x + 6} {y(174)} {x - 15} {y(182)}Z" fill="{BEARD}"></path>'
            f'<path d="M{x - 13} {y(190)} Q{x} {y(208)} {x + 13} {y(190)} Q{x} {y(198)} {x - 13} {y(190)}Z" fill="{BEARD}"></path>'
            f'<circle cx="{x - 5}" cy="{y(184)}" r="1.8" fill="{INK}"></circle><circle cx="{x + 5}" cy="{y(184)}" r="1.8" fill="{INK}"></circle>' + hand)

def phone_guide(x, y, who='ariel'):
    """Ruth's phone with a guide on the screen."""
    face = (f'<circle cx="{x + 20}" cy="{y + 24}" r="9" fill="{SKIN}"></circle><path d="M{x + 11} {y + 22} Q{x + 20} {y + 12} {x + 29} {y + 22}Z" fill="{BEARD}"></path>'
            f'<path d="M{x + 12} {y + 26} Q{x + 20} {y + 38} {x + 28} {y + 26}Z" fill="{BEARD}"></path><path d="M{x + 10} {y + 52} v-12 q10 -8 20 0 v12Z" fill="{ARIEL}"></path>') if who == 'ariel' else ''
    return (f'<rect x="{x}" y="{y}" width="40" height="64" rx="7" fill="{INK}"></rect><rect x="{x + 4}" y="{y + 6}" width="32" height="50" rx="4" fill="#DCEBF2"></rect>' + face)

def ruth_lie(x, y, mood='calm'):
    """Ruth lying on her back, head to the left."""
    return (f'<rect x="{x - 10}" y="{y - 12}" width="90" height="26" rx="12" fill="{PLUM}" stroke="{INK}" stroke-width="2"></rect>'
            f'<path d="M{x + 78} {y - 2} L{x + 130} {y - 4} M{x + 78} {y + 8} L{x + 130} {y + 8}" stroke="{INK}" stroke-width="7" stroke-linecap="round"></path>'
            + head(x - 24, y - 2, mood=mood))

def mat(x, y, w=200):
    return f'<rect x="{x}" y="{y}" width="{w}" height="12" rx="6" fill="#B7D3C6" stroke="{INK}" stroke-width="1.5"></rect>'

def cushion(x, y):
    return f'<ellipse cx="{x}" cy="{y}" rx="26" ry="12" fill="#F1D9A6" stroke="{INK}" stroke-width="1.5"></ellipse>'

def tremor(x, y, n=3):
    return ''.join(f'<path d="M{x + 10 + i * 6} {y - 8 + i * 8} q4 -4 8 0 q4 4 8 0" fill="none" stroke="{SLATE}" stroke-width="1.6" stroke-linecap="round"></path>' for i in range(n))

def wave(x, y, w=180, amp=14, k=3, col=None, dash=False):
    pts = ' '.join(f'{x + i * w / 60:.1f},{y - amp * math.sin(i / 60 * k * 2 * math.pi):.1f}' for i in range(61))
    return f'<polyline points="{pts}" fill="none" stroke="{col or "#4FA3A0"}" stroke-width="4" stroke-linecap="round" {"stroke-dasharray=\"6 6\"" if dash else ""}></polyline>'

def bubble(x, y, text, w=None, fill='#FFFFFF', size=13, tail=True):
    w = w or len(text) * size * 0.55 + 26
    t = f'<path d="M{x - 6} {y + 16} l-10 16 l18 -16Z" fill="{fill}" stroke="{INK}" stroke-width="1.5"></path>' if tail else ''
    return (t + f'<rect x="{x - w / 2:.0f}" y="{y - 18}" width="{w:.0f}" height="36" rx="18" fill="{fill}" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="{size}" font-weight="600" fill="{INK}" direction="rtl">{html.escape(text)}</text>')

def strike(x, y, w):
    return f'<line x1="{x - w / 2}" y1="{y}" x2="{x + w / 2}" y2="{y}" stroke="#C0392B" stroke-width="3" stroke-linecap="round"></line>'

def cross(x, y, r=16):
    return f'<path d="M{x - r} {y - r} L{x + r} {y + r} M{x + r} {y - r} L{x - r} {y + r}" stroke="#C0392B" stroke-width="4" stroke-linecap="round"></path>'

def day_line(y, pills=(), curve=True, marks=()):
    """A day from morning (right) to evening (left), with pill times and an energy curve that rises after each pill."""
    o = [f'<line x1="300" y1="{y}" x2="42" y2="{y}" stroke="{INK}" stroke-width="2"></line>',
         f'<circle cx="310" cy="{y}" r="9" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>',
         f'<path d="M32 {y - 8} a9 9 0 1 0 0 16 a7 7 0 1 1 0 -16Z" fill="#8E9AB0" stroke="{INK}" stroke-width="1.5"></path>']
    if curve:
        o.append(f'<path d="M300 {y - 20} C270 {y - 70} 250 {y - 70} 230 {y - 30} C210 {y - 10} 200 {y - 70} 170 {y - 66} C140 {y - 62} 130 {y - 16} 110 {y - 22} C90 {y - 28} 70 {y - 60} 42 {y - 40}" fill="none" stroke="{AMBER}" stroke-width="3"></path>')
    for px in pills:
        o.append(f'<rect x="{px - 9}" y="{y + 8}" width="18" height="9" rx="4.5" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><rect x="{px - 9}" y="{y + 8}" width="9" height="9" rx="4.5" fill="#E66A7A"></rect>')
    for mx, txt in marks:
        o.append(f'<line x1="{mx}" y1="{y - 80}" x2="{mx}" y2="{y}" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="3 4"></line>' + lbl(mx, y - 92, txt, size=11))
    return ''.join(o)

def torso(belly=0.0, chest=0.0, flow=None):
    """Side-profile cutaway of Ruth's torso: lungs above a curved diaphragm; belly pushes out as it lowers."""
    bx = 236 + belly * 26
    o = [f'<rect width="342" height="360" fill="#EEF4F7"></rect>',
         f'<path d="M120 360 L120 120 Q120 70 170 64 L200 64 Q236 70 {236 + chest * 10} 120 L{bx} 230 Q{bx + 4} 300 236 360 Z" fill="{PLUM}" stroke="{INK}" stroke-width="2.5"></path>',
         f'<circle cx="182" cy="40" r="30" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>',
         f'<path d="M150 110 Q140 180 150 210 Q176 {222 + belly * 20} 206 210 Q218 170 206 110 Q178 96 150 110Z" fill="#F7C9D4" stroke="{INK}" stroke-width="2" opacity=".95" transform="translate(178 160) scale({1 + belly * 0.12 + chest * 0.06}) translate(-178 -160)"></path>',
         f'<path d="M140 {222 + belly * 22} Q178 {200 + belly * 40} 222 {222 + belly * 22}" fill="none" stroke="#C0392B" stroke-width="4" stroke-linecap="round"></path>']
    if flow == 'in':
        o.append(f'<path d="M212 30 C240 20 260 30 276 26" fill="none" stroke="#4FA3A0" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"></path><path d="M218 22 l-8 8 l10 4" fill="none" stroke="#4FA3A0" stroke-width="3"></path>')
    if flow == 'out':
        o.append(f'<path d="M212 50 C240 60 260 54 290 62" fill="none" stroke="#4FA3A0" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"></path><path d="M284 54 l8 8 l-10 4" fill="none" stroke="#4FA3A0" stroke-width="3"></path>')
    return ''.join(o)

def thought_card(x, y, text, kind='harsh', w=None):
    """A thought on a card, as in the Inner Voice game: harsh thoughts grey, balanced ones warm."""
    fill = {'harsh': '#D7DCE2', 'kind': '#FFF1CC', 'plain': '#FFFFFF'}[kind]
    w = w or len(text) * 7.4 + 30
    return (f'<rect x="{x - w / 2:.0f}" y="{y - 22}" width="{w:.0f}" height="44" rx="12" fill="{fill}" stroke="{INK}" stroke-width="2"></rect>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="13" font-weight="600" fill="{INK}" direction="rtl">{html.escape(text)}</text>')

def tc(x): return f'{int(x // 60)}:{int(x % 60):02d}'

def read_board(path):
    s = open(path, encoding='utf-8').read()
    times = eval(re.search(r'times: (\[\[.*?\]\]),', s).group(1))
    lines = re.findall(r"^\s*\{ ?t: ?'([^']*)'", s, re.M)
    assert len(times) == len(lines), (len(times), len(lines))
    return times, lines

ACT_COLORS = ['#E3E6EA', '#F3E3F0', '#E9EEF3', '#E3F4F0', '#FFF1CC', '#F6E6DA', '#E7EFE0', '#EDE7F6', '#E0F0F6']

def build(out, times, lines, S, ACTS, SHOT, title, idea, sound_off, anchors, carried, note, width=2600):
    cards = []
    for num, atitle, parts, gist in ACTS:
        a0, a1 = times[parts[0] - 1][0], times[parts[-1] - 1][1]
        row = []
        for i, p in enumerate(parts):
            what, carry, trans = SHOT[p]
            row.append(f'''        <div class="card" style="background: #FFFFFF; padding: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: inset 0 0 0 1.5px #DCD6CA">
          <div class="row" style="justify-content: space-between"><span style="font-weight: 700; font-size: 18px">Shot {num}.{i + 1}</span><span class="pill" style="height: 30px; font-size: 14px">{tc(times[p - 1][0])}–{tc(times[p - 1][1])}</span></div>
          <svg viewBox="0 0 342 360" width="100%" style="display: block; border-radius: 14px; background: {PAPER}" font-family="Rubik, sans-serif" role="img">{S[p]}</svg>
          <p dir="rtl" lang="he" style="margin: 0; font-size: 15px; line-height: 22px; color: #3F4946">{html.escape(lines[p - 1])}</p>
          <div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 6px 10px; font-size: 14px; line-height: 20px">
            <span style="font-weight: 700">On screen</span><span>{html.escape(what)}</span>
            <span style="font-weight: 700">Carries over</span><span>{html.escape(carry)}</span>
            <span style="font-weight: 700">Transition</span><span>{html.escape(trans)}</span>
          </div>
        </div>''')
        cards.append(f'''    <section style="display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 24px; align-items: start">
      <div class="stack" style="gap: 8px; position: sticky; top: 0">
        <span style="font-size: 15px; font-weight: 700; color: #7A5900">{tc(a0)}–{tc(a1)}</span>
        <h2 style="margin: 0; font-size: 26px; line-height: 32px">{html.escape(atitle)}</h2>
        <p style="margin: 0; font-size: 16px; line-height: 24px; color: #3F4946">{html.escape(gist)}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px">
{chr(10).join(row)}
      </div>
    </section>''')
    total = times[-1][1]
    bar = ''.join(f'<div style="flex: {times[p[-1] - 1][1] - times[p[0] - 1][0]:.1f} 1 0; background: {c}; color: #171D1B; padding: 10px 12px; font-size: 14px; font-weight: 600; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">{html.escape(t.split(" · ")[1])}</div>'
                  for (n, t, p, g), c in zip(ACTS, ACT_COLORS))
    anchor_rows = ''.join(f'<div class="row" style="gap: 14px; align-items: center"><svg viewBox="{vb}" width="56" height="56" aria-hidden="true" style="flex-shrink: 0">{art}</svg><span style="font-size: 16px; line-height: 24px">{txt}</span></div>' for vb, art, txt in anchors)
    carried_rows = ''.join(f'<span style="font-size: 16px; line-height: 24px">{c}</span>' for c in carried)
    page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{html.escape(title)} storyboard</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="../ui.css">
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<style>body{{margin:0}}</style>
</helmet>
<div style="width: {width}px; box-sizing: border-box; padding: 64px; display: flex; flex-direction: column; gap: 48px; background: #F4F1EA; color: #171D1B; font-family: 'Rubik', system-ui, sans-serif">

  <header style="display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr); gap: 32px; align-items: start">
    <div class="stack" style="gap: 12px">
      <span style="font-size: 16px; font-weight: 700; color: #7A5900">Storyboard v1 · for review before any animation</span>
      <h1 style="margin: 0; font-size: 52px; line-height: 58px">{html.escape(title)}</h1>
      <p style="margin: 0; font-size: 20px; line-height: 30px; color: #3F4946"><strong>Core idea.</strong> {html.escape(idea)}</p>
      <p style="margin: 0; font-size: 20px; line-height: 30px; color: #3F4946"><strong>Sound-off test.</strong> {html.escape(sound_off)}</p>
    </div>
    <div class="card" style="background: #FFFFFF; padding: 24px; display: flex; flex-direction: column; gap: 14px">
      <span style="font-size: 20px; font-weight: 700">Anchors</span>
      {anchor_rows}
    </div>
    <div class="card" style="background: #FFFFFF; padding: 24px; display: flex; flex-direction: column; gap: 14px">
      <span style="font-size: 20px; font-weight: 700">{html.escape(note)}</span>
      {carried_rows}
    </div>
  </header>

  <div class="stack" style="gap: 8px">
    <span style="font-size: 15px; font-weight: 700">{len(ACTS)} acts across {tc(total)} of narration (widths to scale)</span>
    <div style="display: flex; border-radius: 14px; overflow: hidden; box-shadow: inset 0 0 0 1.5px #DCD6CA">{bar}</div>
  </div>

{chr(10).join(cards)}

</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{width},"height":4700}}}}'>
class Component extends DCLogic {{
  renderVals() {{
    return {{}};
  }}
}}
</script>
</body>
</html>
'''
    open(out, 'w', encoding='utf-8').write(page)
    rows = sum(-(-len(p) // 5) for _, _, p, _ in ACTS)
    return rows

# ---- helpers added for sessions 5 onward ----
def battery(x, y, level, w=46, h=80, label=True):
    """An upright battery: level 0..1; red when low, amber mid, green high."""
    col = '#D9534F' if level < 0.25 else (AMBER if level < 0.6 else '#5BAA6A')
    fh = (h - 8) * level
    o = (f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2.5"></rect>'
         f'<rect x="{x - 9}" y="{y - h / 2 - 7}" width="18" height="7" rx="2" fill="{INK}"></rect>'
         f'<rect x="{x - w / 2 + 4}" y="{y + h / 2 - 4 - fh:.1f}" width="{w - 8}" height="{fh:.1f}" rx="4" fill="{col}"></rect>')
    if label: o += f'<text x="{x}" y="{y + h / 2 + 18}" text-anchor="middle" font-size="12" font-weight="700" fill="{INK}">{int(level * 100)}%</text>'
    return o

def arrow(x1, y1, x2, y2, col=None, w=3):
    col = col or INK
    import math as _m
    a = _m.atan2(y2 - y1, x2 - x1); hx, hy = x2 - 10 * _m.cos(a - 0.5), y2 - 10 * _m.sin(a - 0.5); kx, ky = x2 - 10 * _m.cos(a + 0.5), y2 - 10 * _m.sin(a + 0.5)
    return f'<path d="M{x1} {y1} L{x2} {y2} M{hx:.1f} {hy:.1f} L{x2} {y2} L{kx:.1f} {ky:.1f}" stroke="{col}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>'

def friend(x, col='#C98B6B', hair='#3B2A24'):
    """A friend of Ruth's: Nira's figure recoloured."""
    return nira(x).replace(NIRA, col).replace('#5A3A2E', hair)

def mug(x, y):
    return f'<rect x="{x - 12}" y="{y - 14}" width="24" height="26" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><path d="M{x + 12} {y - 8} q10 0 10 8 q0 8 -10 8" fill="none" stroke="{INK}" stroke-width="2"></path><path d="M{x - 4} {y - 22} q4 -6 0 -12 M{x + 4} {y - 22} q4 -6 0 -12" stroke="{SLATE}" stroke-width="1.5" fill="none"></path>'

def block(x, y, w, h, fill='#8996A5'):
    return f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{INK}" stroke-width="2"></rect>'
