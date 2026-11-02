# Session 3a storyboard: "practising with Parkinson's" — Ariel, Ruth's room, practice that works with whatever today brings.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S03a.dc.html')
assert len(times) == 25

def calm_disc(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".16"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="5 6"></circle>'

def perfect(x, y):
    """The 'picture-perfect' meditator from an ad: still, cross-legged, eyes closed."""
    return (f'<rect x="{x - 40}" y="{y - 52}" width="80" height="96" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<circle cx="{x}" cy="{y - 24}" r="9" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x - 12} {y + 4} L{x - 10} {y - 14} L{x + 10} {y - 14} L{x + 12} {y + 4} Z" fill="#B7D3C6" stroke="{INK}" stroke-width="1.5"></path>'
            f'<path d="M{x - 26} {y + 14} Q{x} {y + 2} {x + 26} {y + 14}" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>')

def card(x, y, icon, day):
    ic = {'sun': f'<circle cx="{x}" cy="{y - 6}" r="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>',
          'cloud': f'<path d="M{x - 16} {y} q0 -14 14 -14 q4 -10 16 -6 q12 2 10 14 q8 4 2 6Z" fill="#C8CFD8" stroke="{INK}" stroke-width="1.5"></path>',
          'half': f'<circle cx="{x + 4}" cy="{y - 10}" r="10" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x - 18} {y + 2} q0 -12 12 -12 q4 -8 14 -4 q10 2 8 12 q6 4 2 4Z" fill="#E4E8ED" stroke="{INK}" stroke-width="1.5"></path>'}[icon]
    return (f'<rect x="{x - 40}" y="{y - 40}" width="80" height="84" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + ic
            + f'<text x="{x}" y="{y + 32}" text-anchor="middle" font-size="12" font-weight="600" fill="{INK}">{day}</text>')

def lesson(x, y, k):
    return f'<rect x="{x - 14}" y="{y - 10}" width="28" height="20" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5" transform="rotate({(k % 3 - 1) * 8} {x} {y})"></rect><path d="M{x - 8} {y - 2} h16 M{x - 8} {y + 4} h10" stroke="{SLATE}" stroke-width="1.5"></path>'

S = {}
S[1] = room() + chair() + ruth(160) + phone_guide(168, 232) + lbl(171, 40, 'מפגש 3 · תרגול עם פרקינסון', fill='#E3F4F0') + lbl(250, 200, 'היי, אני אריאל')
S[2] = (room() + chair() + ruth(150, mood='happy') + ariel(250, wave=True)
        + tool(110, 90, 1, 22) + tool(171, 70, 0, 22) + f'<path d="M226 104 q8 -40 0 -64" stroke="#6E9E58" stroke-width="5" fill="none" stroke-linecap="round"></path><path d="M226 60 q14 -6 20 4" stroke="#6E9E58" stroke-width="4" fill="none"></path>'
        + lbl(110, 128, 'להרגיע את הגוף', size=11) + lbl(171, 108, 'מחשבות ורגשות', size=11) + lbl(240, 128, 'גמישות', size=11))
S[3] = room() + chair() + ruth(150, mood='flat') + perfect(258, 120) + bubble(120, 120, 'זה לא ממש בשבילי') + lbl(258, 186, 'הרפיה · מיינדפולנס', size=11)
S[4] = (room() + chair() + ruth(160, mood='flat') + tremor(190, 270) + bubble(86, 92, 'רעד?') + bubble(171, 66, 'לא נוח?') + bubble(258, 92, 'לא נרגעת?'))
S[5] = room() + chair() + ruth(130) + ariel(250) + lbl(171, 40, 'בדיוק על זה', fill='#FFF1CC') + bubble(130, 120, '?', w=40)
S[6] = (room() + chair() + ruth(160) + tremor(190, 270) + perfect(278, 110) + cross(278, 110, 30) + calm_disc(160, 250, 70) + lbl(171, 40, 'לא צריך לשבת בלי לזוז', fill='#E3F4F0'))
S[7] = (room() + chair() + ruth(160) + calm_disc(160, 236, 96) + tremor(190, 270) + tool(160, 120, 0, 16) + lbl(171, 40, 'מה קורה עכשיו, כמו שזה', fill='#E3F4F0') + lbl(88, 160, 'גוף', size=11) + lbl(240, 120, 'ראש', size=11))
S[8] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + day_line(250, pills=(272, 186, 96)) + lbl(171, 60, 'משתנה כל יום, וגם במהלך היום', fill='#FFF1CC')
        + lbl(272, 290, 'תרופה', size=11) + lbl(171, 320, 'ריכוז · תחושות · תנועה', size=11))
