# Session 25 storyboard: getting more out of practice — the judging mind's report card is put aside; practice fits the day, adjusts when it's hard, and everything counts.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S25.dc.html')
assert len(times) == 22

Q = ['הצלחתי להירגע?', 'עקבתי אחרי ההנחיות?', 'הייתי מרוכזת מספיק?']

def zig(x, y):
    return f'<path d="M{x} {y} l6 -10 l6 10 l6 -10 l6 10 l6 -10" stroke="#C0392B" stroke-width="3" fill="none"></path>'

def ache(x, y):
    return f'<circle cx="{x}" cy="{y}" r="11" fill="#E66A7A" opacity=".35"></circle><path d="M{x - 7} {y - 7} l14 14 M{x + 7} {y - 7} l-14 14" stroke="#C0392B" stroke-width="2"></path>'

def ribbon(x, y, w, h):
    return (f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="14" fill="none" stroke="#E66A7A" stroke-width="4"></rect>'
            f'<path d="M{x} {y - h / 2} q-16 -18 -24 -4 q8 10 24 4 q16 -18 24 -4 q-8 10 -24 4" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>')

def face(x, y, happy):
    return f'<circle cx="{x}" cy="{y}" r="14" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x - 5}" cy="{y - 3}" r="1.8" fill="{INK}"></circle><circle cx="{x + 5}" cy="{y - 3}" r="1.8" fill="{INK}"></circle>' + (
        f'<path d="M{x - 6} {y + 4} q6 6 12 0" fill="none" stroke="{INK}" stroke-width="1.5"></path>' if happy else f'<path d="M{x - 6} {y + 6} h12" stroke="{INK}" stroke-width="1.5"></path>')

def toothbrush(x, y):
    return f'<rect x="{x - 3}" y="{y - 22}" width="6" height="34" rx="3" fill="#7FB7A8" stroke="{INK}" stroke-width="1.5"></rect><rect x="{x - 4}" y="{y - 30}" width="8" height="10" fill="#FFFFFF" stroke="{INK}" stroke-width="1.2"></rect>'

def pill(x, y):
    return f'<rect x="{x - 12}" y="{y - 6}" width="24" height="12" rx="6" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><rect x="{x - 12}" y="{y - 6}" width="12" height="12" rx="6" fill="#E66A7A"></rect>'

def note(x, y):
    return f'<path d="M{x} {y} v-22 l14 -4 v22" fill="none" stroke="{INK}" stroke-width="2.5"></path><ellipse cx="{x - 4}" cy="{y}" rx="5" ry="4" fill="{INK}"></ellipse><ellipse cx="{x + 10}" cy="{y - 4}" rx="5" ry="4" fill="{INK}"></ellipse>'

S = {}
S[1] = (room() + chair() + ruth(150) + phone_guide(168, 232) + mat(214, 306, 110) + bubble(250, 250, '?', w=36) + bubble(300, 220, '?', w=36)
        + lbl(171, 40, 'מפגש 25 · איך להפיק יותר מהתרגול', fill='#E3F4F0') + lbl(110, 110, 'שאלות בדרך', size=12))
S[2] = (room() + chair() + ruth(130, mood='happy') + ariel(250, wave=True)
        + lbl(270, 80, 'נוח יותר', size=12) + lbl(171, 110, 'גמיש יותר', size=12) + lbl(76, 80, 'משתלב ביום־יום', size=12))
S[3] = (room() + lying(eyes_closed=True) + voice(66, 200, s=1.1) + gradecard(220, 130, Q, w=180)
        + lbl(171, 40, 'המוח אוהב לחלק ציונים', fill='#FFF1CC'))
S[4] = (room() + lying(eyes_closed=True) + zig(70, 262) + gradecard(200, 120, ['לעשות את זה נכון', 'להצליח'], ticks=['✗', '✗'], w=170, stamp='עוד משימה')
        + meter(310, 200, 0.75) + lbl(171, 40, 'מתח ותסכול', fill='#FFF1CC'))
