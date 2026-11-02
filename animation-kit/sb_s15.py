# Session 15 storyboard: box breathing — the breathing badge from Ruth's path becomes a square of light beside her armchair;
# a dot travels its four equal sides (in, hold, out, hold) while she breathes with it, two rounds, then it softens into her own rhythm.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S15.dc.html')
assert len(times) == 24
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
TEAL = '#4FA3A0'

def meter(x, y, level, h=110):
    """The tension meter from sessions 3b and 14: red fill, level 0..1."""
    fh = (h - 10) * level
    return (f'<rect x="{x - 12}" y="{y - h}" width="24" height="{h}" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 7}" y="{y - 5 - fh:.0f}" width="14" height="{fh:.0f}" rx="7" fill="#D9534F"></rect>')

def breath_badge(x, y, r=18):
    """Session 14's breathing-and-relaxation badge (waves and a leaf)."""
    return (f'<g transform="translate({x} {y})"><circle r="{r}" fill="#B3EFE4" stroke="{INK}" stroke-width="1.5"></circle><g transform="scale({r / 18})">'
            f'<path d="M-9 -3 q4 -6 9 0 t9 0 M-9 4 q4 -6 9 0 t9 0" fill="none" stroke="#3B4450" stroke-width="2"></path></g></g>')

def box(cx, cy, s, upto=4, dot=None, labels=False, soft=0, ticks=True, word=None, ring=None):
    """The breathing box: four equal sides drawn right side first (in, up), top (hold, right→left), left (out, down), bottom (hold).
    upto = how many sides are drawn; dot = position 0..4 along the loop; soft = corner rounding; ring = pacer circle scale."""
    h = s / 2
    BR, TR, TL, BL = (cx + h, cy + h), (cx + h, cy - h), (cx - h, cy - h), (cx - h, cy + h)
    sides = [(BR, TR), (TR, TL), (TL, BL), (BL, BR)]
    cols = [TEAL, AMBER, TEAL, AMBER]
    o = [f'<rect x="{cx - h}" y="{cy - h}" width="{s}" height="{s}" rx="{soft}" fill="#FFFFFF" fill-opacity=".55" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="4 5"></rect>']
    if ring:
        o.append(f'<circle cx="{cx}" cy="{cy}" r="{h * 0.62 * ring:.1f}" fill="{TEAL}" fill-opacity=".22" stroke="{TEAL}" stroke-width="2.5"></circle>')
    for k in range(min(upto, 4)):
        (x1, y1), (x2, y2) = sides[k]
        if soft:
            continue
        o.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{cols[k]}" stroke-width="5" stroke-linecap="round"></line>')
        if ticks:
            for j in (1, 2):
                tx, ty = x1 + (x2 - x1) * j / 3, y1 + (y2 - y1) * j / 3
                o.append(f'<circle cx="{tx}" cy="{ty}" r="3.5" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>')
    if soft:
        o.append(f'<rect x="{cx - h}" y="{cy - h}" width="{s}" height="{s}" rx="{soft}" fill="none" stroke="{TEAL}" stroke-width="5"></rect>')
    if dot is not None:
        k = int(dot) % 4; f = dot - int(dot)
        (x1, y1), (x2, y2) = sides[k]
        o.append(f'<circle cx="{x1 + (x2 - x1) * f:.1f}" cy="{y1 + (y2 - y1) * f:.1f}" r="9" fill="{SPARK}" stroke="{INK}" stroke-width="2"></circle>')
    if labels:
        o.append(lbl(cx + h + 30, cy, 'שאיפה', size=10) + lbl(cx, cy - h - 16, 'עצירה', size=10) + lbl(cx - h - 30, cy, 'נשיפה', size=10) + lbl(cx, cy + h + 16, 'עצירה', size=10))
    if word:
        o.append(f'<text x="{cx}" y="{cy + 7}" text-anchor="middle" font-size="18" font-weight="700" fill="{INK}" direction="rtl">{word}</text>')
    return ''.join(o)