S[9] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + card(260, 170, 'sun', 'יום א׳') + card(171, 170, 'cloud', 'יום ב׳') + card(82, 170, 'half', 'יום ג׳')
        + lbl(171, 60, 'כל תרגול ירגיש קצת אחרת', fill='#E3F4F0') + lbl(171, 280, 'וזה בסדר', fill='#FFF1CC'))
S[10] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + day_line(250, pills=(272, 186, 96), marks=((230, 'תרגול'),))
         + calm_disc(230, 196, 22) + lbl(171, 40, 'כשהתרופה משפיעה', fill='#E3F4F0'))
S[11] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + day_line(250, pills=(272, 186, 96), marks=((128, 'תרגול'),))
         + f'<path d="M128 214 v-30 m-14 12 q14 24 28 0" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"></path><circle cx="128" cy="180" r="5" fill="none" stroke="{INK}" stroke-width="3"></circle>'
         + lbl(171, 40, 'נקודת אחיזה מרגיעה', fill='#FFF1CC'))
S[12] = (room() + f'<path d="M30 318 L30 262 Q30 252 40 252 L84 252 Q94 252 94 262 L94 318" fill="#B9A6C9" stroke="{INK}" stroke-width="2"></path>' + ruth(62)
         + f'<path d="M126 318 L126 248 Q126 236 140 236 L180 236 Q194 236 194 248 L194 318" fill="#B9A6C9" stroke="{INK}" stroke-width="2"></path>' + cushion(160, 236) + ruth(160).replace('202', '210')
         + mat(212, 300, 120) + cushion(226, 292) + ruth_lie(244, 290)
         + lbl(62, 100, 'זקוף', size=11) + lbl(160, 100, 'נשען', size=11) + lbl(272, 100, 'שוכב ★', size=11) + lbl(171, 40, 'מה שנוח לכם כרגע', fill='#E3F4F0'))
S[13] = (room() + mat(70, 300, 200) + cushion(96, 292) + ruth_lie(120, 290) + tremor(236, 280) + f'<path d="M150 266 l6 -10 l6 10 l6 -10" stroke="{SLATE}" stroke-width="1.6" fill="none"></path>'
         + f'<path d="M262 120 h30 l-26 34 l26 34 h-30 l26 -34Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>' + cross(277, 154, 22) + lbl(171, 40, 'לא מחכים שייעלמו', fill='#FFF1CC'))
S[14] = room() + mat(70, 300, 200) + cushion(96, 292) + ruth_lie(120, 290) + tremor(236, 280) + calm_disc(171, 284, 120) + lbl(171, 40, 'גם זה חלק מהרגע', fill='#E3F4F0')
S[15] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + wave(80, 150, 200, 30, 4, col=SLATE, dash=True) + wave(80, 240, 200, 18, 3)
         + f'<rect x="20" y="120" width="48" height="58" rx="6" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><text x="44" y="156" text-anchor="middle" font-size="18" font-weight="700" fill="#C0392B">100</text>' + cross(44, 149, 22)
         + lbl(171, 40, 'לא מבחן', fill='#FFF1CC') + lbl(300, 196, 'הנשימה שלי', size=11))
S[16] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + wave(40, 200, 260, 20, 3) + f'<circle cx="171" cy="300" r="24" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M171 300 l12 -14" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path>'
         + lbl(171, 40, 'בעדינות · התאמות', fill='#E3F4F0') + lbl(171, 340, 'הקצב שמתאים לכם', size=11))