S[5] = (room() + lying() + calm_disc(171, 280, 110) + f'<g transform="rotate(-10 280 312) scale(.6) translate(187 208)">' + gradecard(280, 312, Q, w=180) + '</g>'
        + lbl(171, 40, 'גישה של אי מאמץ', fill='#E3F4F0') + lbl(171, 130, 'לתת מקום למה שקורה עכשיו', size=12))
S[6] = (room() + chair() + ruth(120) + mat(190, 306, 140) + arrow(150, 200, 230, 270, AMBER) + lbl(220, 190, 'קצת מאמץ להתחיל', size=11)
        + lbl(171, 40, 'ומשם: זהו, הגעתי', fill='#E3F4F0'))
S[7] = (room() + lying(eyes_closed=True) + calm_disc(171, 270, 120) + wave(110, 200, 120, 10, 3) + balloon(270, 120) + string(80, 278, 240, 132)
        + tremor(220, 270) + face(60, 120, True) + face(110, 120, False) + lbl(171, 40, 'אולי רגועים יותר, ואולי לא', fill='#FFF1CC'))
S[8] = (room() + lying(eyes_closed=True, blanket=True) + ribbon(171, 280, 290, 70) + lbl(270, 120, 'תשומת לב', size=11) + lbl(171, 150, 'תנאים תומכים', size=11)
        + lbl(76, 120, 'דאגה לעצמנו', size=11) + lbl(171, 40, 'כמה רגעים לעצמנו', fill='#E3F4F0'))
S[9] = (room() + lying(eyes_closed=True) + calm_disc(171, 270, 110) + perfect(270, 110) + cross(270, 110, 30)
        + lbl(120, 100, 'לא לייצר חוויה', size=11) + lbl(171, 40, 'רך יותר · פחות שיפוטי', fill='#E3F4F0'))
S[10] = (room() + ruth(110, 'stand', 'happy') + f'<path d="M140 296 h40 l-4 22 h-32Z" fill="#C9805A" stroke="{INK}" stroke-width="2"></path>'
         + f'<path d="M96 192 q-14 -4 -26 4 M96 198 q-12 4 -22 14" stroke="{SLATE}" stroke-width="2" fill="none" stroke-linecap="round"></path><path d="M92 206 q18 6 36 0" stroke="{AMBER}" stroke-width="3" fill="none"></path>' + note(250, 120) + glow(36, 290, 26, 30)
         + lbl(66, 150, 'אנחה', size=11) + lbl(170, 120, 'הכתפיים משתחררות', size=10) + lbl(270, 160, 'מוזיקה', size=11) + lbl(60, 250, 'טבע', size=11) + lbl(171, 40, 'דרכים טבעיות להירגע', fill='#E3F4F0'))
S[11] = (land() + stones(PATH) + ruth(130, 'stand') + pack(150, 236) + tool(220, 150, 1, 18) + tool(260, 190, 3, 18) + tool(200, 210, 4, 16)
         + arrow(206, 168, 164, 216, AMBER) + lbl(171, 40, 'לזהות · ולהשתמש יותר', fill='#FFF1CC'))
S[12] = (room() + chair() + ruth(110) + ariel(260) + ''.join(f'<rect x="{x - 22}" y="100" width="44" height="58" rx="6" fill="#FFF1CC" stroke="{INK}" stroke-width="2"></rect>' for x in (130, 185, 240))
         + lbl(171, 40, 'עוד היום', fill='#E3F4F0'))
S[13] = (P + f'<rect x="230" y="90" width="90" height="120" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + tool(275, 136, 1, 20) + f'<text x="300" y="112" font-size="16" fill="{AMBER}">★</text>'
         + f'<rect x="126" y="90" width="90" height="120" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + mat(136, 170, 70) + cushion(150, 164)
         + f'<rect x="22" y="90" width="90" height="120" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + pill(50, 130) + toothbrush(84, 160)
         + lbl(275, 236, 'תרגול אחד מוכר', size=11) + lbl(171, 266, 'מקום קבוע ומוכן', size=11) + lbl(67, 236, 'להצמיד להרגל', size=11) + lbl(171, 40, 'להקל על התרגול', fill='#FFF1CC'))
