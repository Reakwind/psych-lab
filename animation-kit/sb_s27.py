# Session 27 storyboard: an evening routine — Ruth's room winds down from dusk to night; small repeated steps become a gentle slope from the day into sleep.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S27.dc.html')
assert len(times) == 16

def crib(x, y):
    return (f'<rect x="{x - 26}" y="{y - 10}" width="52" height="22" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect>'
            + ''.join(f'<path d="M{x - 20 + i * 10} {y - 10} v22" stroke="{INK}" stroke-width="1.2"></path>' for i in range(5))
            + f'<circle cx="{x - 30}" cy="{y - 16}" r="6" fill="#C9A27E" stroke="{INK}" stroke-width="1.2"></circle>')

def slope(x1=300, x2=40, y=250, k=1.0, ruth_at=None):
    """The evening end of the day line: a gentle slope from the sun (right) down to the moon (left). k=0 draws a cliff."""
    mid = x1 - (x1 - x2) * (0.25 + 0.6 * (1 - k))
    o = (f'<path d="M{x1} {y - 70} L{mid:.0f} {y - 70} C{mid - 60 * k:.0f} {y - 70} {x2 + 60 * k:.0f} {y} {x2} {y}" fill="none" stroke="{AMBER}" stroke-width="5" stroke-linecap="round"></path>'
         f'<circle cx="{x1 + 10}" cy="{y - 70}" r="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'
         f'<path d="M{x2 - 12} {y - 12} a12 12 0 1 0 0 24 a9 9 0 1 1 0 -24Z" fill="#8E9AB0" stroke="{INK}" stroke-width="1.5"></path>')
    return o

def steps(x, y, n=3, labels=()):
    o = ''
    for i in range(n):
        o += f'<rect x="{x - i * 70}" y="{y + i * 34}" width="70" height="{34 * (n - i)}" fill="#E7DCCB" stroke="{INK}" stroke-width="2"></rect>'
    for i, t in enumerate(labels):
        o += lbl(x - i * 70 + 35, y + i * 34 - 18, t, size=10)
    return o

def shower(x, y):
    return f'<path d="M{x - 14} {y - 10} q14 -18 28 0Z" fill="#B9C4CF" stroke="{INK}" stroke-width="1.5"></path>' + ''.join(f'<path d="M{x - 8 + i * 8} {y} v12" stroke="{TEAL}" stroke-width="2" stroke-dasharray="3 3"></path>' for i in range(3))

def book(x, y):
    return f'<path d="M{x} {y - 10} q-12 -6 -22 0 v20 q10 -6 22 0 q12 -6 22 0 v-20 q-10 -6 -22 0Z M{x} {y - 10} v20" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></path>'

def note(x, y):
    return f'<path d="M{x} {y} v-22 l14 -4 v22" fill="none" stroke="{INK}" stroke-width="2.5"></path><ellipse cx="{x - 4}" cy="{y}" rx="5" ry="4" fill="{INK}"></ellipse><ellipse cx="{x + 10}" cy="{y - 4}" rx="5" ry="4" fill="{INK}"></ellipse>'

def laptop(x, y):
    return f'<rect x="{x - 22}" y="{y - 26}" width="44" height="28" rx="3" fill="#B9C4CF" stroke="{INK}" stroke-width="1.5"></rect><path d="M{x - 28} {y + 2} h56 l-4 6 h-48Z" fill="#8996A5" stroke="{INK}" stroke-width="1.5"></path>'

def paper(x, y):
    return f'<rect x="{x - 20}" y="{y - 24}" width="40" height="48" rx="2" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><path d="M{x - 14} {y - 14} h28 M{x - 14} {y - 6} h28 M{x - 14} {y + 2} h20 M{x - 14} {y + 10} h24" stroke="{SLATE}" stroke-width="2"></path><text x="{x}" y="{y - 30}" text-anchor="middle" font-size="14" font-weight="700" fill="#C0392B">!</text>'