S[17] = (room() + chair() + ruth(160) + calm_disc(160, 240, 80)
         + ''.join(f'<circle cx="{x}" cy="{y}" r="5" fill="{AMBER}"></circle>' for x, y in ((150, 240), (170, 262), (160, 210)))
         + lbl(171, 40, 'עוצרים ומקשיבים פנימה', fill='#E3F4F0'))
S[18] = (f'<rect width="342" height="360" fill="{PAPER}"></rect>' + card(250, 170, 'sun', 'רוגע') + card(92, 170, 'cloud', 'עייפות')
         + lbl(250, 250, 'מעניין', fill='#FFF1CC') + lbl(92, 250, 'גם זה מעניין', fill='#FFF1CC'))
S[19] = (room() + chair() + ruth(160) + calm_disc(160, 240, 80) + lbl(171, 40, 'שמים לב', fill='#E3F4F0') + lbl(80, 90, 'לא שופטים', size=12) + lbl(262, 90, 'לא מבקרים', size=12))
S[20] = (room() + mat(70, 300, 200) + cushion(96, 292) + ruth_lie(120, 290)
         + f'<path d="M96 272 C90 200 140 150 220 120" fill="none" stroke="{SLATE}" stroke-width="2" stroke-dasharray="4 6"></path>' + bubble(240, 110, '…', w=50, tail=False)
         + f'<circle cx="300" cy="190" r="12" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></circle><rect x="270" y="56" width="40" height="34" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'
         + lbl(300, 222, 'רעש', size=11) + lbl(290, 40, 'המשך היום', size=11))
S[21] = (room() + mat(70, 300, 200) + cushion(96, 292) + ruth_lie(120, 290) + wave(110, 210, 120, 10, 2)
         + f'<path d="M236 130 C180 120 120 160 110 240" fill="none" stroke="#4FA3A0" stroke-width="3"></path><path d="M104 228 l6 14 l10 -12" fill="none" stroke="#4FA3A0" stroke-width="3"></path>' + bubble(250, 120, '…', w=50, tail=False)
         + lbl(171, 40, 'נשימה, וחוזרים', fill='#E3F4F0'))
S[22] = room() + chair() + ruth(150, mood='happy') + ariel(250) + lbl(171, 40, 'זמן להתנסות וללמוד', fill='#E3F4F0')
S[23] = (room() + chair() + ruth(150) + f'<rect x="216" y="80" width="100" height="110" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
         + lbl(266, 110, 'להשתנות', size=11) + strike(266, 110, 70) + lbl(266, 160, 'לפתור ספקות', size=11) + strike(266, 160, 86) + lbl(171, 40, 'לא צריך מראש', fill='#FFF1CC'))
S[24] = room() + chair() + ruth(150, mood='happy') + lesson(230, 210, 0) + lbl(250, 176, 'דבר אחד קטן', size=11) + lbl(171, 40, 'ראש פתוח', fill='#E3F4F0')
S[25] = (land() + stones(PATH, lit=(0, 1, 2, 3)) + ''.join(lesson(x + 26, y - 14, k) for k, (x, y, r) in enumerate(PATH[:4]))
         + ruth(120, 'step', 'happy') + lbl(171, 40, 'הדרך שלכם לתרגל', fill='#FFF1CC'))