def seat(mood='calm', eyes_closed=False, plant=False):
    s = room(plant=plant) + chair() + ruth(110, mood=mood)
    if eyes_closed:
        s += f'<path d="M100 212 q5 3 10 0 M114 212 q5 3 10 0" stroke="{INK}" stroke-width="1.5" fill="none"></path>'
    return s

def balloons(x, y, n=3, col='#D7DCE2'):
    return ''.join(f'<ellipse cx="{x + k * 26}" cy="{y - (k % 2) * 14}" rx="14" ry="10" fill="{col}" stroke="{INK}" stroke-width="1.5"></ellipse>' for k in range(n))

def trapwave(x, y, w, amp, n):
    """the steady box rhythm as a trace: rise, flat, fall, flat"""
    q = w / (4 * n); d = f'M{x} {y}'
    for i in range(n):
        x0 = x + i * 4 * q
        d += f' L{x0 + q} {y - amp} L{x0 + 2 * q} {y - amp} L{x0 + 3 * q} {y} L{x0 + 4 * q} {y}'
    return f'<path d="{d}" fill="none" stroke="{TEAL}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"></path>'

def jag(x, y, w):
    import random
    rnd = random.Random(4); d = f'M{x} {y}'
    for i in range(1, 25):
        d += f' L{x + w * i / 24:.1f} {y - rnd.uniform(-12, 12):.1f}'
    return f'<path d="{d}" fill="none" stroke="#D9534F" stroke-width="3" stroke-linejoin="round"></path>'

def trophy(x, y):
    return (f'<path d="M{x - 18} {y - 30} H{x + 18} V{y - 12} Q{x + 18} {y + 4} {x} {y + 6} Q{x - 18} {y + 4} {x - 18} {y - 12}Z" fill="{SPARK}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 18} {y - 24} q-12 0 -10 10 q2 8 10 8 M{x + 18} {y - 24} q12 0 10 10 q-2 8 -10 8" fill="none" stroke="{INK}" stroke-width="2"></path>'
            f'<rect x="{x - 4}" y="{y + 6}" width="8" height="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></rect><rect x="{x - 14}" y="{y + 18}" width="28" height="7" rx="2" fill="{INK}"></rect>')

BX = (236, 160, 120)  # the box beside Ruth: centre and side
S = {}
S[1] = (land(sun=True) + stones(PATH) + breath_badge(150, 300, 20) + f'<circle cx="150" cy="300" r="30" fill="{SPARK}" opacity=".35"></circle>' + ruth(80, 'stand') + ariel(270)
        + lbl(171, 40, 'מפגש 15 · נשימת קופסה', fill='#E3F4F0'))