def checklist(x, y):
    return f'<rect x="{x - 20}" y="{y - 26}" width="40" height="52" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect>' + ''.join(f'<rect x="{x - 14}" y="{y - 18 + i * 14}" width="8" height="8" fill="#FFFFFF" stroke="{INK}" stroke-width="1"></rect><path d="M{x - 2} {y - 14 + i * 14} h14" stroke="{SLATE}" stroke-width="2"></path>' for i in range(3))

def app_phone(x, y, items):
    o = f'<rect x="{x - 64}" y="{y - 100}" width="128" height="210" rx="18" fill="{INK}"></rect><rect x="{x - 56}" y="{y - 88}" width="112" height="186" rx="10" fill="#F4F1EA"></rect>'
    for i, t in enumerate(items):
        o += f'<rect x="{x - 46}" y="{y - 76 + i * 42}" width="92" height="32" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><text x="{x}" y="{y - 55 + i * 42}" text-anchor="middle" font-size="11" font-weight="600" fill="{INK}" direction="rtl">{html.escape(t)}</text>'
    return o

def evening_card(x, y, k):
    return (f'<rect x="{x - 44}" y="{y - 70}" width="88" height="140" rx="10" fill="#E7EAF2" stroke="{INK}" stroke-width="2"></rect>'
            f'<path d="M{x + 22} {y - 58} a8 8 0 1 0 0 16 a6 6 0 1 1 0 -16Z" fill="#8E9AB0"></path>' + shower(x, y - 24) + book(x, y + 10) + f'<path d="M{x - 10} {y + 48} l4 -14 h12 l4 14Z M{x} {y + 48} v10" fill="#FFE3A8" stroke="{INK}" stroke-width="1.5"></path>'
            + f'<text x="{x - 26}" y="{y - 46}" font-size="12" font-weight="700" fill="{INK}">{k}</text>')

def button(x, y):
    return (f'<rect x="{x - 50}" y="{y - 16}" width="100" height="30" rx="8" fill="#B9C4CF" stroke="{INK}" stroke-width="2"></rect>'
            f'<ellipse cx="{x}" cy="{y - 16}" rx="34" ry="12" fill="#E66A7A" stroke="{INK}" stroke-width="2"></ellipse>'
            f'<text x="{x}" y="{y + 6}" text-anchor="middle" font-size="12" font-weight="700" fill="{INK}">💤</text>')

S = {}
S[1] = (room() + win('dusk') + chair() + ruth(150) + bubble(250, 110, '', w=110) + crib(254, 112) + thought(176, 196, 226, 132)
        + lbl(171, 40, 'מפגש 27 · שגרת ערב לקראת השינה', fill='#E3F4F0') + lbl(250, 160, 'גם למבוגרים', fill='#FFF1CC', size=12))
S[2] = (room(shoes=False) + win('night') + evening(0.4) + in_bed(60, 318, 230) + balloon(110, 110) + balloon(220, 80) + string(94, 252, 100, 124) + string(96, 252, 210, 94)
        + lbl(250, 180, 'הגוף רוצה לנוח', size=11) + lbl(171, 40, 'הראש עוד עסוק', fill='#FFF1CC'))
S[3] = (room(shoes=False) + win('night') + evening(0.4) + in_bed(60, 318, 230) + meter(296, 200, 0.6, 'מתח')
        + f'<path d="M110 130 h70 M210 130 h40" stroke="{INK}" stroke-width="4" stroke-linecap="round"></path><circle cx="270" cy="130" r="10" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle><path d="M96 120 a10 10 0 1 0 0 20 a7 7 0 1 1 0 -20Z" fill="#8E9AB0" stroke="{INK}" stroke-width="1.5"></path>'
        + lbl(171, 40, 'המעבר לשינה לא קורה ברגע', fill='#FFF1CC'))
