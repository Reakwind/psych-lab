# Session 17 storyboard: relaxation and guided imagery — orders don't calm the body, conditions do (Ruth waters her plant);
# her mind and body answer what she imagines as they answer the world (the tension meter, the head cutaway, a thought bubble that opens on a pleasant place),
# and with practice the way from tension to rest becomes a familiar path.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S17.dc.html')
assert len(times) == 17
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
RED = '#D9534F'

def meter(x, y, level, h=110):
    fh = (h - 10) * level
    return (f'<rect x="{x - 12}" y="{y - h}" width="24" height="{h}" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 7}" y="{y - 5 - fh:.0f}" width="14" height="{fh:.0f}" rx="7" fill="{RED}"></rect>')

def seat(mood='calm', x=130, plant=True):
    return room(plant=plant) + chair() + ruth(x, mood=mood)

def cloud_bubble(x, y, inner='', w=150, h=96, col='#FFFFFF'):
    """a thought bubble over Ruth's head with a picture inside"""
    return (f'<circle cx="{x - w / 2 + 14}" cy="{y + h / 2 + 18}" r="6" fill="{col}" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x - w / 2 + 4}" cy="{y + h / 2 + 34}" r="4" fill="{col}" stroke="{INK}" stroke-width="1.5"></circle>'
            f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="{h / 2}" fill="{col}" stroke="{INK}" stroke-width="2"></rect>{inner}')

def place_pic(x, y, s=1.0):
    """a pleasant place: Ruth's own hills with the sun"""
    return (f'<g transform="translate({x} {y}) scale({s})"><circle cx="24" cy="-16" r="12" fill="{SPARK}"></circle><path d="M-56 20 Q-20 -14 10 8 T56 4 V28 H-56Z" fill="{HILL}"></path>'
            f'<path d="M-56 28 Q0 10 56 22 V30 H-56Z" fill="{HILL2}"></path></g>')

def dark_pic(x, y, s=1.0):
    return f'<g transform="translate({x} {y}) scale({s})"><path d="M-40 10 C-56 10 -56 -12 -38 -14 C-38 -30 -12 -36 -4 -22 C6 -34 30 -28 28 -10 C44 -8 44 10 28 10Z" fill="#6C7884" stroke="{INK}" stroke-width="1.5"></path><path d="M0 12 l-8 14 h10 l-6 14" stroke="{SPARK}" stroke-width="3" fill="none"></path></g>'

def calm(x, y, k, r=18):
    cols = ['#B3EFE4', '#E3D7F3']
    g = ['<path d="M-9 -3 q4 -6 9 0 t9 0 M-9 4 q4 -6 9 0 t9 0" fill="none" stroke="#3B4450" stroke-width="2"></path>',
         '<path d="M-10 6 C-14 6 -14 -2 -9 -2 C-9 -8 -1 -10 1 -5 C4 -9 11 -6 10 -1 C14 0 13 6 9 6Z" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></path><circle cx="4" cy="-8" r="3" fill="#E8A33D"></circle>'][k]
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{cols[k]}" stroke="{INK}" stroke-width="1.5"></circle><g transform="scale({r / 18})">{g}</g></g>'

def plant(x, y, grow=1.0):
    return (f'<path d="M{x - 14} {y} L{x + 14} {y} L{x + 10} {y + 24} L{x - 10} {y + 24}Z" fill="#C9805A" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x} {y} C{x - 10} {y - 20 * grow} {x - 20} {y - 26 * grow} {x - 26} {y - 40 * grow} M{x} {y} C{x + 4} {y - 24 * grow} {x + 14} {y - 36 * grow} {x + 24} {y - 46 * grow} M{x} {y} V{y - 54 * grow}" fill="none" stroke="#4E8B5F" stroke-width="4" stroke-linecap="round"></path>')

def can(x, y):
    return f'<path d="M{x} {y} h22 l-2 20 h-18Z" fill="#9CC5D9" stroke="{INK}" stroke-width="1.5"></path><path d="M{x} {y + 4} l-14 -8" stroke="{INK}" stroke-width="2"></path><path d="M{x - 16} {y - 2} q-4 8 -2 14 M{x - 22} {y} q-4 8 -2 14" stroke="#4FA3A0" stroke-width="1.5" fill="none" stroke-dasharray="2 3"></path>'

def scanline(y):
    return f'<rect x="60" y="{y - 3}" width="120" height="6" rx="3" fill="{AMBER}"></rect><rect x="60" y="{y - 10}" width="120" height="20" rx="10" fill="{AMBER}" opacity=".2"></rect>'

def statue(x, y):
    return (f'<rect x="{x - 26}" y="{y + 40}" width="52" height="14" fill="#C8CCD2" stroke="{INK}" stroke-width="1.5"></rect><path d="M{x - 16} {y + 40} V{y} Q{x - 16} {y - 10} {x} {y - 10} Q{x + 16} {y - 10} {x + 16} {y} V{y + 40}Z" fill="#DCDFE3" stroke="{INK}" stroke-width="1.5"></path>'
            f'<circle cx="{x}" cy="{y - 24}" r="12" fill="#DCDFE3" stroke="{INK}" stroke-width="1.5"></circle>')

def lie(x=60, y=280, blanket=False):
    s = mat(x - 20, y + 10, 230) + cushion(x - 6, y + 4) + ruth_lie(x + 20, y)
    if blanket:
        s += f'<rect x="{x + 90}" y="{y - 14}" width="96" height="30" rx="10" fill="#F1D9A6" stroke="{INK}" stroke-width="1.5"></rect>'
    return s

S = {}
S[1] = seat(mood='flat') + bubble(210, 110, 'אפשר ללמוד להירגע?', w=150) + lbl(171, 30, 'מפגש 17 · הרפיה ודמיון מודרך', fill='#E3F4F0', size=12)
S[2] = (seat(mood='flat') + meter(310, 300, 0.75) + thought_card(210, 70, 'עכשיו תפסיק להיות דרוך', w=170) + thought_card(200, 112, 'עכשיו תרפה לגמרי את השרירים', w=200) + thought_card(220, 154, 'עכשיו תירדם', w=100)
        + f'<path d="M104 230 l6 -6 l6 6 M144 230 l6 -6 l6 6" stroke="{RED}" stroke-width="2" fill="none"></path>')
S[3] = room(plant=False) + ruth(140, 'stand', 'happy') + plant(60, 290, 1.3) + can(110, 250) + meter(310, 300, 0.5) + lbl(171, 30, 'הגוף יודע איך להירגע', fill='#E3F4F0', size=12) + lbl(171, 70, 'לתת לו את התנאים', fill='#FFF1CC', size=11)
S[4] = (P + lbl(171, 40, 'מחקרים מראים', fill='#E3F4F0') + calm(130, 100, 0, 26) + calm(212, 100, 1, 26) + lbl(270, 190, 'פחות מתח וחרדה', size=10) + lbl(120, 190, 'נוחות ומנוחה', size=10)
        + lbl(270, 260, 'שינה', size=10) + lbl(120, 260, 'התמודדות עם כאב', size=10) + meter(270, 240, 0.25, 40))
S[5] = lie() + scanline(260) + lbl(171, 40, 'אזורים שונים משחררים מתח', fill='#E3F4F0', size=11)
S[6] = seat() + cloud_bubble(230, 90, place_pic(230, 90, 1.0)) + lbl(80, 30, 'מקום נעים', fill='#FFF1CC', size=12) + lbl(230, 170, 'התחושות שקשורות אליו', size=10)
S[7] = (bighead(f'<circle cx="150" cy="140" r="10" fill="{AMBER}" opacity=".7"></circle><circle cx="192" cy="160" r="10" fill="{AMBER}" opacity=".7"></circle>') + lbl(70, 300, 'חוויה ממשית', size=11) + lbl(270, 300, 'דמיון', fill='#FFF1CC', size=11)
         + lbl(171, 340, 'אותם תהליכים במוח', fill='#E3F4F0', size=11))
S[8] = P + cloud_bubble(80, 110, place_pic(80, 110, 0.8), w=110, h=70) + head(200, 100, 18) + ruth(260, 'stand') + arrow(140, 110, 176, 104) + arrow(210, 130, 250, 200) + lbl(171, 300, 'המוח והגוף מגיבים גם לדמיון', fill='#E3F4F0', size=11)
S[9] = (seat(mood='flat') + cloud_bubble(220, 80, dark_pic(220, 80), w=120, h=80, col='#D7DCE2') + meter(310, 300, 0.8) + f'<path d="M60 180 h10 l6 -14 l8 26 l6 -12 h10" stroke="{RED}" stroke-width="2.5" fill="none"></path>'
         + lbl(90, 140, 'הדופק משתנה', size=9) + lbl(250, 160, 'השרירים מתכווצים', size=9) + lbl(171, 340, 'הגוף נעשה דרוך', size=10))
S[10] = seat(mood='happy') + cloud_bubble(220, 80, place_pic(220, 80, 0.9), w=120, h=80) + meter(310, 300, 0.3) + arrow(310, 150, 310, 180, '#5BAA6A') + lbl(171, 340, 'לכיוון השני', fill='#FFF1CC', size=11)
S[11] = (land() + stones(PATH, lit=(0, 1, 2, 3)) + ruth(100, 'stand', 'happy') + meter(40, 200, 0.6, 60) + f'<circle cx="300" cy="80" r="16" fill="#B3EFE4" stroke="{INK}" stroke-width="1.5"></circle>'
         + lbl(171, 40, 'מדריכות להרפיה', fill='#E3F4F0', size=11) + lbl(250, 120, 'דרך מוכרת יותר', fill='#FFF1CC', size=10))
S[12] = (P + f'<g transform="translate(0 -60) scale(.5)">{chair()}{ruth(160)}</g>' + f'<g transform="translate(171 -60) scale(.5)">{chair()}{ruth(160, "bend")}</g>' + lie(110, 300, True)
         + lbl(260, 40, 'יושבים עם תמיכה', size=9) + lbl(90, 40, 'נשענים לאחור', size=9) + lbl(171, 230, 'או שוכבים', size=9) + lbl(171, 340, 'עיניים עצומות או פקוחות', fill='#FFF1CC', size=10))
S[13] = P + statue(80, 180) + cross(80, 160, 34) + ruth(230, 'stand', 'happy') + tremor(244, 250) + lbl(80, 260, 'לא כמו פסל', size=11) + lbl(171, 40, 'לתת לגוף להיות כפי שהוא', fill='#FFF1CC', size=11)
S[14] = seat() + cloud_bubble(230, 90, f'<g opacity=".45">{place_pic(230, 90, 1.0)}</g>') + lbl(171, 30, 'לא צריך תמונה ברורה', size=11) + lbl(230, 170, 'הדמיון מגיב בדרכו', fill='#FFF1CC', size=10)
S[15] = (seat() + cloud_bubble(220, 74, '', w=170, h=70) + place_pic(176, 74, 0.4) + f'<path d="M204 70 q6 -8 12 0 t12 0" stroke="#4FA3A0" stroke-width="2.5" fill="none"></path><rect x="236" y="62" width="18" height="22" rx="2" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'
         + f'<path d="M260 66 h14 M260 74 h10" stroke="{INK}" stroke-width="2"></path>' + lbl(171, 150, 'תמונה · תחושה · זיכרון · רק המילים', size=10))
S[16] = seat() + thought(140, 190, 280, 80) + f'<ellipse cx="290" cy="74" rx="20" ry="14" fill="#D7DCE2" stroke="{INK}" stroke-width="1.5"></ellipse>' + wave(60, 120, 120, 10, 2) + phone_guide(196, 230) + lbl(171, 30, 'חלק מהתרגול', fill='#E3F4F0', size=12) + lbl(110, 160, 'חוזרים לנשימה', size=10)
S[17] = room(plant=True) + lie(110, 290, True) + f'<circle cx="150" cy="290" r="90" fill="{AMBER}" opacity=".14"></circle>' + meter(310, 200, 0.12, 70) + lbl(171, 40, 'עצירה קטנה כדי להיות טובים לעצמנו', fill='#FFF1CC', size=10) + lbl(171, 80, 'בקצב שלהם', size=10)

ACTS = [
  (1, 'Act 1 · Can you learn to relax?', [1, 2], 'A question, then the answer we know: commanding the body to calm down doesn\'t work. The orders pile up and the meter stays high.'),
  (2, 'Act 2 · Give it the conditions', [3, 4], 'The body knows how to relax; we can give it the conditions, as Ruth waters her plant. Relaxation and guided imagery: what research shows they can help with.'),
  (3, 'Act 3 · Two kinds of practice', [5, 6], 'Instructions that help areas release tension (a scan down her body); imagination: a pleasant place and its sensations.'),
  (4, 'Act 4 · Why imagination works', [7, 8, 9, 10], 'Inside the head, imagined and real experiences use some of the same processes. Brain and body answer what we imagine: a scary thought tenses her, a calm one eases her.'),
  (5, 'Act 5 · A familiar way', [11], 'Practice makes the way from tension to relaxation familiar: her path, walked again and again.'),
  (6, 'Act 6 · How we\'ll practise', [12, 13, 14, 15, 16], 'Get comfortable any way; no need to be a statue; no need for a clear image; whatever comes is fine; drifting off and coming back is part of it.'),
  (7, 'Act 7 · A small stop', [17], 'A pause to be kind to ourselves; body and thoughts slow down at their own pace.'),
]
SHOT = {
 1: ('Ruth in her armchair, puzzled; a bubble: אפשר ללמוד להירגע? Title: מפגש 17 · הרפיה ודמיון מודרך.', 'Ruth\'s room; the tension meter from session 14.', 'Bubble pops.'),
 2: ('Order cards bark at her one by one: עכשיו תפסיק להיות דרוך · עכשיו תרפה לגמרי את השרירים · עכשיו תירדם. Her shoulders stay tight and the meter doesn\'t move.', 'Thought cards (session 4), tension marks (session 14), meter.', 'Cards slam in; meter stays up.'),
 3: ('Ruth gets up and waters the plant by her window; it unfurls a new leaf. הגוף יודע איך להירגע · לתת לו את התנאים. The two calm badges from session 14 (relaxation, imagery) glow: הרפיה ודמיון מודרך.', 'The plant in Ruth\'s room; calm badges from session 14.', 'Leaf unfurls as water falls.'),
 4: ('The two badges with what research shows: פחות מתח וחרדה (meter drops) · נוחות ומנוחה · שינה · התמודדות עם כאב.', 'Badges, meter; uses as in session 14.', 'Tags pop on each phrase.'),
 5: ('Ruth on her mat (session 3b, from above); a soft scan line moves down her body and each area eases: אזורים שונים משחררים מעט מתח.', 'Mat and overhead view from 3b; scan line from 14.', 'Scan sweeps.'),
 6: ('Back in the chair, a thought bubble opens on a pleasant place: Ruth\'s own sunny hills; warmth reaches her: מקום נעים · התחושות שקשורות אליו.', 'The land of her path.', 'Bubble opens.'),
 7: ('Session 2\'s head cutaway: the same regions light for the real view and for the imagined one: דמיון · חוויה ממשית.', 'Head cutaway from session 2.', 'Zoom into the head.'),
 8: ('A simple chain: what we imagine → the brain responds → the body responds.', 'Arrows.', 'Arrows draw in order.'),
 9: ('The bubble turns grey and stormy; her pulse line jumps, shoulders tense, meter climbs: הדופק משתנה · השרירים מתכווצים · הגוף נעשה דרוך.', 'Meter, tension marks.', 'Bubble darkens.'),
 10: ('The bubble clears back to the pleasant place; meter drops, shoulders ease: לכיוון השני.', 'Same.', 'Bubble brightens.'),
 11: ('Her path of stones: from a tense start to a calm one; each time she walks it more stones light and the way is clearer: מדריכות להרפיה · דרך מוכרת יותר.', 'The path from session 1.', 'Stones light with each walk.'),
 12: ('Three comfortable ways, one after another: sitting with support, leaning back, lying on the mat with cushion and blanket; eyes closed or open.', 'Armchair, mat and blanket from 3b.', 'Each on its phrase.'),
 13: ('A stiff statue is crossed out; Ruth stands relaxed, a tremor at her hand, smiling: לא כמו פסל · לתת לגוף להיות כפי שהוא.', 'Tremor marks from 3a; the picture-perfect frame idea from 3a.', 'Cross draws.'),
 14: ('A thought bubble with a soft, blurry picture: לא צריך תמונה ברורה · הדמיון מגיב בדרכו.', 'Bubble.', 'Picture stays soft.'),
 15: ('Four small bubbles: a picture, a sensation, a memory, just words.', 'Bubbles.', 'Pop right to left.'),
 16: ('A balloon on a string tugs her attention away (session 10); she comes back to her breath and to Ariel\'s voice on her phone: חלק מהתרגול.', 'Balloon on a string from 10, Ariel on the phone from 3.', 'String slackens and draws back.'),
 17: ('Ruth on her mat under the blanket in a warm glow, the meter low: עצירה קטנה כדי להיות טובים לעצמנו · בקצב שלהם.', 'Room, mat, meter.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + plant(171, 240, 1.6) + can(230, 180), '<strong>Conditions, not orders.</strong> Ruth\'s plant grows when watered; the body relaxes when given the conditions.')
legend2 = ('0 0 342 360', P + cloud_bubble(171, 170, place_pic(171, 170, 1.4), w=240, h=150), '<strong>The imagination bubble.</strong> A pleasant place (her own hills); grey and stormy when a stressful thought comes.')
legend3 = ('0 0 342 360', P + meter(171, 300, 0.5, 220), '<strong>The tension meter.</strong> From sessions 3b and 14: up with orders and scary thoughts, down with conditions and calm images.')
carried = ['<strong>Kept:</strong> Ruth\'s room, plant, armchair and mat, the tension meter, the calm badges (session 14), the head cutaway (session 2), her path of stones, the balloon on a string (session 10), Ariel on her phone.',
           '<strong>Only Ariel\'s words</strong> on screen: the orders, the uses, the ways to practise are his; the pleasant place is left as her own hills.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S17Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 17 · הרפיה ודמיון מודרך',
      'Relaxing can be learned: not by giving the body orders, but by giving it conditions. Relaxation and guided imagery work because brain and body respond to what we imagine as well as to what happens; with practice the way from tension to rest grows familiar.',
      'Orders bounce off a tense Ruth → she waters her plant and it grows → two calm badges and what they help with → a scan eases her body, a bubble opens on a pleasant place → in the head, imagined and real light alike → a stormy thought tenses her, a calm one eases her → her path grows familiar → any posture, no statue, no perfect picture, drift and return → a small, kind pause.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S17Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5720'))
print('rows', rows)