S[2] = seat() + box(*BX, upto=4, dot=2.5, labels=True) + lbl(171, 30, 'לשלוש ספירות', fill='#FFF1CC', size=12)
S[3] = seat(mood='happy') + box(*BX, labels=True) + lbl(171, 30, 'ארבעה חלקים שווים', fill='#E3F4F0') + lbl(236, 250, 'כמו ריבוע', fill='#FFF1CC', size=11)
S[4] = seat(mood='flat') + jag(170, 110, 140) + meter(312, 300, 0.7) + lbl(171, 30, 'מתח וחרדה', size=12) + lbl(236, 74, 'מהירה · שטחית · פחות סדירה', size=10)
S[5] = seat() + trapwave(170, 120, 140, 26, 2) + meter(312, 300, 0.4) + arrow(312, 160, 312, 196, '#5BAA6A') + lbl(171, 30, 'קצב קבוע', fill='#E3F4F0') + lbl(220, 160, 'להוריד הילוך', fill='#FFF1CC', size=11)
S[6] = seat() + box(*BX, dot=0.6) + balloons(60, 90, 3, '#EEF0F2') + f'<circle cx="110" cy="212" r="46" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 5"></circle>' + lbl(171, 30, 'כאן ועכשיו', fill='#FFF1CC') + lbl(236, 250, 'משהו פשוט לחזור אליו', size=10)
S[7] = seat() + ariel(300) + f'<rect x="96" y="246" width="40" height="18" rx="8" fill="#F1D9A6" stroke="{INK}" stroke-width="1.5"></rect>' + lbl(171, 30, 'שני סבבים', fill='#E3F4F0') + lbl(200, 80, 'תנוחה נוחה', size=11)
S[8] = torso(belly=0.5) + lbl(80, 40, 'בלי מאמץ', fill='#FFF1CC', size=12) + lbl(270, 300, 'הגוף נושם', size=11) + lbl(270, 330, 'אנחנו נותנים קצב', fill='#E3F4F0', size=10)
S[9] = torso(belly=0.3, flow='in') + f'<path d="M212 50 C240 60 260 54 290 62" fill="none" stroke="{AMBER}" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"></path>' + lbl(290, 100, 'דרך האף', size=10) + lbl(290, 130, 'דרך הפה', size=10) + lbl(171, 340, 'מה שנוח לכם', fill='#FFF1CC', size=11)
S[10] = seat(eyes_closed=True) + box(*BX, dot=0.0, ring=0.5) + lbl(236, 160, '3 · 2 · 1', fill='#FFFFFF', size=14) + lbl(171, 30, 'מתחילים', fill='#E3F4F0')
S[11] = seat(eyes_closed=True) + box(*BX, dot=0.66, ring=0.9, word='שאיפה') + lbl(171, 30, 'סבב 1', fill='#E3F4F0', size=12)
S[12] = seat(eyes_closed=True) + box(*BX, dot=1.66, ring=1.0, word='עצירה') + lbl(171, 30, 'סבב 1', fill='#E3F4F0', size=12)
S[13] = seat(eyes_closed=True) + box(*BX, dot=2.66, ring=0.6, word='נשיפה') + lbl(171, 30, 'סבב 1', fill='#E3F4F0', size=12)
S[14] = seat(eyes_closed=True) + box(*BX, dot=3.66, ring=0.5, word='עצירה') + lbl(171, 30, 'סבב 1', fill='#E3F4F0', size=12)
S[15] = seat(eyes_closed=True) + box(*BX, dot=0.5, ring=0.8, word='שאיפה') + lbl(171, 30, 'סבב 2', fill='#E3F4F0', size=12)
S[16] = seat(eyes_closed=True) + box(*BX, dot=1.5, ring=1.0, word='עצירה') + lbl(171, 30, 'סבב 2', fill='#E3F4F0', size=12)
S[17] = seat(eyes_closed=True) + box(*BX, dot=2.5, ring=0.7, word='נשיפה') + lbl(171, 30, 'סבב 2', fill='#E3F4F0', size=12)
S[18] = seat(eyes_closed=True) + box(*BX, dot=3.5, ring=0.5, word='עצירה') + lbl(171, 30, 'סבב 2', fill='#E3F4F0', size=12)
S[19] = seat(mood='happy') + wave(176, 160, 120, 14, 2) + lbl(171, 30, 'נשימה טבעית', fill='#FFF1CC')
S[20] = seat(mood='flat') + box(*BX, dot=1.0) + bubble(130, 110, '?', w=40) + lbl(171, 30, 'מוזר או מכני', size=12) + lbl(236, 250, 'זה בסדר · תנו לעצמכם זמן', fill='#FFF1CC', size=10)
S[21] = seat() + box(*BX, soft=30) + trophy(300, 90) + cross(300, 84, 22) + lbl(171, 30, 'אף אחד לא נותן פרס על הנשימה הכי מדויקת', fill='#FFF1CC', size=10)
S[22] = (seat(mood='happy') + f'<rect x="196" y="100" width="80" height="120" rx="8" fill="none" stroke="{TEAL}" stroke-width="5"></rect>' + lbl(290, 70, 'מקצרים את העצירות', size=9)
         + lbl(236, 250, 'חוזרים לנשימה טבעית', size=9) + lbl(236, 280, 'מתאימים לעצמכם', fill='#E3F4F0', size=9))