S[4] = (bighead(f'<path d="M126 132 h90 M126 160 h90" stroke="{INK}" stroke-width="2"></path>' + ''.join(f'<rect x="{132 + i * 20}" y="{116 + (i % 2) * 28}" width="14" height="16" rx="2" fill="{c}" stroke="{INK}" stroke-width="1"></rect>' for i, c in enumerate(('#A9C4FF', '#FFDEA3', '#B3EFE4', '#FFD7F3'))))
        + lbl(80, 240, 'לזכור', size=11) + lbl(140, 270, 'ללמוד', size=11) + lbl(202, 270, 'לחשוב', size=11) + lbl(262, 240, 'מצב הרוח', size=11) + lbl(171, 330, 'התאוששות והתארגנות', fill='#E3F4F0'))
S[5] = (room(shoes=False) + win('night') + evening(0.3) + in_bed(60, 318, 230, mood='flat') + battery(270, 150, 0.2) + arrow(230, 110, 230, 180, '#D9534F') + tremor(80, 220)
        + lbl(171, 40, 'בפרקינסון: השינה מאתגרת במיוחד', fill='#FFF1CC'))
S[6] = (room() + win('day') + chair() + ruth(110) + doctor(250) + bubble(150, 110, '…', w=50)
        + lbl(171, 40, 'לדבר עם הרופא', fill='#E3F4F0') + lbl(250, 150, 'קושי משמעותי או מתמשך', size=10))
S[7] = (P + steps(240, 130, 3, ('מורידים קצב', 'נרגעים', 'מתכוננים לשינה')) + f'<circle cx="314" cy="76" r="14" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle><path d="M60 214 a14 14 0 1 0 0 28 a10 10 0 1 1 0 -28Z" fill="#8E9AB0" stroke="{INK}" stroke-width="1.5"></path>'
        + lbl(171, 40, 'להוריד בהדרגה את הקצב', fill='#E3F4F0'))
S[8] = (room(shoes=False) + win('dusk') + lamp(300, 318, 0.6) + chair() + ruth(150, mood='happy') + friend(66).replace('stroke-width="7"', 'stroke-width="7" opacity=".9"')
        + shower(250, 90) + book(206, 140) + note(130, 100) + glow(300, 180, 24, 20)
        + lbl(250, 60, 'מקלחת חמה', size=10) + lbl(206, 114, 'ספר', size=10) + lbl(130, 66, 'מוזיקה', size=10) + lbl(300, 120, 'אור חלש', size=10) + lbl(66, 140, 'אדם קרוב', size=10))
S[9] = (room() + win('dusk') + chair() + ruth(110) + f'<rect x="200" y="250" width="120" height="68" rx="6" fill="#C9A27E" stroke="{INK}" stroke-width="2"></rect>'
        + laptop(290, 150) + paper(230, 150) + checklist(170, 110) + arrow(260, 190, 260, 240) + lbl(290, 200, 'עבודה', size=10) + lbl(220, 92, 'חדשות מלחיצות', size=10) + lbl(150, 60, 'משימות', size=10)
        + lbl(171, 40, 'מניחים בצד', fill='#FFF1CC'))
S[10] = (room(shoes=False) + win('dusk') + evening(0.15) + app_phone(171, 190, ['נשימה', 'הרפיה', 'מיינדפולנס', 'דמיון מודרך']) + lbl(171, 40, 'תרגול קצר מהאפליקציה', fill='#E3F4F0'))
S[11] = (P + evening_card(270, 180, 'א') + evening_card(171, 180, 'ב') + evening_card(72, 180, 'ג') + lbl(171, 40, 'אותן פעולות, כל ערב', fill='#E3F4F0') + lbl(171, 300, 'נעשות מוכרות', fill='#FFF1CC'))
S[12] = (room(shoes=False) + win('night') + evening(0.45) + lamp(300, 318, 0.3) + chair() + ruth(150, mood='happy')
         + lbl(250, 90, 'היום מסתיים', size=11) + lbl(171, 130, 'אפשר להוריד קצב', size=11) + lbl(90, 90, 'אפשר להתחיל לנוח', size=11) + lbl(171, 40, 'סימן לגוף ולמוח', fill='#E3F4F0'))