ACTS = [
  (1, 'Act 1 · Meet Ariel', [1, 2], 'Ruth\'s phone lights up with a new guide, Ariel, who steps into her room. Three of the backpack\'s tools show what he will teach.'),
  (2, 'Act 2 · "Not for me"', [3, 4, 5], 'The picture-perfect meditator meets Ruth\'s real doubts: tremor, discomfort, not relaxing.'),
  (3, 'Act 3 · Practise with what is here', [6, 7, 8, 9], 'The perfect picture is crossed out. Practice is a circle of attention around today as it is, and today changes with the hour and the pills.'),
  (4, 'Act 4 · Find what works for you', [10, 11, 12], 'Different hours, different postures; lying down is often best.'),
  (5, 'Act 5 · Whatever comes is part of it', [13, 14], 'Tremor and stiffness don\'t have to stop first; the circle of attention widens to hold them.'),
  (6, 'Act 6 · Breathing is not a test', [15, 16], 'No score for the breath; a gentle, adjustable wave instead of a strict one.'),
  (7, 'Act 7 · Listening inward', [17, 18, 19], 'Whatever practice brings is interesting: calm one day, tiredness the next. Notice, don\'t judge.'),
  (8, 'Act 8 · The mind wanders', [20, 21], 'A thought drifts off to a noise or tomorrow\'s plans; a breath brings it back, until the next time.'),
  (9, 'Act 9 · One small thing each time', [22, 23, 24, 25], 'Ruth needn\'t change or settle every doubt. Each practice leaves one small lesson, and the lessons become stones on her path.'),
]
SHOT = {
 1: ('Ruth in her armchair; her phone lights up and Ariel, a new guide (blue shirt, beard), waves from the screen. Title: מפגש 3 · תרגול עם פרקינסון.', 'The room and phone from sessions 1 and 2; same entrance Nira made.', 'Fade in on the room; push in to the phone.'),
 2: ('Ariel steps out into the room beside Ruth. Three tool badges float above them: breath waves (calming the body), the thought cloud (thoughts and emotions), a bending reed (meeting daily challenges flexibly).', 'Tool badges from session 1\'s backpack.', 'Badges pop in on each phrase.'),
 3: ('A picture-perfect meditator card (still, cross-legged) appears beside Ruth; her thought bubble: זה לא ממש בשבילי.', 'Ruth\'s thought bubbles, as in session 2.', 'The card slides in like an ad.'),
 4: ('Three worry bubbles over Ruth, each with its own mark: her trembling hand (רעד?), a shift in the chair (לא נוח?), a tangled squiggle (לא נרגעת?).', 'Tremor marks reused through the session.', 'Bubbles pop one per question.'),
 5: ('Ariel beside her; the worries line up in front of him. Caption: בדיוק על זה.', 'Ariel stays in the room as Ruth\'s guide for this session.', 'Bubbles drift toward Ariel.'),
 6: ('The perfect meditator card is crossed out. Ruth practises in her own chair, hand trembling, inside a soft warm circle of attention.', 'The circle of attention, the session\'s main visual idea.', 'Red cross draws on; circle fades up.'),
 7: ('The circle widens around Ruth; inside it, the body (her trembling hand) and the head (thought cloud) are both noticed, as they are.', 'Same circle.', 'Circle grows as the line names body and mind.'),
 8: ('A day runs from morning (sun, right) to evening (moon, left): an ease curve rises and falls, lifting after each pill time.', 'This day line returns in Act 4.', 'Cut to the day line; the curve draws left as the day goes on.'),
 9: ('Three practice cards side by side: a sunny day, a cloudy day, a mixed day. Caption: כל תרגול ירגיש קצת אחרת · וזה בסדר.', 'The weather icons return in Act 7.', 'Cards deal in one after another.'),
 10: ('Back on the day line, a practice marker drops onto a high point just after a pill: כשהתרופה משפיעה.', 'The day line from Act 3.', 'Marker drops in.'),
 11: ('A second marker drops into a dip; a small anchor appears there: נקודת אחיזה מרגיעה.', 'Same day line.', 'Anchor sinks onto the dip.'),
 12: ('Three Ruths side by side: sitting upright, leaning back on a cushion, lying on a mat (with a small star, often recommended).', 'Mat and cushion are used for the rest of the session.', 'Each posture slides in on its word.'),
 13: ('Ruth lying on the mat; tremor marks at her hand, stiffness lines at the shoulder. An hourglass ("wait until it stops") is crossed out.', 'Tremor marks from Act 2.', 'Hourglass flips once, then is crossed out.'),
 14: ('The circle of attention widens over Ruth to include the tremor marks too. Caption: גם זה חלק מהרגע.', 'Circle of attention from Act 3.', 'Circle grows slowly.'),
 15: ('A strict dashed metronome wave above Ruth\'s own uneven breath wave; a score card (100) is crossed out. Caption: לא מבחן.', 'The breath-wave badge from Act 1.', 'Score card stamps in, then crossed.'),
 16: ('Ruth\'s wave settles into a softer rhythm as a dial turns: התאמות, הקצב שמתאים לכם.', 'Same wave.', 'Wave smooths as the dial turns.'),
 17: ('Ruth in the chair, eyes closed, inside the circle; small warm dots light up in her chest, belly and head as she listens inward.', 'Circle of attention.', 'Dots light one by one.'),
 18: ('Two day cards: a sunny one marked מעניין and a cloudy one marked גם זה מעניין, both under the same curious look.', 'Weather cards from Act 3.', 'Second card flips over.'),
 19: ('Ruth calm in the circle. Caption שמים לב, with לא שופטים and לא מבקרים quietly on either side.', 'Circle.', 'Words appear on the beat.'),
 20: ('Ruth lying; a thought balloon floats off along a dashed line to a noise (bell), a body sensation, a note about later in the day.', 'Mat from Act 4.', 'Balloon drifts away.'),
 21: ('A breath wave rises from Ruth and draws the balloon back, along a returning arrow: נשימה, וחוזרים. Then it starts to drift again.', 'Breath wave from Act 6.', 'Balloon pulled back, then a small drift.'),
 22: ('Ruth in her armchair, Ariel beside her: זמן להתנסות וללמוד.', 'The room from Act 1.', 'Cut back to the room.'),
 23: ('A small checklist beside Ruth: "to change yourself" and "to solve every doubt" are both crossed off. Caption: לא צריך מראש.', 'Same room.', 'Lines cross off one by one.'),
 24: ('Ruth smiles; a small lesson note appears by her hand: דבר אחד קטן. Caption: ראש פתוח.', 'Lesson notes, which become stones next.', 'Note pops in.'),
 25: ('The path of stepping stones from session 1: the lesson notes settle onto the stones and light them as Ruth walks: הדרך שלכם לתרגל.', 'Ends on the program\'s path, as session 1 did.', 'The note flies out of the room onto the path.'),
}