S[23] = seat(mood='flat') + wave(176, 160, 120, 14, 2) + f'<path d="M110 168 c6 -6 12 0 8 6 c-4 6 -14 2 -12 -6" fill="none" stroke="{SLATE}" stroke-width="2"></path>' + lbl(171, 30, 'סחרחורת או אי נוחות', size=11) + lbl(236, 250, 'תמיד אפשר לעצור', fill='#FFF1CC', size=11)
S[24] = seat(mood='happy', plant=True) + box(*BX, soft=34) + f'<circle cx="110" cy="250" r="70" fill="{AMBER}" opacity=".15"></circle>' + lbl(171, 30, 'בואו ננשום', fill='#E3F4F0')

ACTS = [
  (1, 'Act 1 · The box', [1, 2, 3], 'The breathing badge from Ruth\'s path opens into a square beside her armchair: in, hold, out, hold — four equal sides.'),
  (2, 'Act 2 · Why it helps', [4, 5, 6], 'Tense breathing is fast and ragged; a steady rhythm tells the body it can downshift, and the count gives wandering attention somewhere to come back to.'),
  (3, 'Act 3 · Getting ready', [7, 8, 9], 'Ariel invites two rounds. Comfortable, no big or forced breaths: the body breathes, we only give the rhythm; nose and mouth if it suits.'),
  (4, 'Act 4 · Two rounds together', [10, 11, 12, 13, 14, 15, 16, 17, 18], 'One unbroken shot: the dot travels the square on Ariel\'s counts while the pacer inside swells and settles and Ruth breathes with it.'),
  (5, 'Act 5 · Back to her own breath', [19], 'The square melts into a soft natural wave.'),
  (6, 'Act 6 · Make it yours', [20, 21, 22, 23, 24], 'It may feel odd at first; no prize for precision; shorten holds, rest, stop if dizzy. The square\'s corners soften into a rhythm that feels good.'),
]
SHOT = {
 1: ('Ruth and Ariel at the foot of her path; the breathing badge from session 14 glows on the first stone. Title: מפגש 15 · נשימת קופסה.', 'The path, the four calm badges from session 14, Ariel.', 'The badge lifts off and carries us into the room.'),
 2: ('Ruth in her armchair. Beside her the square draws one side per phrase: up the right (שאיפה), across the top (עצירה), down the left (נשיפה), along the bottom (עצירה); three tick marks on each side. Ruth breathes along.', 'Ruth\'s room; the breathing badge becomes the box.', 'Each side draws on its word.'),
 3: ('The four sides pulse together, equal length: ארבעה חלקים שווים · כמו ריבוע.', 'The box.', 'Sides glow in turn.'),
 4: ('Ruth tense; a ragged, quick breath line scribbles beside her; the tension meter from session 14 climbs: מהירה · שטחית · פחות סדירה.', 'Tension meter from 3b/14.', 'Box fades; line scribbles in.'),
 5: ('The ragged line straightens into a steady box rhythm (rise, flat, fall, flat); the meter eases down: קצב קבוע · להוריד הילוך.', 'Meter, breath line.', 'Line morphs.'),
 6: ('Grey thought balloons race round her head; the dot on the square keeps its simple path; her attention (session 3a\'s circle) comes back to it and the balloons drift off: כאן ועכשיו.', 'Thought balloons from 10/14; circle of attention from 3a.', 'Balloons slow and drift away.'),
 7: ('Ariel steps in beside her armchair: שני סבבים. Ruth settles back and gets comfortable.', 'Ariel from session 3.', 'Ariel slides in.'),
 8: ('Session 3b\'s torso cutaway: the lungs fill gently on their own; no big breath, no forced hold. הגוף נושם · אנחנו רק נותנים לו את הקצב.', 'Torso cutaway from 3b.', 'Zoom into her chest.'),
 9: ('Air flows in at the nose, out at the mouth; then a tag: מה שנוח לכם.', 'Same cutaway.', 'Arrows draw.'),
 10: ('Back in the room, eyes closed. The dot waits at the bottom right corner; 3 · 2 · 1 on Ariel\'s countdown.', 'Room, box, pacer from 3b.', 'Zoom back out.'),
 11: ('Round 1: the dot climbs the right side; the pacer swells; ticks light on שתיים, שלוש. Word in the box: שאיפה.', 'Box and pacer.', 'One continuous shot from here to part 18.'),
 12: ('The dot crosses the top; the pacer stays full: עצירה.', 'Same.', 'Continuous.'),
 13: ('Down the left side; the pacer shrinks: נשיפה.', 'Same.', 'Continuous.'),
 14: ('Along the bottom; the pacer stays small: עצירה.', 'Same.', 'Continuous.'),
 15: ('Round 2, words only, same path: שאיפה.', 'Same.', 'Continuous.'),
 16: ('עצירה.', 'Same.', 'Continuous.'),
 17: ('נשיפה.', 'Same.', 'Continuous.'),
 18: ('עצירה. The dot comes home to its corner.', 'Same.', 'Continuous.'),
 19: ('The square melts into a soft natural wave; Ruth opens her eyes and smiles: נשימה טבעית.', 'The breath line.', 'Box morphs into the wave.'),
 20: ('The dot ticks round stiffly; Ruth tilts her head, puzzled: מוזר או מכני. Then: זה בסדר · תנו לעצמכם זמן.', 'Box.', 'Tags drop in.'),
 21: ('A trophy for "the most precise breath" appears and is crossed out; the square\'s corners begin to soften.', 'Box.', 'Trophy pops, cross draws.'),
 22: ('The holds shorten (the square narrows), the line slips into a natural wave for a moment, then back: מקצרים את העצירות · חוזרים לנשימה טבעית · מתאימים לעצמכם.', 'Box, wave.', 'Shape morphs on each phrase.'),
 23: ('A small swirl of dizziness; the box gives way to the natural wave; a pause badge: תמיד אפשר לעצור.', 'Swirl from 3a, wave.', 'Box fades, wave returns.'),
 24: ('Ruth at ease in her room, the softened square breathing slowly around a warm glow: בואו ננשום.', 'Room, box.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + box(171, 180, 200, labels=True, dot=0.5, ring=0.7), '<strong>The breathing box.</strong> Four equal sides: in up the right, hold across the top, out down the left, hold along the bottom; a dot travels it on Ariel\'s counts.')
legend2 = ('0 0 342 360', P + breath_badge(171, 180, 90), '<strong>The breathing badge.</strong> Session 14\'s first calm tool, waiting on Ruth\'s path; today it opens.')
legend3 = ('0 0 342 360', P + meter(171, 300, 0.5, 220), '<strong>The tension meter.</strong> From sessions 3b and 14: up with ragged breath, down with a steady rhythm.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, her path with the calm badges, Ariel, session 3b\'s pacer and torso cutaway, the tension meter, thought balloons, the circle of attention.',
           '<strong>Only Ariel\'s words</strong> on screen: the four phases, the counts and the tips are his.',
           '<strong>Counts on the recording:</strong> each count and phase lands on Ariel\'s own pauses; the practice runs as one unbroken shot.']
rows = build(B + 'S15Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 15 · נשימת קופסה',
      'Box breathing: in for three, hold for three, out for three, hold for three — four equal sides of a square. A steady rhythm tells the body it can downshift and gives attention something simple to return to; it should stay easy and adjustable, never forced.',
      'The breathing badge leaves Ruth\'s path → a square draws beside her armchair, side by side → ragged breath becomes a steady rhythm, the meter drops, racing thoughts drift off → Ariel joins, the torso shows the body breathing on its own → two rounds: a dot travels the square, a pacer swells and settles → it melts into her natural breath → odd at first, no prize, shorten, stop if needed → the square softens: let\'s breathe.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S15Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5650'))
print('rows', rows)