S[13] = P + button(171, 170) + cross(171, 160, 46) + lbl(171, 260, 'שינה לא מפעילים בלחיצת כפתור', fill='#FFF1CC') + lbl(171, 300, 'וגם לא צריך לנסות', size=12)
S[14] = P + slope(300, 40, 240) + f'<g opacity=".3"><path d="M300 170 L120 170 L120 240" fill="none" stroke="{SLATE}" stroke-width="3" stroke-dasharray="6 6"></path></g>' + lbl(171, 40, 'מעבר קצת יותר רגוע', fill='#E3F4F0')
S[15] = (room(shoes=False) + win('night') + evening(0.3) + chair() + ruth(150) + f'<rect x="230" y="270" width="22" height="36" rx="4" fill="{INK}"></rect>' + lamp(300, 318, 0.4)
         + lbl(270, 100, 'מניחים את הטלפון', size=10) + lbl(150, 80, 'מחלישים את האור', size=10) + lbl(70, 120, 'מוזיקה שקטה', size=10) + lbl(171, 150, 'תרגול נשימה קצר', size=10)
         + lbl(171, 40, 'סימן קטן אחד', fill='#FFF1CC'))
S[16] = (room(shoes=False) + win('night') + evening(0.55) + lamp(300, 318, 0) + in_bed(60, 318, 230, mood='happy', eyes_closed=True)
         + lbl(171, 40, 'עשיתי מספיק להיום', fill='#FFF1CC') + lbl(171, 90, 'עכשיו אפשר לנוח', size=12))