legend1 = ('0 0 342 360', room() + chair() + ruth(160) + calm_disc(160, 240, 80), '<strong>The circle of attention.</strong> Practice isn\'t sitting still: it\'s a soft circle around whatever is here today, tremor included.')
legend2 = ('0 0 342 360', f'<rect width="342" height="360" fill="{PAPER}"></rect>' + day_line(250, pills=(272, 186, 96)), '<strong>The day line.</strong> Ease rises and falls across the day and after each pill; it shows when to try practising.')
legend3 = ('0 0 342 360', ariel(171, 20), '<strong>Ariel.</strong> The second guide (psychologist and mindfulness teacher), introduced on Ruth\'s phone the way Nira was.')
carried = ['<strong>Kept from sessions 1–2:</strong> Ruth\'s room, the phone entrance, the tool badges from her backpack, the path of stones at the end.',
           '<strong>New:</strong> Ariel, the mat and cushion, the day line, and the circle of attention. Session 3b and later practices reuse them.',
           '<strong>Made the same way:</strong> beats on Ariel\'s own pauses, one video with his voice, checked before you see it.']
rows = build(B + 'S03aStory.dc.html', times, lines, S, ACTS, SHOT, 'Session 3a · תרגול עם פרקינסון',
      'Practising with Parkinson\'s doesn\'t mean sitting still or being good at it. Practice works with whatever today brings (tremor, tiredness, a wandering mind), and each try teaches one small thing.',
      'A new guide, Ariel, meets Ruth → her doubts about "being still" → a circle of attention around her as she is, on good and bad days → postures and times to try → the mind wanders and comes back → small lessons become stones on her path.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