S[14] = (P + counter() + kettle(110, 250) + ariel(240, y0=-16) + ''.join(f'<circle cx="{180 + i * 30}" cy="80" r="10" fill="{TEAL if i < 2 else "#FFFFFF"}" stroke="{INK}" stroke-width="1.5"></circle>' for i in range(3))
         + lbl(171, 40, 'שלוש נשימות עמוקות', fill='#E3F4F0'))
S[15] = room() + lying(eyes_closed=True) + bubble(220, 170, '?', w=40) + lbl(171, 40, 'קשיים נפוצים', fill='#FFF1CC')
S[16] = (room() + lying(eyes_closed=True) + anchor_icon(150, 230, 0.9) + cross(150, 230, 16) + sound(60, 160) + glow(196, 300, 26, 10) + glow(140, 278, 14, 10)
         + lbl(110, 160, 'צלילים', size=11) + lbl(250, 230, 'ידיים · רגליים', size=11) + lbl(171, 40, 'עוגן אחר', fill='#E3F4F0'))
S[17] = (room() + lying(eyes_closed=True) + calm_disc(171, 270, 110) + ache(168, 270) + f'<g opacity=".35">{sound(50, 120)}{note(280, 100)}</g>'
         + lbl(171, 40, 'אי־נוחות מורגשת יותר', fill='#FFF1CC') + lbl(171, 340, 'זה לא אומר שעושים משהו לא נכון', size=11))
S[18] = (room() + lying() + hourglass(60, 110) + f'<circle cx="150" cy="100" r="18" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><circle cx="150" cy="100" r="7" fill="{INK}"></circle>'
         + cushion(250, 104) + lbl(60, 160, 'לקצר', size=11) + lbl(150, 140, 'לפתוח עיניים', size=11) + lbl(256, 140, 'תנוחה נוחה', size=11) + lbl(171, 40, 'לתרגל יחד עם זה, או להתאים', fill='#E3F4F0'))
S[19] = (room() + win('night') + lying(eyes_closed=True, blanket=True) + battery(270, 140, 0.7) + arrow(220, 190, 220, 120, '#5BAA6A')
         + lbl(171, 40, 'נרדמים? גם זה מצוין', fill='#E3F4F0') + lbl(130, 120, 'מנוחה · התאוששות', size=11))
S[20] = (P + f'<g transform="translate(176 0) scale(.5)">{room()}{chair()}{ruth(150)}</g>' + hourglass(120, 90) + day_line(300, pills=(), curve=False, marks=((200, 'שעה אחרת'),))
         + lbl(260, 40, 'תנוחה אחרת', size=11) + lbl(110, 40, 'תרגול קצר יותר', size=11))
S[21] = (P + gradecard(200, 140, Q, w=180) + strike(200, 140, 200) + trophy(66, 140) + cross(66, 140, 30)
         + lbl(171, 260, 'אין מינון אחד "נכון"', fill='#FFF1CC') + lbl(171, 300, 'אין פרס', size=12))
S[22] = (land(sun=True) + stones(PATH, lit=(0, 1, 2, 3, 4, 5, 6)) + ruth(250, 'stand', 'happy')
         + lbl(80, 120, 'תרגול שלם', size=11) + lbl(110, 160, 'חלק מתרגול', size=11) + lbl(90, 200, 'נשימה אחת', size=11) + lbl(171, 40, 'הכול נחשב', fill='#E3F4F0'))