ACTS = [
  (1, 'Act 1 · Not only for children', [1], 'Dusk in Ruth\'s room; she thinks of a baby\'s crib, then: an evening routine can help adults too.'),
  (2, 'Act 2 · Tired body, busy head', [2, 3], 'In bed: the body wants rest, the head floats off; the day\'s tension is still up and sleep doesn\'t start the moment she lies down.'),
  (3, 'Act 3 · Why sleep matters', [4, 5, 6], 'Inside the head, sleep sorts and restores. With Parkinson\'s it\'s harder and drains the battery; for real difficulty, talk to the doctor.'),
  (4, 'Act 4 · Slowing down', [7, 8, 9, 10], 'Steps down from the day: pleasant, calming things light up; work, news and tasks are put away; a short practice from the app.'),
  (5, 'Act 5 · The same steps, every evening', [11, 12], 'Evening after evening the same few things; they become a signal: the day is ending.'),
  (6, 'Act 6 · No switch for sleep', [13, 14], 'Sleep has no button. The aim is a gentle slope from the day, not a cliff.'),
  (7, 'Act 7 · One small sign tonight', [15, 16], 'Ruth picks one small sign the day is over, and rests: "I did enough today."'),
]
SHOT = {
 1: ('Dusk at Ruth\'s window; she sits in her armchair and a thought bubble shows a crib and a teddy: routines are for little ones. Tag: גם למבוגרים. Title: מפגש 27 · שגרת ערב לקראת השינה.', 'Ruth\'s room; the window\'s light is this film\'s clock, from dusk to night.', 'Fade in at dusk.'),
 2: ('Night. Ruth in bed, eyes open; two thought balloons (sessions 3a/6) tug from her head: הגוף רוצה לנוח · הראש עוד עסוק.', 'Bed (new, kept for the whole film); balloons from 3a and 6.', 'Room dims; balloons drift up.'),
 3: ('The tension meter (3b) beside the bed is still up: המתח של היום. Above, a broken line from sun to moon: המעבר לשינה לא קורה ברגע.', 'Meter from 3b; the day line from 3a.', 'Gap opens in the line.'),
 4: ('Inside the head (session 2\'s cutaway), asleep: small shelves get tidied while tags appear: לזכור · ללמוד · לחשוב · מצב הרוח → התאוששות והתארגנות.', 'Head cutaway from sessions 2 and 7.', 'Dip into the head.'),
 5: ('Back in bed, a restless night: the battery (session 5) drains, small tremor marks appear: השינה מאתגרת במיוחד.', 'Battery from 5, tremor marks from 3a.', 'Battery drops.'),
 6: ('Daytime: Ruth talks with her doctor: לדבר עם הרופא, for difficulty that is significant or lasts.', 'Room by day.', 'Cut to daylight.'),
 7: ('Three soft steps down from the day: מורידים קצב · נרגעים · מתכוננים לשינה, ending at the moon.', 'The day line\'s evening end, now a slope.', 'Steps draw on.'),
 8: ('Dusk in the room; around Ruth five pleasant things light up in turn: a warm shower, a book, music, the lamp dimming, a close friend sitting with her.', 'Lamp (new, dims through the film); friend from session 5.', 'Each glows on its word.'),
 9: ('Laptop (work), a newspaper with "!" (stressful news) and a task list slide into a drawer: מניחים בצד.', 'Room.', 'Items slide into the drawer.'),
 10: ('Ruth\'s phone shows four short practices: נשימה · הרפיה · מיינדפולנס · דמיון מודרך.', 'Phone from earlier sessions.', 'Practices slide up.'),
 11: ('Three evening cards side by side, each with the same shower, book and dim lamp: אותן פעולות, כל ערב → נעשות מוכרות.', 'Same icons.', 'Cards deal in.'),
 12: ('The lamp dims, the window turns to night; three tags in turn: היום מסתיים · אפשר להוריד קצב · אפשר להתחיל לנוח.', 'Lamp and window.', 'Light lowers on each phrase.'),
 13: ('A big "sleep" button is pressed and crossed out: שינה לא מפעילים בלחיצת כפתור · וגם לא צריך לנסות.', 'Cross from earlier sessions.', 'Press, then cross.'),
 14: ('The day line ends in a gentle slope down to the moon, instead of a sharp drop: מעבר קצת יותר רגוע.', 'Slope from Act 4.', 'The cliff softens into a slope.'),
 15: ('Ruth in the evening room; four options appear and she picks one: מניחים את הטלפון · מחלישים את האור · מוזיקה שקטה · תרגול נשימה קצר.', 'Phone, lamp, music, practice from Act 4.', 'Options pop; one stays lit.'),
 16: ('Lamp off, night at the window; Ruth in bed, smiling, eyes closed: עשיתי מספיק להיום · עכשיו אפשר לנוח.', 'Bed and window from Act 2.', 'Slow fade to night.'),
}
legend1 = ('0 0 342 360', room(shoes=False) + win('night') + evening(0.3) + lamp(300, 318, 0.4) + in_bed(60, 318, 230, eyes_closed=True), '<strong>The evening room.</strong> The window goes from dusk to night and the lamp dims as the film goes on.')
legend2 = ('0 120 342 180', P + slope(300, 40, 260), '<strong>The gentle slope.</strong> The evening end of the day line: a calm way down from the day into sleep.')
legend3 = ('0 0 342 360', P + evening_card(171, 180, 'א'), '<strong>The same few steps.</strong> Shower, book, dim light, repeated each evening until they become a signal.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the day line (3a), the balloons (3a/6), the meter (3b), the head cutaway (2), the battery (5), the phone and a friend.',
           '<strong>New:</strong> her bed and a lamp, used again if later sessions talk about sleep.',
           '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S27Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 27 · שגרת ערב לקראת השינה',
      'Sleep can\'t be switched on, but an evening routine helps the body and head slow down gradually. Repeated each night, a few small calming steps become a signal that the day is over.',
      'Dusk; Ruth lies awake with a busy head → sleep restores, Parkinson\'s makes it harder → calming things light up, work and news go away → the same steps each evening → no sleep button, a gentle slope → one small sign, and rest.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
set_height(B + 'S27Story.dc.html', 5850)
print('rows', rows)