ACTS = [
  (1, 'Act 1 · Questions on the way', [1, 2], 'Ruth with her phone and her mat; Ariel steps into her room to talk about making practice easier.'),
  (2, 'Act 2 · The mind hands out grades', [3, 4], 'While she practises, the grey inner voice holds up a report card; trying to get it "right" turns practice into one more task.'),
  (3, 'Act 3 · Without effort', [5, 6, 7], 'The card goes aside and the circle of attention opens. A little effort to start, then "here I am"; breath, thoughts and body do as they do.'),
  (4, 'Act 4 · Softer', [8, 9], 'A few moments for herself, tied like a gift. Not making an experience, just meeting what is already here.'),
  (5, 'Act 5 · What already helps', [10, 11], 'A sigh, dropping shoulders, music, nature: things that already calm her. Practice spots them and adds them to her backpack.'),
  (6, 'Act 6 · Easier, starting today', [12, 13, 14], 'One familiar practice, a set place at home, a link to a habit. Ariel\'s own: three breaths while the kettle boils.'),
  (7, 'Act 7 · When it\'s hard', [15, 16, 17, 18], 'Breath uncomfortable? Another anchor. Discomfort feels louder when it\'s quiet, and that\'s not doing it wrong. Practise with it, or adjust.'),
  (8, 'Act 8 · Falling asleep', [19, 20], 'Dozing off is fine: rest and recovery. To stay awake: another posture, a shorter practice, another time.'),
  (9, 'Act 9 · Everything counts', [21, 22], 'The report card comes back and is struck through: no right dose, no prize. Whole, part or one breath, each lights a stone.'),
]
SHOT = {
 1: ('Ruth in her armchair, Ariel on her phone, her mat rolled out nearby; two small question marks over it. Title: מפגש 25 · איך להפיק יותר מהתרגול.', 'Room, phone entrance and mat from sessions 3a/3b.', 'Fade in on the room.'),
 2: ('Ariel steps out into the room beside Ruth; three tags: נוח יותר · גמיש יותר · משתלב ביום־יום.', 'Ariel in Ruth\'s room, as in 3a.', 'Tags pop on each word.'),
 3: ('Ruth practising on the mat, eyes closed. Her grey inner voice (session 4) holds up a report card with three questions and empty tick boxes: הצלחתי להירגע? / עקבתי אחרי ההנחיות? / הייתי מרוכזת מספיק?', 'Inner voice from session 4; the report card is this film\'s anchor.', 'Each question appears on its words.'),
 4: ('The boxes fill with red crosses; the card is stamped עוד משימה. Tension marks at Ruth\'s shoulders; the tension meter from 3b rises: מתח ותסכול.', 'Meter from 3b.', 'Crosses stamp in; meter climbs.'),
 5: ('Ruth slides the card aside onto the floor; the circle of attention from 3a opens around her: גישה של אי מאמץ · לתת מקום למה שקורה עכשיו.', 'Circle of attention from 3a.', 'Card slides off; circle grows.'),
 6: ('Ruth gets up from the armchair and down onto the mat (a small effort arrow), then lets out a breath and her shoulders drop: זהו, הגעתי.', 'Room, mat.', 'Effort arrow, then a soft settle.'),
 7: ('Inside the circle: an uneven breath wave, a thought balloon drifting off (3a/6), a small tremor. Two little faces, one calm and one not: אולי רגועים יותר, ואולי לא.', 'Wave, balloon, tremor marks from 3a.', 'Each on its phrase.'),
 8: ('A blanket over Ruth and a ribbon tied around the scene like a small gift (3b): תשומת לב · תנאים תומכים · דאגה לעצמנו.', 'Ribbon and blanket from 3b.', 'Ribbon ties on.'),
 9: ('The picture-perfect meditator (3a) is crossed out again: לא לייצר חוויה. The circle softens around Ruth as she is.', 'Perfect picture from 3a.', 'Cross draws; circle glows.'),
 10: ('Ruth\'s ordinary day: she puts down a heavy basket and sighs, her shoulders drop, music plays, the plant by the window glows: דרכים טבעיות להירגע.', 'Room; the plant from every session.', 'Each glows on its word.'),
 11: ('Out on the path, these moments turn into tool badges and drop into Ruth\'s backpack: לזהות · ולהשתמש יותר.', 'Path and backpack with tool badges from session 1.', 'Badges fly into the pack.'),
 12: ('Back in the room, Ariel holds three face-down cards: עוד היום.', 'Ariel, room.', 'Cards fan out.'),
 13: ('The cards flip one by one: one favourite practice (★), the corner with the mat and cushion ready, and a link to a habit (pills, exercise, brushing teeth).', 'Mat and cushion; the pill from the day line.', 'Each card flips on its words.'),
 14: ('Ariel at a kettle; as the water heats, three breath dots fill one by one: שלוש נשימות עמוקות.', 'Breath dots from 3b\'s pacer.', 'Steam rises; dots fill.'),
 15: ('Ruth on the mat, a small question mark: קשיים נפוצים.', 'Mat.', 'Question pops.'),
 16: ('The anchor (3a) on her belly feels uncomfortable; it moves to sounds at the window or to her hands and feet, which glow (session 6): עוגן אחר.', 'Anchor from 3a, glow of noticing from 6.', 'Anchor lifts and moves.'),
 17: ('The room\'s noises fade; in the quiet circle a small ache becomes clearer: אי־נוחות מורגשת יותר. Then: זה לא אומר שעושים משהו לא נכון.', 'Circle of attention.', 'Noises fade, ache brightens.'),
 18: ('Options appear around Ruth: לקצר (hourglass), לפתוח עיניים, תנוחה נוחה, or something else. Title: לתרגל יחד עם זה, או להתאים.', 'Hourglass and cushion from 3a.', 'Options pop one by one.'),
 19: ('Night at the window; Ruth has dozed off under the blanket, and her battery (session 5) slowly charges: נרדמים? גם זה מצוין · מנוחה, התאוששות.', 'Battery from session 5.', 'Window darkens; battery fills.'),
 20: ('Three ways to stay awake: sitting up in the armchair, a shorter practice (small hourglass), another time on the day line.', 'Day line from 3a.', 'Each on its words.'),
 21: ('The report card comes back and is struck through; a trophy is crossed out: אין מינון אחד "נכון" · אין פרס.', 'The report card from Act 2.', 'Strike line draws.'),
 22: ('The path of stones: a whole practice, part of one, a single breath; each lights a stone as Ruth walks on: הכול נחשב.', 'The program\'s path from session 1 and 3a.', 'Stones light one by one.'),
}
legend1 = ('0 40 342 220', P + voice(66, 130, s=1.1) + gradecard(220, 130, Q, w=180), '<strong>The report card.</strong> The judging mind\'s grades for practice, set aside early and struck out at the end.')
legend2 = ('0 0 342 360', room() + lying(eyes_closed=True) + calm_disc(171, 270, 110), '<strong>The circle of attention.</strong> From 3a: room for whatever happens now, instead of a grade.')
legend3 = ('0 0 342 360', land(sun=True) + stones(PATH, lit=(0, 1, 2, 3)), '<strong>The path of stones.</strong> Every kind of practice, even one breath, lights a stone.')
carried = ['<strong>Kept:</strong> Ruth\'s room, Ariel, the mat, the circle of attention, perfect picture, anchor and hourglass (3a), the meter, ribbon and pacer dots (3b), the inner voice (4), the battery (5), the path and backpack (1).',
           '<strong>Wording:</strong> Ariel says "מרוכז"; on Ruth\'s card it reads "מרוכזת", since it is her thought.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S25Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 25 · איך להפיק יותר מהתרגול',
      'Practice isn\'t a test to pass. Come to it without effort, let it fit your day, adapt it when something is hard, and every bit counts, even one breath.',
      'The inner voice grades Ruth\'s practice → the card turns into stress → she puts it aside and the circle opens → what already calms her goes into her backpack → simple tips → other anchors, options, even sleep → the card is struck out; every practice lights a stone.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
set_height(B + 'S25Story.dc.html', 7400)
print('rows', rows)
